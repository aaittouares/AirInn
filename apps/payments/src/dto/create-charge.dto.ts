import { Stripe } from 'node_modules/stripe/cjs/stripe.core';

export class CreateChargeDto {
  card!: Stripe.PaymentMethodCreateParams.Card;
  amount!: number;
}
