import mongoose from "mongoose";

export const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  wikis: Array,
})