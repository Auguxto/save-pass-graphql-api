import { PrismaClient } from "@prisma/client";
import validator from "validator";

import AppError from "../Error/AppError";

const prisma = new PrismaClient();

class CreateUser {
  async execute({ email, password }: User) {
    const user_exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user_exists) throw new AppError("User already exists");

    const isEmail = validator.isEmail(email);
    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 3,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
    });
    if (!isEmail) throw new AppError("Invalid email");
    if (!isStrongPassword) throw new AppError("It's not a strong password");

    const user_new = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return user_new;
  }
}

export default new CreateUser();
