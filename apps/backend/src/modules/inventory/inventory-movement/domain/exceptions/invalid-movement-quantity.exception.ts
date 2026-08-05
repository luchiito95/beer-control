import { ValidationException } from '../../../../../core/domain/exceptions';

export class InvalidMovementQuantityException
  extends ValidationException {

  constructor() {

    super(
      'Movement quantity must be greater than zero.',
    );

  }

}