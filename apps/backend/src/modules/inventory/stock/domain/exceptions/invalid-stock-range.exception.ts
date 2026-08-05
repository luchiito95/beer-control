import { ValidationException } from '../../../../../core/domain/exceptions';

export class InvalidStockRangeException
  extends ValidationException {

  constructor() {

    super(
      'Minimum stock cannot exceed maximum stock.',
    );

  }

}