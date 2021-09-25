type User = {
  id: string;
  name: string;
};

const users: User[] = [];

export default {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser(_: any, { id, name }: User) {
      users.push({ id, name });
      return users;
    },
  },
};
