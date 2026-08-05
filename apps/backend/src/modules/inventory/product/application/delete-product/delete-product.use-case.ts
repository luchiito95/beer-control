import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductRepository } from '../../domain/repositories/product.repository';

import { DeleteProductCommand } from './delete-product.command';
import { DeleteProductResult } from './delete-product.result';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: DeleteProductCommand): Promise<DeleteProductResult> {
    const product = await this.repository.findById(command.id);

    if (!product) {
      throw new NotFoundException(`Product '${command.id}' not found.`);
    }

    await this.repository.softDelete(command.id);

    return new DeleteProductResult('Product deleted successfully.');
  }
}
