import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class GetInfo {
  async findInfo(context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const info = await prisma.info.findFirst({
      where: {
        userId,
      },
    });

    return info;
  }
}

export default new GetInfo();
