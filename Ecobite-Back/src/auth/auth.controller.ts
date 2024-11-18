import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string; userType: 'client' | 'store' }) {
    const { email, password, userType } = loginDto;
    return this.authService.login(email, password, userType); // Devuelve la respuesta con el id incluido
  }
}
