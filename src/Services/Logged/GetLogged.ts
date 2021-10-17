import { MutationContext } from "../../types/savepass";

class GetLogged {
  async execute(context: MutationContext) {
    const token = context.req.cookies.token;

    if (token) {
      return { Logged: token };
    }

    return null;
  }
}

export default new GetLogged();
