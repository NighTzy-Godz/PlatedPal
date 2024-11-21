import type { NextFunction, Request, Response } from "express";
import type { UserUseCases } from "../../layer_application/UserUseCases";

export default class UserController{

    constructor(private userUseCases: UserUseCases){}

    async registerUser(req: Request, res: Response, next:NextFunction){
        try {
            const newUser = await this.userUseCases.registerUser(req.body)
            res.json(newUser)
        } catch (error) {
            next(error)
        }
        
    }
}