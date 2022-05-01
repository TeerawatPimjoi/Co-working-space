const Coworkingspace = require("../models/Coworkingspace");

exports.getcoworkingspaces = async (req, res, next) => {
  try {
    const coworkingspace = await Coworkingspace.find();
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
    const coworkingspace = await Coworkingspace.findByIdAndDelete(
      req.params.id
    );
    if (!coworkingspace) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
