import CreateFolder from "../Services/Folder/CreateFolder";
import GetFolder from "../Services/Folder/GetFolder";

import { Folder, MutationContext } from "../types/savepass";

export default {
  Query: {
    async folder(_: any, { id }: { id: string }, context: MutationContext) {
      return GetFolder.findOne(id, context);
    },
    async folders(_: any, args, context: MutationContext) {
      return GetFolder.findMany(context);
    },
  },
  Mutation: {
    async createFolder(_: any, folder: Folder, context: MutationContext) {
      return CreateFolder.execute(folder, context);
    },
  },
};
