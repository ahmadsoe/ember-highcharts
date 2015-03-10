var localConfig = null;

export function setDefaultHighChartOptions(container) {
  if (!localConfig) {
    // use options defined in highcharts-config if they exist in the container
    var localConfigBuilder = container.lookup('highcharts-config:application');
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
