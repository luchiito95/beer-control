import { StockStatus } from '../../domain';

export class CreateStockResult {

  constructor(

    public readonly id: string,

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly onHand: number,

    public readonly reserved: number,

    public readonly available: number,

    public readonly averageCost: number,

    public readonly status: StockStatus,

  ) {}

}