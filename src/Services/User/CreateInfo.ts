import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";

const prisma = new PrismaClient();

class CreateInfo {
  async execute(info: Infos) {
    const user = await prisma.user.findUnique({
      where: {
        id: info.userId,
      },
      include: {
        infos: true,
      },
    });

    if (!user) throw new AppError("User not exists");

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
      },
    });

    return info_new;
  }
}

export default new CreateInfo();
