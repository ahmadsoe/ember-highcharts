/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-highcharts',

  included: function(app) {
    this._super.included(app);

    // We expect the user to add the package he needs
    //app.import(app.bowerDirectory + '/highcharts-release/highcharts.js');
  }
};
