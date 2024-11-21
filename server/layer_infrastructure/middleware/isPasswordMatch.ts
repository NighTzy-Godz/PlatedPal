import type { NextFunction, Request, Response } from "express";

const isPasswordMatch = (req:Request, res: Response, next: NextFunction) =>{
    try {
     const {password, confirmPassword} = req.body
     
     if(password !== confirmPassword){
        res.status(400).send('Password and Confirm did not match')
        return;
     }

     next()
    } catch (error) {
        next(error)
    }
}

export default isPasswordMatch