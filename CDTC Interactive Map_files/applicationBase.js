define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        localStorage: {
            fetch: true
        },
        group: {
            default: "908dd46e749d4565a17d2b646ace7b1a",
            fetchInfo: false,
            fetchItems: false,
            itemParams: {
                sortField: "modified",
                sortOrder: "desc",
                num: 9,
                start: 0
            }
        },
        portal: {
            fetch: true
        },
        urlParams: [
            "appid",
            "extentSelector",
            "basemapUrl",
            "basemapReferenceUrl",
            "center",
            "components",
            "embed",
            "extent",
            "find",
            "level",
            "locale",
            "layerList",
            "layerListIncludeTable",
            "legend",
            "home",
            "fullScreen",
            "basemapToggle",
            "basemapSelector",
            "theme",
            "marker",
            "portalUrl",
            "viewpoint",
            "mapZoom",
            "screenshot",
            "search",
            "webmap",
            "webscene",
            "selectedFeature",
            "portalUrl",
            "env",
            "hiddenLayers"
        ],
        webMap: {
            default: "bdd8a0c6fa9442dd9b8ba290ef1c7778",
            fetch: true
        },
        webScene: {
            default: "0125322d8daf4cc282f7ec4d66c3a18b",
            fetch: true
        }
    };
});
