import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  createCommunity,
  deleteCommunity,
  editCommunity,
  getAllCommunity,
} from "../controllers/communityController";
import isCommunityOwner from "../middleware/isCommunityOwner";

const app = Router();

app.get("/getAllCommunity", getAllCommunity);
app.get("/getCommunityDetails", getAllCommunity);

app.post("/createCommunity", [isAuth], createCommunity);

app.put(
  "/editCommunity/:communityId",
  [isAuth, isCommunityOwner],
  editCommunity
);

app.delete(
  "/deleteCommunity/:communityId",
  [isAuth, isCommunityOwner],
  deleteCommunity
);

export default app;
