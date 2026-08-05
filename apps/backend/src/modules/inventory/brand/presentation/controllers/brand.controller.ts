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

import { SearchPage } from '../../../../../core/application/search/search-page';

import { CreateBrandUseCase } from '../../application/create-brand/create-brand.use-case';
import { CreateBrandResult } from '../../application/create-brand/create-brand.result';

import { UpdateBrandUseCase } from '../../application/update-brand/update-brand.use-case';
import { UpdateBrandResult } from '../../application/update-brand/update-brand.result';

import { DeleteBrandUseCase } from '../../application/delete-brand/delete-brand.use-case';
import { DeleteBrandResult } from '../../application/delete-brand/delete-brand.result';

import { GetBrandUseCase } from '../../application/queries/get-brand/get-brand.use-case';
import { GetBrandResult } from '../../application/queries/get-brand/get-brand.result';

import { SearchBrandsUseCase } from '../../application/queries/search-brands/search-brands.use-case';
import { BrandSummaryResult } from '../../application/queries/search-brands/brand-summary.result';

import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { SearchBrandDto } from '../dto/search-brand.dto';

import { BrandCommandMapper } from '../mappers/brand-command.mapper';
import { BrandQueryMapper } from '../mappers/brand-query.mapper';
import { BrandSearchMapper } from '../mappers/brand-search.mapper';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(
    private readonly createBrandUseCase: CreateBrandUseCase,
    private readonly updateBrandUseCase: UpdateBrandUseCase,
    private readonly deleteBrandUseCase: DeleteBrandUseCase,
    private readonly getBrandUseCase: GetBrandUseCase,
    private readonly searchBrandsUseCase: SearchBrandsUseCase,
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
    description: 'Brand code already exists.',
  })
  async create(@Body() dto: CreateBrandDto): Promise<CreateBrandResult> {
    return this.createBrandUseCase.execute(BrandCommandMapper.toCreate(dto));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get brand by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Brand identifier.',
  })
  @ApiOkResponse({
    type: GetBrandResult,
  })
  async findById(@Param('id') id: string): Promise<GetBrandResult> {
    return this.getBrandUseCase.execute(BrandQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search brands',
    description: 'Returns a paginated list of brands.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
  })
  async search(
    @Query() dto: SearchBrandDto,
  ): Promise<SearchPage<BrandSummaryResult>> {
    return this.searchBrandsUseCase.execute(
      BrandQueryMapper.toSearch(BrandSearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandDto,
  ): Promise<UpdateBrandResult> {
    return this.updateBrandUseCase.execute(
      BrandCommandMapper.toUpdate(
        id,

        dto,
      ),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteBrandResult> {
    return this.deleteBrandUseCase.execute(BrandQueryMapper.toDelete(id));
  }
}
