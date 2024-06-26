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
define(["require", "exports", "esri/Camera", "esri/geometry/Extent", "esri/geometry/Point", "esri/core/promiseUtils"], function (require, exports, Camera_1, Extent_1, Point_1, promiseUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseBasemap = exports.parsePopup = exports.parseMarker = exports.parseExtent = exports.parseLevel = exports.parseCenter = exports.parseViewpoint = exports.parseViewComponents = void 0;
    Camera_1 = __importDefault(Camera_1);
    Extent_1 = __importDefault(Extent_1);
    Point_1 = __importDefault(Point_1);
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    function parseViewComponents(components) {
        if (!components) {
            return;
        }
        return components.split(",");
    }
    exports.parseViewComponents = parseViewComponents;
    function parseViewpoint(viewpoint) {
        // ?viewpoint=cam:-122.69174973,45.53565982,358.434;117.195,59.777
        const viewpointArray = viewpoint && viewpoint.split(";");
        if (!viewpointArray || !viewpointArray.length) {
            return;
        }
        const cameraIndex = viewpointArray[0].indexOf("cam:") !== -1 ? 0 : 1;
        const tiltAndHeadingIndex = cameraIndex === 0 ? 1 : 0;
        const cameraString = viewpointArray[cameraIndex];
        const tiltAndHeadingString = viewpointArray[tiltAndHeadingIndex];
        const cameraProperties = _getCameraProperties(cameraString, tiltAndHeadingString);
        if (cameraProperties.position) {
            return new Camera_1.default(cameraProperties);
        }
        return;
    }
    exports.parseViewpoint = parseViewpoint;
    function parseCenter(center) {
        // ?center=-13044705.25,4036227.41,102113&level=12
        // ?center=-13044705.25;4036227.41;102113&level=12
        // ?center=-117.1825,34.0552&level=12
        // ?center=-117.1825;34.0552&level=12
        if (!center) {
            return null;
        }
        const centerArray = _splitURLString(center);
        const centerLength = centerArray.length;
        if (centerLength < 2) {
            return null;
        }
        const x = parseFloat(centerArray[0]);
        const y = parseFloat(centerArray[1]);
        if (isNaN(x) || isNaN(y)) {
            return null;
        }
        const wkid = centerLength === 3 ? parseInt(centerArray[2], 10) : 4326;
        return new Point_1.default({
            x,
            y,
            spatialReference: {
                wkid
            }
        });
    }
    exports.parseCenter = parseCenter;
    function parseLevel(level) {
        return level && parseInt(level, 10);
    }
    exports.parseLevel = parseLevel;
    function parseExtent(extent) {
        // ?extent=-13054125.21,4029134.71,-13032684.63,4041785.04,102100
        // ?extent=-13054125.21;4029134.71;-13032684.63;4041785.04;102100
        // ?extent=-117.2672,33.9927,-117.0746,34.1064
        // ?extent=-117.2672;33.9927;-117.0746;34.1064
        if (!extent) {
            return null;
        }
        const extentArray = _splitURLString(extent);
        const extentLength = extentArray.length;
        if (extentLength < 4) {
            return null;
        }
        const xmin = parseFloat(extentArray[0]), ymin = parseFloat(extentArray[1]), xmax = parseFloat(extentArray[2]), ymax = parseFloat(extentArray[3]);
        if (isNaN(xmin) || isNaN(ymin) || isNaN(xmax) || isNaN(ymax)) {
            return null;
        }
        const wkid = extentLength === 5 ? parseInt(extentArray[4], 10) : 4326;
        const ext = new Extent_1.default({
            xmin,
            ymin,
            xmax,
            ymax,
            spatialReference: {
                wkid
            }
        });
        return ext;
    }
    exports.parseExtent = parseExtent;
    async function parseMarker(marker) {
        // ?marker=-117;34;4326;My Title;http://www.daisysacres.com/images/daisy_icon.gif;My location&level=10
        // ?marker=-117,34,4326,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
        // ?marker=-13044705.25,4036227.41,102100,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
        // ?marker=-117,34,,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
        // ?marker=-117,34,,,,My location&level=10
        // ?marker=-117,34&level=10
        // ?marker=10406557.402,6590748.134,2526
        if (!marker) {
            return Promise.reject();
        }
        const markerArray = _splitURLString(marker);
        const markerLength = markerArray.length;
        if (markerLength < 2) {
            return Promise.reject();
        }
        const modules = await (0, promiseUtils_1.eachAlways)([new Promise((resolve_1, reject_1) => { require(["esri/Graphic"], resolve_1, reject_1); }).then(__importStar), new Promise((resolve_2, reject_2) => { require(["esri/PopupTemplate"], resolve_2, reject_2); }).then(__importStar), new Promise((resolve_3, reject_3) => { require(["esri/symbols/PictureMarkerSymbol"], resolve_3, reject_3); }).then(__importStar), new Promise((resolve_4, reject_4) => { require(["esri/symbols/SimpleMarkerSymbol"], resolve_4, reject_4); }).then(__importStar)]);
        const [Graphic, PopupTemplate, PictureMarkerSymbol, SimpleMarkerSymbol] = modules.map((module) => module.value);
        const x = parseFloat(markerArray[0]);
        const y = parseFloat(markerArray[1]);
        const content = markerArray[3];
        const icon_url = markerArray[4];
        const label = markerArray[5];
        const wkid = markerArray[2] ? parseInt(markerArray[2], 10) : 4326;
        const markerSymbol = icon_url
            ? new PictureMarkerSymbol.default({
                url: icon_url,
                height: "32px",
                width: "32px"
            })
            : new SimpleMarkerSymbol.default({
                outline: {
                    width: 1
                },
                size: 14,
                color: [255, 255, 255, 0]
            });
        const point = new Point_1.default({
            x,
            y,
            spatialReference: {
                wkid
            }
        });
        const hasPopupDetails = content || label;
        const popupTemplate = hasPopupDetails
            ? new PopupTemplate.default({
                title: content || null,
                content: label || null
            })
            : null;
        const graphic = new Graphic.default({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: popupTemplate
        });
        return graphic;
    }
    exports.parseMarker = parseMarker;
    function parsePopup(popupFixed, popupFixedPosition) {
        return {
            "popup": {
                dockEnabled: popupFixed,
                "dockOptions": {
                    breakpoint: !popupFixed,
                    position: popupFixed ? popupFixedPosition : "auto"
                }
            }
        };
    }
    exports.parsePopup = parsePopup;
    function parseBasemap(basemapUrl, basemapReferenceUrl) {
        if (!basemapUrl) {
            return;
        }
        return _getBasemap(basemapUrl, basemapReferenceUrl).then(basemap => {
            return basemap;
        });
    }
    exports.parseBasemap = parseBasemap;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    function _splitURLString(value) {
        if (!value) {
            return null;
        }
        const splitValues = value.split(";");
        return splitValues.length === 1 ? value.split(",") : splitValues;
    }
    function _getCameraPosition(camera) {
        if (!camera) {
            return null;
        }
        const cameraValues = camera.substr(4, camera.length - 4);
        const positionArray = cameraValues.split(",");
        if (positionArray.length < 3) {
            return null;
        }
        const x = parseFloat(positionArray[0]), y = parseFloat(positionArray[1]), z = parseFloat(positionArray[2]);
        const wkid = positionArray.length === 4 ? parseInt(positionArray[3], 10) : 4326;
        return new Point_1.default({
            x,
            y,
            z,
            spatialReference: {
                wkid
            }
        });
    }
    function _getHeadingAndTilt(headingAndTilt) {
        if (!headingAndTilt) {
            return null;
        }
        const tiltHeadingArray = headingAndTilt.split(",");
        return tiltHeadingArray.length >= 0
            ? {
                heading: parseFloat(tiltHeadingArray[0]),
                tilt: parseFloat(tiltHeadingArray[1])
            }
            : null;
    }
    function _getBasemap(basemapUrl, basemapReferenceUrl) {
        // ?basemapUrl=https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer&basemapReferenceUrl=http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer
        if (!basemapUrl) {
            return;
        }
        return (0, promiseUtils_1.eachAlways)([new Promise((resolve_5, reject_5) => { require(["esri/layers/Layer"], resolve_5, reject_5); }).then(__importStar), new Promise((resolve_6, reject_6) => { require(["esri/Basemap"], resolve_6, reject_6); }).then(__importStar)]).then((modules) => {
            modules = modules.map((module) => module.value);
            const [Layer, Basemap] = modules;
            const getBaseLayer = Layer.default.fromArcGISServerUrl({ url: basemapUrl });
            const getReferenceLayer = basemapReferenceUrl
                ? Layer.default.fromArcGISServerUrl({
                    url: basemapReferenceUrl
                })
                : Promise.resolve();
            const getBaseLayers = (0, promiseUtils_1.eachAlways)({ baseLayer: getBaseLayer, referenceLayer: getReferenceLayer });
            return getBaseLayers.then(async (response) => {
                const error = response?.baseLayer?.error || response?.referenceLayer?.error;
                if (error) {
                    return Promise.reject(error);
                }
                else {
                    const baseLayer = response.baseLayer;
                    const referenceLayer = response.referenceLayer;
                    const basemapOptions = {
                        baseLayers: [baseLayer.value],
                        referenceLayers: referenceLayer.value ? [referenceLayer.value] : []
                    };
                    const basemap = new Basemap.default(basemapOptions);
                    await basemap.loadAll();
                    return basemap;
                }
            });
        });
    }
    function _getCameraProperties(camera, headingAndTilt) {
        const cameraPosition = _getCameraPosition(camera);
        const headingAndTiltProperties = _getHeadingAndTilt(headingAndTilt);
        return {
            position: cameraPosition,
            ...headingAndTiltProperties
        };
    }
});
