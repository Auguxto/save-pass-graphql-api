import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class GetAddress {
  async findAddress(context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const address = await prisma.address.findFirst({
      where: {
        userId,
      },
    });

    return address;
  }
}

export default new GetAddress();
