import CreateAddress from "../Services/User/CreateAddress";

export default {
  Query: {},
  Mutation: {
    async createAddress(_: any, address: Address) {
      return CreateAddress.execute(address);
    },
  },
};
