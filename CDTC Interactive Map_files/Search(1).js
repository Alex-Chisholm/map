var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/widgets/Search", "esri/layers/FeatureLayer", "esri/geometry/support/jsonUtils", "esri/core/reactiveUtils"], function (require, exports, Search_1, FeatureLayer_1, jsonUtils_1, reactiveUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleSearchExtent = exports.createSearch = void 0;
    Search_1 = __importDefault(Search_1);
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    function createSearch(view, portal, searchConfiguration) {
        const DEFAULT_PLACEHOLDER = "Find address or place";
        const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
        const sources = searchConfiguration?.sources;
        if (sources && sources?.length > 0) {
            searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
            sources.forEach((source) => {
                const isLayerSource = source.hasOwnProperty("layer");
                if (isLayerSource) {
                    const layerSource = source;
                    const layerId = layerSource.layer?.id;
                    const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
                    const layerUrl = layerSource?.layer?.url;
                    if (layerFromMap) {
                        layerSource.layer = layerFromMap;
                    }
                    else if (layerUrl) {
                        layerSource.layer = new FeatureLayer_1.default(layerUrl);
                    }
                }
                else {
                    const locatorSource = source;
                    const isWorldLocatorExpression = new RegExp("/World/GeocodeServer");
                    if (isWorldLocatorExpression.test(locatorSource?.url)) {
                        if (!locatorSource?.placeholder)
                            locatorSource.placeholder = DEFAULT_PLACEHOLDER;
                        const outFields = locatorSource.outFields || [
                            "Addr_type",
                            "Match_addr",
                            "StAddr",
                            "City"
                        ];
                        locatorSource.outFields = outFields;
                        locatorSource.singleLineFieldName = "SingleLine";
                    }
                    if (locatorSource?.locator?.url)
                        locatorSource.url = locatorSource.locator.url;
                }
            });
        }
        else {
            searchConfiguration = {
                ...searchConfiguration,
                includeDefaultSources: true
            };
        }
        const searchWidget = new Search_1.default({
            view,
            portal,
            ...searchConfiguration
        });
        (0, reactiveUtils_1.when)(() => searchWidget?.["messages"], () => {
            // Replaces default placeholder ('Find address or place') with translated string from Search widget's t9n messages
            const searchWidget_t9n = searchWidget?.["messages"];
            if (searchWidget?.allPlaceholder === DEFAULT_PLACEHOLDER &&
                searchWidget_t9n?.allPlaceholder)
                searchWidget.allPlaceholder = searchWidget_t9n.allPlaceholder;
            searchWidget?.sources?.forEach((source) => {
                if (source?.placeholder === DEFAULT_PLACEHOLDER &&
                    searchWidget_t9n?.placeholder)
                    source.placeholder = searchWidget_t9n.placeholder;
            });
        }, { once: true, initial: true });
        return searchWidget;
    }
    exports.createSearch = createSearch;
    function handleSearchExtent(config, searchWidget) {
        const { extentSelector, extentSelectorConfig, mapArea } = config;
        if (searchWidget.sources != null) {
            let extent;
            if ((mapArea === true && extentSelector) ||
                (mapArea == null && extentSelector)) {
                const geometry = (0, jsonUtils_1.fromJSON)(extentSelectorConfig?.constraints?.geometry) || null;
                if (geometry) {
                    extent = geometry.extent;
                }
            }
            searchWidget.sources.forEach((source) => {
                if (extent) {
                    source.filter = {
                        geometry: extent
                    };
                }
                else {
                    source.filter = null;
                }
            });
        }
    }
    exports.handleSearchExtent = handleSearchExtent;
});
