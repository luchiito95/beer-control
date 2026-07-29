export class ListBrandsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}