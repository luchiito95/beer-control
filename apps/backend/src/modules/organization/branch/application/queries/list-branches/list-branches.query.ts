export class ListBranchesQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number,
  ) {}
}