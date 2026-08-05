export class IncreaseStockCommand {

  constructor(

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly quantity: number,

    public readonly unitCost: number,

    public readonly performedBy: string,

    public readonly referenceId: string | null = null,

    public readonly notes: string | null = null,

  ) {}

}