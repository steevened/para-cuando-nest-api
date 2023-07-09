import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateToken(token: string): Promise<any> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email } = ticket.getPayload();
      return await this.userService.findOneByEmail(email);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(req: Request): Promise<any> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing token');
    }
    // console.log(authHeader);
    const token = authHeader;
    const ticket = await client.verifyIdToken({
      idToken: token.length > 1 ? token.split(' ')[1] : token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    try {
      const { email, name, picture } = ticket.getPayload();
      return this.userService.create({ email, name, picture });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
