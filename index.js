/* jshint node: true */
'use strict';

var path = require('path');
var BroccoliMergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-highcharts',

  treeForVendor: function() {
    var highChartsTree = this.treeGenerator(path.dirname(require.resolve('highcharts-release/highcharts.js')));
    var highMapsTree = this.treeGenerator(path.dirname(require.resolve('highmaps-release/highmaps.js')));
    var highStockTree = this.treeGenerator(path.dirname(require.resolve('highstock-release/highstock.js')));
    var highChartsMoreTree = this.treeGenerator(path.dirname(require.resolve('highcharts-release/highcharts-more.src.js')));
    var highCharts3DTree = this.treeGenerator(path.dirname(require.resolve('highcharts-release/highcharts-3d.src.js')));

    var trees = new BroccoliMergeTrees([highChartsTree, highMapsTree, highStockTree, highChartsMoreTree, highCharts3DTree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
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