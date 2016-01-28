/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-highcharts',

  included: function(target) {
    this._super.included.apply(this, arguments);

    var app = target.app || target;
    var options = app.options.emberHighCharts || { includeHighCharts: true };
    var highchartsPath = 'vendor/highcharts';

    if (options.includeHighCharts || options.includeHighCharts3D) {
      app.import(highchartsPath + '/highcharts.src.js');
    }

    if (options.includeHighStock) {
      app.import(highchartsPath + '/highstock.src.js');
    }

    if (options.includeHighMaps) {
      app.import(highchartsPath + '/highmaps.src.js');
    }

    if (options.includeHighChartsMore) {
      app.import(highchartsPath + '/highcharts/highcharts-more.src.js');
    }

    if (options.includeHighCharts3D) {
      app.import(highchartsPath + '/highcharts/highcharts-3d.src.js');
    }

    if (options.includeModules) {
      var modules = options.includeModules;
      for (var i = 0; i < modules.length; i++) {
        app.import(highchartsPath + '/modules/' + modules[i] + '.src.js');
      }
    }
  },

  treeForVendor: function(vendorTree) {
    var trees = [];
    var highchartsPath = path.dirname(require.resolve('highcharts'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(highchartsPath, {
      destDir: 'highcharts'
    }));

    return mergeTrees(trees);
  }
};
