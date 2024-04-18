////////////////////////////////////////////////////////////////////////
//
// File for General Utility functions that assist with Instant Apps
//
/////////////////////////////////////////////////////////////////////////
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkForElement = exports.getBaseUrl = exports.getInstantAppsHelpLink = exports.getPortalDeploymentType = void 0;
    /**
     * Based on info in "portal" object, returns which kind of deployment this portal instance is backed by
     */
    function getPortalDeploymentType(portal) {
        switch (portal.isPortal) {
            case false:
                return "ago";
            case true:
                switch (portal?.sourceJSON?.portalDeploymentType) {
                    case "ArcGISEnterprise":
                        return "enterprise";
                    case "ArcGISEnterpriseOnKubernetes":
                        return "enterpriseKubernetes";
                    default:
                        return "unknown";
                }
            default:
                return "unknown";
        }
    }
    exports.getPortalDeploymentType = getPortalDeploymentType;
    /**
     * Generates the proper help doc link based on the portal deployment type.
     * This is used in the GlobalNav in Home Page and Config Panel.
     */
    function getInstantAppsHelpLink(portal) {
        const deploymentType = getPortalDeploymentType(portal);
        switch (deploymentType) {
            case "enterprise":
                return _getPortalHelpUrl(deploymentType, portal);
            case "enterpriseKubernetes":
                return _getPortalHelpUrl(deploymentType, portal);
            case "ago":
            case "unknown":
            default:
                return "https://doc.arcgis.com/en/instant-apps/latest/get-started/about-instant-apps.htm";
        }
    }
    exports.getInstantAppsHelpLink = getInstantAppsHelpLink;
    // getBaseUrl
    function getBaseUrl(portal) {
        if (!portal) {
            return;
        }
        const { customBaseUrl, portalHostname, urlKey } = portal;
        const { protocol } = location;
        const url = urlKey ? `${urlKey}.${customBaseUrl}` : portalHostname;
        return `${protocol}//${url}`;
    }
    exports.getBaseUrl = getBaseUrl;
    //////////////////////////////////////
    //
    // Helper functions
    //
    //////////////////////////////////////
    // _getPortalHelpUrl
    function _getPortalHelpUrl(deploymentType, portal) {
        const { host, protocol, port } = location;
        const { allSSL, helpBase } = portal;
        const helpUrl = deploymentType === "enterprise"
            ? `${helpBase}instant-apps/`
            : `${helpBase}`;
        // use secure URL if required - ensure we don't include web adaptor context as helpUrl already includes it,
        // otherwise use whatever protocol they are currently on using a relative URL
        const secureUrl = _getSecureUrl(`${protocol}//${host}`, portal);
        return allSSL ||
            protocol === "https:" ||
            _usePortalSSL(portal) ||
            port === "7443"
            ? `${secureUrl}${helpUrl}`
            : helpUrl;
    }
    // _usePortalSSL
    function _usePortalSSL(portal) {
        const { isMultiTenant, portalHostname, httpPort, httpsPort } = portal;
        // returns true if the following four conditions are met:
        // 1: is single tenant
        // 2: has a web adaptor configured (port ':7080/' does not appear in self.portalHostname)
        // 3: user is accessing portal via non-standard ports (user on 7080|7443, so httpPort !== 80 and httpsPort !== 443)
        // 4: user is currently on HTTPS protocol
        // if these conditions are met, it means we want to remain on SSL for the single-tenant portal
        return ((isMultiTenant === false || portal?.isPortal) &&
            portalHostname &&
            !portalHostname.match(/:7080\//) &&
            httpPort !== 80 &&
            httpsPort !== 443 &&
            location.protocol === "https:");
    }
    // _getSecureUrl
    function _getSecureUrl(url, portal) {
        let secureUrl = null;
        if (!url) {
            url = getBaseUrl(portal);
        }
        const { httpPort, httpsPort, portalMode } = portal;
        const { hostname, port } = location;
        if (!portalMode || portalMode !== "singletenant" || !httpsPort) {
            return url.replace("http:", "https:");
        }
        else {
            if (!port) {
                // default port http port 80
                secureUrl = url.replace(hostname, `${hostname}:${httpsPort}`);
            }
            else {
                secureUrl = url.replace(port, `${httpsPort}`);
                if (portal?.isPortal) {
                    // ensure port is switched for portal
                    secureUrl = secureUrl.replace(httpPort, httpsPort);
                }
            }
            secureUrl = secureUrl.replace("http:", "https:");
            return secureUrl.replace(/\:80\//, "/").replace(/\:443\//, "/");
        }
    }
    async function checkForElement(element, selector) {
        if (!element)
            return null;
        let counter = 50;
        while (element.querySelector(selector) == null) {
            await new Promise((resolve) => requestAnimationFrame(resolve));
            counter--;
            if (counter === 0) {
                return null;
            }
        }
        return element.querySelector(selector);
    }
    exports.checkForElement = checkForElement;
});
