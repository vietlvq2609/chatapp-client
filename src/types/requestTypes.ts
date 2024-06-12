interface TLogin {
  username: string;
  password: string;
}

interface TRegister {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
}

export type { TLogin, TRegister };
