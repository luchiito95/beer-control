import { CreateProductCommand } from '../../application/create-product/create-product.command';
import { UpdateProductCommand } from '../../application/update-product/update-product.command';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

export class ProductCommandMapper {
  static toCreate(dto: CreateProductDto): CreateProductCommand {
    return new CreateProductCommand({
      companyId: dto.companyId,

      categoryId: dto.categoryId,

      brandId: dto.brandId,

      unitId: dto.unitId,

      code: dto.code,

      sku: dto.sku ?? null,

      barcode: dto.barcode ?? null,

      name: dto.name,

      description: dto.description ?? null,

      purchasePrice: dto.purchasePrice,

      cost: dto.cost,

      salePrice: dto.salePrice,

      imageUrl: dto.imageUrl ?? null,
    });
  }

  static toUpdate(id: string, dto: UpdateProductDto): UpdateProductCommand {
    return new UpdateProductCommand({
      id,

      categoryId: dto.categoryId!,

      brandId: dto.brandId!,

      unitId: dto.unitId!,

      code: dto.code!,

      sku: dto.sku ?? null,

      barcode: dto.barcode ?? null,

      name: dto.name!,

      description: dto.description ?? null,

      purchasePrice: dto.purchasePrice!,

      cost: dto.cost!,

      salePrice: dto.salePrice!,

      imageUrl: dto.imageUrl ?? null,
    });
  }
}
