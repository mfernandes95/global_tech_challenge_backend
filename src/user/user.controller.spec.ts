import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user: CreateUserDto = {
      name: 'Matheus',
      email: 'matheus@gmail.com',
      password: '123456',
    };
    mockRepository.create.mockReturnValue(user);
    mockRepository.save.mockReturnValue(user);
    const savedUser = await controller.store(user);
    expect(savedUser).toMatchObject(user);
    expect(mockRepository.create).toBeCalledTimes(1);
    expect(mockRepository.save).toBeCalledTimes(1);
    expect(mockRepository.findOne).toBeCalledTimes(1);
  });

  it('should throw exception', async () => {
    const user: CreateUserDto = {
      name: 'Matheus',
      email: 'matheus@gmail.com',
      password: '123456',
    };
    mockRepository.findOne.mockReturnValue(user);

    try {
      await controller.store(user);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('User already already exists');
      expect(mockRepository.findOne).toBeCalledTimes(1);
    }
  });
});
