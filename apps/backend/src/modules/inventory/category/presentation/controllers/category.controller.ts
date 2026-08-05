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

import { CreateCategoryUseCase } from '../../application/create-category/create-category.use-case';
import { CreateCategoryResult } from '../../application/create-category/create-category.result';

import { UpdateCategoryUseCase } from '../../application/update-category/update-category.use-case';
import { UpdateCategoryResult } from '../../application/update-category/update-category.result';

import { DeleteCategoryUseCase } from '../../application/delete-category/delete-category.use-case';
import { DeleteCategoryResult } from '../../application/delete-category/delete-category.result';

import { GetCategoryUseCase } from '../../application/queries/get-category/get-category.use-case';
import { GetCategoryResult } from '../../application/queries/get-category/get-category.result';

import { SearchCategoriesUseCase } from '../../application/queries/search-categories/search-categories.use-case';
import { CategorySummaryResult } from '../../application/queries/search-categories/category-summary.result';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { SearchCategoryDto } from '../dto/search-category.dto';

import { CategoryCommandMapper } from '../mappers/category-command.mapper';
import { CategoryQueryMapper } from '../mappers/category-query.mapper';
import { CategorySearchMapper } from '../mappers/category-search.mapper';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly searchCategoriesUseCase: SearchCategoriesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create category',
    description: 'Creates a new product category.',
  })
  @ApiCreatedResponse({
    description: 'Category created successfully.',
    type: CreateCategoryResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Category code already exists.',
  })
  async create(@Body() dto: CreateCategoryDto): Promise<CreateCategoryResult> {
    return this.createCategoryUseCase.execute(
      CategoryCommandMapper.toCreate(dto),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Category identifier.',
  })
  @ApiOkResponse({
    type: GetCategoryResult,
  })
  async findById(@Param('id') id: string): Promise<GetCategoryResult> {
    return this.getCategoryUseCase.execute(CategoryQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search categories',
    description: 'Returns a paginated list of categories using filters.',
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
  async search(
    @Query() dto: SearchCategoryDto,
  ): Promise<SearchPage<CategorySummaryResult>> {
    return this.searchCategoriesUseCase.execute(
      CategoryQueryMapper.toSearch(CategorySearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResult> {
    return this.updateCategoryUseCase.execute(
      CategoryCommandMapper.toUpdate(
        id,

        dto,
      ),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteCategoryResult> {
    return this.deleteCategoryUseCase.execute(CategoryQueryMapper.toDelete(id));
  }
}
