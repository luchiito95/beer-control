import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AdjustStockRequest {

  @IsUUID()
  warehouseId!: string;

  @IsUUID()
  productId!: string;

  @IsNumber()
 countedQuantity!: number;

  @IsNumber()
  unitCost!: number;

  @IsString()
  performedBy!: string;

  @IsOptional()
  @IsString()
  notes?: string;

}