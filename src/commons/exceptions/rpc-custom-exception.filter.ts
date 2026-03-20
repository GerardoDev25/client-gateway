import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface RpcError {
  status: number;
  message: string;
}

function isRpcError(error: unknown): error is RpcError {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const errorObj = error as Record<string, unknown>;
  return (
    'status' in errorObj &&
    'message' in errorObj &&
    typeof errorObj.status === 'number' &&
    typeof errorObj.message === 'string'
  );
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();

    if (isRpcError(rpcError)) {
      return response.status(rpcError.status).json(rpcError);
    }

    return response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
