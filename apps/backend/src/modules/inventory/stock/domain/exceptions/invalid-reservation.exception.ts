import { BusinessRuleException } from '../../../../../core/domain/exceptions';

export class InvalidReservationException
  extends BusinessRuleException {

  constructor() {

    super(
      'Reserved quantity cannot exceed available quantity.',
    );

  }

}