import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// @UseInterceptors(
//   new SanitizeMongooseModelInterceptor({
//     excludeMongooseId: false,
//     excludeMongooseV: false,
//   }),
// )
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<Object> {
    return await this.authService.createUser(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @Patch('/:id')
  async setStatus(@Param('id') id: string, @Body() body) {
    const { username, password, isActive } = body;
    return await this.authService.setStatus(id, username, password, isActive);
  }
}
