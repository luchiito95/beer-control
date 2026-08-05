import { ValidationException } from '../../../../../core/domain/exceptions';

export class InvalidMovementReferenceException
  extends ValidationException {

  constructor() {

    super(
      'Movement reference is invalid.',
    );

  }

}