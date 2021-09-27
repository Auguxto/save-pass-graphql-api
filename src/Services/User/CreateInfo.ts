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
      await prisma.info.delete({
        where: {
          id: user.infos.id,
        },
      });
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
