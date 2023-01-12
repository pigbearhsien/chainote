// import Arweave from "arweave";
import crypto from "crypto";
import { Buffer } from "buffer";
import { base64converter } from "./utils";
import * as pj from "pem-jwk";
import { assert } from "console";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";

class BundlrInterface {
  constructor() {
    // this.arweave = Arweave.init({});
  }

  plugWeb3Provider = async (ethereum) => {
    this.provider = new providers.Web3Provider(ethereum);
    this.bundlr = new WebBundlr(
      "https://devnet.bundlr.network",
      "matic",
      this.provider,
      {
        providerUrl: "https://rpc-mumbai.maticvigil.com",
      }
    );
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

  uploadOntoChain = async (encrypted, _) => {
    await this.provider._ready();
    await this.bundlr.ready();
    // const uploader = this.bundlr.uploader.chunkedUploader;
    // const transactionOptions = {
    //   tags: [{ name: "Content-Type", value: "text/plain" }],
    // };

    const price1MBAtomic = await this.bundlr.getPrice(6 * encrypted.length);
    const price1MBConverted = this.bundlr.utils.unitConverter(price1MBAtomic);
    console.log(`Uploading 1MB to Bundlr costs $${price1MBConverted}`);

    const dataBuffer = Buffer.from(encrypted, "base64");
    console.log("hi!");
    console.log(await this.bundlr.getLoadedBalance());
    const response = await this.bundlr.upload(dataBuffer);
    console.log("!!?");

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

export default BundlrInterface;
