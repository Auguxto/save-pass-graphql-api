import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { encrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class CreateCard {
  async execute(card: Card, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const number_hash = encrypt(card.number, userId);
    const password_hash = encrypt(card.password, userId);
    const security_code_hash = encrypt(card.security_code, userId);

    const card_new = await prisma.card.create({
      data: {
        ...card,
        userId,
        number: number_hash,
        password: password_hash,
        security_code: security_code_hash,
      },
    });

    return card_new;
  }
}

export default new CreateCard();
