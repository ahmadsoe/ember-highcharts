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

    if (options.includeHighCharts) {
      app.import(path.join(highchartsPath, 'highcharts.src.js'));
    }

    if (options.includeHighStock) {
      app.import(path.join(highchartsPath, 'highstock.src.js'));
    }

    if (options.includeHighMaps) {
      app.import(path.join(highchartsPath, 'highmaps.src.js'));
    }

    if (options.includeHighChartsMore) {
      app.import(path.join(highchartsPath, 'highcharts-more.src.js'));
    }

    if (options.includeHighCharts3D) {
      // boost module need to be imported before highcharts-3d
      if (options.includeModules) {
        var boostIndex = options.includeModules.indexOf('boost');
        if (boostIndex !== -1) {
          app.import(path.join(highchartsPath, 'modules', 'boost.src.js'));
          options.includeModules.splice(boostIndex, 1);
        }
      }

      app.import(path.join(highchartsPath, 'highcharts-3d.src.js'));
    }

    if (options.includeModules) {
      var modules = options.includeModules;
      for (var i = 0; i < modules.length; i++) {
        var moduleFilename = modules[i] + '.src.js';
        app.import(path.join(highchartsPath, 'modules', moduleFilename));
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
