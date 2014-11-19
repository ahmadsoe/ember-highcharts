'use strict';

module.exports = {
  name: 'ember-highcharts',

  included: function(app) {
      this._super.included(app);

      app.import(app.bowerDirectory + '/highcharts-release/highcharts.js');
    }
};