import CreateNote from "../Services/Note/CreateNote";

export default {
  Query: {},
  Mutation: {
    async createNote(_: any, note: Note, context: MutationContext) {
      return CreateNote.execute(note, context);
    },
  },
};
