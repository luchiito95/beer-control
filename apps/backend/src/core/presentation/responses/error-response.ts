export class ErrorResponse {
  constructor(
    public readonly success: boolean,
    public readonly statusCode: number,
    public readonly error: string,
    public readonly message: string,
    public readonly path: string,
    public readonly timestamp: string,
  ) {}
}
