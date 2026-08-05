import { CreateProductCommandProps } from './create-product.command-props';

export class CreateProductCommand {
  readonly companyId: string;

  readonly categoryId: string;

  readonly brandId: string;

  readonly unitId: string;

  readonly code: string;

  readonly sku: string | null;

  readonly barcode: string | null;

  readonly name: string;

  readonly description: string | null;

  readonly purchasePrice: number;

  readonly cost: number;

  readonly salePrice: number;

  readonly imageUrl: string | null;

  constructor(props: CreateProductCommandProps) {
    Object.assign(this, props);
  }
}
