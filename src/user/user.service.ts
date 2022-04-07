import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new HttpException('User already already exists', 400);
    }
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }
}
