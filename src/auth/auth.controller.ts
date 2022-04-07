import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sessions')
  async login(@Request() req: any): Promise<{
    access_token: string;
  }> {
    return this.authService.login(req.body);
  }
}
