import mongoose, { Document, Schema } from "mongoose";

const DB_URL = process.env.DB_URL as string;

interface ICommunity extends Document {
  banned: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
  creator: Schema.Types.ObjectId;
  members: Schema.Types.ObjectId[];
  name: string;
  description: string;
  logo: string;
}

const communitySchema: Schema<ICommunity> = new Schema(
  {
    banned: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    logo: {
      type: String,
      default:
        "https://st.depositphotos.com/46079520/55116/v/450/depositphotos_551162246-stock-illustration-ecf-letter-logo-design-white.jpg",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model<ICommunity>("Community", communitySchema);

export default Community;
