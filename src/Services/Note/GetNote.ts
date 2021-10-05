import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { decrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class GetNote {
  async findOne(id: string, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        folder: true,
      },
    });

    if (note.user.id !== userId) throw new AppError("Unauthorized");

    const note_decrypted = decrypt(note.note, userId);

    note.note = note_decrypted;

    return note;
  }

  async findMany(context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        folder: true,
      },
    });

    const notes_decrypted = notes.map((note) => {
      const note_decrypted = decrypt(note.note, userId);

      note.note = note_decrypted;

      return note;
    });

    return notes_decrypted;
  }
}

export default new GetNote();
