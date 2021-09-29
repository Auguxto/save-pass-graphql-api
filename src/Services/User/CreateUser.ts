import { PrismaClient } from "@prisma/client";
import validator from "validator";

import AppError from "../../Error/AppError";
import { encrypt } from "../../Lib/Crypt";

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

    const password_hash = encrypt(password, user_new.id);

    const user_hashed = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: password_hash,
      },
    });

    return user_hashed;
  }
}

export default new CreateUser();
