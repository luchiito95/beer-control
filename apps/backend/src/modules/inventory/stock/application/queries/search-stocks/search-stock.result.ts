export class SearchStockItemResult {

  constructor(

    public readonly stockId: string,

    public readonly warehouseId: string,

    public readonly productId: string,

    public readonly onHand: number,

    public readonly reserved: number,

    public readonly available: number,

    public readonly averageCost: number,

    public readonly status: string,

  ) {}

}

export class SearchStockResult {

  constructor(

    public readonly items: SearchStockItemResult[],

    public readonly totalItems: number,

    public readonly page: number,

    public readonly pageSize: number,

  ) {}

}