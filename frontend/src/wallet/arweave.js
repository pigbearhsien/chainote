import Arweave from "arweave";
import crypto from "crypto";
import { Buffer } from "buffer";
import { base64converter } from "./utils";
import * as pj from "pem-jwk";
import { assert } from "console";
import { mnemonicPhrase } from "./utils";

class ArweaveInterface {
  constructor() {
    this.arweave = Arweave.init({});
  }

  generateArweaveWallet = async () => {
    /*
        return (jwk-interface)
        https://ithelp.ithome.com.tw/articles/10225590

        d, e: private, public key
        加密: M^e mod n = c
        解密: c^d mod n = M

        kid: 識別金鑰的識別碼
        kty: (key type) 有 RSA, EC 及 oct 三種
        n:   RSA 公鑰的模數值 (Base64urlUInt-encoded)
        e:   RSA 公鑰的指數值 (Same as above.)
        
        以下這些參數是便於進行解密的時候，預先計算好的參數，並使用中國剩餘定理進行加速
        https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Using_the_Chinese_remainder_algorithm
        p, q: 私鑰生成中產生的質數
        dp:   d mod p-1
        dq:   d mod q-1
        qi:   q^(-1) mode p
    */
    const key = this.arweave.wallets.generate();

    return key;

    /*
        從crypto裡面產生的public key:
        MF0wDQYJKoZIhvcNAQEBBQADTAAwSQJCAKe5TgHpY36BLIQhIGaVtD47MnKua3zaRnBa/7KITyDjAxvG7wNPh7E2judxTqz8bLiw7leXa2QW+BJkI75E0/6dAgMBAAE=
        字數為 128, 一個字元可以表示6個位元(64), 所以總共是 768 位元
        
        從arweave產生的public key:
        soFYgCxvnoK5DwZ7fGgek3XYgEIM53CIFQEkvQtvbvA
        字數為 43, 如此一來則是 256 位元
    */
  };

  walletToPublicKey = async (key) => {
    /*
        receive 'jwkinterface',
        return string.
    */
    const address = this.arweave.wallets.jwkToAddress(key);
    return address;
  };

  getBalance = async (address, unit = "ar") => {
    if (!["ar", "winston"].includes(unit)) {
      throw "Unit must be chosen between ar and winston(1e-12 ar)";
    }
    let balance = await this.arweave.wallets.getBalance(address);

    if (unit === "ar") {
      balance = this.arweave.ar.winstonToAr(balance);
    }
    return balance;
  };

  static encrypt = async (plainText, publicKey) => {
    const buffer = Buffer.from(plainText, "utf-8");
    /*
        run into error: length octect is too long at: (shallow)
        與妻訣別書中的長度為 106 個中文字，一個中文字透過 24bit 編碼，會產生長度為 318 的 Uint8Array
        utf-8 的編碼似乎是不固定長度的，所以遇到塞爆的時候再嘗試 split into chunks.
    */
    const publicKey_ = base64converter(publicKey);
    const encrypted = crypto.publicEncrypt(
      "-----BEGIN PUBLIC KEY-----\n" +
        publicKey_ +
        "\n-----END PUBLIC KEY-----\n",
      buffer
    );

    return encrypted.toString("base64");
  };

  encryptByPrivateKey = async (plainText, private_key) => {
    /*
        static encrypt 有些錯誤，不能直接吃公鑰，
        這個 function 可以幫助私鑰轉成公鑰，同時進行加密。

        tips: 每次按的結果很有可能不一樣，因為 OAEP (PKCS #1 v2.0) 會亂數填充於尾巴。
    */
    /*
        我們能進行加密的上限為何？
            156 個中文字 * 3 bytes = 468 bytes
        +   2   個英文字 * 1 bytes = 2   bytes
                                  = 470 bytes
    */
    const privateKey_ = pj.jwk2pem(private_key);

    let result = "";
    for (let i = 0; i < plainText.length; i += 150) {
      let sliced;
      if (i + 150 >= plainText.length) {
        sliced = plainText.slice(i);
      } else {
        sliced = plainText.slice(i, i + 150);
      }

      const buffer = Buffer.from(sliced, "utf-8");
      const encrypted = crypto
        .publicEncrypt(privateKey_, buffer)
        .toString("base64");
      result += encrypted;

      if (i + 150 < plainText.length) {
        result += "|";
      }
    }

    return result;
  };

  decryptByPrivateKey = async (cipherText, private_key) => {
    const privateKey_ = pj.jwk2pem(private_key);

    let start = 0;
    let result = "";
    for (let end = 0; end < cipherText.length; end++) {
      if (cipherText[end] === "|" || end === cipherText.length - 1) {
        // console.log(start, end);
        let sliced;
        if (cipherText[end] === "|") {
          sliced = cipherText.slice(start, end);
        } else {
          sliced = cipherText.slice(start);
        }
        // console.log(sliced);
        const buffer = Buffer.from(sliced, "base64");
        const decrypted = crypto
          .privateDecrypt(privateKey_, buffer)
          .toString("utf8");
        // console.log(decrypted);
        result += decrypted;

        start = end + 1;
      }
    }

    return result;
  };

  uploadOntoChain = async (encrypted, private_key) => {
    const transaction = await this.arweave.createTransaction(
      {
        data: Buffer.from(encrypted, "base64"),
      },
      private_key
    );

    // console.log(transaction);
    await this.arweave.transactions.sign(transaction, private_key);
    // console.log(transaction);
    // const response = await this.arweave.transactions.post(transaction);
    // METHOD MORE SUITABLE FOR CHUNK UPLOAD
    let uploader = await this.arweave.transactions.getUploader(transaction);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
    }

    return transaction;
  };

  transferMoney = async (key, to, quantity, unit = "ar") => {
    if (!(unit in ["ar", "winston"])) {
      throw "Unit must be chosen between ar and winston(1e-12 ar)";
    }

    const transaction = await this.arweave.createTransaction(
      {
        target: to,
        quantity:
          unit === "ar" ? quantity : this.arweave.ar.arToWinston("10.5"),
      },
      key
    );

    await this.arweave.transactions.sign(transaction, key);

    const response = await this.arweave.transactions.post(transaction);

    return response;
  };

  pollStatus = async (txhash) => {
    assert(typeof txhash === "string");
    return await this.arweave.transactions.getStatus(txhash);
  };

  pollListStatus = async (txhash_list) => {
    const result = [];
    for (let i = 0; i < txhash_list.length; i++) {
      result.push(await this.pollStatus(txhash_list[i]));
    }

    return result;
  };
}

export default ArweaveInterface;
