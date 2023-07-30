import mongoose from "mongoose";

const userScheema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    unique: true,
    select: false,
  },
});
export const User = mongoose.model("User", userScheema);
