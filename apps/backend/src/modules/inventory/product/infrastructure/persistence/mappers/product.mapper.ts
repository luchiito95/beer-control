import {
  Prisma,
  Product as PrismaProduct,
  ProductStatus as PrismaProductStatus,
} from '@prisma/client';

import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductStatus } from '../../../domain/enums/product-status.enum';

export class ProductMapper {
  static toDomain(prismaProduct: PrismaProduct): ProductEntity {
    return new ProductEntity({
      id: prismaProduct.id,

      companyId: prismaProduct.companyId,

      categoryId: prismaProduct.categoryId,

      brandId: prismaProduct.brandId,

      unitId: prismaProduct.unitId,

      code: prismaProduct.code,

      sku: prismaProduct.sku,

      barcode: prismaProduct.barcode,

      name: prismaProduct.name,

      description: prismaProduct.description,

      purchasePrice: prismaProduct.purchasePrice.toNumber(),

      cost: prismaProduct.cost.toNumber(),

      salePrice: prismaProduct.salePrice.toNumber(),

      imageUrl: prismaProduct.imageUrl,

      status: ProductMapper.toDomainStatus(prismaProduct.status),

      createdAt: prismaProduct.createdAt,

      updatedAt: prismaProduct.updatedAt,

      deletedAt: prismaProduct.deletedAt,
    });
  }

  static toCreate(product: ProductEntity): Prisma.ProductCreateInput {
    return {
      company: {
        connect: {
          id: product.companyId,
        },
      },

      category: {
        connect: {
          id: product.categoryId,
        },
      },

      brand: {
        connect: {
          id: product.brandId,
        },
      },

      unit: {
        connect: {
          id: product.unitId,
        },
      },

      code: product.code,

      sku: product.sku,

      barcode: product.barcode,

      name: product.name,

      description: product.description,

      purchasePrice: new Prisma.Decimal(product.purchasePrice),

      cost: new Prisma.Decimal(product.cost),

      salePrice: new Prisma.Decimal(product.salePrice),

      imageUrl: product.imageUrl,

      status: ProductMapper.toPrismaStatus(product.status),
    };
  }

  static toUpdate(product: ProductEntity): Prisma.ProductUpdateInput {
    return {
      category: {
        connect: {
          id: product.categoryId,
        },
      },

      brand: {
        connect: {
          id: product.brandId,
        },
      },

      unit: {
        connect: {
          id: product.unitId,
        },
      },

      code: product.code,

      sku: product.sku,

      barcode: product.barcode,

      name: product.name,

      description: product.description,

      purchasePrice: new Prisma.Decimal(product.purchasePrice),

      cost: new Prisma.Decimal(product.cost),

      salePrice: new Prisma.Decimal(product.salePrice),

      imageUrl: product.imageUrl,

      status: ProductMapper.toPrismaStatus(product.status),
    };
  }

  private static toDomainStatus(status: PrismaProductStatus): ProductStatus {
    switch (status) {
      case PrismaProductStatus.ACTIVE:
        return ProductStatus.ACTIVE;

      case PrismaProductStatus.INACTIVE:
        return ProductStatus.INACTIVE;

      default:
        throw new Error(`Unknown ProductStatus: ${status}`);
    }
  }

  private static toPrismaStatus(status: ProductStatus): PrismaProductStatus {
    switch (status) {
      case ProductStatus.ACTIVE:
        return PrismaProductStatus.ACTIVE;

      case ProductStatus.INACTIVE:
        return PrismaProductStatus.INACTIVE;

      default:
        throw new Error(`Unknown ProductStatus: ${status}`);
    }
  }
}
