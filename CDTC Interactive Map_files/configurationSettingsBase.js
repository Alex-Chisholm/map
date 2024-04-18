var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "../functionality/configurationSettings"], function (require, exports, Accessor_1, decorators_1, configurationSettings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = __importDefault(Accessor_1);
    /**
     * Base Class for all instant app's ConfigurationSettings classes. Handles
     * communication with the Config Panel for live updates during the configuration experience.
     */
    class ConfigurationSettingsBase extends Accessor_1.default {
        constructor(params) {
            super();
            /** Determines if the App is being run within the Config Panel's IFrame */
            this.withinConfigurationExperience = (0, configurationSettings_1.isWithinConfigurationExperience)();
            this._draft = null;
            this._draftMode = false;
            this._draft = params?.draft;
            this._draftMode = params?.mode === 'draft';
        }
        initialize() {
            if (this.withinConfigurationExperience || this._draftMode) {
                // Apply any draft properties
                if (this._draft) {
                    Object.assign(this, this._draft);
                }
                window.addEventListener('message', (e) => {
                    this._handleConfigurationUpdates(e);
                }, false);
            }
        }
        _handleConfigurationUpdates(e) {
            if (e?.data?.type === 'cats-app') {
                Object.assign(this, e.data);
            }
        }
    }
    __decorate([
        (0, decorators_1.property)()
    ], ConfigurationSettingsBase.prototype, "withinConfigurationExperience", void 0);
    exports.default = ConfigurationSettingsBase;
});
