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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { PageResult } from '../../../../../core/application/pagination/page-result';
import { PaginationQueryDto } from '../../../../../core/presentation/dto/pagination-query.dto';

import { CreateBrandCommand } from '../../application/create-brand/create-brand.command';
import { CreateBrandResult } from '../../application/create-brand/create-brand.result';
import { CreateBrandUseCase } from '../../application/create-brand/create-brand.use-case';

import { GetBrandQuery } from '../../application/queries/get-brand/get-brand.query';
import { GetBrandResult } from '../../application/queries/get-brand/get-brand.result';
import { GetBrandUseCase } from '../../application/queries/get-brand/get-brand.use-case';

import { ListBrandsQuery } from '../../application/queries/list-brands/list-brands.query';
import { BrandSummaryResult } from '../../application/queries/list-brands/brand-summary.result';
import { ListBrandsUseCase } from '../../application/queries/list-brands/list-brands.use-case';

import { UpdateBrandCommand } from '../../application/update-brand/update-brand.command';
import { UpdateBrandResult } from '../../application/update-brand/update-brand.result';
import { UpdateBrandUseCase } from '../../application/update-brand/update-brand.use-case';

import { DeleteBrandCommand } from '../../application/delete-brand/delete-brand.command';
import { DeleteBrandResult } from '../../application/delete-brand/delete-brand.result';
import { DeleteBrandUseCase } from '../../application/delete-brand/delete-brand.use-case';

import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(
    private readonly createBrandUseCase: CreateBrandUseCase,
    private readonly getBrandUseCase: GetBrandUseCase,
    private readonly listBrandsUseCase: ListBrandsUseCase,
    private readonly updateBrandUseCase: UpdateBrandUseCase,
    private readonly deleteBrandUseCase: DeleteBrandUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create brand',
    description: 'Creates a new product brand.',
  })
  @ApiCreatedResponse({
    description: 'Brand created successfully.',
    type: CreateBrandResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description:
      'A brand with the same code already exists for this company.',
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  async create(
    @Body() dto: CreateBrandDto,
  ): Promise<CreateBrandResult> {

    return this.createBrandUseCase.execute(
      new CreateBrandCommand(
        dto.companyId,
        dto.code,
        dto.name,
        dto.description ?? null,
      ),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get brand by id',
    description: 'Returns a brand by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Brand identifier.',
  })
  @ApiOkResponse({
    description: 'Brand found.',
    type: GetBrandResult,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found.',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GetBrandResult> {

    return this.getBrandUseCase.execute(
      new GetBrandQuery(id),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List brands',
    description: 'Returns a paginated list of brands.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    example: 10,
  })
  @ApiOkResponse({
    description: 'Paginated list of brands.',
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PageResult<BrandSummaryResult>> {

    return this.listBrandsUseCase.execute(
      new ListBrandsQuery(
        query.page,
        query.pageSize,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update brand',
    description: 'Updates an existing brand.',
  })
  @ApiOkResponse({
    description: 'Brand updated successfully.',
    type: UpdateBrandResult,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found.',
  })
  @ApiConflictResponse({
    description:
      'A brand with the same code already exists for this company.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandDto,
  ): Promise<UpdateBrandResult> {

    return this.updateBrandUseCase.execute(
      new UpdateBrandCommand(
        id,
        dto.code!,
        dto.name!,
        dto.description ?? null,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete brand',
    description: 'Soft deletes an existing brand.',
  })
  @ApiOkResponse({
    description: 'Brand deleted successfully.',
    type: DeleteBrandResult,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found.',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteBrandResult> {

    return this.deleteBrandUseCase.execute(
      new DeleteBrandCommand(id),
    );
  }
}