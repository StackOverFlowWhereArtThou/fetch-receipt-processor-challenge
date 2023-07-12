import crypto from "crypto";

type ReceiptID = string;

interface ReceiptRecord {
  points: number;
}

export class DataBaseService {
  records: Map<string, ReceiptRecord>;

  constructor() {
    this.records = new Map();
  }

  /**
   *
   * @param points
   * @returns ReceiptID
   */
  createRecord(points: number): ReceiptID {
    const id = this.generateID();
    this.records.set(id, { points });
    return id;
  }

  getRecord(id: ReceiptID): ReceiptRecord | undefined {
    return this.records.get(id);
  }

  private generateID(): ReceiptID {
    return crypto.randomUUID();
  }
}
