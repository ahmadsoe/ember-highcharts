import Component from '@glimmer/component';
import type { default as _Highcharts } from 'highcharts';
interface HighChartsSignature<Content extends Highcharts.Options['series']> {
    Element: HTMLDivElement;
    Args: {
        /**
         * The callback argument is optional and allows you to pass in a function that runs when the chart has finished loading
         */
        callback?: Highcharts.ChartCallbackFunction;
        /**
         * The `content` argument matches up with the `series` option in the Highcharts/Highstock/Highmaps API.
         * Use this option to set the series data for your chart.
         */
        content?: Content;
        /**
         * The `chartOptions` argument is a generic object for setting different options with Highcharts/Highstock/Highmaps.
         * Use this option to set things like the chart title and axis settings.
         */
        chartOptions: Highcharts.Options;
        /**
         * The mode argument is optional and it determines whether to use Highcharts, Highstock, or Highmaps.
         */
        mode?: 'Gantt' | 'Map' | 'StockChart';
        /**
         * The `theme` argument is optional and it allows you to pass in a Highcharts theme.
         */
        theme?: Highcharts.Options;
    };
    Blocks: {
        default: [chart: Highcharts.Chart | null];
    };
}
export default class HighCharts<Content extends Highcharts.Options['series']> extends Component<HighChartsSignature<Content>> {
    get content(): NonNullable<Content> | undefined;
    get chartOptions(): _Highcharts.Options;
    get mode(): "Gantt" | "Map" | "StockChart" | undefined;
    get theme(): _Highcharts.Options | undefined;
    get callback(): _Highcharts.ChartCallbackFunction | undefined;
    el: HTMLDivElement | undefined;
    chart: Highcharts.Chart | null;
    get buildOptions(): {
        series: readonly [{
            readonly id: "noData";
            readonly data: 0;
            readonly color: "#aaaaaa";
        }] | NonNullable<Content> | undefined;
    } & {
        accessibility: _Highcharts.AccessibilityOptions;
        annotations: Array<_Highcharts.AnnotationsOptions>;
        boost: _Highcharts.BoostOptions;
        caption: _Highcharts.CaptionOptions;
        chart: _Highcharts.ChartOptions;
        colorAxis: (_Highcharts.ColorAxisOptions | Array<_Highcharts.ColorAxisOptions>);
        colors: Array<(_Highcharts.ColorString | _Highcharts.GradientColorObject | _Highcharts.PatternObject)>;
        connectors: _Highcharts.ConnectorsOptions;
        credits: _Highcharts.CreditsOptions;
        data: _Highcharts.DataOptions;
        defs: (_Highcharts.DefsOptions | _Highcharts.Dictionary<_Highcharts.ASTNode>);
        drilldown: _Highcharts.DrilldownOptions;
        exporting: _Highcharts.ExportingOptions;
        global: _Highcharts.GlobalOptions;
        lang: _Highcharts.LangOptions;
        legend: _Highcharts.LegendOptions;
        loading: _Highcharts.LoadingOptions;
        mapNavigation: _Highcharts.MapNavigationOptions;
        mapView: _Highcharts.MapViewOptions;
        navigation: _Highcharts.NavigationOptions;
        navigator: _Highcharts.NavigatorOptions;
        noData: _Highcharts.NoDataOptions;
        pane: (_Highcharts.PaneOptions | Array<_Highcharts.PaneOptions>);
        plotOptions: _Highcharts.PlotOptions;
        rangeSelector: _Highcharts.RangeSelectorOptions;
        responsive: _Highcharts.ResponsiveOptions;
        scrollbar: _Highcharts.ScrollbarOptions;
        series: Array<_Highcharts.SeriesOptionsType>;
        sonification: _Highcharts.SonificationOptions;
        stockTools: _Highcharts.StockToolsOptions;
        subtitle: _Highcharts.SubtitleOptions;
        time: _Highcharts.TimeOptions;
        title: _Highcharts.TitleOptions;
        tooltip: _Highcharts.TooltipOptions;
        xAxis: (_Highcharts.XAxisOptions | Array<_Highcharts.XAxisOptions>);
        yAxis: (_Highcharts.YAxisOptions | Array<_Highcharts.YAxisOptions>);
        zAxis: (_Highcharts.ZAxisOptions | Array<_Highcharts.ZAxisOptions>);
    };
    drawAfterRender(): void;
    draw(): void;
    onDidInsert(el: HTMLDivElement): Promise<void>;
    onDidUpdate(_elem: unknown, [content, chartOptions, mode]: [
        HighChartsSignature<Content>['Args']['content'],
        HighChartsSignature<Content>['Args']['chartOptions'],
        HighChartsSignature<Content>['Args']['mode']
    ]): void;
    willDestroy(): void;
    /**
     * Dynamically imports the necessary pieces from Highcharts, based on chart type and options.
     */
    _importHighchartsDeps(): Promise<void>;
}
export {};
//# sourceMappingURL=high-charts.d.ts.map