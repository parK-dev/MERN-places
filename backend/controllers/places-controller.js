const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const geolocate = require("../utils/geolocation");
const Place = require("../models/place");

const getPlaceById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const place = await Place.findById(id);
    res.json({ place: place.toObject({ getters: true }) });
  } catch (e) {
    return next(new HttpError("Could not find a place with this id", 404));
  }
};

const getPlacesByUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const places = await Place.find({ creator: id });
    if (!places || places.length === 0) {
      return next(new HttpError("No places associated with this user id", 404));
    }
    res.json({
      places: places.map((place) => place.toObject({ getters: true })),
    });
  } catch (e) {
    return next(new HttpError("Could not find places with this user id", 404));
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs, please check your data", 422));
  }
  try {
    const { title, description, address, creator } = req.body;
    const coordinates = await geolocate(address);
    const place = new Place({
      title,
      description,
      address,
      location: coordinates,
      image: "https://source.unsplash.com/random",
      creator,
    });
    await place.save();
    res.status(201).json({ place });
  } catch (error) {
    return next(new HttpError("Failed to save to the database", 500));
  }
};

const editPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("invalid inputs, please check your data", 422));
  }

  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const place = await Place.findById(id);
    place.title = title;
    place.description = description;
    await place.save();
    res.status(200).json({ place });
  } catch (e) {
    return next(new HttpError("Could not find a place with this id", 404));
  }
};

const deletePlace = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: "Place deleted." });
  } catch (e) {
    return next(new HttpError("Could not find a place with this id", 404));
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUser = getPlacesByUser;
exports.createPlace = createPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;
