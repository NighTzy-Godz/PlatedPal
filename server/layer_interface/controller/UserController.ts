import type { NextFunction, Request, Response } from "express";
import type { UserUseCases } from "../../layer_application/UserUseCases";
import { UserAlreadyExistsError } from "../../layer_domain/errors/user/UserAlreadyExistsError";

export default class UserController{

    constructor(private userUseCases: UserUseCases){}

    async registerUser(req: Request, res: Response, next:NextFunction){
        try {
            const newUser = await this.userUseCases.registerUser(req.body)
            res.status(201).json({data: newUser})
        } catch (error) {
            if(error instanceof UserAlreadyExistsError){
                res.status(409).json({message: 'User already exists'})
            }
            next(error)
        }
        
    }
} 