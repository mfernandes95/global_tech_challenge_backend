import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post()
  async store(
    @Body(new ValidationPipe())
    body: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(body);
  }
}
