export class TransferStockResult {

  constructor(

    public readonly sourceStockId: string,

    public readonly destinationStockId: string,

    public readonly quantity: number,

  ) {}

}