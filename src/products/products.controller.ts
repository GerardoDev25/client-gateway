import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Create product';
  }

  @Get()
  findAllProducts() {
    return 'Get all products';
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return `Get one product: ${id}`;
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
