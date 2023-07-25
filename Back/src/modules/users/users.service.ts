import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationArgs } from '../common/dto/pagination.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async findAll({ skip, take }: PaginationArgs) {
    const users = await this.userRepository.find({ skip, take });

    return users;
  }

  async findOne(user_id: string) {
    const user = await this.userRepository.findOneBy({ user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(user_id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.preload({
      user_id,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save(user);
  }

  async remove(user_id: string) {
    const user = await this.findOne(user_id);
    await this.userRepository.remove(user);
    return {
      user_id: user_id,
    };
  }
}
