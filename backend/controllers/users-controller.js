const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    username: "park",
    email: "k@k.com",
    password: "wellan",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = DUMMY_USERS.find((u) => u.email === email);

  if (userExists) {
    next(new HttpError("Email already in use.", 422));
  }

  const user = {
    id: uuidv4(),
    username,
    email,
    password,
  };

  DUMMY_USERS.push(user);

  res.status(201).json({ user });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((u) => u.email === email);
  if (!user || user.password !== password) {
    next(new HttpError("Wrong credentials", 401));
  }
  res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
