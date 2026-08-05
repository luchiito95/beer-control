import { BusinessRuleException } from '../../../../../core/domain/exceptions';

export class StockAlreadyActiveException
  extends BusinessRuleException {

  constructor() {

    super(
      'Stock is already active.',
    );

  }

}