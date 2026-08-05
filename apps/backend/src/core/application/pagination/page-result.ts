export class PageResult<T> {
  constructor(
    public readonly items: T[],
    public readonly page: number,
    public readonly pageSize: number,
    public readonly totalItems: number,
  ) {}

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
