import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";

import AppError from "../../Error/AppError";
import { decrypt } from "../../Lib/Crypt";

const prisma = new PrismaClient();

class CreateSession {
  async execute({ email, password }: User) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new AppError("Email or password is incorrect");

    const password_match = password === decrypt(user.password, user.id);

    if (!password_match) throw new AppError("Email or password is incorrect");

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    delete user.password;

    return { token };
  }
}

export default new CreateSession();
