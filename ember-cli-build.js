'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    emberHighCharts: {
      includeHighCharts: false,
      includeHighStock: true,
      useStyledMode: false,
      includeHighChartsMore: true,
      includeHighCharts3D: true,
      includeModules: [
        'boost',
        'map',
        'drilldown',
        'solid-gauge',
        'funnel',
        'heatmap'
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
