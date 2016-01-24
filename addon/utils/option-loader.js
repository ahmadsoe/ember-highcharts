var localConfig = null;

export function setDefaultHighChartOptions(owner) {
  if (!localConfig) {
    // use options defined in highcharts-configs/application.js if they exist
    var localConfigBuilder = owner._lookupFactory('highcharts-config:application');
    if (localConfigBuilder) {
      localConfig = localConfigBuilder(defaultOptions);
    } else {
      localConfig = defaultOptions;
    }
  }

  Highcharts.setOptions(localConfig);
}

var defaultOptions = {
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
