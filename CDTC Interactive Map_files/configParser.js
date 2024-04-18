define(["require", "exports", "esri/geometry/support/jsonUtils"], function (require, exports, jsonUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._searchSourcesValidate = exports._extentSelectorConfigValidate = exports._extentSelectorConfigConvert = exports.parseConfig = void 0;
    /**
     * "Convert" functions handle backwards compatibility for the App Configs by transforming
     * the inputted Config into a form that is equivalent to what the Config
     * Panel would produce right at this moment.
     *
     * "Validate" functions handle turning potentially invalid app item JSON into a valid
     * form, which will not cause the template app to error.
     *
     * *** NOTE:
     * For all "Convert" additions below, please add a comment with the old
     * interface that is being transformed from, and the new interface that
     * is being transformed to
     * ****
     * @param config - App Config
     */
    function parseConfig(config) {
        if (config?.extentSelectorConfig != null) {
            config.extentSelectorConfig = _extentSelectorConfigConvert(config.extentSelectorConfig);
            config.extentSelectorConfig = _extentSelectorConfigValidate(config.extentSelectorConfig);
        }
        if (config?.searchConfiguration?.sources?.length > 0) {
            config.searchConfiguration.sources = _searchSourcesValidate(config.searchConfiguration.sources);
        }
        return config;
    }
    exports.parseConfig = parseConfig;
    const MIN_SCALE_DEFAULT = 591657528;
    const MAX_SCALE_DEFAULT = 100;
    /**
     * // old (extentSelectorConfig === __esri.MapViewConstraints)
     * // =>
     * // new (extentSelectorConfig === IExtentSelectorOutput)
     * @param config
     */
    function _extentSelectorConfigConvert(extentSelectorConfig) {
        if (extentSelectorConfig && (extentSelectorConfig.geometry != null ||
            extentSelectorConfig.maxScale != null ||
            extentSelectorConfig.minScale != null)) { // old
            return {
                constraints: extentSelectorConfig,
                mapRotation: 0
            };
        }
        else { // new
            return extentSelectorConfig;
        }
    }
    exports._extentSelectorConfigConvert = _extentSelectorConfigConvert;
    function _extentSelectorConfigValidate(extentSelectorConfig) {
        if (extentSelectorConfig) {
            if (typeof extentSelectorConfig === "object" && Object.keys(extentSelectorConfig)?.length === 0) {
                return {
                    constraints: {
                        geometry: null,
                        minScale: MIN_SCALE_DEFAULT,
                        maxScale: MAX_SCALE_DEFAULT,
                        rotationEnabled: true
                    },
                    mapRotation: 0
                };
            }
            if (extentSelectorConfig?.constraints?.geometry != null) {
                const geom = (0, jsonUtils_1.fromJSON)(extentSelectorConfig.constraints.geometry);
                if (geom?.type === "polygon") {
                    extentSelectorConfig.constraints.geometry =
                        geom.rings.length > 0 ?
                            extentSelectorConfig.constraints.geometry :
                            null;
                }
                else if (geom?.type === "extent") {
                    extentSelectorConfig.constraints.geometry =
                        geom.width != null && geom.height != null ?
                            extentSelectorConfig.constraints.geometry :
                            null;
                }
                else {
                    extentSelectorConfig.constraints.geometry = null;
                }
            }
            if (extentSelectorConfig?.constraints && extentSelectorConfig.constraints?.minScale == null) {
                extentSelectorConfig.constraints.minScale = MIN_SCALE_DEFAULT;
            }
            if (extentSelectorConfig?.constraints && extentSelectorConfig.constraints?.maxScale == null) {
                extentSelectorConfig.constraints.maxScale = MAX_SCALE_DEFAULT;
            }
        }
        return extentSelectorConfig;
    }
    exports._extentSelectorConfigValidate = _extentSelectorConfigValidate;
    function _searchSourcesValidate(sources) {
        sources?.forEach(source => {
            if (source?.locator?.url && !source?.url) {
                source.url = source.locator.url;
            }
        });
        return sources;
    }
    exports._searchSourcesValidate = _searchSourcesValidate;
});
// todo update locally and test 
