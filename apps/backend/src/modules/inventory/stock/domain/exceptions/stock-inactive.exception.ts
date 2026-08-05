import { BusinessRuleException } from '../../../../../core/domain/exceptions';

export class StockInactiveException
  extends BusinessRuleException {

  constructor() {

    super(
      'Stock is inactive.',
    );

  }

}