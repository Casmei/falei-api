import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(): Promise<any> {
    throw new Error('Método não implementado');
  }
}
