import{n as e,l as s,ai as i,s as n,m as o,W as t,$ as r,y as a,aj as u,A as d,a as l,a0 as c,z as g}from"./index-DyUMtph-.js";const p={debug:!1,isAdmin:!1,loginTypes:["weixin","username","smsCode"],agreements:{serviceUrl:"https://xxx",privacyUrl:"https://xxx",scope:["register","login","realNameVerify"]},appid:{weixin:{h5:"wx2489521bfcd40296",web:"wx2489521bfcd40296"}},passwordStrength:"medium",setPasswordAfterLogin:!1},f=e.importObject("uni-id-co"),h=e.database().collection("uni-id-users");let m=s("uni-id-pages-userInfo")||{};const I={async updateUserInfo(s=!1){if(s)h.where("_id==$env.uid").update(s).then((e=>{e.result.updated?(n({title:"更新成功",icon:"none",duration:3e3}),this.setUserInfo(s)):n({title:"没有改变",icon:"none",duration:3e3})}));else{const s=e.getCurrentUserInfo().uid;this.setUserInfo({_id:s},{cover:!0});const n=e.importObject("uni-id-co",{customUI:!0});try{let e=await h.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file,mobile,address").get();const s=await n.getRealNameInfo();this.setUserInfo({...e.result.data[0],realNameAuth:s})}catch(i){this.setUserInfo({},{cover:!0}),console.error(i.message,i.errCode)}}},setUserInfo(e,{cover:s}={cover:!1}){let i=s?e:Object.assign(w.userInfo,e);return w.userInfo=Object.assign({},i),w.hasLogin=0!=Object.keys(w.userInfo).length,o("uni-id-pages-userInfo",w.userInfo),e},async logout(){if(e.getCurrentUserInfo().tokenExpired>Date.now())try{await f.logout()}catch(s){console.error(s)}t("uni_id_token"),o("uni_id_token_expired",0),this.setUserInfo({},{cover:!0}),r("uni-id-pages-logout"),a({url:`/${u.uniIdRouter&&u.uniIdRouter.loginPage?u.uniIdRouter.loginPage:"uni_modules/uni-id-pages/pages/login/login-withoutpwd"}`})},loginBack(e={}){const{uniIdRedirectUrl:s=""}=e;let i=0,n=d();if(n.forEach(((e,s)=>{"login"==n[n.length-s-1].route.split("/")[3]&&i++})),s)return a({url:s,fail:e=>{l({url:s,fail:s=>{console.log(e,s)}})}});if("weixin"==e.loginType)return window.history.go(-3);if(i){const e=u.pages[0];return c({url:`/${e.path}`})}g({delta:i})},loginSuccess(e={}){const{showToast:s=!0,toastText:i="登录成功",autoBack:o=!0,uniIdRedirectUrl:t="",passwordConfirmed:u}=e;if(s&&n({title:i,icon:"none",duration:3e3}),this.updateUserInfo(),r("uni-id-pages-login-success"),p.setPasswordAfterLogin&&!u)return a({url:t?`/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?uniIdRedirectUrl=${t}&loginType=${e.loginType}`:`/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?loginType=${e.loginType}`,fail:e=>{console.log(e)}});o&&this.loginBack({uniIdRedirectUrl:t})}},w=i({userInfo:m,hasLogin:0!=Object.keys(m).length});export{p as c,I as m,w as s};
