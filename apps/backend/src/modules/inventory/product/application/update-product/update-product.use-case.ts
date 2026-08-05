import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CategoryRepository } from '../../../category/domain/repositories/category.repository';
import { BrandRepository } from '../../../brand/domain/repositories/brand.repository';
import { UnitRepository } from '../../../unit/domain/repositories/unit.repository';

import { ProductRepository } from '../../domain/repositories/product.repository';

import { UpdateProductCommand } from './update-product.command';
import { ProductUpdateProps } from '../../domain/entities/product-update.props';
import { UpdateProductResult } from './update-product.result';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,

    private readonly categoryRepository: CategoryRepository,

    private readonly brandRepository: BrandRepository,

    private readonly unitRepository: UnitRepository,
  ) {}

  async execute(command: UpdateProductCommand): Promise<UpdateProductResult> {
    const product = await this.productRepository.findById(command.id);

    if (!product) {
      throw new NotFoundException(`Product '${command.id}' not found.`);
    }

    const category = await this.categoryRepository.findById(command.categoryId);

    if (!category) {
      throw new NotFoundException(
        `Category '${command.categoryId}' not found.`,
      );
    }

    const brand = await this.brandRepository.findById(command.brandId);

    if (!brand) {
      throw new NotFoundException(`Brand '${command.brandId}' not found.`);
    }

    const unit = await this.unitRepository.findById(command.unitId);

    if (!unit) {
      throw new NotFoundException(`Unit '${command.unitId}' not found.`);
    }

    if (product.code !== command.code) {
      const existing = await this.productRepository.findByCompanyAndCode(
        product.companyId,
        command.code,
      );

      if (existing && existing.id !== product.id) {
        throw new ConflictException(
          `Product code '${command.code}' already exists.`,
        );
      }
    }

    const updateProps: ProductUpdateProps = {
      categoryId: command.categoryId,

      brandId: command.brandId,

      unitId: command.unitId,

      code: command.code,

      sku: command.sku,

      barcode: command.barcode,

      name: command.name,

      description: command.description,

      purchasePrice: command.purchasePrice,

      cost: command.cost,

      salePrice: command.salePrice,

      imageUrl: command.imageUrl,
    };

    product.update(updateProps);

    const updated = await this.productRepository.update(product);

    return new UpdateProductResult(
      updated.id,

      updated.code,

      updated.name,

      updated.sku,

      updated.barcode,

      updated.salePrice,

      updated.status,
    );
  }
}
