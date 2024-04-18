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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "TemplatesCommonLib/baseClasses/support/itemUtils", "TemplatesCommonLib/structuralFunctionality/t9nUtils", "esri/core/promiseUtils", "TemplatesCommonLib/baseClasses/support/domHelper", "esri/core/Handles", "TemplatesCommonLib/structuralFunctionality/language-switcher/LanguageSwitcher", "./ConfigurationSettings", "esri/core/urlUtils", "TemplatesCommonLib/structuralFunctionality/telemetry/telemetry", "esri/geometry/support/jsonUtils", "./utils/themeUtils", "TemplatesCommonLib/baseClasses/support/urlUtils", "./components/Header", "esri/core/reactiveUtils", "ArcGISHTMLSanitizer", "TemplatesCommonLib/functionality/securityUtils", "esri/widgets/Popup", "TemplatesCommonLib/structuralFunctionality/a11yUtils", "esri/geometry", "./utils/utils", "TemplatesCommonLib/functionality/esriWidgetUtils", "./utils/esriWidgetUtils"], function (require, exports, itemUtils_1, t9nUtils_1, promiseUtils_1, domHelper_1, Handles_1, LanguageSwitcher_1, ConfigurationSettings_1, urlUtils_1, telemetry_1, jsonUtils_1, themeUtils_1, urlUtils_2, Header_1, reactiveUtils_1, ArcGISHTMLSanitizer_1, securityUtils_1, Popup_1, a11yUtils_1, geometry_1, utils_1, esriWidgetUtils_1, esriWidgetUtils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Handles_1 = __importDefault(Handles_1);
    LanguageSwitcher_1 = __importDefault(LanguageSwitcher_1);
    ConfigurationSettings_1 = __importDefault(ConfigurationSettings_1);
    telemetry_1 = __importDefault(telemetry_1);
    Header_1 = __importDefault(Header_1);
    ArcGISHTMLSanitizer_1 = __importDefault(ArcGISHTMLSanitizer_1);
    Popup_1 = __importDefault(Popup_1);
    const CSS = {
        loading: "configurable-application--loading"
    };
    const SEARCH_PARAMS = new URL(window.location.href)?.searchParams;
    class Main {
        constructor() {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  ApplicationBase
            //----------------------------------
            this.base = null;
            this._telemetry = null;
            this._appConfig = null;
            this._handles = null;
            this._hoverHandler = null;
            this._header = null;
            this._sanitizer = securityUtils_1.createSanitizerInstance(ArcGISHTMLSanitizer_1.default);
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        init(base) {
            if (!base) {
                console.error("ApplicationBase is not defined");
                return;
            }
            this._handles = new Handles_1.default();
            promiseUtils_1.eachAlways([
                t9nUtils_1.handleT9N("basic", "basic", "basic/app/t9n/common"),
                t9nUtils_1.handleT9N("instant", "instant", "instant/../t9n/common")
            ]).then((results) => {
                const [appBundle, bundle] = results;
                base.config.bundle = bundle?.value;
                base.config.appBundle = appBundle?.value;
                this.base = base;
                this.createApp();
                document.body.classList.remove(CSS.loading);
            });
        }
        async createApp() {
            const { config, results } = this.base;
            const { webmap, webscene } = config;
            // check for url params and set item type if needed
            const urlParams = urlUtils_1.urlToObject(document?.location?.toString());
            if (urlParams?.query?.webscene ||
                (webmap === "default" && webscene !== "default" && webscene !== null && webscene !== undefined)) {
                config.type = "webscene";
            }
            this._appConfig = new ConfigurationSettings_1.default(config);
            themeUtils_1.updateThemeConfig(this._appConfig);
            this.createTelemetry();
            let { type } = this._appConfig;
            const { webMapItems, webSceneItems } = results;
            let items;
            if (type === "webmap") {
                items = webMapItems.map((response) => {
                    return response.value;
                });
            }
            if (type === "webscene") {
                items = webSceneItems.map((response) => {
                    return response.value;
                });
            }
            const item = items?.length > 0 ? items[0] : null;
            if (!item) {
                // show error page
                document.location.href = `../../shared/unavailable/index.html?appid=${this.base.config?.appid || null}`;
                return;
            }
            let { title } = this._appConfig;
            if (!title) {
                title = this?.base?.results?.applicationItem?.value?.title
                    ? this?.base?.results?.applicationItem?.value?.title
                    : itemUtils_1.getItemTitle(item);
            }
            this._appConfig.title = title;
            domHelper_1.setPageTitle(title);
            const portalItem = this.base.results.applicationItem.value;
            const appProxies = portalItem && portalItem.applicationProxies ? portalItem.applicationProxies : null;
            const viewContainerNode = document.getElementById("viewContainer");
            const defaultViewProperties = itemUtils_1.getConfigViewProperties(config);
            const viewNode = document.createElement("div");
            viewContainerNode.appendChild(viewNode);
            const container = {
                container: viewNode
            };
            const viewProperties = {
                ...defaultViewProperties,
                ...container
            };
            new Header_1.default({
                config: this._appConfig,
                portal: this.base.portal,
                container: document.getElementById("header")
            });
            const mapParams = {};
            const map = await itemUtils_1.createMapFromItem({ item, mapParams, appProxies });
            const view = (await itemUtils_1.createView({
                ...viewProperties,
                map
            }));
            this._handles.add(reactiveUtils_1.watch(() => this?._appConfig?.theme, () => {
                const theme = this._appConfig.theme;
                const inverseTheme = theme === "light" ? "dark" : "light";
                const style = document.getElementById("esri-stylesheet");
                style.href =
                    style.href.indexOf("light") !== -1
                        ? style.href.replace(/light/g, theme)
                        : style.href.replace(/dark/g, theme);
                document.body.classList.remove("dark", "light");
                document.body.classList.add(theme);
                const elements = document.getElementsByClassName(`calcite-mode-${inverseTheme}`);
                for (let i = 0; i < elements.length; i++) {
                    const node = elements[i];
                    node.classList.remove(`calcite-mode-${inverseTheme}`);
                    node.classList.add(`calcite-mode-${theme}`);
                }
                view?.when(() => {
                    const uiDiv = document.getElementsByClassName("esri-ui")[0];
                    uiDiv?.classList.add(`calcite-mode-${theme}`);
                    uiDiv?.classList.remove(`calcite-mode-${inverseTheme}`);
                });
            }, { initial: true }), "configuration");
            this._initialRotation = view?.type !== "3d" ? view?.rotation : 0;
            if (this._appConfig?.selectedFeature) {
                reactiveUtils_1.whenOnce(() => view?.updating === false)
                    .then(() => {
                    itemUtils_1.findSelectedFeature(this._appConfig.selectedFeature, view);
                })
                    .catch();
            }
            view?.when(() => {
                const { find, marker } = config;
                const promises = [itemUtils_1.findQuery(find, view), itemUtils_1.goToMarker(marker, view)];
                Promise.all(promises).then(async () => {
                    const hiddenLayers = SEARCH_PARAMS?.get("hiddenLayers")?.split(";");
                    if (hiddenLayers) {
                        view.map.allLayers.forEach((layer) => {
                            if (hiddenLayers.indexOf(layer.id) !== -1) {
                                layer.visible = false;
                                return;
                            }
                            layer.visible = true;
                        });
                    }
                    const selectedFeature = SEARCH_PARAMS?.get("selectedFeature")?.split(";");
                    if (selectedFeature) {
                        const layerId = selectedFeature[0];
                        const oid = parseInt(selectedFeature[1]);
                        const layer = view.map.allLayers.find((layer) => layerId === layer.id);
                        const query = layer.createQuery();
                        query.objectIds = [oid];
                        query.returnGeometry = true;
                        const featuresRes = await layer.queryFeatures(query);
                        const feature = featuresRes.features[0];
                        view.popup.open({ features: [feature] });
                    }
                    this._initialExtent = view.extent.clone();
                    this._initialScale = view.scale;
                    if (view?.type === "2d")
                        this._initialRotation = view.rotation;
                });
            });
            if (this._appConfig.hiddenLayers)
                itemUtils_1.setHiddenLayers(this._appConfig.hiddenLayers, view);
            const ariadesc = a11yUtils_1.getMapDescription(config, view, portalItem);
            if (ariadesc) {
                a11yUtils_1.setMapDescription(view, ariadesc, this._sanitizer);
            }
            view.popup = new Popup_1.default();
            const popupContainer = view.popup?.container;
            popupContainer?.setAttribute("aria-live", "polite");
            //enable browse features for clusters
            view.popup.viewModel.browseClusterEnabled = view.popup.viewModel.selectedFeature?.isAggregate;
            // Add widgets and layer effects
            const widgetProps = {
                view,
                config: this._appConfig,
                portal: this.base.portal,
                telemetry: this._telemetry
            };
            this._languageSwitcher = new LanguageSwitcher_1.default({
                base: this.base,
                configurationSettings: this._appConfig,
                expandTooltip: config.bundle.tools.languageSwitcher,
                collapseTooltip: config.bundle.tools.languageSwitcher,
                messageBundleName: "basic/app/t9n/common",
                collapseTooltipKey: "tools.languageSwitcher",
                expandTooltipKey: "tools.languageSwitcher",
                view: view,
                handles: this._handles
            });
            document.addEventListener("selectedLanguageUpdated", async (e) => {
                // Write logic to apply strings throughout your app here.
                this._appConfig.bundle = await t9nUtils_1.handleT9N("instant", "instant", "instant/../t9n/common");
            });
            this._handles.add([
                reactiveUtils_1.watch(() => this._appConfig?.mapRotation, (newValue) => {
                    if (view.type !== "2d")
                        return;
                    view.constraints.rotationEnabled = newValue;
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this._appConfig?.popupFixed, this._appConfig?.popupFixedPosition], () => {
                    const pp = urlUtils_2.parsePopup(this._appConfig.popupFixed, this._appConfig.popupFixedPosition);
                    if (pp?.popup && view?.popup) {
                        view.popup = pp.popup;
                    }
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this._appConfig?.customTheme, this._appConfig?.theme], () => {
                    let { customTheme } = this._appConfig;
                    const sharedThemeProps = this?.base?.portal?.portalProperties?.sharedTheme;
                    if (customTheme?.applySharedTheme) {
                        if (!customTheme?.logo && sharedThemeProps?.logo?.small) {
                            customTheme.logo = sharedThemeProps.logo.small;
                        }
                    }
                    themeUtils_1.handleCustomTheme(this._appConfig);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this?._appConfig?.mapArea, this?._appConfig?.mapAreaConfig], () => {
                    if (this._appConfig?.mapArea === true && this._appConfig.mapAreaConfig) {
                        if (this._appConfig.mapAreaConfig != null) {
                            const viewPointToUse = {
                                ...this._appConfig.mapAreaConfig,
                                targetGeometry: geometry_1.Point.fromJSON(this._appConfig.mapAreaConfig.targetGeometry)
                            };
                            view.when(() => {
                                view
                                    .goTo(viewPointToUse.targetGeometry)
                                    .then(() => {
                                    view.scale = viewPointToUse.scale;
                                    if (view?.type === "2d") {
                                        view.rotation = viewPointToUse.rotation;
                                    }
                                    else {
                                        view.camera = this._appConfig?.mapAreaConfig?.camera;
                                    }
                                })
                                    .catch();
                            });
                        }
                    }
                    else if (this._appConfig?.mapArea === false && this._initialExtent) {
                        // if mapArea is false, reset to initial extent
                        view.when(() => {
                            view
                                .goTo(this._initialExtent)
                                .then(() => {
                                view.scale = this._initialScale;
                                if (view?.type === "2d") {
                                    view.rotation = this._initialRotation;
                                }
                            })
                                .catch();
                        });
                    }
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this?._appConfig?.extentSelector, this?._appConfig?.extentSelectorConfig, this?._appConfig?.mapArea], () => {
                    // IGNORE INITIAL EXTENT IF SEARCH PARAMS ARE PRESENT
                    const searchParams = new URL(window.location.href)?.searchParams;
                    const center = searchParams?.get("center");
                    const zoom = searchParams?.get("level");
                    if (this._appConfig?.extentSelector && this._appConfig.extentSelectorConfig && this?._appConfig?.mapArea) {
                        const constraints = this._appConfig?.extentSelectorConfig?.constraints || null;
                        const geometry = constraints?.geometry;
                        if (geometry) {
                            const extent = jsonUtils_1.fromJSON(geometry);
                            if (extent && (extent?.type === "extent" || extent?.type === "polygon")) {
                                constraints.geometry = extent;
                                if (!center && !zoom) {
                                    const goToProps = esriWidgetUtils_2.createGoToProps(extent, this._appConfig);
                                    view.goTo(goToProps, { animate: false }).catch(() => { });
                                }
                            }
                            else {
                                constraints.geometry = null;
                            }
                        }
                        constraints.minScale = +constraints.minScale;
                        constraints.maxScale = +constraints.maxScale;
                        view.constraints = constraints;
                        if (view?.type === "2d")
                            this._setMapViewRotation(view);
                    }
                    else {
                        if (this._initialExtent) {
                            if (!center && !zoom) {
                                view.goTo(this._initialExtent, { animate: false }).catch(() => { });
                            }
                        }
                    }
                }, {
                    initial: true
                }),
                reactiveUtils_1.watch(() => [
                    this._appConfig?.basemapToggle,
                    this._appConfig?.basemapSelector,
                    this._appConfig?.basemapTogglePosition,
                    this._appConfig?.nextBasemap
                ], () => {
                    esriWidgetUtils_1.addBasemap(this._appConfig, view);
                }, { initial: true }),
                reactiveUtils_1.watch(() => this._appConfig?.disableScroll, () => {
                    esriWidgetUtils_2.addOverlay({ ...widgetProps, ...{ propertyName: "disableScroll" } });
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this._appConfig?.scalebar, this._appConfig?.scalebarDualMode, this._appConfig?.scalebarPosition], () => {
                    esriWidgetUtils_1.addScaleBar(this._appConfig, view);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this._appConfig?.keyboardShortcuts, this._appConfig?.keyboardShortcutsPosition], () => {
                    esriWidgetUtils_1.addKeyboardShortcuts(this._appConfig, view, this._appConfig.bundle);
                }, { initial: true }),
                reactiveUtils_1.watch(() => this._appConfig?.splash, () => {
                    esriWidgetUtils_2.addSplash({ ...widgetProps, ...{ propertyName: "splash" } });
                }, { initial: true }),
                reactiveUtils_1.watch(() => this._appConfig?.screenshot, () => {
                    esriWidgetUtils_2.addScreenshot({ ...widgetProps, ...{ propertyName: "screenshot" } });
                }, { initial: true }),
                reactiveUtils_1.watch(() => this._appConfig?.screenshotPosition, () => {
                    esriWidgetUtils_2.addScreenshot({ ...widgetProps, ...{ propertyName: "screenshotPosition" } });
                }, { initial: true }),
                reactiveUtils_1.watch(() => [
                    this._appConfig?.search,
                    this._appConfig?.searchConfiguration,
                    this._appConfig?.searchOpenAtStart,
                    this._appConfig?.extentSelector,
                    this._appConfig?.bundle,
                    this._appConfig?.extentSelectorConfig,
                    this._appConfig?.searchPosition
                ], () => {
                    esriWidgetUtils_1.addSearch(this._appConfig, view, this._appConfig?.bundle);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this?._appConfig?.compassWidget, this._appConfig?.compassWidgetPosition], () => {
                    esriWidgetUtils_1.addCompass(this._appConfig, view);
                }, {
                    initial: true
                }),
                reactiveUtils_1.watch(() => [
                    this._appConfig?.home,
                    this._appConfig?.mapArea,
                    this._appConfig?.homePosition,
                    this._appConfig?.mapAreaConfig
                ], () => {
                    esriWidgetUtils_1.addHome(this._appConfig, view);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this._appConfig?.locateWidget, this._appConfig?.locateWidgetPosition], () => {
                    esriWidgetUtils_1.addLocateWidget(this._appConfig, view);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [this._appConfig?.mapZoom, this._appConfig?.mapZoomPosition], () => {
                    if (this?._appConfig?.mapZoom == true && view.ui.components.indexOf("zoom") !== -1) {
                        view.ui.remove("zoom");
                    }
                    esriWidgetUtils_1.addZoom(this._appConfig, view);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [
                    this._appConfig?.share,
                    this._appConfig?.shareIncludeEmbed,
                    this._appConfig?.shareIncludeSocial,
                    this._appConfig?.sharePosition,
                    this._appConfig?.theme,
                    this._appConfig?.bundle
                ], () => {
                    const bundle = this?._appConfig?.bundle;
                    esriWidgetUtils_1.addShare(this._appConfig, view, bundle);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [
                    this._appConfig?.legend,
                    this._appConfig?.bundle,
                    this._appConfig?.legendOpenAtStart,
                    this._appConfig?.legendPosition
                ], () => {
                    esriWidgetUtils_1.addLegend(this._appConfig, view, this._appConfig.bundle);
                }, { initial: true }),
                reactiveUtils_1.watch(() => [
                    this._appConfig?.layerList,
                    this._appConfig?.bundle,
                    this._appConfig?.layerListOpenAtStart,
                    this._appConfig?.layerListPosition
                ], () => {
                    esriWidgetUtils_1.addLayerList(this._appConfig, view, this._appConfig?.bundle);
                }, { initial: true }),
                reactiveUtils_1.watch(() => this._appConfig?.bookmarks, () => {
                    esriWidgetUtils_2.addBookmarks({ ...widgetProps, ...{ propertyName: "bookmarks" } });
                }, { initial: true }),
                reactiveUtils_1.watch(() => this._appConfig?.bookmarksPosition, () => {
                    esriWidgetUtils_2.addBookmarks({ ...widgetProps, ...{ propertyName: "bookmarksPosition" } });
                }, { initial: true }),
                ...this._languageSwitcher.getLanguageSwitcherHandles(widgetProps),
                reactiveUtils_1.watch(() => this._appConfig?.languageSwitcherPosition, () => {
                    const group = utils_1.getPosition(this._appConfig?.languageSwitcherPosition);
                    this._languageSwitcher.setExpandGroup(group);
                }, { initial: true })
            ], "configuration");
        }
        _setMapViewRotation(view) {
            const mapRotation = this._appConfig?.extentSelectorConfig?.mapRotation ?? this._initialRotation ?? null;
            if (!view?.constraints?.rotationEnabled) {
                // if rotation is disabled
                view.constraints.rotationEnabled = true; // set rotation to enabled
                view.rotation = mapRotation; // set rotation value
                view.constraints.rotationEnabled = false; // set rotation back to disabled
            }
            else {
                if (view)
                    view.rotation = mapRotation;
            }
        }
        async createTelemetry() {
            // add alert to container
            const { portal } = this.base;
            const appName = this.base.config?.telemetry?.name;
            const telemTS = new telemetry_1.default({
                portal,
                config: this._appConfig,
                appName
            });
            reactiveUtils_1.whenOnce(() => telemTS?.instance !== undefined).then(() => {
                if (telemTS?.instance) {
                    this._telemetry = telemTS.instance;
                    this._telemetry?.logPageView(`${window.location.pathname}${window.location.search}`);
                }
            });
        }
    }
    exports.default = Main;
});
