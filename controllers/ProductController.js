const Product = require("../models/Product");
const { parseXLSX } = require("../utils");
const slugify = require("slugify");

const ProductController = {
  async getAllProducts(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    try {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const products = await Product.findAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      const totalCount = await Product.count();
      const totalPages = Math.ceil(totalCount / pageSize);

      res.json({
        products,
        page,
        pageSize,
        totalCount,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  async getProductById(req, res) {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener producto por ID" });
    }
  },

  async createProduct(req, res) {
    const {
      title,
      description,
      sku,
      grams,
      stock,
      price,
      compare_price,
      barcode,
    } = req.body;

    const handle = slugify(title, {
      replacement: "-",
      lower: true,
    });

    try {
      const newProduct = await Product.create({
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al crear producto" });
    }
  },

  async updateProduct(req, res) {
    const productId = req.params.id;

    const {
      title,
      description,
      sku,
      grams,
      stock,
      price,
      compare_price,
      barcode,
    } = req.body;

    const handle = slugify(title, {
      replacement: "-",
      lower: true,
    });
    
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      await product.update({
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode,
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar producto" });
    }
  },

  async deleteProduct(req, res) {
    const productId = req.params.id;
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      await product.destroy();
      res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  },

  async importProductsFromFile(req, res) {
    try {
      let data = [];
      if (
        req.file.mimetype === "application/vnd.ms-excel" ||
        req.file.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        data = await parseXLSX(req.file.buffer);
      } else {
        return res
          .status(400)
          .json({ error: "Formato de archivo no compatible." });
      }
      await Product.bulkCreate(data);
      res.status(200).json({ message: "Productos importados" });
    } catch (error) {
      res.status(500).json({ error: "Error al cargar archivo." });
    }
  },
};

module.exports = ProductController;
