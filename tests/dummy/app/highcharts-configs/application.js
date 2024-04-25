export default function (defaultOptions) {
  defaultOptions.credits.href = 'http://www.example.com';
  defaultOptions.credits.text = 'ember-highcharts-configured-title';
  defaultOptions.credits.enabled = true;
  defaultOptions.lang = {
    thousandsSep: ',',
  };

  return defaultOptions;
}
