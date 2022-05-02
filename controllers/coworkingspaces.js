const Coworkingspace = require("../models/Coworkingspace");

exports.getcoworkingspaces = async (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  let query = Coworkingspace.find(JSON.parse(queryStr)).populate(
    "reservations"
  );
  try {
    const coworkingspace = await query;
    res.status(200).json({
      success: true,
      count: coworkingspace.length,
      data: coworkingspace
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.getcoworkingspace = async (req, res, next) => {
  try {
    const coworkingspace = await Coworkingspace.findById(req.params.id);
    if (!coworkingspace) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: coworkingspace });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.createcoworkingspace = async (req, res, next) => {
  try {
    console.log(req.body);
    const coworkingspace = await Coworkingspace.create(req.body);
    res.status(201).json({ success: true, data: coworkingspace });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.updatecoworkingspace = async (req, res, next) => {
  try {
    const coworkingspace = await Coworkingspace.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!coworkingspace) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: coworkingspace });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.deletecoworkingspace = async (req, res, next) => {
  try {
    const coworkingspace = await Coworkingspace.findById(req.params.id);
    if (!coworkingspace)
      return res
        .status(404)
        .json({
          success: false,
          message: `Co-working space is not found with id ${req.params.id}`
        });
    coworkingspace.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
