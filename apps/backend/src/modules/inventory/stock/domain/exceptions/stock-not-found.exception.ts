import { NotFoundException } from '@core/domain/exceptions';

export class StockNotFoundException
  extends NotFoundException {

  constructor() {

    super(
      'Stock not found.',
    );

  }

}