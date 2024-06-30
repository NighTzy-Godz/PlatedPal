import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const jwtSecretPass = process.env.jwtSecretPass as string;

interface DecodedUser {
  _id: string;
  fullName: string;
  pfp: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(403)
        .send("Forbidden. You don't have permission to access this resource");

    const decoded = jwt.verify(token, jwtSecretPass) as JwtPayload;

    const user: DecodedUser = {
      _id: decoded._id,
      fullName: decoded.fullName,
      pfp: decoded.pfp,
    };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
