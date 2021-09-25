import CreateUser from "../Services/CreateUser";

export default {
  Mutation: {
    createUser(_: any, user: User) {
      return CreateUser.execute(user);
    },
  },
};
