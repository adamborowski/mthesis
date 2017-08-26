export default class Adapter {
    /**
     * @param dataSource {DataSource}
     * @param plot skonfigurowany komponent wykresowy
     */
    constructor(dataSource, plot) {
        this.dataSource = dataSource;
        this.dataset = createDataset(); // utworzenie zbioru danych obsługiwanego przez komponent
        this.plot = plot;
        this.plot.addListener('rangeupdate', (newRange, chartWidth) => {
            dataSource.getViewState().updateRangeAndViewportWidth(newRange, chartWidth);
        });
    }
    onProjectionRecompile = () => {
        const wrapperDiff = this.dataSource.calculateWrappersDiffToPrevious();
        wrapperDiff.removed.forEach(point => this.dataset.remove(point.id));
        wrapperDiff.resized.forEach(point => this.dataset.update(point.id, point.start, point.end));
        wrapperDiff.added.forEach(point => this.dataset.add(point));
    };
}