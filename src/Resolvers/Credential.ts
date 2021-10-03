import CreateCredential from "../Services/Credential/CreateCredential";

export default {
  Query: {},
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
