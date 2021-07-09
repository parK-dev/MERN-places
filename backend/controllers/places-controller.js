const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
let DUMMY_PLACES = [
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

const getPlacesById = (req, res, next) => {
  const id = req.params.id;
  const places = DUMMY_PLACES.filter((p) => p.id === id);
  if (!places || places.length === 0) {
    return next(new HttpError("Could not find places with this id", 404));
  }
  res.json({ places });
};

const getPlacesByUser = (req, res, next) => {
  const id = req.params.id;
  const places = DUMMY_PLACES.filter((p) => p.creator === id);
  if (!places || places.length === 0) {
    return next(new HttpError("Could not find places with this user id", 404));
  }
  res.json({ places });
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

const editPlace = (req, res, next) => {
  const { title, description } = req.body;
  id = req.params.id;

  const place = { ...DUMMY_PLACES.find((p) => p.id === id) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === id);
  place.title = title;
  place.description = description;

  DUMMY_PLACES[placeIndex] = place;

  res.status(200).json({ place });
};

const deletePlace = (req, res, next) => {
  const id = req.params.id;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== id);
  res.status(200).json({ message: "Place deleted." });
};

exports.getPlacesById = getPlacesById;
exports.getPlacesByUser = getPlacesByUser;
exports.createPlace = createPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;