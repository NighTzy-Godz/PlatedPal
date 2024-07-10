import React, { useEffect } from "react";
import ContentCenter from "../../layout/ContentCenter";
import AuthFormWidth from "../../layout/AuthFormWidth";
import { useForm } from "react-hook-form";
import { LoginUserData } from "../../interfaces/userInterface";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../../components/forms/InputLabel";
import Input from "../../components/forms/Input";
import Button from "../../components/common/Button";
import InputError from "../../components/forms/InputError";
import { userApi } from "../../store/apis/userApi";
import { renderError } from "../../utils/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginUser, { error, isLoading, isSuccess }] =
    userApi.useLoginUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserData>();

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully Logged In. Welcome Back!");
      navigate("/");
    }
  }, [error, isSuccess]);

  const handleLoginSubmit = (data: LoginUserData) => {
    loginUser(data);
  };

  return (
    <ContentCenter>
      <div className="container mx-auto">
        <AuthFormWidth>
          <div className="text-center mb-10">
            <h1 className="text-mainColor text-3xl mb-2">Login</h1>
            <p className="text-textColor text-lg leading-tight">
              In order to join communities, add and save recipes, you must Login
              your account first
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="mb-5">
              <FormInputsContainer>
                <InputLabel htmlFor="email" className="mb-1">
                  Email
                </InputLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex. myemail@yahoo.com"
                  {...register("email", {
                    required: "Email is a required field",
                  })}
                />
                {errors && <InputError errMsg={errors.email?.message} />}
              </FormInputsContainer>
            </div>
            <div className="mb-5">
              <FormInputsContainer>
                <InputLabel htmlFor="password" className="mb-1">
                  Password
                </InputLabel>
                <Input
                  type="password"
                  id="password"
                  placeholder="Your account Password"
                  {...register("password", {
                    required: "Password is a required field",
                  })}
                />
                {errors && <InputError errMsg={errors.password?.message} />}
              </FormInputsContainer>
            </div>

            <div className="">
              <Button
                isLoading={isLoading}
                type="submit"
                variant="darkBlue"
                className="w-full "
              >
                Login
              </Button>
            </div>
          </form>
        </AuthFormWidth>
      </div>
    </ContentCenter>
  );
}

export default Login;
