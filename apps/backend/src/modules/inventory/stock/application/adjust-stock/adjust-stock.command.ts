export class AdjustStockCommand {

  constructor(

    public readonly warehouseId: string,

    public readonly productId: string,

    /**
     * Physical quantity counted.
     */
    public readonly countedQuantity: number,

    /**
     * Cost used when the adjustment
     * increases stock.
     */
    public readonly unitCost: number,

    public readonly performedBy: string,

    public readonly notes: string | null = null,

  ) {}

}