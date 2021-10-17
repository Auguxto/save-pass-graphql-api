import CreateNote from "../Services/Note/CreateNote";
import GetNote from "../Services/Note/GetNote";

import { MutationContext, Note } from "../types/savepass";

export default {
  Query: {
    async note(_: any, { id }: { id: string }, context: MutationContext) {
      return GetNote.findOne(id, context);
    },
    async notes(_: any, args, context: MutationContext) {
      return GetNote.findMany(context);
    },
  },
  Mutation: {
    async createNote(_: any, note: Note, context: MutationContext) {
      return CreateNote.execute(note, context);
    },
  },
};
