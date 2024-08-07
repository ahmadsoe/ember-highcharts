import Highcharts from 'highcharts';
export declare const EMPTY_CHART_CONTENT: readonly [{
    readonly id: "noData";
    readonly data: 0;
    readonly color: "#aaaaaa";
}];
export default function buildOptions<Content extends Highcharts.Options['series']>(theme?: Highcharts.Options, options?: Highcharts.Options, content?: Content): {
    series: readonly [{
        readonly id: "noData";
        readonly data: 0;
        readonly color: "#aaaaaa";
    }] | Content | undefined;
} & {
    accessibility: Highcharts.AccessibilityOptions;
    annotations: Array<Highcharts.AnnotationsOptions>;
    boost: Highcharts.BoostOptions;
    caption: Highcharts.CaptionOptions;
    chart: Highcharts.ChartOptions;
    colorAxis: (Highcharts.ColorAxisOptions | Array<Highcharts.ColorAxisOptions>);
    colors: Array<(Highcharts.ColorString | Highcharts.GradientColorObject | Highcharts.PatternObject)>;
    connectors: Highcharts.ConnectorsOptions;
    credits: Highcharts.CreditsOptions;
    data: Highcharts.DataOptions;
    defs: (Highcharts.DefsOptions | Highcharts.Dictionary<Highcharts.ASTNode>);
    drilldown: Highcharts.DrilldownOptions;
    exporting: Highcharts.ExportingOptions;
    global: Highcharts.GlobalOptions;
    lang: Highcharts.LangOptions;
    legend: Highcharts.LegendOptions;
    loading: Highcharts.LoadingOptions;
    mapNavigation: Highcharts.MapNavigationOptions;
    mapView: Highcharts.MapViewOptions;
    navigation: Highcharts.NavigationOptions;
    navigator: Highcharts.NavigatorOptions;
    noData: Highcharts.NoDataOptions;
    pane: (Highcharts.PaneOptions | Array<Highcharts.PaneOptions>);
    plotOptions: Highcharts.PlotOptions;
    rangeSelector: Highcharts.RangeSelectorOptions;
    responsive: Highcharts.ResponsiveOptions;
    scrollbar: Highcharts.ScrollbarOptions;
    series: Array<Highcharts.SeriesOptionsType>;
    sonification: Highcharts.SonificationOptions;
    stockTools: Highcharts.StockToolsOptions;
    subtitle: Highcharts.SubtitleOptions;
    time: Highcharts.TimeOptions;
    title: Highcharts.TitleOptions;
    tooltip: Highcharts.TooltipOptions;
    xAxis: (Highcharts.XAxisOptions | Array<Highcharts.XAxisOptions>);
    yAxis: (Highcharts.YAxisOptions | Array<Highcharts.YAxisOptions>);
    zAxis: (Highcharts.ZAxisOptions | Array<Highcharts.ZAxisOptions>);
};
//# sourceMappingURL=build-options.d.ts.map