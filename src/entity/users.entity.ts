import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(()=>Int)
  id: number;

  @Column({ type: 'varchar', length: 255})
  @Field(()=>String)
  full_Name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Field(()=>String)
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Field(()=>String)
  password: string;

  @Column({ type: 'varchar', length: 15 })
  @Field(()=>String)
  mobile_Number: string;

  @Column({ default: true })
  @Field(()=>Boolean)
  is_active: boolean;

  @CreateDateColumn()
  @Field(()=>Date)
  added_on: Date;
}