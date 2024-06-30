import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY as string;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME as string;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET as string;

const cloudinaryConfig: ConfigOptions = {
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "plated_pal",
    allowed_formats: ["jpeg", "jpg", "png"],
  } as any,
});

export { storage, cloudinary };
