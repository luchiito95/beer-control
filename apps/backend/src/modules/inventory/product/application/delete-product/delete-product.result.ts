import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductResult {
  @ApiProperty({
    example: 'Product deleted successfully.',
  })
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
