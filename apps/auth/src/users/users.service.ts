import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersMongoRepository } from './users.mongo.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersMongoRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
