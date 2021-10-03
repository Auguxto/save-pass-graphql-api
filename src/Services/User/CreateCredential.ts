import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { encrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class CreateCredential {
  async execute(credential: CCredential, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    if (credential.folderId) {
      const folder_exists = await prisma.folder.findFirst({
        where: { id: credential.folderId },
      });
      if (!folder_exists || folder_exists.userId !== userId) {
        throw new AppError("Unauthorized");
      }
    }

    const password_hash = encrypt(credential.password, userId);

    const credential_new = await prisma.credential.create({
      data: {
        ...credential,
        userId,
        password: password_hash,
      },
      include: {
        folder: true,
        user: true,
      },
    });

    return credential_new;
  }
}

export default new CreateCredential();
