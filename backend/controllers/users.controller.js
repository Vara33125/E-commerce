import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import usersModel from "../models/users.model.js";

export const signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await usersModel.create({
      ...req.body,
      password: hash,
    });
    res.status(201).json({ message: "user created", user });
  } catch (error) {
    next(error);
  }
};

export const sign = async (req, res, next) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("user not found!");
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) return res.status(400).json("Wrong Credentials!");
    const token = jwt.sign({ id: user._id }, env.token, { expiresIn: "24h" });
    const { password, ...others } = user._doc;
    res
      .cookie("acces_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserbyID = async (req, res) => {
  try {
    const userId = await usersModel.findById(req.params.id);
    res.status(200).json(userId);
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req, res) => {
  checkId(req, res);
  try {
    const userDelete = await usersModel.findByIdAndDelete(req.params.id);
    if (!userDelete) return res.status(404).json("User not found");
    res.status(200).json(userDelete);
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req, res) => {
  checkId(req, res);
  try {
    const user = await usersModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(404).json("User not found");
    res.status(200).json({
      message: `${req.body.prenom} has been updated successfully!`,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const checkId = (req, res) => {
  const lengthId = req.params.id.length;
  if (lengthId > 24 || lengthId < 24)
    return res.status(404).json("User not found !");
};
