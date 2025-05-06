// app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(Category)  // Category 리포지토리를 주입합니다.
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>
  ) { };

  getHello(): string {
    return 'Hello World!';
  }

  // 새로운 카테고리를 추가하는 메소드
  async addCategory(categoryName: string): Promise<Category> {
    console.log("add-category")
    const category = this.categoryRepository.create({ name: categoryName });
    return this.categoryRepository.save(category);
  }

  async addSubcategory(categoryName: string, subcategoryName: string): Promise<Subcategory> {
    console.log("add-subcategory");
    const category = await this.categoryRepository.findOneBy({ name: categoryName });
    if (!category) {
      throw new Error('Category not found');
    }
    console.log(category);
    const subcategory = this.subcategoryRepository.create({
      name: subcategoryName,
      category: category
    });
    return this.subcategoryRepository.save(subcategory);
  }
}
