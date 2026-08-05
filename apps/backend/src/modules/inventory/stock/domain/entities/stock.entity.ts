import { AggregateRoot } from '../../../../../core/domain/entities/aggregate-root';

import {
  Money,
  Quantity,
} from '../../../../shared/domain';

import { StockStatus } from '../enums';

import {
  CannotDeactivateStockException,
  InsufficientStockException,
  InvalidReservationException,
  InvalidStockQuantityException,
  StockAlreadyActiveException,
  StockAlreadyInactiveException,
  StockInactiveException,
} from '../exceptions';

import { StockProps } from './stock.props';

export class StockEntity
  extends AggregateRoot {

  private readonly _warehouseId: string;

  private readonly _productId: string;

  private _onHand: Quantity;

  private _reserved: Quantity;

  private _averageCost: Money;

  private _status: StockStatus;

  constructor(
    props: StockProps,
  ) {

    super(props);

    this._warehouseId =
      props.warehouseId;

    this._productId =
      props.productId;

    this._onHand =
      props.onHand;

    this._reserved =
      props.reserved;

    this._averageCost =
      props.averageCost;

    this._status =
      props.status;

    this.validate();

  }

  // =====================================
  // Getters
  // =====================================

  get warehouseId(): string {

    return this._warehouseId;

  }

  get productId(): string {

    return this._productId;

  }

  get onHand(): Quantity {

    return this._onHand;

  }

  get reserved(): Quantity {

    return this._reserved;

  }

  get averageCost(): Money {

    return this._averageCost;

  }

  get status(): StockStatus {

    return this._status;

  }

  // =====================================
  // Computed Properties
  // =====================================

  get available(): Quantity {

    return this._onHand.minus(
      this._reserved,
    );

  }

  get isActive(): boolean {

    return (
      this._status ===
      StockStatus.ACTIVE
    );

  }

  get hasAvailableStock(): boolean {

    return !this.available.isZero();

  }

  // =====================================
  // Status
  // =====================================

  activate(): void {

    if (this.isActive) {

      throw new StockAlreadyActiveException();

    }

    this._status =
      StockStatus.ACTIVE;

    this.touch();

  }

  deactivate(): void {

    if (!this.isActive) {

      throw new StockAlreadyInactiveException();

    }

    if (!this._onHand.isZero()) {

      throw new CannotDeactivateStockException();

    }

    this._status =
      StockStatus.INACTIVE;

    this.touch();

  }

  // =====================================
  // Stock Operations
  // =====================================

  increase(
    quantity: Quantity,
    unitCost: Money,
  ): void {

    this.ensureActive();

    this.ensurePositiveQuantity(
      quantity,
    );

    const currentQuantity =
      this._onHand;

    const currentValue =
      this._averageCost.multiply(
        currentQuantity,
      );

    const incomingValue =
      unitCost.multiply(
        quantity,
      );

    const newQuantity =
      currentQuantity.plus(
        quantity,
      );

    const newAverageCost =
      currentValue
        .plus(
          incomingValue,
        )
        .divide(
          newQuantity,
        );

    this._onHand =
      newQuantity;

    this._averageCost =
      newAverageCost;

    this.touch();

  }

  decrease(
    quantity: Quantity,
  ): void {

    this.ensureActive();

    this.ensurePositiveQuantity(
      quantity,
    );

    this.ensureAvailableQuantity(
      quantity,
    );

    this._onHand =
      this._onHand.minus(
        quantity,
      );

    this.touch();

  }

  reserve(
    quantity: Quantity,
  ): void {

    this.ensureActive();

    this.ensurePositiveQuantity(
      quantity,
    );

    if (
      quantity.greaterThan(
        this.available,
      )
    ) {

      throw new InvalidReservationException();

    }

    this._reserved =
      this._reserved.plus(
        quantity,
      );

    this.touch();

  }

  release(
    quantity: Quantity,
  ): void {

    this.ensureActive();

    this.ensurePositiveQuantity(
      quantity,
    );

    if (
      quantity.greaterThan(
        this._reserved,
      )
    ) {

      throw new InvalidReservationException();

    }

    this._reserved =
      this._reserved.minus(
        quantity,
      );

    this.touch();

  }

  changeAverageCost(
    averageCost: Money,
  ): void {

    this.ensureActive();

    this._averageCost =
      averageCost;

    this.touch();

  }

  // =====================================
  // Guards
  // =====================================

  private ensureActive(): void {

    if (!this.isActive) {

      throw new StockInactiveException();

    }

  }

  private ensurePositiveQuantity(
    quantity: Quantity,
  ): void {

    if (quantity.isZero()) {

      throw new InvalidStockQuantityException();

    }

  }

  private ensureAvailableQuantity(
    quantity: Quantity,
  ): void {

    if (
      quantity.greaterThan(
        this.available,
      )
    ) {

      throw new InsufficientStockException();

    }

  }

  // =====================================
  // Validation
  // =====================================

  private validate(): void {

    if (
      this._reserved.greaterThan(
        this._onHand,
      )
    ) {

      throw new InvalidReservationException();

    }

  }

}