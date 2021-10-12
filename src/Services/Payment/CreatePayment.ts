import AppError from "../../Error/AppError";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

import { stripe } from "../../stripe/webhook";

class CreatePayment {
  async execute(payment: Payment, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: payment.amount,
      currency: payment.currency,
    });

    const clientSecret = paymentIntent.client_secret;

    return {
      clientSecret,
    };
  }
}

export default new CreatePayment();
