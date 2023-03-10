const product = require("../models/ProductModel");
const Category = require("../models/productcategoryModel");
const fs = require("fs");


exports.getProduct = async (req, res) => {
  try {
    let data = product.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    let total = await product.countDocuments();

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
      message: "product listing successfully....",
      page,
      totalPages,
      data: result,
    });
  } catch (error) {
    res.send("error");
  }
};

exports.insertProduct = async (req, res) => {

  try {
    const data = await product.create({
      category: req.body.category,
      Full_image: req.files.Full_image.map((e) => e.filename),
      Display_image: req.files.Display_image.map((e) => e.filename),
    });

    data.save();
    res.status(200).json({
      msg: "Success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Somthing went wrong !" });
  }

};

exports.editProduct = async (req, res) => {

  console.log(" ------- update image --------- ");

  try {
    const data = {
      category: req.body.category,
      Full_image: req.body.Full_image,
      Display_image: req.body.Display_image,
    };

    // console.log(req.files,"req.files ");
    const check = await product.findById(req.params.id);

    if (req.files.Full_image) {
      
      let image = req.files.Full_image
        ? req.files.Full_image.map((e) => e.filename)
        : null;
      data.Full_image = image;
      fs.unlinkSync("./uploads/" + check.Full_image.map(e=>e))
    }

    if (req.files.Display_image) {
      let image = req.files.Display_image
        ? req.files.Display_image.map((e) => e.filename)
        : null;
      data.Display_image = image;
      fs.unlinkSync("./uploads/" + check.Display_image.map(e=>e))
    }

    const newdata = await product.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });

    res.status(200).json({
      msg: "Success",
      data: newdata,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.deleteProduct = async (req, res) => {


  try {

const data = await product.findById(req.params.id);

fs.unlinkSync("./uploads/" + data.Full_image.map(e=>e))
fs.unlinkSync("./uploads/" + data.Display_image.map(e=>e))

    await product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      Success: true,
      message: "protfolio delete successfully",
    });

  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.getMyportfolio = async (req, res) => {
  try {
    const searchQuery = req.query.protfolioname;

    const name = new RegExp(searchQuery, "i"); //this is for we serch meet or Meet or MEET all are same

    var data;

    if (searchQuery !== "undefined") {
      data = product.find({ category: name });
    } else {
      data = product.find({});
    }

    const result = await data;
    res.status(200).send({
      success: true,
      message: "product listing successfully....",
      // page,
      // totalPages,
      data: result,
    });
  } catch (error) {
    res.send("error");
  }
};

// product categorys

exports.getCategory = async (req, res) => {
  try {
    let data = Category.find();
    const result = await data;

    res.status(200).send({
      success: true,
      message: "category listing successfully....",
      data: result,
    });
  } catch (error) {
    res.send("error");
  }
};

exports.addCategory = async (req, res) => {
  try {
    const data = await Category.create({
      Productcategory: req.body,
    });

    data.save();
    res.status(200).json({
      msg: "Success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.editCategory = async (req, res) => {
  try {
    var dataNew = {
      Productcategory: req.body,
    };

    // console.log(dataNew, "dataNew");

    const data = await Category.findByIdAndUpdate(req.params.id, dataNew, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });

    res.status(200).json({
      Success: true,
      message: "Job update successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};
