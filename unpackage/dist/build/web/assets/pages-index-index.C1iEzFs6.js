import{k as e,s,b as a,l as t,n as o,m as l,p as c,c as r,w as i,i as n,o as h,d as u,q as d,u as g,F as f,f as m,e as p,v as b,g as y,I as _,S as k,x as I,t as C,j as v}from"./index-DyUMtph-.js";import{s as D}from"./store.CDKRaDHf.js";import{_ as T,a as w}from"./camera.sMgFRGYR.js";import{_ as x}from"./_plugin-vue_export-helper.BCo6x5W8.js";const P=x({data:()=>({currentTab:0,searchPlaceholder:"请输入商品信息",categories:[],allGoods:[],currentTabData:[],placeholderProducts:[],specialItems:[{image:"/static/clock.png",text:"限时秒杀",url:"/pages/special/clock"},{image:"/static/recharge.png",text:"充值中心",url:"/pages/special/recharge"},{image:"/static/turntable.png",text:"现金大转盘",url:"/pages/special/turntable"},{image:"/static/sale.png",text:"9块9特卖",url:"/pages/special/sale"},{image:"/static/money.png",text:"现金红包",url:"/pages/special/money"}],sections:[{title:"百亿补贴",image:"/static/subsidy.png",url:"/pages/subsidy/subsidy"},{title:"多多买菜",image:"/static/vegetables.png",url:"/pages/buy-vegetables/buy-vegetables"}],pageNumber:1,pageSize:100,scrollHeight:"calc(100vh - 240rpx)",isRefreshing:!1,cacheKey:"homePageData",cacheExpiration:3e8,userInfoChecked:!1,userInfoComplete:!1,isDataLoaded:!1}),async onLoad(){e({success:e=>{this.scrollHeight=`calc(100vh - ${e.statusBarHeight}px - 240rpx)`}}),await this.checkUserInfoSync(),await this.getInitialData()},onShow(){this.userInfoChecked&&!this.userInfoComplete&&this.checkUserInfo(!0)},methods:{async checkUserInfoSync(){if(console.log("开始同步检查用户信息"),!D.hasLogin)return console.log("用户未登录，跳过信息检查"),void(this.userInfoChecked=!0);let e=0;for(;!D.userInfo&&e<10;)console.log(`等待用户信息加载，尝试 ${e+1}/10`),await new Promise((e=>setTimeout(e,300))),e++;if(this.userInfoChecked=!0,!D.userInfo)return console.log("用户信息加载超时或不存在"),void(this.userInfoComplete=!1);console.log("检查用户信息:",D.userInfo);const t=!!D.userInfo.mobile&&""!==D.userInfo.mobile.trim(),o=!!D.userInfo.address&&""!==D.userInfo.address.trim();console.log("用户信息检查结果:",{hasMobile:t,hasAddress:o}),this.userInfoComplete=t&&o,this.userInfoComplete?console.log("用户信息已完整"):(console.log("用户信息不完整，需要补充"),s({title:"请完善手机与收货地址",icon:"none",duration:2e3}),setTimeout((()=>{a({url:"/pages/user/set"})}),2e3))},checkUserInfo(e=!1){if(!D.hasLogin)return void console.log("用户未登录，跳过信息检查");const t=D.userInfo;if(!t)return void console.log("用户信息不存在，跳过信息检查");console.log("检查用户信息:",JSON.stringify(t));const o=!!t.mobile&&""!==t.mobile.trim(),l=!!t.address&&""!==t.address.trim();return console.log("用户信息检查结果:",{hasMobile:o,hasAddress:l}),this.userInfoComplete=o&&l,this.userInfoComplete?(console.log("用户信息已完整"),!0):(console.log("用户信息不完整，需要补充"),e||(s({title:"请完善手机与收货地址",icon:"none",duration:2e3}),setTimeout((()=>{a({url:"/pages/user/set"})}),2e3)),!1)},async getInitialData(){try{const e=this.getCachedData();e?this.setPageData(e):await this.fetchAndCacheData(),this.switchTab(0),this.isDataLoaded=!0}catch(e){throw console.error("初始化数据失败:",e),this.isDataLoaded=!1,e}},getCachedData(){const e=t(this.cacheKey);return e&&Date.now()-e.timestamp<this.cacheExpiration?e.data:null},async fetchAndCacheData(){try{const{result:e}=await o.callFunction({name:"getHomePageData",data:{pageNumber:this.pageNumber,pageSize:this.pageSize}});if(!e.success)throw new Error(e.error);this.setPageData(e.data),this.cacheData(e.data)}catch(e){throw console.error("获取数据失败:",e),e}},setPageData(e){this.categories=e.categories||[],this.allGoods=e.goods||[],this.allGoods.length>0&&(this.searchPlaceholder=this.allGoods[Math.floor(Math.random()*this.allGoods.length)].keywords||"请输入商品信息")},cacheData(e){l(this.cacheKey,{timestamp:Date.now(),data:e})},switchTab(e){this.currentTab=e;const s=this.categories[e];if(s)if(0===e){const e=[...this.allGoods].sort((()=>Math.random()-.5));this.currentTabData=e.slice(0,this.pageSize),this.placeholderProducts=e.slice(this.pageSize-80,this.pageSize+5)}else this.currentTabData=this.allGoods.filter((e=>parseInt(e.category_id)===parseInt(s.sort)))},navigateToSearch(){a({url:"/pages/search/search"})},navigateToPage(e){a({url:e})},navigateToSection(e){const s=this.sections[e];s&&a({url:s.url})},navigateToProduct(e){e&&(c({key:"currentProduct",data:e,success:()=>{console.log("商品信息存储成功",e)}}),a({url:"../search/mall-details"}))},onRefresh(){console.log("正在刷新..."),this.isRefreshing=!0,this.fetchAndCacheData().then((()=>{this.switchTab(this.currentTab),this.isRefreshing=!1})).catch((e=>{console.error("刷新失败:",e),this.isRefreshing=!1}))}}},[["render",function(e,s,a,t,o,l){const c=y,D=_,x=n,P=v,S=k;return h(),r(x,{class:"container"},{default:i((()=>[u(x,{class:"fixed-head"},{default:i((()=>[u(x,{class:"search-container"},{default:i((()=>[u(x,{class:"search-box",onClick:l.navigateToSearch},{default:i((()=>[u(c,{class:"search-icon",src:T,mode:"aspectFit"}),u(D,{class:"search-input",type:"text",placeholder:o.searchPlaceholder},null,8,["placeholder"]),u(c,{class:"search-icon",src:w,mode:"aspectFit"})])),_:1},8,["onClick"])])),_:1}),u(x,{class:"tab-container"},{default:i((()=>[(h(!0),d(f,null,g(o.categories,((e,s)=>(h(),r(x,{key:s,class:I(["tab-item",{active:o.currentTab===s}]),onClick:e=>l.switchTab(s)},{default:i((()=>[p(C(e.name),1)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1}),u(S,{"scroll-y":"",class:"scroll-container",style:b({height:o.scrollHeight}),onRefresherrefresh:l.onRefresh,"refresher-enabled":"true","refresher-threshold":100,"refresher-default-style":"none","refresher-background":"#eee","lower-threshold":"0","refresher-triggered":o.isRefreshing},{default:i((()=>[0===o.currentTab?(h(),d(f,{key:0},[u(x,{class:"section-new"},{default:i((()=>[(h(!0),d(f,null,g(o.specialItems,((e,s)=>(h(),r(x,{key:s,class:"common-item",onClick:s=>l.navigateToPage(e.url)},{default:i((()=>[u(c,{class:"section-image",src:e.image,mode:"aspectFit","lazy-load":!0},null,8,["src"]),u(P,{class:"section-text"},{default:i((()=>[p(C(e.text),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1}),(h(!0),d(f,null,g(o.sections,((e,s)=>(h(),r(x,{key:s,class:"section",onClick:e=>l.navigateToSection(s)},{default:i((()=>[u(x,{class:"common-item"},{default:i((()=>[u(c,{class:"section-image",src:e.image,mode:"aspectFit","lazy-load":!0},null,8,["src"]),u(P,{class:"section-text-new"},{default:i((()=>[p(C(e.title),1)])),_:2},1024)])),_:2},1024),(h(!0),d(f,null,g(o.placeholderProducts.slice(4*s,4*(s+1)),((e,s)=>(h(),r(x,{key:s,class:"common-item"},{default:i((()=>{var s;return[u(c,{class:"section-image",src:null==(s=e.goods_thumb)?void 0:s.fileID,mode:"aspectFit","lazy-load":!0},null,8,["src"]),u(P,{class:"price",style:{color:"red"}},{default:i((()=>[p("¥"+C(e.price),1)])),_:2},1024)]})),_:2},1024)))),128))])),_:2},1032,["onClick"])))),128))],64)):m("",!0),u(x,{class:"content"},{default:i((()=>[null!==o.currentTab?(h(),r(x,{key:0,class:"tab-content"},{default:i((()=>[(h(!0),d(f,null,g(o.currentTabData,((e,s)=>(h(),r(x,{key:s,class:"content-item",onClick:s=>l.navigateToProduct(e)},{default:i((()=>[u(x,{class:"product-card"},{default:i((()=>{var s;return[u(c,{class:"item-image",src:null==(s=e.goods_thumb)?void 0:s.fileID,mode:"aspectFit","lazy-load":!0},null,8,["src"]),u(x,{class:"product-info"},{default:i((()=>[u(P,{class:"item-title"},{default:i((()=>[p(C(e.name),1)])),_:2},1024),u(x,{class:"service-tags"},{default:i((()=>[u(P,{class:"tag pay-later"},{default:i((()=>[p("先用后付")])),_:1}),u(P,{class:"tag quick-refund"},{default:i((()=>[p("极速退款")])),_:1})])),_:1}),u(x,{class:"price-row"},{default:i((()=>[u(P,{class:"price"},{default:i((()=>[p("¥"+C(e.price),1)])),_:2},1024),u(P,{class:"sales"},{default:i((()=>[p("全店已拼"+C(e.total_sell_count)+"+件",1)])),_:2},1024)])),_:2},1024)])),_:2},1024)]})),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})):(h(),r(x,{key:1,class:"loading"},{default:i((()=>[p("加载中...")])),_:1}))])),_:1})])),_:1},8,["style","onRefresherrefresh","refresher-triggered"])])),_:1})}],["__scopeId","data-v-7cd509b1"]]);export{P as default};
