import mongoose, { Document, Schema } from "mongoose";

const DB_URL = process.env.DB_URL as string;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the datebase - User"))
  .catch((err) => console.log(`Error on User, ${err}`));

interface IUser extends Document {
  firstName: string;
  lastName: string;
  pfp: string;
  username: string;
  password: string;
  bio: string;
  email: string;

  //NOTE: Add socials here

  followers?: number;
  following?: number;
  posts?: string[];
}

const userSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
    default:
      "https://res.cloudinary.com/doggodoggo228/image/upload/v1719548694/account_iu1nvc.png",
  },

  bio: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
