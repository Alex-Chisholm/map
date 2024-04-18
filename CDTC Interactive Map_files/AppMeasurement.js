// @ts-nocheck
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addAdobeScripts = void 0;
    function addAdobeScripts() {
        /*
       Start ActivityMap Module
      
       The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
       allows you to view data overlays on your links and content to understand how
       users engage with your web site. If you do not intend to use ActivityMap, you
       can remove the following block of code from your AppMeasurement.js file.
       Additional documentation on how to configure ActivityMap is available at:
       https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
      */
        function AppMeasurement_Module_ActivityMap(k) {
            function p() { var a = f.pageYOffset + (f.innerHeight || 0); a && a > +g && (g = a); }
            function q() { if (e.scrollReachSelector) {
                var a = k.d.querySelector && k.d.querySelector(e.scrollReachSelector);
                a ? (g = a.scrollTop || 0, a.addEventListener("scroll", function () { var d; (d = a && a.scrollTop + a.clientHeight || 0) > g && (g = d); })) : 0 < v-- && setTimeout(q, 1E3);
            } }
            function l(a, d) { var b, c, n; if (a && d && (b = e.c[d] || (e.c[d] = d.split(","))))
                for (n = 0; n < b.length && (c = b[n++]);)
                    if (-1 < a.indexOf(c))
                        return null; return a; }
            function r(a, d, b, c, e) { var f, h; if (a.dataset && (h = a.dataset[d]))
                f = h;
            else if (a.getAttribute)
                if (h = a.getAttribute("data-" + b))
                    f = h;
                else if (h = a.getAttribute(b))
                    f = h; if (!f && k.useForcedLinkTracking && e) {
                var g;
                a = a.onclick ? "" + a.onclick : "";
                d = "";
                if (c && a && (b = a.indexOf(c), 0 <= b)) {
                    for (b += c.length; b < a.length;)
                        if (h = a.charAt(b++), 0 <= "'\"".indexOf(h)) {
                            g = h;
                            break;
                        }
                    for (var l = !1; b < a.length && g;) {
                        h = a.charAt(b);
                        if (!l && h === g)
                            break;
                        "\\" === h ? l = !0 : (d += h, l = !1);
                        b++;
                    }
                }
                (g = d) && (k.w[c] = g);
            } return f || e && k.w[c]; }
            function s(a, d, b) {
                var c;
                return (c = e[d](a, b)) &&
                    l(m(c), e[d + "Exclusions"]);
            }
            function t(a, d, b) { var c; if (a && !(1 === (c = a.nodeType) && (c = a.nodeName) && (c = c.toUpperCase()) && w[c]) && (1 === a.nodeType && (c = a.nodeValue) && (d[d.length] = c), b.a || b.t || b.s || !a.getAttribute || ((c = a.getAttribute("alt")) ? b.a = c : (c = a.getAttribute("title")) ? b.t = c : "IMG" == ("" + a.nodeName).toUpperCase() && (c = a.getAttribute("src") || a.src) && (b.s = c)), (c = a.childNodes) && c.length))
                for (a = 0; a < c.length; a++)
                    t(c[a], d, b); }
            function m(a) {
                if (null == a || void 0 == a)
                    return a;
                try {
                    return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+", "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$", "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}", "mg"), " ").substring(0, 254);
                }
                catch (d) { }
            }
            var e = this;
            e.s = k;
            var f = window;
            f.s_c_in || (f.s_c_il = [], f.s_c_in = 0);
            e._il = f.s_c_il;
            e._in = f.s_c_in;
            e._il[e._in] = e;
            f.s_c_in++;
            e._c = "s_m";
            var g = 0, u, v = 60;
            e.c = {};
            var w = { SCRIPT: 1, STYLE: 1, LINK: 1, CANVAS: 1 };
            e._g = function () {
                var a, d, b, c = k.contextData, e = k.linkObject;
                (a = k.pageName || k.pageURL) && (d = s(e, "link", k.linkName)) && (b = s(e, "region")) && (c["a.activitymap.page"] = a.substring(0, 255), c["a.activitymap.link"] = 128 < d.length ? d.substring(0, 128) : d, c["a.activitymap.region"] = 127 < b.length ? b.substring(0, 127) : b, 0 < g && (c["a.activitymap.xy"] = 10 * Math.floor(g / 10)), c["a.activitymap.pageIDType"] = k.pageName ? 1 : 0);
            };
            e._d = function () { e.trackScrollReach && !u && (e.scrollReachSelector ? q() : (p(), f.addEventListener && f.addEventListener("scroll", p, !1)), u = !0); };
            e.link = function (a, d) {
                var b;
                if (d)
                    b = l(m(d), e.linkExclusions);
                else if ((b = a) && !(b = r(a, "sObjectId", "s-object-id", "s_objectID", 1))) {
                    var c, f;
                    (f = l(m(a.innerText || a.textContent), e.linkExclusions)) || (t(a, c = [], b = { a: void 0, t: void 0, s: void 0 }), (f = l(m(c.join("")))) || (f = l(m(b.a ? b.a : b.t ? b.t : b.s ? b.s : void 0))) || !(c = (c = a.tagName) && c.toUpperCase ? c.toUpperCase() : "") || ("INPUT" == c || "SUBMIT" == c && a.value ? f = l(m(a.value)) : "IMAGE" == c && a.src && (f = l(m(a.src)))));
                    b = f;
                }
                return b;
            };
            e.region = function (a) {
                for (var d, b = e.regionIDAttribute || "id"; a && (a = a.parentNode);) {
                    if (d =
                        r(a, b, b, b))
                        return d;
                    if ("BODY" == a.nodeName)
                        return "BODY";
                }
            };
        }
        window["AppMeasurement_Module_ActivityMap"] = AppMeasurement_Module_ActivityMap;
        /* End ActivityMap Module */
        /*
         ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============
        
        AppMeasurement for JavaScript version: 2.23.0
        Copyright 1996-2016 Adobe, Inc. All Rights Reserved
        More info available at http://www.adobe.com/marketing-cloud.html
        */
        function AppMeasurement(r) {
            var a = this;
            a.version = "2.23.0";
            var h = window;
            h.s_c_in || (h.s_c_il = [], h.s_c_in = 0);
            a._il = h.s_c_il;
            a._in = h.s_c_in;
            a._il[a._in] = a;
            h.s_c_in++;
            a._c = "s_c";
            var q = h.AppMeasurement.mc;
            q || (q = null);
            var p = h, m, s;
            try {
                for (m = p.parent, s = p.location; m && m.location && s && "" + m.location !== "" + s && p.location && "" + m.location !== "" + p.location && m.location.host === s.host;)
                    p = m, m = p.parent;
            }
            catch (u) { }
            a.log = function (a) { try {
                console.log(a);
            }
            catch (c) { } };
            a.Sa = function (a) { return "" + parseInt(a) == "" + a; };
            a.replace = function (a, c, d) { return !a || 0 > a.indexOf(c) ? a : a.split(c).join(d); };
            a.escape = function (b) { var c, d; if (!b)
                return b; b = encodeURIComponent(b); for (c = 0; 7 > c; c++)
                d = "+~!*()'".substring(c, c + 1), 0 <= b.indexOf(d) && (b = a.replace(b, d, "%" + d.charCodeAt(0).toString(16).toUpperCase())); return b; };
            a.unescape = function (b) { if (!b)
                return b; b = 0 <= b.indexOf("+") ? a.replace(b, "+", " ") : b; try {
                return decodeURIComponent(b);
            }
            catch (c) { } return unescape(b); };
            a.Rb = function () {
                var b = h.location.hostname, c = a.fpCookieDomainPeriods, d;
                c || (c = a.cookieDomainPeriods);
                if (b && !a.La && !/^[0-9.]+$/.test(b) && (c = c ? parseInt(c) : 2, c = 2 < c ? c : 2, d = b.lastIndexOf("."), 0 <= d)) {
                    for (; 0 <= d && 1 < c;)
                        d = b.lastIndexOf(".", d - 1), c--;
                    a.La = 0 < d ? b.substring(d) : b;
                }
                return a.La;
            };
            a.c_r = a.cookieRead = function (b) { b = a.escape(b); var c = " " + a.d.cookie, d = c.indexOf(" " + b + "="), f = 0 > d ? d : c.indexOf(";", d); b = 0 > d ? "" : a.unescape(c.substring(d + 2 + b.length, 0 > f ? c.length : f)); return "[[B]]" != b ? b : ""; };
            a.c_w = a.cookieWrite = function (b, c, d) {
                var f = a.Rb(), e = a.cookieLifetime, g;
                c = "" + c;
                e = e ? ("" + e).toUpperCase() : "";
                d && "SESSION" != e && "NONE" !=
                    e && ((g = "" != c ? parseInt(e ? e : 0) : -60) ? (d = new Date, d.setTime(d.getTime() + 1E3 * g)) : 1 === d && (d = new Date, g = d.getYear(), d.setYear(g + 2 + (1900 > g ? 1900 : 0))));
                return b && "NONE" != e ? (a.d.cookie = a.escape(b) + "=" + a.escape("" != c ? c : "[[B]]") + "; path=/;" + (d && "SESSION" != e ? " expires=" + d.toUTCString() + ";" : "") + (f ? " domain=" + f + ";" : "") + (a.writeSecureCookies ? " secure;" : ""), a.cookieRead(b) == c) : 0;
            };
            a.Ob = function () { var b = a.Util.getIeVersion(); "number" === typeof b && 10 > b && (a.unsupportedBrowser = !0, a.Bb(a, function () { })); };
            a.za = function () {
                var a = navigator.userAgent;
                return "Microsoft Internet Explorer" === navigator.appName || 0 <= a.indexOf("MSIE ") || 0 <= a.indexOf("Trident/") && 0 <= a.indexOf("Windows NT 6") ? !0 : !1;
            };
            a.Bb = function (a, c) { for (var d in a)
                Object.prototype.hasOwnProperty.call(a, d) && "function" === typeof a[d] && (a[d] = c); };
            a.K = [];
            a.fa = function (b, c, d) {
                if (a.Ma)
                    return 0;
                a.maxDelay || (a.maxDelay = 250);
                var f = 0, e = (new Date).getTime() + a.maxDelay, g = a.d.visibilityState, k = ["webkitvisibilitychange", "visibilitychange"];
                g || (g = a.d.webkitVisibilityState);
                if (g && "prerender" ==
                    g) {
                    if (!a.ga)
                        for (a.ga = 1, d = 0; d < k.length; d++)
                            a.d.addEventListener(k[d], function () { var b = a.d.visibilityState; b || (b = a.d.webkitVisibilityState); "visible" == b && (a.ga = 0, a.delayReady()); });
                    f = 1;
                    e = 0;
                }
                else
                    d || a.u("_d") && (f = 1);
                f && (a.K.push({ m: b, a: c, t: e }), a.ga || setTimeout(a.delayReady, a.maxDelay));
                return f;
            };
            a.delayReady = function () {
                var b = (new Date).getTime(), c = 0, d;
                for (a.u("_d") ? c = 1 : a.Ba(); 0 < a.K.length;) {
                    d = a.K.shift();
                    if (c && !d.t && d.t > b) {
                        a.K.unshift(d);
                        setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
                        break;
                    }
                    a.Ma = 1;
                    a[d.m].apply(a, d.a);
                    a.Ma = 0;
                }
            };
            a.setAccount = a.sa = function (b) { var c, d; if (!a.fa("setAccount", arguments))
                if (a.account = b, a.allAccounts)
                    for (c = a.allAccounts.concat(b.split(",")), a.allAccounts = [], c.sort(), d = 0; d < c.length; d++)
                        0 != d && c[d - 1] == c[d] || a.allAccounts.push(c[d]);
                else
                    a.allAccounts = b.split(","); };
            a.foreachVar = function (b, c) {
                var d, f, e, g, k = "";
                e = f = "";
                if (a.lightProfileID)
                    d = a.O, (k = a.lightTrackVars) && (k = "," + k + "," + a.la.join(",") + ",");
                else {
                    d = a.g;
                    if (a.pe || a.linkType)
                        k = a.linkTrackVars, f = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (k = a[e].ic, f = a[e].hc));
                    k && (k = "," + k + "," + a.D.join(",") + ",");
                    f && k && (k += ",events,");
                }
                c && (c = "," + c + ",");
                for (f = 0; f < d.length; f++)
                    e = d[f], (g = a[e]) && (!k || 0 <= k.indexOf("," + e + ",")) && (!c || 0 <= c.indexOf("," + e + ",")) && b(e, g);
            };
            a.l = function (b, c, d, f, e) {
                var g = "", k, l, h, n, m = 0;
                "contextData" == b && (b = "c");
                "clientHints" == b && (b = "h");
                if (c) {
                    for (k in c)
                        if (!(Object.prototype[k] || e && k.substring(0, e.length) != e) && c[k] && (!d || 0 <= d.indexOf("," + (f ? f + "." : "") + k + ","))) {
                            h = !1;
                            if (m)
                                for (l = 0; l < m.length; l++)
                                    if (k.substring(0, m[l].length) == m[l]) {
                                        h = !0;
                                        break;
                                    }
                            if (!h && ("" == g && (g += "&" + b + "."), l = c[k], e && (k = k.substring(e.length)), 0 < k.length))
                                if (h = k.indexOf("."), 0 < h)
                                    l = k.substring(0, h), h = (e ? e : "") + l + ".", m || (m = []), m.push(h), g += a.l(l, c, d, f, h);
                                else if ("boolean" == typeof l && (l = l ? "true" : "false"), l) {
                                    if ("retrieveLightData" == f && 0 > e.indexOf(".contextData."))
                                        switch (h = k.substring(0, 4), n = k.substring(4), k) {
                                            case "transactionID":
                                                k = "xact";
                                                break;
                                            case "channel":
                                                k = "ch";
                                                break;
                                            case "campaign":
                                                k = "v0";
                                                break;
                                            default: a.Sa(n) && ("prop" == h ? k = "c" + n : "eVar" == h ?
                                                k = "v" + n : "list" == h ? k = "l" + n : "hier" == h && (k = "h" + n, l = l.substring(0, 255)));
                                        }
                                    g += "&" + a.escape(k) + "=" + a.escape(l);
                                }
                        }
                    "" != g && (g += "&." + b);
                }
                return g;
            };
            a.usePostbacks = 0;
            a.Ub = function () {
                var b = "", c, d, f, e, g, k, l, h, n = "", m = "", p = e = "", r = a.T();
                if (a.lightProfileID)
                    c = a.O, (n = a.lightTrackVars) && (n = "," + n + "," + a.la.join(",") + ",");
                else {
                    c = a.g;
                    if (a.pe || a.linkType)
                        n = a.linkTrackVars, m = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (n = a[e].ic, m = a[e].hc));
                    n && (n = "," + n + "," + a.D.join(",") + ",");
                    m && (m = "," +
                        m + ",", n && (n += ",events,"));
                    a.events2 && (p += ("" != p ? "," : "") + a.events2);
                }
                if (r && r.getCustomerIDs) {
                    e = q;
                    if (g = r.getCustomerIDs())
                        for (d in g)
                            Object.prototype[d] || (f = g[d], "object" == typeof f && (e || (e = {}), f.id && (e[d + ".id"] = f.id), f.authState && (e[d + ".as"] = f.authState)));
                    e && (b += a.l("cid", e));
                }
                a.AudienceManagement && a.AudienceManagement.isReady() && (b += a.l("d", a.AudienceManagement.getEventCallConfigParams()));
                for (d = 0; d < c.length; d++) {
                    e = c[d];
                    g = a[e];
                    f = e.substring(0, 4);
                    k = e.substring(4);
                    g || ("events" == e && p ? (g = p, p = "") : "marketingCloudOrgID" ==
                        e && r && a.V("ECID") && (g = r.marketingCloudOrgID));
                    if (g && (!n || 0 <= n.indexOf("," + e + ","))) {
                        switch (e) {
                            case "customerPerspective":
                                e = "cp";
                                break;
                            case "marketingCloudOrgID":
                                e = "mcorgid";
                                break;
                            case "supplementalDataID":
                                e = "sdid";
                                break;
                            case "timestamp":
                                e = "ts";
                                break;
                            case "dynamicVariablePrefix":
                                e = "D";
                                break;
                            case "visitorID":
                                e = "vid";
                                break;
                            case "marketingCloudVisitorID":
                                e = "mid";
                                break;
                            case "analyticsVisitorID":
                                e = "aid";
                                break;
                            case "audienceManagerLocationHint":
                                e = "aamlh";
                                break;
                            case "audienceManagerBlob":
                                e = "aamb";
                                break;
                            case "authState":
                                e =
                                    "as";
                                break;
                            case "pageURL":
                                e = "g";
                                255 < g.length && (a.pageURLRest = g.substring(255), g = g.substring(0, 255));
                                break;
                            case "pageURLRest":
                                e = "-g";
                                break;
                            case "referrer":
                                e = "r";
                                break;
                            case "vmk":
                            case "visitorMigrationKey":
                                e = "vmt";
                                break;
                            case "visitorMigrationServer":
                                e = "vmf";
                                a.ssl && a.visitorMigrationServerSecure && (g = "");
                                break;
                            case "visitorMigrationServerSecure":
                                e = "vmf";
                                !a.ssl && a.visitorMigrationServer && (g = "");
                                break;
                            case "charSet":
                                e = "ce";
                                break;
                            case "visitorNamespace":
                                e = "ns";
                                break;
                            case "cookieDomainPeriods":
                                e = "cdp";
                                break;
                            case "cookieLifetime":
                                e = "cl";
                                break;
                            case "variableProvider":
                                e = "vvp";
                                break;
                            case "currencyCode":
                                e = "cc";
                                break;
                            case "channel":
                                e = "ch";
                                break;
                            case "transactionID":
                                e = "xact";
                                break;
                            case "campaign":
                                e = "v0";
                                break;
                            case "latitude":
                                e = "lat";
                                break;
                            case "longitude":
                                e = "lon";
                                break;
                            case "resolution":
                                e = "s";
                                break;
                            case "colorDepth":
                                e = "c";
                                break;
                            case "javascriptVersion":
                                e = "j";
                                break;
                            case "javaEnabled":
                                e = "v";
                                break;
                            case "cookiesEnabled":
                                e = "k";
                                break;
                            case "browserWidth":
                                e = "bw";
                                break;
                            case "browserHeight":
                                e = "bh";
                                break;
                            case "connectionType":
                                e =
                                    "ct";
                                break;
                            case "homepage":
                                e = "hp";
                                break;
                            case "events":
                                p && (g += ("" != g ? "," : "") + p);
                                if (m)
                                    for (k = g.split(","), g = "", f = 0; f < k.length; f++)
                                        l = k[f], h = l.indexOf("="), 0 <= h && (l = l.substring(0, h)), h = l.indexOf(":"), 0 <= h && (l = l.substring(0, h)), 0 <= m.indexOf("," + l + ",") && (g += (g ? "," : "") + k[f]);
                                break;
                            case "events2":
                                g = "";
                                break;
                            case "contextData":
                                b += a.l("c", a[e], n, e);
                                g = "";
                                break;
                            case "clientHints":
                                b += a.l("h", a[e], n, e);
                                g = "";
                                break;
                            case "lightProfileID":
                                e = "mtp";
                                break;
                            case "lightStoreForSeconds":
                                e = "mtss";
                                a.lightProfileID || (g = "");
                                break;
                            case "lightIncrementBy":
                                e = "mti";
                                a.lightProfileID || (g = "");
                                break;
                            case "retrieveLightProfiles":
                                e = "mtsr";
                                break;
                            case "deleteLightProfiles":
                                e = "mtsd";
                                break;
                            case "retrieveLightData":
                                a.retrieveLightProfiles && (b += a.l("mts", a[e], n, e));
                                g = "";
                                break;
                            default: a.Sa(k) && ("prop" == f ? e = "c" + k : "eVar" == f ? e = "v" + k : "list" == f ? e = "l" + k : "hier" == f && (e = "h" + k, g = g.substring(0, 255)));
                        }
                        g && (b += "&" + e + "=" + ("pev" != e.substring(0, 3) ? a.escape(g) : g));
                    }
                    "pev3" == e && a.e && (b += a.e);
                }
                a.ka && (b += "&lrt=" + a.ka, a.ka = null);
                return b;
            };
            a.B = function (a) {
                var c = a.tagName;
                if ("undefined" != "" + a.pc || "undefined" != "" + a.cc && "HTML" != ("" + a.cc).toUpperCase())
                    return "";
                c = c && c.toUpperCase ? c.toUpperCase() : "";
                "SHAPE" == c && (c = "");
                c && (("INPUT" == c || "BUTTON" == c) && a.type && a.type.toUpperCase ? c = a.type.toUpperCase() : !c && a.href && (c = "A"));
                return c;
            };
            a.Oa = function (a) {
                var c = h.location, d = a.href ? a.href : "", f, e, g;
                "string" !== typeof d && (d = "");
                f = d.indexOf(":");
                e = d.indexOf("?");
                g = d.indexOf("/");
                d && (0 > f || 0 <= e && f > e || 0 <= g && f > g) && (e = a.protocol && 1 < a.protocol.length ? a.protocol : c.protocol ? c.protocol : "", f = c.pathname.lastIndexOf("/"),
                    d = (e ? e + "//" : "") + (a.host ? a.host : c.host ? c.host : "") + ("/" != d.substring(0, 1) ? c.pathname.substring(0, 0 > f ? 0 : f) + "/" : "") + d);
                return d;
            };
            a.L = function (b) {
                var c = a.B(b), d, f, e = "", g = 0;
                return c && (d = b.protocol, f = b.onclick, !b.href || "A" != c && "AREA" != c || f && d && !(0 > d.toLowerCase().indexOf("javascript")) ? f ? (e = a.replace(a.replace(a.replace(a.replace("" + f, "\r", ""), "\n", ""), "\t", ""), " ", ""), g = 2) : "INPUT" == c || "SUBMIT" == c ? (b.value ? e = b.value : b.innerText ? e = b.innerText : b.textContent && (e = b.textContent), g = 3) : "IMAGE" == c && b.src && (e = b.src) :
                    e = a.Oa(b), e) ? { id: e.substring(0, 100), type: g } : 0;
            };
            a.nc = function (b) { for (var c = a.B(b), d = a.L(b); b && !d && "BODY" != c;)
                if (b = b.parentElement ? b.parentElement : b.parentNode)
                    c = a.B(b), d = a.L(b); d && "BODY" != c || (b = 0); b && (c = b.onclick ? "" + b.onclick : "", 0 <= c.indexOf(".tl(") || 0 <= c.indexOf(".trackLink(")) && (b = 0); return b; };
            a.bc = function () {
                var b, c, d = a.linkObject, f = a.linkType, e = a.linkURL, g, k;
                a.ma = 1;
                d || (a.ma = 0, d = a.clickObject);
                if (d) {
                    b = a.B(d);
                    for (c = a.L(d); d && !c && "BODY" != b;)
                        if (d = d.parentElement ? d.parentElement : d.parentNode)
                            b = a.B(d),
                                c = a.L(d);
                    c && "BODY" != b || (d = 0);
                    if (d && !a.linkObject) {
                        var l = d.onclick ? "" + d.onclick : "";
                        if (0 <= l.indexOf(".tl(") || 0 <= l.indexOf(".trackLink("))
                            d = 0;
                    }
                }
                else
                    a.ma = 1;
                !e && d && (e = a.Oa(d));
                e && !a.linkLeaveQueryString && (g = e.indexOf("?"), 0 <= g && (e = e.substring(0, g)));
                if (!f && e) {
                    var m = 0, n = 0, p;
                    if (a.trackDownloadLinks && a.linkDownloadFileTypes)
                        for (l = e.toLowerCase(), g = l.indexOf("?"), k = l.indexOf("#"), 0 <= g ? 0 <= k && k < g && (g = k) : g = k, 0 <= g && (l = l.substring(0, g)), g = a.linkDownloadFileTypes.toLowerCase().split(","), k = 0; k < g.length; k++)
                            (p = g[k]) &&
                                l.substring(l.length - (p.length + 1)) == "." + p && (f = "d");
                    if (a.trackExternalLinks && !f && (l = e.toLowerCase(), a.Ra(l) && (a.linkInternalFilters || (a.linkInternalFilters = h.location.hostname), g = 0, a.linkExternalFilters ? (g = a.linkExternalFilters.toLowerCase().split(","), m = 1) : a.linkInternalFilters && (g = a.linkInternalFilters.toLowerCase().split(",")), g))) {
                        for (k = 0; k < g.length; k++)
                            p = g[k], 0 <= l.indexOf(p) && (n = 1);
                        n ? m && (f = "e") : m || (f = "e");
                    }
                }
                a.linkObject = d;
                a.linkURL = e;
                a.linkType = f;
                if (a.trackClickMap || a.trackInlineStats)
                    a.e = "", d &&
                        (f = a.pageName, e = 1, d = d.sourceIndex, f || (f = a.pageURL, e = 0), h.s_objectID && (c.id = h.s_objectID, d = c.type = 1), f && c && c.id && b && (a.e = "&pid=" + a.escape(f.substring(0, 255)) + (e ? "&pidt=" + e : "") + "&oid=" + a.escape(c.id.substring(0, 100)) + (c.type ? "&oidt=" + c.type : "") + "&ot=" + b + (d ? "&oi=" + d : "")));
            };
            a.Vb = function () {
                var b = a.ma, c = a.linkType, d = a.linkURL, f = a.linkName;
                c && (d || f) && (c = c.toLowerCase(), "d" != c && "e" != c && (c = "o"), a.pe = "lnk_" + c, a.pev1 = d ? a.escape(d) : "", a.pev2 = f ? a.escape(f) : "", b = 1);
                a.abort && (b = 0);
                if (a.trackClickMap || a.trackInlineStats ||
                    a.Yb()) {
                    var c = {}, d = 0, e = a.vb(), g = e ? e.split("&") : 0, k, l, h, e = 0;
                    if (g)
                        for (k = 0; k < g.length; k++)
                            l = g[k].split("="), f = a.unescape(l[0]).split(","), l = a.unescape(l[1]), c[l] = f;
                    f = a.account.split(",");
                    k = {};
                    for (h in a.contextData)
                        h && !Object.prototype[h] && "a.activitymap." == h.substring(0, 14) && (k[h] = a.contextData[h], a.contextData[h] = "");
                    a.e = a.l("c", k) + (a.e ? a.e : "");
                    if (b || a.e) {
                        b && !a.e && (e = 1);
                        for (l in c)
                            if (!Object.prototype[l])
                                for (h = 0; h < f.length; h++)
                                    for (e && (g = c[l].join(","), g == a.account && (a.e += ("&" != l.charAt(0) ? "&" : "") +
                                        l, c[l] = [], d = 1)), k = 0; k < c[l].length; k++)
                                        g = c[l][k], g == f[h] && (e && (a.e += "&u=" + a.escape(g) + ("&" != l.charAt(0) ? "&" : "") + l + "&u=0"), c[l].splice(k, 1), d = 1);
                        b || (d = 1);
                        if (d) {
                            e = "";
                            k = 2;
                            !b && a.e && (e = a.escape(f.join(",")) + "=" + a.escape(a.e), k = 1);
                            for (l in c)
                                !Object.prototype[l] && 0 < k && 0 < c[l].length && (e += (e ? "&" : "") + a.escape(c[l].join(",")) + "=" + a.escape(l), k--);
                            a.Db(e);
                        }
                    }
                }
                return b;
            };
            a.vb = function () { if (a.useLinkTrackSessionStorage) {
                if (a.Fa())
                    return h.sessionStorage.getItem(a.P);
            }
            else
                return a.cookieRead(a.P); };
            a.Fa = function () {
                return h.sessionStorage ?
                    !0 : !1;
            };
            a.Db = function (b) { a.useLinkTrackSessionStorage ? a.Fa() && h.sessionStorage.setItem(a.P, b) : a.cookieWrite(a.P, b); };
            a.Wb = function () {
                if (!a.gc) {
                    var b = new Date, c = p.location, d, f, e = f = d = "", g = "", k = "", l = "1.2", h = a.cookieWrite("s_cc", "true", 0) ? "Y" : "N", m = "", q = "";
                    if (b.setUTCDate && (l = "1.3", (0).toPrecision && (l = "1.5", b = [], b.forEach))) {
                        l = "1.6";
                        f = 0;
                        d = {};
                        try {
                            f = new Iterator(d), f.next && (l = "1.7", b.reduce && (l = "1.8", l.trim && (l = "1.8.1", Date.parse && (l = "1.8.2", Object.create && (l = "1.8.5")))));
                        }
                        catch (r) { }
                    }
                    d = screen.width + "x" + screen.height;
                    e = navigator.javaEnabled() ? "Y" : "N";
                    f = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
                    g = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
                    k = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
                    try {
                        a.b.addBehavior("#default#homePage"), m = a.b.oc(c) ? "Y" : "N";
                    }
                    catch (s) { }
                    try {
                        a.b.addBehavior("#default#clientCaps"), q = a.b.connectionType;
                    }
                    catch (t) { }
                    a.resolution = d;
                    a.colorDepth = f;
                    a.javascriptVersion = l;
                    a.javaEnabled = e;
                    a.cookiesEnabled = h;
                    a.browserWidth = g;
                    a.browserHeight = k;
                    a.connectionType =
                        q;
                    a.homepage = m;
                    a.gc = 1;
                }
            };
            a.ib = function () { if (a.collectHighEntropyUserAgentHints && !a.H && a.cb()) {
                a.H = !0;
                try {
                    navigator.userAgentData.getHighEntropyValues(a.ta).then(function (b) { a.clientHints = {}; a.ta.forEach(function (d) { Object.prototype.hasOwnProperty.call(b, d) && (a.clientHints[d] = b[d]); }); })["catch"](function (b) { a.H = !1; a.clientHints = {}; a.debugTracking && a.log(b.message); });
                }
                catch (b) {
                    a.H = !1, a.clientHints = {}, a.debugTracking && a.log(b.message);
                }
            }
            else
                a.clientHints = {}; };
            a.cb = function () { return "undefined" !== typeof navigator.userAgentData; };
            a.Q = {};
            a.loadModule = function (b, c) { var d = a.Q[b]; if (!d) {
                d = h["AppMeasurement_Module_" + b] ? new h["AppMeasurement_Module_" + b](a) : {};
                a.Q[b] = a[b] = d;
                d.ob = function () { return d.yb; };
                d.Eb = function (c) { if (d.yb = c)
                    a[b + "_onLoad"] = c, a.fa(b + "_onLoad", [a, d], 1) || c(a, d); };
                try {
                    Object.defineProperty ? Object.defineProperty(d, "onLoad", { get: d.ob, set: d.Eb }) : d._olc = 1;
                }
                catch (f) {
                    d._olc = 1;
                }
            } c && (a[b + "_onLoad"] = c, a.fa(b + "_onLoad", [a, d], 1) || c(a, d)); };
            a.u = function (b) {
                var c, d;
                for (c in a.Q)
                    if (!Object.prototype[c] && (d = a.Q[c]) && (d._olc && d.onLoad &&
                        (d._olc = 0, d.onLoad(a, d)), d[b] && d[b]()))
                        return 1;
                return 0;
            };
            a.Yb = function () { return a.ActivityMap && a.ActivityMap._c ? !0 : !1; };
            a.Zb = function () { var b = Math.floor(1E13 * Math.random()), c = a.visitorSampling, d = a.visitorSamplingGroup, d = "s_vsn_" + (a.visitorNamespace ? a.visitorNamespace : a.account) + (d ? "_" + d : ""), f = a.cookieRead(d); if (c) {
                c *= 100;
                f && (f = parseInt(f));
                if (!f) {
                    if (!a.cookieWrite(d, b))
                        return 0;
                    f = b;
                }
                if (f % 1E4 > c)
                    return 0;
            } return 1; };
            a.S = function (b, c) {
                var d, f, e, g, k, h, m;
                m = {};
                for (d = 0; 2 > d; d++)
                    for (f = 0 < d ? a.Ha : a.g, e = 0; e < f.length; e++)
                        if (g =
                            f[e], (k = b[g]) || b["!" + g]) {
                            if (k && !c && ("contextData" == g || "retrieveLightData" == g) && a[g])
                                for (h in a[g])
                                    k[h] || (k[h] = a[g][h]);
                            a[g] || (m["!" + g] = 1);
                            m[g] = a[g];
                            a[g] = k;
                        }
                return m;
            };
            a.lc = function (b) {
                var c, d, f, e;
                for (c = 0; 2 > c; c++)
                    for (d = 0 < c ? a.Ha : a.g, f = 0; f < d.length; f++)
                        e = d[f], b[e] = a[e], b[e] || "prop" !== e.substring(0, 4) && "eVar" !== e.substring(0, 4) && "hier" !== e.substring(0, 4) && "list" !== e.substring(0, 4) && "channel" !== e && "events" !== e && "eventList" !== e && "products" !== e && "productList" !== e && "purchaseID" !== e && "transactionID" !== e && "state" !==
                            e && "zip" !== e && "campaign" !== e && "events2" !== e && "latitude" !== e && "longitude" !== e && "ms_a" !== e && "contextData" !== e && "supplementalDataID" !== e && "tnt" !== e && "timestamp" !== e && "abort" !== e && "useBeacon" !== e && "linkObject" !== e && "clickObject" !== e && "linkType" !== e && "linkName" !== e && "linkURL" !== e && "bodyClickTarget" !== e && "bodyClickFunction" !== e || (b["!" + e] = 1);
            };
            a.Qb = function (a) {
                var c, d, f, e, g, k = 0, h, m = "", n = "";
                if (a && 255 < a.length && (c = "" + a, d = c.indexOf("?"), 0 < d && (h = c.substring(d + 1), c = c.substring(0, d), e = c.toLowerCase(), f = 0, "http://" ==
                    e.substring(0, 7) ? f += 7 : "https://" == e.substring(0, 8) && (f += 8), d = e.indexOf("/", f), 0 < d && (e = e.substring(f, d), g = c.substring(d), c = c.substring(0, d), 0 <= e.indexOf("google") ? k = ",q,ie,start,search_key,word,kw,cd," : 0 <= e.indexOf("yahoo.co") ? k = ",p,ei," : 0 <= e.indexOf("baidu.") && (k = ",wd,word,"), k && h)))) {
                    if ((a = h.split("&")) && 1 < a.length) {
                        for (f = 0; f < a.length; f++)
                            e = a[f], d = e.indexOf("="), 0 < d && 0 <= k.indexOf("," + e.substring(0, d) + ",") ? m += (m ? "&" : "") + e : n += (n ? "&" : "") + e;
                        m && n ? h = m + "&" + n : n = "";
                    }
                    d = 253 - (h.length - n.length) - c.length;
                    a = c +
                        (0 < d ? g.substring(0, d) : "") + "?" + h;
                }
                return a;
            };
            a.gb = function (b) { var c = a.d.visibilityState, d = ["webkitvisibilitychange", "visibilitychange"]; c || (c = a.d.webkitVisibilityState); if (c && "prerender" == c) {
                if (b)
                    for (c = 0; c < d.length; c++)
                        a.d.addEventListener(d[c], function () { var c = a.d.visibilityState; c || (c = a.d.webkitVisibilityState); "visible" == c && b(); });
                return !1;
            } return !0; };
            a.ca = !1;
            a.G = !1;
            a.Gb = function () { a.G = !0; a.p(); };
            a.I = !1;
            a.Hb = function (b) {
                a.marketingCloudVisitorID = b.MCMID;
                a.visitorOptedOut = b.MCOPTOUT;
                a.analyticsVisitorID =
                    b.MCAID;
                a.audienceManagerLocationHint = b.MCAAMLH;
                a.audienceManagerBlob = b.MCAAMB;
                a.I = !1;
                a.p();
            };
            a.fb = function (b) { a.maxDelay || (a.maxDelay = 250); return a.u("_d") ? (b && setTimeout(function () { b(); }, a.maxDelay), !1) : !0; };
            a.aa = !1;
            a.F = !1;
            a.Ba = function () { a.F = !0; a.p(); };
            a.isReadyToTrack = function () { var b = !0; if (!a.sb() || !a.qb())
                return !1; a.ub() || (b = !1); a.xb() || (b = !1); a.hb() || (b = !1); return b; };
            a.sb = function () { a.ca || a.G || (a.gb(a.Gb) ? a.G = !0 : a.ca = !0); return a.ca && !a.G ? !1 : !0; };
            a.qb = function () {
                var b = a.xa();
                if (b)
                    if (a.ua || a.ba)
                        if (a.ua) {
                            if (!b.isApproved(b.Categories.ANALYTICS))
                                return !1;
                        }
                        else
                            return !1;
                    else
                        return b.fetchPermissions(a.zb, !0), a.ba = !0, !1;
                return !0;
            };
            a.V = function (b) { var c = a.xa(); return c && !c.isApproved(c.Categories[b]) ? !1 : !0; };
            a.xa = function () { return h.adobe && h.adobe.optIn ? h.adobe.optIn : null; };
            a.Y = !0;
            a.ub = function () { var b = a.T(); if (!b || !b.getVisitorValues)
                return !0; a.Y && (a.Y = !1, a.I || (a.I = !0, b.getVisitorValues(a.Hb))); return !a.I; };
            a.T = function () { var b = a.visitor; b && !b.isAllowed() && (b = null); return b; };
            a.xb = function () { a.aa || a.F || (a.fb(a.Ba) ? a.F = !0 : a.aa = !0); return a.aa && !a.F ? !1 : !0; };
            a.hb = function () {
                a.H ||
                    a.clientHints || a.ib();
                return a.clientHints;
            };
            a.ba = !1;
            a.zb = function () { a.ba = !1; a.ua = !0; };
            a.j = q;
            a.q = 0;
            a.callbackWhenReadyToTrack = function (b, c, d) { var f; f = {}; f.Lb = b; f.Kb = c; f.Ib = d; a.j == q && (a.j = []); a.j.push(f); 0 == a.q && (a.q = setInterval(a.p, 100)); };
            a.p = function () { var b; if (a.isReadyToTrack() && (a.Fb(), a.j != q))
                for (; 0 < a.j.length;)
                    b = a.j.shift(), b.Kb.apply(b.Lb, b.Ib); };
            a.Fb = function () { a.q && (clearInterval(a.q), a.q = 0); };
            a.va = function (b) {
                var c, d = {};
                a.lc(d);
                if (b != q)
                    for (c in b)
                        d[c] = b[c];
                a.callbackWhenReadyToTrack(a, a.Ga, [d]);
                a.Ea();
            };
            a.Sb = function () { var b = a.cookieRead("s_fid"), c = "", d = "", f; f = 8; var e = 4; if (!b || 0 > b.indexOf("-")) {
                for (b = 0; 16 > b; b++)
                    f = Math.floor(Math.random() * f), c += "0123456789ABCDEF".substring(f, f + 1), f = Math.floor(Math.random() * e), d += "0123456789ABCDEF".substring(f, f + 1), f = e = 16;
                b = c + "-" + d;
            } a.cookieWrite("s_fid", b, 1) || (b = 0); return b; };
            a.Ga = function (b) {
                var c = new Date, d = "s" + Math.floor(c.getTime() / 108E5) % 10 + Math.floor(1E13 * Math.random()), f = c.getYear(), f = "t=" + a.escape(c.getDate() + "/" + c.getMonth() + "/" + (1900 > f ? f + 1900 :
                    f) + " " + c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds() + " " + c.getDay() + " " + c.getTimezoneOffset()), e = a.T(), g;
                b && (g = a.S(b, 1));
                a.Zb() && !a.visitorOptedOut && (a.ya() || (a.fid = a.Sb()), a.bc(), a.usePlugins && a.doPlugins && a.doPlugins(a), a.account && (a.abort || (a.trackOffline && !a.timestamp && (a.timestamp = Math.floor(c.getTime() / 1E3)), b = h.location, a.pageURL || (a.pageURL = b.href ? b.href : b), a.referrer || a.ab || (b = a.Util.getQueryParam("adobe_mc_ref", null, null, !0), a.referrer = b || void 0 === b ? void 0 === b ? "" : b : p.document.referrer),
                    a.ab = 1, !a.referrer && a.Z && (a.referrer = a.Z), a.Z = 0, a.referrer = a.Qb(a.referrer), a.u("_g")), a.Vb() && !a.abort && (e && a.V("TARGET") && !a.supplementalDataID && e.getSupplementalDataID && (a.supplementalDataID = e.getSupplementalDataID("AppMeasurement:" + a._in, a.expectSupplementalData ? !1 : !0)), a.V("AAM") || (a.contextData["cm.ssf"] = 1), a.Wb(), a.Ab(), f += a.Ub(), a.wb(d, f), a.u("_t"), a.referrer = "", a.contextData && a.contextData.excCodes && (a.contextData.excCodes = 0))));
                a.referrer && (a.Z = a.referrer);
                a.Ea();
                g && a.S(g, 1);
            };
            a.t = a.track =
                function (b, c) { c && a.S(c); a.Y = !0; a.isReadyToTrack() ? null != a.j && 0 < a.j.length ? (a.va(b), a.p()) : a.Ga(b) : a.va(b); };
            a.Ab = function () { a.writeSecureCookies && !a.ssl && a.bb(); };
            a.bb = function () { a.contextData.excCodes = a.contextData.excCodes || []; a.contextData.excCodes.push(1); };
            a.Ea = function () { a.abort = a.supplementalDataID = a.timestamp = a.pageURLRest = a.linkObject = a.clickObject = a.linkURL = a.linkName = a.linkType = h.s_objectID = a.pe = a.pev1 = a.pev2 = a.pev3 = a.e = a.lightProfileID = a.useBeacon = a.referrer = 0; };
            a.Da = [];
            a.registerPreTrackCallback =
                function (b) { for (var c = [], d = 1; d < arguments.length; d++)
                    c.push(arguments[d]); "function" == typeof b ? a.Da.push([b, c]) : a.debugTracking && a.log("Warning, Non function type passed to registerPreTrackCallback"); };
            a.lb = function (b) { a.wa(a.Da, b); };
            a.Ca = [];
            a.registerPostTrackCallback = function (b) { for (var c = [], d = 1; d < arguments.length; d++)
                c.push(arguments[d]); "function" == typeof b ? a.Ca.push([b, c]) : a.debugTracking && a.log("Warning, Non function type passed to registerPostTrackCallback"); };
            a.kb = function (b) { a.wa(a.Ca, b); };
            a.wa =
                function (b, c) { if ("object" == typeof b)
                    for (var d = 0; d < b.length; d++) {
                        var f = b[d][0], e = b[d][1].slice();
                        e.unshift(c);
                        if ("function" == typeof f)
                            try {
                                f.apply(null, e);
                            }
                            catch (g) {
                                a.debugTracking && a.log(g.message);
                            }
                    } };
            a.tl = a.trackLink = function (b, c, d, f, e) { a.linkObject = b; a.linkType = c; a.linkName = d; e && (a.bodyClickTarget = b, a.bodyClickFunction = e); return a.track(f); };
            a.trackLight = function (b, c, d, f) { a.lightProfileID = b; a.lightStoreForSeconds = c; a.lightIncrementBy = d; return a.track(f); };
            a.clearVars = function () {
                var b, c;
                for (b = 0; b < a.g.length; b++)
                    if (c =
                        a.g[b], "prop" == c.substring(0, 4) || "eVar" == c.substring(0, 4) || "hier" == c.substring(0, 4) || "list" == c.substring(0, 4) || "channel" == c || "events" == c || "eventList" == c || "products" == c || "productList" == c || "purchaseID" == c || "transactionID" == c || "state" == c || "zip" == c || "campaign" == c)
                        a[c] = void 0;
            };
            a.tagContainerMarker = "";
            a.wb = function (b, c) { var d = a.mb() + "/" + b + "?AQB=1&ndh=1&pf=1&" + (a.Aa() ? "callback=s_c_il[" + a._in + "].doPostbacks&et=1&" : "") + c + "&AQE=1"; a.lb(d); a.jb(d); a.U(); };
            a.mb = function () {
                var b = a.nb();
                return "http" + (a.ssl ? "s" :
                    "") + "://" + b + "/b/ss/" + a.account + "/" + (a.mobile ? "5." : "") + (a.Aa() ? "10" : "1") + "/JS-" + a.version + (a.fc ? "T" : "") + (a.tagContainerMarker ? "-" + a.tagContainerMarker : "");
            };
            a.Aa = function () { return a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks; };
            a.nb = function () { var b = a.dc, c = a.trackingServer; c ? a.trackingServerSecure && a.ssl && (c = a.trackingServerSecure) : (b = b ? ("" + b).toLowerCase() : "d1", "d1" == b ? b = "112" : "d2" == b && (b = "122"), c = a.pb() + "." + b + ".2o7.net"); return c; };
            a.pb = function () {
                var b = a.visitorNamespace;
                b || (b = a.account.split(",")[0], b = b.replace(/[^0-9a-z]/gi, ""));
                return b;
            };
            a.$a = /{(%?)(.*?)(%?)}/;
            a.kc = RegExp(a.$a.source, "g");
            a.Pb = function (b) { if ("object" == typeof b.dests)
                for (var c = 0; c < b.dests.length; ++c) {
                    var d = b.dests[c];
                    if ("string" == typeof d.c && "aa." == d.id.substr(0, 3))
                        for (var f = d.c.match(a.kc), e = 0; e < f.length; ++e) {
                            var g = f[e], k = g.match(a.$a), h = "";
                            "%" == k[1] && "timezone_offset" == k[2] ? h = (new Date).getTimezoneOffset() : "%" == k[1] && "timestampz" == k[2] && (h = a.Tb());
                            d.c = d.c.replace(g, a.escape(h));
                        }
                } };
            a.Tb = function () {
                var b = new Date, c = new Date(6E4 * Math.abs(b.getTimezoneOffset()));
                return a.k(4, b.getFullYear()) + "-" + a.k(2, b.getMonth() + 1) + "-" + a.k(2, b.getDate()) + "T" + a.k(2, b.getHours()) + ":" + a.k(2, b.getMinutes()) + ":" + a.k(2, b.getSeconds()) + (0 < b.getTimezoneOffset() ? "-" : "+") + a.k(2, c.getUTCHours()) + ":" + a.k(2, c.getUTCMinutes());
            };
            a.k = function (a, c) { return (Array(a + 1).join(0) + c).slice(-a); };
            a.qa = {};
            a.doPostbacks = function (b) {
                if ("object" == typeof b)
                    if (a.Pb(b), "object" == typeof a.AudienceManagement && "function" == typeof a.AudienceManagement.isReady &&
                        a.AudienceManagement.isReady() && "function" == typeof a.AudienceManagement.passData)
                        a.AudienceManagement.passData(b);
                    else if ("object" == typeof b && "object" == typeof b.dests)
                        for (var c = 0; c < b.dests.length; ++c) {
                            var d = b.dests[c];
                            "object" == typeof d && "string" == typeof d.c && "string" == typeof d.id && "aa." == d.id.substr(0, 3) && (a.qa[d.id] = new Image, a.qa[d.id].alt = "", a.qa[d.id].src = d.c);
                        }
            };
            a.jb = function (b) { a.i || a.Xb(); a.i.push(b); a.ja = a.A(); a.Za(); };
            a.Xb = function () { a.i = a.$b(); a.i || (a.i = []); };
            a.$b = function () {
                var b, c;
                if (a.pa()) {
                    try {
                        (c =
                            h.localStorage.getItem(a.na())) && (b = h.JSON.parse(c));
                    }
                    catch (d) { }
                    return b;
                }
            };
            a.pa = function () { var b = !0; a.trackOffline && a.offlineFilename && h.localStorage && h.JSON || (b = !1); return b; };
            a.Pa = function () { var b = 0; a.i && (b = a.i.length); a.o && b++; return b; };
            a.U = function () { if (a.o && (a.v && a.v.complete && a.v.C && a.v.R(), a.o))
                return; a.Qa = q; if (a.oa)
                a.ja > a.N && a.Xa(a.i), a.ra(500);
            else {
                var b = a.Jb();
                if (0 < b)
                    a.ra(b);
                else if (b = a.Na())
                    a.o = 1, a.ac(b), a.ec(b);
            } };
            a.ra = function (b) { a.Qa || (b || (b = 0), a.Qa = setTimeout(a.U, b)); };
            a.Jb = function () {
                var b;
                if (!a.trackOffline || 0 >= a.offlineThrottleDelay)
                    return 0;
                b = a.A() - a.Va;
                return a.offlineThrottleDelay < b ? 0 : a.offlineThrottleDelay - b;
            };
            a.Na = function () { if (0 < a.i.length)
                return a.i.shift(); };
            a.ac = function (b) { if (a.debugTracking) {
                var c = "AppMeasurement Debug: " + b;
                b = b.split("&");
                var d;
                for (d = 0; d < b.length; d++)
                    c += "\n\t" + a.unescape(b[d]);
                a.log(c);
            } };
            a.ya = function () { return a.marketingCloudVisitorID || a.analyticsVisitorID; };
            a.X = !1;
            var t;
            try {
                t = JSON.parse('{"x":"y"}');
            }
            catch (v) {
                t = null;
            }
            t && "y" == t.x ? (a.X = !0, a.W = function (a) { return JSON.parse(a); }) :
                h.$ && h.$.parseJSON ? (a.W = function (a) { return h.$.parseJSON(a); }, a.X = !0) : a.W = function () { return null; };
            a.ec = function (b) {
                var c, d, f;
                a.rb(b) && (d = 1, c = { send: function (b) { a.useBeacon = !1; navigator.sendBeacon(b) ? c.R() : c.ha(); } });
                !c && a.ya() && 2047 < b.length && (a.eb() && (d = 2, c = new XMLHttpRequest), c && (a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks) && (a.X ? c.Ia = !0 : c = 0));
                !c && a.jc && (b = b.substring(0, 2047));
                !c && a.d.createElement && (0 != a.usePostbacks || a.AudienceManagement && a.AudienceManagement.isReady()) &&
                    (c = a.d.createElement("SCRIPT")) && "async" in c && ((f = (f = a.d.getElementsByTagName("HEAD")) && f[0] ? f[0] : a.d.body) ? (c.type = "text/javascript", c.setAttribute("async", "async"), d = 3) : c = 0);
                c || (c = new Image, d = 4, c.alt = "", c.abort || "undefined" === typeof h.InstallTrigger || (c.abort = function () { c.src = q; }));
                c.Wa = Date.now();
                c.Ka = function () { try {
                    c.C && (clearTimeout(c.C), c.C = 0);
                }
                catch (a) { } };
                c.onload = c.R = function () { c.Wa && (a.ka = Date.now() - c.Wa); a.kb(b); c.Ka(); a.Nb(); a.da(); a.o = 0; a.U(); if (c.Ia) {
                    c.Ia = !1;
                    try {
                        a.doPostbacks(a.W(c.responseText));
                    }
                    catch (d) { }
                } };
                c.onabort = c.onerror = c.ha = function () { c.Ka(); (a.trackOffline || a.oa) && a.o && a.i.unshift(a.Mb); a.o = 0; a.ja > a.N && a.Xa(a.i); a.da(); a.ra(500); };
                c.onreadystatechange = function () { 4 == c.readyState && (200 == c.status ? c.R() : c.ha()); };
                a.Va = a.A();
                if (1 === d)
                    c.send(b);
                else if (2 === d)
                    f = b.indexOf("?"), d = b.substring(0, f), f = b.substring(f + 1), f = f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, ""), c.open("POST", d, !0), c.withCredentials = !0, c.send(f);
                else if (c.src = b, 3 === d) {
                    if (a.Ta)
                        try {
                            f.removeChild(a.Ta);
                        }
                        catch (e) { }
                    f.firstChild ? f.insertBefore(c, f.firstChild) : f.appendChild(c);
                    a.Ta = a.v;
                }
                c.C = setTimeout(function () { c.C && (c.complete ? c.R() : (a.trackOffline && c.abort && c.abort(), c.ha())); }, 5E3);
                a.Mb = b;
                a.v = h["s_i_" + a.replace(a.account, ",", "_")] = c;
                if (a.useForcedLinkTracking && a.J || a.bodyClickFunction)
                    a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout = 250), a.ea = setTimeout(a.da, a.forcedLinkTrackingTimeout);
            };
            a.rb = function (b) { var c = !1; navigator.sendBeacon && (a.tb(b) ? c = !0 : a.useBeacon && (c = !0)); a.Cb(b) && (c = !1); return c; };
            a.tb = function (a) {
                return a && 0 < a.indexOf("pe=lnk_e") ?
                    !0 : !1;
            };
            a.Cb = function (a) { return 64E3 <= a.length; };
            a.eb = function () { return "undefined" !== typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? !0 : !1; };
            a.Nb = function () { if (a.pa() && !(a.Ua > a.N))
                try {
                    h.localStorage.removeItem(a.na()), a.Ua = a.A();
                }
                catch (b) { } };
            a.Xa = function (b) { if (a.pa()) {
                a.Za();
                try {
                    h.localStorage.setItem(a.na(), h.JSON.stringify(b)), a.N = a.A();
                }
                catch (c) { }
            } };
            a.Za = function () { if (a.trackOffline) {
                if (!a.offlineLimit || 0 >= a.offlineLimit)
                    a.offlineLimit = 10;
                for (; a.i.length > a.offlineLimit;)
                    a.Na();
            } };
            a.forceOffline =
                function () { a.oa = !0; };
            a.forceOnline = function () { a.oa = !1; };
            a.na = function () { return a.offlineFilename + "-" + a.visitorNamespace + a.account; };
            a.A = function () { return (new Date).getTime(); };
            a.Ra = function (a) { a = a.toLowerCase(); return 0 != a.indexOf("#") && 0 != a.indexOf("about:") && 0 != a.indexOf("opera:") && 0 != a.indexOf("javascript:") ? !0 : !1; };
            a.setTagContainer = function (b) {
                var c, d, f;
                a.fc = b;
                for (c = 0; c < a._il.length; c++)
                    if ((d = a._il[c]) && "s_l" == d._c && d.tagContainerName == b) {
                        a.S(d);
                        if (d.lmq)
                            for (c = 0; c < d.lmq.length; c++)
                                f = d.lmq[c], a.loadModule(f.n);
                        if (d.ml)
                            for (f in d.ml)
                                if (a[f])
                                    for (c in b = a[f], f = d.ml[f], f)
                                        !Object.prototype[c] && ("function" != typeof f[c] || 0 > ("" + f[c]).indexOf("s_c_il")) && (b[c] = f[c]);
                        if (d.mmq)
                            for (c = 0; c < d.mmq.length; c++)
                                f = d.mmq[c], a[f.m] && (b = a[f.m], b[f.f] && "function" == typeof b[f.f] && (f.a ? b[f.f].apply(b, f.a) : b[f.f].apply(b)));
                        if (d.tq)
                            for (c = 0; c < d.tq.length; c++)
                                a.track(d.tq[c]);
                        d.s = a;
                        break;
                    }
            };
            a.Util = { urlEncode: a.escape, urlDecode: a.unescape, cookieRead: a.cookieRead, cookieWrite: a.cookieWrite, getQueryParam: function (b, c, d, f) {
                    var e, g = "";
                    c ||
                        (c = a.pageURL ? a.pageURL : h.location);
                    d = d ? d : "&";
                    if (!b || !c)
                        return g;
                    c = "" + c;
                    e = c.indexOf("?");
                    if (0 > e)
                        return g;
                    c = d + c.substring(e + 1) + d;
                    if (!f || !(0 <= c.indexOf(d + b + d) || 0 <= c.indexOf(d + b + "=" + d))) {
                        e = c.indexOf("#");
                        0 <= e && (c = c.substr(0, e) + d);
                        e = c.indexOf(d + b + "=");
                        if (0 > e)
                            return g;
                        c = c.substring(e + d.length + b.length + 1);
                        e = c.indexOf(d);
                        0 <= e && (c = c.substring(0, e));
                        0 < c.length && (g = a.unescape(c));
                        return g;
                    }
                }, getIeVersion: function () { return document.documentMode ? document.documentMode : a.za() ? 7 : null; } };
            a.D = "supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData contextData.cm.ssf contextData.opt.dmp contextData.opt.sell clientHints currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
            a.g = a.D.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));
            a.la = "timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");
            a.O = a.la.slice(0);
            a.Ha = "account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout writeSecureCookies useLinkTrackSessionStorage collectHighEntropyUserAgentHints trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement".split(" ");
            for (m = 0; 250 >= m; m++)
                76 > m && (a.g.push("prop" + m), a.O.push("prop" + m)), a.g.push("eVar" + m), a.O.push("eVar" + m), 6 > m && a.g.push("hier" + m), 4 > m && a.g.push("list" + m);
            m = "pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");
            a.g = a.g.concat(m);
            a.D = a.D.concat(m);
            a.ssl = 0 <= h.location.protocol.toLowerCase().indexOf("https");
            a.charSet = "UTF-8";
            a.contextData = {};
            a.ta = ["architecture",
                "bitness", "model", "platformVersion", "wow64"];
            a.writeSecureCookies = !1;
            a.collectHighEntropyUserAgentHints = !1;
            a.offlineThrottleDelay = 0;
            a.offlineFilename = "AppMeasurement.offline";
            a.P = "s_sq";
            a.Va = 0;
            a.ja = 0;
            a.N = 0;
            a.Ua = 0;
            a.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
            a.w = h;
            a.d = h.document;
            a.da = function () {
                a.ea && (h.clearTimeout(a.ea), a.ea = q);
                a.bodyClickTarget && a.J && a.bodyClickTarget.dispatchEvent(a.J);
                a.bodyClickFunction && ("function" == typeof a.bodyClickFunction ? a.bodyClickFunction() :
                    a.bodyClickTarget && a.bodyClickTarget.href && (a.d.location = a.bodyClickTarget.href));
                a.bodyClickTarget = a.J = a.bodyClickFunction = 0;
            };
            a.Ya = function () {
                a.b = a.d.body;
                a.b ? (a.r = function (b) {
                    var c, d, f, e, g;
                    if (!(a.d && a.d.getElementById("cppXYctnr") || b && b["s_fe_" + a._in])) {
                        if (a.Ja)
                            if (a.useForcedLinkTracking)
                                a.b.removeEventListener("click", a.r, !1);
                            else {
                                a.b.removeEventListener("click", a.r, !0);
                                a.Ja = a.useForcedLinkTracking = 0;
                                return;
                            }
                        else
                            a.useForcedLinkTracking = 0;
                        a.clickObject = b.srcElement ? b.srcElement : b.target;
                        try {
                            if (!a.clickObject ||
                                a.M && a.M == a.clickObject || !(a.clickObject.tagName || a.clickObject.parentElement || a.clickObject.parentNode))
                                a.clickObject = 0;
                            else {
                                var k = a.M = a.clickObject;
                                a.ia && (clearTimeout(a.ia), a.ia = 0);
                                a.ia = setTimeout(function () { a.M == k && (a.M = 0); }, 1E4);
                                f = a.Pa();
                                a.track();
                                if (f < a.Pa() && a.useForcedLinkTracking && b.target) {
                                    for (e = b.target; e && e != a.b && "A" != e.tagName.toUpperCase() && "AREA" != e.tagName.toUpperCase();)
                                        e = e.parentNode;
                                    if (e && (g = e.href, a.Ra(g) || (g = 0), d = e.target, b.target.dispatchEvent && g && (!d || "_self" == d || "_top" == d ||
                                        "_parent" == d || h.name && d == h.name))) {
                                        try {
                                            c = a.d.createEvent("MouseEvents");
                                        }
                                        catch (l) {
                                            c = new h.MouseEvent;
                                        }
                                        if (c) {
                                            try {
                                                c.initMouseEvent("click", b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);
                                            }
                                            catch (m) {
                                                c = 0;
                                            }
                                            c && (c["s_fe_" + a._in] = c.s_fe = 1, b.stopPropagation(), b.stopImmediatePropagation && b.stopImmediatePropagation(), b.preventDefault(), a.bodyClickTarget = b.target, a.J = c);
                                        }
                                    }
                                }
                            }
                        }
                        catch (n) {
                            a.clickObject = 0;
                        }
                    }
                }, a.b && a.b.attachEvent ?
                    a.b.attachEvent("onclick", a.r) : a.b && a.b.addEventListener && (navigator && (0 <= navigator.userAgent.indexOf("WebKit") && a.d.createEvent || 0 <= navigator.userAgent.indexOf("Firefox/2") && h.MouseEvent) && (a.Ja = 1, a.useForcedLinkTracking = 1, a.b.addEventListener("click", a.r, !0)), a.b.addEventListener("click", a.r, !1))) : setTimeout(a.Ya, 30);
            };
            a.jc = a.za();
            a.Ob();
            a.qc || (r ? a.setAccount(r) : a.log("Error, missing Report Suite ID in AppMeasurement initialization"), a.Ya(), a.loadModule("ActivityMap"));
        }
        window["AppMeasurement"] = AppMeasurement;
        function s_gi(r) { var a, h = window.s_c_il, q, p, m = r.split(","), s, u, t = 0; if (h)
            for (q = 0; !t && q < h.length;) {
                a = h[q];
                if ("s_c" == a._c && (a.account || a.oun))
                    if (a.account && a.account == r)
                        t = 1;
                    else
                        for (p = a.account ? a.account : a.oun, p = a.allAccounts ? a.allAccounts : p.split(","), s = 0; s < m.length; s++)
                            for (u = 0; u < p.length; u++)
                                m[s] == p[u] && (t = 1);
                q++;
            } t ? a.setAccount && a.setAccount(r) : a = new AppMeasurement(r); return a; }
        AppMeasurement.getInstance = s_gi;
        window.s_objectID || (window.s_objectID = 0);
        window["s_gi"] = s_gi;
        function s_pgicq() { var r = window, a = r.s_giq, h, q, p; if (a)
            for (h = 0; h < a.length; h++)
                q = a[h], p = s_gi(q.oun), p.setAccount(q.un), p.setTagContainer(q.tagContainerName); r.s_giq = 0; }
        s_pgicq();
        window["s_pgicq"] = s_pgicq;
    }
    exports.addAdobeScripts = addAdobeScripts;
});
