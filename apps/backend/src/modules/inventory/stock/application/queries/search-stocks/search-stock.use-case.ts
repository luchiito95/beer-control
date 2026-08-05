import { Injectable } from '@nestjs/common';

import {
  StockRepository,
} from '../../../domain';

import { SearchStockQuery } from './search-stock.query';
import {
  SearchStockItemResult,
  SearchStockResult,
} from './search-stock.result';

@Injectable()
export class SearchStockUseCase {

  constructor(

    private readonly repository: StockRepository,

  ) {}

  async execute(
    query: SearchStockQuery,
  ): Promise<SearchStockResult> {

    const page =
      await this.repository.search(
        query.criteria,
      );

    return new SearchStockResult(

      page.items.map(stock =>

        new SearchStockItemResult(

          stock.id,

          stock.warehouseId,

          stock.productId,

          stock.onHand.toNumber(),

          stock.reserved.toNumber(),

          stock.available.toNumber(),

          stock.averageCost.toNumber(),

          stock.status,

        ),

      ),

      page.totalItems,

      page.criteria.page,

      page.criteria.pageSize,

    );

  }

}