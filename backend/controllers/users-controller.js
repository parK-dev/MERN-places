const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    return next(new HttpError("Fetching user failed. Please try again.", 500));
  }
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs, please check your data", 422));
  }

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    existingUser &&
      next(new HttpError("This user already exists, please login.", 500));

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      avatar: req.file.path,
      places: [],
    });

    await user.save();

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TK,
      { expiresIn: "1h" }
    );
    res.status(201).json({ userId: user.id, email: user.email, token });
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

    if (!user) {
      return next(new HttpError("Wrong credentials.", 403));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(new HttpError("Wrong credentials.", 403));
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TK,
      { expiresIn: "1h" }
    );
    res.json({ userId: user.id, email: user.email, token });
  } catch (e) {
    return next(new HttpError("Server Error", 500));
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
