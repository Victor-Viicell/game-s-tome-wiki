import mongoose from "mongoose";
export const wikiBlock = new mongoose.Schema({
  title: String,
  content: String,
  images: Array,
  lastUpdate: Date,
})