import {
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateStockRequest {

  @IsUUID()
  warehouseId!: string;

  @IsUUID()
  productId!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  onHand = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  averageCost = 0;

}