// Copyright 2020 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "../config/applicationBase", "../config/application", "TemplatesCommonLib/baseClasses/ApplicationBase", "TemplatesCommonLib/baseClasses/CompatibilityChecker", "./Main"], function (require, exports, applicationBase_1, application_1, ApplicationBase_1, CompatibilityChecker_1, Main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    applicationBase_1 = __importDefault(applicationBase_1);
    application_1 = __importDefault(application_1);
    ApplicationBase_1 = __importDefault(ApplicationBase_1);
    Main_1 = __importDefault(Main_1);
    const Main = new Main_1.default();
    new ApplicationBase_1.default({
        config: application_1.default,
        settings: applicationBase_1.default
    })
        .load(CompatibilityChecker_1.EAppTemplateType.Basic)
        .then((base) => {
        const searchParams = new URL(window.location.href)?.searchParams;
        const messageCode = searchParams?.get("messageCode");
        if (messageCode === "OAUTH_0070") {
            document.body.classList.remove("configurable-application--loading");
            document.body.classList.add("app-error");
            document.body.innerHTML = `Access to this application has been blocked. Please contact your administrator.`;
            return;
        }
        Main.init(base);
    }, (message) => {
        document.body.classList.remove("configurable-application--loading");
        document.body.classList.add("app-error");
        document.body.innerHTML = `<p>${message?.message}</p>`;
        if (message?.error === "application:origin-other") {
            document.location.href = `../../shared/origin/index.html?appUrl=${message.appUrl}`;
        }
    });
});
