import { BusinessRuleException } from '../../../../../core/domain/exceptions';

export class CannotDeactivateStockException
  extends BusinessRuleException {

  constructor() {

    super(
      'Cannot deactivate a stock with available quantity.',
    );

  }

}