import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userRepo.findOne({
      where: { email: userEmail },
    });

    if (!user) throw new HttpException('User not found', 404);

    if (userPassword == user.password) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return null;
  }
}
