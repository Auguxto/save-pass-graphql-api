import Book from "./Book";
import User from "./User";

export default {
  Query: {
    books: Book.Query.books,
    users: User.Query.users,
  },
  Mutation: {
    createBook: Book.Mutation.createBook,
    createUser: User.Mutation.createUser,
  },
};
