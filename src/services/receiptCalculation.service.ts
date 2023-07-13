import { ReceiptResponseDTO } from "../dtos/receipt-response.dto";
import { PointCalculation } from "./helpers/receipt-point-calculation";
// One point for every alphanumeric character in the retailer name.
// 50 points if the total is a round dollar amount with no cents.
// 25 points if the total is a multiple of 0.25.
// 5 points for every two items on the receipt.
// If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
// 6 points if the day in the purchase date is odd.
// 10 points if the time of purchase is after 2:00pm and before 4:00pm.

export class ReceiptPointsCalculator {
  static calculatePoints(receipt: ReceiptResponseDTO): number {
    let points = 0;

    points += PointCalculation.alphanumeric(receipt.retailer);
    points += PointCalculation.checkRoundedTotal(receipt.total);
    points += PointCalculation.multipleOf25(receipt.total);
    points += PointCalculation.countTwoItems(receipt.items.length);
    for (const item of receipt.items) {
      points += PointCalculation.trimmedItemDescriptionMultiple(item);
    }
    points += PointCalculation.oddPurchaseDate(receipt.purchaseDate);
    points += PointCalculation.purchaseTime(receipt.purchaseTime);

    return points;
  }
}
