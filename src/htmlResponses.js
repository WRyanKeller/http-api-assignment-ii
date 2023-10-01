const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getMedia = (request, response, type, body) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(body);
  response.end();
};

const getIndex = (request, response) => {
  getMedia(request, response, 'text/html', index);
};

const getCSS = (request, response) => {
  getMedia(request, response, 'text/css', css);
};

module.exports = {
  getIndex,
  getCSS,
};