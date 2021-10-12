type User = {
  email: string;
  password: string;
};

type Address = {
  country: string;
  state: string;
  city: string;
  district: string;
  road: string;
  number: string;
};

type Infos = {
  name: string;
  gender: string;
  age: string;
  telephone: string;
  birthday: Date;
};

type Card = {
  name: string;
  number: string;
  password: string;
  flag: string;
  bank: string;
  security_code: string;
  expiresIn: string;
  note?: string | null;
  favorite?: boolean;
  folderId: string;
};

type CCredential = {
  name: string;
  username?: string;
  email?: string;
  telephone?: string;
  password: string;
  note?: string | null;
  favorite?: boolean;
  folderId: string;
};

type Note = {
  name: string;
  note: string;
  folderId?: string;
  favorite?: boolean;
  folderId: string;
};

type Folder = {
  name: string;
  favorite?: boolean;
};

type Payment = {
  amount: number;
  currency: string;
};

type MutationContext = {
  authHeader: string;
};
