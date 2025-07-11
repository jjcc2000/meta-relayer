import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export const relayTransaction = async (to: string, data: string, gasLimit: string) => {
    const tx = {
        to,
        data,
        gasLimit: ethers.toBigInt(gasLimit),
    };

    const txResponse = await wallet.sendTransaction(tx);
    return txResponse.wait(); // Wait for confirmation
};
