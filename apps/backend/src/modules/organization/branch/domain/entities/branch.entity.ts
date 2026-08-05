import { BaseEntity } from '../../../../../core/domain/entities/base.entity';
import { BranchStatus } from '../enums/branch-status.enum';
import { BranchProps } from './branch.props';

export class BranchEntity extends BaseEntity {
  private _companyId: string;
  private _code: string;
  private _name: string;
  private _email: string | null;
  private _phone: string | null;
  private _address: string | null;
  private _city: string;
  private _state: string | null;
  private _country: string;
  private _postalCode: string | null;
  private _timezone: string;
  private _status: BranchStatus;

  constructor(props: BranchProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._companyId = props.companyId;
    this._code = props.code;
    this._name = props.name;
    this._email = props.email ?? null;
    this._phone = props.phone ?? null;
    this._address = props.address ?? null;
    this._city = props.city;
    this._state = props.state ?? null;
    this._country = props.country;
    this._postalCode = props.postalCode ?? null;
    this._timezone = props.timezone;
    this._status = props.status;

    this.validate();
  }

  // Getters
  get companyId(): string {
    return this._companyId;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get email(): string | null {
    return this._email;
  }

  get phone(): string | null {
    return this._phone;
  }

  get address(): string | null {
    return this._address;
  }

  get city(): string {
    return this._city;
  }

  get state(): string | null {
    return this._state;
  }

  get country(): string {
    return this._country;
  }

  get postalCode(): string | null {
    return this._postalCode;
  }

  get timezone(): string {
    return this._timezone;
  }

  get status(): BranchStatus {
    return this._status;
  }

  // Domain behavior

  activate(): void {
    this._status = BranchStatus.ACTIVE;
  }

  deactivate(): void {
    this._status = BranchStatus.INACTIVE;
  }

  changeCode(code: string): void {
    this._code = code.trim().toUpperCase();
  }

  changeName(name: string): void {
    if (!name.trim()) {
      throw new Error('Branch name cannot be empty.');
    }

    this._name = name.trim();
  }

  changeEmail(email: string | null): void {
    if (email && !this.isValidEmail(email)) {
      throw new Error('Invalid email address.');
    }

    this._email = email?.trim() || null;
  }

  changePhone(phone: string | null): void {
    this._phone = phone?.trim() || null;
  }

  changeAddress(address: string | null): void {
    this._address = address?.trim() || null;
  }

  changeCity(city: string): void {
    if (!city.trim()) {
      throw new Error('City cannot be empty.');
    }

    this._city = city.trim();
  }

  changeState(state: string | null): void {
    this._state = state?.trim() || null;
  }

  changeCountry(country: string): void {
    if (!country.trim()) {
      throw new Error('Country cannot be empty.');
    }

    this._country = country.trim();
  }

  changePostalCode(postalCode: string | null): void {
    this._postalCode = postalCode?.trim() || null;
  }

  changeTimezone(timezone: string): void {
    if (!timezone.trim()) {
      throw new Error('Timezone cannot be empty.');
    }

    this._timezone = timezone.trim();
  }

  update(props: {
    code: string;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    timezone: string;
  }): void {
    this.changeCode(props.code);
    this.changeName(props.name);
    this.changeEmail(props.email);
    this.changePhone(props.phone);
    this.changeAddress(props.address);
    this.changeCity(props.city);
    this.changeState(props.state);
    this.changeCountry(props.country);
    this.changePostalCode(props.postalCode);
    this.changeTimezone(props.timezone);

    this.validate();
  }

  private validate(): void {
    if (!this._companyId.trim()) {
      throw new Error('Company ID is required.');
    }

    if (!this._code.trim()) {
      throw new Error('Branch code is required.');
    }

    if (!this._name.trim()) {
      throw new Error('Branch name is required.');
    }

    if (!this._city.trim()) {
      throw new Error('City is required.');
    }

    if (!this._country.trim()) {
      throw new Error('Country is required.');
    }

    if (!this._timezone.trim()) {
      throw new Error('Timezone is required.');
    }

    if (this._email && !this.isValidEmail(this._email)) {
      throw new Error('Invalid email address.');
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
