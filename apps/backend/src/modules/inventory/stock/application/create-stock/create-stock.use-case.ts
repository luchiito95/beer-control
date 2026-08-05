import { Injectable } from '@nestjs/common';

import {
  Money,
  Quantity,
} from '@shared/domain';

import {
  ProductRepository,
} from '@inventory/product/domain';

import {
  WarehouseRepository,
} from '@inventory/warehouse/domain';

import {
  StockAlreadyExistsException,
  StockFactory,
  StockRepository,
} from '../../domain';

import { CreateStockCommand } from './create-stock.command';
import { CreateStockResult } from './create-stock.result';

@Injectable()
export class CreateStockUseCase {

  constructor(

    private readonly stockRepository: StockRepository,

    private readonly warehouseRepository: WarehouseRepository,

    private readonly productRepository: ProductRepository,

  ) {}

  async execute(
    command: CreateStockCommand,
  ): Promise<CreateStockResult> {

    // ============================
    // Validate Warehouse
    // ============================

    const warehouse =
      await this.warehouseRepository.findById(
        command.warehouseId,
      );

    if (!warehouse) {

      throw new Error(
        'Warehouse not found.',
      );

    }

    // ============================
    // Validate Product
    // ============================

    const product =
      await this.productRepository.findById(
        command.productId,
      );

    if (!product) {

      throw new Error(
        'Product not found.',
      );

    }

    // ============================
    // Validate existing Stock
    // ============================

    const existing =
      await this.stockRepository.findByWarehouseAndProduct(

        command.warehouseId,

        command.productId,

      );

    if (existing) {

      throw new StockAlreadyExistsException();

    }

    // ============================
    // Create Aggregate
    // ============================

    const stock =
      StockFactory.create(

        command.warehouseId,

        command.productId,

        new Quantity(
          command.onHand,
        ),

        new Money(
          command.averageCost,
        ),

      );

    // ============================
    // Persist
    // ============================

    const created =
      await this.stockRepository.create(
        stock,
      );

    // ============================
    // Return Result
    // ============================

    return new CreateStockResult(

      created.id!,

      created.warehouseId,

      created.productId,

      created.onHand.toNumber(),

      created.reserved.toNumber(),

      created.available.toNumber(),

      created.averageCost.toNumber(),

      created.status,

    );

  }

}