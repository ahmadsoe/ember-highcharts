/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-highcharts',

  included: function(app) {
    this._super.included(app);

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
      app.import('vendor/highcharts-more-release/highcharts-more.src.js');
    }

    if (options.includeHighCharts3D){
      app.import('vendor/highcharts-3d-release/highcharts-3d.src.js');
    }
  }
};
