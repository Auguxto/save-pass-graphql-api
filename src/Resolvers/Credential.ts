import CreateCredential from "../Services/Credential/CreateCredential";
import GetCredential from "../Services/Credential/GetCredential";

export default {
  Query: {
    async credential(_: any, { id }: { id: string }, context: MutationContext) {
      return GetCredential.findOne(id, context);
    },
    async credentials(_: any, args, context: MutationContext) {
      return GetCredential.findMany(context);
    },
  },
  Mutation: {
    async createCredential(
      _: any,
      credential: CCredential,
      context: MutationContext
    ) {
      return CreateCredential.execute(credential, context);
    },
  },
};
