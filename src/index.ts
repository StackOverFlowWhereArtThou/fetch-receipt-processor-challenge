import express from "express";
import "reflect-metadata";

import receipts from "./routes/receipts.router";

const PORT: number = 3000;

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World from TS APP");
});

app.use("/receipts", receipts);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
