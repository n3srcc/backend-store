const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticated } = require('../middleware/Authenticated');
const ProductController = require('../controllers/ProductController');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', authenticated, ProductController.createProduct);
router.put('/:id', authenticated, ProductController.updateProduct);
router.delete('/:id', authenticated, ProductController.deleteProduct);
router.post('/import', authenticated, upload.single('file'), ProductController.importProductsFromFile);

module.exports = router;