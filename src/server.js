"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const relayer_1 = require("./relayer");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parse JSON bodies
// POST /relay endpoint
app.post("/relay", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, data, gasLimit } = req.body;
        if (!to || !data || !gasLimit) {
            return res.status(400).send("Missing parameters");
        }
        const receipt = yield (0, relayer_1.relayTransaction)(to, data, gasLimit);
        if (!receipt) {
            return res.status(500).send("Transaction failed or receipt is null");
        }
        return res.json({ txHash: receipt.hash });
    }
    catch (err) {
        console.error("Relay error:", err);
        return res.status(500).send(err.message || "Internal Server Error");
    }
}));
app.listen(3000, () => {
    console.log("✅ Relayer API running on http://localhost:3000");
});
