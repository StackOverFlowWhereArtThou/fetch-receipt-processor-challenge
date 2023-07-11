import express from "express";

const router = express.Router();

router.post("/process", (req, res) => {
  res.send("init process");
});

router.get("/:id/points", (req, res) => {
  res.send(req.params);
});
export default router;
