import CreateInfo from "../Services/User/CreateInfo";

export default {
  Query: {},
  Mutation: {
    async createAddress(_: any, info: Infos) {
      return CreateInfo.execute(info);
    },
  },
};