import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(token: string): Promise<any> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log(ticket.getPayload(), 'ticket');
      const { email, name, picture } = ticket.getPayload();
      return this.userService.create({ email, name, picture });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
