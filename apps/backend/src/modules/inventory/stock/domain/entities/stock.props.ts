import { BaseEntityProps } from '../../../../../core/domain/entities';

import {
  Money,
  Quantity,
} from '../../../../shared/domain';

import { StockStatus } from '../enums';

export interface StockProps
  extends BaseEntityProps{

  warehouseId: string;

  productId: string;

  /**
   * Existencia física.
   */
  onHand: Quantity;

  /**
   * Cantidad reservada.
   */
  reserved: Quantity;

  /**
   * Costo promedio ponderado.
   */
  averageCost: Money;

  status: StockStatus;

}