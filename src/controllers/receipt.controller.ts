import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Container } from "typedi";
import { ReceiptResponseDTO } from "../dtos/receipt-response.dto";
import { ReceiptPointsCalculator } from "../services/receipt.service";
import { DataBaseService } from "../services/database.service";

const dbService = Container.get(DataBaseService);

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
    const points = ReceiptPointsCalculator.calculatePoints(receiptDTO);
    const id = dbService.createRecord({ points });
    res.json({ id });
  }
}

export function getReceiptRecord(req: Request, res: Response) {
  const { id } = req.params;
  const record = dbService.getRecord(id);
  if (record === undefined) {
    res.status(404).send("No receipt found for that id");
  } else {
    const { points } = record;
    res.json({ points });
  }
}
