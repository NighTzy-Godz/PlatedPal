import Joi from "joi";
import { RegisterUserData } from "../interfaces/userInterfaces";

export const registerUserValidator = (
  data: RegisterUserData
): Joi.ValidationResult => {
  const schema: Joi.Schema<RegisterUserData> = Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First Name is a required field",
      "string.base": "First Name should be a type of string",
      "string.empty": "First Name cannot be empty",
    }),
    lastName: Joi.string().required().messages({
      "any.required": "Last Name is a required field",
      "string.base": "Last Name should be a type of string",
      "string.empty": "Last Name cannot be empty",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email should be a type of string",
      "any.required": "Email is a required field ",
      "string.empty": "Email cannot be empty",
      "string.email": "Please enter a valid email",
    }),

    password: Joi.string().min(5).required().messages({
      "string.base": "Password should be a type of string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should be atleast 5 characters",
      "any.required": "Password is a required field",
    }),

    confirmPassword: Joi.string().min(5).required().messages({
      "string.base": "Confirm Password should be a type of string",
      "string.empty": "Confirm Password cannot be empty",
      "string.min": "Confirm Password should be atleast 5 characters",
      "any.required": "Confirm Password is a required field",
    }),
  });

  return schema.validate(data);
};
