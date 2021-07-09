const axios = require("axios");

const HttpError = require("../models/http-error");

const key = process.env.MAP;

const geolocate = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
  const response = await axios.get(url);
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    next(
      new HttpError(
        "Could not find the coordinates of the provided location",
        404
      )
    );
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = geolocate;
