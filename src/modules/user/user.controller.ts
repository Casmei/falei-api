import { Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async register(@User() user: JwtPayload) {
    return this.userService.findOneBy({ id: user.userId });
  }
}
