import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInSchema,
  SignInDto,
  SignUpDto,
  SignUpSchema,
  ZodValidate,
} from '@hbo-ict/lingo-utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async get() {
    return 'base';
  }

  @Post('sign-in')
  @ZodValidate<SignInDto>(SignInSchema)
  async signIn(@Body() payload: SignInDto) {
    return payload;
  }

  @Post('sign-up')
  @ZodValidate<SignUpDto>(SignUpSchema)
  async SignUp(@Body() payload: SignUpDto) {
    return payload;
  }

  @Post('sign-out')
  async logout() {
    return 'logout';
  }
}
