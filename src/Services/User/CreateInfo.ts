import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class CreateInfo {
  async execute(info: Infos, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        infos: true,
      },
    });

    if (user.infos) {
      const info_updated = await prisma.info.update({
        where: {
          id: user.infos.id,
        },
        data: {
          ...info,
        },
      });

      return info_updated;
    }

    const info_new = await prisma.info.create({
      data: {
        ...info,
        userId,
      },
    });

    return info_new;
  }
}

export default new CreateInfo();
