import React from "react";
import { IRecipe } from "../../interfaces/recipeInterface";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import SavedIcon from "../icons/SavedIcon";
import { IUser } from "../../interfaces/userInterface";

interface FeedPostCardProps {
  data: IRecipe;
}

function FeedPostCard({ data }: FeedPostCardProps) {
  const { description, creator, image, _id: recipeId } = data;
  const xtractedCreator = creator as IUser;

  return (
    <div className="px-3 py-5 border mb-5 border-slate-300">
      <div className="mb-5 flex gap-3">
        <Link to="#">
          <img
            src={xtractedCreator?.pfp}
            className="w-12 h-12 rounded-full"
            alt="PROFILE PICTURE"
          />
        </Link>
        <div className="">
          <Link
            to="#"
            className="text-lg text-textColor leading-tight font-bold"
          >
            {xtractedCreator.firstName} {xtractedCreator.lastName}
          </Link>
          <p className="text-slate-500 leading-tight">5 Hours Ago</p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-textColor text-2xl">{description}</p>
      </div>

      <div className="mb-5">
        <Link to={`/recipe/${recipeId}`}>
          {" "}
          <img src={image} alt="" />
        </Link>
      </div>

      <div className="flex justify-around items-center gap-5">
        <div className="cursor-pointer flex justify-around items-center w-full">
          {" "}
          <BiLike className="w-6 h-6" />
        </div>
        <div className="cursor-pointer  flex justify-around items-center w-full">
          {" "}
          <FaRegComment className="w-6 h-6" />
        </div>
        <div className="cursor-pointer flex justify-around items-center w-full">
          {" "}
          <SavedIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default FeedPostCard;
