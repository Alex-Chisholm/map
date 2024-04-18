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
        base: "scroll-overlay",
        button: "scroll-overlay-button",
        buttonTop: "scroll-overlay-top"
    };
    let ScrollOverlay = class ScrollOverlay extends Widget_1.default {
        constructor(props) {
            super(props);
            this.bundle = null;
        }
        initialize() {
            if (this.config.disableScroll && this.view) {
                this.toggleInteraction();
            }
        }
        render() {
            const { theme } = this.config;
            let themeClass = theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
            return (widget_1.tsx("div", { class: this.classes([CSS.base, themeClass]) },
                widget_1.tsx("calcite-button", { appearance: "solid", bind: this, onclick: this.toggleInteraction, afterCreate: widget_1.storeNode, "data-node-ref": "scrollOverlayButton", scale: "m", kind: "neutral", width: "auto" }, this.bundle.mapScroll.enableMessage)));
        }
        toggleInteraction() {
            let { mouseWheelZoomEnabled, browserTouchPanEnabled } = this.view.navigation;
            const isEnabled = mouseWheelZoomEnabled && browserTouchPanEnabled;
            this.view.navigation.mouseWheelZoomEnabled = !isEnabled;
            this.view.navigation.browserTouchPanEnabled = !isEnabled;
            if (this?.scrollOverlayButton) {
                this.scrollOverlayButton.innerHTML = isEnabled
                    ? this.bundle.mapScroll.enableMessage
                    : this.bundle.mapScroll.disableMessage;
            }
        }
        _createScrollButton() {
            return (widget_1.tsx("div", { class: this.classes([CSS.base, this.config.theme]) },
                widget_1.tsx("calcite-button", { appearance: "solid", bind: this, onclick: this.toggleInteraction, afterCreate: widget_1.storeNode, "data-node-ref": "scrollOverlayButton", class: CSS.button, scale: "s", kind: "brand", width: "auto" }, this.bundle.mapScroll.enableMessage)));
        }
    };
    __decorate([
        decorators_1.property()
    ], ScrollOverlay.prototype, "config", void 0);
    __decorate([
        decorators_1.property()
    ], ScrollOverlay.prototype, "view", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.messageBundle("instant/../t9n/common")
    ], ScrollOverlay.prototype, "bundle", void 0);
    ScrollOverlay = __decorate([
        decorators_1.subclass("ScrollOverlay")
    ], ScrollOverlay);
    exports.default = ScrollOverlay;
});
