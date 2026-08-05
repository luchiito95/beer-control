import { ValidationException } from '../../../../../core/domain/exceptions';

export class InvalidMovementUserException
  extends ValidationException {

  constructor() {

    super(
      'Movement user is required.',
    );

  }

}