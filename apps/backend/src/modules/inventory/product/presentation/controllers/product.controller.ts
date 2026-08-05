import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SearchPage } from '../../../../../core/application/search/search-page';

import { CreateProductUseCase } from '../../application/create-product/create-product.use-case';
import { CreateProductResult } from '../../application/create-product/create-product.result';

import { UpdateProductUseCase } from '../../application/update-product/update-product.use-case';
import { UpdateProductResult } from '../../application/update-product/update-product.result';

import { DeleteProductUseCase } from '../../application/delete-product/delete-product.use-case';
import { DeleteProductResult } from '../../application/delete-product/delete-product.result';

import { GetProductUseCase } from '../../application/queries/get-product/get-product.use-case';
import { GetProductResult } from '../../application/queries/get-product/get-product.result';

import { SearchProductsUseCase } from '../../application/queries/search-products/search-products.use-case';
import { ProductSummaryResult } from '../../application/queries/search-products/product-summary.result';

import { CreateProductDto } from '../dto/create-product.dto';
import { SearchProductDto } from '../dto/search-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

import { ProductCommandMapper } from '../mappers/product-command.mapper';
import { ProductQueryMapper } from '../mappers/product-query.mapper';
import { ProductSearchMapper } from '../mappers/product-search.mapper';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly searchProductsUseCase: SearchProductsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create product',
    description: 'Creates a new product.',
  })
  @ApiCreatedResponse({
    description: 'Product created successfully.',
    type: CreateProductResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Product code already exists.',
  })
  async create(@Body() dto: CreateProductDto): Promise<CreateProductResult> {
    return this.createProductUseCase.execute(
      ProductCommandMapper.toCreate(dto),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product',
    description: 'Returns a product by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Product identifier.',
  })
  @ApiOkResponse({
    description: 'Product found.',
    type: GetProductResult,
  })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  async findById(@Param('id') id: string): Promise<GetProductResult> {
    return this.getProductUseCase.execute(ProductQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search products',
    description: 'Returns a paginated list of products.',
  })
  @ApiOkResponse({
    description: 'Products found.',
  })
  async search(
    @Query() dto: SearchProductDto,
  ): Promise<SearchPage<ProductSummaryResult>> {
    return this.searchProductsUseCase.execute(
      ProductQueryMapper.toSearch(ProductSearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Updates an existing product.',
  })
  @ApiOkResponse({
    description: 'Product updated successfully.',
    type: UpdateProductResult,
  })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  @ApiConflictResponse({
    description: 'Product code already exists.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<UpdateProductResult> {
    return this.updateProductUseCase.execute(
      ProductCommandMapper.toUpdate(id, dto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Soft deletes a product.',
  })
  @ApiOkResponse({
    description: 'Product deleted successfully.',
    type: DeleteProductResult,
  })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  async delete(@Param('id') id: string): Promise<DeleteProductResult> {
    return this.deleteProductUseCase.execute(ProductQueryMapper.toDelete(id));
  }
}
