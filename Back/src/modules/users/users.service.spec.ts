import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export const mockCreateUserInput = {
  user_name: 'jimmy 3',
  user_url: 'test',
  avatar_url: 'https://avatars.githubusercontent.com/u/93936769?v=4',
};

export const mockCreatedUser = {
  user_id: 'unique_id_generated_by_database',
  user_name: mockCreateUserInput.user_name,
  user_url: mockCreateUserInput.user_url,
  avatar_url: mockCreateUserInput.avatar_url,
  date_added: new Date(),
};

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a user', async () => {
    userRepository.create = jest.fn().mockReturnValue(mockCreatedUser);
    userRepository.save = jest.fn().mockReturnValue(mockCreatedUser);

    const result = await usersService.create(mockCreateUserInput);

    expect(userRepository.create).toHaveBeenCalledWith(mockCreateUserInput);
    expect(userRepository.save).toHaveBeenCalledWith(mockCreatedUser);
    expect(result).toEqual(mockCreatedUser);
  });

  it('should update a user', async () => {
    const user_id = 'unique_id_generated_by_database';
    const updateUserInput = {
      user_id,
    };
    const mockUpdatedUser: User = {
      ...mockCreatedUser,
      ...updateUserInput,
    };

    userRepository.preload = jest.fn().mockResolvedValue(mockUpdatedUser);
    userRepository.save = jest.fn().mockResolvedValue(mockUpdatedUser);

    const result = await usersService.update(user_id, updateUserInput);

    expect(userRepository.preload).toHaveBeenCalledWith(updateUserInput);
    expect(userRepository.save).toHaveBeenCalledWith(mockUpdatedUser);
    expect(result).toEqual(mockUpdatedUser);
  });

  it('should remove a user', async () => {
    const user_id = 'unique_id_generated_by_database';

    usersService.findOne = jest.fn().mockResolvedValue(mockCreatedUser);
    userRepository.remove = jest.fn().mockResolvedValue(undefined);

    const result = await usersService.remove(user_id);

    expect(usersService.findOne).toHaveBeenCalledWith(user_id);
    expect(userRepository.remove).toHaveBeenCalledWith(mockCreatedUser);
    expect(result).toEqual({ user_id });
  });
});
