type ReceiptID = string;

interface ReceiptRecord {
  points: number;
}

export class DataBaseService {
  records: Map<string, ReceiptRecord>;
  nextId: number;

  constructor() {
    this.records = new Map();
    this.nextId = 0;
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

  getRecord(id: ReceiptID): ReceiptRecord {
    if (!this.records.has(id)) throw new Error(`No such id: ${id}`);
    return this.records.get(id) as ReceiptRecord;
  }

  private generateID(): ReceiptID {
    this.nextId += 1;
    return this.nextId.toString();
  }
}
