const express = require("express");
const {
  getcoworkingspaces,
  getcoworkingspace,
  createcoworkingspace,
  updatecoworkingspace,
  deletecoworkingspace
} = require("../controllers/coworkingspaces");

//include other resource routers
const reservationRouter = require("./reservations");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.use("/:coworkingspaceId/reservations", reservationRouter);
router
  .route("/")
  .get(getcoworkingspaces)
  .post(protect, authorize("admin"), createcoworkingspace);
router
  .route("/:id")
  .get(getcoworkingspace)
  .put(protect, authorize("admin"), updatecoworkingspace)
  .delete(protect, authorize("admin"), deletecoworkingspace);

module.exports = router;
