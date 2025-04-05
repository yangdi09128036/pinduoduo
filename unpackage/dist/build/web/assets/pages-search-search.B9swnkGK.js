import{n as e,a,s,m as t,b as c,l,p as o,c as r,w as n,i as d,o as i,d as h,ad as u,e as g,q as f,u as m,F as S,f as _,g as p,I as k,j as y,S as v,t as G}from"./index-DyUMtph-.js";import{_ as C}from"./left.CpwphMH_.js";import{a as w,_ as T}from"./camera.sMgFRGYR.js";import{_ as x}from"./_plugin-vue_export-helper.BCo6x5W8.js";const R=x({data:()=>({searchPlaceholder:"请输入商品信息",allGoods:[],randomGoods:[],searchKeyword:"",recentSearches:[],searchSuggestions:[]}),onLoad(){this.getGoods(),this.loadRecentSearches()},methods:{async getGoods(){try{const{result:{data:a}}=await e.database().collection("mall-goods").get();this.allGoods=a||[],this.randomGoods=this.getRandomGoods(16),this.allGoods.length>0&&(this.searchPlaceholder=this.allGoods[Math.floor(Math.random()*this.allGoods.length)].keywords||"请输入商品信息"),this.generateSearchSuggestions()}catch(a){console.error("获取商品数据失败:",a)}},getRandomGoods(e){return[...this.allGoods].sort((()=>Math.random()-.5)).slice(0,e)},generateSearchSuggestions(){const e=this.allGoods.flatMap((e=>e.keywords.split(","))),a=[...new Set(e)];this.searchSuggestions=a.slice(0,16)},navBack(){a({url:"/pages/index/index"})},focusSearch(){this.searchKeyword=""},handleSearch(){const e=this.searchKeyword.trim();e?(this.addRecentSearch(e),this.navigateToSearch(e)):s({title:"请输入搜索关键词",icon:"none"})},navigateToSearchWithTag(e){this.addRecentSearch(e),this.navigateToSearch(e)},addRecentSearch(e){this.recentSearches.includes(e)||(this.recentSearches.unshift(e),this.recentSearches.length>10&&this.recentSearches.pop(),t("recentSearches",this.recentSearches))},navigateToSearch(e){c({url:`/pages/search/mall-list?keyword=${encodeURIComponent(e)}`})},loadRecentSearches(){const e=l("recentSearches")||[];this.recentSearches=[...e]},navigateToProduct(e){e&&(o({key:"currentProduct",data:e,success:()=>{console.log("商品信息存储成功",e)}}),c({url:"../search/mall-details"}))}}},[["render",function(e,a,s,t,c,l){const o=p,x=k,R=d,K=y,b=v;return i(),r(R,{class:"container"},{default:n((()=>[h(R,{class:"fixed-head"},{default:n((()=>[h(R,{class:"search-container"},{default:n((()=>[h(o,{class:"search-icon",src:C,mode:"aspectFit",onClick:l.navBack},null,8,["onClick"]),h(R,{class:"search-box",onClick:l.focusSearch},{default:n((()=>[h(x,{class:"search-input",type:"text",placeholder:c.searchPlaceholder,modelValue:c.searchKeyword,"onUpdate:modelValue":a[0]||(a[0]=e=>c.searchKeyword=e),onKeyup:u(l.handleSearch,["enter"])},null,8,["placeholder","modelValue","onKeyup"]),h(o,{class:"search-icon",src:w,mode:"aspectFit"})])),_:1},8,["onClick"]),h(o,{class:"search-icon",src:T,mode:"aspectFit",onClick:l.handleSearch},null,8,["onClick"])])),_:1})])),_:1}),h(b,{"scroll-y":"",class:"scroll-container"},{default:n((()=>[c.recentSearches.length>0?(i(),r(R,{key:0,class:"recent-search"},{default:n((()=>[h(K,{class:"section-title"},{default:n((()=>[g("最近搜索")])),_:1}),h(R,{class:"tag-container"},{default:n((()=>[(i(!0),f(S,null,m(c.recentSearches,((e,a)=>(i(),r(R,{class:"tag-item",key:a,onClick:a=>l.navigateToSearchWithTag(e)},{default:n((()=>[g(G(e),1)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})):_("",!0),h(R,{class:"search-discovery"},{default:n((()=>[h(K,{class:"section-title"},{default:n((()=>[g("搜索发现")])),_:1}),h(R,{class:"tag-container"},{default:n((()=>[(i(!0),f(S,null,m(c.searchSuggestions,((e,a)=>(i(),r(R,{class:"tag-item",key:a,onClick:a=>l.navigateToSearchWithTag(e)},{default:n((()=>[g(G(e),1)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),h(R,{class:"content"},{default:n((()=>[h(R,{class:"tab-content"},{default:n((()=>[(i(!0),f(S,null,m(c.randomGoods,((e,a)=>(i(),r(R,{key:a,class:"content-item"},{default:n((()=>[h(R,{class:"product-card",onClick:a=>l.navigateToProduct(e)},{default:n((()=>{var a;return[h(o,{class:"item-image",src:null==(a=e.goods_thumb)?void 0:a.fileID,mode:"aspectFit"},null,8,["src"]),h(R,{class:"product-info"},{default:n((()=>[h(K,{class:"item-title"},{default:n((()=>[g(G(e.name),1)])),_:2},1024),h(R,{class:"service-tags"},{default:n((()=>[h(K,{class:"tag pay-later"},{default:n((()=>[g("先用后付")])),_:1}),h(K,{class:"tag quick-refund"},{default:n((()=>[g("极速退款")])),_:1})])),_:1}),h(R,{class:"price-row"},{default:n((()=>[h(K,{class:"price"},{default:n((()=>[g("¥"+G(e.price),1)])),_:2},1024),h(K,{class:"sales"},{default:n((()=>[g("全店已拼"+G(e.total_sell_count)+"+件",1)])),_:2},1024)])),_:2},1024)])),_:2},1024)]})),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1}),0===c.randomGoods.length?(i(),r(R,{key:0,class:"loading"},{default:n((()=>[g("加载中...")])),_:1})):_("",!0)])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-530b8127"]]);export{R as default};
