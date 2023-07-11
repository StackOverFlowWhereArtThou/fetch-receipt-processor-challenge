import express from "express";

const router = express.Router();

router.get("/process", (req, res) => {
  res.send("init process");
});

export default router;
