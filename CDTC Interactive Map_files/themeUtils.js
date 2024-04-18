/*
  Copyright 2019 Esri
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBaseColors = exports.checkCustomTheme = exports.createAndAppendStyles = exports.updateThemeConfig = exports.createSharedTheme = exports.handleFontStyles = exports.handleCustomTheme = exports.handleSharedTheme = void 0;
    function handleSharedTheme(sharedTheme, config) {
        const { customTheme } = config;
        cleanUp();
        if (!customTheme?.applySharedTheme)
            return;
        let customStyles = createPrimaryStyles(config, sharedTheme);
        createAndAppendStyles(customStyles);
    }
    exports.handleSharedTheme = handleSharedTheme;
    function handleCustomTheme(config) {
        const { customTheme } = config;
        cleanUp();
        if (!customTheme)
            return;
        if (customTheme === undefined || customTheme === null)
            return;
        let themes = null;
        let themeStyles = "";
        if (customTheme?.themes && customTheme?.applyPresetTheme) {
            themes = JSON.parse(JSON.stringify(customTheme.themes));
            const { primary } = themes;
            const primaryStyles = createPrimaryStyles(config, primary);
            if (primaryStyles)
                themeStyles += primaryStyles;
        }
        const fontStyles = createFontStyle(config);
        if (fontStyles)
            themeStyles += fontStyles;
        createAndAppendStyles(themeStyles);
    }
    exports.handleCustomTheme = handleCustomTheme;
    function handleFontStyles(config) {
        const fontStyles = createFontStyle(config);
        return fontStyles;
    }
    exports.handleFontStyles = handleFontStyles;
    function createSharedTheme(config, portal) {
        const { applySharedTheme, customTheme } = config;
        if (!customTheme?.applySharedTheme && customTheme !== null && customTheme !== undefined)
            return;
        let sharedTheme = null;
        if (portal?.portalProperties && (applySharedTheme || customTheme?.applySharedTheme)) {
            const theme = portal?.portalProperties?.sharedTheme;
            sharedTheme = {
                background: theme?.header?.background && theme?.header?.background !== "no-color" ? theme.header.background : null,
                text: theme?.header?.text && theme?.header?.text !== "no-color" ? theme.header.text : null,
                logo: theme?.logo?.small,
                logoLink: theme?.logo?.link
            };
        }
        return sharedTheme;
    }
    exports.createSharedTheme = createSharedTheme;
    function updateThemeConfig(config) {
        if (config?.customTheme !== null && config?.customTheme !== undefined) {
            if (config?.customTheme?.applySharedTheme !== null && config?.customTheme?.applySharedTheme !== undefined) {
                config.applySharedTheme = config?.customTheme.applySharedTheme;
            }
            if (config?.customTheme?.theme !== null && config?.customTheme?.theme !== undefined) {
                config.theme = config.customTheme.theme;
            }
        }
    }
    exports.updateThemeConfig = updateThemeConfig;
    function lightenOrDarkenColor(hex, percent) {
        if (!hex)
            return;
        let usePound = false;
        if (hex[0] === "#") {
            hex = hex.slice(1);
            usePound = true;
        }
        const num = parseInt(hex, 16);
        let r = (num >> 16) + percent;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        let b = ((num >> 8) & 0x00ff) + percent;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        let g = (num & 0x0000ff) + percent;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
    }
    function cleanUp() {
        const existingSheet = document.getElementById("customSheet");
        if (existingSheet) {
            existingSheet.disabled = true;
            if (existingSheet?.parentNode) {
                existingSheet.parentNode.removeChild(existingSheet);
            }
        }
    }
    function createAndAppendStyles(styles) {
        if (styles === null)
            return;
        let style = document.getElementById("customSheet");
        if (!style) {
            style = document.createElement("style");
            style.id = "customSheet";
            document.head.appendChild(style);
        }
        const styleTextNode = document.createTextNode(styles);
        style.appendChild(styleTextNode);
    }
    exports.createAndAppendStyles = createAndAppendStyles;
    function isValidColor(color) {
        return color && color !== "no-color" ? true : false;
    }
    function createFontStyle(config) {
        const { customTheme, theme } = config;
        const { font, appFont } = customTheme;
        let styles = null;
        if (font) {
            styles += ` .default-header.${theme} {
            font-family:${font};
          }`;
        }
        if (appFont) {
            styles += `.esri-widget{
            font-family:${appFont};
        }
        .esri-bookmarks__bookmark-name{
            font-family:${appFont};
        }
        .esri-input{
            font-family:${appFont} !important;
        }
       .scroll-overlay> calcite-button{
             font-family:${appFont};
        }`;
        }
        return styles;
    }
    function createPrimaryStyles(config, colorValue) {
        const { theme } = config;
        const baseColors = getBaseColors(theme);
        let baseBackground = baseColors?.background;
        let baseColor = baseColors?.text;
        let textColor = colorValue?.text ? colorValue.text : baseColor;
        let backgroundColor = colorValue?.background ? colorValue.background : baseBackground;
        let hover = null;
        if (colorValue?.background) {
            if (isValidColor(colorValue?.background)) {
                hover = lightenOrDarkenColor(colorValue?.background, -25);
            }
        }
        let styles = "";
        styles += `
  .default-header.${theme} {
    background-color:${backgroundColor};
    color : ${textColor};
    }`;
        return styles;
    }
    function checkCustomTheme(applyCustomTheme, customTheme) {
        return (applyCustomTheme && customTheme?.applyPresetTheme === undefined) || customTheme?.applyPresetTheme;
    }
    exports.checkCustomTheme = checkCustomTheme;
    function getBaseColors(theme) {
        const background = theme === "light" ? "#fff" : "#2b2b2b";
        const text = theme === "light" ? "#6e6e6e" : "#f3f3f3";
        return { background, text };
    }
    exports.getBaseColors = getBaseColors;
});
