import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersMongoRepository } from './users.mongo.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersMongoRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkForExistingUser(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async checkForExistingUser(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
