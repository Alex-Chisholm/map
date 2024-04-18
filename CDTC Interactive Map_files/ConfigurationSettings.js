var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "TemplatesCommonLib/baseClasses/configurationSettingsBase"], function (require, exports, decorators_1, configurationSettingsBase_1) {
    "use strict";
    configurationSettingsBase_1 = __importDefault(configurationSettingsBase_1);
    let ConfigurationSettings = class ConfigurationSettings extends configurationSettingsBase_1.default {
    };
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "appid", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "webmap", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "webscene", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "header", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "mapRotation", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "mapZoom", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "mapZoomPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "scalebar", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "scalebarPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "scalebarDualMode", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "compassWidget", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "compassWidgetPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "home", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "homePosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "keyboardShortcuts", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "keyboardShortcutsPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "languageSwitcher", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "languageSwitcherOpenAtStart", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "languageSwitcherPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "languageSwitcherConfig", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "disableScroll", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "search", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "searchPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "searchConfiguration", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "searchOpenAtStart", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "share", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "sharePosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "shareIncludeEmbed", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "shareIncludeSocial", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "screenshot", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "screenshotPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "selectedFeature", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "hiddenLayers", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "customTheme", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "theme", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "popupFixed", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "popupFixedPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "title", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "bookmarks", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "bookmarksPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "basemapToggle", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "basemapTogglePosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "nextBasemap", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "basemapSelector", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "layerList", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "layerListPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "layerListOpenAtStart", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "legend", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "legendPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "legendOpenAtStart", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "extentSelectorConfig", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "extentSelector", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "mapArea", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "mapAreaConfig", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "telemetry", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "googleAnalytics", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "googleAnalyticsKey", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "googleAnalyticsConsentMsg", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "googleAnalyticsConsent", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "mapA11yDesc", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "bundle", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "appBundle", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "type", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "locateWidget", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "locateWidgetPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "base", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "splash", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "splashContent", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "splashTitle", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "splashButtonText", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "splashButtonPosition", void 0);
    __decorate([
        decorators_1.property()
    ], ConfigurationSettings.prototype, "splashButtonIcon", void 0);
    ConfigurationSettings = __decorate([
        decorators_1.subclass("app.ConfigurationSettings")
    ], ConfigurationSettings);
    return ConfigurationSettings;
});
