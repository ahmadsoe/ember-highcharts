/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-highcharts',

  included: function(app) {
    this._super.included.apply(this, arguments);

    var options = app.options.emberHighCharts || { includeHighCharts: true };

    if (options.includeHighCharts || options.includeHighCharts3D) {
      app.import(app.bowerDirectory + '/highcharts/highcharts.src.js');
    }

    if (options.includeHighStock) {
      app.import(app.bowerDirectory + '/highcharts/highstock.src.js');
    }

    if (options.includeHighMaps) {
      app.import(app.bowerDirectory + '/highcharts/highmaps.src.js');
    }

    if (options.includeHighChartsMore) {
      app.import(app.bowerDirectory + '/highcharts/highcharts-more.src.js');
    }

    if (options.includeHighCharts3D) {
      app.import(app.bowerDirectory + '/highcharts/highcharts-3d.src.js');
    }

    if (options.includeModules) {
      var modules = options.includeModules;
      for (var i = 0; i < modules.length; i++) {
        app.import(app.bowerDirectory + '/highcharts/modules/' + modules[i] + '.src.js');
      }
    }
  }
};
