const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const frame = {
  urls: {
    _s: '#pl_lk_unit li',
    _d: [{
      url: 'a @ href',
    }],
  },
};

const scrapeTopPage = (html, topUrl) => {
  const $ = cheerio.load(html);
  jsonframe($);

  const { urls } = $('body').scrape(frame);

  const baseUrl = topUrl.replace('index.html', '');
  return urls.filter(url => url.url).map(url => `${baseUrl}${url.url}`);
};

module.exports = scrapeTopPage;