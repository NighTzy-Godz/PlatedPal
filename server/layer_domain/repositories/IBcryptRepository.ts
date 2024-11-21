export interface IBcryptRepository{
    saltPassword(salt: number): Promise<string>;
    hashPassword(data: string, salt: number | string): Promise<string>
}