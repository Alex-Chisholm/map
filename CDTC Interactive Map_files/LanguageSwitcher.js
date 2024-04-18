/*
  Copyright 2023 Esri
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/widgets/Expand", "esri/core/reactiveUtils", "esri/intl", "esri/intl", "../../functionality/configurationSettings", "./support/constants", "./support/enums", "../t9nUtils"], function (require, exports, decorators_1, widget_1, Widget_1, Expand_1, reactiveUtils_1, intl_1, intl, configurationSettings_1, constants_1, enums_1, t9nUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    Expand_1 = __importDefault(Expand_1);
    intl = __importStar(intl);
    let LanguageSwitcher = class LanguageSwitcher extends Widget_1.default {
        constructor(params) {
            super(params);
        }
        postInitialize() {
            this._portalItem = this.base?.results?.applicationItem?.value;
            if ((0, configurationSettings_1.isWithinConfigurationExperience)()) {
                window.addEventListener("message", (e) => {
                    if (e?.data?.type === "cats-app") {
                        this.setLanguageSwitcherUI(this.base.config, this.configurationSettings);
                    }
                }, false);
            }
        }
        destroy() {
            this.removeHandles(constants_1.HANDLES_KEY);
        }
        getLanguageSwitcherHandles(widgetProps) {
            this.addHandles((0, reactiveUtils_1.watch)(() => this.configurationSettings?.languageSwitcherConfig, () => {
                this.languageSwitcherConfigCallback(widgetProps);
            }, { initial: true }), constants_1.HANDLES_KEY);
            return [
                (0, reactiveUtils_1.watch)(() => this.configurationSettings?.languageSwitcher, () => this.languageSwitcherCallback(widgetProps, enums_1.ProperyNames.LanguageSwitcher), { initial: true }),
                (0, reactiveUtils_1.watch)(() => this.configurationSettings?.languageSwitcherOpenAtStart, () => this.languageSwitcherCallback(widgetProps, enums_1.ProperyNames.LanguageSwitcherOpenAtStart), { initial: true }),
                (0, reactiveUtils_1.watch)(() => this.configurationSettings?.languageSwitcherPosition, () => this.languageSwitcherCallback(widgetProps, enums_1.ProperyNames.LanguageSwitcherPosition), { initial: true }),
            ];
        }
        render() {
            const { configurationSettings, _portalItem } = this;
            const config = configurationSettings.languageSwitcherConfig;
            const icon = config?.icon ?? enums_1.Defaults.Icon;
            const locales = config?.locales;
            const defaultLocale = config?.defaultLocale ?? null;
            return ((0, widget_1.tsx)("instant-apps-language-switcher", { bind: this, afterCreate: widget_1.storeNode, class: constants_1.CSS.base, icon: icon, locales: locales, portalItem: _portalItem, defaultLocale: defaultLocale, onselectedLanguageUpdated: this.handleSelection, view: this.view, "data-node-ref": "langSwitcherNode" }));
        }
        setExpandGroup(expandGroup) {
            const languageSwitcher = this.view?.ui?.find(constants_1.NODE_ID);
            if (!languageSwitcher || !expandGroup)
                return;
            this.expandGroup = expandGroup;
            languageSwitcher.group = expandGroup;
        }
        async setLanguageSwitcherUI(config, configurationSettings) {
            const t9nData = this.selectedLanguageData?.data;
            if (!t9nData)
                return;
            const groupedConfigSettings = {};
            const settingKeys = Object.keys(t9nData);
            const setLanguageSwitcherUICallback = () => {
                return (key) => {
                    const IDs = this.getIDs(key);
                    const isGroup = IDs.length > 1;
                    const args = { key, t9nData, config };
                    if (isGroup) {
                        this.handleGroupedContent({ ...args, IDs, groupedConfigSettings });
                        return;
                    }
                    this.handleContent({ ...args, configurationSettings });
                };
            };
            settingKeys.forEach(setLanguageSwitcherUICallback());
            const updateGroupedContent = Object.keys(groupedConfigSettings).length > 0;
            if (updateGroupedContent)
                Object.assign(configurationSettings, groupedConfigSettings);
        }
        handleGroupedContent({ ...args }) {
            const { key, IDs, t9nData, config, groupedConfigSettings } = args;
            // grouped array item - searchConfiguration.sources-s8fg673, filterConfig.layerExpressions.expressions-a3bw528
            const isGroupedArray = IDs.length > 2;
            // group content - coverPage.titleText, searchConfiguration.allPlaceholder
            const isFlatGroup = IDs.length === 2;
            const uid = isGroupedArray ? IDs.pop() : null;
            const t9nValue = t9nData[key];
            const withinConfigurationExperience = this.configurationSettings?.["withinConfigurationExperience"];
            const [fieldName] = IDs;
            const currentValue = withinConfigurationExperience
                ? config?.draft?.[fieldName] ?? config?.[fieldName]
                : config?.[fieldName];
            if (currentValue == null)
                return;
            if (isGroupedArray) {
                const [fieldName, value] = this.handleGroupedArrayContent(IDs, currentValue, uid, t9nValue);
                groupedConfigSettings[fieldName] = value;
            }
            else if (isFlatGroup) {
                const [fieldName, value] = this.handleFlatGroupedContent(IDs, currentValue, t9nValue, groupedConfigSettings);
                groupedConfigSettings[fieldName] = value;
            }
        }
        handleGroupedArrayContent(IDs, currentValue, uid, t9nValue) {
            const [fieldName] = IDs;
            IDs.shift();
            // filterConfig.layerExpressions.expressions-a3bw528
            if (IDs.length > 2) {
                const [subsettingID, childSubsettingID, itemPropName] = IDs;
                const subsetting = currentValue[subsettingID];
                subsetting.forEach((subsettingItem) => {
                    const childSubsetting = subsettingItem[childSubsettingID];
                    childSubsetting.forEach((childSubsettingItem) => {
                        if (childSubsettingItem["_uid"] === uid) {
                            childSubsettingItem[itemPropName] = t9nValue;
                        }
                    });
                });
                return [fieldName, currentValue];
            }
            // searchConfiguration.sources-s8fg673
            else {
                const [subsettingID, itemPropName] = IDs;
                const subsetting = currentValue[subsettingID];
                subsetting.forEach((childSubsetting) => {
                    if (childSubsetting["_uid"] === uid) {
                        childSubsetting[itemPropName] = t9nValue;
                    }
                });
                return [fieldName, currentValue];
            }
        }
        handleFlatGroupedContent(IDs, currentValue, t9nValue, groupedConfigSettings) {
            const [fieldName, subsettingID] = IDs;
            currentValue[subsettingID] = t9nValue;
            const doesNotHaveGroupedConfigSetting = !groupedConfigSettings[fieldName];
            if (doesNotHaveGroupedConfigSetting)
                groupedConfigSettings[fieldName] = currentValue;
            const value = {
                ...groupedConfigSettings[fieldName],
                [subsettingID]: t9nValue,
            };
            return [fieldName, value];
        }
        handleContent({ ...args }) {
            const { configurationSettings, t9nData, key, config } = args;
            const withinConfigurationExperience = configurationSettings?.["withinConfigurationExperience"];
            const defaultLocaleValue = withinConfigurationExperience
                ? config?.draft?.[key]
                : config?.[key];
            const t9nValue = t9nData[key] ?? defaultLocaleValue;
            configurationSettings.set(key, t9nValue);
        }
        getIDs(key) {
            const subtrings = key.split("-");
            const subtrings2 = subtrings[0].split(".");
            const IDs = [...subtrings2, subtrings[1]].filter(Boolean);
            return IDs;
        }
        handleLanguageSwitcher(props) {
            const { config, propertyName } = props;
            const { languageSwitcher, languageSwitcherOpenAtStart, languageSwitcherConfig, languageSwitcherPosition, } = config;
            const node = this.view.ui.find(constants_1.NODE_ID);
            if (propertyName === enums_1.ProperyNames.LanguageSwitcher) {
                if (languageSwitcher) {
                    if (!node) {
                        const config = {
                            id: constants_1.NODE_ID,
                            content: this,
                            expandIcon: languageSwitcherConfig?.icon ?? enums_1.Defaults.Icon,
                            expanded: languageSwitcherOpenAtStart,
                            view: this.view,
                            mode: "floating",
                        };
                        if (this.expandTooltip)
                            config.expandTooltip = this.expandTooltip;
                        if (this.collapseTooltip)
                            config.collapseTooltip = this.collapseTooltip;
                        if (this.expandGroup)
                            config.group = this.expandGroup;
                        const expand = new Expand_1.default(config);
                        this.setupAutoUpdateStrings(expand);
                        this.view.ui.add(expand, languageSwitcherPosition ?? enums_1.Defaults.Position);
                    }
                }
                else {
                    if (node) {
                        this.view.ui.remove(node);
                    }
                }
            }
            else if (node &&
                propertyName === enums_1.ProperyNames.LanguageSwitcherOpenAtStart) {
                node.expanded = languageSwitcherOpenAtStart;
            }
            else if (node && propertyName === enums_1.ProperyNames.LanguageSwitcherPosition) {
                if (this.expandGroup)
                    node.group = this.expandGroup;
                this.view.ui.move(node, languageSwitcherPosition ?? enums_1.Defaults.Position);
            }
        }
        async refresh() {
            if (!this.langSwitcherNode)
                return;
            await this.langSwitcherNode.refresh();
            return Promise.resolve();
        }
        async handleSelection(e) {
            this._set("selectedLanguageData", e.detail);
            const data = e?.detail?.data;
            const isDefault = this.useDefaultLocaleStrings(data);
            const templateAppData = await this._portalItem.fetchData();
            const values = templateAppData?.values;
            const baseConfig = this.base.config;
            let config = { ...baseConfig, ...values };
            if (this.configurationSettings.withinConfigurationExperience)
                config = { ...config, ...values?.draft };
            if (isDefault) {
                intl.setLocale(this.getDefaultLanguage());
                try {
                    // Iterates fields that do not have a default value set in the app's config params JSON and sets the appropriate value i.e. title
                    this.processNoDefaultValues(config);
                    this.preventOverwrite(config);
                    Object.assign(this.configurationSettings, config);
                }
                catch (err) {
                    console.error("ERROR: ", err);
                }
            }
            else {
                intl.setLocale(e.detail?.locale);
                this.setLanguageSwitcherUI(config, this.configurationSettings);
            }
        }
        processNoDefaultValues(config) {
            constants_1.NO_DEFAULT_FIELDS.forEach((field) => {
                const value = config[field];
                if (value)
                    return;
                const processedValue = this.getProcessedValue(field, config[field]);
                config[field] = processedValue;
            });
        }
        getProcessedValue(fieldName, value) {
            switch (fieldName) {
                case "title":
                    const appItemTitle = this.base?.results?.applicationItem?.value?.title;
                    const { config, results } = this.base;
                    const { webMapItems } = results;
                    const validWebMapItems = webMapItems?.map((response) => response.value);
                    const item = validWebMapItems?.[0];
                    const title = config?.title
                        ? config.title
                        : appItemTitle
                            ? appItemTitle
                            : item?.title
                                ? item.title
                                : "";
                    return title;
                default:
                    return value ?? "";
            }
        }
        useDefaultLocaleStrings(data) {
            const defaultLanguage = this.getDefaultLanguage();
            const urlObj = new URL(window.location.href);
            const localeUrlParam = urlObj.searchParams.get("locale");
            return ((data?.locale === defaultLanguage ||
                data === null ||
                data === undefined) &&
                !localeUrlParam);
        }
        getDefaultLanguage() {
            // User profile - locale set in user profile
            const userProfileLocale = this.base.portal?.user?.culture;
            // Browser - window.navigator.language
            const browserLocale = window?.navigator?.language;
            // ArcGIS JS API - locale currently set in JS api
            const jsapiLocale = (0, intl_1.getLocale)();
            // Fallback locale - "en"
            const fallbackLocale = "en";
            return (0, intl_1.normalizeMessageBundleLocale)(userProfileLocale || browserLocale || jsapiLocale || fallbackLocale);
        }
        languageSwitcherCallback(widgetProps, propertyName) {
            widgetProps.propertyName = propertyName;
            const languageSwitcher = this.handleLanguageSwitcher(widgetProps);
            (0, reactiveUtils_1.when)(() => languageSwitcher, () => {
                (0, reactiveUtils_1.when)(() => this.selectedLanguageData, () => {
                    this.setLanguageSwitcherUI(this.base.config, this.configurationSettings);
                }, { initial: true, once: true });
            }, { initial: true, once: true });
        }
        async languageSwitcherConfigCallback(widgetProps) {
            const expand = widgetProps?.view?.ui?.find("esri-language-switcher");
            if (this.langSwitcherNode) {
                expand.expandIcon =
                    this.configurationSettings.languageSwitcherConfig.icon;
                this.langSwitcherNode.config =
                    this.configurationSettings.languageSwitcherConfig;
            }
            if ((0, configurationSettings_1.isWithinConfigurationExperience)())
                await this.refresh();
            this.setLanguageSwitcherUI(this.base.config, this.configurationSettings);
        }
        // Prevents the current values from being overwritten with a stale value
        preventOverwrite(config) {
            for (const key in config) {
                const keyLowerCase = key.toLowerCase();
                const isColor = keyLowerCase.includes("color");
                const isPosition = keyLowerCase.includes("position");
                const preventOverwrite = constants_1.PREVENT_OVERWRITE.indexOf(key) !== -1;
                if ((typeof config[key] !== "string" ||
                    isColor ||
                    isPosition ||
                    preventOverwrite) &&
                    !constants_1.GROUPED_CONTENT.includes(key)) {
                    delete config[key];
                }
            }
        }
        setupAutoUpdateStrings(expand) {
            if (this.messageBundleName &&
                this.expandTooltipKey &&
                this.collapseTooltipKey) {
                t9nUtils_1.autoUpdatedStrings.add({
                    obj: expand,
                    property: "expandTooltip",
                    bundleName: this.messageBundleName,
                    key: this.expandTooltipKey,
                });
                t9nUtils_1.autoUpdatedStrings.add({
                    obj: expand,
                    property: "collapseTooltip",
                    bundleName: this.messageBundleName,
                    key: this.collapseTooltipKey,
                });
            }
        }
    };
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "base", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "configurationSettings", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "view", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "handles", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "langSwitcherNode", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "expandTooltip", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "collapseTooltip", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "expandTooltipKey", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "collapseTooltipKey", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "messageBundleName", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], LanguageSwitcher.prototype, "expandGroup", void 0);
    __decorate([
        (0, decorators_1.property)({
            readOnly: true,
        })
    ], LanguageSwitcher.prototype, "selectedLanguageData", void 0);
    LanguageSwitcher = __decorate([
        (0, decorators_1.subclass)("LanguageSwitcher")
    ], LanguageSwitcher);
    exports.default = LanguageSwitcher;
});
