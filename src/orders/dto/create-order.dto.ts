// import {
//   IsBoolean,
//   IsEnum,
//   IsNumber,
//   IsOptional,
//   IsPositive,
// } from 'class-validator';
// import { OrderStatusList, OrderStatus } from '../enum/order.enum';

// export class CreateOrderDto {
//   @IsNumber()
//   @IsPositive()
//   totalAmount: number;

//   @IsNumber()
//   @IsPositive()
//   totalItems: number;

//   @IsEnum(OrderStatusList, {
//     message: `Possible status values are ${Object.values(OrderStatus).join(', ')}`,
//   })
//   @IsOptional()
//   status: OrderStatus = OrderStatus.PENDING;

//   @IsBoolean()
//   @IsOptional()
//   paid: boolean = false;
// }

import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OderItemDto } from './';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OderItemDto)
  items: OderItemDto[];
}
