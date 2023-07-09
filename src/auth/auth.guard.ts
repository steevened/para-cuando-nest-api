import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (!bearerToken) throw new UnauthorizedException('Token not provided');
    const token =
      bearerToken.length > 1 ? bearerToken.split(' ')[1] : bearerToken;
    try {
      const user = await this.authService.validateToken(token);
      if (!user) {
        throw new UnauthorizedException('Invalid Token');
      }

      request.user = user;
      // console.log(request.user);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
