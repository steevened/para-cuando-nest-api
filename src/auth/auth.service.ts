import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Role } from 'src/role.enum';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email } = ticket.getPayload();

      return await this.findOneByEmail(email);
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
      console.log(ticket.getPayload());
      const { email, name, picture, iat } = ticket.getPayload();
      return this.create({ email, name, picture, token }, iat);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(createAuthDto: CreateAuthDto, iat: number) {
    try {
      const user = await this.findOneByEmail(createAuthDto.email);
      if (!user) {
        const newUser = this.authRepository.create({
          ...createAuthDto,
          roles: [Role.USER],
          // TODO: change iat number to Date timestamp
          created_at: new Date(iat),
          updated_at: new Date(),
        });
        return this.authRepository.save(newUser);
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneByEmail(email: string): Promise<any> {
    try {
      return await this.authRepository.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
