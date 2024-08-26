import mongoose, { Document, Schema } from "mongoose";

const DB_URL = process.env.DB_URL as string;

interface ICommunity extends Document {
  posts: Schema.Types.ObjectId[];
  creator: Schema.Types.ObjectId;
  name: string;
  description: string;
}

const communitySchema: Schema<ICommunity> = new Schema({
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
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Community = mongoose.model<ICommunity>("Community", communitySchema);

export default Community;
