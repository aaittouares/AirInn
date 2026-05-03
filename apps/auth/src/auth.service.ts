import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersMongoRepository } from './users/users.mongo.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserDto } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersMongoRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getJwt(userId: string) {
    const tokenPayload: TokenPayload = {
      userId,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    return { token, expires };
  }

  async verifyUser(email: string, password: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return {
      _id: user._id.toHexString(),
      email: user.email,
      password: user.password,
    };
  }
}
