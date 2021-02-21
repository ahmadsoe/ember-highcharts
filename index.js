'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');
const validatePeerDependencies = require('validate-peer-dependencies');

module.exports = {
  name: 'ember-highcharts',

  init() {
    this._super.init.apply(this, arguments);

    validatePeerDependencies(__dirname, {
      resolvePeerDependenciesFrom: this.parent.root,
    });
  },

  included(app) {
    this._super.included.apply(this, arguments);

    // The app argument passed to included is the host app or parent addon.
    // And the addon has a `import` api exposed since ember-cli/ember-cli#5877.
    // If the `app.import` is available we can just use that.
    if (typeof app.import !== 'function') {
      // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
      // use that.
      if (typeof this._findHost === 'function') {
        app = this._findHost();
      } else {
        // Otherwise, we'll use this implementation borrowed from the _findHost()
        // method in ember-cli.
        let current = this;
        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
      }
    }

    const options = app.options.emberHighCharts || { includeHighCharts: true };
    const highchartsPath = options.useStyledMode ? 'vendor/highcharts/js' : 'vendor/highcharts';

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
        const boostIndex = options.includeModules.indexOf('boost');
        if (boostIndex !== -1) {
          app.import(path.join(highchartsPath, 'modules', 'boost.src.js'));
          options.includeModules.splice(boostIndex, 1);
        }
      }

      app.import(path.join(highchartsPath, 'highcharts-3d.src.js'));
    }

    if (options.includeModules) {
      const modules = options.includeModules;
      for (let i = 0; i < modules.length; i++) {
        const moduleFilename = `${modules[i]}.src.js`;
        app.import(path.join(highchartsPath, 'modules', moduleFilename));
      }
    }
  },

  treeForVendor(vendorTree) {
    const trees = [];
    // eslint-disable-next-line node/no-unpublished-require
    const highchartsPath = path.dirname(require.resolve('highcharts'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(highchartsPath, {
      destDir: 'highcharts'
    }));

    return mergeTrees(trees);
  }
};
