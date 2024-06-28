import supertest from "supertest";
import server from "../..";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { RegisterUserData } from "../../interfaces/userInterfaces";
import mongoose from "mongoose";
const userApiUrl = "/api/user";

describe("/api/user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /register", () => {
    const userRegisterUrl = `${userApiUrl}/registerUser`;

    const userInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };
    it("should register a new user successfully", async () => {
      const response = await supertest(server)
        .post(userRegisterUrl)
        .send(userInfo);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.firstName).toBe("John");
      expect(response.body.lastName).toBe("Doe");
      expect(response.body.email).toBe("johndoe@gmail.com");
    });

    it("should return status 400 if the password and confirm password did not match", async () => {
      const unmatchedPassUser = { ...userInfo, password: "1234444" };
      const response = await supertest(server)
        .post(userRegisterUrl)
        .send(unmatchedPassUser);
      expect(response.status).toBe(400);
      expect(response.text).toContain(
        "Password and Confirm Password did not match"
      );
    });

    it("should return error status 409 if there is already a user with an existing email", async () => {
      const user = new User({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: await bcrypt.hash("password123", 10),
      });

      await user.save();

      const response = await supertest(server)
        .post(userRegisterUrl)
        .send(userInfo);

      expect(response.status).toBe(409);
      expect(response.text).toBe("User with this email already existed");
    });

    it("should return an error if the register values are not strings", async () => {
      const nonStringValues = {
        ...userInfo,
        firstName: 1,
        lastName: 1,
        email: 1,
        password: 1,
        confirmPassword: 1,
      };

      const response = await supertest(server)
        .post(userRegisterUrl)
        .send(nonStringValues);

      expect(response.status).toBe(400);
      expect(response.text).toContain("should be a type of string");
    });

    it("should return an error if the register values are empty", async () => {
      const registerVal = {};

      const res = await supertest(server)
        .post(userRegisterUrl)
        .send(registerVal);

      expect(res.status).toBe(400);
      expect(res.text).toContain("required field");
    });

    it("should return an error if the email is not a valid email", async () => {
      const notValidEmail = { ...userInfo, email: "not-valid" };

      const res = await supertest(server)
        .post(userRegisterUrl)
        .send(notValidEmail);

      expect(res.status).toBe(400);
      expect(res.text).toBe(`Please enter a valid email`);
    });

    it("should return an error if the password and confirm password is less than 5 character", async () => {
      const insufficientPassLength: RegisterUserData = {
        ...userInfo,
        password: "1234",
        confirmPassword: "1234",
      };

      const res = await supertest(server)
        .post(userRegisterUrl)
        .send(insufficientPassLength);

      expect(res.status).toBe(400);
      expect(res.text).toContain("atleast 5 characters");
    });
  });
});
