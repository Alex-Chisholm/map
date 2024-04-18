/*
  Copyright 2022 Esri

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/reactiveUtils", "./Alert", "./AppMeasurement", "./telemetry.dojo.min"], function (require, exports, Accessor_1, decorators_1, reactiveUtils_1, Alert_1, AppMeasurement_1, telemetry_dojo_min_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = __importDefault(Accessor_1);
    Alert_1 = __importDefault(Alert_1);
    telemetry_dojo_min_1 = __importDefault(telemetry_dojo_min_1);
    let Telemetry = class Telemetry extends Accessor_1.default {
        get isConsentGiven() {
            const storageValue = localStorage.getItem(this.optInStorageKey);
            return storageValue != null && storageValue !== "false";
        }
        /** Tied to the appid in the URL. This is what allows us to keep track of opt-ins on an individual app basis */
        get optInStorageKey() {
            const urlParams = new URLSearchParams(window.location.search);
            const appId = urlParams.get("appid");
            return `analytics-opt-in-${appId != null ? appId : this.settings.appName}`;
        }
        constructor(settings) {
            super(settings);
            this.state = "waitingForConsent";
            this.gaids = ["ga1", "ga2", "ga3"];
            this.adobeIds = ["ad1"];
            this.settings = settings;
        }
        initialize() {
            this.runInit();
            (0, reactiveUtils_1.whenOnce)(() => this?.consentAlert !== undefined).then(() => {
                this.consentAlert.watch("state", (state) => {
                    if (state === "consentGiven") {
                        this.runInit();
                    }
                });
            });
            // Note: Going to exclude this logic for now. It's not important to react to settings changes in the config panel.
            //          And leaving this in is bug prone.
            // watch(
            //   this?.settings?.config,
            //   [
            //     "googleAnalytics",
            //     "googleAnalyticsConsent",
            //     "adobeLaunchAnalytics"
            //   ],
            //   () => {
            //     this.runInit();
            //   });
        }
        runInit() {
            const { googleAnalytics, googleAnalyticsConsent, adobeLaunchAnalytics } = this?.settings?.config;
            if (googleAnalyticsConsent === true &&
                (googleAnalytics || adobeLaunchAnalytics) &&
                !this.isConsentGiven) {
                this._initConsentAlert();
            }
            else {
                this._destroyConsentAlert();
                this._initTelemetry(this?.settings);
            }
        }
        _initConsentAlert() {
            this._destroyConsentAlert();
            const alertContainer = document.createElement("container");
            document.body.appendChild(alertContainer);
            this.consentAlert = new Alert_1.default({
                container: alertContainer,
                config: this.settings.config,
                appName: this.optInStorageKey,
            });
        }
        _destroyConsentAlert() {
            if (this.consentAlert != null) {
                this.consentAlert.destroy();
                this.consentAlert = null;
            }
        }
        async _initTelemetry(settings) {
            const { portal } = settings;
            const isGoogleEnabled = this._isGoogleEnabled(settings);
            const isAdobeEnabled = this._isAdobeEnabled(settings);
            await this._loadGoogleAnalytics(settings);
            this._adobeTracker = await this._loadAdobeAnalytics(settings);
            const options = {
                disabled: false,
                portal,
                amazon: this._getAmazonCredentials(settings),
                google: isGoogleEnabled,
                debug: this._getEnvironment(portal.portalHostname) === "dev" ? true : false,
            };
            let telemetry;
            if (isAdobeEnabled) {
                // init wrapper
                telemetry = new AdobeWrapper({
                    instance: new telemetry_dojo_min_1.default(options),
                    adobeTracker: this._adobeTracker,
                });
            }
            else {
                telemetry = new telemetry_dojo_min_1.default(options);
            }
            this.instance = telemetry;
            this.state = "ready";
        }
        _isGoogleEnabled(settings) {
            // NOTE: googleAnalyticsConsent is just the general Consent Message for all Analytics providers
            const { googleAnalytics, googleAnalyticsConsent } = settings?.config;
            if (this._isEueiDisabled(settings?.portal)) {
                return false;
            }
            // Check to see if GA is enabled
            let enabled = googleAnalytics;
            let optInKey = this.optInStorageKey;
            if (enabled && googleAnalyticsConsent) {
                const localSaved = localStorage.getItem(optInKey);
                enabled = localSaved != null;
            }
            return enabled;
        }
        _isAdobeEnabled(settings) {
            // NOTE: googleAnalyticsConsent is just the general Consent Message for all Analytics providers
            const { adobeLaunchAnalytics, googleAnalyticsConsent } = settings?.config;
            if (this._isEueiDisabled(settings?.portal)) {
                return false;
            }
            let enabled = adobeLaunchAnalytics;
            let optInKey = this.optInStorageKey;
            if (enabled && googleAnalyticsConsent) {
                const localSaved = localStorage.getItem(optInKey);
                enabled = localSaved != null;
            }
            return enabled;
        }
        _getAmazonCredentials(settings) {
            const envCredentials = settings.config.telemetry;
            if (!envCredentials)
                return;
            const env = this._getEnvironment(settings.portal.portalHostname);
            const userPoolID = envCredentials[env].amazon.userPoolID;
            const id = envCredentials[env].amazon.app.id;
            const name = envCredentials.name;
            const version = envCredentials.version;
            return {
                userPoolID,
                app: {
                    name,
                    id,
                    version,
                },
            };
        }
        async _loadGoogleAnalytics(settings) {
            return new Promise(async (resolve, reject) => {
                const { googleAnalyticsKey } = settings?.config;
                const enableGoogle = this._isGoogleEnabled(settings);
                const scriptsExist = this._googleScriptsExist();
                if (!enableGoogle && scriptsExist) {
                    window[`ga-disable-${googleAnalyticsKey}`] = false;
                    resolve();
                }
                else if (!enableGoogle && !scriptsExist) {
                    resolve();
                }
                else if (enableGoogle && scriptsExist) {
                    window[`ga-disable-${googleAnalyticsKey}`] = true;
                    resolve();
                }
                else if (enableGoogle && !scriptsExist) {
                    if (googleAnalyticsKey == null) {
                        resolve();
                        return;
                    }
                    const gaScript0 = document.createElement("script");
                    gaScript0.setAttribute("async", "true");
                    gaScript0.setAttribute("src", `https://www.google-analytics.com/analytics.js`);
                    gaScript0.id = this.gaids[0];
                    const gaScript1 = document.createElement("script");
                    gaScript1.setAttribute("async", "true");
                    gaScript1.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsKey}`);
                    gaScript1.id = this.gaids[1];
                    const gaScript2 = document.createElement("script");
                    gaScript2.id = this.gaids[2];
                    gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'${googleAnalyticsKey}\');`;
                    const head = document.getElementsByTagName("head")[0];
                    head.appendChild(gaScript0);
                    head.appendChild(gaScript1);
                    head.appendChild(gaScript2);
                    let timeStart = Date.now();
                    const TIMEOUT = 10000;
                    let _isLoaded = function () {
                        if (window["ga"]) {
                            resolve(window["ga"]);
                        }
                        else if (Date.now() - timeStart > TIMEOUT) {
                            reject("Timeout. Google analytics not injected!");
                        }
                        else {
                            setTimeout(_isLoaded, 1000);
                        }
                    };
                    _isLoaded();
                }
                else {
                    resolve();
                }
            });
        }
        async _loadAdobeAnalytics(settings) {
            return new Promise(async (resolve, reject) => {
                const { adobeTrackingServer, adobeSSLTrackingServer, adobeReportSuiteId, } = settings.config;
                const enableAdobeLaunch = this._isAdobeEnabled(settings);
                const scriptsExist = this._adobeLaunchScriptsExist();
                if (!enableAdobeLaunch && scriptsExist) {
                    this.removeALScripts();
                    resolve();
                }
                else if (!enableAdobeLaunch && !scriptsExist) {
                    resolve();
                }
                else if (enableAdobeLaunch && scriptsExist) {
                    resolve();
                }
                else if (enableAdobeLaunch && !scriptsExist) {
                    if (adobeTrackingServer == null || adobeReportSuiteId == null) {
                        resolve();
                        return;
                    }
                    (0, AppMeasurement_1.addAdobeScripts)();
                    let timeStart = Date.now();
                    const TIMEOUT = 10000;
                    let _isLoaded = function () {
                        if (window["s_gi"]) {
                            const adobeTracker = window["s_gi"](adobeReportSuiteId);
                            adobeTracker.trackingServer = adobeTrackingServer;
                            if (adobeSSLTrackingServer) {
                                adobeTracker.trackingServerSecure = adobeSSLTrackingServer;
                            }
                            resolve(adobeTracker);
                        }
                        else if (Date.now() - timeStart > TIMEOUT) {
                            reject("Timeout. Adobe Analytics not injected!");
                        }
                        else {
                            setTimeout(_isLoaded, 1000);
                        }
                    };
                    _isLoaded();
                }
                else {
                    resolve();
                }
            });
        }
        _googleScriptsExist() {
            const alreadyLoaded = this.gaids.every((id) => {
                return document.getElementById(id) !== null ? true : false;
            });
            return alreadyLoaded;
        }
        _adobeLaunchScriptsExist() {
            const alreadyLoaded = window["AppMeasurement"] != null || window["s_gi"] != null;
            return alreadyLoaded;
        }
        removeGAScripts() {
            this.gaids.forEach((id) => {
                const gaScript = document.getElementById(id);
                gaScript?.parentNode.removeChild(gaScript);
            });
        }
        removeALScripts() {
            this.adobeIds.forEach((id) => {
                const alScript = document.getElementById(id);
                alScript?.parentNode.removeChild(alScript);
            });
        }
        _getEnvironment(hostname) {
            const h = hostname.replace("www.", "");
            if (document.location.hostname.indexOf("arcgis.com") === -1) {
                return "dev";
            }
            else {
                return ((h === "arcgis.com" && "prod") ||
                    (h === "qaext.arcgis.com" && "qa") ||
                    "dev");
            }
        }
        _isEueiDisabled(portal) {
            return portal?.eueiEnabled === false;
        }
    };
    __decorate([
        (0, decorators_1.property)()
    ], Telemetry.prototype, "instance", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], Telemetry.prototype, "state", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], Telemetry.prototype, "consentAlert", void 0);
    Telemetry = __decorate([
        (0, decorators_1.subclass)("TelemetryTS")
    ], Telemetry);
    exports.default = Telemetry;
    /** Wrapper which adds the functionality of Adobe Launch to the TelemetryInstance */
    class AdobeWrapper {
        constructor(args) {
            this.logPageView = (page, options) => {
                if (this._adobeTracker == null) {
                    console.error(`this._adobeTracker function is undefined. Something went wrong with Adobe Analytics Instantiation`);
                }
                const telemetryPayload = this.createPageView({
                    page,
                    previousPage: {},
                    options,
                }, null, false);
                this?._adobeTracker?.t(telemetryPayload);
                this?._wrappedTelemInstance?.logPageView(page);
            };
            this.logEvent = (payload) => {
                if (this._adobeTracker == null) {
                    console.error(`this._adobeTracker function is undefined. Something went wrong with AdobeLaunch Instantiation`);
                }
                const telemetryPayload = this.createEventLog(payload, {}, false, {});
                this?._adobeTracker?.tl(true, "o", "Custom Event", telemetryPayload);
                return this?._wrappedTelemInstance?.logEvent(telemetryPayload);
            };
            ///////////////////////////
            // Pass through functions
            ///////////////////////////
            this.logError = (payload) => {
                this._wrappedTelemInstance.logError(payload);
            };
            this.update = (settings) => {
                this._wrappedTelemInstance.update(settings);
            };
            this.removeScripts = () => {
                this._wrappedTelemInstance.removeScripts();
            };
            this.startWorkflow = (name, payload) => {
                return this._wrappedTelemInstance.startWorkflow(name, payload);
            };
            this.stepWorkflow = (name, step, payload) => {
                return this._wrappedTelemInstance.stepWorkflow(name, step, payload);
            };
            this.cancelWorkflow = (name, payload) => {
                return this._wrappedTelemInstance.cancelWorkflow(name, payload);
            };
            this.endWorkflow = (name, payload) => {
                return this._wrappedTelemInstance.endWorkflow(name, payload);
            };
            this.getWorkflow = (name) => {
                return this._wrappedTelemInstance.getWorkflow(name);
            };
            this._wrappedTelemInstance = args?.instance;
            this._adobeTracker = args?.adobeTracker;
        }
        get disabled() {
            return this._wrappedTelemInstance.disabled;
        }
        ////////////////////////////////
        // Adobe Format Functions
        ////////////////////////////////
        createPageView(data, dimensions, useCustomDimensionMapping) {
            const { page, previousPage, options } = data;
            const payload = this.formatPayload(page, previousPage, options, "pageView");
            let defaultMapping = {};
            if (!useCustomDimensionMapping) {
                defaultMapping = {
                    prop1: payload.eventType,
                    prop2: payload.referrer,
                    prop3: payload.hostname,
                    prop4: payload.path,
                    prop5: payload.pageName,
                    prop6: payload.previousPageName,
                    prop7: payload.previousPageUrl,
                    prop8: payload.category,
                    prop9: payload.action,
                    prop10: payload.label,
                    prop11: payload.attribute,
                    prop12: payload.details,
                };
            }
            return {
                ...defaultMapping,
            };
        }
        createEventLog(event, dimensions, useCustomDimensionMapping, previousPage) {
            const payload = this.formatPayload(null, previousPage, event, "other");
            let defaultMapping = {};
            if (!useCustomDimensionMapping) {
                defaultMapping = {
                    prop1: payload.eventType,
                    prop2: payload.referrer,
                    prop3: payload.hostname,
                    prop4: payload.path,
                    prop5: payload.pageName,
                    prop6: payload.previousPageName,
                    prop7: payload.previousPageUrl,
                    prop8: payload.category,
                    prop9: payload.action,
                    prop10: payload.label,
                    prop11: payload.attribute,
                    prop12: payload.details,
                };
            }
            return {
                ...defaultMapping,
            };
        }
        formatPayload(page, previousPage, options, eventType) {
            const { referrer, title } = document || {};
            const { hostname, pathname } = window && window.location
                ? window.location
                : { hostname: null, pathname: null };
            return {
                eventType,
                referrer,
                hostname,
                path: page || pathname,
                pageName: title,
                previousPageUrl: previousPage?.pageUrl,
                previousPageName: previousPage?.pageName,
                ...options,
            };
        }
    }
});
