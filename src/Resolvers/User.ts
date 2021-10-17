import { PrismaClient } from "@prisma/client";

import CreateUser from "../Services/User/CreateUser";
import CreateSession from "../Services/Session/CreateSession";

import { MutationContext, User } from "../types/savepass";

const prisma = new PrismaClient();

export default {
  Query: {
    async user(email: string) {
      const user = await prisma.user.findFirst({
        where: { email },
        include: {
          address: true,
          infos: true,
          cards: true,
          credentials: true,
          notes: true,
        },
      });
      return user;
    },
  },
  Mutation: {
    async createUser(_: any, user: User) {
      return CreateUser.execute(user);
    },
    async createSession(_: any, user: User, context: MutationContext) {
      return CreateSession.execute(user, context);
    },
  },
};
