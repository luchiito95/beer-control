export interface UpdateProductCommandProps {
  id: string;

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
}
