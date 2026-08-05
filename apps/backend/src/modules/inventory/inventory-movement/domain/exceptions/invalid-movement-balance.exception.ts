import { ValidationException } from '../../../../../core/domain/exceptions';

export class InvalidMovementBalanceException
  extends ValidationException {

  constructor() {

    super(
      'Movement balance cannot be negative.',
    );

  }

}