const Reservation = require("../models/Reservation");
const Coworkingspace = require("../models/Coworkingspace");
//@desc Get all reservations
//@route Get /api/v1/reservations
//@access Public
exports.getReservations = async (req, res, next) => {
  let query;

  //General users can see only their reservations!
  if (req.user.role !== "admin" && !req.params.coworkingspaceId) {
    query = Reservation.find({ user: req.user.id }).populate({
      path: "coworkingspace",
      select: "name address tel openclosetime"
    });
  } else {
    //If you are an admin, you can see all!
    if (req.params.coworkingspaceId) {
      console.log(req.params.coworkingspaceId);
      query = Reservation.find({
        coworkingspace: req.params.coworkingspaceId
      }).populate({
        path: "coworkingspace",
        select: "name address tel openclosetime"
      });
    } else {
      query = Reservation.find().populate({
        path: "coworkingspace",
        select: "name address tel openclosetime"
      });
    }
  }
  try {
    const reservations = await query;
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Reservation" });
  }
};
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "coworkingspace",
      select: "name address tel openclosetime"
    });
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`
      });
    }
    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find reservation" });
  }
};
// //desc Add reservation
// //route Post /api/v1/coworkingspaces/:coworkingspaceId/reservation
// //access private
exports.addReservation = async (req, res, next) => {
  try {
    req.body.coworkingspace = req.params.coworkingspaceId;
    const coworkingspace = await Coworkingspace.findById(
      req.params.coworkingspaceId
    );
    if (!coworkingspace) {
      return res.status(404).json({
        success: false,
        message: `No coworkingspace with the  id of ${req.params.coworkingspaceId}`
      });
    }
    console.log(req.body);
    //add user id  to req.body
    req.body.user = req.user.id;
    //check for existed reservation
    const existedReservation = await Reservation.find({ user: req.user.id });
    //
    if (existedReservation.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with the Id  ${req.user.id} has already made 3 reservations`
      });
    }

    const reservation = await Reservation.create(req.body);
    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create reservation" });
  }
};
// //desc Update reservation
// //route put /api/v1/reservations/:id
// //access private
exports.updateReservation = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    console.log(reservation);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`
      });
    }
    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User with   ${req.user.id} is not authorized to update this reservation`
      });
    }
    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update reservation" });
  }
};
// //desc delete reservation
// //route /api/v1/reservation/:id
// //access private
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`
      });
    }
    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: `User with   ${req.user.id} is not authorized to delete this reservation`
      });
    }
    await reservation.remove();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete reservation" });
  }
};
