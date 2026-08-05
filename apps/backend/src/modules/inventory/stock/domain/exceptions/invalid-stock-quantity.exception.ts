import { ValidationException } from '../../../../../core/domain/exceptions';

export class InvalidStockQuantityException
  extends ValidationException {

  constructor() {

    super(
      'Quantity must be greater than zero.',
    );

  }

}