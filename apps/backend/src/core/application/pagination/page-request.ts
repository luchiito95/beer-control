export class PageRequest {
  constructor(
    public readonly page = 1,
    public readonly pageSize = 10,
  ) {}

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }
}
