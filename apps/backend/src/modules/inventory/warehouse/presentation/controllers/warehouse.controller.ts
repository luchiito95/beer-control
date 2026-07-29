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

import { CreateWarehouseUseCase } from '../../application/create-branch/create-warehouse.use-case';
import { CreateWarehouseResult } from '../../application/create-branch/create-warehouse.result';
import { CreateWarehouseCommand } from '../../application/create-branch/create-warehouse.command';

import { GetWarehouseUseCase } from '../../application/queries/get-branch/get-warehouse.use-case';
import { GetWarehouseResult } from '../../application/queries/get-branch/get-warehouse.result';
import { GetWarehouseQuery } from '../../application/queries/get-branch/get-warehouse.query';

import { ListWarehousesUseCase } from '../../application/queries/list-branches/list-warehouses.use-case';
import { WarehouseSummaryResult } from '../../application/queries/list-branches/warehouse-summary.result';
import { ListWarehousesQuery } from '../../application/queries/list-branches/list-warehouses.query';

import { UpdateWarehouseResult } from '../../application/update-branch/update-warehouse.result';
import { UpdateWarehouseCommand } from '../../application/update-branch/update-warehouse.command';
import { UpdateWarehouseUseCase } from '../../application/update-branch/update-warehouse.use-case';

import { DeleteWarehouseUseCase } from '../../application/delete-branch/delete-warehouse.use-case';
import { DeleteWarehouseResult } from '../../application/delete-branch/delete-warehouse.result';
import { DeleteWarehouseCommand } from '../../application/delete-branch/delete-warehouse.command';


import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';

@ApiTags('Warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly getWarehouseUseCase: GetWarehouseUseCase,
    private readonly listWarehousesUseCase: ListWarehousesUseCase,
    private readonly updateWarehouseUseCase: UpdateWarehouseUseCase,
    private readonly deleteWarehouseUseCase: DeleteWarehouseUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create warehouse',
    description: 'Creates a new warehouse.',
  })
  @ApiCreatedResponse({
    description: 'Warehouse created successfully.',
    type: CreateWarehouseResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'A warehouse with the same code already exists.',
  })
  async create(
    @Body() dto: CreateWarehouseDto,
  ): Promise<CreateWarehouseResult> {

    return this.createWarehouseUseCase.execute(
      new CreateWarehouseCommand(
        dto.branchId,
        dto.code,
        dto.name,
        dto.description ?? null,
      ),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get warehouse by id',
    description: 'Returns a warehouse by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Warehouse identifier.',
  })
  @ApiOkResponse({
    description: 'Warehouse found.',
    type: GetWarehouseResult,
  })
  @ApiNotFoundResponse({
    description: 'Warehouse not found.',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GetWarehouseResult> {

    return this.getWarehouseUseCase.execute(
      new GetWarehouseQuery(id),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List warehouses',
    description: 'Returns a paginated list of warehouses.',
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
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PageResult<WarehouseSummaryResult>> {

    return this.listWarehousesUseCase.execute(
      new ListWarehousesQuery(
        query.page,
        query.pageSize,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update warehouse',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWarehouseDto,
  ): Promise<UpdateWarehouseResult> {

    return this.updateWarehouseUseCase.execute(
      new UpdateWarehouseCommand(
        id,
        dto.code!,
        dto.name!,
        dto.description ?? null,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete warehouse',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteWarehouseResult> {

    return this.deleteWarehouseUseCase.execute(
      new DeleteWarehouseCommand(id),
    );
  }
}