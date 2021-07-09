const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:id", placesController.getPlacesById);

router.get("/user/:id", placesController.getPlacesByUser);

router.post("/", placesController.createPlace);

router.patch("/:id", placesController.editPlace);

router.delete("/:id", placesController.deletePlace);

module.exports = router;
