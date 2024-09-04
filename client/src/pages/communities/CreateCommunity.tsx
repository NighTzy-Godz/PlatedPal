import React, { useEffect } from "react";
import ContentCenter from "../../layout/ContentCenter";
import AuthFormWidth from "../../layout/AuthFormWidth";
import { useForm } from "react-hook-form";
import {
  CreateCommunityData,
  ICommunity,
} from "../../interfaces/communityInterface";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../../components/forms/InputLabel";
import Input from "../../components/forms/Input";
import TextArea from "../../components/forms/TextArea";
import Button from "../../components/common/Button";
import InputError from "../../components/forms/InputError";
import { toast } from "sonner";
import { communityApi } from "../../store/apis/communityApi";
import { renderError } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

function CreateCommunity() {
  const navigate = useNavigate();
  const [createCommunity, result] = communityApi.useCreateCommunityMutation();
  const { isLoading, isSuccess, error, data } = result;
  const communityCreated: ICommunity = data;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCommunityData>();

  useEffect(() => {
    if (error) {
      renderError(error);
    }

    if (isSuccess) {
      toast.success(
        `Successfully Created the Community ${communityCreated.name}!`
      );
      navigate(`/community/${communityCreated._id}`);
    }
  }, [isLoading, isSuccess, error]);

  const handleCreateCommunitySubmit = (data: CreateCommunityData) => {
    createCommunity(data);
  };

  return (
    <ContentCenter>
      <div className="container mx-auto">
        <AuthFormWidth>
          <div className="text-center mb-12">
            <h1 className="text-mainColor text-3xl mb-2">Create Community</h1>
            <p className="text-textColor text-lg leading-tight">
              Let's connect to the other people by creating a community. Follow
              the steps below and lets get united!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleCreateCommunitySubmit)}>
            <FormInputsContainer className="mb-5">
              <InputLabel>Community Name</InputLabel>
              <Input
                placeholder="Ex. Health and Fitness"
                {...register("name", {
                  required: "Community Name is a required field",
                })}
              />

              {errors?.name && <InputError errMsg={errors?.name.message} />}
            </FormInputsContainer>{" "}
            <FormInputsContainer className="mb-5">
              <InputLabel>Community Description</InputLabel>
              <TextArea
                placeholder="This community provides health . . ."
                {...register("desc", {
                  required: "Community Description is a required field",
                  minLength: {
                    value: 20,
                    message:
                      "Community Description should contain atleast 20 characters",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Community Description should contain atleast 500 characters",
                  },
                })}
              />
              {errors?.desc && <InputError errMsg={errors.desc.message} />}
            </FormInputsContainer>
            <Button isLoading={isLoading} variant="darkBlue" className="w-full">
              Create Community
            </Button>
          </form>
        </AuthFormWidth>
      </div>
    </ContentCenter>
  );
}

export default CreateCommunity;
