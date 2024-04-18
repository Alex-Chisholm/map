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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, decorators_1, Widget_1, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    const CSS = {
        base: "esri-interactive-legend-ga-alert",
        optOutButton: "esri-interactive-legend__opt-out-button"
    };
    let Alert = class Alert extends Widget_1.default {
        constructor(params) {
            super(params);
            this._alertNode = null;
            this.state = "nothingDoneYet";
        }
        // @property()
        // @messageBundle("dist/assets/t9n/widgets/Alert/Alert")
        // messages = null;
        render() {
            const theme = this.config?.theme === "dark"
                ? "calcite-mode-dark"
                : "calcite-mode-light";
            return ((0, widget_1.tsx)("div", { bind: this },
                (0, widget_1.tsx)("calcite-alert", { afterCreate: widget_1.storeNode, bind: this, "data-node-ref": "_alertNode", oncalciteAlertClose: this.handleClose.bind(this), scale: "s", active: true, open: true, class: this.classes(CSS.base, theme) },
                    (0, widget_1.tsx)("div", { slot: "message" },
                        (0, widget_1.tsx)("div", null,
                            (0, widget_1.tsx)("span", { style: "padding:0 5px;", afterCreate: (container) => {
                                    container.innerHTML = this?.config?.googleAnalyticsConsentMsg;
                                } }))),
                    (0, widget_1.tsx)("calcite-button", { scale: "s", slot: "actions-end", bind: this, onclick: this.handleClick.bind(this), class: CSS.optOutButton, style: "margin: auto 18px;" }, "Opt In"))));
        }
        handleClick() {
            localStorage.setItem(`${this.appName}`, "true");
            this.state = "consentGiven";
        }
        handleClose() {
            localStorage.setItem(`${this.appName}`, "false");
            this.state = "consentNotGiven";
        }
    };
    __decorate([
        (0, decorators_1.property)()
    ], Alert.prototype, "appName", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], Alert.prototype, "state", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], Alert.prototype, "config", void 0);
    Alert = __decorate([
        (0, decorators_1.subclass)("Alert")
    ], Alert);
    exports.default = Alert;
});
