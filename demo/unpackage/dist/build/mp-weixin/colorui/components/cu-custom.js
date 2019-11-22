(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"03a3":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},u=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return u})},"2e7d":function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,e="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(e="".concat(e,"background-image:url(").concat(n,");")),e}},props:{isBold:{type:Boolean,default:!0},bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("543d")["default"])},"50ad":function(t,a,n){},"6c7d":function(t,a,n){"use strict";n.r(a);var e=n("2e7d"),u=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(a,t,function(){return e[t]})}(o);a["default"]=u.a},eecd:function(t,a,n){"use strict";n.r(a);var e=n("03a3"),u=n("6c7d");for(var o in u)"default"!==o&&function(t){n.d(a,t,function(){return u[t]})}(o);n("fdd5");var c=n("2877"),r=Object(c["a"])(u["default"],e["a"],e["b"],!1,null,null,null);a["default"]=r.exports},fdd5:function(t,a,n){"use strict";var e=n("50ad"),u=n.n(e);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eecd"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);                
