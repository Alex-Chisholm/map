/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/reactiveUtils", "esri/geometry/projection", "./urlUtils", "esri/views/MapView", "esri/views/SceneView", "esri/WebMap", "esri/WebScene", "esri/widgets/Search"], function (require, exports, reactiveUtils_1, projection, urlUtils_1, MapView_1, SceneView_1, WebMap_1, WebScene_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findSelectedFeature = exports.setHiddenLayers = exports.findQuery = exports.setImageryLayerHighlightOptions = exports.goToMarker = exports.setBasemap = exports.getItemTitle = exports.createWebSceneFromItem = exports.createWebMapFromItem = exports.createMapFromItem = exports.createView = exports.getConfigViewProperties = void 0;
    projection = __importStar(projection);
    MapView_1 = __importDefault(MapView_1);
    SceneView_1 = __importDefault(SceneView_1);
    WebMap_1 = __importDefault(WebMap_1);
    WebScene_1 = __importDefault(WebScene_1);
    Search_1 = __importDefault(Search_1);
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    function getConfigViewProperties(config) {
        const { center, components, extent, level, viewpoint, popupFixed, popupFixedPosition, } = config;
        const ui = components
            ? { ui: { components: (0, urlUtils_1.parseViewComponents)(components) } }
            : null;
        const cameraProps = viewpoint ? { camera: (0, urlUtils_1.parseViewpoint)(viewpoint) } : null;
        const centerProps = center ? { center: (0, urlUtils_1.parseCenter)(center) } : null;
        const zoomProps = level ? { zoom: (0, urlUtils_1.parseLevel)(level) } : null;
        const extentProps = extent ? { extent: (0, urlUtils_1.parseExtent)(extent) } : null;
        const popupProps = popupFixed
            ? (0, urlUtils_1.parsePopup)(popupFixed, popupFixedPosition)
            : null;
        return {
            ...ui,
            ...cameraProps,
            ...centerProps,
            ...zoomProps,
            ...extentProps,
            ...popupProps,
        };
    }
    exports.getConfigViewProperties = getConfigViewProperties;
    async function createView(properties) {
        const { map } = properties;
        if (!map) {
            return Promise.reject(`properties does not contain a "map"`);
        }
        const isWebMap = map.declaredClass === "esri.WebMap";
        const isWebScene = map.declaredClass === "esri.WebScene";
        if (!isWebMap && !isWebScene) {
            return Promise.reject(`map is not a "WebMap" or "WebScene"`);
        }
        if (isWebMap) {
            return new MapView_1.default(properties);
        }
        else {
            return new SceneView_1.default(properties);
        }
    }
    exports.createView = createView;
    function createMapFromItem(options) {
        const { item } = options;
        const isWebMap = item.type === "Web Map";
        const isWebScene = item.type === "Web Scene";
        if (!isWebMap && !isWebScene) {
            return Promise.reject();
        }
        return isWebMap
            ? createWebMapFromItem(options)
            : createWebSceneFromItem(options);
    }
    exports.createMapFromItem = createMapFromItem;
    async function createWebMapFromItem(options) {
        const { item, appProxies, mapParams } = options;
        const wm = new WebMap_1.default({
            portalItem: item,
            ...mapParams,
        });
        await wm.load();
        if (wm?.basemap)
            await wm.basemap.load();
        return _updateProxiedLayers(wm, appProxies);
    }
    exports.createWebMapFromItem = createWebMapFromItem;
    async function createWebSceneFromItem(options) {
        const { item, appProxies } = options;
        const ws = new WebScene_1.default({
            portalItem: item,
        });
        await ws.load();
        if (ws.basemap)
            await ws.basemap.load();
        return _updateProxiedLayers(ws, appProxies);
    }
    exports.createWebSceneFromItem = createWebSceneFromItem;
    function getItemTitle(item) {
        if (item && item.title) {
            return item.title;
        }
    }
    exports.getItemTitle = getItemTitle;
    async function setBasemap(basemapUrl, basemapReferenceUrl, view) {
        if (!basemapUrl || !view) {
            return Promise.resolve();
        }
        const basemap = (await (0, urlUtils_1.parseBasemap)(basemapUrl, basemapReferenceUrl));
        await view.when();
        view.map.basemap = basemap;
    }
    exports.setBasemap = setBasemap;
    async function goToMarker(marker, view) {
        if (!marker || !view) {
            return Promise.resolve();
        }
        const graphic = await (0, urlUtils_1.parseMarker)(marker);
        await view.when();
        view.graphics.add(graphic);
        view.goTo(graphic);
        return graphic;
    }
    exports.goToMarker = goToMarker;
    function setImageryLayerHighlightOptions(view) {
        const imageryHighlightOptions = {
            fillOpacity: 0,
        };
        view.allLayerViews.on("change", (event) => {
            event.added.forEach((layerView) => {
                const layerType = layerView.layer.type;
                if (layerType === "imagery") {
                    layerView.highlightOptions =
                        imageryHighlightOptions;
                }
            });
        });
    }
    exports.setImageryLayerHighlightOptions = setImageryLayerHighlightOptions;
    async function findQuery(query, view) {
        // ?find=redlands, ca
        if (!query || !view) {
            return Promise.resolve();
        }
        const search = new Search_1.default({
            view,
        });
        const result = await search.search(query);
        (0, reactiveUtils_1.whenOnce)(() => !view.popup?.visible).then(() => {
            search.destroy();
        });
        return result;
    }
    exports.findQuery = findQuery;
    function setHiddenLayers(hiddenLayers, view) {
        if (hiddenLayers) {
            view.map.allLayers.forEach((layer) => {
                if (hiddenLayers.indexOf(layer.id) !== -1) {
                    layer.visible = false;
                    return;
                }
                layer.visible = true;
            });
        }
    }
    exports.setHiddenLayers = setHiddenLayers;
    async function findSelectedFeature(selectedFeature, view) {
        const vals = selectedFeature?.split(";");
        const layerId = vals[0];
        const oid = parseInt(vals[1]);
        const layer = view.map.allLayers.find((layer) => layerId === layer.id);
        if (!layer)
            return;
        const query = layer.createQuery();
        query.objectIds = [oid];
        query.returnGeometry = true;
        try {
            const response = await layer.queryFeatures(query);
            const options = { features: response?.features };
            // projection needs to be loaded for some maps and scenes
            await projection?.load();
            view.openPopup(options);
        }
        catch (error) { }
    }
    exports.findSelectedFeature = findSelectedFeature;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    function _updateProxiedLayers(webItem, appProxies) {
        if (!appProxies) {
            return webItem;
        }
        appProxies.forEach((proxy) => {
            webItem.allLayers.forEach((layer) => {
                if (layer.url === proxy.sourceUrl) {
                    layer.url = proxy.proxyUrl;
                    // TODO for r2 switch the app proxy logic to use a request
                    //interceptor so any time a request is made to the service the
                    // layer is updated.
                    if (layer?.portalItem) {
                        layer.portalItem.when(() => {
                            layer.portalItem.url = proxy.proxyUrl;
                        });
                    }
                }
            });
        });
        return webItem;
    }
});
