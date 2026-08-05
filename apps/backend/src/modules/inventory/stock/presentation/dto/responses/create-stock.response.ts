import { StockStatus } from '../../../domain';

export class CreateStockResponse {

  id!: string;

  warehouseId!: string;

  productId!: string;

  onHand!: number;

  reserved!: number;

  available!: number;

  averageCost!: number;

  status!: StockStatus;

}