// app.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 카테고리 추가
  // URL을 통해 카테고리 이름을 받아 저장하는 새로운 GET 요청 메소드 추가
  // http://localhost:3000/add-category?categoryName=음료
  @Get('add-category')
  addCategory(@Query('categoryName') categoryName: string) {
    return this.appService.addCategory(categoryName);
  };
  // 서브카테고리 추가
  @Get('add-subcategory')
  addSubcategory(
    @Query('categoryName') categoryName: string,
    @Query('subcategoryName') subcategoryName: string
  ) {
    return this.appService.addSubcategory(categoryName, subcategoryName);
  }
}