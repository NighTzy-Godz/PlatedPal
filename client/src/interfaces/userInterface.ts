export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface IDecodedUser {
  _id: string;
  fullName: string;
  pfp: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  pfp: string;
  username: string;
  password: string;
  bio: string;
  email: string;

  followers?: number;
  following?: number;
  posts?: string[];
}
