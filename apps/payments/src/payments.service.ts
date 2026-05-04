import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Stripe as StripeType } from 'node_modules/stripe/cjs/stripe.core';
import Stripe from 'stripe';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe: StripeType;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY')!);
  }

  async createCharge({ /*card,*/ amount, email }: PaymentsCreateChargeDto) {
    /*const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });*/

    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      //payment_method_types: ['card'],
      payment_method: 'pm_card_mastercard',
      currency: 'eur',
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    });

    this.notificationsService.emit('notify_email', { email });

    return paymentIntent;
  }
}
