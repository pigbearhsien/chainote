// import Arweave from "arweave";
import crypto from "crypto";
import { Buffer } from "buffer";
import BigNumber from "bignumber.js";
import * as pj from "pem-jwk";
import { assert } from "console";
import { providers } from "ethers";
import { WebBundlr } from "@bundlr-network/client";
import axios from "axios";

class BundlrInterface {
  constructor() {
    // this.arweave = Arweave.init({});
    this.bundlr_conf = {
      website: "https://devnet.bundlr.network",
      currency: "matic",
      providerUrl: "https://rpc-mumbai.maticvigil.com"
    }
    this.axios = axios.create({
      baseURL: 'https://arweave.net/'
    })
  }

  plugWeb3Provider = async (ethereum, callback) => {
    const {website, currency, providerUrl} = this.bundlr_conf;

    this.provider = new providers.Web3Provider(ethereum);
    this.bundlr = new WebBundlr(
      website,
      currency,
      this.provider,
      {
        providerUrl: providerUrl,
      }
    );

    await this.provider._ready();
    this.bundlr.ready().then(() => {
      callback();
    });
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
        console.log(buffer, buffer.length)
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
    const response = await this.bundlr.upload(encrypted);

    console.log(response)

    return response;
  };

  getData = async (tx_id) => {
    const response = await this.axios.get(
      tx_id
    )
    return response.data
  }
}

export default BundlrInterface;
