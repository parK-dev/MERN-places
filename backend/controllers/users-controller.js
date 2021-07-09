const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    username: "park",
    email: "k@k.com",
    password: "wellan",
  },
];

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
  } catch (error) {}
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs, please check your data", 422));
  }

  try {
    const { username, email, password, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    existingUser &&
      next(new HttpError("This user already exists, please login.", 500));

    const user = new User({
      username,
      email,
      password,
      avatar: "https://source.unsplash.com/random",
    });
    await user.save();
    res.status(201).json({ user: user.toObject({ getters: true }) });
  } catch (e) {
    return next(
      new HttpError("Failed to sign up. Please try again later.", 500)
    );
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return next(new HttpError("Wrong credentials.", 500));
    }
    res.json({ message: "logged in" });
  } catch (e) {}
  next(new HttpError("Wrong credentials.", 500));
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
