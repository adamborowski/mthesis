export default class Adapter {
    /**
     * @param dataSource {DataSource}
     * @param plot skonfigurowany komponent wykresowy
     */
    constructor(dataSource, plot) {
        this.dataSource = dataSource;
        this.plot = plot;
        this.plot.addListener('rangeupdate', (newRange, chartWidth) => {
            dataSource.getViewState().updateRangeAndViewportWidth(newRange, chartWidth);
        })
    }
    onProjectionRecompile = () => {
        const wrappers = this.dataSource.getWrappers()();
        const mValues = wrappers.map(a => [a.start, a.levelId === 'raw' ? a.data.v : a.data.a]);
        const tValues = wrappers.map(a => [a.start, a.levelId === 'raw' ? a.data.v : a.data.t]);
        const bValues = wrappers.map(a => [a.start, a.levelId === 'raw' ? a.data.v : a.data.b]);
        this.plot.setData([
            {id: 'top', data: tValues},
            {id: 'bottom', data: bValues},
            {id: 'values', data: mValues}
        ]);
    };
}