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

import { CreateCategoryCommand } from '../../application/create-category/create-category.command';
import { CreateCategoryResult } from '../../application/create-category/create-category.result';
import { CreateCategoryUseCase } from '../../application/create-category/create-category.use-case';

import { GetCategoryQuery } from '../../application/queries/get-category/get-category.query';
import { GetCategoryResult } from '../../application/queries/get-category/get-category.result';
import { GetCategoryUseCase } from '../../application/queries/get-category/get-category.use-case';

import { ListCategoriesQuery } from '../../application/queries/list-categories/list-categories.query';
import { CategorySummaryResult } from '../../application/queries/list-categories/category-summary.result';
import { ListCategoriesUseCase } from '../../application/queries/list-categories/list-categories.use-case';

import { UpdateCategoryCommand } from '../../application/update-category/update-category.command';
import { UpdateCategoryResult } from '../../application/update-category/update-category.result';
import { UpdateCategoryUseCase } from '../../application/update-category/update-category.use-case';

import { DeleteCategoryCommand } from '../../application/delete-category/delete-category.command';
import { DeleteCategoryResult } from '../../application/delete-category/delete-category.result';
import { DeleteCategoryUseCase } from '../../application/delete-category/delete-category.use-case';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
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
    description:
      'A category with the same code already exists for this company.',
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<CreateCategoryResult> {

    return this.createCategoryUseCase.execute(
      new CreateCategoryCommand(
        dto.companyId,
        dto.code,
        dto.name,
        dto.description ?? null,
      ),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by id',
    description: 'Returns a category by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Category identifier.',
  })
  @ApiOkResponse({
    description: 'Category found.',
    type: GetCategoryResult,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GetCategoryResult> {

    return this.getCategoryUseCase.execute(
      new GetCategoryQuery(id),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List categories',
    description:
      'Returns a paginated list of categories.',
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
    description: 'Paginated list of categories.',
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PageResult<CategorySummaryResult>> {

    return this.listCategoriesUseCase.execute(
      new ListCategoriesQuery(
        query.page,
        query.pageSize,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update category',
    description: 'Updates an existing category.',
  })
  @ApiOkResponse({
    description: 'Category updated successfully.',
    type: UpdateCategoryResult,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  @ApiConflictResponse({
    description:
      'A category with the same code already exists for this company.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResult> {

    return this.updateCategoryUseCase.execute(
      new UpdateCategoryCommand(
        id,
        dto.code!,
        dto.name!,
        dto.description ?? null,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Soft deletes an existing category.',
  })
  @ApiOkResponse({
    description: 'Category deleted successfully.',
    type: DeleteCategoryResult,
  })
  @ApiNotFoundResponse({
    description: 'Category not found.',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteCategoryResult> {

    return this.deleteCategoryUseCase.execute(
      new DeleteCategoryCommand(id),
    );
  }
}