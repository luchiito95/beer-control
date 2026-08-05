export class ReserveStockCommand {

  constructor(

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly quantity: number,

    public readonly performedBy: string,

    public readonly referenceId: string | null = null,

    public readonly notes: string | null = null,

  ) {}

}