import type Highcharts from 'highcharts';
export declare function getSeriesMap<Content extends Highcharts.SeriesOptionsType>(seriesGroup: Array<Content>): {
    [key: string]: Content;
};
export declare function getSeriesChanges(contentSeries: Highcharts.Series, series: Highcharts.Series): string[];
//# sourceMappingURL=chart-data.d.ts.map