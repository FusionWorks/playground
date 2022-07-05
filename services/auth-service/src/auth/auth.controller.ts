import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: AuthDto): Promise<string> {
    return this.authService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Req() req: Request): Promise<void> {
    const user = req['user'];

    return this.authService.logout(user.sub);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  refresh(@Req() req: Request): Promise<Tokens> {
    const user = req['user'];

    return this.authService.refresh(user.sub, user.refreshToken);
  }
}
