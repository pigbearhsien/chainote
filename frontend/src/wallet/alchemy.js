import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";
import * as ethers from "ethers";

class AlchemyInterface {
  constructor(solidity_sc, abid) {
    const settings = {
      apiKey: "LjJCSTlwcAXibugbEPYq1QUW1e9qjFj7",
      network: Network.MATIC_MUMBAI,
    };

    this.alchemy = new Alchemy(settings);
    this.smartContract = solidity_sc;

    this.interface = new ethers.utils.Interface(abid.output.abi);

    // this.alchemy.core.getBalance()
  }

  dateToNotes = async (ethereum, from, date) => {
    const params = {
      from: from,
      to: this.smartContract,
      data: this.interface.encodeFunctionData("dateToNotes", [
        ethers.BigNumber.from(date),
      ]),
    };
    return await ethereum.request({
      method: "eth_call",
      params: [params],
    });
  };
  monthToNotes = async (ethereum, from, month) => {
    const params = {
      from: from,
      to: this.smartContract,
      data: this.interface.encodeFunctionData("monthToNotes", [
        ethers.BigNumber.from(month),
      ]),
    };
    return await ethereum.request({
      method: "eth_call",
      params: [params],
    });
  };
  getNotes = async (ethereum, from, number) => {
    const params = {
      from: from,
      to: this.smartContract,
      data: this.interface.encodeFunctionData("getNotes", [
        ethers.BigNumber.from(number),
      ]),
    };
    return await ethereum.request({
      method: "eth_call",
      params: [params],
    });
  };

  uploadNote = async (ethereum, from, date, noteAddress) => {
    const params = {
      from: from,
      to: this.smartContract,
      data: this.interface.encodeFunctionData("uploadNotes", [
        date.toString(),
        noteAddress,
      ]),
    };
    return await ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
    });
  };

  getName = async (ethereum, from) => {
    const params = {
      from: from,
      to: this.smartContract,
      data: this.interface.encodeFunctionData("getName", []),
    };
    const encoded_result = await ethereum.request({
      method: "eth_call",
      params: [params],
    });

    const name = this.alchemy.interface.decodeFunctionResult(
      this.alchemy.interface.functions["getNotes(uint256)"],
      encoded_result
    );

    return name
  };

  setName = async (ethereum, from, newName) => {
    const params = {
      from: from,
      to: this.smartContract,
      data: this.interface.encodeFunctionData("setName", [newName]),
    };
    return await ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
    });
  };

  listenOnTransactionPending = (who) => {
    const ws = this.alchemy.ws.on(
      {
        method: AlchemySubscription.PENDING_TRANSACTIONS,
        toAddress: this.smartContract,
        fromAddress: who,
      },
      (tx) => console.log(tx)
    );

    return ws;
  };

  listenOnTransactionMined = (txHash) => {
    this.alchemy.ws.on(txHash, (tx) => console.log(tx));
  };
  
}

export default AlchemyInterface;
