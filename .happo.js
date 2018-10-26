const path = require('path');
const { RemoteBrowserTarget } = require('happo.io');

module.exports = {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,
  targets: {
    'edge': new RemoteBrowserTarget('edge', {
      viewport: '400x400',
    }),
    'ie': new RemoteBrowserTarget('internet explorer', {
      viewport: '400x400',
    }),
    'chrome': new RemoteBrowserTarget('chrome', {
      viewport: '400x400',
    }),
    'safari': new RemoteBrowserTarget('safari', {
      viewport: '400x400',
    }),
    'firefox': new RemoteBrowserTarget('firefox', {
      viewport: '400x400',
    }),
  },
};

