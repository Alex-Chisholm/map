// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.29/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../Viewpoint ../../core/Collection ../../core/deprecate ../../core/Error ../../core/Evented ../../core/Logger ../../core/accessorSupport/decorators/property ../../core/accessorSupport/decorators/cast ../../core/RandomLCG ../../core/has ../../core/accessorSupport/decorators/subclass ../../webdoc/support/SlideThumbnail ../../webmap/Bookmark ../support/GoTo".split(" "),function(e,z,c,u,k,A,v,g,w,G,H,B,C,x,D){const y=c.ofType(x),E={width:128,height:128,format:"png"},
l={takeScreenshot:!0,captureViewpoint:!0,captureRotation:!0,captureScale:!0,captureTimeExtent:!0},n={time:!0};c=class extends D.GoToMixin(A.EventedAccessor){constructor(a){super(a);this.capabilities={...n};this.view=this.activeBookmark=null}destroy(){this.view=null;this._set("activeBookmark",null)}get abilities(){u.deprecatedProperty(v.getLogger(this),"abilities",{replacement:"capabilities",version:"4.27"});return this.capabilities}set abilities(a){u.deprecatedProperty(v.getLogger(this),"abilities",
{replacement:"capabilities",version:"4.27"});this.capabilities=a}castAbilities(a){return{...n,...a}}castCapabilities(a){return{...n,...a}}get bookmarks(){return this.view?.map?.bookmarks??new y}set bookmarks(a){this._overrideIfSome("bookmarks",a)}set defaultCreateOptions(a){this._set("defaultCreateOptions",{...l,...a})}get defaultCreateOptions(){return l}set defaultEditOptions(a){this._set("defaultEditOptions",{...l,...a})}get defaultEditOptions(){return l}get state(){const {view:a}=this;return a&&
!a.ready?"loading":"ready"}async createBookmark(a){const {view:b,defaultCreateOptions:f,capabilities:d}=this;if(!b)throw new k("create-bookmark:invalid-view","Cannot create a bookmark without a view.");const {takeScreenshot:h,screenshotSettings:p,captureViewpoint:q,captureRotation:r,captureScale:t,captureTimeExtent:m}={...f,...a};a=h?await this._createThumbnail(p):void 0;const F=d.time&&m&&null!=b.timeExtent?b.timeExtent.clone():void 0;return new x({...(a&&{thumbnail:a}),...(m&&{timeExtent:F}),...(q&&
{viewpoint:this._createViewpoint({view:b,captureScale:t,captureRotation:r})})})}async editBookmark(a,b){if(!a)return a;const {view:f,defaultEditOptions:d}=this;if(!f)throw new k("edit-bookmark:invalid-view","Cannot edit a bookmark without a view.");const {takeScreenshot:h,screenshotSettings:p,captureViewpoint:q,captureRotation:r,captureScale:t,captureTimeExtent:m}={...d,...b};if(b=h?await this._createThumbnail(p):void 0)a.thumbnail=b;q&&(a.viewpoint=this._createViewpoint({view:f,captureScale:t,captureRotation:r}));
m&&null!=f.timeExtent&&(a.timeExtent=f.timeExtent.clone());this.emit("bookmark-edit",{bookmark:a});return a}goTo(a){const {capabilities:b,view:f}=this;if(!f)throw new k("go-to:invalid-view","Cannot go to a bookmark without a view");var d=a?.viewpoint;if(!d)throw new k("go-to:invalid-bookmark","Cannot go to a bookmark that does not contain a 'viewpoint'.",{bookmark:a});this._set("activeBookmark",a);d=this.callGoTo({target:d});const h=a?.timeExtent;b.time&&h&&(f.timeExtent=h);this.emit("bookmark-select",
{bookmark:a});d.catch(()=>{}).then(()=>this._set("activeBookmark",null));return d}async _createThumbnail(a){const {view:b}=this;if(!b)throw new k("bookmark:invalid-view","Cannot create slide thumbnail without a view");a=await b.takeScreenshot({...E,...a});return new C.SlideThumbnail({url:a.dataUrl})}_createViewpoint({view:a,captureRotation:b,captureScale:f}){const d=a.viewpoint?.clone();return new z({targetGeometry:a.extent?.clone(),rotation:(b?d?.rotation:null)??0,scale:(f?d?.scale:null)??0})}};
e.__decorate([g.property()],c.prototype,"abilities",null);e.__decorate([w.cast("abilities")],c.prototype,"castAbilities",null);e.__decorate([g.property()],c.prototype,"capabilities",void 0);e.__decorate([w.cast("capabilities")],c.prototype,"castCapabilities",null);e.__decorate([g.property({readOnly:!0})],c.prototype,"activeBookmark",void 0);e.__decorate([g.property({type:y})],c.prototype,"bookmarks",null);e.__decorate([g.property()],c.prototype,"defaultCreateOptions",null);e.__decorate([g.property()],
c.prototype,"defaultEditOptions",null);e.__decorate([g.property({readOnly:!0})],c.prototype,"state",null);e.__decorate([g.property()],c.prototype,"view",void 0);return c=e.__decorate([B.subclass("esri.widgets.Bookmarks.BookmarksViewModel")],c)});