import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPassowrdDto } from './dtos/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken)
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePasword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword, 
      changePasswordDto.newPassword
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassowrdDto: ForgotPassowrdDto) {
    return this.authService.forgotPassword(forgotPassowrdDto.email)
  }
}
