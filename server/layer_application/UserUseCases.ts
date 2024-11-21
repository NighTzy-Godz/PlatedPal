import type { RegisterUserData } from "../interfaces/userInterfaces";
import type IUser from "../layer_domain/entities/user/IUser";
import type { IBcryptRepository } from "../layer_domain/repositories/IBcryptRepository";
import type IUserRepository from "../layer_domain/repositories/IUserRepository";

export class UserUseCases{
    constructor(private userRepository: IUserRepository, private bcryptRepository: IBcryptRepository){}

    async registerUser(data: RegisterUserData): Promise<IUser| void>{
        try {
            const {firstName, lastName, email, password, confirmPassword} = data

            const isExistingUser = await this.userRepository.findUserByKey({email})
            if(isExistingUser) throw new Error('User with this email already exists')

            console.log(isExistingUser)

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

        } catch (error) {
            console.log('Error on registerUser useCase - ', error)
        }
    
    }

} 