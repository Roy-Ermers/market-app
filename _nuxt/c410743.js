(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{311:function(e,o,t){var content=t(321);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(68).default)("74eb98bc",content,!0,{sourceMap:!1})},320:function(e,o,t){"use strict";t(311)},321:function(e,o,t){var r=t(67)(!1);r.push([e.i,"#map{width:100%;height:100%;box-sizing:border-box;position:relative}#map .maplibregl-user-location-dot,#map .maplibregl-user-location-dot:before{background-color:var(--brand)}#map .maplibregl-user-location-dot:after{border-color:var(--surface4)}#map .maplibregl-ctrl-compass,#map .maplibregl-ctrl-zoom-in,#map .maplibregl-ctrl-zoom-out{background:var(--surface1);border-radius:0}#map .maplibregl-ctrl button.maplibregl-ctrl-geolocate{background-color:var(--surface1);padding:1rem;height:3rem;width:3rem;border-radius:3rem}#map .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-active .maplibregl-ctrl-icon,#map .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-background .maplibregl-ctrl-icon{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23ff9500'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E\")}#map .maplibregl-ctrl-group{background:none}#map .maplibregl-user-location-accuracy-circle{background-color:var(--surface4);opacity:.2}@media(prefers-color-scheme:dark){#map .maplibregl-ctrl-group button+button{border-top:none}}#map .marker{cursor:pointer}#map button.fab{font-size:4rem;width:1em;height:1em;background-color:var(--brand);border:none;z-index:2;display:flex;align-items:center;justify-content:center;border-radius:1em;cursor:pointer;padding:0;position:absolute;bottom:1rem;right:1rem;box-shadow:.3px .5px .7px hsl(var(--surface-shadow)/.3),.8px 1.5px 1.9px -.8px hsl(var(--surface-shadow)/.3),1.9px 3.8px 4.8px -1.7px hsl(var(--surface-shadow)/.3),4.6px 9.2px 11.6px -2.5px hsl(var(--surface-shadow)/.3)}#map button.fab svg{width:.5em;height:.5em;stroke:var(--surface1)}",""]),e.exports=r},330:function(e,o,t){"use strict";t.r(o);t(47),t(313),t(10);var r=t(314),n=(t(327),"ZGTM77FZt4A7JuscDmNg"),c={provide:function(){return{view:this.view,map:this.map}},props:{pins:{type:Array,default:function(){return[]}},center:{type:Array,default:function(){return[5.383195586844065,52.36344182907241]}},zoom:{type:Number,default:8}},data:function(){return{location:void 0,view:{center:this.center,zoom:this.zoom},map:void 0,mapUrl:"https://api.maptiler.com/maps/1ddaf5d5-3c82-4839-bd37-b0df2b7b2217/style.json?key=".concat(n)}},watch:{center:function(){var e;null===(e=this.map)||void 0===e||e.easeTo({center:this.center})},zoom:function(){var e;null===(e=this.map)||void 0===e||e.easeTo({zoom:this.zoom})}},mounted:function(){var e=this,o=window.matchMedia("(prefers-color-scheme: dark)");o.addEventListener("change",(function(){e.updateColorScheme(o.matches)})),this.updateColorScheme(o.matches),this.createMap()},methods:{updateColorScheme:function(e){var o;this.mapUrl=e?"https://api.maptiler.com/maps/faf6f9b5-d95b-41f4-a196-c3089724dd3f/style.json?key=".concat(n):"https://api.maptiler.com/maps/1ddaf5d5-3c82-4839-bd37-b0df2b7b2217/style.json?key=".concat(n),null===(o=this.map)||void 0===o||o.setStyle(this.mapUrl,{diff:!0})},flyTo:function(e){var o,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15;console.log("flying to ",e,t),null===(o=this.map)||void 0===o||o.flyTo({center:e,zoom:t,essential:!0})},createMap:function(){var e=this;this.map=new r.Map({center:this.center,style:this.mapUrl,zoom:this.zoom,container:"map",attributionControl:!1}),this.$device.isMobile||this.map.addControl(new r.NavigationControl({showCompass:!0,visualizePitch:!0,showZoom:!0})),this.map.addControl(new r.GeolocateControl({positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0}).on("geolocate",(function(o){e.location=[o.coords.longitude,o.coords.latitude]})),"bottom-right"),this.map.on("move",(function(){e.view.center=e.map.getCenter().toArray(),e.$emit("update:center",e.view.center)})),this.map.on("zoom",(function(){e.view.zoom=e.map.getZoom(),e.$emit("update:zoom",e.view.zoom)}))}}},l=c,m=(t(320),t(54)),component=Object(m.a)(l,(function(){var e=this,o=e.$createElement;return(e._self._c||o)("div",{attrs:{id:"map"}},[e._t("default")],2)}),[],!1,null,null,null);o.default=component.exports}}]);