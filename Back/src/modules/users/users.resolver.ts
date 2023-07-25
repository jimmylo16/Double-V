import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationArgs } from '../common/dto/pagination.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args() { skip, take }: PaginationArgs) {
    return this.usersService.findAll({ skip, take });
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('user_id', { type: () => String }) user_id: string) {
    return this.usersService.findOne(user_id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.user_id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('user_id', { type: () => String }) user_id: string) {
    return this.usersService.remove(user_id);
  }
}
