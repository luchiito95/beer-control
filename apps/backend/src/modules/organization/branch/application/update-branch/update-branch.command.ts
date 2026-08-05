export class UpdateBranchCommand {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly address: string | null,
    public readonly city: string,
    public readonly state: string | null,
    public readonly country: string,
    public readonly postalCode: string | null,
    public readonly timezone: string,
  ) {}
}
