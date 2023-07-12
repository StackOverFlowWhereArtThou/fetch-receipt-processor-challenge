import { IsString, IsNumber, IsArray, IsInstance } from "class-validator";
import { Expose, Transform, Type } from "class-transformer";

export class ReceiptItem {
  @Expose()
  @IsString()
  shortDescription!: string;

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price!: number;
}

export class ReceiptResponseDTO {
  @Expose()
  @IsString()
  retailer!: string;

  @Expose()
  purchaseDate!: string;

  //   TODO: fix this to fit the time
  @Expose()
  purchaseTime!: string; // "13:01";

  @Expose()
  @Type(() => ReceiptItem)
  @IsArray()
  @IsInstance(ReceiptItem, { each: true })
  items!: ReceiptItem[];

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  total!: number;
}
