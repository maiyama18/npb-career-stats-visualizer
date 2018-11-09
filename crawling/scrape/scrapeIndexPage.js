const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const frame = {
  urls: {
    _s: 'a.player_unit_1',
    _d: [{
      url: '_parent_ @ href',
    }],
  },
};

const scrapeIndexPage = (html) => {
  const $ = cheerio.load(html);
  jsonframe($);

  const { urls } = $('body').scrape(frame);

  const baseUrl = 'http://npb.jp';
  return urls.map(url => `${baseUrl}${url.url}`);
};

module.exports = scrapeIndexPage;
