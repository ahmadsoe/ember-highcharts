'use strict';

let Funnel = require('broccoli-funnel');
let mergeTrees = require('broccoli-merge-trees');
let path = require('path');

module.exports = {
  name: 'ember-highcharts',
  options: {
    nodeAssets: {
      deepmerge: {
        vendor: {
          srcDir: 'dist',
          include: ['umd.js']
        }
      }
    }
  },

  included(app) {
    this._super.included.apply(this, arguments);

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

    let options = app.options.emberHighCharts || { includeHighCharts: true };
    let highchartsPath = options.useStyledMode ? 'vendor/highcharts/js' : 'vendor/highcharts';

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
        let boostIndex = options.includeModules.indexOf('boost');
        if (boostIndex !== -1) {
          app.import(path.join(highchartsPath, 'modules', 'boost.src.js'));
          options.includeModules.splice(boostIndex, 1);
        }
      }

      app.import(path.join(highchartsPath, 'highcharts-3d.src.js'));
    }

    if (options.includeModules) {
      let modules = options.includeModules;
      for (let i = 0; i < modules.length; i++) {
        let moduleFilename = `${modules[i]}.src.js`;
        app.import(path.join(highchartsPath, 'modules', moduleFilename));
      }
    }

    app.import('vendor/deepmerge/umd.js');
    app.import('vendor/shims/deepmerge.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];
    let highchartsPath = path.dirname(require.resolve('highcharts'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(highchartsPath, {
      destDir: 'highcharts'
    }));

    return mergeTrees(trees);
  }
};
