import type { RegisterUserData } from "../../layer_domain/entities/user/GlobalUserInterfaces";
import type IUser from "../../layer_domain/entities/user/IUser";
import type IUserRepository from "../../layer_domain/repositories/IUserRepository";
import User from "../../models/User";

export class UserRepository implements IUserRepository{
    async findUserByKey<K extends keyof IUser>(query: Record<K, IUser[K]>): Promise<IUser | null> {
        const foundUser = await User.findOne(query)
        return foundUser
    }

    async createUser(data: RegisterUserData): Promise<IUser> {
        const newUser = new User(data)
        await newUser.save()
        return newUser
    }
}