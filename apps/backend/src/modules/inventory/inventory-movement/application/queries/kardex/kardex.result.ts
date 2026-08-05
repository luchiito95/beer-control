export class KardexItemResult {

  constructor(

    public readonly movementId: string,

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly movementType: string,

    public readonly movementReason: string,

    public readonly quantity: number,

    public readonly balanceBefore: number,

    public readonly balanceAfter: number,

    public readonly unitCost: number,

    public readonly totalCost: number,

    public readonly performedBy: string,

    public readonly performedAt: Date,

    public readonly referenceId: string | null,

    public readonly notes: string | null,

  ) {}

}

export class KardexResult {

  constructor(

    public readonly items: KardexItemResult[],

    public readonly totalItems: number,

    public readonly page: number,

    public readonly pageSize: number,

  ) {}

}