import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() body: SignupDto) {
    try {
      const result = await this.auth.signup(body.name, body.email, body.password);
      return { success: true, ...result };
    } catch (error: any) {
      return { success: false, message: error.message || 'Registration failed' };
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const result = await this.auth.login(body.email, body.password);
      return { success: true, ...result };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return { success: true, user: req.user };
  }
}

