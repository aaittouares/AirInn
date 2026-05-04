import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from '@app/common';
import { Stripe as StripeType } from 'node_modules/stripe/cjs/stripe.core';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe: StripeType;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY')!);
  }

  async createCharge({ /*card,*/ amount }: CreateChargeDto) {
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

    return paymentIntent;
  }
}
