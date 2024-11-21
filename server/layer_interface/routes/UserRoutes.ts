import { Router, type NextFunction, type Request, type Response } from "express";
import  UserController  from "../controller/UserController";
import { UserUseCases } from "../../layer_application/UserUseCases";
import { UserRepository } from "../../layer_infrastructure/repositories/UserRepository";
import { BcryptRepository } from "../../layer_infrastructure/repositories/BcryptRepository";
import validateSchema from "../../layer_infrastructure/middleware/validateSchema";
import registerUserSchema from "../../layer_infrastructure/validators/user/registerUserSchema";
import isPasswordMatch from "../../layer_infrastructure/middleware/isPasswordMatch";
const app = Router()

const bcryptRepository = new BcryptRepository()
const userRepository = new UserRepository()
const userUseCases = new UserUseCases(userRepository, bcryptRepository)
const userController = new UserController(userUseCases)

app.post('/register-user', [validateSchema(registerUserSchema), isPasswordMatch],  (req:Request,res:Response,next:NextFunction) => userController.registerUser(req,res,next))

export default app