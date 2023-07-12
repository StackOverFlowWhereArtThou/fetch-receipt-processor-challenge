import { ReceiptResponseDTO, ReceiptItem } from "../dtos/receipt-response.dto";
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

    points += this.alphanumeric(receipt.retailer);
    points += this.checkRoundedTotal(receipt.total);
    points += this.multipleOf25(receipt.total);
    points += this.countTwoItems(receipt.items.length);
    for (const item of receipt.items) {
      points += this.trimmedItemDescriptionMultiple(item);
    }
    points += this.oddPurchaseDate(receipt.purchaseDate);
    points += this.purchaseTime(receipt.purchaseTime);

    return points;
  }

  /**
   * One point for every alphanumeric character in the retailer name.
   */
  private static alphanumeric(retailName: string): number {
    const alphanumericRegex = /[a-zA-Z0-9]/g;
    const matches = retailName.match(alphanumericRegex);

    return matches ? matches.length : 0;
  }

  /**
   * 50 points if the total is a round dollar amount with no cents.
   */
  private static checkRoundedTotal(totalAmount: number): number {
    return totalAmount % 1 > 0.0 ? 0 : 50;
  }

  /**
   * 25 points if the total is a multiple of 0.25.
   */
  private static multipleOf25(totalAmount: number): number {
    return totalAmount % 0.25 === 0 ? 25 : 0;
  }

  /**
   *  5 points for every two items on the receipt.
   */
  private static countTwoItems(itemLength: number): number {
    return Math.floor(itemLength / 2) * 5;
  }

  /**
   * If the trimmed length of the item description is a multiple of 3,
   * multiply the price by 0.2 and round up to the nearest integer.
   * The result is the number of points earned.
   */
  private static trimmedItemDescriptionMultiple(params: ReceiptItem) {
    const trimmed = params.shortDescription.trim();
    return trimmed.length % 3 === 0 ? Math.ceil(0.2 * params.price) : 0;
  }

  /**
   * 6 points if the day in the purchase date is odd.
   */
  private static oddPurchaseDate(dateStr: string): number {
    this.isValidDateFormat(dateStr);
    const day = parseInt(dateStr.substring(dateStr.length - 2, dateStr.length));
    return day % 2 !== 0 ? 6 : 0;
  }

  /**
   * 10 points if the time of purchase is after 2:00pm and before 4:00pm.
   */
  private static purchaseTime(timeStr: string) {
    this.isValidTimeFormat(timeStr);
    const hour = parseInt(timeStr.substring(0, 2));
    return hour >= 14 && hour < 16 ? 10 : 0;
  }

  // TODO: move this to class validation and finish documenting it
  static isValidDateFormat(dateString: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) throw Error("Bad Date String");
  }

  // TODO: move this to class validation and finish documenting it
  static isValidTimeFormat(timeStr: string) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(timeStr)) throw Error("Bad Time String");
  }
}
