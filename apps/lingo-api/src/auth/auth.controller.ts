import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInSchema,
  SignInDto,
  SignUpDto,
  SignUpSchema,
} from '@hbo-ict/lingo/types';
import { Request } from 'express';
import { ConfSchemType, Public, ZodValidate } from '@hbo-ict/lingo-utils';
import { SupabaseGuard } from '@hbo-ict/supabase-auth';
import { Response } from 'express';
import { NestAppConfig } from '@hbo-ict/config';

/**
 * The auth controller.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService // private readonly configService: NestAppConfig<ConfSchemType>
  ) {}

  @Public()
  @Get()
  async get() {
    return 'base';
  }

  @Post('sign-in')
  @Public()
  @ZodValidate<SignInDto>(SignInSchema)
  async signIn(
    @Body() payload: SignInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, expires_in, refresh_token } =
      await this.authService.signIn(payload);

    response.cookie('access_token', access_token, {
      httpOnly: true, // set to true in production
      secure: true, // set to true if your site is served over HTTPS
      maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
    });

    response.status(200).send({
      status: 200,
      message: 'User signed in',
    });
  }

  @Public()
  @Post('sign-up')
  @ZodValidate<SignUpDto>(SignUpSchema)
  async SignUp(@Body() payload: SignUpDto) {
    return this.authService.SignUp(payload);
  }

  @UseGuards(SupabaseGuard)
  @Get('me')
  async getProfile(@Req() request: Request) {
    return this.authService.me();
  }

  @Post('sign-out')
  async logout() {
    return 'logout';
  }

  @Public()
  @Get('refresh-token')
  async refreshToken(@Req() request: Request) {
    const token = this.extractTokenFromHeader(request)!;

    return this.authService.refreshToken();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
