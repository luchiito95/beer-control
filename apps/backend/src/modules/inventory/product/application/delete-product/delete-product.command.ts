import { DeleteProductCommandProps } from './delete-product.command-props';

export class DeleteProductCommand {
  readonly id: string;

  constructor(props: DeleteProductCommandProps) {
    Object.assign(this, props);
  }
}
