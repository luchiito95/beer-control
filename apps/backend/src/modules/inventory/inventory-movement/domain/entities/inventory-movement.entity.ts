import { AggregateRoot } from '../../../../../core/domain/entities';

import {
  Money,
  Quantity,
} from '../../../../shared/domain';

import { ValidationException } from '../../../../../core/domain/exceptions';

import {
  InventoryMovementReason,
  InventoryMovementSource,
  InventoryMovementType,
} from '../enums';

import { InventoryMovementProps } from './inventory-movement.props';

export class InventoryMovementEntity
  extends AggregateRoot {

  private readonly _stockId: string;

  private readonly _warehouseId: string;

  private readonly _productId: string;

  private readonly _type: InventoryMovementType;

  private readonly _reason: InventoryMovementReason;

  private readonly _source: InventoryMovementSource;

  private readonly _referenceId: string | null;

  private readonly _quantity: Quantity;

  private readonly _balanceBefore: Quantity;

  private readonly _balanceAfter: Quantity;

  private readonly _unitCost: Money;

  private readonly _performedBy: string;

  private readonly _performedAt: Date;

  private readonly _notes: string | null;

  constructor(
    props: InventoryMovementProps,
  ) {

    super(props);

    this._stockId = props.stockId;

    this._warehouseId = props.warehouseId;

    this._productId = props.productId;

    this._type = props.type;

    this._reason = props.reason;

    this._source = props.source;

    this._referenceId = props.referenceId;

    this._quantity = props.quantity;

    this._balanceBefore = props.balanceBefore;

    this._balanceAfter = props.balanceAfter;

    this._unitCost = props.unitCost;

    this._performedBy = props.performedBy;

    this._performedAt = props.performedAt;

    this._notes = props.notes;

    this.validate();

  }

  // =====================================
  // Getters
  // =====================================

  get stockId(): string {

    return this._stockId;

  }

  get totalCost(): Money {

  return this._unitCost.multiply(
    this._quantity,
  );

}

  get warehouseId(): string {

    return this._warehouseId;

  }

  get productId(): string {

    return this._productId;

  }

  get type(): InventoryMovementType {

    return this._type;

  }

  get reason(): InventoryMovementReason {

    return this._reason;

  }

  get source(): InventoryMovementSource {

    return this._source;

  }

  get referenceId(): string | null {

    return this._referenceId;

  }

  get quantity(): Quantity {

    return this._quantity;

  }

  get balanceBefore(): Quantity {

    return this._balanceBefore;

  }

  get balanceAfter(): Quantity {

    return this._balanceAfter;

  }

  get unitCost(): Money {

    return this._unitCost;

  }

  get performedBy(): string {

    return this._performedBy;

  }

  get performedAt(): Date {

    return this._performedAt;

  }

  get notes(): string | null {

    return this._notes;

  }

  // =====================================
  // Computed Properties
  // =====================================

  get totalValue(): Money {

    return this._unitCost.multiply(
      this._quantity,
    );

  }

  get hasReference(): boolean {

    return this._referenceId !== null;

  }

  get affectsInventory(): boolean {

    return this.isEntry || this.isExit;

  }

  get isEntry(): boolean {

    return [

      InventoryMovementType.INITIAL,

      InventoryMovementType.PURCHASE,

      InventoryMovementType.RETURN,

      InventoryMovementType.TRANSFER_IN,

      InventoryMovementType.ADJUSTMENT,

      InventoryMovementType.CORRECTION,

    ].includes(
      this._type,
    );

  }

  get isExit(): boolean {

    return [

      InventoryMovementType.SALE,

      InventoryMovementType.TRANSFER_OUT,

    ].includes(
      this._type,
    );

  }

  // =====================================
  // Validation
  // =====================================

  private validate(): void {

    if (
      this._stockId.trim().length === 0
    ) {

      throw new ValidationException(
        'Stock is required.',
      );

    }

    if (
      this._warehouseId.trim().length === 0
    ) {

      throw new ValidationException(
        'Warehouse is required.',
      );

    }

    if (
      this._productId.trim().length === 0
    ) {

      throw new ValidationException(
        'Product is required.',
      );

    }

    if (
      this._performedBy.trim().length === 0
    ) {

      throw new ValidationException(
        'Performed by is required.',
      );

    }

    if (
      this._quantity.isZero()
    ) {

      throw new ValidationException(
        'Quantity must be greater than zero.',
      );

    }

    if (
      this._balanceBefore.isNegative()
    ) {

      throw new ValidationException(
        'Balance before cannot be negative.',
      );

    }

    if (
      this._balanceAfter.isNegative()
    ) {

      throw new ValidationException(
        'Balance after cannot be negative.',
      );

    }

  }

}