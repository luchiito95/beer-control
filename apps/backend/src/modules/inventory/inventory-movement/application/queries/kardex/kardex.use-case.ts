import { Injectable } from '@nestjs/common';

import {
  InventoryMovementRepository,
} from '../../../domain';

import { KardexQuery } from './kardex.query';

import {
  KardexItemResult,
  KardexResult,
} from './kardex.result';

@Injectable()
export class KardexUseCase {

  constructor(

    private readonly repository: InventoryMovementRepository,

  ) {}

  async execute(
    query: KardexQuery,
  ): Promise<KardexResult> {

    const page =
      await this.repository.search(
        query.criteria,
      );

    return new KardexResult(

      page.items.map(

        movement =>

          new KardexItemResult(

            movement.id,

            movement.warehouseId,

            movement.productId,

            movement.type,

            movement.reason,

            movement.quantity.toNumber(),

            movement.balanceBefore.toNumber(),

            movement.balanceAfter.toNumber(),

            movement.unitCost.toNumber(),

            movement.totalCost.toNumber(),

            movement.performedBy,

            movement.performedAt,

            movement.referenceId,

            movement.notes,

          ),

      ),

      page.totalItems,

      page.criteria.page,

      page.criteria.pageSize,

    );

  }

}