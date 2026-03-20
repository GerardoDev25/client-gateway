import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Inject } from '@nestjs/common';
import { ORDER_SERVICES } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICES) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {}).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersClient.send('findOneOrder', id).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }
}
