import { StockStatus } from '../../domain';

export class IncreaseStockResult {

  constructor(

    public readonly id: string,

    public readonly onHand: number,

    public readonly reserved: number,

    public readonly available: number,

    public readonly averageCost: number,

    public readonly status: StockStatus,

  ) {}

}