const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:id", placesController.getPlaceById);

router.get("/user/:id", placesController.getPlaceByUser);

router.post("/", placesController.createPlace);

module.exports = router;
