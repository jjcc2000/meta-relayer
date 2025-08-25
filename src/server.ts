import express, { Request, Response } from "express";
import { relayTransaction } from "./relayer";

const app = express();

app.use(express.json()); 

app.post("/relay", async (req: Request, res: Response): Promise<any> => {
    try {
        const { to, data, gasLimit } = req.body;

        if (!to || !data || !gasLimit) {
            return res.status(400).send("Missing parameters");
        }

        const receipt = await relayTransaction(to, data, gasLimit);

        if (!receipt) {
            return res.status(500).send("Transaction failed or receipt is null");
        }

        return res.json({ txHash: receipt.hash });
    } catch (err: any) {
        console.error("Relay error:", err);
        return res.status(500).send(err.message || "Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("✅ Relayer API running on http://localhost:3000");
});
