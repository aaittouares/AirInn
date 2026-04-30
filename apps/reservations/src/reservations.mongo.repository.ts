import { Injectable, Logger } from '@nestjs/common';
import { AbstractMongoRepository } from '@app/common';
import { ReservationDocument } from './models/reservation.mongo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsMongoRepository extends AbstractMongoRepository<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsMongoRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
