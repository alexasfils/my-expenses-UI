export type UserAuthDTO = UserDTO & {
  token: string;
};

export type UserDTO = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  currency: string;
};

export type UserRequestDTO = UserDTO & {
  password: string;
};
