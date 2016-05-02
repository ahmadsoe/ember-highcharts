/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    emberHighCharts: {
      includeHighCharts: false,
      includeHighStock: true,
      includeHighChartsMore: true,
      includeModules: [
        'map',
        'drilldown',
        'solid-gauge'
      ]
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import('bower_components/bootstrap/dist/css/bootstrap.css');

  return app.toTree();
};
