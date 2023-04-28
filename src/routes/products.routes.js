const { Router } = require("express");
const ensureAuth = require("../middlewares/ensureAuth");
const ensureSudo = require("../middlewares/ensureSudo");

const ProductsController = require("../controllers/ProductsController");

const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.use(ensureAuth);

productsRoutes.post("/", ensureSudo, productsController.create);
productsRoutes.put("/:id", ensureSudo, productsController.update);
productsRoutes.delete("/:id", ensureSudo, productsController.delete);
productsRoutes.get("/:id", productsController.show);
productsRoutes.get("/", productsController.index);

module.exports = productsRoutes;