import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { decrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class GetCredential {
  async findOne(id: string, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const credential = await prisma.credential.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        folder: true,
      },
    });

    if (credential.user.id !== userId) throw new AppError("Unauthorized");

    const password = decrypt(credential.password, userId);

    credential.password = password;

    return credential;
  }

  async findMany(context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const credentials = await prisma.credential.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        folder: true,
      },
    });

    const credentials_decrypted = credentials.map((credential) => {
      const password = decrypt(credential.password, userId);

      credential.password = password;

      return credential;
    });

    return credentials_decrypted;
  }
}

export default new GetCredential();
