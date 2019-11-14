if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server.js');
const data = require('./data.json');

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8');
const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data);
  return template
    .replace('<!--HTML_PLATEHOLD-->', str)
    .replace('<!--INITIAL_DATA_PLATEHOLD-->', `<script>window.__initial_data=${dataStr}</script>`);
};

const server = (port) => {
  const app = express();

  app
    .use(express.static('dist'))
    .get('/search', (req, res) => {
      const html = renderMarkup(renderToString(SSR));

      res
        .status(200)
        .send(html);
    })
    .listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
};

server(process.env.PORT || 3000);
