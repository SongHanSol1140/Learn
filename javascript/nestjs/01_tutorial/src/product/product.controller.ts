import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get('asdf')
  getHelloProduct(): string {
    return 'HelloProduct!';
  }
}
