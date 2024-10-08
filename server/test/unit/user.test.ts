import {
  loginUserValidator,
  registerUserValidator,
} from "../../validators/userValidator";

describe("registerUserValidator", () => {
  const validUser = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "password123",
    confirmPassword: "password123",
  };

  it("should validate a correct user object", () => {
    const result = registerUserValidator(validUser);
    expect(result.error).toBeUndefined();
  });

  it("should return an error if the fields are empty", () => {
    const values = {};

    const { error } = registerUserValidator(values as any);

    expect(error).toBeDefined();
    error?.details.forEach((err) => {
      expect(err.message).toContain("required field");
    });
  });

  it("should return an error if the fields are not strings", () => {
    const nonStringValues = {
      firstName: 1,
      lastName: 1,
      email: 1,
      password: 1,
      confirmPassword: 1,
    };

    const { error } = registerUserValidator(nonStringValues as any);
    expect(error).toBeDefined();
    error?.details.forEach((err) => {
      expect(err.message).toContain("should be a type of string");
    });
  });

  it("should return an error if the email is not valid", () => {
    const invalidEmail = { ...validUser, email: "NotValidEmail" };
    const { error } = registerUserValidator(invalidEmail);
    expect(error).toBeDefined();
    expect(error?.details).toBeDefined();
    expect(error?.details[0].message).toContain("Please enter a valid email");
  });

  it("should return an error if the password and confirm password character length is less than 5 ", () => {
    const insufficientPassLengthUser = {
      ...validUser,
      password: "123",
      confirmPassword: "1234",
    };

    const { error } = registerUserValidator(insufficientPassLengthUser);
    expect(error).toBeDefined();
    error?.details.forEach((err) => {
      expect(err.message).toContain("should be atleast 5 characters");
    });
  });
});

describe("loginUserValidator", () => {
  const validLoginInfo = { email: "test@gmail.com", password: "pass12345" };
  it("should validate a correct login information", () => {
    const { error } = loginUserValidator(validLoginInfo);
    expect(error).toBeUndefined();
  });

  it("should return an error if there is no passed values", () => {
    const zeroValues = {};

    const { error } = loginUserValidator(zeroValues as any);
    expect(error).toBeDefined();

    error?.details.forEach((err) => {
      expect(err.message).toContain("required field");
    });
  });

  it("should return an error if the passed values are numbers", () => {
    const numvalues: any = { email: 1, password: 1 };

    const { error } = loginUserValidator(numvalues);
    expect(error).toBeDefined();

    error?.details.forEach((err) => {
      expect(err.message).toContain("should be a type of string");
    });
  });

  it("should return an error if the email is not a valid email", () => {
    const notValidEmail = { email: "notvalidemail@", password: "1234" };

    const { error } = loginUserValidator(notValidEmail);

    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe("Please enter a valid email");
  });
});
