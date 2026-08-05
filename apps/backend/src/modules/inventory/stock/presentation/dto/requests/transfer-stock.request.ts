import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TransferStockRequest {

  @IsUUID()
  sourceWarehouseId!: string;

  @IsUUID()
  destinationWarehouseId!: string;

  @IsUUID()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  performedBy!: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

}