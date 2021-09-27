type User = {
  email: string;
  password: string;
};

type Address = {
  userId: string;
  country: string;
  state: string;
  city: string;
  district: string;
  road: string;
  number: string;
};

type Infos = {
  userId: string;
  name: string;
  gender: string;
  age: string;
  telephone: string;
  birthday: Date;
};
