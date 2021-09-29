import Address from "./Address";
import Card from "./Card";
import Infos from "./Infos";
import User from "./User";

export default {
  Query: {
    user: User.Query.user,
  },
  Mutation: {
    createUser: User.Mutation.createUser,
    createSession: User.Mutation.createSession,
    createAddress: Address.Mutation.createAddress,
    createInfo: Infos.Mutation.createAddress,
    createCard: Card.Mutation.createCard,
  },
};
