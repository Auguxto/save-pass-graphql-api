import { response, Router } from "express";
import Stripe from "stripe";

const webhook = Router();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

webhook.post("/webhook", (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case "invoice.payment_succeeded":
      const paymentSucceeded = event.data.object;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
});

export default webhook;
