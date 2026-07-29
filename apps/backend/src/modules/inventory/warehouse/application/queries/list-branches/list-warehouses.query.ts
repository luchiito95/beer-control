export class ListWarehousesQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}