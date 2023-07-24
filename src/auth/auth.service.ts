import {
  BadRequestException,
  Injectable,
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
      console.log(ticket, ticket.getPayload());

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
    const token = authHeader;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token.length > 1 ? token.split(' ')[1] : token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      if (!ticket) throw new BadRequestException('Invalid token');
      console.log(ticket, ticket.getPayload());
      const { email, name, picture } = ticket.getPayload();
      return this.userService.create({ email, name, picture });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
