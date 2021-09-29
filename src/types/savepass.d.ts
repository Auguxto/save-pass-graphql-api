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

type MutationContext = {
  authHeader: string;
};
