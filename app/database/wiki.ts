import mongoose from "mongoose";

export const wiki = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  lastUpdate: Date,
  firstUpdate: Date,
  wikiBlocks: Array,
})