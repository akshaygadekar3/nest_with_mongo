import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AdminAuthCredentialsDto } from './dto/admin- auth-credentials.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Auth } from './schema/auth.schema';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: Auth })
  @Post('/signup')
  @ApiOperation({ summary: 'Sign Up' })
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<Object> {
    return await this.authService.createUser(authCredentialsDto);
  }

  @ApiOkResponse({ type: Auth })
  @Post('/signin')
  @ApiOperation({ summary: 'Sign In' })
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @ApiOkResponse({ type: Auth })
  @Patch('/:id')
  @ApiOperation({ summary: 'update isActive' })
  async setStatus(
    @Param('id') id: string,
    @Body() adminAuthCredentialsDto: AdminAuthCredentialsDto,
  ): Promise<Object> {
    return await this.authService.setStatus(id, adminAuthCredentialsDto);
  }
}
