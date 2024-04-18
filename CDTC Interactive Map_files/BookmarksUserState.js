// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.29/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../core/Accessor ../../core/accessorSupport/decorators/property ../../core/has ../../core/Logger ../../core/RandomLCG ../../core/accessorSupport/decorators/subclass".split(" "),function(c,a,d,f,g,h,e){a=class extends a{constructor(b){super(b)}get editedBookmark(){const {bookmark:b}=this;return b?this._get("editedBookmark")||b.clone():null}get customUrl(){return this.editedBookmark?.thumbnail?.isSecureUrl?this.editedBookmark?.thumbnail?.url:null}set customUrl(b){this._override("customUrl",
b)}get screenshotUrl(){return this.editedBookmark?.thumbnail?.isDataURI?this.editedBookmark?.thumbnail?.url:null}set screenshotUrl(b){this._override("screenshotUrl",b)}get state(){return this._get("state")}set state(b){this.loading=this.validationState=void 0;this._set("state",b)}get thumbnailState(){return this.editedBookmark?.thumbnail?.url?this.editedBookmark?.thumbnail?.isSecureUrl?"url":"screenshot":"none"}set thumbnailState(b){this._overrideIfSome("thumbnailState",b)}};c.__decorate([d.property()],
a.prototype,"bookmark",void 0);c.__decorate([d.property({readOnly:!0})],a.prototype,"editedBookmark",null);c.__decorate([d.property()],a.prototype,"customUrl",null);c.__decorate([d.property()],a.prototype,"screenshotUrl",null);c.__decorate([d.property()],a.prototype,"state",null);c.__decorate([d.property()],a.prototype,"thumbnailState",null);c.__decorate([d.property()],a.prototype,"validationState",void 0);c.__decorate([d.property()],a.prototype,"loading",void 0);return a=c.__decorate([e.subclass("esri.widgets.Bookmarks.UserState")],
a)});