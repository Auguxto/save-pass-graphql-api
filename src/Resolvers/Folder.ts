import CreateFolder from "../Services/User/CreateFolder";

export default {
  Query: {},
  Mutation: {
    async createFolder(_: any, folder: Folder, context: MutationContext) {
      return CreateFolder.execute(folder, context);
    },
  },
};
