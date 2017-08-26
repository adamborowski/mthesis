import {PredictionModel} from 'explorejs';
import {Range} from 'explorejs-common';

/**
 * @property SerieCache {SerieCache}
 * @property viewState {ViewState}
 */
export default class BasicPredictionModel extends PredictionModel {

    constructor(contextPaddingRatio = 2, roundPrecision = 1) {
        super();
        this.contextPaddingRatio = contextPaddingRatio;
        this.roundPrecision = roundPrecision;
    }

    update() {
        const currentLevelId = this.viewState.getCurentLevelId();
        const start = this.viewState.getStart();
        const end = this.viewState.getEnd();
        const contextPadding = (end - start) * this.contextPaddingRatio;
        const tileLengthPixels = this.roundPrecision * this.viewState.getViewportWidth();
        const tileLengthMillis = this.viewState.pixelsToTime(tileLengthPixels);
        const predictedRange = Range
            .leftClosed(start, end)
            .extend(contextPadding)
            .expandToFitPrecision(tileLengthMillis);

        this.SerieCache
            .getLevelCache(currentLevelId)
            .requestDataForRange(predictedRange);
    }
}
