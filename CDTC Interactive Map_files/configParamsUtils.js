var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dojo/text!../../configParamsJSON/atlasConfigParams.json", "dojo/text!../../configParamsJSON/avConfigParams.json", "dojo/text!../../configParamsJSON/basicConfigParams.json", "dojo/text!../../configParamsJSON/categoryGalleryConfigParams.json", "dojo/text!../../configParamsJSON/chartsConfigParams.json", "dojo/text!../../configParamsJSON/countdownConfigParams.json", "dojo/text!../../configParamsJSON/exhibitConfigParams.json", "dojo/text!../../configParamsJSON/imageryViewerConfig.json", "dojo/text!../../configParamsJSON/insetConfigParams.json", "dojo/text!../../configParamsJSON/intLegendConfigParams.json", "dojo/text!../../configParamsJSON/managerConfigParams.json", "dojo/text!../../configParamsJSON/mediaConfigParams.json", "dojo/text!../../configParamsJSON/minimalistConfigParams.json", "dojo/text!../../configParamsJSON/nearbyConfigParams.json", "dojo/text!../../configParamsJSON/notifyConfigParams.json", "dojo/text!../../configParamsJSON/observerConfigParams.json", "dojo/text!../../configParamsJSON/portfolioConfigParams.json", "dojo/text!../../configParamsJSON/reporterConfigParams.json", "dojo/text!../../configParamsJSON/sidebarConfigParams.json", "dojo/text!../../configParamsJSON/dataSliderConfigParams.json", "dojo/text!../../configParamsJSON/streamflowConfigParams.json", "dojo/text!../../configParamsJSON/3dViewerConfigParams.json", "dojo/text!../../configParamsJSON/lookupConfigParams.json", "../CompatibilityChecker"], function (require, exports, atlasConfigParams_json_1, avConfigParams_json_1, basicConfigParams_json_1, categoryGalleryConfigParams_json_1, chartsConfigParams_json_1, countdownConfigParams_json_1, exhibitConfigParams_json_1, imageryViewerConfig_json_1, insetConfigParams_json_1, intLegendConfigParams_json_1, managerConfigParams_json_1, mediaConfigParams_json_1, minimalistConfigParams_json_1, nearbyConfigParams_json_1, notifyConfigParams_json_1, observerConfigParams_json_1, portfolioConfigParams_json_1, reporterConfigParams_json_1, sidebarConfigParams_json_1, dataSliderConfigParams_json_1, streamflowConfigParams_json_1, _3dViewerConfigParams_json_1, lookupConfigParams_json_1, CompatibilityChecker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateDefaultValuesObj = exports.getConfigParams = void 0;
    atlasConfigParams_json_1 = __importDefault(atlasConfigParams_json_1);
    avConfigParams_json_1 = __importDefault(avConfigParams_json_1);
    basicConfigParams_json_1 = __importDefault(basicConfigParams_json_1);
    categoryGalleryConfigParams_json_1 = __importDefault(categoryGalleryConfigParams_json_1);
    chartsConfigParams_json_1 = __importDefault(chartsConfigParams_json_1);
    countdownConfigParams_json_1 = __importDefault(countdownConfigParams_json_1);
    exhibitConfigParams_json_1 = __importDefault(exhibitConfigParams_json_1);
    imageryViewerConfig_json_1 = __importDefault(imageryViewerConfig_json_1);
    insetConfigParams_json_1 = __importDefault(insetConfigParams_json_1);
    intLegendConfigParams_json_1 = __importDefault(intLegendConfigParams_json_1);
    managerConfigParams_json_1 = __importDefault(managerConfigParams_json_1);
    mediaConfigParams_json_1 = __importDefault(mediaConfigParams_json_1);
    minimalistConfigParams_json_1 = __importDefault(minimalistConfigParams_json_1);
    nearbyConfigParams_json_1 = __importDefault(nearbyConfigParams_json_1);
    notifyConfigParams_json_1 = __importDefault(notifyConfigParams_json_1);
    observerConfigParams_json_1 = __importDefault(observerConfigParams_json_1);
    portfolioConfigParams_json_1 = __importDefault(portfolioConfigParams_json_1);
    reporterConfigParams_json_1 = __importDefault(reporterConfigParams_json_1);
    sidebarConfigParams_json_1 = __importDefault(sidebarConfigParams_json_1);
    dataSliderConfigParams_json_1 = __importDefault(dataSliderConfigParams_json_1);
    streamflowConfigParams_json_1 = __importDefault(streamflowConfigParams_json_1);
    _3dViewerConfigParams_json_1 = __importDefault(_3dViewerConfigParams_json_1);
    lookupConfigParams_json_1 = __importDefault(lookupConfigParams_json_1);
    const INSTANT_APPS_CONFIG_PARAMS_MAP = {
        [CompatibilityChecker_1.EAppTemplateType.Atlas]: atlasConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.AttachmentViewer]: avConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Basic]: basicConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.CategoryGallery]: categoryGalleryConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Charts]: chartsConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Countdown]: countdownConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Exhibit]: exhibitConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.ImageryApp]: imageryViewerConfig_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.InteractiveLegend]: intLegendConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Insets]: insetConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Manager]: managerConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Media]: mediaConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Minimalist]: minimalistConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Nearby]: nearbyConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Notify]: notifyConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Observer]: observerConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Portfolio]: portfolioConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Reporter]: reporterConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Sidebar]: sidebarConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Slider]: dataSliderConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.Streamflow]: streamflowConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.ThreeDViewer]: _3dViewerConfigParams_json_1.default,
        [CompatibilityChecker_1.EAppTemplateType.ZoneLookup]: lookupConfigParams_json_1.default,
    };
    function getConfigParams(template) {
        return JSON.parse(INSTANT_APPS_CONFIG_PARAMS_MAP[template]);
    }
    exports.getConfigParams = getConfigParams;
    function generateDefaultValuesObj(configParamsObj) {
        // Create initial object to return
        const defaultValues = {};
        const { config } = configParamsObj;
        // Iterate through sections
        config.forEach((section) => {
            const { content } = section;
            // Skip section if no content exists, i.e. map/scene sections
            if (!content)
                return;
            // Otherwise, trigger recursive logic
            handleConfigContent(section, defaultValues);
        });
        return defaultValues;
    }
    exports.generateDefaultValuesObj = generateDefaultValuesObj;
    function handleConfigContent(configObj, defaultValues) {
        const { content } = configObj;
        content.forEach((contentItem) => {
            const { type, id, defaultValue } = contentItem;
            if (type === "setting" && defaultValue === undefined)
                console.warn(`${id} does not have a default value defined.`);
            if (type === "setting")
                defaultValues[id] = defaultValue;
            // BASE CASE - continue recursive function call if current object has content
            if (contentItem.hasOwnProperty("content"))
                handleConfigContent(contentItem, defaultValues);
        });
    }
});
