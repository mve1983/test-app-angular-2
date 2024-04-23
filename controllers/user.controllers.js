import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  const userExists2 = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("User existiert bereits!");
  }

  if (userExists2) {
    res.status(400);
    throw new Error("Username bereits vergeben!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Unbekannte E-Mail oder Passwort");
  }
});

export { registerUser, authUser };