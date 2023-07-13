import crypto from "crypto";
import { Service } from "typedi";

type ReceiptID = string;

interface ReceiptRecord {
  points: number;
}

@Service()
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
  createRecord(record: ReceiptRecord): ReceiptID {
    const id = this.generateID();
    this.records.set(id, record);
    return id;
  }

  /**
   *
   * @param id ID to return from the records
   * @returns record if it exists, else undefined
   */
  getRecord(id: ReceiptID): ReceiptRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Generates a random UUID string
   * @returns UUID string
   */
  private generateID(): ReceiptID {
    return crypto.randomUUID();
  }
}
