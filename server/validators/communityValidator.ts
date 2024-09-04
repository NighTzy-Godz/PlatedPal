import Joi from "joi";
import { CreateCommunityData } from "../interfaces/communityInterfaces";

export const createCommunityValidator = (data: CreateCommunityData) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.required": "Community Name is a required field",
      "string.base": "Community Name should be a type of string",
    }),

    desc: Joi.string().required().min(20).max(500).messages({
      "string.required": "Community Description is a required field",
      "string.base": "Community Description should be a type of a string",
      "string.min":
        "Community Description should contain atleast 20 characters",
      "string.max": "Community Description can only contain 500 max characters",
    }),
  });

  return schema.validate(data);
};
