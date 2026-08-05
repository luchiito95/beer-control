import { ValidationException } from '../../../../core/domain/exceptions/validation.exception';

import { Decimal } from '../../../../core/domain/value-objects/decimal';
import { DecimalValueObject } from '../../../../core/domain/value-objects/decimal-value-object';
import { Quantity } from './quantity.vo';

export class Money
  extends DecimalValueObject<Money> {

  constructor(
    value: Decimal | number | string,
  ) {

    super(value);

    if (this.isNegative()) {
      throw new ValidationException(
        'Money cannot be negative.',
      );
    }

  }

  static zero(): Money {

    return new Money(0);

  }

  multiply(
    quantity: Quantity,
  ): Money {

    return this.create(
      this.value.mul(
        quantity.toDecimal(),
      ),
    );

  }

  divide(
    quantity: Quantity,
  ): Money {

    if (quantity.isZero()) {
      throw new ValidationException(
        'Cannot divide by zero.',
      );
    }

    return this.create(
      this.value.div(
        quantity.toDecimal(),
      ),
    );

  }

  round(
    decimals = 2,
  ): Money {

    return this.create(
      this.value.toDecimalPlaces(decimals),
    );

  }

  protected create(
    value: Decimal,
  ): Money {

    return new Money(value);

  }

}