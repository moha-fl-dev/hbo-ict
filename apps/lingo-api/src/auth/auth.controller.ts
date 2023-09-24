import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInSchema,
  SignInDto,
  SignUpDto,
  SignUpSchema,
} from '@hbo-ict/lingo/types';
import { Request } from 'express';
import { ZodValidate } from '@hbo-ict/lingo-utils';

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
    return this.authService.signIn(payload);
  }

  @Post('sign-up')
  @ZodValidate<SignUpDto>(SignUpSchema)
  async SignUp(@Body() payload: SignUpDto) {
    return this.authService.SignUp(payload);
  }

  @Get('me')
  async getProfile(@Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1];

    console.log({ token });

    if (!token) {
      throw new Error('No authorization token found');
    }

    return this.authService.me(token);
  }

  @Post('sign-out')
  async logout() {
    return 'logout';
  }
}
