import Address from "./Address";
import Infos from "./Infos";
import User from "./User";

export default {
  Query: {
    user: User.Query.user,
  },
  Mutation: {
    createUser: User.Mutation.createUser,
    createAddress: Address.Mutation.createAddress,
    createInfo: Infos.Mutation.createAddress,
  },
};
