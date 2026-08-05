import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { DomainException } from '../../domain/exceptions/domain.exception';
import { ErrorResponse } from '../responses/error-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);

    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'InternalServerError';
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      error = exception.name;

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        const body = exceptionResponse as Record<string, unknown>;

        if (Array.isArray(body.message)) {
          message = body.message.join(', ');
        } else {
          message = String(body.message ?? exception.message);
        }
      }
    } else if (exception instanceof DomainException) {
      status = HttpStatus.BAD_REQUEST;
      error = exception.name;
      message = exception.message;
    } else if (exception instanceof Error) {
      error = exception.name;
      message = exception.message;
    }

    response
      .status(status)
      .json(
        new ErrorResponse(
          false,
          status,
          error,
          message,
          request.url,
          new Date().toISOString(),
        ),
      );
  }
}
