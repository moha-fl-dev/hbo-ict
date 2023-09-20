import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  signUp(@Body() body: { email: string; password: string }) {
    return this.appService.signUp(body.email, body.password);
  }
}
