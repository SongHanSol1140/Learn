// src/entities/menu.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subcategory } from './subcategory.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  //   @ManyToOne(() => Subcategory, subcategory => subcategory.category)
  //   subcategory: Subcategory;

  @ManyToOne(() => Subcategory, subcategory => subcategory.menus, { onDelete: 'CASCADE' })
  subcategory: Subcategory;
}
