const fs = require('fs'); // panggil fils system
const url = require('url'); // untuk pemanggilan url di nodejs

const replaceTemplate = require(`${__dirname}/../modules/replaceTemplate`); //ambil templatenya
// console.log('Modules loaded:', fs, url, replaceTemplate);
// panggil data dulu 
const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data); // convert to jason agar bisa di olah oleh js

// ambil templatenya dimana letak dirrktorinya 
const tempOverview = fs.readFileSync(`${__dirname}/../templates/template-overview.html`,
  'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/../templates/template-card.html`,
  'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/../templates/template-product.html`,
  'utf-8')


// lalu bikin routenya 
module.exports = (req, res) => {
    const  {query , pathname}  = url.parse(req.url, true)

    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
             'Content-type' : 'text/html'
        })

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    } else if (pathname === '/product'){
        res.writeHead(200, {
            'Content-type' : 'text/html'
        })

        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)
    } else if(pathname === '/api'){
        res.writeHead(200, {
            'Content-type' : 'text/html'
        })
        res.end(data)
    } else {
        res.writeHead(404, { 'Content-type': 'text/html', 'my-own-header': 'hello-world' });
        res.end('<h1>Page not found!</h1>');
    }
  
}


