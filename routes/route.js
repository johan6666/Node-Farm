const url = require('url');
const productController = require('../controllers/productController');

module.exports = async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    await productController.getOverview(req, res);
  } else if (pathname === '/product') {
    await productController.getProduct(req, res, query);
  } else if (pathname === '/api') {
    await productController.getApi(req, res);
  } else {
    productController.notFound(req, res);
  }
};
