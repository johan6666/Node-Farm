const fs = require('fs').promises; // Gunakan versi Promise
const url = require('url');
const replaceTemplate = require(`${__dirname}/../modules/replaceTemplate`);

const dataPath = `${__dirname}/../dev-data/data.json`;
const templatePath = `${__dirname}/../templates`;

// Helper function untuk load data dan template
const loadData = async () => {
  const data = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(data);
};

const loadTemplate = async (name) => {
  return await fs.readFile(`${templatePath}/template-${name}.html`, 'utf-8');
};

exports.getOverview = async (req, res) => {
  const dataObject = await loadData();
  const tempOverview = await loadTemplate('overview');
  const tempCard = await loadTemplate('card');

  const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
  const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(output);
};

exports.getProduct = async (req, res, query) => {
  const dataObject = await loadData();
  const tempProduct = await loadTemplate('product');

  const product = dataObject[query.id];
  const output = replaceTemplate(tempProduct, product);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(output);
};

exports.getApi = async (req, res) => {
  const data = await fs.readFile(dataPath, 'utf-8');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(data);
};

exports.notFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>Page not found!</h1>');
};
