import express from "express";

import receipts from "./routes/receipts.router";

const PORT: number = 3000;

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World from TS APP");
});

app.use("/receipts", receipts);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
