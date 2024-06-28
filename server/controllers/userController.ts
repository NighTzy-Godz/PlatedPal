import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { registerUserValidator } from "../validators/userValidator";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const { error } = registerUserValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const isPasswordMatch = password === confirmPassword;
    if (!isPasswordMatch)
      return res
        .status(400)
        .send("Password and Confirm Password did not match");

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).send("User with this email already existed");

    const user = new User({
      firstName,
      lastName,
      email,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(confirmPassword, salt);

    user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};
