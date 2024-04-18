// Copyright 2022 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/widgets/Home", "esri/widgets/Zoom", "esri/widgets/Bookmarks", "esri/widgets/Expand", "esri/widgets/ScaleBar", "esri/widgets/LayerList", "esri/widgets/Legend", "esri/widgets/BasemapToggle", "esri/widgets/Locate", "esri/widgets/Fullscreen", "esri/core/reactiveUtils", "esri/widgets/Compass", "esri/Viewpoint", "./basemapToggle", "./search", "./generalUtils"], function (require, exports, Home_1, Zoom_1, Bookmarks_1, Expand_1, ScaleBar_1, LayerList_1, Legend_1, BasemapToggle_1, Locate_1, Fullscreen_1, reactiveUtils_1, Compass_1, Viewpoint_1, basemapToggle_1, search_1, generalUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addMeasurementTools = exports.addKeyboardShortcuts = exports.addShare = exports.addSearch = exports.addLocateWidget = exports.addCompass = exports.addFullscreen = exports.addLegend = exports.addBasemap = exports.addLayerList = exports.addScaleBar = exports.addBookmarks = exports.addZoom = exports.addHome = void 0;
    Home_1 = __importDefault(Home_1);
    Zoom_1 = __importDefault(Zoom_1);
    Bookmarks_1 = __importDefault(Bookmarks_1);
    Expand_1 = __importDefault(Expand_1);
    ScaleBar_1 = __importDefault(ScaleBar_1);
    LayerList_1 = __importDefault(LayerList_1);
    Legend_1 = __importDefault(Legend_1);
    BasemapToggle_1 = __importDefault(BasemapToggle_1);
    Locate_1 = __importDefault(Locate_1);
    Fullscreen_1 = __importDefault(Fullscreen_1);
    Compass_1 = __importDefault(Compass_1);
    Viewpoint_1 = __importDefault(Viewpoint_1);
    /**
     * Watch for changes in home, homePosition, mapArea, mapAreaConfig
     */
    async function addHome(config, view) {
        const { home, homePosition, mapArea, mapAreaConfig } = config;
        const uniqueId = "esri-home";
        let node = view.ui.find(uniqueId);
        if (!home) {
            if (node) {
                view.ui.remove(node);
            }
            return;
        }
        if (node) {
            view.ui.move(node, homePosition);
        }
        else {
            node = new Home_1.default({ view, id: uniqueId });
            view.ui.add(node, homePosition);
        }
        if (mapArea && mapAreaConfig != null) {
            node.viewpoint = Viewpoint_1.default.fromJSON(mapAreaConfig);
        }
        else {
            const map = view.map;
            node.viewpoint = map.initialViewProperties.viewpoint;
        }
    }
    exports.addHome = addHome;
    /**
     * Watch for changes in mapZoom, mapZoomPosition
     */
    async function addZoom(config, view) {
        const { mapZoom, mapZoomPosition } = config;
        const uniqueId = "esri-zoom";
        const node = view.ui.find(uniqueId);
        if (!mapZoom) {
            if (node) {
                view.ui.remove(node);
            }
            return;
        }
        if (node && mapZoomPosition != null) {
            view.ui.move(node, mapZoomPosition);
        }
        else {
            view.ui.add(new Zoom_1.default({ view, id: uniqueId }), mapZoomPosition);
        }
    }
    exports.addZoom = addZoom;
    /**
     * Watch for changes in bookmarks, bookmarksPosition
     * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
     * @param timeCapability optional param. If true add time capability in the Bookmarks widget.
     */
    async function addBookmarks(config, view, commonMessages, timeCapability = false) {
        const { bookmarks, bookmarksPosition } = config;
        const uniqueId = "esri-bookmarksExpand";
        const node = view.ui.find(uniqueId);
        if (!bookmarks || view.type === "3d") {
            if (node) {
                view.ui.remove(node);
                node?.destroy();
            }
            return;
        }
        const group = _getPosition(bookmarksPosition);
        const tip = commonMessages?.tools?.bookmarks;
        const closeTip = commonMessages?.tools?.close?.bookmarks;
        if (node) {
            node.expandTooltip = tip;
            node.collapseTooltip = closeTip;
            node.expanded = false;
            node.group = group;
            view.ui.move(node, bookmarksPosition);
        }
        else {
            const bookmarks = new Bookmarks_1.default({
                view,
                viewModel: {
                    view,
                    capabilities: { time: timeCapability },
                },
            });
            const bookmarksExpand = new Expand_1.default({
                view,
                content: bookmarks,
                id: uniqueId,
                group,
                expandTooltip: tip,
                collapseTooltip: closeTip,
            });
            view.ui.add(bookmarksExpand, bookmarksPosition);
        }
    }
    exports.addBookmarks = addBookmarks;
    /**
     * Watch for changes in scalebar, scalebarPosition, scalebarDualMode (if applicable)
     */
    async function addScaleBar(config, view) {
        const { scalebar, scalebarPosition, scalebarDualMode } = config;
        const uniqueId = "esri-scale-bar";
        const node = view.ui.find(uniqueId);
        const map = view.map;
        const portal = map.portalItem?.portal;
        if (!scalebar || view.type === "3d") {
            if (node)
                view.ui.remove(node);
            return;
        }
        if (node) {
            node.unit = scalebarDualMode
                ? "dual"
                : portal?.units === "metric"
                    ? portal?.units
                    : "imperial";
            view.ui.move(node, scalebarPosition);
        }
        else {
            view.ui.add(new ScaleBar_1.default({
                id: uniqueId,
                view,
                unit: scalebarDualMode
                    ? "dual"
                    : portal?.units === "metric"
                        ? portal?.units
                        : "imperial",
            }), scalebarPosition);
        }
    }
    exports.addScaleBar = addScaleBar;
    /**
     * Watch for changes in layerList, layerListPosition, layerListOpenAtStart
     */
    async function addLayerList(config, view, commonMessages) {
        const { layerList, layerListPosition, layerListOpenAtStart } = config;
        const uniqueId = "esri-layerListExpand";
        const node = view.ui.find(uniqueId);
        if (!layerList) {
            view.ui.remove(node);
            return;
        }
        const group = _getPosition(layerListPosition);
        const tip = commonMessages?.tools?.layerList;
        const closeTip = commonMessages?.tools?.close?.layerList;
        if (node) {
            node.expandTooltip = tip;
            node.collapseTooltip = closeTip;
            node.expanded = layerListOpenAtStart;
            view.ui.move(node, layerListPosition);
        }
        else {
            const content = new LayerList_1.default({
                dragEnabled: true,
                visibleElements: {
                    errors: true,
                    filter: true,
                },
                view,
            });
            content?.when(() => {
                content.dragEnabled =
                    content?.operationalItems?.length <= 1 ? false : true;
            });
            const layerListExpand = new Expand_1.default({
                id: uniqueId,
                content,
                expanded: layerListOpenAtStart,
                expandTooltip: tip,
                collapseTooltip: closeTip,
                group,
                mode: "floating",
                view,
            });
            view.ui.add(layerListExpand, layerListPosition);
        }
    }
    exports.addLayerList = addLayerList;
    /**
     * Watch for changes in basemapTogglePosition, basemapToggle, basemapSelector
     */
    async function addBasemap(config, view) {
        const { basemapTogglePosition, basemapToggle, basemapSelector } = config;
        const uniqueId = "esri-basemapWidget";
        const map = view.map;
        const portal = map.portalItem?.portal;
        const { originalBasemap, nextBasemap } = await (0, basemapToggle_1.getBasemaps)({
            config,
            view,
            portal,
        });
        const node = view.ui.find(uniqueId);
        if (!basemapToggle) {
            if (node) {
                view.ui.remove(node);
                node.destroy();
            }
            return;
        }
        if (node) {
            view.ui.move(node, basemapTogglePosition);
            if (basemapSelector != null) {
                (0, basemapToggle_1.resetBasemapsInToggle)(node, originalBasemap, nextBasemap);
            }
        }
        else {
            const bmToggle = new BasemapToggle_1.default({
                view,
                nextBasemap,
                id: uniqueId,
            });
            (0, basemapToggle_1.resetBasemapsInToggle)(bmToggle, originalBasemap, nextBasemap);
            view.ui.add(bmToggle, basemapTogglePosition);
        }
    }
    exports.addBasemap = addBasemap;
    /**
     * Watch for changes in legend, legendPosition, legendOpenAtStart, legendConfig (if applicable)
     * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
     */
    async function addLegend(config, view, commonMessages) {
        const { legend, legendPosition, legendOpenAtStart, legendConfig } = config;
        const uniqueId = "esri-legendExpand";
        const node = view.ui.find(uniqueId);
        if (!legend) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const group = _getPosition(legendPosition);
        const tip = commonMessages?.tools?.legend;
        const closeTip = commonMessages?.tools?.close?.legend;
        if (node) {
            node.expandTooltip = tip;
            node.collapseTooltip = closeTip;
            legendOpenAtStart ? node.expand() : node.collapse();
            if (legendConfig != null) {
                const l = node.content;
                if (legendConfig?.style) {
                    l.style = legendConfig?.style;
                }
            }
            view.ui.move(node, legendPosition);
            node.group = group;
        }
        else {
            const content = new Legend_1.default({
                style: legendConfig?.style,
                view,
            });
            const legendExpand = new Expand_1.default({
                id: uniqueId,
                content,
                group,
                expanded: legendOpenAtStart,
                expandTooltip: tip,
                collapseTooltip: closeTip,
                mode: "floating",
                view,
            });
            view.ui.add(legendExpand, legendPosition);
        }
    }
    exports.addLegend = addLegend;
    /**
     * Watch for changes in fullScreen, fullScreenPosition
     */
    async function addFullscreen(config, view) {
        const { fullScreen, fullScreenPosition } = config;
        const uniqueId = "esri-fullscreen";
        const node = view.ui.find(uniqueId);
        if (!fullScreen) {
            if (node)
                view.ui.remove(node);
            return;
        }
        if (node) {
            view.ui.move(node, fullScreenPosition);
        }
        else {
            view.ui.add(new Fullscreen_1.default({
                id: uniqueId,
                view,
            }), fullScreenPosition);
        }
    }
    exports.addFullscreen = addFullscreen;
    /**
     * Watch for changes in compassWidget, compassWidgetPosition
     */
    async function addCompass(config, view) {
        const { compassWidget, compassWidgetPosition } = config;
        const uniqueId = "esri-compass";
        const node = view.ui.find(uniqueId);
        if (!compassWidget) {
            if (node)
                view.ui.remove(node);
            return;
        }
        if (node) {
            view.ui.move(node, compassWidgetPosition);
        }
        else {
            view.ui.add(new Compass_1.default({ view, id: uniqueId }), compassWidgetPosition);
        }
    }
    exports.addCompass = addCompass;
    /**
     * Watch for changes in locateWidget, locateWidgetPosition
     */
    async function addLocateWidget(config, view) {
        const { locateWidget, locateWidgetPosition } = config;
        const uniqueId = "esri-locate";
        const node = view.ui.find(uniqueId);
        if (!locateWidget) {
            if (node) {
                view.ui.remove(node);
            }
            return;
        }
        if (node && locateWidgetPosition != null) {
            view.ui.move(node, locateWidgetPosition);
        }
        else {
            view.ui.add(new Locate_1.default({ view, id: uniqueId }), locateWidgetPosition);
        }
    }
    exports.addLocateWidget = addLocateWidget;
    /**
     * Watch for changes in search, searchOpenAtStart, searchPosition, searchConfiguration, extentSelector, extentSelectorConfig, mapArea
     * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
     */
    async function addSearch(config, view, commonMessages) {
        const { search, searchPosition, searchOpenAtStart, searchConfiguration } = config;
        const popupHover = config?.popupHover;
        const uniqueId = "esri-searchExpand";
        let node = view.ui.find(uniqueId);
        if (node) {
            view.ui.remove(node);
            node?.destroy();
            node = null;
        }
        if (!search) {
            return;
        }
        const group = _getPosition(searchPosition);
        const tip = commonMessages?.tools?.search;
        const closeTip = commonMessages?.tools?.close?.search;
        const map = view.map;
        const portal = map.portalItem?.portal;
        const tmpSearchConfig = JSON.parse(JSON.stringify(searchConfiguration));
        const searchWidget = (0, search_1.createSearch)(view, portal, tmpSearchConfig);
        searchWidget.on("search-complete", () => {
            if (searchWidget.popupEnabled) {
                // Handle setting focus on popup and then back
                // to search box
                if (popupHover)
                    view.popupEnabled = true;
                (0, reactiveUtils_1.when)(() => view?.popup?.viewModel?.active === true, () => {
                    view.popup.focus();
                    (0, reactiveUtils_1.when)(() => view?.popup?.visible === false, () => {
                        searchWidget.focus();
                        if (popupHover)
                            view.popupEnabled = false;
                    }, { initial: true, once: true });
                }, { initial: true, once: true });
            }
        });
        node = new Expand_1.default({
            view,
            content: searchWidget,
            id: uniqueId,
            group,
            mode: "floating",
            collapseTooltip: closeTip,
            expandTooltip: tip,
            expanded: searchOpenAtStart,
        });
        view.ui.add(node, searchPosition);
        (0, search_1.handleSearchExtent)(config, node.content);
    }
    exports.addSearch = addSearch;
    /**
     * Watch for changes in share, sharePosition, shareIncludeEmbed (if applicable), shareIncludeSocial (if applicable)
     * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
     */
    async function addShare(config, view, commonMessages) {
        const { share, sharePosition, shareIncludeEmbed, shareIncludeSocial } = config;
        const uniqueId = "esri-instant-apps-share";
        const node = view.ui.find(uniqueId);
        if (!share) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const group = _getPosition(sharePosition);
        let socialShare;
        const tip = commonMessages?.tools?.share;
        const closeTip = commonMessages?.tools?.close?.share;
        if (node) {
            node.expandTooltip = tip;
            node.collapseTooltip = closeTip;
            node.group = group;
            view.ui.move(node, sharePosition);
            const container = node.container;
            socialShare = await (0, generalUtils_1.checkForElement)(container, "instant-apps-social-share");
            if (socialShare != null) {
                socialShare.view = view;
                socialShare.socialMedia = shareIncludeSocial;
                socialShare.embed = shareIncludeEmbed;
            }
        }
        else {
            const displayTipText = view?.type === "2d";
            socialShare = document.createElement("instant-apps-social-share");
            socialShare.mode = "inline";
            socialShare.scale = "s";
            socialShare.displayTipText = displayTipText;
            socialShare.view = view;
            socialShare.socialMedia = shareIncludeSocial;
            socialShare.embed = shareIncludeEmbed;
            const container = document.createElement("div");
            container.style.maxHeight = "50vh";
            container.style.overflowY = "auto";
            container.prepend(socialShare);
            const shareExpand = new Expand_1.default({
                id: uniqueId,
                content: container,
                expandIconClass: "esri-icon-share2",
                group,
                mode: "floating",
                expandTooltip: tip,
                collapseTooltip: closeTip,
                view,
            });
            view.ui.add(shareExpand, sharePosition);
        }
        return socialShare;
    }
    exports.addShare = addShare;
    /**
     * Watch for changes in keyboardShortcuts, keyboardShortcutsPosition
     * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
     */
    async function addKeyboardShortcuts(config, view, commonMessages) {
        const { keyboardShortcuts, keyboardShortcutsPosition } = config;
        const uniqueId = "esri-instant-apps-keyboard-shortcuts";
        const node = view.ui.find(uniqueId);
        if (!keyboardShortcuts) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const group = _getPosition(keyboardShortcutsPosition);
        const tip = commonMessages?.tools?.keyboard;
        const closeTip = commonMessages?.tools?.close?.keyboard;
        if (node) {
            node.expandTooltip = tip;
            node.collapseTooltip = closeTip;
            node.expanded = false;
            node.group = group;
            view.ui.move(node, keyboardShortcutsPosition);
            const container = node.container;
            const keyboard = (await (0, generalUtils_1.checkForElement)(container, "instant-apps-keyboard-shortcuts"));
            if (keyboard != null) {
                keyboard.view = view;
            }
        }
        else {
            const keyboardWidget = document.createElement("instant-apps-keyboard-shortcuts");
            keyboardWidget.view = view;
            const container = document.createElement("div");
            container.prepend(keyboardWidget);
            container.style.maxHeight = "50vh";
            container.style.overflowY = "auto";
            const keyboardExpand = new Expand_1.default({
                id: uniqueId,
                content: container,
                group,
                mode: "floating",
                expandTooltip: tip,
                collapseTooltip: closeTip,
                expandIcon: "keyboard",
                view,
            });
            view.ui.add(keyboardExpand, keyboardShortcutsPosition);
        }
    }
    exports.addKeyboardShortcuts = addKeyboardShortcuts;
    /**
     * Watch for changes in measure, measurePosition
     * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
     */
    async function addMeasurementTools(config, view, commonMessages) {
        const { measure, measurePosition } = config;
        const uniqueId = "esri-instant-apps-measurement";
        const node = view.ui.find(uniqueId);
        if (!measure) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const group = _getPosition(measurePosition);
        let measureTools;
        const tip = commonMessages?.tools?.measureTools;
        const closeTip = commonMessages?.tools?.close?.measureTools;
        if (node) {
            node.expandTooltip = tip;
            node.collapseTooltip = closeTip;
            node.expanded = false;
            node.group = group;
            view.ui.move(node, measurePosition);
            const container = node.container;
            measureTools = (await (0, generalUtils_1.checkForElement)(container, "instant-apps-measurement"));
            if (measureTools != null) {
                measureTools.view = view;
            }
        }
        else {
            measureTools = document.createElement("instant-apps-measurement");
            measureTools.areaUnit = "square-miles";
            measureTools.linearUnit = "miles";
            measureTools.activeToolType = "distance";
            measureTools.view = view;
            const container = document.createElement("div");
            container.prepend(measureTools);
            const measureExpand = new Expand_1.default({
                id: uniqueId,
                content: document.createElement("instant-apps-measurement"),
                group,
                mode: "floating",
                expandTooltip: tip,
                collapseTooltip: closeTip,
                expandIcon: "measure",
                view,
            });
            view.ui.add(measureExpand, measurePosition);
        }
    }
    exports.addMeasurementTools = addMeasurementTools;
    function _getPosition(position) {
        let groupName = "";
        if (typeof position === "string") {
            groupName = position;
        }
        else if (position?.position) {
            groupName = position.position;
        }
        return groupName;
    }
});
