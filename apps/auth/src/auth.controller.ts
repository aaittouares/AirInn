import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { UserDocument } from './users/models/user.mongo.schema';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwtObj = await this.authService.getJwt(user);

    response.cookie('Authentication', jwtObj.token, {
      httpOnly: true,
      expires: jwtObj.expires,
    });
    response.send(user);
  }
}
