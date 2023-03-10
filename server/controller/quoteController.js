const quoteSchema = require("../models/quote");


// get
exports.getquotepost = async (req, res) => {
  try {

    let data =  quoteSchema.find({});
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    let total = await quoteSchema.countDocuments();

    const totalPages = Math.ceil(total / pageSize);
    data =  data.skip(skip).limit(pageSize);
    if (page > totalPages) {
      return res.status(200).json({
        // status: "failed",
        massage: "No data found",
      });
    }

    const result = await data;

    res.status(200).json({
      msg: "Success",
      page,
      totalPages,
      data: result,
    });
  } catch (err) {
    res.status(400).json({ msg: "Somthing went wrong !" });
    console.log(err);
  }
};

// post
exports.postquotes = async (req, res) => {

  try {

    let check = await quoteSchema.findOne({ email: req.body.email });
    if (check) {
      return res.status(201).json({
        status: false,
        message: "This email is alredy in use!",
      });
    }

    await quoteSchema.create({

      first_name:req.body.first_name ,
      last_name:req.body.last_name,
      email:req.body.email ,
      mobile_number:req.body.mobile_number,
      budget:req.body.budget,
      when_to_start:req.body.when_to_start,
      service:JSON.parse(req.body.service),
      requirement:JSON.parse(req.body.requirement),
      description: req.body.project_description,
      files: req.files.map((obj) => obj.filename),
    
    });

    res.status(200).json({
      status: true,
      msg: "Success",
    });
  } catch (err) {
    res.status(400).json({ msg: "Somthing went wrong !" });
  }
};

// delete 
exports.deletequotes = async (req, res) => {
  try {
    await quoteSchema.findByIdAndDelete(req.params.id);
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
