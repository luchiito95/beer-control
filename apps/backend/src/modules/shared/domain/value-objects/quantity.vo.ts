import { ValidationException } from '../../../../core/domain/exceptions/validation.exception';

import { Decimal } from '../../../../core/domain/value-objects/decimal';
import { DecimalValueObject } from '../../../../core/domain/value-objects/decimal-value-object';

export class Quantity
  extends DecimalValueObject<Quantity> {

  constructor(
    value: Decimal | number | string,
  ) {

    super(value);

    if (this.isNegative()) {
      throw new ValidationException(
        'Quantity cannot be negative.',
      );
    }

  }

  static zero(): Quantity {

    return new Quantity(0);

  }

  static one(): Quantity {

    return new Quantity(1);

  }

  multiply(
    factor: Decimal | number,
  ): Quantity {

    return this.create(
      this.value.mul(factor),
    );

  }

  divide(
    divisor: Decimal | number,
  ): Quantity {

    const decimal =
      new Decimal(divisor);

    if (decimal.isZero()) {
      throw new ValidationException(
        'Cannot divide by zero.',
      );
    }

    return this.create(
      this.value.div(decimal),
    );

  }

  protected create(
    value: Decimal,
  ): Quantity {

    return new Quantity(value);

  }

}