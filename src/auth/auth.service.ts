import { Injectable } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<Object> {
    return await this.authRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authRepository.signIn(authCredentialsDto);
  }

  async setStatus(id: string, username : string, password : string, isActive: boolean){
    return await this.authRepository.setStatus(id, username, password, isActive)
  }
}
