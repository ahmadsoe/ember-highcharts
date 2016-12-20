export function getSeriesMap(seriesGroup) {
  let seriesMap = seriesGroup.reduce((seriesMap, seriesItem) => {
    seriesMap[seriesItem.name] = seriesItem;
    return seriesMap;
  }, {});

  return seriesMap;
}

export function getSeriesChanges(contentSeries, series) {
  let updatedKeys = Object.keys(contentSeries).filter((key) => {
    let isValidKey = key !== 'data' && key.charAt(0) !== '_';
    let isValidType = ['object', 'function'].indexOf(typeof contentSeries[key]) === -1;
    let isTheSame = contentSeries[key] === series[key];

    return isValidKey && isValidType && !isTheSame;
  });

  // returns a list of updated keys
  return updatedKeys;
}
