/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasUrlParam = exports.addUrlParam = exports.createGoToProps = exports.updateLayerListVisibility = exports.getPosition = exports.updateLayerVisibility = exports.isMacLike = exports.isMobile = exports._findNode = exports.setPanelSize = exports._isTouchDevice = void 0;
    function _isTouchDevice() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    exports._isTouchDevice = _isTouchDevice;
    function setPanelSize(panelSize) {
        let grid;
        if (panelSize === "s") {
            grid = "column-6";
        }
        else if (panelSize === "m") {
            grid = "column-10";
        }
        else {
            grid = "column-12";
        }
        return grid;
    }
    exports.setPanelSize = setPanelSize;
    function _findNode(className) {
        const mainNodes = document.getElementsByClassName(className);
        let node = null;
        for (let j = 0; j < mainNodes.length; j++) {
            node = mainNodes[j];
        }
        return node ? node : null;
    }
    exports._findNode = _findNode;
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    exports.isMobile = isMobile;
    function isMacLike() {
        return /(Mac)/i.test(navigator.platform);
    }
    exports.isMacLike = isMacLike;
    function updateLayerVisibility(layers) {
        layers?.forEach((origLayer) => {
            if (origLayer?.hasOwnProperty("internal") && origLayer?.internal) {
                origLayer.listMode = "hide";
            }
            else {
                origLayer.listMode = "show";
            }
            if (origLayer.type === "group" && origLayer?.layers?.length > 0) {
                updateLayerVisibility(origLayer.layers);
            }
            if ((origLayer.type === "map-image" || origLayer.type === "tile") && origLayer?.allSublayers?.length > 0) {
                updateLayerVisibility(origLayer.allSublayers);
            }
        });
    }
    exports.updateLayerVisibility = updateLayerVisibility;
    function getPosition(position) {
        // object or string
        let groupName = null;
        if (typeof position === "string") {
            groupName = position;
        }
        else if (position?.position) {
            groupName = position.position;
        }
        // if we are on mobile set group name to mobile so only one is open
        if (window?.matchMedia("only screen and (max-width: 480px)").matches) {
            // extract first part of group name
            let corner = groupName?.split("-");
            groupName = corner?.length > 0 ? `mobile-${corner[0]}` : groupName;
        }
        return groupName;
    }
    exports.getPosition = getPosition;
    function updateLayerListVisibility(layers, selectedLayerIds, config) {
        layers?.forEach((layer) => {
            if (layer?.type === "group") {
                // Show group sub layers and if none are visible hide the group too
                const showGroup = layer?.layers?.some((g) => {
                    if (g?.type === "group") {
                        // is there a sub group that contains content
                        return g?.layers?.some((gsl) => {
                            return selectedLayerIds?.indexOf(gsl?.id) !== -1 ? true : false;
                        });
                    }
                    return selectedLayerIds?.indexOf(g?.id) !== -1 ? true : false;
                });
                // if a group contains a group layer that
                layer.listMode = showGroup ? "show" : "hide";
                updateLayerListVisibility(layer?.layers, selectedLayerIds, config);
            }
            else if (layer?.type === "map-image" || layer?.type === "tile") {
                layer.listMode = "hide";
                layer?.allSublayers?.forEach((g) => {
                    g.listMode = "hide";
                });
                const layerId = layer.id;
                if (selectedLayerIds?.indexOf(layerId) === -1) {
                    // layer isn't selected
                    return;
                }
                layer?.allSublayers?.forEach((l) => {
                    config?.selectedLayers?.layers?.forEach((selectedLayer) => {
                        if (selectedLayer?.id === layerId && selectedLayer?.sublayerId === l.id) {
                            if (l?.parent?.listMode === "hide") {
                                // change hide to show, all the way up to the root layer
                                let parentLayer = l.parent;
                                while (parentLayer != null) {
                                    parentLayer.listMode = "show";
                                    parentLayer = parentLayer?.parent;
                                }
                            }
                            l.listMode = "show";
                        }
                    });
                });
            }
            else {
                layer.listMode = selectedLayerIds?.indexOf(layer?.id) !== -1 ? "show" : "hide";
            }
        });
    }
    exports.updateLayerListVisibility = updateLayerListVisibility;
    function createGoToProps(target, config) {
        const { searchScale, enableSearchScale, level } = config;
        const goToProps = {
            target
        };
        if (level) {
            goToProps.zoom = level;
        }
        else if (searchScale && enableSearchScale) {
            goToProps.scale = searchScale;
        }
        return goToProps;
    }
    exports.createGoToProps = createGoToProps;
    function addUrlParam(param, value) {
        if ("URLSearchParams" in window) {
            const params = new URLSearchParams(document.location.search);
            params.set(param, value);
            if (params && params.toString()) {
                window.history.replaceState({}, "", `${location.pathname}?${params} `);
            }
            else {
                window.history.replaceState({}, "", `${location.pathname} `);
            }
        }
    }
    exports.addUrlParam = addUrlParam;
    function hasUrlParam(param) {
        if ("URLSearchParams" in window) {
            const params = new URLSearchParams(document.location.search);
            return params.get(param);
        }
        else {
            return false;
        }
    }
    exports.hasUrlParam = hasUrlParam;
});
