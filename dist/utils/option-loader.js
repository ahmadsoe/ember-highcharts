import Highcharts from 'highcharts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

let localConfig = null;
function setDefaultHighChartOptions(owner) {
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
const defaultOptions = {
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

export { setDefaultHighChartOptions };
//# sourceMappingURL=option-loader.js.map
