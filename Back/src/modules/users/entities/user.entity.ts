import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of user' })
  user_id: string;

  @Column({ unique: true })
  @Field(() => String, { description: 'name of user' })
  user_name: string;

  @Column()
  @Field(() => String, { description: 'url of user' })
  user_url: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date, { description: 'date added' })
  date_added: Date;
}
