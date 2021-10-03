import CreateInfo from "../Services/Info/CreateInfo";

export default {
  Query: {},
  Mutation: {
    async createAddress(_: any, info: Infos, context: MutationContext) {
      return CreateInfo.execute(info, context);
    },
  },
};
