import Address from "./Address";
import Card from "./Card";
import Credential from "./Credential";
import Folder from "./Folder";
import Infos from "./Infos";
import Note from "./Note";
import User from "./User";

export default {
  Query: {
    user: User.Query.user,
    card: Card.Query.card,
  },
  Mutation: {
    createUser: User.Mutation.createUser,
    createSession: User.Mutation.createSession,
    createAddress: Address.Mutation.createAddress,
    createInfo: Infos.Mutation.createAddress,
    createCard: Card.Mutation.createCard,
    createCredential: Credential.Mutation.createCredential,
    createNote: Note.Mutation.createNote,
    createFolder: Folder.Mutation.createFolder,
  },
};
