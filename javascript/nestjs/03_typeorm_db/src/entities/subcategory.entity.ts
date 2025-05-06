// src/entities/subcategory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Menu } from './menu.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //   @ManyToOne(() => Category, category => category.subcategories)
  //   category: Category;

  //   @OneToMany(() => Menu, menu => menu.subcategory)
  //   menus: Menu[];

  @ManyToOne(() => Category, category => category.subcategories, { onDelete: 'CASCADE' })
  category: Category;

  @OneToMany(() => Menu, menu => menu.subcategory, {
    onDelete: 'CASCADE'
    // cascade: ['insert', 'update', 'remove']
  })
  menus: Menu[];


}
