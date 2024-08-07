function getSeriesMap(seriesGroup) {
  const seriesMap = seriesGroup.reduce((seriesMap, seriesItem) => {
    seriesMap[seriesItem.name] = seriesItem;
    return seriesMap;
  }, {});
  return seriesMap;
}
function getSeriesChanges(contentSeries, series) {
  const updatedKeys = Object.keys(contentSeries).filter(key => {
    const isValidKey = key !== 'data' && key.charAt(0) !== '_';
    const isValidType = ['object', 'function'].indexOf(typeof contentSeries[key]) === -1;
    const isTheSame = contentSeries[key] === series[key];
    return isValidKey && isValidType && !isTheSame;
  });

  // returns a list of updated keys
  return updatedKeys;
}

export { getSeriesChanges, getSeriesMap };
//# sourceMappingURL=chart-data.js.map
