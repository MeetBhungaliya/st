const jobSchema = require("../models/jobOpening");

exports.getjobs = async (req, res) => {
  try {
    // console.log("user");
    let data = jobSchema.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    let total = await jobSchema.countDocuments();

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

exports.postjob = async (req, res) => {
  
  try {

console.log(req.body.can_fresher_apply,"can_fresher_apply");

    const data = await jobSchema.create({
      job_title:req.body.job_title,
      position: req.body.position ,
      experience: req.body.experience ,
      can_fresher_apply: req.body.can_fresher_apply,
      description: JSON.parse(req.body.description),
      job_image:req.file.filename
    });
    
    data.save();
    res.status(200).json({
      msg: "Success",
      data: data,
    });

  }catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.DeleteJob = async (req, res) => {
  try {
    const data = await jobSchema.findById(req.params.id);

    await jobSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      Success: true,
      message: "Job delete successfully",
    });
  } catch (error) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

exports.UpdateJob = async (req, res) => {
  try {

    var dataNew = {

     job_title:req.body.job_title,
     position: req.body.position ,
     experience: req.body.experience ,
     can_fresher_apply: req.body.can_fresher_apply,
     description: JSON.parse(req.body.description),
     job_image:req.body.job_image
    }

    // var dataNew = req.body;
    
    if (req.file) {
      let image = req.file ? req.file.filename : null;
      dataNew.job_image = image;
    }
    
     const data = await jobSchema.findByIdAndUpdate(req.params.id, dataNew, {
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
