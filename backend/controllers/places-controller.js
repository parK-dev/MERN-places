const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "nagoya castle",
    description: "a castle",
    imageUrl: "https://source.unsplash.com/random",
    address: "1-1 Honmaru, Naka Ward, Nagoya, Aichi 460-0031",
    location: {
      lat: 35.1847501,
      lng: 136.8996883,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "nagoya castle",
    description: "a castle",
    imageUrl: "https://source.unsplash.com/random",
    address: "1-1 Honmaru, Naka Ward, Nagoya, Aichi 460-0031",
    location: {
      lat: 35.1847501,
      lng: 136.8996883,
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const id = req.params.id;
  const place = DUMMY_PLACES.find((p) => p.id === id);
  if (!place) {
    return next(new HttpError("Could not find a place with this id", 404));
  }
  res.json({ place });
};

const getPlaceByUser = (req, res, next) => {
  const id = req.params.id;
  const place = DUMMY_PLACES.find((p) => p.creator === id);
  if (!place) {
    return next(new HttpError("Could not find a place with this user id", 404));
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const place = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(place);

  res.status(201).json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUser = getPlaceByUser;
exports.createPlace = createPlace;
