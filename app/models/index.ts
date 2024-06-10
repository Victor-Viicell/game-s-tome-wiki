import mongoose from "mongoose";
import { userSchema } from "./user";

export const User = mongoose.models.User || mongoose.model('User', userSchema);
