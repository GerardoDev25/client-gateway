import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/commons';
import { PRODUCT_SERVICES } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICES) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Create product';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );

    // try {
    //   const product: Product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string) {
    return `Update one product: ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Delete one product: ${id}`;
  }
}
