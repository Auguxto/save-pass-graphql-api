import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class CreateAddress {
  async execute(address: Address, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        address: true,
      },
    });

    if (!user) throw new AppError("User not exists");

    if (user.address) {
      const address_updated = await prisma.address.update({
        where: {
          id: user.address.id,
        },
        data: {
          ...address,
        },
      });

      return address_updated;
    }

    const address_new = await prisma.address.create({
      data: {
        ...address,
        userId,
      },
    });

    return address_new;
  }
}

export default new CreateAddress();
