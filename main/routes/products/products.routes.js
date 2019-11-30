var express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model");
const { ownerAuth } = require("../users/authMidleware");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const path = require('path');
const fs = require('fs');

var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }])
router.post("/", cpUpload,async (req, res, next) => {
  try {
    console.log(req.files['image'][0])
    console.log(req.files['video'][0])

    const { name, price, owner } = req.body;
    /*
    const product = await productModel.create({
      name,
      price,
      owner
    });
    */
    console.log(req.body);
    res.status(200).json({ message: "Producto Agregado"});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Producto Agregado" });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: "Producto no encontrado" });
  }
});

router.put("/:id/:owner", ownerAuth, async (req, res, next) => {
  try {
    await productModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.status(200).json({ message: "Producto actualizado" });
  } catch (e) {
    res.status(500).json({ message: "Producto no encontrado" });
  }
});

router.delete("/:id/:owner", ownerAuth, async (req, res, next) => {
  try {
    await productModel.findOneAndDelete(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.status(200).json({ message: "Producto eliminado" });
  } catch (e) {
    res.status(500).json({ message: "Producto no encontrado" });
  }
});

router.post("/images", upload.single("image"), async (req, res, next) => {
  console.log(req.file);
  console.log(req.body)
  try {
    await productModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set: {image: req.file.path} }
    );
    res.status(200).json({ message: "Image uploaded" });
  } catch (e) {
    res.status(500).json({ message: "Error with upload" });
  }
});


router.get('/image/file', (req, res) => {
  const filePath = "uploads\\fa1f1d5c48e4373d59cdf82cd3e0287d"
  const obj = {
    data:fs.readFileSync(filePath),
    contentType:"image/jpeg"
  }// find out the filePath based on given fileName
  //res.sendFile(filePath,{ root: path.join(__dirname, '../../../uploads') });
  //res.json({message:"hola"})
  res.contentType('json');
  res.send(obj);
});

module.exports = router;
