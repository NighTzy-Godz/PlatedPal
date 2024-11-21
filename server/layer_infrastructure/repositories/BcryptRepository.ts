import type { IBcryptRepository } from "../../layer_domain/repositories/IBcryptRepository";
import bcrypt from 'bcrypt'
export class BcryptRepository implements IBcryptRepository{
    async saltPassword(salt: number): Promise<string> {
        return await bcrypt.genSalt(salt)
    }

    async hashPassword(data: string, salt: number | string): Promise<string> {
        return await bcrypt.hash(data, salt)
    }

}