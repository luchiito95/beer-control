export class UpdateBranchResult {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status: string,
  ) {}
}