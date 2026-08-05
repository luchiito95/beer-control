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

import { CreateWarehouseUseCase } from '../../application/create-warehouse/create-warehouse.use-case';
import { CreateWarehouseResult } from '../../application/create-warehouse/create-warehouse.result';

import { UpdateWarehouseUseCase } from '../../application/update-warehouse/update-warehouse.use-case';
import { UpdateWarehouseResult } from '../../application/update-warehouse/update-warehouse.result';

import { DeleteWarehouseUseCase } from '../../application/delete-warehouse/delete-warehouse.use-case';
import { DeleteWarehouseResult } from '../../application/delete-warehouse/delete-warehouse.result';

import { GetWarehouseUseCase } from '../../application/queries/get-warehouse/get-warehouse.use-case';
import { GetWarehouseResult } from '../../application/queries/get-warehouse/get-warehouse.result';

import { SearchWarehousesUseCase } from '../../application/queries/search-warehouses/search-warehouses.use-case';
import { WarehouseSummaryResult } from '../../application/queries/search-warehouses/warehouse-summary.result';

import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { SearchWarehouseDto } from '../dto/search-warehouse.dto';

import { WarehouseCommandMapper } from '../mappers/warehouse-command.mapper';
import { WarehouseQueryMapper } from '../mappers/warehouse-query.mapper';
import { WarehouseSearchMapper } from '../mappers/warehouse-search.mapper';

@ApiTags('Warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly getWarehouseUseCase: GetWarehouseUseCase,
    private readonly searchWarehousesUseCase: SearchWarehousesUseCase,
    private readonly updateWarehouseUseCase: UpdateWarehouseUseCase,
    private readonly deleteWarehouseUseCase: DeleteWarehouseUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create warehouse',
  })
  @ApiCreatedResponse({
    type: CreateWarehouseResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Warehouse code already exists.',
  })
  async create(
    @Body() dto: CreateWarehouseDto,
  ): Promise<CreateWarehouseResult> {
    return this.createWarehouseUseCase.execute(
      WarehouseCommandMapper.toCreate(dto),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get warehouse by id',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiOkResponse({
    type: GetWarehouseResult,
  })
  async findById(@Param('id') id: string): Promise<GetWarehouseResult> {
    return this.getWarehouseUseCase.execute(WarehouseQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search warehouses',
  })
  async search(
    @Query() dto: SearchWarehouseDto,
  ): Promise<SearchPage<WarehouseSummaryResult>> {
    return this.searchWarehousesUseCase.execute(
      WarehouseQueryMapper.toSearch(WarehouseSearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWarehouseDto,
  ): Promise<UpdateWarehouseResult> {
    return this.updateWarehouseUseCase.execute(
      WarehouseCommandMapper.toUpdate(id, dto),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteWarehouseResult> {
    return this.deleteWarehouseUseCase.execute(
      WarehouseQueryMapper.toDelete(id),
    );
  }
}
