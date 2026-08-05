import { Injectable } from '@nestjs/common';

import {
  InventoryMovementRepository,
} from '../../../domain';

import { SearchInventoryMovementsQuery } from './search-inventory-movements.query';

import {
  SearchInventoryMovementItemResult,
  SearchInventoryMovementsResult,
} from './search-inventory-movements.result';

@Injectable()
export class SearchInventoryMovementsUseCase {

  constructor(

    private readonly repository: InventoryMovementRepository,

  ) {}

  async execute(
    query: SearchInventoryMovementsQuery,
  ): Promise<SearchInventoryMovementsResult> {

    const page =
      await this.repository.search(
        query.criteria,
      );

    return new SearchInventoryMovementsResult(

      page.items.map(

        movement =>

          new SearchInventoryMovementItemResult(

            movement.id,

            movement.stockId,

            movement.warehouseId,

            movement.productId,

            movement.type,

            movement.reason,

            movement.source,

            movement.quantity.toNumber(),

            movement.balanceBefore.toNumber(),

            movement.balanceAfter.toNumber(),

            movement.unitCost.toNumber(),

            movement.totalCost.toNumber(),

            movement.performedBy,

            movement.performedAt,

          ),

      ),

      page.totalItems,

      page.criteria.page,

      page.criteria.pageSize,

    );

  }

}