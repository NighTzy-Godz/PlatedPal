import React from "react";
import { recipeApi } from "../../store/apis/recipeApi";

import { IRecipe } from "../../interfaces/recipeInterface";
import FeedPostCard from "../../components/cards/FeedPostCard";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
function Feed() {
  const { data } = recipeApi.useGetAllRecipesQuery("");
  const feedPosts = data?.data as IRecipe[];

  const renderFeedPosts = () => {
    if (feedPosts?.length === 0) {
      return <h1>No Feed Posts available</h1>;
    }
    return feedPosts?.map((feed) => {
      return <FeedPostCard data={feed} />;
    });
  };

  return (
    <div className="py-10 ">
      <div className="container mx-auto flex gap-5">
        <div className="w-1/3 sticky top-28 h-[80dvh] border border-slate-300 px-4 py-3">
          <Link
            to="/createCommunity"
            className="text-textColor flex items-center gap-2 text-lg"
          >
            <IoMdAdd className="text-textColor h-6 w-6" /> Create a Community
          </Link>
        </div>

        <div className="w-3/5 ">{renderFeedPosts()}</div>
        <div className="w-1/3 sticky  top-28 h-[80dvh] bg-blue-300">Right</div>
      </div>
    </div>
  );
}

export default Feed;
