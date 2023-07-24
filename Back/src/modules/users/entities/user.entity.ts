import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int, { description: 'id of user' })
  user_id: number;

  @Column()
  @Field(() => String, { description: 'name of user' })
  user_name: string;
}
