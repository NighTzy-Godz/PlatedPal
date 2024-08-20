import React, { useEffect } from "react";
import IMG from "../../assets/imgs/test_img2.jpg";
import Button, { btnVariants } from "../../components/common/Button";
import { Link, useParams } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { recipeApi } from "../../store/apis/recipeApi";
import { IRecipe } from "../../interfaces/recipeInterface";
import { IUser } from "../../interfaces/userInterface";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { BiSolidLike } from "react-icons/bi";
function RecipeDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { recipeId } = useParams();
  const { data } = recipeApi.useGetRecipeDetailsQuery(recipeId);
  const recipe = data as IRecipe;

  const currUserId = useSelector((state: State) => state.auth.decodedUser?._id);

  const {
    title,
    image,
    creator,
    saved,
    likes,
    prepTime,
    cookTime,
    instructions,
    ingredients,
    description,
  } = recipe || {};
  const xCreator = creator as IUser;

  const renderButtons = () => {
    if (currUserId === xCreator?._id) {
      return (
        <React.Fragment>
          <Link
            to={`/recipes/editRecipe/${recipeId}`}
            className={btnVariants({ variant: "darkBlue" })}
          >
            Edit Recipe
          </Link>

          <Button variant="danger">Delete Recipe</Button>
        </React.Fragment>
      );
    }
    return <Button variant="main">Save Recipe</Button>;
  };

  const renderIngredients = ingredients?.map((item) => {
    return (
      <p className="text-textColor text-xl mb-3" key={item.id}>
        <span className="font-semibold">{item.unit}</span> of {item.ingredient}
      </p>
    );
  });

  const renderInstructions = instructions?.map((item, index) => {
    return (
      <div className="mb-5" key={item.id}>
        <p className="text-textColor font-semibold text-xl">Step {index + 1}</p>
        <p className="text-textColor text-lg">{item.instruction}</p>
      </div>
    );
  });

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-10 mb-10">
          <div className="w-1/2">
            <img
              src={image}
              alt=""
              className="h-[550px] object-cover w-full rounded-2xl"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <div className="mb-5 flex gap-3">{renderButtons()}</div>
            <div className="mb-5 flex gap-3 items-center ">
              <img
                className="w-9 h-9 object-cover rounded-full "
                src={xCreator?.pfp}
                alt="Creator PFP"
              />
              <Link className="text-textColor font-semibold " to="#">
                {xCreator?.firstName} {xCreator?.lastName}
              </Link>
            </div>
            <div className="mb-5">
              <h3 className="text-textColor text-5xl">{title}</h3>
            </div>
            <div className="flex gap-10 mb-5">
              <div className=" flex gap-2 items-center">
                <FaCommentAlt className="w-5 h-5 text-mainColor" />
                <p className="text-textColorDark text-lg font-semibold">11</p>
              </div>{" "}
              <div className=" flex gap-2 items-center">
                <FaBookmark className="w-5 h-5 text-mainColor" />
                <p className="text-textColorDark text-lg font-semibold">
                  {saved}
                </p>
              </div>
              <div className=" flex gap-2 items-center">
                <BiSolidLike className="w-6 h-6 text-mainColor " />
                <p className="text-textColorDark text-lg font-semibold">
                  {likes}
                </p>
              </div>
            </div>
            <div className="mb-5">
              <h3 className="mb-3 text-2xl text-textColor">
                Instructions:{" "}
                <span className="font-medium text-xl">
                  {instructions?.length} Steps
                </span>
              </h3>
              <h3 className="mb-3 text-2xl text-textColor">
                Cook Time:{" "}
                <span className="font-medium text-xl">
                  {cookTime?.hours}H {cookTime?.min} Mins
                </span>
              </h3>
              <h3 className="mb-3 text-2xl text-textColor">
                Prep Time:{" "}
                <span className="font-medium text-xl">
                  {" "}
                  {prepTime?.hours}H {prepTime?.min} Mins
                </span>
              </h3>
            </div>

            <div className="h-32   overflow-y-scroll">
              <p className="text-textColor">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex mb-10 w-4/5 gap-10 mx-auto">
          <div className="w-1/2 ">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl text-textColor">Ingredients</h1>
              <p className="text-xl text-textColor">{ingredients?.length}</p>
            </div>

            {renderIngredients}
          </div>
          <div className="w-1/2 ">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl text-textColor">Instructions </h1>
              <p className="text-xl text-textColor">{instructions?.length}</p>
            </div>
            {renderInstructions}
          </div>
        </div>

        <div className="w-4/5 mx-auto">
          <h1 className="text-2xl text-textColor">Notes will be here soon</h1>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
