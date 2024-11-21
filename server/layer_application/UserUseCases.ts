import type { RegisterUserData } from "../interfaces/userInterfaces";
import type IUser from "../layer_domain/entities/user/IUser";
import { UserAlreadyExistsError } from "../layer_domain/errors/user/UserAlreadyExistsError";
import type { IBcryptRepository } from "../layer_domain/repositories/IBcryptRepository";
import type IUserRepository from "../layer_domain/repositories/IUserRepository";

export class UserUseCases{
    constructor(private userRepository: IUserRepository, private bcryptRepository: IBcryptRepository){}

    async registerUser(data: RegisterUserData): Promise<IUser| void>{
        const {firstName, lastName, email, password, confirmPassword} = data

        const isExistingUser = await this.userRepository.findUserByKey({email})
        if(isExistingUser) throw new UserAlreadyExistsError()

        const newUserData = {
            firstName,
            lastName,
            email,
            password,
        }

        const salt  = await this.bcryptRepository.saltPassword(10)
        newUserData.password = await this.bcryptRepository.hashPassword(confirmPassword, salt)

        const newUser = await this.userRepository.createUser(newUserData)
        return newUser
    
    }

} 