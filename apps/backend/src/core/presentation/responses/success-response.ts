export class SuccessResponse<T> {
  constructor(
    public readonly success: boolean,
    public readonly data: T,
  ) {}
}