import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { decrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class GetCard {
  async findOne(id: string, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const card = await prisma.card.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        folder: true,
      },
    });

    if (card.user.id !== userId) throw new AppError("Unauthorized");

    const number = decrypt(card.number, card.userId);
    const password = decrypt(card.password, card.userId);
    const security_code = decrypt(card.security_code, card.userId);

    card.number = number;
    card.password = password;
    card.security_code = security_code;

    return card;
  }

  async findMany(context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const cards = await prisma.card.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        folder: true,
      },
    });

    const cards_decrypted = cards.map((card) => {
      const number = decrypt(card.number, card.userId);
      const password = decrypt(card.password, card.userId);
      const security_code = decrypt(card.security_code, card.userId);

      card.number = number;
      card.password = password;
      card.security_code = security_code;

      return card;
    });

    return cards_decrypted;
  }
}

export default new GetCard();
