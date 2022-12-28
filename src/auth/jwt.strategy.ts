import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Auth, AuthDocument, AuthSchema } from './schema/auth.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  
  async validate(payload: JwtPayload): Promise<Auth> {
    const { username } = payload;
    const user: Auth = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
