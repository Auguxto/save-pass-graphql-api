import { PrismaClient } from "@prisma/client";

import AppError from "../../Error/AppError";
import { decrypt } from "../../Lib/Crypt";
import AuthenticationAssurance from "../../Middlewares/AuthenticationAssurance";

const prisma = new PrismaClient();

class GetFolder {
  async findOne(id: string, context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const folder = await prisma.folder.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        cards: true,
        credentials: true,
        notes: true,
      },
    });

    if (folder.user.id !== userId) throw new AppError("Unauthorized");

    folder.cards.map((card) => {
      const number = decrypt(card.number, userId);
      const password = decrypt(card.password, userId);
      const security_code = decrypt(card.security_code, userId);

      card.number = number;
      card.password = password;
      card.security_code = security_code;

      return card;
    });

    folder.credentials.map((credential) => {
      const password = decrypt(credential.password, userId);

      credential.password = password;

      return credential;
    });

    folder.notes.map((note) => {
      const note_decrypted = decrypt(note.note, userId);

      note.note = note_decrypted;

      return note;
    });

    return folder;
  }

  async findMany(context: MutationContext) {
    const userId = await AuthenticationAssurance(context.authHeader);
    if (!userId) throw new AppError("Unauthorized");

    const folders = await prisma.folder.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        cards: true,
        credentials: true,
        notes: true,
      },
    });

    folders.map((folder) => {
      folder.cards.map((card) => {
        const number = decrypt(card.number, userId);
        const password = decrypt(card.password, userId);
        const security_code = decrypt(card.security_code, userId);

        card.number = number;
        card.password = password;
        card.security_code = security_code;

        return card;
      });

      folder.credentials.map((credential) => {
        const password = decrypt(credential.password, userId);

        credential.password = password;

        return credential;
      });

      folder.notes.map((note) => {
        const note_decrypted = decrypt(note.note, userId);

        note.note = note_decrypted;

        return note;
      });

      return folder;
    });

    return folders;
  }
}

export default new GetFolder();
