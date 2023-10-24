import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
  ResetPasswordDto,
  resetPasswordSchema,
} from '@hbo-ict/lingo/types';
import { Request, Response } from 'express';
import { Public, ZodValidate } from '@hbo-ict/lingo-utils';
import { TokensGuard } from 'libs/lingo/auth/src/lib/guard/tokens.guard';
import { User } from '@supabase/supabase-js';

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
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
    });

    response.status(HttpStatus.ACCEPTED).send({
      status: 200,
      message: 'User signed in',
    });
  }

  @Public()
  @Post('sign-up')
  @ZodValidate<SignUpDto>(SignUpSchema)
  async SignUp(
    @Body() payload: SignUpDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, expires_in, refresh_token } =
      await this.authService.SignUp(payload);

    response.cookie('access_token', access_token, {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
    });

    response.status(201).send({
      status: 201,
      message: 'User created',
    });
  }

  @Get('me')
  async getProfile(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const { email, status } = await this.authService.me(
      request.signedCookies.access_token
    );

    response.status(status).send({
      email,
    });
  }

  @Public()
  @UseGuards(TokensGuard)
  @Get('refresh-token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const _refresh_token = request.signedCookies.refresh_token;
    const _access_token = request.signedCookies.access_token;

    console.log({ _refresh_token, _access_token });

    const { access_token, expires_in, refresh_token } =
      await this.authService.refreshSession({
        refresh_token: _refresh_token,
      });

    console.log({ access_token, expires_in, refresh_token });

    response.cookie('access_token', access_token, {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
      path: '/',
    });

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
      path: '/',
    });

    response.status(HttpStatus.CREATED).send({
      message: 'Token refreshed!',
    });
  }

  @Post('reset-password')
  @ZodValidate<ResetPasswordDto>(resetPasswordSchema)
  async resetPassword(
    @Req() request: Request,
    @Body() payload: ResetPasswordDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = request['user'] as User;
    const { id: uuid } = user;
    const { password } = payload;

    console.log({ uuid, password });

    const { status, message } = await this.authService.resetPassword({
      password,
      uuid,
    });

    response.clearCookie('access_token', {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
      path: '/',
    });
    response.clearCookie('refresh_token', {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
      path: '/',
    });

    response.status(status).send({
      message,
    });
  }

  @Post('sign-out')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const jwt = request.signedCookies.access_token;

    const { status, message } = await this.authService.signOut(jwt);

    response.clearCookie('access_token', {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
      path: '/',
    });
    response.clearCookie('refresh_token', {
      httpOnly: true, // set to true in production
      secure: true, //process.env.NODE_ENV === 'production', // set to true if your site is served over HTTPS
      // maxAge: expires_in * 1000, // ?? hour in ms
      sameSite: 'none', // required for cross-domain cookies
      // domain: 'localhost', // replace with your domain
      signed: true, //process.env.NODE_ENV === 'production',
      path: '/',
    });
    response.status(status).send({
      message,
    });
  }
}
