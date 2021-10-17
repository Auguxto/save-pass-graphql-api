import CreatePayment from "../Services/Payment/CreatePayment";

import { MutationContext, Payment } from "../types/savepass";

export default {
  Query: {},
  Mutation: {
    async createPaymentIntent(
      _: any,
      payment: Payment,
      context: MutationContext
    ) {
      return CreatePayment.execute(payment, context);
    },
  },
};
