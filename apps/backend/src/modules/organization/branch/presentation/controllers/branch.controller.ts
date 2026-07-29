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

import { CreateBranchCommand } from '../../application/create-branch/create-branch.command';
import { CreateBranchResult } from '../../application/create-branch/create-branch.result';
import { CreateBranchUseCase } from '../../application/create-branch/create-branch.use-case';

import { GetBranchQuery } from '../../application/queries/get-branch/get-branch.query';
import { GetBranchResult } from '../../application/queries/get-branch/get-branch.result';
import { GetBranchUseCase } from '../../application/queries/get-branch/get-branch.use-case';

import { ListBranchesQuery } from '../../application/queries/list-branches/list-branches.query';
import { BranchSummaryResult } from '../../application/queries/list-branches/branch-summary.result';
import { ListBranchesUseCase } from '../../application/queries/list-branches/list-branches.use-case';

import { UpdateBranchCommand } from '../../application/update-branch/update-branch.command';
import { UpdateBranchResult } from '../../application/update-branch/update-branch.result';
import { UpdateBranchUseCase } from '../../application/update-branch/update-branch.use-case';

import { DeleteBranchCommand } from '../../application/delete-branch/delete-branch.command';
import { DeleteBranchResult } from '../../application/delete-branch/delete-branch.result';
import { DeleteBranchUseCase } from '../../application/delete-branch/delete-branch.use-case';

import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';

@ApiTags('Branches')
@Controller('branches')
export class BranchController {
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly listBranchesUseCase: ListBranchesUseCase,
    private readonly updateBranchUseCase: UpdateBranchUseCase,
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create branch',
    description: 'Creates a new branch.',
  })
  @ApiCreatedResponse({
    description: 'Branch created successfully.',
    type: CreateBranchResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'A branch with the same code already exists.',
  })
  async create(
    @Body() dto: CreateBranchDto,
  ): Promise<CreateBranchResult> {

    return this.createBranchUseCase.execute(
      new CreateBranchCommand(
        dto.companyId,
        dto.code,
        dto.name,
        dto.email ?? null,
        dto.phone ?? null,
        dto.address ?? null,
        dto.city,
        dto.state ?? null,
        dto.country,
        dto.postalCode ?? null,
        dto.timezone ?? 'America/Bogota',
      ),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get branch by id',
    description: 'Returns a branch by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Branch identifier.',
  })
  @ApiOkResponse({
    description: 'Branch found.',
    type: GetBranchResult,
  })
  @ApiNotFoundResponse({
    description: 'Branch not found.',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GetBranchResult> {

    return this.getBranchUseCase.execute(
      new GetBranchQuery(id),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List branches',
    description: 'Returns a paginated list of branches.',
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
  ): Promise<PageResult<BranchSummaryResult>> {

    return this.listBranchesUseCase.execute(
      new ListBranchesQuery(
        query.page,
        query.pageSize,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update branch',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,
  ): Promise<UpdateBranchResult> {

    return this.updateBranchUseCase.execute(
      new UpdateBranchCommand(
        id,
        dto.code!,
        dto.name!,
        dto.email ?? null,
        dto.phone ?? null,
        dto.address ?? null,
        dto.city!,
        dto.state ?? null,
        dto.country!,
        dto.postalCode ?? null,
        dto.timezone ?? 'America/Bogota',
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete branch',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteBranchResult> {

    return this.deleteBranchUseCase.execute(
      new DeleteBranchCommand(id),
    );
  }
}