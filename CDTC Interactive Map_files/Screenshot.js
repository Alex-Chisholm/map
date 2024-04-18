// Copyright 2021 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/widgets/Widget", "esri/core/accessorSupport/decorators", "esri/core/reactiveUtils", "esri/core/Handles", "esri/widgets/support/widget", "./Screenshot/ScreenshotViewModel", "esri/widgets/Feature"], function (require, exports, Widget_1, decorators_1, reactiveUtils_1, Handles_1, widget_1, ScreenshotViewModel_1, Feature_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    Handles_1 = __importDefault(Handles_1);
    ScreenshotViewModel_1 = __importDefault(ScreenshotViewModel_1);
    Feature_1 = __importDefault(Feature_1);
    const CSS = {
        base: "esri-screenshot",
        widget: "esri-widget esri-widget--panel",
        screenshotBtn: "esri-screenshot__btn",
        mainContainer: "esri-screenshot__main-container",
        panelTitle: "esri-screenshot__panel-title",
        panelSubTitle: "esri-screenshot__panel-subtitle",
        screenshotOption: "esri-screenshot__screenshot-option",
        buttonContainer: "esri-screenshot__screenshot-button-container",
        hide: "esri-screenshot--hide",
        screenshotCursor: "esri-screenshot__cursor",
        maskDiv: "esri-screenshot__mask-div",
        actionBtn: "esri-screenshot__action-btn",
        screenshotImg: "esri-screenshot__js-screenshot-image",
        screenshotDiv: "esri-screenshot__screenshot-div",
        screenshotImgContainer: "esri-screenshot__screenshot-img-container",
        downloadBtn: "esri-screenshot__download-btn",
        backBtn: "esri-screenshot__back-btn",
        showOverlay: "esri-screenshot--show-overlay",
        hideOverlay: "esri-screenshot--hide-overlay",
        pointerCursor: "esri-screenshot--pointer",
        disabledCursor: "esri-screenshot--disabled",
        featureWarning: "esri-screenshot__feature-warning",
        featureWarningTextContainer: "esri-screenshot__feature-warning-text-container",
        warningSVG: "esri-screenshot__warning-svg",
        selectFeatureText: "esri-screenshot__select-feature-text",
        screenshotfieldSetCheckbox: "esri-screenshot__field-set-checkbox",
        offScreenPopupContainer: "esri-screenshot__offscreen-pop-up-container",
        offScreenLegendContainer: "esri-screenshot__offscreen-legend-container",
        screenshotClose: "esri-screenshot__close-button",
        closeButtonContainer: "esri-screenshot__close-button-container",
        screenshotPreviewContainer: "esri-screenshot__img-preview-container",
        selectLayout: "esri-screenshot__select-layout"
    };
    let Screenshot = class Screenshot extends Widget_1.default {
        constructor(value) {
            super(value);
            this._maskNode = null;
            this._screenshotImgNode = null;
            this._activeScreenshotBtnNode = null;
            this._selectFeatureAlertIsVisible = null;
            this._offscreenPopupContainer = null;
            this._offscreenLegendContainer = null;
            this._handles = new Handles_1.default();
            this._elementOptions = {};
            this.custom = null;
            this.disableCustom = false;
            this.enableLegendOption = null;
            this.enablePopupOption = null;
            this.featureWidget = null;
            this.iconClass = "esri-icon-media";
            this.includeCustomInScreenshot = null;
            this.includeLegendInScreenshot = null;
            this.includeLayoutOption = false;
            this.includePopupInScreenshot = null;
            this.legendWidget = null;
            this.screenshotModeIsActive = null;
            this.theme = "light";
            this.view = null;
            this.outputLayout = null;
            this.previewTitleInputNode = null;
            this.previewContainer = null;
            this.viewModel = new ScreenshotViewModel_1.default();
            this.commonMessages = null;
        }
        postInitialize() {
            this.label = this?.commonMessages?.screenshot?.widgetLabel;
            this.addHandles([
                this._togglePopupAlert(),
                this._generateOffScreenPopup(),
                this._watchSelectedFeature(),
                reactiveUtils_1.when(() => this?.legendWidget, () => {
                    this.scheduleRender();
                }, { initial: true }),
                reactiveUtils_1.when(() => this?.enableLegendOption || this?.enablePopupOption || this?.custom, () => {
                    if (this.enableLegendOption) {
                        this._elementOptions.legend = this.includeLegendInScreenshot;
                    }
                    if (this.enablePopupOption) {
                        this._elementOptions.popup = this.includePopupInScreenshot;
                    }
                    if (this.custom) {
                        this._elementOptions.custom = this.includeCustomInScreenshot;
                    }
                }, { initial: true }),
                reactiveUtils_1.when(() => this?.previewContainer, () => {
                    document.addEventListener("keydown", (e) => {
                        if (this.viewModel.previewIsVisible) {
                            const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
                            const focusableElements = this.previewContainer.querySelectorAll(selectors);
                            const firstFocusableElement = focusableElements[0];
                            const lastFocusableElement = focusableElements[focusableElements.length - 1];
                            this._handleTab(e, firstFocusableElement, lastFocusableElement);
                        }
                    });
                }, {
                    initial: true
                })
            ]);
            const offScreenPopupContainer = document.createElement("div");
            const offScreenLegendContainer = document.createElement("div");
            offScreenPopupContainer.classList.add(CSS.offScreenPopupContainer);
            offScreenLegendContainer.classList.add(CSS.offScreenLegendContainer);
            document.body.appendChild(offScreenPopupContainer);
            document.body.appendChild(offScreenLegendContainer);
            this._offscreenPopupContainer = offScreenPopupContainer;
            this._offscreenLegendContainer = offScreenLegendContainer;
        }
        render() {
            const { screenshotModeIsActive } = this.viewModel;
            const screenshotPanel = this._renderScreenshotPanel();
            const screenshotPreviewOverlay = this._renderScreenshotPreviewOverlay();
            const maskNode = this._renderMaskNode(screenshotModeIsActive);
            const optOutOfScreenshotButton = this._renderOptOutOfScreenshotButton();
            if (this.legendWidget && !this.legendWidget.container) {
                this.legendWidget.container = this._offscreenLegendContainer;
            }
            return (widget_1.tsx("div", null,
                screenshotModeIsActive ? (widget_1.tsx("div", { key: "screenshot-container", class: CSS.closeButtonContainer }, optOutOfScreenshotButton)) : (screenshotPanel),
                screenshotPreviewOverlay,
                maskNode));
        }
        destroy() {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
            this._maskNode = null;
            this._screenshotImgNode = null;
        }
        activateScreenshot() {
            if (this.viewModel.screenshotModeIsActive) {
                return;
            }
            this.viewModel.screenshotModeIsActive = true;
            this.view.container.classList.add(CSS.screenshotCursor);
            this.viewModel.dragHandler = this.view.on("drag", (event) => {
                this.viewModel.setScreenshotArea(event, this._maskNode, this._screenshotImgNode, this.viewModel.dragHandler);
            });
            this.scheduleRender();
        }
        _downloadImage() {
            this.viewModel.downloadImage();
        }
        _renderScreenshotPanel() {
            const { screenshotTitle, screenshotSubtitle } = this?.commonMessages?.screenshot;
            const fieldSet = this._renderFieldSet();
            const setMapAreaButton = this._renderSetMapAreaButton();
            const featureWarning = this._renderFeatureWarning();
            const screenshotLayout = this.includeLayoutOption ? this._renderScreenshotLayout() : null;
            return (widget_1.tsx("div", { key: "screenshot-panel", class: this.classes(CSS.base, CSS.widget) },
                widget_1.tsx("div", { class: CSS.mainContainer },
                    widget_1.tsx("h1", { class: CSS.panelTitle }, screenshotTitle),
                    this.enableLegendOption || this.enablePopupOption || this.custom ? (widget_1.tsx("h3", { class: CSS.panelSubTitle }, screenshotSubtitle)) : null,
                    this.enableLegendOption || this.enablePopupOption || this.custom ? fieldSet : null,
                    this.enablePopupOption ? featureWarning : null,
                    screenshotLayout,
                    setMapAreaButton)));
        }
        _renderScreenshotLayout() {
            const elementOptionKeys = Object.keys(this._elementOptions);
            const allDisabled = elementOptionKeys.every((key) => !this._elementOptions[key]);
            return (widget_1.tsx("label", { class: CSS.selectLayout },
                widget_1.tsx("span", null,
                    " ",
                    this?.commonMessages?.screenshot?.screenshotLayout),
                widget_1.tsx("select", { bind: this, onchange: this._updateLayoutOption, disabled: allDisabled },
                    widget_1.tsx("option", { value: "horizontal", selected: this.outputLayout === "horizontal" ? true : false }, this?.commonMessages?.screenshot?.horizontal),
                    widget_1.tsx("option", { value: "vertical", selected: this.outputLayout === "vertical" ? true : false }, this?.commonMessages?.screenshot?.vertical))));
        }
        _renderFeatureWarning() {
            return (widget_1.tsx("div", { key: "feature-warning", class: CSS.featureWarning }, this._selectFeatureAlertIsVisible ? (widget_1.tsx("div", { class: CSS.featureWarningTextContainer },
                widget_1.tsx("svg", { class: CSS.warningSVG, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: "16px", height: "16px" },
                    widget_1.tsx("path", { d: "M14.894 12.552l-6-11.998a1 1 0 0 0-1.787 0l-6 11.998A.998.998 0 0 0 2 13.999h12a.998.998 0 0 0 .894-1.447zM9 12H7v-2h2zm0-3H7V4h2z" })),
                widget_1.tsx("span", { class: CSS.selectFeatureText }, this?.commonMessages?.screenshot?.selectAFeature))) : null));
        }
        _renderFieldSet() {
            const { legend, popup } = this?.commonMessages?.screenshot;
            return (widget_1.tsx("div", { class: CSS.screenshotfieldSetCheckbox },
                this.enableLegendOption ? (widget_1.tsx("label", { key: "esri-screenshot-legend-option", class: CSS.screenshotOption },
                    widget_1.tsx("input", { bind: this, onclick: this._toggleLegend, onkeydown: this._toggleLegend, checked: this.includeLegendInScreenshot, type: "checkbox" }),
                    legend)) : null,
                this.enablePopupOption ? (widget_1.tsx("label", { key: "esri-screenshot-popup-option", class: CSS.screenshotOption },
                    widget_1.tsx("input", { bind: this, onclick: this._togglePopup, onkeydown: this._togglePopup, type: "checkbox", checked: this.includePopupInScreenshot }),
                    popup)) : null,
                this.custom ? (widget_1.tsx("label", { key: "esri-screenshot-custom-option", class: CSS.screenshotOption },
                    widget_1.tsx("input", { bind: this, onclick: this._toggleCustom, onkeydown: this._toggleCustom, type: "checkbox", checked: this.includeCustomInScreenshot, disabled: this.disableCustom }),
                    this.custom.label)) : null));
        }
        _renderSetMapAreaButton() {
            const { setScreenshotArea } = this?.commonMessages?.screenshot;
            return (widget_1.tsx("div", { key: "active-button-container", class: CSS.buttonContainer },
                widget_1.tsx("calcite-button", { bind: this, tabIndex: 0, onclick: this.activateScreenshot, onkeydown: this.activateScreenshot, afterCreate: widget_1.storeNode, "data-node-ref": "_activeScreenshotBtnNode", disabled: this.enablePopupOption && this.includePopupInScreenshot
                        ? this.featureWidget && this.featureWidget.graphic
                            ? false
                            : true
                        : false, width: "full", theme: this.theme }, setScreenshotArea)));
        }
        _renderScreenshotPreviewOverlay() {
            const { previewIsVisible } = this.viewModel;
            const overlayIsVisible = {
                [CSS.showOverlay]: previewIsVisible,
                [CSS.hideOverlay]: !previewIsVisible
            };
            const screenshotPreviewBtns = this._renderScreenshotPreviewBtns();
            return (widget_1.tsx("div", { afterCreate: this._attachToBody, class: this.classes(CSS.screenshotDiv, overlayIsVisible) },
                widget_1.tsx("div", { bind: this, class: CSS.screenshotPreviewContainer, role: "dialog", "aria-label": this?.commonMessages?.screenshot?.downloadImage, afterCreate: widget_1.storeNode, "data-node-ref": "previewContainer" },
                    widget_1.tsx("div", { class: CSS.screenshotImgContainer },
                        widget_1.tsx("img", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_screenshotImgNode", class: CSS.screenshotImg })),
                    widget_1.tsx("input", { bind: this, type: "text", afterCreate: widget_1.storeNode, "data-node-ref": "previewTitleInputNode", placeholder: this?.commonMessages?.screenshot?.enterTitle }),
                    screenshotPreviewBtns)));
        }
        _renderScreenshotPreviewBtns() {
            return (widget_1.tsx("div", null,
                widget_1.tsx("button", { bind: this, class: CSS.actionBtn, afterCreate: this._downloadEventListener, "aria-label": this?.commonMessages?.screenshot?.downloadImage, title: this?.commonMessages?.screenshot?.downloadImage }, this?.commonMessages?.screenshot?.downloadImage),
                widget_1.tsx("button", { bind: this, class: this.classes(CSS.actionBtn, CSS.backBtn), afterCreate: this._addCloseEventListener, "aria-label": this?.commonMessages?.screenshot?.backButton, title: this?.commonMessages?.screenshot?.backButton }, this?.commonMessages?.screenshot?.backButton)));
        }
        _addCloseEventListener(node) {
            node.addEventListener("click", () => {
                this._closePreview();
            });
        }
        _downloadEventListener(node) {
            node.addEventListener("click", () => {
                this._downloadImage();
            });
        }
        _renderMaskNode(screenshotModeIsActive) {
            const maskDivIsHidden = {
                [CSS.hide]: !screenshotModeIsActive
            };
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.maskDiv, maskDivIsHidden), afterCreate: widget_1.storeNode, "data-node-ref": "_maskNode" }));
        }
        _renderOptOutOfScreenshotButton() {
            return (widget_1.tsx("calcite-button", { bind: this, tabIndex: 0, class: this.classes(CSS.pointerCursor, CSS.screenshotClose), onclick: this.deactivateScreenshot, onkeydown: this.deactivateScreenshot, title: this?.commonMessages?.screenshot?.deactivateScreenshot, kind: "danger" },
                widget_1.tsx("calcite-icon", { icon: "x" })));
        }
        deactivateScreenshot() {
            this.viewModel.screenshotModeIsActive = false;
            this.view.container.classList.remove(CSS.screenshotCursor);
            if (this.featureWidget && this.featureWidget.graphic) {
                this.featureWidget.graphic = null;
            }
            if (this.viewModel.dragHandler) {
                this.viewModel.dragHandler.remove();
                this.viewModel.dragHandler = null;
            }
            window.setTimeout(() => {
                this._activeScreenshotBtnNode.focus();
            }, 10);
            this.scheduleRender();
        }
        _toggleLegend(event) {
            const node = event.currentTarget;
            this.includeLegendInScreenshot = node.checked;
            this._elementOptions.legend = node.checked;
            this.scheduleRender();
        }
        _togglePopup(event) {
            const node = event.currentTarget;
            this.includePopupInScreenshot = node.checked;
            this._elementOptions.popup = node.checked;
            this.scheduleRender();
        }
        _toggleCustom(event) {
            const node = event.currentTarget;
            this.includeCustomInScreenshot = node.checked;
            this._elementOptions.custom = node.checked;
            this.scheduleRender();
        }
        _closePreview() {
            const { viewModel } = this;
            viewModel.previewIsVisible = false;
            viewModel.screenshotModeIsActive = false;
            if (this?.view?.popup) {
                this.view.popup.clear();
            }
            window.setTimeout(() => {
                this._activeScreenshotBtnNode.focus();
            }, 10);
            this.scheduleRender();
        }
        _generateOffScreenPopup() {
            return reactiveUtils_1.watch(() => this?.view?.popup?.visible, () => {
                if (!this.view) {
                    return;
                }
                if (this?.view?.popup?.visible && this._offscreenPopupContainer) {
                    if (!this.featureWidget) {
                        this._set("featureWidget", new Feature_1.default({
                            container: this._offscreenPopupContainer,
                            graphic: this.view.popup.selectedFeature,
                            map: this.view.map,
                            spatialReference: this.view.spatialReference
                        }));
                        this._selectFeatureAlertIsVisible = false;
                        this.scheduleRender();
                    }
                }
            });
        }
        _togglePopupAlert() {
            return reactiveUtils_1.watch(() => this?.enablePopupOption, () => {
                if (this.enablePopupOption) {
                    this.addHandles([
                        reactiveUtils_1.watch(() => this?.includePopupInScreenshot ||
                            this?.featureWidget ||
                            this?.featureWidget?.graphic, () => {
                            this._triggerAlert();
                        }),
                        reactiveUtils_1.watch(() => this?.includePopupInScreenshot, () => {
                            this._triggerAlert();
                        }, {
                            initial: true
                        })
                    ]);
                }
            }, {
                initial: true
            });
        }
        _triggerAlert() {
            if (this.includePopupInScreenshot &&
                (!this.featureWidget || (this.featureWidget && !this.featureWidget.graphic))) {
                this._selectFeatureAlertIsVisible = true;
            }
            else {
                this._selectFeatureAlertIsVisible = false;
            }
            this.scheduleRender();
        }
        _watchSelectedFeature() {
            return reactiveUtils_1.watch(() => this?.view?.popup?.selectedFeature, () => {
                if (this.featureWidget &&
                    this.view &&
                    this.view?.popup &&
                    this.view?.popup?.selectedFeature) {
                    while (this._offscreenPopupContainer && this._offscreenPopupContainer.firstChild) {
                        this._offscreenPopupContainer.removeChild(this._offscreenPopupContainer.firstChild);
                    }
                    this.featureWidget.graphic = null;
                    this._set("featureWidget", null);
                }
                if (this?.view?.popup) {
                    this._set("featureWidget", new Feature_1.default({
                        container: this._offscreenPopupContainer,
                        graphic: this.view.popup.selectedFeature,
                        map: this.view.map,
                        spatialReference: this.view.spatialReference
                    }));
                }
                this.scheduleRender();
            });
        }
        _updateLayoutOption(e) {
            const node = e.target;
            this.outputLayout = node.value;
        }
        _attachToBody(node) {
            document.body.appendChild(node);
        }
        _handleTab(e, firstFocusableElement, lastFocusableElement) {
            let isTabPressed = e.key === "Tab" || e.keyCode === 9;
            if (!isTabPressed) {
                return;
            }
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    const interval = setInterval(() => {
                        lastFocusableElement.focus();
                        if (document.activeElement === lastFocusableElement) {
                            clearInterval(interval);
                            return;
                        }
                    }, 0);
                    e.preventDefault();
                }
            }
            else {
                if (document.activeElement === lastFocusableElement) {
                    const interval = setInterval(() => {
                        firstFocusableElement.focus();
                        if (document.activeElement === firstFocusableElement) {
                            clearInterval(interval);
                            return;
                        }
                    }, 0);
                    e.preventDefault();
                }
            }
        }
    };
    __decorate([
        decorators_1.aliasOf("viewModel.custom")
    ], Screenshot.prototype, "custom", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "disableCustom", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.enableLegendOption")
    ], Screenshot.prototype, "enableLegendOption", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.enablePopupOption")
    ], Screenshot.prototype, "enablePopupOption", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.featureWidget"),
        decorators_1.property({
            readOnly: true
        })
    ], Screenshot.prototype, "featureWidget", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "iconClass", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.includeCustomInScreenshot"),
        decorators_1.property()
    ], Screenshot.prototype, "includeCustomInScreenshot", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.includeLegendInScreenshot"),
        decorators_1.property()
    ], Screenshot.prototype, "includeLegendInScreenshot", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "includeLayoutOption", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.includePopupInScreenshot"),
        decorators_1.property()
    ], Screenshot.prototype, "includePopupInScreenshot", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "label", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.legendWidget"),
        decorators_1.property({
            readOnly: true
        })
    ], Screenshot.prototype, "legendWidget", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.screenshotModeIsActive"),
        decorators_1.property()
    ], Screenshot.prototype, "screenshotModeIsActive", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "theme", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.view"),
        decorators_1.property()
    ], Screenshot.prototype, "view", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.outputLayout"),
        decorators_1.property()
    ], Screenshot.prototype, "outputLayout", void 0);
    __decorate([
        decorators_1.aliasOf("viewModel.previewTitleInputNode"),
        decorators_1.property()
    ], Screenshot.prototype, "previewTitleInputNode", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "previewContainer", void 0);
    __decorate([
        decorators_1.property()
    ], Screenshot.prototype, "viewModel", void 0);
    __decorate([
        decorators_1.property(),
        widget_1.messageBundle("instant/../t9n/common")
    ], Screenshot.prototype, "commonMessages", void 0);
    __decorate([
        widget_1.accessibleHandler()
    ], Screenshot.prototype, "activateScreenshot", null);
    __decorate([
        widget_1.accessibleHandler()
    ], Screenshot.prototype, "deactivateScreenshot", null);
    __decorate([
        widget_1.accessibleHandler()
    ], Screenshot.prototype, "_toggleLegend", null);
    __decorate([
        widget_1.accessibleHandler()
    ], Screenshot.prototype, "_togglePopup", null);
    __decorate([
        widget_1.accessibleHandler()
    ], Screenshot.prototype, "_toggleCustom", null);
    Screenshot = __decorate([
        decorators_1.subclass("Screenshot")
    ], Screenshot);
    exports.default = Screenshot;
});
