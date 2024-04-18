define(["require", "exports", "esri/intl", "../baseClasses/support/domHelper"], function (require, exports, intl_1, domHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defineLocale = void 0;
    function defineLocale(props) {
        const { config, portal } = props;
        let { locale } = config;
        if (!locale) {
            locale = _calculateLocale(portal);
        }
        (0, intl_1.setLocale)(locale);
        (0, domHelper_1.setPageLocale)(locale);
        (0, domHelper_1.setPageDirection)((0, intl_1.prefersRTL)(locale) ? "rtl" : "ltr");
        return locale;
    }
    exports.defineLocale = defineLocale;
    function _calculateLocale(portal) {
        const cookie = _getCookie("arcgisLocale") || _getCookie("esri_locale");
        // Use cookie if one exists 
        if (cookie) {
            return cookie;
        }
        else {
            // if org use org culture
            const isOrg = portal?.isOrganization;
            if (isOrg) {
                if (portal?.culture)
                    return portal.culture;
            }
            else {
                // not org use user locale if defined 
                if (portal?.user?.culture) {
                    return portal.user.culture;
                }
            }
            // Fallback get the base locale 
            return (0, intl_1.getLocale)();
        }
    }
    function _getCookie(name) {
        const cookie = document.cookie;
        const cookieNameRE = new RegExp(`(?:^|; )${_escapeRegExp(name)}=([^;]*)`);
        const matchedCookies = cookie.match(cookieNameRE);
        return matchedCookies ? decodeURIComponent(matchedCookies[1]) : undefined;
    }
    function _escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
});
