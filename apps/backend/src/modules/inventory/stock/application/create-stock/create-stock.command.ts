export class CreateStockCommand {

  constructor(

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly onHand: number = 0,

    public readonly averageCost: number = 0,

  ) {}

}