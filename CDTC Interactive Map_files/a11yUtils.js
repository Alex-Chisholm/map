define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.goToOverride = exports.prefersReducedMotion = exports.postToLiveRegion = exports.setMapDescription = exports.getMapDescription = exports.setupLiveRegion = void 0;
    const liveRegionId = "a11y-live-region";
    function setupLiveRegion(params) {
        const root = params?.parent ?? document.body;
        const regionId = params?.id ?? liveRegionId;
        const mode = params?.mode ?? "polite";
        let region = root.querySelector(`#${regionId}`);
        if (!region) {
            region = document.createElement("div");
            region.id = regionId;
            region.classList.add("screen-readers-only");
            region.setAttribute("role", "alert");
            region.setAttribute("aria-live", mode);
            region.setAttribute("aria-atomic", "true");
            region.textContent = "";
            root.appendChild(region);
        }
        return region;
    }
    exports.setupLiveRegion = setupLiveRegion;
    function getMapDescription(config, view, portalItem) {
        let appitem, mapItem = null;
        if (portalItem) {
            appitem = portalItem?.snippet || portalItem?.description;
        }
        const mapPortalItem = view?.map?.portalItem;
        if (mapPortalItem) {
            mapItem = mapPortalItem?.snippet || mapPortalItem?.description;
        }
        return config?.mapA11yDesc || appitem || mapItem;
    }
    exports.getMapDescription = getMapDescription;
    function setMapDescription(view, mapA11yDesc, sanitizerInstance) {
        if (!view || !mapA11yDesc)
            return;
        if (typeof sanitizerInstance?.sanitize !== "function") {
            console.error("Invalid sanitizer instance. Aborting.");
            return;
        }
        // Constants for node IDs, class names, and aria attributes
        const MAP_DESC_NODE_ID = "mapDescription";
        const SR_ONLY_CLASS = "sr-only";
        const ROOT_VIEW_NODE_CLASS_NAME = "esri-view-surface";
        const ARIA_DESCRIBEDBY = "aria-describedby";
        // sr-only node
        const mapDescriptionNode = document.getElementById(MAP_DESC_NODE_ID);
        const sanitizedMapA11yDesc = sanitizerInstance.sanitize(mapA11yDesc);
        if (!mapDescriptionNode) {
            // Creates node to be read by screen reader, sets mapA11yDesc value, and appended to view container.
            const mapA11yDescContainer = document.createElement("div");
            mapA11yDescContainer.id = MAP_DESC_NODE_ID;
            mapA11yDescContainer.classList.add(SR_ONLY_CLASS);
            mapA11yDescContainer.innerHTML = sanitizedMapA11yDesc;
            view.container.appendChild(mapA11yDescContainer);
            // Iterates through esri view dom tree and sets 'aria-describedby' to 'mapDescription' to queried nodes
            const rootNode = document.getElementsByClassName(ROOT_VIEW_NODE_CLASS_NAME);
            view.container.setAttribute(ARIA_DESCRIBEDBY, MAP_DESC_NODE_ID);
            for (let k = 0; k < rootNode.length; k++) {
                rootNode[k].setAttribute(ARIA_DESCRIBEDBY, MAP_DESC_NODE_ID);
            }
        }
        else {
            mapDescriptionNode.innerHTML = sanitizedMapA11yDesc;
        }
    }
    exports.setMapDescription = setMapDescription;
    function postToLiveRegion(message, id) {
        const regionId = id ? id : liveRegionId;
        const region = document.body.querySelector(`#${regionId}`);
        if (region) {
            region.textContent = message;
        }
    }
    exports.postToLiveRegion = postToLiveRegion;
    function prefersReducedMotion() {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        return mediaQuery.matches ? true : false;
    }
    exports.prefersReducedMotion = prefersReducedMotion;
    function goToOverride(view, goToParams) {
        if (prefersReducedMotion()) {
            goToParams.options = {
                ...goToParams.options,
                animate: false,
            };
        }
        return view.goTo(goToParams.target, goToParams.options);
    }
    exports.goToOverride = goToOverride;
    exports.default = {
        setupLiveRegion,
        prefersReducedMotion,
        postToLiveRegion,
    };
});
