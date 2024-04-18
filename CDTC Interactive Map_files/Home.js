// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.29/esri/copyright.txt for details.
//>>built
define("require ../chunks/tslib.es6 ../core/accessorSupport/decorators/property ../core/has ../core/Logger ../core/RandomLCG ../core/accessorSupport/decorators/subclass ./Widget ./Home/HomeViewModel ../chunks/componentsUtils ./support/globalCss ./support/legacyIcon ./support/widgetUtils ./support/decorators/messageBundle ./support/decorators/vmEvent ./support/jsxFactory".split(" "),function(m,c,d,b,B,C,w,x,n,y,p,q,D,r,z,g){var t=q.legacyIcon.home;b=class extends x{constructor(a,e){super(a,e);this.iconClass=
t;this.messagesCommon=this.messages=this.icon=null;this.uiStrings=void 0;this.viewModel=new n;this._go=()=>{const {viewModel:f}=this;"going-home"===f.state?f.cancelGo():f.go()}}loadDependencies(){return y.loadCalciteComponents({button:()=>new Promise((a,e)=>m(["../chunks/calcite-button"],a,e)),loader:()=>new Promise((a,e)=>m(["../chunks/calcite-loader"],a,e))})}get goToOverride(){return this.viewModel.goToOverride}set goToOverride(a){this.viewModel.goToOverride=a}get label(){return this.messages?.widgetLabel??
""}set label(a){this._overrideIfSome("label",a)}get view(){return this.viewModel.view}set view(a){this.viewModel.view=a}get viewpoint(){return this.viewModel.viewpoint}set viewpoint(a){this.viewModel.viewpoint=a}cancelGo(){this.viewModel.cancelGo()}go(){return this.viewModel.go()}render(){const {messagesCommon:a,messages:e,icon:f,iconClass:u}=this,h=this.viewModel?.state,k=u===t?void 0:u,A=void 0===k?"home":void 0,l="going-home"===h,v=null==f&&k;return g.tsx("div",{class:this.classes("esri-home",
p.globalCss.widget)},g.tsx("calcite-button",{class:p.globalCss.widgetButton,disabled:"disabled"===h,iconStart:l?void 0:f??A,kind:"neutral",label:e.widgetLabel,onclick:this._go,scale:l||v?"s":"m",title:"going-home"===h?a.cancel:e.title},l?g.tsx("calcite-loader",{inline:!0,label:"",scale:"m"}):v?this._renderLegacyIcon(k):null))}_renderLegacyIcon(a){return g.tsx("span",{"aria-hidden":"true",class:this.classes(q.legacyIcon.icon,a),styles:{display:"flex"}})}};c.__decorate([d.property()],b.prototype,"goToOverride",
null);c.__decorate([d.property()],b.prototype,"iconClass",void 0);c.__decorate([d.property()],b.prototype,"icon",void 0);c.__decorate([d.property()],b.prototype,"label",null);c.__decorate([d.property(),r.messageBundle("esri/widgets/Home/t9n/Home")],b.prototype,"messages",void 0);c.__decorate([d.property(),r.messageBundle("esri/t9n/common")],b.prototype,"messagesCommon",void 0);c.__decorate([d.property()],b.prototype,"uiStrings",void 0);c.__decorate([d.property()],b.prototype,"view",null);c.__decorate([d.property({type:n}),
z.vmEvent("go")],b.prototype,"viewModel",void 0);c.__decorate([d.property()],b.prototype,"viewpoint",null);return b=c.__decorate([w.subclass("esri.widgets.Home")],b)});