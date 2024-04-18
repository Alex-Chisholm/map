// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.29/esri/copyright.txt for details.
//>>built
define("../../chunks/tslib.es6 ../../geometry ../../core/Accessor ../../core/screenUtils ../../core/unitUtils ../../core/accessorSupport/decorators/property ../../core/has ../../core/Logger ../../core/RandomLCG ../../core/accessorSupport/decorators/subclass ../../geometry/support/geodesicUtils ../../geometry/support/normalizeUtils ../../geometry/support/spatialReferenceUtils ../../geometry/support/webMercatorUtils ../../geometry/SpatialReference ../../geometry/Polyline ../../geometry/Point".split(" "),
function(m,k,w,n,g,p,E,F,G,x,q,y,r,z,A,B,t){function u({state:{paddedViewState:c},spatialReference:a,width:b}){return a.isWrappable&&c.worldScreenWidth<b}function v(c,a){const {x:b,y:e}=c?z.webMercatorToGeographic(a,!0):a;return[b,e]}k=class extends w{constructor(c){super(c);this.scaleComputedFrom=n.createScreenPoint();this.view=null}get state(){return this.view?.ready&&"2d"===this.view?.type?"ready":"disabled"}getScaleBarProperties(c,a){if("disabled"===this.state||isNaN(c)||!a||!this.view)return null;
const b=this._getDistanceInMeters();return null==b?null:this._getScaleBarProps(c,b,a)}_getDistanceInMeters(){const {state:c,spatialReference:a}=this.view;if(!r.isValid(a))return null;var {isGeographic:b}=a;const {isWebMercator:e,wkt:h,wkt2:f}=a;var d=e||((f||h)?.includes("WGS_1984_Web_Mercator")??!1);if(!b&&!d){var l=c.extent.width;d=g.getMetersPerUnit(a)??1;return l*d}const [C,D]=this._getScaleMeasuringPoints();b=d||b&&!q.isSupported(a)?A.WGS84:a;d=new B({paths:[[v(d,C),v(d,D)]],spatialReference:b});
d=y.straightLineDensify(d,10);try{[l]=q.geodesicLengths([d],"meters")}catch{return null}return l}_getScaleMeasuringPoints(){var c=this.view;const {width:a,height:b,position:e,spatialReference:h}=c;if(u(c)){c=r.getInfo(h);var {valid:f}=c;c=new t(f[0],0,h);f=new t(f[1],0,h);return[c,f]}var d=this.scaleComputedFrom.y-e[1];d>b?d=b:0>d&&(d=0);f=n.createScreenPoint(0,d);d=n.createScreenPoint(a,d);f=c.toMap(f);c=c.toMap(d);return[f,c]}_getScaleBarProps(c,a,b){var e=this.view;e=u(e)?e.state.paddedViewState.worldScreenWidth:
e.width;a=c*a/e;if(.001>a)return null;a:{switch(b){case "metric":b=1E3<a?{distance:g.convertUnit(a,"meters","kilometers"),unit:"kilometer"}:1<a?{distance:a,unit:"meter"}:.01<a?{distance:g.convertUnit(a,"meters","centimeters"),unit:"centimeter"}:{distance:g.convertUnit(a,"meters","millimeters"),unit:"millimeter"};break a;case "imperial":case "non-metric":b=1609.344<a?{distance:g.convertUnit(a,"meters","miles"),unit:"mile"}:.3048<a?{distance:g.convertUnit(a,"meters","feet"),unit:"foot"}:{distance:g.convertUnit(a,
"meters","inches"),unit:"inch"};break a}b=void 0}const {distance:h,unit:f}=b;b=h;for(a=0;1<=b;)b/=10,a++;e=.5<b?{min:.5,max:1}:.2<b?{min:.2,max:.5}:{min:.1,max:.2};const {min:d,max:l}=e;e=l/b>=b/d?d:l;return{length:e/b*c,value:10**a*e,unit:f}}};m.__decorate([p.property()],k.prototype,"scaleComputedFrom",void 0);m.__decorate([p.property({readOnly:!0})],k.prototype,"state",null);m.__decorate([p.property()],k.prototype,"view",void 0);return k=m.__decorate([x.subclass("esri.widgets.ScaleBar.ScaleBarViewModel")],
k)});