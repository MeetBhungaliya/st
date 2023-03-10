const express = require("express");
const { loginAdmin, insertUser } = require("../controller/adminController");
const router = express.Router();

const {insertProduct,getMyportfolio,getProduct,editProduct,deleteProduct,addCategory,editCategory,getCategory} = require("../controller/productController")
const userdocupload = require("../utils/imageUploads");

router.post("/admin/login", loginAdmin);
router.post("/admin/registration", insertUser);

// product routs 
router.get("/product", getProduct);
router.get("/thisportfolio", getMyportfolio);

router.post(
  "/product",
  userdocupload.fields([
    {
      name: "Full_image",
      maxCount: 1,
    },
    {
      name: "Display_image",
      maxCount: 1,
    },
  ]),
  insertProduct
);

router.delete("/product/:id", deleteProduct);

router.put(
  "/product/:id",
  userdocupload.fields([
    {
      name: "Full_image",
      maxCount: 1,
    },
    {
      name: "Display_image",
      maxCount: 1,
    },
  ]),
  editProduct
);

router.get("/productCategory", getCategory);
router.post("/productCategory", addCategory);
router.put("/productCategory/:id", editCategory);

module.exports = router;
