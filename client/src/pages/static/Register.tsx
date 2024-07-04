import React, { useEffect } from "react";
import Input from "../../components/forms/Input";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../../components/forms/InputLabel";
import { useForm } from "react-hook-form";
import { RegisterUserData } from "../../interfaces/userInterface";
import Button from "../../components/common/Button";
import { toast } from "sonner";
import InputError from "../../components/forms/InputError";
import { userApi } from "../../store/apis/userApi";
import { useNavigate } from "react-router-dom";
import { renderError } from "../../utils/utils";
function Register() {
  const navigate = useNavigate();
  const [registerUser, result] = userApi.useRegisterUserMutation();
  const { error, isSuccess, isLoading } = result;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>();

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully Created the User");
      navigate("/login");
    }
  }, [isLoading, isSuccess, error]);

  const handleRegisterUserSubmit = (data: RegisterUserData) => {
    registerUser(data);
  };

  return (
    <div className="py-10 w-full h-[90dvh] grid place-items-center">
      <div className="w-1/4 mx-auto ">
        <div className="text-center mb-10">
          <h1 className="text-mainColor text-3xl mb-2">Register</h1>
          <p className="text-textColor text-lg leading-tight">
            In order to join communities, add and save recipes, you must create
            an account first
          </p>
        </div>
        <form onSubmit={handleSubmit(handleRegisterUserSubmit)}>
          <div className="flex gap-3 mb-5">
            {" "}
            <FormInputsContainer>
              <InputLabel htmlFor="firstName" className="mb-1">
                First Name
              </InputLabel>
              <Input
                id="firstName"
                placeholder="Ex. John Doe . . ."
                {...register("firstName", {
                  required: "First Name is a required field",
                })}
              />
              {errors.firstName && (
                <InputError errMsg={errors.firstName.message} />
              )}
            </FormInputsContainer>
            <FormInputsContainer>
              <InputLabel htmlFor="lastName" className="mb-1">
                Last Name
              </InputLabel>
              <Input
                id="lastName"
                placeholder="Ex. Elmerized. . ."
                {...register("lastName", {
                  required: "Last Name is a required field",
                })}
              />
              {errors.lastName && (
                <InputError errMsg={errors.lastName.message} />
              )}
            </FormInputsContainer>
          </div>
          <div className="mb-5">
            {" "}
            <FormInputsContainer>
              <InputLabel className="mb-1" htmlFor="email">
                Email
              </InputLabel>
              <Input
                {...register("email", {
                  required: "Email is a required field",
                })}
                id="email"
                placeholder="Ex. johndoe@gmail.com"
                type="email"
              />
              {errors.email && <InputError errMsg={errors.email.message} />}
            </FormInputsContainer>
          </div>

          <div className="flex gap-3 mb-5">
            <FormInputsContainer>
              <InputLabel htmlFor="password" className="mb-1">
                Password
              </InputLabel>
              <Input
                id="password"
                type="password"
                placeholder="Your desired account password"
                {...register("password", {
                  required: "Password is a required field",
                  minLength: {
                    value: 5,
                    message: "Password should be atleast 5 characters",
                  },
                })}
              />
              {errors.password && (
                <InputError errMsg={errors.password.message} />
              )}
            </FormInputsContainer>
            <FormInputsContainer>
              <InputLabel htmlFor="confirmPass" className="mb-1">
                Confirm Password
              </InputLabel>
              <Input
                id="confirmPass"
                type="password"
                placeholder="Match it with your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is a required field",
                  minLength: {
                    value: 5,
                    message: "Confirm Password should be atleast 5 characters",
                  },
                })}
              />
              {errors.confirmPassword && (
                <InputError errMsg={errors.confirmPassword.message} />
              )}
            </FormInputsContainer>
          </div>

          <div className="">
            <Button
              isLoading={isLoading}
              type="submit"
              variant="darkBlue"
              className="w-full "
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
