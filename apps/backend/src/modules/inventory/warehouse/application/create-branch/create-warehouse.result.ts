export class CreateWarehouseResult {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status: string,
  ) {}
}