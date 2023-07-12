import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ReceiptResponseDTO } from "../dtos/receipt-response.dto";
import { ReceiptPointsCalculator } from "../services/receiptCalculation.service";
import { DataBaseService } from "../services/database.service";

// TODO: get this DB Service into a DI container
const dbService = new DataBaseService();

// TODO: Confirm if the DTO should actually be a parameter here
export function createReceiptRecord(req: Request, res: Response) {
  // TODO: see why this did not transform value
  const receiptDTO = plainToClass(ReceiptResponseDTO, req.body, {
    excludeExtraneousValues: true,
  });
  // TODO: fix this up
  validate(receiptDTO);

  const points = ReceiptPointsCalculator.calculatePoints(receiptDTO);
  const id = dbService.createRecord(points);

  res.json({ id });
}

export function getReceiptRecord(req: Request, res: Response) {
  const { id } = req.params;
  const record = dbService.getRecord(id);
  if (!record) {
    // TODO: send 404 error if no record is found at that ID
  }
  const { points } = record;
  res.json({ points });
}
