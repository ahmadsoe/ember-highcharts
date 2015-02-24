export function initialize(container) {
  container.optionsForType('highcharts-config', { instantiate: false });
}

export default {
  name: 'highcharts',
  initialize: initialize
};
