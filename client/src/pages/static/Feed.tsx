import React from "react";
import { recipeApi } from "../../store/apis/recipeApi";
import { Link } from "react-router-dom";
import IMG from "../../assets/imgs/test_img.jpg";
import IMG2 from "../../assets/imgs/test_img2.jpg";

import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import SavedIcon from "../../components/icons/SavedIcon";
import { IRecipe } from "../../interfaces/recipeInterface";
import FeedPostCard from "../../components/cards/FeedPostCard";
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
        <div className="w-1/3 sticky top-28 h-[80dvh] bg-red-500"></div>

        <div className="w-3/5 ">{renderFeedPosts()}</div>
        <div className="w-1/3 sticky  top-28 h-[80dvh] bg-blue-300">Right</div>
      </div>
    </div>
  );
}

export default Feed;
