/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-highcharts',

  treeForVendor: function() {
    // support both flat and nested node_modules structure (npm2 vs npm3+)
    var nodeModulesDir = require.resolve('highcharts-release').split('/highcharts-release')[0];
    return this.treeGenerator(nodeModulesDir);
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    var options = app.options.emberHighCharts || {includeHighCharts: true};

    if (options.includeHighCharts || options.includeHighCharts3D) {
      app.import('vendor/highcharts-release/highcharts.src.js');
    }

    if (options.includeHighStock) {
      app.import('vendor/highstock-release/highstock.src.js');
    }

    if (options.includeHighMaps) {
      app.import('vendor/highmaps-release/highmaps.src.js');
    }

    if (options.includeHighChartsMore) {
      app.import('vendor/highcharts-release/highcharts-more.src.js');
    }

    if (options.includeHighCharts3D) {
      app.import('vendor/highcharts-release/highcharts-3d.src.js');
    }

    if (options.includeModules) {
      var modules = options.includeModules;
      for (var i = 0; i < modules.length; i++) {
        app.import('vendor/highcharts-release/modules/' + modules[i] + '.src.js');
      }
    }
  }
};
