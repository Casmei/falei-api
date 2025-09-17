import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  async register(data: RegisterDto) {
    const { email, password } = data;
    const alreadyExists = await this.userService.findOneBy({ email });

    if (alreadyExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashed = await this.hashPassword(password);
    const user = await this.userService.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
    };
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userService.findOneByWithPassword({ email });

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
    };
  }
}
