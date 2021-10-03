import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class CreateFolder {
  async execute(folder: Folder, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const folder_new = await prisma.folder.create({
      data: {
        ...folder,
        userId,
      },
    });

    return folder_new;
  }
}

export default new CreateFolder();
