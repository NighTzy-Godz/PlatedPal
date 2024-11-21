import type { RegisterUserData } from "../entities/user/GlobalUserInterfaces";
import type IUser from "../entities/user/IUser";

export default interface IUserRepository{
    createUser(data: RegisterUserData): Promise<IUser>
    findUserByKey<K extends keyof IUser>(query: Record<K, IUser[K]>): Promise<IUser | null>;
}