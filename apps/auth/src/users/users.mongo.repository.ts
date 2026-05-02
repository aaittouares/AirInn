import { Injectable, Logger } from '@nestjs/common';
import { AbstractMongoRepository } from '@app/common';
import { UserDocument } from './models/user.mongo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersMongoRepository extends AbstractMongoRepository<UserDocument> {
  protected readonly logger = new Logger(UsersMongoRepository.name);

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
