var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/Collection", "esri/core/promiseUtils"], function (require, exports, Collection_1, promiseUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompatibilityChecker = exports.EAppTemplateType = void 0;
    Collection_1 = __importDefault(Collection_1);
    /** Identifies all Instant App Templates by url (We use url because it is the same between locales) */
    var EAppTemplateType;
    (function (EAppTemplateType) {
        EAppTemplateType["ThreeDViewer"] = "/apps/instant/3dviewer/index.html";
        EAppTemplateType["Atlas"] = "/apps/instant/atlas/index.html";
        EAppTemplateType["AttachmentViewer"] = "/apps/instant/attachmentviewer/index.html";
        EAppTemplateType["Basic"] = "/apps/instant/basic/index.html";
        EAppTemplateType["CategoryGallery"] = "/apps/instant/filtergallery/index.html";
        EAppTemplateType["Charts"] = "/apps/instant/charts/index.html";
        EAppTemplateType["Countdown"] = "/apps/instant/countdown/index.html";
        EAppTemplateType["Exhibit"] = "/apps/instant/exhibit/index.html";
        EAppTemplateType["Insets"] = "/apps/instant/insets/index.html";
        EAppTemplateType["InteractiveLegend"] = "/apps/instant/interactivelegend/index.html";
        EAppTemplateType["ImageryApp"] = "/apps/instant/imageryviewer/index.html";
        EAppTemplateType["Manager"] = "/apps/instant/manager/index.html";
        EAppTemplateType["Media"] = "/apps/instant/media/index.html";
        EAppTemplateType["Minimalist"] = "/apps/instant/minimalist/index.html";
        EAppTemplateType["Nearby"] = "/apps/instant/nearby/index.html";
        EAppTemplateType["Notify"] = "/apps/instant/notification/index.html";
        EAppTemplateType["Observer"] = "/apps/instant/observer/index.html";
        EAppTemplateType["Portfolio"] = "/apps/instant/portfolio/index.html";
        EAppTemplateType["Reporter"] = "/apps/instant/reporter/index.html";
        EAppTemplateType["Sidebar"] = "/apps/instant/sidebar/index.html";
        EAppTemplateType["Slider"] = "/apps/instant/slider/index.html";
        EAppTemplateType["Streamflow"] = "/apps/instant/streamflowviewer/index.html";
        EAppTemplateType["ZoneLookup"] = "/apps/instant/lookup/index.html";
    })(EAppTemplateType = exports.EAppTemplateType || (exports.EAppTemplateType = {}));
    var EResourceType;
    (function (EResourceType) {
        EResourceType[EResourceType["Webmap"] = 0] = "Webmap";
        EResourceType[EResourceType["Webscene"] = 1] = "Webscene";
        EResourceType[EResourceType["Group"] = 2] = "Group";
        EResourceType[EResourceType["Unknown"] = 3] = "Unknown";
    })(EResourceType || (EResourceType = {}));
    var ERequirementType;
    (function (ERequirementType) {
        ERequirementType[ERequirementType["UnsupportedRenderers_FeatureLayer"] = 0] = "UnsupportedRenderers_FeatureLayer";
        ERequirementType[ERequirementType["UnsupportedRenderers_Renderer"] = 1] = "UnsupportedRenderers_Renderer";
        ERequirementType[ERequirementType["PopupDisabled"] = 2] = "PopupDisabled";
        ERequirementType[ERequirementType["ImageryCondition"] = 3] = "ImageryCondition";
        ERequirementType[ERequirementType["AttachmentsCondition"] = 4] = "AttachmentsCondition";
        ERequirementType[ERequirementType["ChartsCondition"] = 5] = "ChartsCondition";
    })(ERequirementType || (ERequirementType = {}));
    /** Mapping of all Resource Types to the Templates that they're not compatible with */
    const EResourceType_to_AppType_Mapping = {
        [EResourceType.Webmap]: [
            EAppTemplateType.ThreeDViewer,
            EAppTemplateType.CategoryGallery,
            EAppTemplateType.Observer,
        ],
        [EResourceType.Webscene]: [
            EAppTemplateType.AttachmentViewer,
            EAppTemplateType.Atlas,
            EAppTemplateType.CategoryGallery,
            EAppTemplateType.Charts,
            EAppTemplateType.ImageryApp,
            EAppTemplateType.Insets,
            EAppTemplateType.InteractiveLegend,
            EAppTemplateType.Manager,
            EAppTemplateType.Media,
            EAppTemplateType.Minimalist,
            EAppTemplateType.Nearby,
            EAppTemplateType.Notify,
            EAppTemplateType.Reporter,
            EAppTemplateType.Sidebar,
            EAppTemplateType.Slider,
            EAppTemplateType.Streamflow,
            EAppTemplateType.ZoneLookup,
        ],
        [EResourceType.Group]: [
            EAppTemplateType.AttachmentViewer,
            EAppTemplateType.Basic,
            EAppTemplateType.Charts,
            EAppTemplateType.Countdown,
            EAppTemplateType.Exhibit,
            EAppTemplateType.ImageryApp,
            EAppTemplateType.Insets,
            EAppTemplateType.InteractiveLegend,
            EAppTemplateType.Manager,
            EAppTemplateType.Media,
            EAppTemplateType.Minimalist,
            EAppTemplateType.Nearby,
            EAppTemplateType.Notify,
            EAppTemplateType.Observer,
            EAppTemplateType.Portfolio,
            EAppTemplateType.Reporter,
            EAppTemplateType.Sidebar,
            EAppTemplateType.Slider,
            EAppTemplateType.Streamflow,
            EAppTemplateType.ThreeDViewer,
            EAppTemplateType.ZoneLookup,
        ],
    };
    /**
     * Contains methods for determining if a resource is compatible with a template app.
     * If resource is not compatible with template app type, will return the string that indicates why
     * it is not compatible.
     *
     * Because of Localization, we must pass in the "not compatible" strings that get returned
     *
     * const compatChecks = new CompatibilityChecks({
     *   resourceStrings:{ ... etc },
     *   requirementStrings:{ ... etc }
     * });
     *
     * // usage example
     * compatChecks.checkSpecificTemplates(webmap, EAppType.AttachmentViewer ---> (or just pass in the urlFragment(ex: "/apps/instant/3dviewer/index.html")))
     */
    class CompatibilityChecker {
        constructor(props) {
            this._Template_to_Function_Map = {
                [EAppTemplateType.AttachmentViewer]: this._testAttachmentsCondition,
                [EAppTemplateType.Charts]: this._testChartsCondition,
                [EAppTemplateType.ImageryApp]: this._testImageryCondition,
                [EAppTemplateType.InteractiveLegend]: this._testUnsupportedRenderers,
                [EAppTemplateType.Nearby]: this._testPopupDisabled,
                [EAppTemplateType.ZoneLookup]: this._testPopupDisabled,
            };
            this._requirementsMessagesMap = {};
            this._resourceMessagesMap = {};
            const { requirementsMessages, resourceMessages } = props;
            this._requirementsMessagesMap = {
                [ERequirementType.AttachmentsCondition]: requirementsMessages.AttachmentViewer,
                [ERequirementType.ChartsCondition]: requirementsMessages.ChartViewer,
                [ERequirementType.ImageryCondition]: requirementsMessages.ImageryViewer,
                [ERequirementType.UnsupportedRenderers_FeatureLayer]: requirementsMessages.InteractiveLegend,
                [ERequirementType.UnsupportedRenderers_Renderer]: requirementsMessages.InteractiveLegend,
                [ERequirementType.PopupDisabled]: requirementsMessages.Nearby,
            };
            this._resourceMessagesMap = {
                [EAppTemplateType.AttachmentViewer]: resourceMessages.Webmap,
                [EAppTemplateType.Atlas]: resourceMessages.Group,
                [EAppTemplateType.Basic]: resourceMessages.WebmapOrWebscene,
                [EAppTemplateType.CategoryGallery]: resourceMessages.Group,
                [EAppTemplateType.Charts]: resourceMessages.Webmap,
                [EAppTemplateType.Countdown]: resourceMessages.WebmapOrWebscene,
                [EAppTemplateType.Exhibit]: resourceMessages.WebmapOrWebscene,
                [EAppTemplateType.ImageryApp]: resourceMessages.Webmap,
                [EAppTemplateType.Insets]: resourceMessages.Webmap,
                [EAppTemplateType.InteractiveLegend]: resourceMessages.Webmap,
                [EAppTemplateType.Manager]: resourceMessages.Webmap,
                [EAppTemplateType.Media]: resourceMessages.Webmap,
                [EAppTemplateType.Minimalist]: resourceMessages.Webmap,
                [EAppTemplateType.Nearby]: resourceMessages.Webmap,
                [EAppTemplateType.Notify]: resourceMessages.Webmap,
                [EAppTemplateType.Observer]: resourceMessages.Webscene,
                [EAppTemplateType.Portfolio]: resourceMessages.WebmapOrWebscene,
                [EAppTemplateType.Reporter]: resourceMessages.Webmap,
                [EAppTemplateType.Sidebar]: resourceMessages.Webmap,
                [EAppTemplateType.Slider]: resourceMessages.Webmap,
                [EAppTemplateType.Streamflow]: resourceMessages.Webmap,
                [EAppTemplateType.ThreeDViewer]: resourceMessages.Webscene,
                [EAppTemplateType.ZoneLookup]: resourceMessages.Webmap,
            };
        }
        ///////////////////////////
        //// Public Methods
        ///////////////////////////
        /** Check one Resource for all possible not-compatible app templates */
        async checkAllTemplates(resource) {
            const resourceType = await this._identifyResource(resource);
            const appTemplateTypeKeys = Object.keys(EAppTemplateType);
            const checkPromises = appTemplateTypeKeys.map((key) => {
                return this.checkSpecificTemplate(resource, EAppTemplateType[key], resourceType);
            });
            const checkResults = await Promise.allSettled(checkPromises);
            const resultMap = new Map();
            appTemplateTypeKeys.forEach((key, index) => {
                resultMap.set(EAppTemplateType[key], checkResults[index]?.value);
            });
            return resultMap;
        }
        /**
         * Check one Resource for any compatibility issues with a specific app template
         */
        async checkSpecificTemplate(resource, template, resourceType) {
            const foundResourceType = resourceType != null
                ? resourceType
                : await this._identifyResource(resource);
            // check for resource not-compats
            if (this._isTemplateCompatWithResource(foundResourceType, template)) {
                if (resource === "group") {
                    // skip groups --- there are no requirements checks yet
                    return null;
                }
                // check requirement for template
                await resource?.loadAll();
                const requirementFunc = this._Template_to_Function_Map[template];
                if (requirementFunc == null) {
                    return null;
                }
                let requirement = requirementFunc(resource);
                if (requirement?.then != null) {
                    requirement = await requirement;
                }
                const msg = this._requirementsMessagesMap[requirement];
                return requirement != null ? msg : null;
            }
            else {
                // template is not compatible with resource
                return this._resourceMessagesMap[template];
            }
        }
        ///////////////////////////
        //// Private Methods
        ///////////////////////////
        async _identifyResource(resource) {
            if (resource === "group") {
                return EResourceType.Group;
            }
            else {
                try {
                    await resource?.loadAll();
                }
                catch (err) {
                    console.error(err);
                }
                if (resource?.portalItem?.type === "Web Map") {
                    return EResourceType.Webmap;
                }
                else if (resource?.portalItem?.type === "Web Scene") {
                    return EResourceType.Webscene;
                }
                else {
                    return EResourceType.Unknown;
                }
            }
        }
        /** Finds the EAppTemplateType[] that are not compatible with the resource */
        _isTemplateCompatWithResource(resourceType, template) {
            return !EResourceType_to_AppType_Mapping[resourceType].includes(template);
        }
        async _testUnsupportedRenderers(webmap) {
            let atLeastOneSupportedRenderer = false;
            let atLeastOneFeatureLayer = false;
            webmap?.allLayers?.map((layer) => {
                const type = layer?.type;
                if (type === "group") {
                    return;
                }
                if (type !== "feature") {
                    return;
                }
                atLeastOneFeatureLayer = atLeastOneFeatureLayer || true;
                const featureLayer = layer;
                let isLayerRendererSupported = true;
                // PROPS SET BY ARCADE
                const field2 = featureLayer?.renderer?.get("field2");
                const field3 = featureLayer?.renderer?.get("field3");
                const fieldDelimiter = featureLayer?.renderer?.get("fieldDelimiter");
                if ((field2 || field3) && fieldDelimiter) {
                    isLayerRendererSupported = false;
                }
                if (featureLayer?.renderer?.type === "unique-value" ||
                    featureLayer?.renderer?.type === "class-breaks") {
                    // CHECK VISUAL VARIABLES for color ramp, size ramp, opacity ramp
                    const renderer = featureLayer.renderer;
                    renderer?.visualVariables?.forEach((visualVariable) => {
                        if (visualVariable.type === "size" ||
                            visualVariable.type === "color" ||
                            visualVariable.type === "opacity") {
                            const rendererAuthoringInfoType = renderer?.authoringInfo?.type;
                            if (rendererAuthoringInfoType === "class-breaks-color" ||
                                rendererAuthoringInfoType === "class-breaks-size" ||
                                featureLayer?.renderer?.type === "unique-value") {
                                return;
                            }
                            isLayerRendererSupported = false;
                        }
                    });
                }
                if (featureLayer?.renderer?.type === "heatmap" ||
                    featureLayer?.renderer?.type === "dot-density") {
                    isLayerRendererSupported = false;
                }
                // SINGLE SYMBOL(UNIQUE SYMBOL) - CLUSTERING ENABLED.
                // Drawing style is similar to Counts and Amounts (Size/Color) Classify Data Unchecked which is unsupported.
                const simpleRenderer = (featureLayer?.renderer?.type === "simple" ? featureLayer.renderer : null);
                const vvSizeArr = simpleRenderer?.visualVariables?.filter((visualVariable) => visualVariable.type === "size");
                if ((simpleRenderer && featureLayer?.featureReduction) ||
                    (vvSizeArr?.length > 0 && featureLayer?.featureReduction)) {
                    isLayerRendererSupported = false;
                }
                // *** accumulate supportedRenderer info ***
                // (if isLayerRendererSupported is true, we know this layer is supported, and with the || it will turn atLeastOneSupportedRenderer to true)
                atLeastOneSupportedRenderer =
                    atLeastOneSupportedRenderer || isLayerRendererSupported;
            });
            if (!atLeastOneFeatureLayer) {
                return ERequirementType.UnsupportedRenderers_FeatureLayer;
            }
            else if (!atLeastOneSupportedRenderer) {
                return ERequirementType.UnsupportedRenderers_Renderer;
            }
            else {
                return null;
            }
        }
        /**
         * If there does not exist at least one layer in the webmap which has type "imagery" or "imagery-tile",
         *    return ERequirementType.ImageryCondition, else return null (Compatible)
         */
        _testImageryCondition(webmap) {
            let atLeastOneImageryLayer = webmap?.allLayers
                ?.map((layer) => {
                return layer.type === "imagery" || layer.type === "imagery-tile";
            })
                .reduce((acc, curr) => {
                return acc || curr;
            }, false);
            return !atLeastOneImageryLayer ? ERequirementType.ImageryCondition : null;
        }
        /**
         * If there does not exist at least one layer in the webmap with attachments,
         *    return ERequirementType.AttachmentsCondition, else return null (Compatible)
         */
        _testAttachmentsCondition(webmap) {
            return new Promise((res, rej) => {
                let isPassing = false;
                const layerPromises = (0, promiseUtils_1.eachAlways)(webmap?.allLayers?.map((layer) => {
                    return layer.load().then(() => {
                        if (layer.type === "feature") {
                            const featureLayer = layer;
                            if (featureLayer.capabilities?.operations
                                ?.supportsQueryAttachments ||
                                featureLayer.capabilities?.data?.supportsAttachment) {
                                isPassing = isPassing || true;
                            }
                        }
                    });
                }));
                layerPromises.then(() => {
                    if (!isPassing) {
                        res(ERequirementType.AttachmentsCondition);
                    }
                    else {
                        res(null);
                    }
                });
            });
        }
        _testChartsCondition(webmap) {
            const chartsAvailable = webmap?.allLayers
                .filter((layer) => layer.type === "feature")
                .some((flayer) => {
                const flayerWithCharts = flayer.get("charts");
                return flayerWithCharts;
            }) ||
                webmap?.allTables
                    .filter((table) => table.type === "feature")
                    .some((featureTable) => {
                    const fTableWithCharts = featureTable?.charts;
                    return fTableWithCharts;
                });
            return !chartsAvailable ? ERequirementType.ChartsCondition : null;
        }
        /**
         * If all layers in the webmap have popups disabled,
         *    return EWebmapNotCompatible.PopupDisabled, else return null (Compatible)
         */
        _testPopupDisabled(webmap) {
            const excludeTypes = new Collection_1.default([
                "tile",
                "base-tile",
                "imagery-tile",
                "vector-tile",
                "web-tile",
            ]);
            let atLeastOnePopupEnabled = webmap?.allLayers
                ?.filter((layer) => {
                return !excludeTypes.includes(layer.type);
            })
                .map((layer) => {
                return layer.get("popupEnabled");
            })
                .reduce((acc, curr) => {
                return acc || curr;
            }, false);
            return !atLeastOnePopupEnabled ? ERequirementType.PopupDisabled : null;
        }
    }
    exports.CompatibilityChecker = CompatibilityChecker;
});
