import { randomUUID } from 'crypto';

import {
  Money,
  Quantity,
} from '@shared/domain';

import {
  StockEntity,
  StockProps,
} from '../entities';

import { StockStatus } from '../enums';

export class StockFactory {

  static create(
    warehouseId: string,
    productId: string,
    onHand: Quantity = Quantity.zero(),
    averageCost: Money = Money.zero(),
  ): StockEntity {

    const now = new Date();

    const props: StockProps = {

      id: randomUUID(),

      warehouseId,

      productId,

      onHand,

      reserved: Quantity.zero(),

      averageCost,

      status: StockStatus.ACTIVE,

      createdAt: now,

      updatedAt: now,

      deletedAt: null,

    };

    return new StockEntity(
      props,
    );

  }

}