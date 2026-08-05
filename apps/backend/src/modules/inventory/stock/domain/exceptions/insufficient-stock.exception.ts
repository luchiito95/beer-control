import { BusinessRuleException } from '../../../../../core/domain/exceptions';

export class InsufficientStockException
  extends BusinessRuleException {

  constructor() {

    super(
      'Insufficient stock available.',
    );

  }

}