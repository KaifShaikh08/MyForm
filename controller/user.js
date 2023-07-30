import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookie.js";
import errorHandler from "../middleware/errorMiddleware.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new errorHandler("User already exist", 403));

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new errorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new errorHandler("Invalid Email or Password", 404));

    sendCookie(user, res, "Login Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = (req, res, next) => {
  res.json({
    success: true,
    message: req.user,
  });
};

export const logout = (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "Logout Successfully",
      sameSite: process.env.MODE === "Development" ? "lax" : "none",
      secure: process.env.MODE === "Development" ? false : true,
    });
};
