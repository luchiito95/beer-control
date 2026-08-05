import { BusinessRuleException } from '@core/domain/exceptions';

export class StockAlreadyExistsException
  extends BusinessRuleException {

  constructor() {

    super(
      'The stock already exists.',
    );

  }

}