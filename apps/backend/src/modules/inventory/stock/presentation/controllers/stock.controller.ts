import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import {
  AdjustStockCommand,
  AdjustStockUseCase,
  CreateStockCommand,
  CreateStockUseCase,
  DecreaseStockCommand,
  DecreaseStockUseCase,
  IncreaseStockCommand,
  IncreaseStockUseCase,
  ReleaseStockCommand,
  ReleaseStockUseCase,
  ReserveStockCommand,
  ReserveStockUseCase,
  TransferStockCommand,
  TransferStockUseCase,
} from '../../application';

import {
  AdjustStockRequest,
  CreateStockRequest,
  DecreaseStockRequest,
  IncreaseStockRequest,
  ReleaseStockRequest,
  ReserveStockRequest,
  TransferStockRequest,
} from '../dto/';

@Controller('stocks')
export class StockController {

  constructor(

    private readonly createStockUseCase: CreateStockUseCase,

    private readonly increaseStockUseCase: IncreaseStockUseCase,

    private readonly decreaseStockUseCase: DecreaseStockUseCase,

    private readonly reserveStockUseCase: ReserveStockUseCase,

    private readonly releaseStockUseCase: ReleaseStockUseCase,

    private readonly adjustStockUseCase: AdjustStockUseCase,

    private readonly transferStockUseCase: TransferStockUseCase,

  ) {}

  @Post()
  async create(
    @Body() request: CreateStockRequest,
  ) {

    return this.createStockUseCase.execute(

      new CreateStockCommand(

        request.warehouseId,

        request.productId,

      ),

    );

  }

  @Post('increase')
  async increase(
    @Body() request: IncreaseStockRequest,
  ) {

    return this.increaseStockUseCase.execute(

      new IncreaseStockCommand(

        request.warehouseId,

        request.productId,

        request.quantity,

        request.unitCost,

        request.performedBy,

        request.referenceId,

        request.notes,

      ),

    );

  }

  @Post('decrease')
  async decrease(
    @Body() request: DecreaseStockRequest,
  ) {

    return this.decreaseStockUseCase.execute(

      new DecreaseStockCommand(

        request.warehouseId,

        request.productId,

        request.quantity,

        request.performedBy,

        request.referenceId,

        request.notes,

      ),

    );

  }

  @Post('reserve')
  async reserve(
    @Body() request: ReserveStockRequest,
  ) {

    return this.reserveStockUseCase.execute(

      new ReserveStockCommand(

        request.warehouseId,

        request.productId,

        request.quantity,

        request.performedBy,

        request.referenceId,

        request.notes,

      ),

    );

  }

  @Post('release')
  async release(
    @Body() request: ReleaseStockRequest,
  ) {

    return this.releaseStockUseCase.execute(

      new ReleaseStockCommand(

        request.warehouseId,

        request.productId,

        request.quantity,

        request.performedBy,

        request.referenceId,

        request.notes,

      ),

    );

  }

  @Post('adjust')
  async adjust(
    @Body() request: AdjustStockRequest,
  ) {

    return this.adjustStockUseCase.execute(

      new AdjustStockCommand(

        request.warehouseId,

        request.productId,

        request.countedQuantity,

        request.unitCost,

        request.performedBy,

        request.notes,

      ),

    );

  }

  @Post('transfer')
  async transfer(
    @Body() request: TransferStockRequest,
  ) {

    return this.transferStockUseCase.execute(

      new TransferStockCommand(

        request.sourceWarehouseId,

        request.destinationWarehouseId,

        request.productId,

        request.quantity,

        request.performedBy,

        request.referenceId,

        request.notes,

      ),

    );

  }

  @Get(':warehouseId/:productId')
  async get(

    @Param('warehouseId') warehouseId: string,

    @Param('productId') productId: string,

  ) {

    return {

      warehouseId,

      productId,

      message: 'Pendiente implementación GetStockUseCase',

    };

  }

}