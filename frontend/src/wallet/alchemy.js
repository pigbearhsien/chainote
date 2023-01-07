import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";
import * as ethers from "ethers";

class AlchemyInterface {
  constructor(solidity_sc, abid) {
    const settings = {
      apiKey: "gX8oD6a1FQzKHWOHC5CYpAjpRhajTcrE",
      network: Network.ETH_GOERLI,
    };

    this.alchemy = new Alchemy(settings);
    this.smartContract = solidity_sc;

    console.log(abid.output.abi);

    this.interface = new ethers.utils.Interface(abid.output.abi);
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
