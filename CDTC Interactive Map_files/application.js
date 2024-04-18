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
    exports.default = {
        appid: "",
        group: "",
        title: null,
        webmap: "default",
        webscene: "default",
        type: "webmap",
        mapRotation: false,
        googleAnalytics: false,
        googleAnalyticsKey: null,
        googleAnalyticsConsent: false,
        googleAnalyticsConsentMsg: null,
        mapA11yDesc: null,
        sharePosition: "top-right",
        selectedFeature: null,
        hiddenLayers: null,
        portalUrl: "https://www.arcgis.com",
        oauthappid: "arcgisinstantapps",
        proxyUrl: "",
        units: "",
        helperServices: {
            geometry: {
                url: null
            },
            printTask: {
                url: null
            },
            elevationSync: {
                url: null
            },
            geocode: [
                {
                    url: null
                }
            ]
        },
        telemetry: {
            name: "basic",
            version: "1.0",
            prod: {
                amazon: {
                    userPoolID: "us-east-1:8c41b2dc-7563-403d-ba64-673b103debce",
                    app: {
                        id: "977e9b0602bb446d8f2fa5a50489d053"
                    }
                }
            },
            dev: {
                amazon: {
                    userPoolID: "us-east-1:7345bcf2-bffa-4849-a379-a83178f63eef",
                    app: {
                        id: "eadf587070d04c86b747a938cc655e76"
                    }
                }
            },
            qa: {
                amazon: {
                    userPoolID: "us-east-1:7345bcf2-bffa-4849-a379-a83178f63eef",
                    app: {
                        id: "74ec952cdae444389057fbae08043476"
                    }
                }
            }
        }
    };
});
