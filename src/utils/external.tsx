import { ethers } from 'ethers';

const address = "0x2F680945B96329Ae0109dde11adB2d81467379DB";
const abi = [{"inputs":[{"internalType":"address","name":"_rave","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"key","type":"string"},{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"SetText","type":"event"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getRecords","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"key","type":"string"}],"name":"getText","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"key","type":"string"},{"internalType":"string","name":"value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export const create = (provider) => {
  return new ethers.Contract(address, abi, provider);
}
