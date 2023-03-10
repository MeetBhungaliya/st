const sendEmail = require("../utils/sendEmail");

exports.sendEmailToAdmin = async (req, res) => {
  try {
    const title = "Contact Us Email";
    // const { name, email, phoneNo, message, title } = req.body;
    sendEmail(req.body, title);
    res.status(200).json({
      success: true,
      message: "email send successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
