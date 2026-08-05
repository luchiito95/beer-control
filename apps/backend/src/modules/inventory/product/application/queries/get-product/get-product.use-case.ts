import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../../../domain/repositories/product.repository';

import { ProductResponseMapper } from '../../../presentation/mappers/product-response.mapper';

import { GetProductQuery } from './get-product.query';
import { GetProductResult } from './get-product.result';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<GetProductResult> {
    const product = await this.repository.findById(query.id);

    if (!product) {
      throw new NotFoundException(`Product '${query.id}' not found.`);
    }

    return ProductResponseMapper.toGetResult(product);
  }
}
