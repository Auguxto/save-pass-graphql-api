import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { encrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class CreateNote {
  async execute(note: Note, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const note_hash = encrypt(note.note, userId);

    const note_new = await prisma.note.create({
      data: {
        ...note,
        userId,
        note: note_hash,
      },
    });

    return note_new;
  }
}

export default new CreateNote();
