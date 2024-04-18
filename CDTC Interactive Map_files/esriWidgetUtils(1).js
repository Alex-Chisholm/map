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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/widgets/Expand", "esri/intl"], function (require, exports, Expand_1, intl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createGoToProps = exports.addSplash = exports.addOverlay = exports.addBookmarks = exports.addScreenshot = void 0;
    Expand_1 = __importDefault(Expand_1);
    const instantBundleName = "instant/../t9n/common";
    function _findNode(className) {
        const mainNodes = document.getElementsByClassName(className);
        let node = null;
        for (let j = 0; j < mainNodes.length; j++) {
            node = mainNodes[j];
        }
        return node ? node : null;
    }
    async function addScreenshot(props) {
        const { view, config, propertyName } = props;
        const { screenshot, screenshotPosition, legend, popupHover, bundle } = config;
        const node = view.ui.find("screenshotExpand");
        if (!screenshot) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const Screenshot = await new Promise((resolve_1, reject_1) => { require(["../components/Screenshot/Screenshot"], resolve_1, reject_1); }).then(__importStar);
        // move the node if it exists
        const group = _getPosition(screenshotPosition);
        if (propertyName === "screenshotPosition" && node) {
            view.ui.move(node, screenshotPosition);
            node.group = group;
        }
        else if (propertyName === "screenshot") {
            const content = new Screenshot.default({
                view,
                enableLegendOption: legend ? true : false,
                enablePopupOption: popupHover ? false : true,
                includeLayoutOption: legend || !popupHover ? true : false,
                includePopupInScreenshot: false,
                includeLegendInScreenshot: false
            });
            const tip = `${bundle.tools.screenshot}`;
            const screenshotExpand = new Expand_1.default({
                id: "screenshotExpand",
                content,
                mode: "floating",
                group,
                collapseTooltip: tip,
                expandTooltip: tip,
                view
            });
            view.ui.add(screenshotExpand, screenshotPosition);
            intl_1.onLocaleChange(async () => {
                const b = await intl_1.fetchMessageBundle(instantBundleName);
                if (b?.tools?.search) {
                    screenshotExpand.collapseTooltip = b.tools.screenshot;
                    screenshotExpand.expandTooltip = b.tools.screenshot;
                }
            });
        }
        else if (propertyName === "popupHover" && node) {
            const ss = node?.content;
            if (ss)
                ss.enablePopupOption = !popupHover;
        }
    }
    exports.addScreenshot = addScreenshot;
    async function addBookmarks(props) {
        // TODO update to use TCL widget utils once we
        // add a 3d bookmark component
        const { view, config, propertyName } = props;
        const { bookmarks, bookmarksPosition, bundle, type } = config;
        const item = view?.map;
        let itemType = type;
        if (item?.portalItem?.type) {
            itemType = item.portalItem.type === "Web Map" ? "webmap" : "webscene";
        }
        const node = view.ui.find("bookmarksExpand");
        // check to see if the web map has bookmarks
        let map;
        let mapContainsBookmarks;
        if (itemType === "webmap") {
            map = view.map;
            mapContainsBookmarks = map?.bookmarks?.length > 0 ? true : false;
        }
        else {
            map = view.map;
            mapContainsBookmarks = map?.presentation?.slides?.length > 0 ? true : false;
        }
        if (!bookmarks || !mapContainsBookmarks) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const Bookmarks = itemType === "webmap" ? await new Promise((resolve_2, reject_2) => { require(["esri/widgets/Bookmarks"], resolve_2, reject_2); }).then(__importStar) : await new Promise((resolve_3, reject_3) => { require(["../components/Slides"], resolve_3, reject_3); }).then(__importStar);
        // move the node if it exists
        const group = _getPosition(bookmarksPosition);
        if (propertyName === "bookmarksPosition" && node) {
            view.ui.move(node, bookmarksPosition);
            node.group = group;
        }
        else if (propertyName === "bookmarks") {
            const content = new Bookmarks.default({
                view,
                viewModel: {
                    view,
                    capabilities: { time: false }
                }
            });
            const tip = `${bundle.tools.bookmarks}`;
            const bookmarksExpand = new Expand_1.default({
                id: "bookmarksExpand",
                content,
                group,
                collapseTooltip: tip,
                expandTooltip: tip,
                mode: "floating",
                view
            });
            intl_1.onLocaleChange(async () => {
                const b = await intl_1.fetchMessageBundle(instantBundleName);
                if (b?.tools?.search) {
                    bookmarksExpand.collapseTooltip = b.tools.bookmarks;
                    bookmarksExpand.expandTooltip = b.tools.bookmarks;
                }
            });
            view.ui.add(bookmarksExpand, bookmarksPosition);
        }
    }
    exports.addBookmarks = addBookmarks;
    async function addOverlay(props) {
        const { view, config, propertyName } = props;
        const { disableScroll, theme } = config;
        const ScrollOverlay = await new Promise((resolve_4, reject_4) => { require(["../components/ScrollOverlay"], resolve_4, reject_4); }).then(__importStar);
        const node = _findNode("scroll-overlay");
        if (!disableScroll) {
            // update view nav
            if (node)
                view.ui.remove(node);
            view.navigation.mouseWheelZoomEnabled = true;
            view.navigation.browserTouchPanEnabled = true;
            return;
        }
        else if (propertyName === "disableScroll" && !node) {
            // add
            const overlay = new ScrollOverlay.default({
                ...props,
                container: document.createElement("div")
            });
            view.ui.add(overlay, "manual");
        }
    }
    exports.addOverlay = addOverlay;
    async function addSplash(props) {
        const { view, config, propertyName } = props;
        const { splash, splashButtonPosition, bundle, splashButtonIcon } = config;
        const splashPanelNode = document.getElementById("splashPanel");
        const node = view.ui.find("splashButton");
        const infoNode = view.ui.find("infoExpand");
        if (infoNode) {
            view.ui.remove(infoNode);
            if (splashPanelNode) {
                splashPanelNode.innerHTML = null;
            }
        }
        if (!splash) {
            if (node)
                view.ui.remove(node);
            return;
        }
        const SplashPanel = await new Promise((resolve_5, reject_5) => { require(["../components/Splash"], resolve_5, reject_5); }).then(__importStar);
        // move the node if it exists
        if (propertyName === "splashButtonPosition") {
            view.ui.move(node, splashButtonPosition);
        }
        else if (propertyName === "splash") {
            // create panel content
            props.container = document.createElement("instant-apps-splash");
            const panel = new SplashPanel.default(props);
            document.body.appendChild(panel?.container);
            const splashButton = document.createElement("calcite-action");
            splashButton.classList.add("esri-splash-button", "esri-widget--button", "esri-widget", "esri-interactive");
            splashButton.title = bundle.tools.splash;
            splashButton.icon = splashButtonIcon || "information";
            splashButton.id = "splashButton";
            view.ui.add(splashButton, splashButtonPosition);
            splashButton.addEventListener("click", () => {
                const splash = document.querySelector("instant-apps-splash");
                if (splash)
                    splash.open = true;
            });
        }
        else if (node && propertyName === "splashButtonIcon") {
            const btn = document.getElementById("splashButton");
            if (btn) {
                btn.icon = splashButtonIcon;
            }
        }
    }
    exports.addSplash = addSplash;
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
    function _getPosition(position) {
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
});
