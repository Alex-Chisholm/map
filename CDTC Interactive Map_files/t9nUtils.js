define(["require", "exports", "esri/intl"], function (require, exports, intl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autoUpdateString = exports.autoUpdatedStrings = exports.handleT9N = void 0;
    async function handleT9N(pattern, base, bundleLocation) {
        (0, intl_1.registerMessageBundleLoader)((0, intl_1.createJSONLoader)({
            pattern,
            base,
            location: new URL("./", window.location.href)
        }));
        return await (0, intl_1.fetchMessageBundle)(bundleLocation);
    }
    exports.handleT9N = handleT9N;
    exports.autoUpdatedStrings = new Set();
    (0, intl_1.onLocaleChange)(() => {
        const bundleNames = Array.from(exports.autoUpdatedStrings, (item) => item.bundleName);
        const bundleMap = {};
        Promise.all(bundleNames.map((bundleName) => (0, intl_1.fetchMessageBundle)(bundleName).then((messages) => {
            bundleMap[bundleName] = messages;
        }))).then(() => {
            exports.autoUpdatedStrings.forEach(val => {
                const { obj, property, bundleName, key } = val;
                obj[property] = getPathValue(`${bundleName}.${key}`, bundleMap);
            });
        });
    });
    function autoUpdateString(obj, property, bundleName, key) {
        const autoUpdatedString = { obj, property, bundleName, key };
        (0, intl_1.fetchMessageBundle)(bundleName).then((messages) => {
            if (exports.autoUpdatedStrings.has(autoUpdatedString)) {
                obj[property] = messages[key];
            }
        });
        return {
            remove() {
                exports.autoUpdatedStrings.delete(autoUpdatedString);
            }
        };
    }
    exports.autoUpdateString = autoUpdateString;
    function getPathValue(str, obj) {
        return str.split('.').reduce((o, i) => o[i], obj);
    }
});
