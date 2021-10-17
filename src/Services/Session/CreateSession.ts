import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";

import AppError from "../../Error/AppError";
import { decrypt } from "../../Lib/Crypt";

import { MutationContext, User } from "../../types/savepass";

const prisma = new PrismaClient();

class CreateSession {
  async execute({ email, password }: User, context: MutationContext) {
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

    const options = {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    };

    context.res.cookie("token", token, { ...options, sameSite: "strict" });

    return { token };
  }
}

export default new CreateSession();
