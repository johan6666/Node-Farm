const http = require('http');
const url = require('url');
const route = require('./routes/route');

const server = http.createServer((req, res) => {
  route(req, res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
