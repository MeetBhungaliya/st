const ProjectImage = require("../models/projectImage");
const fs = require("fs");

exports.insertImage = async (req, res) => {
  try {
    const data = await ProjectImage.find({});
    if (data.length > 0) {
      res.status(200).json({ msg: "Data already exist" });
    } else {
      const data = await ProjectImage.create({
        files: req.files.map((obj) => obj.filename),
      });
      res.status(200).json({
        msg: "Success",
        data: data,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.getImages = async (req, res) => {
  try {
    const data = await ProjectImage.find({});
    res.status(200).json({
      msg: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const data = await ProjectImage.find({});
    const image = data[0].files.filter((data) => data !== req.body.fileName);
    data[0].files = image;
    data[0].save();
    fs.unlink("./uploads/" + req.body.fileName, function (err) {
      if (err && err.code == "ENOENT") {
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });
    res.status(200).json({
      msg: "delete successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const data = await ProjectImage.find({});
    if (!data) {
      res.status(400).json({ msg: "Somthing went wrong !" });
    } else {
      data[0].files = data[0].files.concat(
        req.files.map((obj) => obj.filename)
      );
      data[0].save();
      res.status(200).json({
        msg: "updates successfully",
        data: dataNew,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};