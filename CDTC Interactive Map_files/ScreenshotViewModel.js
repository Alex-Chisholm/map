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
define(["require", "exports", "esri/core/Accessor", "HTMl2Canvas", "esri/core/Handles", "esri/core/reactiveUtils", "esri/widgets/Legend", "esri/core/accessorSupport/decorators"], function (require, exports, Accessor_1, HTMl2Canvas_1, Handles_1, reactiveUtils_1, Legend_1, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = __importDefault(Accessor_1);
    HTMl2Canvas_1 = __importDefault(HTMl2Canvas_1);
    Handles_1 = __importDefault(Handles_1);
    Legend_1 = __importDefault(Legend_1);
    let ScreenshotViewModel = class ScreenshotViewModel extends Accessor_1.default {
        constructor(value) {
            super(value);
            this._area = null;
            this._canvasElement = null;
            this._handles = new Handles_1.default();
            this._screenshotPromise = null;
            this._highlightedFeature = null;
            this._firstMapComponent = null;
            this._secondMapComponent = null;
            this._thirdMapComponent = null;
            this._screenshotConfig = null;
            this._mapComponentSelectors = [
                ".esri-screenshot__offscreen-legend-container",
                ".esri-screenshot__offscreen-pop-up-container"
            ];
            this.outputLayout = "horizontal";
            this.custom = null;
            this.dragHandler = null;
            this.enableLegendOption = null;
            this.enablePopupOption = null;
            this.featureWidget = null;
            this.includeCustomInScreenshot = null;
            this.includeLegendInScreenshot = null;
            this.includePopupInScreenshot = null;
            this.legendWidget = null;
            this.previewTitleInputNode = null;
            this.previewIsVisible = null;
            this.screenshotModeIsActive = null;
            this.view = null;
        }
        get state() {
            const ready = this?.view?.ready;
            return ready
                ? this.previewIsVisible
                    ? "ready"
                    : this._screenshotPromise
                        ? "takingScreenshot"
                        : "complete"
                : "disabled";
        }
        initialize() {
            this._handles.add([
                this._removeHighlight(),
                this._watchScreenshotMode(),
                this._watchLegendWidgetAndView(),
                this._resetOffScreenPopup(),
                this._checkScreenshotModeFalse()
            ]);
        }
        destroy() {
            this._handles.removeAll();
            this._handles = null;
        }
        async setScreenshotArea(event, maskDiv, screenshotImageElement, dragHandler) {
            if (event.action !== "end") {
                event.stopPropagation();
                this._setXYValues(event);
                this._setMaskPosition(maskDiv, this._area);
            }
            else {
                const type = this?.view?.type;
                if (type === "2d") {
                    const view = this.view;
                    const { width, height, x, y } = this._area;
                    if (width === 0 || height === 0) {
                        this._screenshotConfig = {
                            area: {
                                x,
                                y,
                                width: 1,
                                height: 1
                            },
                            ignorePadding: true
                        };
                    }
                    else {
                        this._screenshotConfig = {
                            area: this._area,
                            ignorePadding: true
                        };
                    }
                    this._screenshotPromise = true;
                    this.notifyChange("state");
                    const viewScreenshot = await view.takeScreenshot(this._screenshotConfig);
                    this._processScreenshot(viewScreenshot, screenshotImageElement, maskDiv);
                    this._screenshotPromise = false;
                    this.notifyChange("state");
                    if (this.dragHandler) {
                        this.dragHandler.remove();
                        this.dragHandler = null;
                    }
                }
                else if (type === "3d") {
                    const view = this.view;
                    const { width, height, x, y } = this._area;
                    if (width === 0 || height === 0) {
                        this._screenshotConfig = {
                            area: {
                                x,
                                y,
                                width: 1,
                                height: 1
                            },
                            ignorePadding: true
                        };
                    }
                    else {
                        this._screenshotConfig = {
                            area: this._area,
                            ignorePadding: true
                        };
                    }
                    this._screenshotPromise = true;
                    this.notifyChange("state");
                    const viewScreenshot = await view.takeScreenshot(this._screenshotConfig);
                    this._processScreenshot(viewScreenshot, screenshotImageElement, maskDiv);
                    this._screenshotPromise = false;
                    this.notifyChange("state");
                    if (this.dragHandler) {
                        this.dragHandler.remove();
                        this.dragHandler = null;
                    }
                }
            }
        }
        downloadImage() {
            const type = this?.view?.type;
            if (type === "2d") {
                const view = this.view;
                const map = view.map;
                let imageToDownload = null;
                if (this.previewTitleInputNode.value) {
                    imageToDownload = this._getImageWithText(this._canvasElement, this.previewTitleInputNode.value);
                }
                else {
                    imageToDownload = this._canvasElement.toDataURL();
                }
                this._downloadImage(`${map.portalItem.title}.png`, imageToDownload);
            }
            else if (type === "3d") {
                const view = this.view;
                const map = view.map;
                let imageToDownload = null;
                if (this.previewTitleInputNode.value) {
                    imageToDownload = this._getImageWithText(this._canvasElement, this.previewTitleInputNode.value);
                }
                else {
                    imageToDownload = this._canvasElement.toDataURL();
                }
                this._downloadImage(`${map.portalItem.title}.png`, imageToDownload);
            }
        }
        _getImageWithText(screenshotCanvas, text) {
            const screenshotCanvasContext = screenshotCanvas.getContext("2d");
            const screenshotImageData = screenshotCanvasContext.getImageData(0, 0, screenshotCanvas.width, screenshotCanvas.height);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = screenshotImageData.height + 40;
            canvas.width = screenshotImageData.width + 40;
            context.fillStyle = "#fff";
            context.fillRect(20, 0, screenshotImageData.width, 40);
            context.putImageData(screenshotImageData, 20, 40);
            context.font = "20px Arial";
            context.fillStyle = "#000";
            context.fillText(text, 40, 30);
            return canvas.toDataURL();
        }
        _onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv) {
            viewCanvas.height = viewScreenshot.data.height;
            viewCanvas.width = viewScreenshot.data.width;
            const context = viewCanvas.getContext("2d");
            img.src = viewScreenshot.dataUrl;
            img.onload = () => {
                context.drawImage(img, 0, 0);
                this._showPreview(viewCanvas, screenshotImageElement, maskDiv);
                this._canvasElement = viewCanvas;
            };
        }
        async _includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv) {
            const context = viewCanvas.getContext("2d");
            const combinedCanvas = document.createElement("canvas");
            const firstComponent = document.querySelector(this._mapComponentSelectors[0]);
            const secondMapComponent = document.querySelector(this._mapComponentSelectors[1]);
            const thirdMapComponent = this.custom?.element;
            const mapComponent = this.includeCustomInScreenshot
                ? thirdMapComponent
                : this.includeLegendInScreenshot
                    ? firstComponent
                    : secondMapComponent;
            this._screenshotPromise = true;
            this.notifyChange("state");
            const mapComponentCanvas = await HTMl2Canvas_1.default(mapComponent, {
                logging: true
            });
            viewCanvas.height = viewScreenshot.data.height;
            viewCanvas.width = viewScreenshot.data.width;
            img.src = viewScreenshot.dataUrl;
            img.onload = () => {
                context.drawImage(img, 0, 0);
                this._generateImageForOneComponent(viewCanvas, combinedCanvas, viewScreenshot, mapComponentCanvas);
                this._canvasElement = combinedCanvas;
                this._showPreview(combinedCanvas, screenshotImageElement, maskDiv);
                this._screenshotPromise = false;
                this.notifyChange("state");
            };
        }
        async _includeTwoMapComponents(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv, firstNode, secondNode) {
            const screenshotKey = "screenshot-key";
            const viewCanvasContext = viewCanvas.getContext("2d");
            const combinedCanvasElements = document.createElement("canvas");
            this._screenshotPromise = true;
            this.notifyChange("state");
            const html2CanvasConfig = {
                removeContainer: true,
                logging: false
            };
            const firstMapComponent = await HTMl2Canvas_1.default(firstNode, html2CanvasConfig);
            this._firstMapComponent = firstMapComponent;
            const secondMapComponent = await HTMl2Canvas_1.default(secondNode, {
                height: secondNode.offsetHeight,
                ...html2CanvasConfig
            });
            this._secondMapComponent = secondMapComponent;
            this._screenshotPromise = null;
            this.notifyChange("state");
            this._handles.remove(screenshotKey);
            this._handles.add(this._watchTwoMapComponents(viewCanvas, viewScreenshot, img, viewCanvasContext, combinedCanvasElements, screenshotImageElement, maskDiv, screenshotKey), screenshotKey);
        }
        async _includeThreeMapComponents(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv, firstNode, secondNode, thirdNode) {
            const screenshotKey = "screenshot-key";
            const viewCanvasContext = viewCanvas.getContext("2d");
            const combinedCanvasElements = document.createElement("canvas");
            this._screenshotPromise = true;
            const html2CanvasConfig = {
                removeContainer: true,
                logging: false
            };
            const firstMapComponent = await HTMl2Canvas_1.default(firstNode, html2CanvasConfig);
            this._firstMapComponent = firstMapComponent;
            const secondMapComponent = await HTMl2Canvas_1.default(secondNode, {
                height: secondNode.offsetHeight,
                ...html2CanvasConfig
            });
            this._secondMapComponent = secondMapComponent;
            const thirdMapComponent = await HTMl2Canvas_1.default(thirdNode, {
                height: thirdNode.offsetHeight,
                ...html2CanvasConfig
            });
            this._thirdMapComponent = thirdMapComponent;
            this._screenshotPromise = null;
            this.notifyChange("state");
            this._handles.remove(screenshotKey);
            this._handles.add(this._watchThreeMapComponents(viewCanvas, viewScreenshot, img, viewCanvasContext, combinedCanvasElements, screenshotImageElement, maskDiv, screenshotKey), screenshotKey);
        }
        _watchTwoMapComponents(viewCanvas, viewScreenshot, img, viewCanvasContext, combinedCanvasElements, screenshotImageElement, maskDiv, screenshotKey) {
            return reactiveUtils_1.watch(() => this?.state, () => {
                if (this.state === "complete" && this._firstMapComponent && this._secondMapComponent) {
                    viewCanvas.height = viewScreenshot.data.height;
                    viewCanvas.width = viewScreenshot.data.width;
                    img.src = viewScreenshot.dataUrl;
                    img.onload = () => {
                        viewCanvasContext.drawImage(img, 0, 0);
                        this._generateImageForTwoComponents(viewCanvas, combinedCanvasElements, viewScreenshot, this._firstMapComponent, this._secondMapComponent);
                        this._canvasElement = combinedCanvasElements;
                        this._showPreview(combinedCanvasElements, screenshotImageElement, maskDiv);
                        this._firstMapComponent = null;
                        this._secondMapComponent = null;
                        this._handles.remove(screenshotKey);
                        this.notifyChange("state");
                    };
                }
            }, {
                initial: true
            });
        }
        _watchThreeMapComponents(viewCanvas, viewScreenshot, img, viewCanvasContext, combinedCanvasElements, screenshotImageElement, maskDiv, screenshotKey) {
            return reactiveUtils_1.watch(() => this?.state, () => {
                if (this.state === "complete" &&
                    this._firstMapComponent &&
                    this._secondMapComponent &&
                    this._thirdMapComponent) {
                    viewCanvas.height = viewScreenshot.data.height;
                    viewCanvas.width = viewScreenshot.data.width;
                    img.src = viewScreenshot.dataUrl;
                    img.onload = () => {
                        viewCanvasContext.drawImage(img, 0, 0);
                        this._generateImageForThreeComponents(viewCanvas, combinedCanvasElements, viewScreenshot, this._firstMapComponent, this._secondMapComponent, this._thirdMapComponent);
                        this._canvasElement = combinedCanvasElements;
                        this._showPreview(combinedCanvasElements, screenshotImageElement, maskDiv);
                        this._firstMapComponent = null;
                        this._secondMapComponent = null;
                        this._thirdMapComponent = null;
                        this._handles.remove(screenshotKey);
                        this.notifyChange("state");
                    };
                }
            }, {
                initial: true
            });
        }
        _generateImageForOneComponent(viewCanvas, combinedCanvas, viewScreenshot, mapComponent) {
            const viewScreenshotHeight = viewScreenshot.data.height;
            const viewLegendCanvasContext = combinedCanvas.getContext("2d");
            const mapComponentHeight = mapComponent.height;
            const height = this.outputLayout === "horizontal"
                ? Math.max(mapComponentHeight, viewScreenshotHeight)
                : this.outputLayout === "vertical"
                    ? mapComponentHeight + viewScreenshotHeight
                    : null;
            const width = this.outputLayout === "horizontal"
                ? viewScreenshot.data.width + mapComponent.width
                : this.outputLayout === "vertical"
                    ? Math.max(viewScreenshot.data.width, mapComponent.width)
                    : null;
            combinedCanvas.width = width;
            combinedCanvas.height = height;
            viewLegendCanvasContext.fillStyle = "#fff";
            viewLegendCanvasContext.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);
            if (this.outputLayout === "horizontal") {
                if (document.dir === "rtl") {
                    viewLegendCanvasContext.drawImage(viewCanvas, 0, 0);
                    viewLegendCanvasContext.drawImage(mapComponent, viewCanvas.width, 0);
                }
                else {
                    viewLegendCanvasContext.drawImage(mapComponent, 0, 0);
                    viewLegendCanvasContext.drawImage(viewCanvas, mapComponent.width, 0);
                }
            }
            else if (this.outputLayout === "vertical") {
                if (document.dir === "rtl") {
                    viewLegendCanvasContext.drawImage(viewCanvas, combinedCanvas.width - viewCanvas.width, 0);
                    viewLegendCanvasContext.drawImage(mapComponent, combinedCanvas.width - mapComponent.width, viewScreenshotHeight);
                }
                else {
                    viewLegendCanvasContext.drawImage(viewCanvas, 0, 0);
                    viewLegendCanvasContext.drawImage(mapComponent, 0, viewScreenshotHeight);
                }
            }
        }
        _generateImageForTwoComponents(viewCanvas, combinedCanvasElements, viewScreenshot, firstMapComponent, secondMapComponent) {
            const combinedCanvasContext = combinedCanvasElements.getContext("2d");
            const firstMapComponentHeight = firstMapComponent.height;
            const secondMapComponentHeight = secondMapComponent.height;
            const viewScreenshotHeight = viewScreenshot.data.height;
            if (this.outputLayout === "horizontal") {
                combinedCanvasElements.width = viewScreenshot.data.width + firstMapComponent.width + secondMapComponent.width;
                combinedCanvasElements.height = Math.max(viewScreenshotHeight, firstMapComponentHeight, secondMapComponentHeight);
            }
            else if (this.outputLayout === "vertical") {
                combinedCanvasElements.width = Math.max(viewScreenshot.data.width, firstMapComponent.width, secondMapComponent.width);
                combinedCanvasElements.height = viewScreenshot.data.height + firstMapComponent.height + secondMapComponent.height;
            }
            combinedCanvasContext.fillStyle = "#fff";
            combinedCanvasContext.fillRect(0, 0, combinedCanvasElements.width, combinedCanvasElements.height);
            if (this.outputLayout === "horizontal") {
                if (document.dir === "rtl") {
                    combinedCanvasContext.drawImage(secondMapComponent, 0, 0);
                    combinedCanvasContext.drawImage(viewCanvas, secondMapComponent.width, 0);
                    combinedCanvasContext.drawImage(firstMapComponent, viewScreenshot.data.width + secondMapComponent.width, 0);
                }
                else {
                    combinedCanvasContext.drawImage(firstMapComponent, 0, 0);
                    combinedCanvasContext.drawImage(viewCanvas, firstMapComponent.width, 0);
                    combinedCanvasContext.drawImage(secondMapComponent, viewScreenshot.data.width + firstMapComponent.width, 0);
                }
            }
            else if (this.outputLayout === "vertical") {
                if (document.dir === "rtl") {
                    combinedCanvasContext.drawImage(viewCanvas, combinedCanvasElements.width - viewCanvas.width, 0);
                    combinedCanvasContext.drawImage(firstMapComponent, combinedCanvasElements.width - firstMapComponent.width, viewScreenshotHeight);
                    combinedCanvasContext.drawImage(secondMapComponent, combinedCanvasElements.width - secondMapComponent.width, viewScreenshotHeight + firstMapComponentHeight);
                }
                else {
                    combinedCanvasContext.drawImage(viewCanvas, 0, 0);
                    combinedCanvasContext.drawImage(firstMapComponent, 0, viewScreenshotHeight);
                    combinedCanvasContext.drawImage(secondMapComponent, 0, viewScreenshotHeight + firstMapComponentHeight);
                }
            }
        }
        _generateImageForThreeComponents(viewCanvas, combinedCanvasElements, viewScreenshot, firstMapComponent, secondMapComponent, thirdMapComponent) {
            const combinedCanvasContext = combinedCanvasElements.getContext("2d");
            const firstMapComponentHeight = firstMapComponent.height;
            const secondMapComponentHeight = secondMapComponent.height;
            const thirdMapComponentHeight = thirdMapComponent.height;
            const viewScreenshotHeight = viewScreenshot.data.height;
            if (this.outputLayout === "horizontal") {
                combinedCanvasElements.width =
                    viewScreenshot.data.width + firstMapComponent.width + secondMapComponent.width + thirdMapComponent.width;
                combinedCanvasElements.height = Math.max(viewScreenshotHeight, firstMapComponentHeight, secondMapComponentHeight, thirdMapComponentHeight);
            }
            else if (this.outputLayout === "vertical") {
                combinedCanvasElements.width = Math.max(viewScreenshot.data.width, firstMapComponent.width, secondMapComponent.width, thirdMapComponent.width);
                combinedCanvasElements.height =
                    viewScreenshot.data.height + firstMapComponent.height + secondMapComponent.height + thirdMapComponent.height;
            }
            combinedCanvasContext.fillStyle = "#fff";
            combinedCanvasContext.fillRect(0, 0, combinedCanvasElements.width, combinedCanvasElements.height);
            if (this.outputLayout === "horizontal") {
                if (document.dir === "rtl") {
                    combinedCanvasContext.drawImage(thirdMapComponent, 0, 0);
                    combinedCanvasContext.drawImage(secondMapComponent, thirdMapComponent.width, 0);
                    combinedCanvasContext.drawImage(viewCanvas, thirdMapComponent.width + secondMapComponent.width, 0);
                    combinedCanvasContext.drawImage(firstMapComponent, viewScreenshot.data.width + thirdMapComponent.width + secondMapComponent.width, 0);
                }
                else {
                    combinedCanvasContext.drawImage(firstMapComponent, 0, 0);
                    combinedCanvasContext.drawImage(viewCanvas, firstMapComponent.width, 0);
                    combinedCanvasContext.drawImage(secondMapComponent, viewScreenshot.data.width + firstMapComponent.width, 0);
                    combinedCanvasContext.drawImage(thirdMapComponent, viewScreenshot.data.width + firstMapComponent.width + secondMapComponent.width, 0);
                }
            }
            else if (this.outputLayout === "vertical") {
                if (document.dir === "rtl") {
                    combinedCanvasContext.drawImage(viewCanvas, combinedCanvasElements.width - viewCanvas.width, 0);
                    combinedCanvasContext.drawImage(firstMapComponent, combinedCanvasElements.width - firstMapComponent.width, viewScreenshotHeight);
                    combinedCanvasContext.drawImage(secondMapComponent, combinedCanvasElements.width - secondMapComponent.width, viewScreenshot.data.height + firstMapComponent.height);
                    combinedCanvasContext.drawImage(thirdMapComponent, combinedCanvasElements.width - thirdMapComponent.width, viewScreenshot.data.height + firstMapComponent.height + secondMapComponent.height);
                }
                else {
                    combinedCanvasContext.drawImage(viewCanvas, 0, 0);
                    combinedCanvasContext.drawImage(firstMapComponent, 0, viewScreenshotHeight);
                    combinedCanvasContext.drawImage(secondMapComponent, 0, viewScreenshot.data.height + firstMapComponent.height);
                    combinedCanvasContext.drawImage(thirdMapComponent, 0, viewScreenshot.data.height + firstMapComponent.height + secondMapComponent.height);
                }
            }
        }
        _showPreview(canvasElement, screenshotImageElement, maskDiv) {
            screenshotImageElement.width = canvasElement.width;
            screenshotImageElement.src = canvasElement.toDataURL();
            this.view.container.classList.remove("esri-screenshot__cursor");
            this._area = null;
            this._setMaskPosition(maskDiv, null);
            this.previewIsVisible = true;
            this._focusTitleInput();
            if (this.enablePopupOption && this.includePopupInScreenshot && this.featureWidget) {
                this.featureWidget.graphic = null;
            }
            this.notifyChange("state");
        }
        _focusTitleInput() {
            const focusInterval = setInterval(() => {
                this.previewTitleInputNode.focus();
                if (document.activeElement === this.previewTitleInputNode) {
                    clearInterval(focusInterval);
                }
            }, 10);
        }
        _downloadImage(filename, dataUrl) {
            if (!window.navigator.msSaveOrOpenBlob) {
                const imgURL = document.createElement("a");
                imgURL.setAttribute("href", dataUrl);
                imgURL.setAttribute("download", filename);
                imgURL.style.display = "none";
                document.body.appendChild(imgURL);
                imgURL.click();
                document.body.removeChild(imgURL);
            }
            else {
                const byteString = atob(dataUrl.split(",")[1]);
                const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeString });
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
        }
        _clamp(value, from, to) {
            return value < from ? from : value > to ? to : value;
        }
        _setXYValues(event) {
            const xmin = this._clamp(Math.min(event.origin.x, event.x), 0, this.view.width);
            const xmax = this._clamp(Math.max(event.origin.x, event.x), 0, this.view.width);
            const ymin = this._clamp(Math.min(event.origin.y, event.y), 0, this.view.height);
            const ymax = this._clamp(Math.max(event.origin.y, event.y), 0, this.view.height);
            this._area = {
                x: xmin,
                y: ymin,
                width: xmax - xmin,
                height: ymax - ymin
            };
            this.notifyChange("state");
        }
        _processScreenshot(viewScreenshot, screenshotImageElement, maskDiv) {
            const viewCanvas = document.createElement("canvas");
            const img = document.createElement("img");
            const firstComponent = document.querySelector(this._mapComponentSelectors[0]);
            const secondMapComponent = document.querySelector(this._mapComponentSelectors[1]);
            if (!this.includeLegendInScreenshot && !this.includePopupInScreenshot && !this.includeCustomInScreenshot) {
                this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
            }
            else {
                if (this.includeLegendInScreenshot && !this.includePopupInScreenshot && !this.includeCustomInScreenshot) {
                    if (firstComponent.offsetWidth && firstComponent.offsetHeight) {
                        this._includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                    else {
                        this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                }
                else if (this.includePopupInScreenshot && !this.includeLegendInScreenshot && !this.includeCustomInScreenshot) {
                    if (secondMapComponent.offsetWidth && secondMapComponent.offsetHeight) {
                        this._includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                    else {
                        this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                }
                else if (!this.includePopupInScreenshot && !this.includeLegendInScreenshot && this.includeCustomInScreenshot) {
                    if (this.custom?.element?.offsetWidth && this.custom?.element?.offsetHeight) {
                        this._includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                    else {
                        this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                }
                else if (this.includeLegendInScreenshot && this.includePopupInScreenshot && !this.includeCustomInScreenshot) {
                    if (firstComponent.offsetWidth &&
                        firstComponent.offsetHeight &&
                        secondMapComponent.offsetWidth &&
                        secondMapComponent.offsetHeight) {
                        this._includeTwoMapComponents(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv, document.querySelector(`${this._mapComponentSelectors[0]}`), document.querySelector(`${this._mapComponentSelectors[1]}`));
                    }
                    else if (!firstComponent.offsetWidth ||
                        !firstComponent.offsetHeight ||
                        !secondMapComponent.offsetWidth ||
                        !secondMapComponent.offsetHeight) {
                        this._includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                    else {
                        this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                }
                else if (this.includeLegendInScreenshot && this.includeCustomInScreenshot && !this.includePopupInScreenshot) {
                    if (firstComponent.offsetWidth &&
                        firstComponent.offsetHeight &&
                        this.custom.element.offsetWidth &&
                        this.custom.element.offsetHeight) {
                        this._includeTwoMapComponents(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv, document.querySelector(`${this._mapComponentSelectors[0]}`), this.custom.element);
                    }
                    else if (!firstComponent.offsetWidth ||
                        !firstComponent.offsetHeight ||
                        !secondMapComponent.offsetWidth ||
                        !secondMapComponent.offsetHeight) {
                        this._includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                    else {
                        this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                }
                else if (!this.includeLegendInScreenshot && this.includeCustomInScreenshot && this.includePopupInScreenshot) {
                    if (secondMapComponent.offsetWidth &&
                        secondMapComponent.offsetHeight &&
                        this.custom.element.offsetWidth &&
                        this.custom.element.offsetHeight) {
                        this._includeTwoMapComponents(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv, document.querySelector(`${this._mapComponentSelectors[1]}`), this.custom.element);
                    }
                    else if (!firstComponent.offsetWidth ||
                        !firstComponent.offsetHeight ||
                        !secondMapComponent.offsetWidth ||
                        !secondMapComponent.offsetHeight) {
                        this._includeOneMapComponent(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                    else {
                        this._onlyTakeScreenshotOfView(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv);
                    }
                }
                else if (this.includeLegendInScreenshot && this.includePopupInScreenshot && this.includeLegendInScreenshot) {
                    this._includeThreeMapComponents(viewScreenshot, viewCanvas, img, screenshotImageElement, maskDiv, document.querySelector(`${this._mapComponentSelectors[0]}`), document.querySelector(`${this._mapComponentSelectors[1]}`), this.custom.element);
                }
            }
        }
        _setMaskPosition(maskDiv, area) {
            if (!maskDiv) {
                return;
            }
            const boundClientRect = this.view.container.getBoundingClientRect();
            if (area) {
                maskDiv.style.top = `${area.y + boundClientRect.top}px`;
                maskDiv.style.bottom = `${area.y + boundClientRect.bottom}px`;
                const isRTL = document.dir === "rtl";
                maskDiv.style.left = isRTL ? `${area.x + boundClientRect.right}px` : `${area.x + boundClientRect.left}px`;
                maskDiv.style.right = isRTL
                    ? `${document.body.offsetWidth - this.view.container.offsetWidth + boundClientRect.right - area.width - area.x}px`
                    : `${area.x + boundClientRect.right}px`;
                maskDiv.style.width = `${area.width}px`;
                maskDiv.style.height = `${area.height}px`;
                this.screenshotModeIsActive = true;
            }
            else {
                maskDiv.style.left = `${0}px`;
                maskDiv.style.top = `${0}px`;
                maskDiv.style.width = `${0}px`;
                maskDiv.style.height = `${0}px`;
                this.screenshotModeIsActive = false;
            }
            this.notifyChange("state");
        }
        _removeHighlight() {
            return reactiveUtils_1.watch(() => this?.view?.popup?.visible, () => {
                if (!this.view) {
                    return;
                }
                if (!this.view?.popup?.visible &&
                    this.screenshotModeIsActive &&
                    this.enablePopupOption &&
                    this.view?.popup?.selectedFeature) {
                    const layerView = this.view.layerViews.find((layerView) => layerView.layer.id === this.view?.popup?.selectedFeature?.layer?.id);
                    if (!layerView) {
                        return;
                    }
                    this._highlightedFeature = layerView.highlight(this.view.popup.selectedFeature);
                }
                const watchHighlight = "watch-highlight";
                this._handles.add(reactiveUtils_1.when(() => this?.screenshotModeIsActive === false, () => {
                    if (!this.screenshotModeIsActive) {
                        if (this.featureWidget) {
                            this._set("featureWidget", null);
                        }
                        if (this._highlightedFeature) {
                            this._highlightedFeature.remove();
                            this._highlightedFeature = null;
                        }
                    }
                    this.notifyChange("state");
                    this._handles.remove(watchHighlight);
                }), watchHighlight);
            });
        }
        _watchScreenshotMode() {
            return reactiveUtils_1.watch(() => this?.screenshotModeIsActive, () => {
                if (!this.view) {
                    return;
                }
                if (this.view?.popup) {
                    this.view.popup.visible = false;
                }
            });
        }
        _watchLegendWidgetAndView() {
            return reactiveUtils_1.watch(() => this?.legendWidget || this?.view?.ready, () => {
                if (this.view?.ready && !this.legendWidget) {
                    this._set("legendWidget", new Legend_1.default({
                        view: this.view
                    }));
                }
            }, {
                initial: true
            });
        }
        _resetOffScreenPopup() {
            return reactiveUtils_1.when(() => this?.screenshotModeIsActive === false, () => {
                if (this.featureWidget) {
                    this.featureWidget.graphic = null;
                    this._set("featureWidget", null);
                    this.notifyChange("state");
                }
            });
        }
        _checkScreenshotModeFalse() {
            return reactiveUtils_1.when(() => this?.screenshotModeIsActive === false, () => {
                this.screenshotModeIsActive = false;
                this.view.container.classList.remove("esri-screenshot__cursor");
                if (this.featureWidget && this.featureWidget.graphic) {
                    this.featureWidget.graphic = null;
                }
                if (this.dragHandler) {
                    this.dragHandler.remove();
                    this.dragHandler = null;
                }
                this.notifyChange("state");
            });
        }
    };
    __decorate([
        decorators_1.property({
            dependsOn: ["view.ready"],
            readOnly: true
        })
    ], ScreenshotViewModel.prototype, "state", null);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "outputLayout", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "custom", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "dragHandler", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "enableLegendOption", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "enablePopupOption", void 0);
    __decorate([
        decorators_1.property({
            readOnly: true
        })
    ], ScreenshotViewModel.prototype, "featureWidget", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "includeCustomInScreenshot", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "includeLegendInScreenshot", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "includePopupInScreenshot", void 0);
    __decorate([
        decorators_1.property({
            readOnly: true
        })
    ], ScreenshotViewModel.prototype, "legendWidget", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "previewTitleInputNode", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "previewIsVisible", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "screenshotModeIsActive", void 0);
    __decorate([
        decorators_1.property()
    ], ScreenshotViewModel.prototype, "view", void 0);
    ScreenshotViewModel = __decorate([
        decorators_1.subclass("ScreenshotViewModel")
    ], ScreenshotViewModel);
    exports.default = ScreenshotViewModel;
});
