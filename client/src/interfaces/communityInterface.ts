import { IRecipe } from "./recipeInterface";
import { IUser } from "./userInterface";

export interface ICommunity {
  _id: string;
  banned: string[] | IUser[];
  posts: string[] | IRecipe[];
  creator: string | IUser;
  members: string[] | IUser;
  name: string;
  description: string;
  logo: string;
}

export interface CreateCommunityData {
  name: string;
  desc: string;
}
