import CreateUser from "../Services/User/CreateUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    async user(email: string) {
      const user = await prisma.user.findFirst({
        where: { email },
        include: {
          address: {
            include: { user: true },
          },
        },
      });
      return user;
    },
  },
  Mutation: {
    async createUser(_: any, user: User) {
      return CreateUser.execute(user);
    },
  },
};
