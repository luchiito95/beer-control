import { UpdateProductCommandProps } from './update-product.command-props';

export class UpdateProductCommand {
  readonly id: string;

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

  constructor(props: UpdateProductCommandProps) {
    Object.assign(this, props);
  }
}
