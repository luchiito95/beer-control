export class SearchInventoryMovementItemResult {

  constructor(

    public readonly id: string,

    public readonly stockId: string,

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly type: string,

    public readonly reason: string,

    public readonly source: string,

    public readonly quantity: number,

    public readonly balanceBefore: number,

    public readonly balanceAfter: number,

    public readonly unitCost: number,

    public readonly totalCost: number,

    public readonly performedBy: string,

    public readonly performedAt: Date,

  ) {}

}

export class SearchInventoryMovementsResult {

  constructor(

    public readonly items: SearchInventoryMovementItemResult[],

    public readonly totalItems: number,

    public readonly page: number,

    public readonly pageSize: number,

  ) {}

}