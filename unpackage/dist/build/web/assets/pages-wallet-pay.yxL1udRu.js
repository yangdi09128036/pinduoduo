import{l as a,n as t,s as e,m as s,W as o,z as n,c,w as l,i as r,o as d,d as i,e as m,t as u,q as p,u as h,F as y,j as f,g as _,h as g,x as D,f as b}from"./index-DyUMtph-.js";import{s as I}from"./store.CDKRaDHf.js";import{_ as w}from"./_plugin-vue_export-helper.BCo6x5W8.js";const k=w({data:()=>({paymentData:{amount:0,username:"",avatar:"",productId:"",productName:"",productImage:"",quantity:1},selectedMethod:0,paymentMethods:[{name:"农业银行储蓄卡(0270)",icon:"/static/bank-icons/abc.png"},{name:"四川农信储蓄卡(2128)",icon:"/static/bank-icons/sc.png"},{name:"农业银行储蓄卡(0073)",icon:"/static/bank-icons/abc.png"}]}),onLoad(){console.log("用户信息:",I.userInfo);const t=a("paymentData");t&&(this.paymentData=t,console.log("支付数据",this.paymentData));const e=I.userInfo.avatar_file.url;this.paymentData.avatar=e},methods:{maskPhone:a=>a?11===a.length?a.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"):a:"",selectPaymentMethod(a){this.selectedMethod=a},async handleConfirmPayment(){const c=t.database(),l=a("currentOrderIds")||[];console.log("订单ids",l);try{const a=await c.collection("wallet").where({user_id:this.paymentData.userId}).get();if(0===a.result.data.length)throw new Error("钱包不存在");const t=a.result.data[0];console.log("余额",t.balance),console.log("本次支付的总金额",this.paymentData.amount);const r=t.balance-this.paymentData.amount;if(console.log("支付后的余额",r),r<0)return void e({title:"余额不足",icon:"none"});await c.collection("wallet").doc(t._id).update({balance:r,updated_at:Date.now()});for(const e of l)await c.collection("order").doc(e).update({paymentStatus:1,shareStatus:0});if(Array.isArray(this.paymentData.productId)&&this.paymentData.productId.length>1){const a=await Promise.all(l.map((a=>c.collection("order").doc(a).get())));console.log("最后",a);for(const t of a)if(t.result&&t.result.data){const a=t.result.data;console.log("单个商品的价格信息",a[0].amount),await c.collection("wallet_transactions").add({user_id:this.paymentData.userId,amount:a[0].amount,type:"debit",balance:r,productImage:a[0].productImage})}}else await c.collection("wallet_transactions").add({user_id:this.paymentData.userId,amount:this.paymentData.amount,type:"debit",balance:r,productImage:this.paymentData.productImage});s("paymentSuccess",!0),e({title:"支付成功",icon:"success"}),o("paymentData"),o("currentOrderIds"),setTimeout((()=>{n()}),1500)}catch(r){console.error("支付失败:",r),e({title:r.message||"支付失败，请重试",icon:"none"})}},async handleCancel(){const s=t.database(),c=a("currentOrderIds")||[];try{for(const a of c)await s.collection("order").doc(a).update({paymentStatus:0});o("paymentData"),o("currentOrderIds"),e({title:"取消支付",icon:"error"}),n()}catch(l){console.error("取消支付失败:",l),e({title:"操作失败，请重试",icon:"none"})}}}},[["render",function(a,t,e,s,o,n){const I=f,w=r,k=_,v=g;return d(),c(w,{class:"pay-container"},{default:l((()=>[i(w,{class:"pay-popup"},{default:l((()=>[i(w,{class:"close-btn",onClick:n.handleCancel},{default:l((()=>[i(I,{class:"close-icon"},{default:l((()=>[m("×")])),_:1})])),_:1},8,["onClick"]),i(w,{class:"user-info"},{default:l((()=>[i(k,{src:o.paymentData.avatar,class:"user-avatar"},null,8,["src"]),i(I,{class:"user-phone"},{default:l((()=>[m(u(n.maskPhone(o.paymentData.mobile)),1)])),_:1})])),_:1}),i(w,{class:"merchant-info"},{default:l((()=>[i(I,{class:"merchant-name"},{default:l((()=>[m("拼多多平台商户")])),_:1}),i(I,{class:"payment-amount"},{default:l((()=>[m("¥"+u(o.paymentData.amount.toFixed(2)),1)])),_:1})])),_:1}),i(w,{class:"payment-methods"},{default:l((()=>[(d(!0),p(y,null,h(o.paymentMethods,((a,t)=>(d(),c(w,{class:D(["method-item",{selected:o.selectedMethod===t}]),key:t,onClick:a=>n.selectPaymentMethod(t)},{default:l((()=>[i(k,{src:a.icon,class:"method-icon"},null,8,["src"]),i(I,{class:"method-name"},{default:l((()=>[m(u(a.name),1)])),_:2},1024),o.selectedMethod===t?(d(),c(I,{key:0,class:"method-check"},{default:l((()=>[m("✓")])),_:1})):b("",!0)])),_:2},1032,["onClick","class"])))),128))])),_:1}),i(v,{class:"confirm-btn",onClick:n.handleConfirmPayment},{default:l((()=>[m("确认付款")])),_:1},8,["onClick"]),i(w,{class:"service-provider"},{default:l((()=>[i(I,{class:"provider-text"},{default:l((()=>[m("本服务由支付宝(杭州)信息技术有限公司提供")])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-427b193f"]]);export{k as default};
