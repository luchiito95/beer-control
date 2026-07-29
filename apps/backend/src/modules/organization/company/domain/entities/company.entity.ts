import { BaseEntity } from '../../../../../core/domain/entities/base.entity';
import { CompanyStatus } from '../enums/company-status.enum';
import { CompanyProps } from './company.props';

export class Company extends BaseEntity {
  private _name: string;
  private _legalName: string | null;
  private _taxId: string | null;
  private _email: string | null;
  private _phone: string | null;
  private _currencyCode: string;
  private _timezone: string;
  private _status: CompanyStatus;

  constructor(props: CompanyProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._name = props.name;
    this._legalName = props.legalName;
    this._taxId = props.taxId;
    this._email = props.email;
    this._phone = props.phone;
    this._currencyCode = props.currencyCode;
    this._timezone = props.timezone;
    this._status = props.status;

    this.validate();
  }

  // ==========
  // Getters
  // ==========

  get name(): string {
    return this._name;
  }

  get legalName(): string | null {
    return this._legalName;
  }

  get taxId(): string | null {
    return this._taxId;
  }

  get email(): string | null {
    return this._email;
  }

  get phone(): string | null {
    return this._phone;
  }

  get currencyCode(): string {
    return this._currencyCode;
  }

  get timezone(): string {
    return this._timezone;
  }

  get status(): CompanyStatus {
    return this._status;
  }

  // ==========
  // Domain Behavior
  // ==========

  activate(): void {
    this._status = CompanyStatus.ACTIVE;
  }

  suspend(): void {
    this._status = CompanyStatus.SUSPENDED;
  }

  deactivate(): void {
    this._status = CompanyStatus.INACTIVE;
  }

  changeName(name: string): void {
    if (!name.trim()) {
      throw new Error('Company name cannot be empty.');
    }

    this._name = name.trim();
  }

  changeLegalName(legalName: string | null): void {
    this._legalName = legalName?.trim() || null;
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

  changeTimezone(timezone: string): void {
    if (!timezone.trim()) {
      throw new Error('Timezone cannot be empty.');
    }

    this._timezone = timezone;
  }

  changeCurrency(currencyCode: string): void {
    if (!currencyCode.trim()) {
      throw new Error('Currency code cannot be empty.');
    }

    this._currencyCode = currencyCode.toUpperCase();
  }

  // ==========
  // Validation
  // ==========

  private validate(): void {
    if (!this._name.trim()) {
      throw new Error('Company name is required.');
    }

    if (!this._currencyCode.trim()) {
      throw new Error('Currency code is required.');
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

  update(props: {
    name: string;
    legalName: string | null;
    taxId: string | null;
    email: string | null;
    phone: string | null;
    currencyCode: string;
    timezone: string;
  }): void {
    this.changeName(props.name);
    this.changeLegalName(props.legalName);
    this.changeEmail(props.email);
    this.changePhone(props.phone);
    this.changeCurrency(props.currencyCode);
    this.changeTimezone(props.timezone);
    this.changeTaxId(props.taxId);
  }

  changeTaxId(taxId: string | null): void {
    this._taxId = taxId?.trim() || null;
  }
}