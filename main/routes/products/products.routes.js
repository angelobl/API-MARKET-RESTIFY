var express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model");
const { ownerAuth } = require("../users/authMidleware");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");

var cpUpload = upload.fields([
  { name: "image", maxCount: 1 }
]);
router.post("/", cpUpload, async (req, res, next) => {
  try {
    console.log(req.files["image"][0]);

    const { name, price, owner } = req.body;

    const product = await productModel.create({
      name,
      price,
      owner,
      image: {
        data: fs.readFileSync(req.files["image"][0].path),
        contentType: req.files["image"][0].mimetype
      }
    });

    console.log(product);
    res.status(200).json({ message: "Product Added" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error adding product" });
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

router.put("/", cpUpload, async (req, res, next) => {
  try {
    const product = await productModel.findOne({ _id: req.body.id });
    if (product.owner !== req.body.owner) {
      res.status(500).json({ message: "Usuario no es owner" });
    } else {
      if (!req.files["image"]) {
        await productModel.findOneAndUpdate(
          { _id: req.body.id },
          {
            $set: {
              name: req.body.name,
              price: req.body.price
            }
          },
          { useFindAndModify: false }
        );
        console.log("video no existe");
        res.status(200).json({ message: "Producto actualizado" });
      } else {
        await productModel.findOneAndUpdate(
          { _id: req.body.id },
          {
            $set: {
              name: req.body.name,
              price: req.body.price,
              image: {
                data: fs.readFileSync(req.files["image"][0].path),
                contentType: req.files["image"][0].mimetype
              }
            }
          },
          { useFindAndModify: false }
        );
        res.status(200).json({ message: "Producto actualizado" });
      }
    }
  } catch (e) {
    console.log(e);
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

module.exports = router;
