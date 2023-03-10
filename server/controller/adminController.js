const Admin = require("../models/adminModel");


exports.insertUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await Admin.findOne({ email: email });

    if (user) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }
    user = await Admin.create({
      name,
      email,
      password,
    });
    // console.log(user);
    token = user.getJWTToken();
    // console.log(token)
    user.token = token;
    await user.save();
    res.status(200).json({
      success: true,
      message: "user register successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        message: "please Enter Email & Password",
      });
    }
    const user = await Admin.findOne({ email }).select("+password");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(200).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    token = user.getJWTToken();
    user.token = token;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login Successfully...",
      data: user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
