const { Router } = require("express");
const { check } = require("express-validator");

const placesController = require("../controllers/places-controller");

const router = Router();

router.get("/:id", placesController.getPlacesById);

router.get("/user/:id", placesController.getPlacesByUser);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  "/:id",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.editPlace
);

router.delete("/:id", placesController.deletePlace);

module.exports = router;
