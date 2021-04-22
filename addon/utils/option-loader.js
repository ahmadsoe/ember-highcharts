let localConfig = null;

export function setDefaultHighChartOptions(owner) {
  if (!localConfig) {
    // use options defined in highcharts-configs/application.js if they exist
    const configFactory = owner.factoryFor('highcharts-config:application');

    if (configFactory && configFactory.class) {
      const localConfigBuilder = configFactory.class;
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
