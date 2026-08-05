import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class IncreaseStockRequest {

  @IsUUID()
  warehouseId!: string;

  @IsUUID()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  unitCost!: number;

  @IsString()
  performedBy!: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

}