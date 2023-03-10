const HireModel = require("../models/hireDeveloperModel");

exports.addDeveloper = async (req, res) => {
  try {
  
    let check = await HireModel.findOne({ email: req.body.email });
    if (check) {
      return res.status(201).json({
        status: false,
        message: "This email is alredy in use!",
      });
    }
    
    const data = await HireModel.create({
      firstName: req.body.firstName ,
      lastName: req.body.lastName  ,
      email: req.body.email  ,
      phone:req.body.phone  ,
      location:req.body.location  ,
      applyAs:req.body.applyAs  ,
      workingPeriod: req.body.workingPeriod ,
      qualification :JSON.parse(req.body.qualification),
      experience :JSON.parse(req.body.experience),
      currCompanyDetail : JSON.parse(req.body.currCompanyDetail),
      images: req.files.map((obj) => obj.filename),
    });

    data.save();
    res.status(200).json({
      msg: "Data added succesfully",
      data: data,
      status: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Somthing went wrong !",
    });
    console.log(err);
  }
};

exports.getAllData = async (req, res) => {
  try {
    // console.log("user");
    let data = HireModel.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    let total = await HireModel.countDocuments();

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

exports.deketeDeveloper = async (req, res) => {
  try {
    await HireModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "data Delete Successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Somthing went wrong !",
    });
    console.log(err);
  }
};
