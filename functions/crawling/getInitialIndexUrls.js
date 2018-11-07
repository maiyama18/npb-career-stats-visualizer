const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const got = require('got');

const frameForInitialIndexUrls = {
  urls: {
    _s: '#pl_lk_unit li',
    _d: [{
      url: 'a @ href',
    }],
  },
};

const getInitialIndexUrls = async (url) => {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  jsonframe($);

  const result = $('body').scrape(frameForInitialIndexUrls);
  const urls = result.urls.filter(url => url.url).map(url => url.url);

  const baseUrl = url.replace('index.html', '');
  return urls.map(url => `${baseUrl}${url}`);
};

module.exports = getInitialIndexUrls;