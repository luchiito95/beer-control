export class AdjustStockResult {

  constructor(

    public readonly stockId: string,

    public readonly onHand: number,

    public readonly reserved: number,

    public readonly available: number,

  ) {}

}