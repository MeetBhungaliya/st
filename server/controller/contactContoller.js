const contactModel = require("../models/contactUs");

exports.postcontact = async (req, res) => {
  try {
    await contactModel.create(req.body);
    res.status(200).json({
      msg: "Success",
      data: req.body,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Somthing went wrong !",
    });
    console.log(err);
  }
};

exports.getAllContact = async (req, res) => {
  try {
    // console.log("user");
    let data = contactModel.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    let total = await contactModel.countDocuments();

    const totalPages = Math.ceil(total / pageSize);
    data = data.skip(skip).limit(pageSize);
    if (page > totalPages) {
      return res.status(200).json({
        // status: "failed",
        massage: "No data found",
      });
    }
    const result = await data;
    res.status(200).send({
      success: true,
      message: "Transaction listing successfully....",
      page,
      totalPages,
      data: result,
    });
  } catch (error) {
    res.send("error");
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "contact deleted successfully",
    });
  } catch (error) {}
};
