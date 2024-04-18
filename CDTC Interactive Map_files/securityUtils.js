define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createSanitizerInstance = void 0;
    /**
     * Creates new instance of @esri/arcgis-html-sanitizer
     * with appropriate whitelist values
     */
    function createSanitizerInstance(sanitizerConstructor) {
        if (sanitizerConstructor == null || typeof sanitizerConstructor !== "function") {
            return null;
        }
        return new sanitizerConstructor({
            whiteList: {
                h1: ["style"],
                h2: ["style"],
                h3: ["style"],
                h4: ["style"],
                h5: ["style"],
                h6: ["style"],
                img: ["style", "src", "width", "height"],
                pre: ["style"],
                p: ["id", "class", "style"],
                div: ["id", "class", "style", "role"],
                span: ["id", "class", "style", "role"],
                figure: ["class", "style"]
            }
        }, true);
    }
    exports.createSanitizerInstance = createSanitizerInstance;
});
