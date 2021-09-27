import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";

const prisma = new PrismaClient();

class CreateAddress {
  async execute(address: Address) {
    const user = await prisma.user.findUnique({
      where: {
        id: address.userId,
      },
      include: {
        address: true,
      },
    });

    if (!user) throw new AppError("User not exists");

    if (user.address) {
      await prisma.address.delete({
        where: {
          id: user.address.id,
        },
      });
    }

    const address_new = await prisma.address.create({
      data: {
        ...address,
      },
    });

    return address_new;
  }
}

export default new CreateAddress();
