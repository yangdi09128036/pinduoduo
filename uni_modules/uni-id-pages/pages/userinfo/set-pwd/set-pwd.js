"use strict";const o=require("../../../../../common/vendor.js"),s=require("../../../common/password.js"),e=require("../../../common/store.js"),t=require("../../../config.js"),a=o.er.importObject("uni-id-co",{customUI:!0}),r={name:"set-pwd.vue",data:()=>({uniIdRedirectUrl:"",loginType:"",logo:"/static/logo.png",focusNewPassword:!1,focusNewPassword2:!1,allowSkip:!1,formData:{code:"",captcha:"",newPassword:"",newPassword2:""},rules:s.passwordMod.getPwdRules("newPassword","newPassword2")}),computed:{userInfo:()=>e.store.userInfo},onReady(){this.$refs.form.setRules(this.rules)},onLoad(o){var s;this.uniIdRedirectUrl=o.uniIdRedirectUrl,this.loginType=o.loginType,t.config.setPasswordAfterLogin&&(null==(s=t.config.setPasswordAfterLogin)?void 0:s.allowSkip)&&(this.allowSkip=!0)},methods:{submit(){if(!/^\d{6}$/.test(this.formData.code))return this.$refs.smsCode.focusSmsCodeInput=!0,o.index.showToast({title:"验证码格式不正确",icon:"none"});this.$refs.form.validate().then((s=>{a.setPwd({password:this.formData.newPassword,code:this.formData.code,captcha:this.formData.captcha}).then((s=>{o.index.showModal({content:"密码设置成功",showCancel:!1,success:()=>{e.mutations.loginBack({uniIdRedirectUrl:this.uniIdRedirectUrl,loginType:this.loginType})}})})).catch((s=>{o.index.showModal({content:s.message,showCancel:!1})}))})).catch((o=>{"uni-id-captcha-required"==o.errCode?this.$refs.popup.open():console.log(o.errMsg)})).finally((o=>{this.formData.captcha=""}))},skip(){e.mutations.loginBack({uniIdRedirectUrl:this.uniIdRedirectUrl})}}};if(!Array){(o.resolveComponent("uni-easyinput")+o.resolveComponent("uni-forms-item")+o.resolveComponent("uni-id-pages-sms-form")+o.resolveComponent("uni-forms")+o.resolveComponent("uni-popup-captcha"))()}Math||((()=>"../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../../uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js")+(()=>"../../../../uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js"))();const n=o._export_sfc(r,[["render",function(s,e,t,a,r,n){return o.e({a:r.logo,b:o.o((o=>r.focusNewPassword=!1)),c:o.o((o=>r.formData.newPassword=o)),d:o.p({focus:r.focusNewPassword,type:"password",inputBorder:!1,placeholder:"请输入密码",modelValue:r.formData.newPassword}),e:o.p({name:"newPassword"}),f:o.o((o=>r.focusNewPassword2=!1)),g:o.o((o=>r.formData.newPassword2=o)),h:o.p({focus:r.focusNewPassword2,type:"password",inputBorder:!1,placeholder:"请再次输入新密码",modelValue:r.formData.newPassword2}),i:o.p({name:"newPassword2"}),j:o.sr("smsCode","f34b7681-5,f34b7681-0"),k:o.o((o=>r.formData.code=o)),l:o.p({type:"set-pwd-by-sms",phone:n.userInfo.mobile,modelValue:r.formData.code}),m:o.o(((...o)=>n.submit&&n.submit(...o))),n:r.allowSkip},r.allowSkip?{o:o.o(((...o)=>n.skip&&n.skip(...o)))}:{},{p:o.sr("form","f34b7681-0"),q:o.p({value:r.formData,"err-show-type":"toast"}),r:o.sr("popup","f34b7681-6"),s:o.o(n.submit),t:o.o((o=>r.formData.captcha=o)),v:o.p({scene:"set-pwd-by-sms",modelValue:r.formData.captcha})})}],["__scopeId","data-v-f34b7681"]]);wx.createPage(n);
