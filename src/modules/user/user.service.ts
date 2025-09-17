import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOneBy(
    params: Partial<Pick<UserEntity, 'id' | 'email'>>,
  ): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: params,
      select: ['id', 'email', 'name', 'role'],
    });
  }

  findOneByWithPassword(
    params: Partial<Pick<UserEntity, 'id' | 'email'>>,
  ): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: params,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
