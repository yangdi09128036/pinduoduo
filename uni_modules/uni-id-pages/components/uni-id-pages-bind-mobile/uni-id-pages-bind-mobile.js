"use strict";const e=require("../../../../common/vendor.js");e.er.database().collection("uni-id-users");const o=e.er.importObject("uni-id-co"),i={emits:["success"],computed:{},data:()=>({}),methods:{beforeGetphonenumber:async()=>await new Promise(((o,i)=>{e.index.showLoading({mask:!0}),e.wx$1.checkSession({success(){o(),e.index.hideLoading()},fail(){e.wx$1.login({success({code:n}){e.er.importObject("uni-id-co",{customUI:!0}).loginByWeixin({code:n}).then((e=>{o()})).catch((e=>{console.log(e),i()})).finally((o=>{e.index.hideLoading()}))},fail:e=>{console.error(e),i()}})}})})),async bindMobileByMpWeixin(e){"getPhoneNumber:ok"==e.detail.errMsg?(await this.beforeGetphonenumber(),o.bindMobileByMpWeixin(e.detail).then((e=>{this.$emit("success")})).finally((e=>{this.closeMe()}))):this.closeMe()},async open(){this.$refs.popup.open()},closeMe(e){this.$refs.popup.close()}}};if(!Array){e.resolveComponent("uni-popup")()}Math;const n=e._export_sfc(i,[["render",function(o,i,n,s,t,c){return{a:e.o(((...e)=>c.closeMe&&c.closeMe(...e))),b:e.o(((...e)=>c.bindMobileByMpWeixin&&c.bindMobileByMpWeixin(...e))),c:e.sr("popup","b19006a4-0"),d:e.p({type:"bottom"})}}],["__scopeId","data-v-b19006a4"]]);wx.createComponent(n);
