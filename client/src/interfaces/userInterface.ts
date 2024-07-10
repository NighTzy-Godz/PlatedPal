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
