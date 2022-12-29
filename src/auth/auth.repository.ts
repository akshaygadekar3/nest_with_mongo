import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Auth, AuthDocument } from './schema/auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<Object> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new this.authModel({
      username,
      password: hashedPassword,
      isActive: true,
    });
    try {
      const result = await createdUser.save();
      if (result) {
        return { message: 'User Created succesfully' };
      }
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Credential already exists');
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.authModel.findOne({ username });

    if (user.isActive && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async setStatus(
    id: string,
    username: string,
    password: string,
    isActive: boolean,
  ): Promise<string> {
    const user = await this.authModel.findOne({ _id: id });
    console.log(!!user, username, password, isActive);
    if (!!user && username === 'admin' && password === 'admin') {
      user.isActive = isActive;
      await user.save();
      return 'done';
    } else {
      throw new NotFoundException('No user found with specified id');
    }
  }
}
