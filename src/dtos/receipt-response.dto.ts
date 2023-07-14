import {
  IsString,
  IsNumber,
  IsNumberOptions,
  IsArray,
  IsInstance,
  IsMilitaryTime,
  Matches,
  ValidateNested,
} from "class-validator";
import { Expose, Transform, Type } from "class-transformer";

const priceNumberOptions: IsNumberOptions = {
  allowNaN: false,
  allowInfinity: false,
  maxDecimalPlaces: 2,
};

export class ReceiptItem {
  @Expose()
  @IsString()
  shortDescription!: string;

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(priceNumberOptions)
  price!: number;
}

export class ReceiptResponseDTO {
  @Expose()
  @IsString()
  retailer!: string;

  @Expose()
  // This will match yyyy-mm-dd and also yyyy-m-d
  @Matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
  purchaseDate!: string;

  @Expose()
  @IsMilitaryTime()
  purchaseTime!: string;

  @Expose()
  @Type(() => ReceiptItem)
  @IsArray()
  @IsInstance(ReceiptItem, { each: true })
  @ValidateNested()
  items!: ReceiptItem[];

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber(priceNumberOptions)
  total!: number;
}
