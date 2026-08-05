import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CompanyRepository } from '../../../../organization/company/domain/repositories/company.repository';

import { CategoryRepository } from '../../../category/domain/repositories/category.repository';
import { BrandRepository } from '../../../brand/domain/repositories/brand.repository';
import { UnitRepository } from '../../../unit/domain/repositories/unit.repository';

import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { ProductRepository } from '../../domain/repositories/product.repository';

import { CreateProductCommand } from './create-product.command';
import { CreateProductResult } from './create-product.result';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,

    private readonly companyRepository: CompanyRepository,

    private readonly categoryRepository: CategoryRepository,

    private readonly brandRepository: BrandRepository,

    private readonly unitRepository: UnitRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<CreateProductResult> {
    const company = await this.companyRepository.findById(command.companyId);

    if (!company) {
      throw new NotFoundException(`Company '${command.companyId}' not found.`);
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

    const existing = await this.productRepository.findByCompanyAndCode(
      command.companyId,

      command.code,
    );

    if (existing) {
      throw new ConflictException(
        `Product code '${command.code}' already exists.`,
      );
    }

    const product = new ProductEntity({
      id: '',

      companyId: command.companyId,

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

      status: ProductStatus.ACTIVE,

      createdAt: new Date(),

      updatedAt: new Date(),

      deletedAt: null,
    });

    const created = await this.productRepository.create(product);

    return new CreateProductResult(
      created.id,

      created.code,

      created.name,

      created.sku,

      created.barcode,

      created.salePrice,

      created.status,
    );
  }
}
