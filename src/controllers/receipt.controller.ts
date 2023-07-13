import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ReceiptResponseDTO } from "../dtos/receipt-response.dto";
import { ReceiptService } from "../services/receipt.service";

// TODO: get this DB Service into a DI container
const receiptService = new ReceiptService();

// TODO: Confirm if the DTO should actually be a parameter here
export async function createReceiptRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: see why this did not transform value
  const receiptDTO = plainToClass(ReceiptResponseDTO, req.body, {
    excludeExtraneousValues: true,
  });
  // TODO: fix this up
  const validationErrors = await validate(receiptDTO);
  if (validationErrors.length) {
    res.status(400).send("The receipt is invalid");
    next();
  } else {
    const id = receiptService.create(receiptDTO);
    res.json({ id });
  }
}

export function getReceiptRecord(req: Request, res: Response) {
  const { id } = req.params;
  const record = receiptService.find(id);
  if (record === undefined) {
    res.status(404).send("No receipt found for that id");
  } else {
    const { points } = record;
    res.json({ points });
  }
}
