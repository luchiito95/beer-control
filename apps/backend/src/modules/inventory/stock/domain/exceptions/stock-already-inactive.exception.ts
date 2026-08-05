import { BusinessRuleException } from '../../../../../core/domain/exceptions';

export class StockAlreadyInactiveException
  extends BusinessRuleException {

  constructor() {

    super(
      'Stock is already inactive.',
    );

  }

}