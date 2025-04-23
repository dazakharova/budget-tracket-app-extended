import express from "express";

import cors from "cors";

import transactionsRoutes from "./routes/transactions.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/transactions', transactionsRoutes);

export default app;
