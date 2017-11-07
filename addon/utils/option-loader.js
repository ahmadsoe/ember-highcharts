/* global Highcharts */
let localConfig = null;

export function setDefaultHighChartOptions(owner) {
  if (!localConfig) {
    // use options defined in highcharts-configs/application.js if they exist
    let configFactory = owner.factoryFor('highcharts-config:application');

    if (configFactory && configFactory.class) {
      let localConfigBuilder = configFactory.class;
      localConfig = localConfigBuilder(defaultOptions);
    } else {
      localConfig = defaultOptions;
    }
  }

  Highcharts.setOptions(localConfig);
}

let defaultOptions = {
  plotOptions: {
    series: {
      shadow: false
    }
  },

  global: {
    timezoneOffset: new Date().getTimezoneOffset()
  },

  credits: {
    enabled: false
  }
};
