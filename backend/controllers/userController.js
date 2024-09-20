import { users } from "../data.js";

//@desc Creates new user
//@route POST/api/users
//@access PUBLIC
const createUser = async (req, res) => {
  res.send("Create new user route");
};

//@desc gets the list of users
//@route GET/api/users
//@access PUBLIC
const getUsers = async (req, res) => {
  res.send("get users route");
};

//@desc gets the details of single user
//@route GET/api/users/:id
//@access PUBLIC
const getSingleUser = async (req, res) => {
  res.send("get single user route");
};

//@desc sends otp to the provided mobile number
//@route POST/api/users/:id/send-otp
//@desc PUBLIC
const sendOtp = (req, res) => {
  res.send("send otp route");
};

export { getUsers, getSingleUser, sendOtp, createUser };
