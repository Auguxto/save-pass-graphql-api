import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const prisma = new PrismaClient();

const AuthenticationAssurance = async (authHeader: string): Promise<string> => {
  if (!authHeader) return null;

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as TokenPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: sub,
      },
    });

    if (!user) return null;

    return user.id;
  } catch {
    return null;
  }
};

export default AuthenticationAssurance;
