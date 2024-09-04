import { NextFunction, Request, Response } from "express";
import Community from "../models/Community";

const isCommunityOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId } = req.params;

    const userId = req.user?._id;

    const community = await Community.findOne({ _id: communityId });

    if (community?.creator !== userId)
      return res
        .status(401)
        .send("Sorry but you are not authorized to do this action");

    next();
  } catch (error) {
    next(error);
  }
};

export default isCommunityOwner;
