import { NextFunction, Request, Response } from "express";
import Community from "../models/Community";
import { createCommunityValidator } from "../validators/communityValidator";

export const getAllCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currPage } = req.query;

    const qCurrPage = parseInt(currPage as string) || 1;
    const limit = 10;
    const skip = (qCurrPage - 1) * limit;

    const communities = await Community.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount = await Community.countDocuments(communities);

    const resBody = {
      data: communities,
      totalCount,
    };

    res.json(resBody);
  } catch (error) {
    next(error);
  }
};

export const getCommunityDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findOne({ _id: communityId });
    if (!community) return res.status(404).send("Community did not found");

    res.json(community);
  } catch (error) {
    next(error);
  }
};

export const createCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, desc } = req.body;

    const { error } = createCommunityValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    if (!currUserId) {
      return res.status(401).send("Please authenticate first");
    }

    const newCommunity = new Community({
      name,
      description: desc,
      creator: currUserId,
    });

    // await newCommunity.save();

    res.json(newCommunity);
  } catch (error) {
    next(error);
  }
};

export const editCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId } = req.params;
    const { name, desc } = req.body;

    const { error } = createCommunityValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    if (!currUserId) {
      return res.status(401).send("Please authenticate first");
    }

    const community = await Community.findOne({ _id: communityId });
    if (!community) return res.status(404).send("Community did not found");

    community.name = name;
    community.description = desc;

    await community.save();

    res.json(community);
  } catch (error) {
    next(error);
  }
};

export const deleteCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findOneAndDelete({ _id: communityId });
    if (!community) return res.status(404).send("Community did not found");

    res.json(community);
  } catch (error) {
    next(error);
  }
};
