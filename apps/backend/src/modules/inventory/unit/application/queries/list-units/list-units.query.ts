export class ListUnitsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}