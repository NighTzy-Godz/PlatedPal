import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";

const validateSchema = (schema :ObjectSchema) =>{
    return (req:Request,res:Response,next:NextFunction) =>{
        try {
            const {error} = schema.validate(req.body)
            if(error){
                res.status(400).send(error.details[0].message)
            }

            next()
        } catch (error) {
            next(error)
        }
        
    }
}

export default(validateSchema)