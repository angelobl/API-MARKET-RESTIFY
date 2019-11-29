var express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model");
const { ownerAuth } = require("../users/authMidleware");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post("/", async (req, res, next) => {
  try {
    const { name, price, owner } = req.body;
    await productModel.create({
      name,
      price,
      owner
    });
    res.status(200).json({ message: "Producto Agregado" });
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

router.post("/images", upload.single("product"), (req, res, next) => {
  console.log(req.file);
  res.status(200).json({ message: "Success" });
});

module.exports = router;
