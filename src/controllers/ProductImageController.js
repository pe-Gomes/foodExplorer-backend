const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ProductImageController {
  async update(req, res) {
    const { id: product_id } = req.params;
    const imgName = req.file.filename;

    const diskStorage = new DiskStorage();

    const product = await knex("products").where("id", product_id).first();

    if (!product) {
      throw new AppError("Somente produtos cadastrados podem atualizar a imagem.");
    }

    if (product.image) {
      await diskStorage.deleteFile(product.image);
    }

    const fileName = await diskStorage.saveFile(imgName);
    product.image = fileName;

    await knex("products").update(product).where("id", product_id);

    return res.json(product);
  }

  async create(req, res) {
    const imgName = req.file.filename;
    const diskStorage = new DiskStorage();
    
    const fileName = await diskStorage.saveFile(imgName);

    return res.json({image: fileName})
  }
}

module.exports = ProductImageController;