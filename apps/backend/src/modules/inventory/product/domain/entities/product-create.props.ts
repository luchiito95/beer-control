import { ProductStatus } from '../enums/product-status.enum';

export interface ProductProps {
  id: string;

  companyId: string;
  categoryId: string;
  brandId: string;
  unitId: string;

  code: string;
  sku: string | null;
  barcode: string | null;

  name: string;
  description: string | null;

  purchasePrice: number;
  cost: number;
  salePrice: number;

  imageUrl: string | null;

  status: ProductStatus;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
