import { Decimal } from './decimal';

import { ValueObject } from './base.value-object';

export abstract class DecimalValueObject<
  TSelf extends DecimalValueObject<TSelf>,
> extends ValueObject<Decimal> {

  protected constructor(
    value: Decimal | number | string,
  ) {

    super(
      new Decimal(value),
    );

  }

  protected abstract create(
    value: Decimal,
  ): TSelf;

  plus(
    other: TSelf,
  ): TSelf {

    return this.create(
      this.value.plus(other.value),
    );

  }

  minus(
    other: TSelf,
  ): TSelf {

    return this.create(
      this.value.minus(other.value),
    );

  }

  greaterThan(
    other: TSelf,
  ): boolean {

    return this.value.greaterThan(
      other.value,
    );

  }

  greaterThanOrEqual(
    other: TSelf,
  ): boolean {

    return this.value.greaterThanOrEqualTo(
      other.value,
    );

  }

  lessThan(
    other: TSelf,
  ): boolean {

    return this.value.lessThan(
      other.value,
    );

  }

  lessThanOrEqual(
    other: TSelf,
  ): boolean {

    return this.value.lessThanOrEqualTo(
      other.value,
    );

  }

  isZero(): boolean {

    return this.value.isZero();

  }

  isPositive(): boolean {

    return this.value.greaterThan(0);

  }

  isNegative(): boolean {

    return this.value.isNegative();

  }

  abs(): TSelf {

    return this.create(
      this.value.abs(),
    );

  }

  toDecimal(): Decimal {

    return this.value;

  }

  toNumber(): number {

    return this.value.toNumber();

  }

  toString(): string {

    return this.value.toString();

  }

  protected isEqualValue(
    value: Decimal,
  ): boolean {

    return this.value.equals(value);

  }

}