import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
console.log("This is the tes");

console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
console.log("RPC_URL:", process.env.RPC_URL);
export const relayTransaction = async (to: string, data: string, gasLimit: string) => {
    const tx = {
        to,
        data,
        gasLimit: ethers.toBigInt(gasLimit),
    };

    const txResponse = await wallet.sendTransaction(tx);
    return txResponse.wait(); // Wait for confirmation
};
