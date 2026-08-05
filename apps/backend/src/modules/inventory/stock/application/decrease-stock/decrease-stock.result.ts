export class DecreaseStockResult {

  constructor(

    public readonly stockId: string,

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly onHand: number,

    public readonly reserved: number,

    public readonly available: number,

  ) {}

}