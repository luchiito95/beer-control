import { BaseEntity } from '../../../../../core/domain/entities/base.entity';

import { ProductStatus } from '../enums/product-status.enum';
import { ProductUpdateProps } from './product-update.props';
import { ProductProps } from './product-create.props';

export class ProductEntity extends BaseEntity {
  private _companyId: string;

  private _categoryId: string;

  private _brandId: string;

  private _unitId: string;

  private _code: string;

  private _sku: string | null;

  private _barcode: string | null;

  private _name: string;

  private _description: string | null;

  private _purchasePrice: number;

  private _cost: number;

  private _salePrice: number;

  private _imageUrl: string | null;

  private _status: ProductStatus;

  constructor(props: ProductProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });

    this._companyId = props.companyId;
    this._categoryId = props.categoryId;
    this._brandId = props.brandId;
    this._unitId = props.unitId;

    this._code = props.code;
    this._sku = props.sku;
    this._barcode = props.barcode;

    this._name = props.name;
    this._description = props.description;

    this._purchasePrice = props.purchasePrice;
    this._cost = props.cost;
    this._salePrice = props.salePrice;

    this._imageUrl = props.imageUrl;

    this._status = props.status;

    this.validate();
  }

  // =============================
  // Getters
  // =============================

  get companyId(): string {
    return this._companyId;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get brandId(): string {
    return this._brandId;
  }

  get unitId(): string {
    return this._unitId;
  }

  get code(): string {
    return this._code;
  }

  get sku(): string | null {
    return this._sku;
  }

  get barcode(): string | null {
    return this._barcode;
  }

  get name(): string {
    return this._name;
  }

  get description(): string | null {
    return this._description;
  }

  get purchasePrice(): number {
    return this._purchasePrice;
  }

  get cost(): number {
    return this._cost;
  }

  get salePrice(): number {
    return this._salePrice;
  }

  get imageUrl(): string | null {
    return this._imageUrl;
  }

  get status(): ProductStatus {
    return this._status;
  }

  // =============================
  // Computed properties
  // =============================

  get profit(): number {
    return this._salePrice - this._cost;
  }

  get margin(): number {
    if (this._cost === 0) {
      return 0;
    }

    return ((this._salePrice - this._cost) / this._cost) * 100;
  }

  // =============================
  // Status
  // =============================

  activate(): void {
    this._status = ProductStatus.ACTIVE;
  }

  deactivate(): void {
    this._status = ProductStatus.INACTIVE;
  }

  // =============================
  // Changes
  // =============================

  changeCode(code: string): void {
    if (!code.trim()) {
      throw new Error('Product code cannot be empty.');
    }

    this._code = code.trim().toUpperCase();
  }

  changeSku(sku: string | null): void {
    this._sku = sku?.trim() || null;
  }

  changeBarcode(barcode: string | null): void {
    this._barcode = barcode?.trim() || null;
  }

  changeName(name: string): void {
    if (!name.trim()) {
      throw new Error('Product name cannot be empty.');
    }

    this._name = name.trim();
  }

  changeDescription(description: string | null): void {
    this._description = description?.trim() || null;
  }

  changePurchasePrice(purchasePrice: number): void {
    if (purchasePrice < 0) {
      throw new Error('Purchase price cannot be negative.');
    }

    this._purchasePrice = purchasePrice;
  }

  changeCost(cost: number): void {
    if (cost < 0) {
      throw new Error('Cost cannot be negative.');
    }

    this._cost = cost;
  }

  changeSalePrice(salePrice: number): void {
    if (salePrice < 0) {
      throw new Error('Sale price cannot be negative.');
    }

    this._salePrice = salePrice;
  }

  changeImage(imageUrl: string | null): void {
    this._imageUrl = imageUrl?.trim() || null;
  }

  // =============================
  // Update
  // =============================

  update(props: ProductUpdateProps): void {
    this._categoryId = props.categoryId;
    this._brandId = props.brandId;
    this._unitId = props.unitId;

    this.changeCode(props.code);

    this.changeSku(props.sku);

    this.changeBarcode(props.barcode);

    this.changeName(props.name);

    this.changeDescription(props.description);

    this.changePurchasePrice(props.purchasePrice);

    this.changeCost(props.cost);

    this.changeSalePrice(props.salePrice);

    this.changeImage(props.imageUrl);

    this.validate();
  }

  // =============================
  // Validation
  // =============================

  private validate(): void {
    if (!this._companyId.trim()) {
      throw new Error('Company ID is required.');
    }

    if (!this._categoryId.trim()) {
      throw new Error('Category ID is required.');
    }

    if (!this._brandId.trim()) {
      throw new Error('Brand ID is required.');
    }

    if (!this._unitId.trim()) {
      throw new Error('Unit ID is required.');
    }

    if (!this._code.trim()) {
      throw new Error('Product code is required.');
    }

    if (!this._name.trim()) {
      throw new Error('Product name is required.');
    }

    if (this._purchasePrice < 0) {
      throw new Error('Purchase price cannot be negative.');
    }

    if (this._cost < 0) {
      throw new Error('Cost cannot be negative.');
    }

    if (this._salePrice < 0) {
      throw new Error('Sale price cannot be negative.');
    }
  }
}
