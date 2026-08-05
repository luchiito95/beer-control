import { BaseRepository } from '../../../../../core/domain/repositories/base.repository';

import {
  StockEntity,
} from '../entities';

export abstract class StockRepository
  extends BaseRepository<StockEntity> {

  /**
   * Obtiene el stock de un producto dentro de una bodega.
   */
  abstract findByWarehouseAndProduct(
    warehouseId: string,
    productId: string,
  ): Promise<StockEntity | null>;

}