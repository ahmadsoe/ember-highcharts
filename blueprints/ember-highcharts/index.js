/* eslint-env node */

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackageToProject('highcharts');
  }
};
