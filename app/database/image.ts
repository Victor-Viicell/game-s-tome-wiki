import mongoose from "mongoose";

export const image = new mongoose.Schema({
  description: String,
  image: {
    data: Buffer,
    contentType: String}
})