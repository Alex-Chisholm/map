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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "../utils/themeUtils", "ArcGISHTMLSanitizer", "TemplatesCommonLib/functionality/securityUtils"], function (require, exports, decorators_1, Widget_1, widget_1, themeUtils_1, ArcGISHTMLSanitizer_1, securityUtils_1) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    ArcGISHTMLSanitizer_1 = __importDefault(ArcGISHTMLSanitizer_1);
    let Header = class Header extends Widget_1.default {
        constructor(params) {
            super(params);
            this._previousHeight = null;
            this.portal = null;
            this._sanitizer = securityUtils_1.createSanitizerInstance(ArcGISHTMLSanitizer_1.default);
        }
        render() {
            const { header, customTheme, theme } = this.config;
            const appTitle = this._getTitle();
            const { logo, link, scale } = this.getLogoInfo();
            const baseColors = themeUtils_1.getBaseColors(theme);
            let background = baseColors?.background;
            let text = baseColors?.text;
            if (this?.config?.customTheme?.applySharedTheme ||
                this?.config?.customTheme?.applyPresetTheme) {
                if (this?.config?.customTheme?.themes?.primary?.text) {
                    text = this.config.customTheme.themes.primary.text;
                }
                if (this?.config?.customTheme?.themes?.primary?.background) {
                    background = this.config.customTheme.themes.primary.background;
                }
            }
            const headerContent = header ? (widget_1.tsx("instant-apps-header", { "font-family": customTheme?.font, "logo-image": logo, "logo-scale": scale, "logo-link": link, "logo-image-alt-text": "", "background-color": background, "text-color": text, scale: scale, "title-text": appTitle, theme: theme })) : null;
            return (widget_1.tsx("div", { key: "default-header", class: this.classes("default-header", theme), afterCreate: this.handleHeightDimensions, afterUpdate: this.handleHeightDimensions, bind: this }, headerContent));
        }
        handleHeightDimensions(headerContainer) {
            setTimeout(() => {
                const viewParentContainer = document.getElementById("viewContainer");
                // Our child element sometimes has a larger margin than parent
                // this leads to collapsing margins so add/remove padding when
                // calculating height
                const elementHeight = this._outerHeight(headerContainer);
                const height = `calc(100% - ${elementHeight}px)`;
                if (this._previousHeight && this._previousHeight === height) {
                    return;
                }
                this._previousHeight = height;
                viewParentContainer.style.height = height;
            }, 1000);
        }
        getLogoInfo() {
            const { customTheme } = this.config;
            const sharedTheme = this?.portal?.portalProperties?.sharedTheme;
            const sharedLink = sharedTheme?.logo?.link;
            let logoLink = customTheme?.applySharedTheme ? sharedLink : customTheme?.logoLink;
            if (customTheme?.applySharedTheme) {
                if (!customTheme?.logo && sharedTheme?.logo?.small) {
                    customTheme.logo = sharedTheme.logo.small;
                }
            }
            let logo = customTheme?.logo;
            const token = this?.portal?.credential?.token;
            if (token && logo) {
                logo = `${logo}?token=${token}`;
            }
            if (customTheme?.applySharedTheme && sharedTheme?.logoLink) {
                logoLink = sharedTheme.logoLink;
            }
            else if (customTheme?.logoLink) {
                logoLink = customTheme.logoLink;
            }
            const logoObj = {
                logo: logo !== null && logo !== undefined ? logo : null,
                scale: customTheme?.logoScale ? customTheme.logoScale : null,
                link: logoLink !== null && logoLink !== undefined ? logoLink : null
            };
            return logoObj;
        }
        _outerHeight(el) {
            var height = el.offsetHeight;
            //todo we need to get the proper height here its nested
            var style = getComputedStyle(el);
            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        }
        _getTitle() {
            const { title, header } = this.config;
            let calculatedTitle = document.title;
            if (title) {
                calculatedTitle = title;
            }
            if (title !== "") {
                // strip html from the title before setting it to the tab title
                const customDiv = document.createElement("div");
                customDiv.innerHTML = this._sanitizer.sanitize(title);
                const textContent = customDiv.textContent;
                if (textContent?.length > 0)
                    calculatedTitle = textContent;
            }
            document.title = calculatedTitle;
            return calculatedTitle;
        }
    };
    __decorate([
        decorators_1.property()
    ], Header.prototype, "portal", void 0);
    __decorate([
        decorators_1.property()
    ], Header.prototype, "config", void 0);
    Header = __decorate([
        decorators_1.subclass("Header")
    ], Header);
    return Header;
});
