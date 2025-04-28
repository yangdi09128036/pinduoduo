if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const UNI_SSR = "__uniSSR";
  const UNI_SSR_DATA = "data";
  const UNI_SSR_GLOBAL_DATA = "globalData";
  function getSSRDataType() {
    return vue.getCurrentInstance() ? UNI_SSR_DATA : UNI_SSR_GLOBAL_DATA;
  }
  function assertKey(key, shallow = false) {
    if (!key) {
      throw new Error(`${shallow ? "shallowSsrRef" : "ssrRef"}: You must provide a key.`);
    }
  }
  const ssrClientRef = (value, key, shallow = false) => {
    const valRef = shallow ? vue.shallowRef(value) : vue.ref(value);
    if (typeof window === "undefined") {
      return valRef;
    }
    const __uniSSR = window[UNI_SSR];
    if (!__uniSSR) {
      return valRef;
    }
    const type = getSSRDataType();
    assertKey(key, shallow);
    if (shared.hasOwn(__uniSSR[type], key)) {
      valRef.value = __uniSSR[type][key];
      if (type === UNI_SSR_DATA) {
        delete __uniSSR[type][key];
      }
    }
    return valRef;
  };
  const ssrRef = (value, key) => {
    return ssrClientRef(value, key);
  };
  const shallowSsrRef = (value, key) => {
    return ssrClientRef(value, key, true);
  };
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const pages = [
    {
      path: "uni_modules/uni-id-pages/pages/login/login-withpwd",
      style: {
        navigationBarTitleText: "账号密码登录"
      }
    },
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "uni-app"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/register/register",
      style: {
        navigationBarTitleText: "注册"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/login/login-withoutpwd",
      style: {
        navigationBarTitleText: "登录"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/login/login-smscode",
      style: {
        navigationBarTitleText: "手机验证码登录"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/userinfo",
      style: {
        navigationBarTitleText: "个人资料"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile",
      style: {
        navigationBarTitleText: "绑定手机号码"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/register/register-by-email",
      style: {
        navigationBarTitleText: "邮箱验证码注册"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/retrieve/retrieve",
      style: {
        navigationBarTitleText: "重置密码"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email",
      style: {
        navigationBarTitleText: "通过邮箱重置密码"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/common/webview/webview",
      style: {
        enablePullDownRefresh: false,
        navigationBarTitleText: ""
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",
      style: {
        enablePullDownRefresh: false,
        navigationBarTitleText: "修改密码"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/register/register-admin",
      style: {
        enablePullDownRefresh: false,
        navigationBarTitleText: "注册管理员账号"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd",
      style: {
        enablePullDownRefresh: false,
        navigationBarTitleText: "设置密码"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate",
      style: {
        navigationBarTitleText: "注销账号"
      }
    },
    {
      path: "uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify",
      style: {
        enablePullDownRefresh: false,
        navigationBarTitleText: "实名认证"
      }
    },
    {
      path: "pages/chat/chat",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/user/user",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/search/search",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/search/mall-list",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/search/mall-details",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/wallet/wallet",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/wallet/pay",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/malls-manage/favor",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/malls-manage/history",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/user/order",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/user/set",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/subsidy/subsidy",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/buy-vegetables/buy-vegetables",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/webview/webview",
      style: {
        navigationBarTitleText: ""
      }
    },
    {
      path: "pages/mall-goods/add",
      style: {
        navigationBarTitleText: "新增"
      }
    },
    {
      path: "pages/mall-goods/edit",
      style: {
        navigationBarTitleText: "编辑"
      }
    },
    {
      path: "pages/mall-goods/list",
      style: {
        navigationBarTitleText: "列表"
      }
    },
    {
      path: "pages/mall-goods/detail",
      style: {
        navigationBarTitleText: "详情"
      }
    },
    {
      path: "pages/search/AllReviews",
      style: {
        navigationBarTitleText: ""
      }
    }
  ];
  const tabBar = {
    color: "#7A7E83",
    selectedColor: "#ff0000",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "/static/index.png",
        selectedIconPath: "/static/index-ed.png"
      },
      {
        pagePath: "pages/chat/chat",
        text: "聊天",
        iconPath: "/static/chat.png",
        selectedIconPath: "/static/chat-ed.png"
      },
      {
        pagePath: "pages/user/user",
        text: "个人中心",
        iconPath: "/static/user.png",
        selectedIconPath: "/static/user-ed.png"
      }
    ]
  };
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    navigationStyle: "custom"
  };
  const uniIdRouter = {};
  const pagesJson = {
    pages,
    tabBar,
    globalStyle,
    uniIdRouter
  };
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t$3(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], T2 = e4[t4 + 14], A2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
        P2 = u2(P2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, C2, T2, 17, a2[14]), P2 = h2(P2, C2 = u2(C2, x2, O2, P2, A2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, P2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, P2, C2, A2, 14, a2[22]), C2 = h2(C2, x2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, C2, x2, T2, 9, a2[25]), x2 = h2(x2, O2, P2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, P2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, P2, C2, _2, 14, a2[30]), P2 = l2(P2, C2 = h2(C2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, P2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, P2, T2, 23, a2[35]), P2 = l2(P2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, P2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, P2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, P2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, P2, C2, A2, 16, a2[46]), P2 = d2(P2, C2 = l2(C2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, C2, T2, 15, a2[50]), C2 = d2(C2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, C2, x2, A2, 10, a2[57]), x2 = d2(x2, O2, P2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== l;
      }
    }
    exec() {
      return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", T = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), A = b, P = I('{"address":["127.0.0.1","192.168.206.1","192.168.89.1","10.30.108.158","172.20.0.1"],"servePort":7000,"debugPort":9000,"initialLaunchType":"remote","skipFiles":["<node_internals>/**","D:/HBuilderX/plugins/unicloud/**/*.js"]}'), C = I('[{"provider":"aliyun","spaceName":"pdd","spaceId":"mp-0dcd11a4-5797-4c2e-9b6e-d28808479dcd","clientSecret":"OmlJkqdgJblOVBVMC7xDug==","endpoint":"https://api.next.bspapp.com"}]') || [];
  let O = "";
  try {
    O = "__UNI__1D20EA0";
  } catch (e2) {
  }
  let E, L = {};
  function R(e2, t2 = {}) {
    var n2, s2;
    return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
  }
  function U() {
    return E || (E = function() {
      if ("undefined" != typeof globalThis)
        return globalThis;
      if ("undefined" != typeof self)
        return self;
      if ("undefined" != typeof window)
        return window;
      function e2() {
        return this;
      }
      return void 0 !== e2() ? e2() : new Function("return this")();
    }(), E);
  }
  L = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const N = ["invoke", "success", "fail", "complete"], D = R("_globalUniCloudInterceptor");
  function M(e2, t2) {
    D[e2] || (D[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      N.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = D[e3][t3];
        s2 || (s2 = D[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function q(e2, t2) {
    D[e2] || (D[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      N.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = D[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete D[e2];
  }
  function K(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function F(e2, t2) {
    return D[e2] && D[e2][t2] || [];
  }
  function j(e2) {
    M("callObject", e2);
  }
  const $ = R("_globalUniCloudListener"), B = "response", W = "needLogin", H = "refreshToken", J = "clientdb", z = "cloudfunction", V = "cloudobject";
  function G(e2) {
    return $[e2] || ($[e2] = []), $[e2];
  }
  function Y(e2, t2) {
    const n2 = G(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function Q(e2, t2) {
    const n2 = G(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function X(e2, t2) {
    const n2 = G(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Z, ee = false;
  function te() {
    return Z || (Z = new Promise((e2) => {
      ee && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (ee = true, e2());
        }
        ee || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Z);
  }
  function ne(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class se extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var re = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
  function ie(e2) {
    return e2 && ie(e2.__v_raw) || e2;
  }
  function oe() {
    return { token: re.getStorageSync("uni_id_token") || re.getStorageSync("uniIdToken"), tokenExpired: re.getStorageSync("uni_id_token_expired") };
  }
  function ae({ token: e2, tokenExpired: t2 } = {}) {
    e2 && re.setStorageSync("uni_id_token", e2), t2 && re.setStorageSync("uni_id_token_expired", t2);
  }
  let ce, ue;
  function he() {
    return ce || (ce = uni.getSystemInfoSync()), ce;
  }
  function le() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  let de = {};
  function pe() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ue)
      return { ...de, ...ue, locale: e2, LOCALE: e2 };
    const t2 = he(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
    for (const e3 in t2)
      Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
    return ue = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...le(), ...t2 }, { ...de, ...ue, locale: e2, LOCALE: e2 };
  }
  var fe = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new se({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new se({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var ge = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = re, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new se({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return fe.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = fe.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = fe.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new se({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = fe.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new se({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var me = { init(e2) {
    const t2 = new ge(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var _e;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(_e || (_e = {}));
  var we = function() {
  }, ve = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
          d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
    }(Math), n2.SHA256);
  }), Ie = ve, Se = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const be = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new se({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function ke(e2) {
    return void 0 === e2;
  }
  function Te(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  function Ae(e2 = "") {
    return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
  }
  function Pe(e2 = 32) {
    const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n2 = t2.length;
    let s2 = "";
    for (let r2 = 0; r2 < e2; r2++)
      s2 += t2.charAt(Math.floor(Math.random() * n2));
    return s2;
  }
  var Ce;
  function xe(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(Ce || (Ce = {}));
  const Oe = { adapter: null, runtime: void 0 }, Ee = ["anonymousUuidKey"];
  class Le extends we {
    constructor() {
      super(), Oe.adapter.root.tcbObject || (Oe.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Oe.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Oe.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Oe.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Oe.adapter.root.tcbObject;
    }
  }
  function Re(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Le();
      case "none":
        return new Le();
      default:
        return t2.sessionStorage || new Le();
    }
  }
  class Ue {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Oe.adapter.primaryStorage || e2.persistence, this._storage = Re(this._persistence, Oe.adapter);
        const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = "device_id", a2 = `token_type_${e2.env}`, c2 = `user_info_${e2.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = Re(e2, Oe.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Ee.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        ke(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Ne = {}, De = {};
  function Me(e2) {
    return Ne[e2];
  }
  class qe {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ke extends qe {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const Fe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ke)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new qe(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function je(e2, t2) {
    Fe.on(e2, t2);
  }
  function $e(e2, t2 = {}) {
    Fe.fire(e2, t2);
  }
  function Be(e2, t2) {
    Fe.off(e2, t2);
  }
  const We = "loginStateChanged", He = "loginStateExpire", Je = "loginTypeChanged", ze = "anonymousConverted", Ve = "refreshAccessToken";
  var Ge;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(Ge || (Ge = {}));
  class Ye {
    constructor() {
      this._fnPromiseMap = /* @__PURE__ */ new Map();
    }
    async run(e2, t2) {
      let n2 = this._fnPromiseMap.get(e2);
      return n2 || (n2 = new Promise(async (n3, s2) => {
        try {
          await this._runIdlePromise();
          const s3 = t2();
          n3(await s3);
        } catch (e3) {
          s2(e3);
        } finally {
          this._fnPromiseMap.delete(e2);
        }
      }), this._fnPromiseMap.set(e2, n2)), n2;
    }
    _runIdlePromise() {
      return Promise.resolve();
    }
  }
  class Qe {
    constructor(e2) {
      this._singlePromise = new Ye(), this._cache = Me(e2.env), this._baseURL = `https://${e2.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Oe.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: `请求在${e2.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
    }
    _getDeviceId() {
      if (this._deviceID)
        return this._deviceID;
      const { deviceIdKey: e2 } = this._cache.keys;
      let t2 = this._cache.getStore(e2);
      return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Pe(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
    }
    async _request(e2, t2, n2 = {}) {
      const s2 = { "x-request-id": Pe(), "x-device-id": this._getDeviceId() };
      if (n2.withAccessToken) {
        const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
        s2.authorization = `${n3} ${t3}`;
      }
      return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e2}`, data: t2, headers: s2 });
    }
    async _fetchAccessToken() {
      const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
      if (r2 && r2 !== Ge.ANONYMOUS)
        throw new se({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
      const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
      return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
    }
    isAccessTokenExpired(e2, t2) {
      let n2 = true;
      return e2 && t2 && (n2 = t2 < Date.now()), n2;
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
    }
    async refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, Ge.ANONYMOUS), this.getAccessToken();
    }
    async getUserInfo() {
      return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
    }
  }
  const Xe = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ze = { "X-SDK-Version": "1.3.5" };
  function et(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function tt() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...Ze, "x-seqid": e2 } };
  }
  class nt {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Oe.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Me(this.config.env), this._localCache = (t2 = this.config.env, De[t2]), this.oauth = new Qe(this.config), et(this._reqClass, "post", [tt]), et(this._reqClass, "upload", [tt]), et(this._reqClass, "download", [tt]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new se({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === Ge.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          $e(He), this._cache.removeStore(n2);
        }
        throw new se({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return $e(Ve), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new se({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      let o2;
      if (-1 === Xe.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
      }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new se({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}, n2 = {}) {
      const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Xe.indexOf(e2)) {
        await this.oauth.refreshAccessToken();
        const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
        if (s3.data.code)
          throw new se({ code: s3.data.code, message: Ae(s3.data.message) });
        return s3.data;
      }
      if (s2.data.code)
        throw new se({ code: s2.data.code, message: Ae(s2.data.message) });
      return s2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const st = {};
  function rt(e2) {
    return st[e2];
  }
  class it {
    constructor(e2) {
      this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class ot {
    constructor(e2) {
      if (!e2)
        throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Me(this._envId), this._request = rt(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const e2 = await this._request.oauth.getUserInfo();
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class at {
    constructor(e2) {
      if (!e2)
        throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Me(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new ot(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === Ge.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === Ge.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === Ge.WECHAT || this.loginType === Ge.WECHAT_OPEN || this.loginType === Ge.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class ct extends it {
    async signIn() {
      this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.ANONYMOUS, persistence: "local" });
      const e2 = new at(this.config.env);
      return await e2.user.refresh(), e2;
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), $e(ze, { env: this.config.env }), $e(Je, { loginType: Ge.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new se({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Ge.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class ut extends it {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new at(this.config.env);
      throw new se({ message: "自定义登录失败" });
    }
  }
  class ht extends it {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.EMAIL, persistence: this.config.persistence }), new at(this.config.env);
      throw s2.code ? new se({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new se({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class lt extends it {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Ge.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.USERNAME, persistence: this.config.persistence }), new at(this.config.env);
      throw s2.code ? new se({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new se({ message: "用户名密码登录失败" });
    }
  }
  class dt {
    constructor(e2) {
      this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), je(Je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new ct(this.config);
    }
    customAuthProvider() {
      return new ut(this.config);
    }
    emailAuthProvider() {
      return new ht(this.config);
    }
    usernameAuthProvider() {
      return new lt(this.config);
    }
    async signInAnonymously() {
      return new ct(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new ht(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new lt(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new ct(this.config)), je(ze, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === Ge.ANONYMOUS)
        throw new se({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), $e(We), $e(Je, { env: this.config.env, loginType: Ge.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      je(We, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      je(He, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      je(Ve, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      je(ze, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      je(Je, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new at(this.config.env);
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new ut(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const pt = function(e2, t2) {
    t2 = t2 || be();
    const n2 = rt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new se({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ft = function(e2, t2) {
    t2 = t2 || be();
    const n2 = rt(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, gt = function({ fileList: e2 }, t2) {
    if (t2 = t2 || be(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return rt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, mt = function({ fileList: e2 }, t2) {
    t2 = t2 || be(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return rt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, yt = async function({ fileID: e2 }, t2) {
    const n2 = (await mt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = rt(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, _t = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
    const a2 = o2 || be();
    let c2;
    try {
      c2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new se({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
    return rt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
      if (e3.code)
        a2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          a2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            a2(new se({ message: "response data must be json" }));
          }
      }
      return a2.promise;
    }).catch((e3) => {
      a2(e3);
    }), a2.promise;
  }, wt = { timeout: 15e3, persistence: "session" }, vt = {};
  class It {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Oe.adapter || (this.requestClient = new Oe.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...wt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new It(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Oe.adapter.primaryStorage || wt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Ne[t3] = new Ue(e3), De[t3] = new Ue({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, st[n2.env] = new nt(n2), this.authObj = new dt(this.config), this.authObj;
    }
    on(e2, t2) {
      return je.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return Be.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return _t.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return gt.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return mt.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return yt.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return pt.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return ft.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      vt[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = vt[e2];
      if (!n2)
        throw new se({ message: `扩展${e2} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = xe(e2) || {};
      t2 && (Oe.adapter = t2), n2 && (Oe.runtime = n2);
    }
  }
  var St = new It();
  function bt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class kt {
    get(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        re.request({ url: bt("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    post(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        re.request({ url: bt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = re.uploadFile({ url: bt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const Tt = { setItem(e2, t2) {
    re.setStorageSync(e2, t2);
  }, getItem: (e2) => re.getStorageSync(e2), removeItem(e2) {
    re.removeStorageSync(e2);
  }, clear() {
    re.clearStorageSync();
  } };
  var At = { genAdapter: function() {
    return { root: {}, reqClass: kt, localStorage: Tt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  St.useAdapters(At);
  const Pt = St, Ct = Pt.init;
  Pt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = Ct.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ne(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var xt = Pt;
  async function Ot(e2, t2) {
    const n2 = `http://${e2}:${t2}/system/ping`;
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        re.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function Et(e2, t2) {
    let n2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      const r2 = e2[s2];
      if (await Ot(r2, t2)) {
        n2 = r2;
        break;
      }
    }
    return { address: n2, port: t2 };
  }
  const Lt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
  var Rt = class {
    constructor(e2) {
      if (["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), !e2.endpoint)
        throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
      this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = re;
    }
    async request(e2, t2 = true) {
      const n2 = t2;
      return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : fe.wrappedRequest(e2, this.adapter.request));
    }
    requestLocal(e2) {
      return new Promise((t2, n2) => {
        this.adapter.request(Object.assign(e2, { complete(e3) {
          if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
            const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
            return n2(new se({ code: t3, message: s2 }));
          }
          t2({ success: true, result: e3.data });
        } }));
      });
    }
    setupRequest(e2) {
      const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
      n2["x-serverless-sign"] = fe.sign(t2, this.config.clientSecret);
      const s2 = pe();
      n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
      const { token: r2 } = oe();
      return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
    }
    async setupLocalRequest(e2) {
      const t2 = pe(), { token: n2 } = oe(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Et(r2, i2);
      return { url: `http://${o2}:${i2}/${Lt[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(t2, false);
    }
    getUploadFileOptions(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    reportUploadFile(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new se({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
          const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
            e3 && e3.statusCode < 400 ? t4(e3) : r3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
          }, fail(e3) {
            r3(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
          } });
          "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
            s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
          });
        });
      }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(t2).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new se({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(n2).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new se({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var Ut = { init(e2) {
    const t2 = new Rt(e2), n2 = { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, Nt = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Dt() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
      var t2 = 16 * Math.random() | 0;
      return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
    });
  }
  function Mt(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Dt(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), s3 = Ie(e3.body).toString(Nt), r3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${n3}
${t3}
${s3}
`, i3 = Ie(r3).toString(Nt), o3 = `HMAC-SHA256
${e3.timestamp}
${i3}
`, a3 = Se(o3, e3.secretKey).toString(Nt);
      return `HMAC-SHA256 Credential=${e3.secretId}, SignedHeaders=${t3}, Signature=${a3}`;
    }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
    return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
  }
  function qt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
    return new Promise((i2, o2) => {
      re.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return o2(new se({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Kt(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Mt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return qt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function Ft(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new se({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function jt(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  class $t {
    constructor(e2) {
      this.config = e2;
    }
    signedURL(e2, t2 = {}) {
      const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Dt(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
        return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
      }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", Ie(i2).toString(Nt)].join("\n"), a2 = Se(o2, this.config.secretKey).toString(Nt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
      return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
    }
  }
  var Bt = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error(`${t2} required`);
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new $t(this.config);
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
        r2 && (a2["x-function-invoke-type"] = "async");
        const { url: c2, headers: u2 } = Mt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return qt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
          let t3 = 0;
          if (r2) {
            const n3 = e4.data || {};
            t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
          }
          if (0 !== t3)
            throw new se({ code: t3, message: e4.errMsg, requestId: e4.requestId });
          return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
        }).catch((e4) => {
          throw new se({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = re.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Kt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
        const s2 = [];
        for (const n3 of e2) {
          let e3;
          "string" !== f(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
          try {
            e3 = Ft.call(this, n3);
          } catch (t3) {
            console.warn(t3.errCode, t3.errMsg), e3 = n3;
          }
          s2.push({ file_id: e3, expire: 600 });
        }
        Kt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: jt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
    async connectWebSocket(e2) {
      const { name: t2, query: n2 } = e2;
      return re.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
      } });
    }
  };
  var Wt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Bt(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Ht({ data: e2 }) {
    let t2;
    t2 = pe();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = oe();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Jt(e2 = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${t2}:${n2}/system/check-function`, o2 = `http://${t2}:${n2}/cloudfunctions/${e2.name}`;
    return new Promise((t3, n3) => {
      re.request({ method: "POST", url: i2, data: { name: e2.name, platform: A, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: t3, message: n3 }) => {
      if (0 !== t3) {
        switch (t3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e2.name}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e2.name}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR":
            console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
            break;
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = `检测本地调试服务出现错误：${n3}，请检查网络环境或重启客户端再试`;
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction(e2);
      }
      return new Promise((t4, n4) => {
        const r3 = Ht.call(this, { data: e2.data });
        re.request({ method: "POST", url: o2, data: { provider: s2, platform: A, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new se({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
          n4(new se({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const zt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var Vt = /[\\^$.*+?()[\]{}|]/g, Gt = RegExp(Vt.source);
  function Yt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Gt.test(s2) ? s2.replace(Vt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Xt = "request", Zt = "response", en$3 = "both";
  const Mn = { code: 2e4, message: "System error" }, qn = { code: 20101, message: "Invalid client" };
  function jn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new se({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || Mn.code, message: r2 || o2, cause: a2 });
  }
  let Bn;
  function Vn({ secretType: e2 } = {}) {
    return e2 === Xt || e2 === Zt || e2 === en$3;
  }
  function Gn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function Yn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = he();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = T;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), jn(qn);
  }
  function Qn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Xn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ht.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Vn(n3), o2 = Gn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = Yt(c2, `{$${e5}}`, a3[e5]);
          for (const e5 in t3)
            c2 = Yt(c2, `{${e5}}`, t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: `[${n3.name}]: ${e3.message}`, formatter: zt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Jt), o2 = Jt) : o2 = n2, o2 = o2.bind(e2), Gn(t3))
        a2 = n2.call(e2, t3);
      else if (Vn(t3)) {
        a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (Yn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && "undefined" != typeof UTS && (e3.result = UTS.JSON.parse(JSON.stringify(e3.result))), e3));
    };
  }
  Bn = class {
    constructor() {
      throw jn({ message: `Platform ${A} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const Zn = Symbol("CLIENT_DB_INTERNAL");
  function es$1(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function ts(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const ns = ["db.Geo", "db.command", "command.aggregate"];
  function ss(e2, t2) {
    return ns.indexOf(`${e2}.${t2}`) > -1;
  }
  function rs(e2) {
    switch (f(e2 = ie(e2))) {
      case "array":
        return e2.map((e3) => rs(e3));
      case "object":
        return e2._internalType === Zn || Object.keys(e2).forEach((t2) => {
          e2[t2] = rs(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function is(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class os {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: rs(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = is(e2), n2 = is(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === is(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = is(e2), n2 = is(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return as({ $method: e2, $param: rs(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: rs(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function as(e2, t2, n2) {
    return es$1(new os(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), ss(s2, t3) ? as({ $method: t3 }, e3, n2) : function() {
        return as({ $method: t3, $param: rs(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function cs({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function us(e2, t2 = {}) {
    return es$1(new e2(t2), { get: (e3, t3) => ss("db", t3) ? as({ $method: t3 }, null, e3) : function() {
      return as({ $method: t3, $param: rs(Array.from(arguments)) }, null, e3);
    } });
  }
  class hs extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = R("_globalUniCloudDatabaseCallback")), t2 || (this.auth = ts(this._authCallBacks)), this._isJQL = t2, Object.assign(this, ts(this._dbCallBacks)), this.env = es$1({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = es$1({}, { get: (e3, t3) => cs({ path: ["Geo"], method: t3 }) }), this.serverDate = cs({ path: [], method: "serverDate" }), this.RegExp = cs({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), K(F(o2, "fail"), e3).then(() => K(F(o2, "complete"), e3)).then(() => (r2(null, e3), X(B, { type: J, content: e3 }), Promise.reject(e3)));
      }
      const c2 = K(F(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new se({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ae({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), X(H, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return K(F(o2, "success"), e4).then(() => K(F(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return X(B, { type: J, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new se({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const ls = "token无效，跳转登录页面", ds = "token过期，跳转登录页面", ps = { TOKEN_INVALID_TOKEN_EXPIRED: ds, TOKEN_INVALID_INVALID_CLIENTID: ls, TOKEN_INVALID: ls, TOKEN_INVALID_WRONG_TOKEN: ls, TOKEN_INVALID_ANONYMOUS_USER: ls }, fs = { "uni-id-token-expired": ds, "uni-id-check-token-failed": ls, "uni-id-token-not-exist": ls, "uni-id-check-device-feature-failed": ls };
  function gs(e2, t2) {
    let n2 = "";
    return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function ms(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(gs(t2, e3.path)) : false === e3.needLogin && s2.push(gs(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function ys(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function _s() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function ws() {
    return ys(_s());
  }
  function vs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = ys(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const Is = !!pagesJson.uniIdRouter;
  const { loginPage: Ss, routerNeedLogin: bs, resToLogin: ks, needLoginPage: Ts, notNeedLoginPage: As, loginPageInTabBar: Ps } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = pagesJson) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ms(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ms(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: vs(i2, r2) };
  }();
  if (Ts.indexOf(Ss) > -1)
    throw new Error(`Login page [${Ss}] should not be "needLogin", please check your pages.json`);
  function Cs(e2) {
    const t2 = ws();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function xs(e2) {
    const t2 = ys(Cs(e2));
    return !(As.indexOf(t2) > -1) && (Ts.indexOf(t2) > -1 || bs.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function Os({ redirect: e2 }) {
    const t2 = ys(e2), n2 = ys(Ss);
    return ws() !== n2 && t2 !== n2;
  }
  function Es({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !Os({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
    }(Ss, t2);
    Ps ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function Ls({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = oe();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: fs[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: fs[e4] };
      }
      return n3;
    }();
    if (xs(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (G(W).length > 0)
        return setTimeout(() => {
          X(W, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Rs() {
    !function() {
      const e3 = _s(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Ls({ url: e3 });
      t2 || n2 && Es({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Ls({ url: e3.url });
        return t3 ? e3 : s2 ? (Es({ api: n2, redirect: Cs(e3.url) }), false) : e3;
      } });
    }
  }
  function Us() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in fs;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ps;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = G(W);
        te().then(() => {
          const n3 = _s();
          if (n3 && Os({ redirect: n3 }))
            return t3.length > 0 ? X(W, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (Ss && Es({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function Ns(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        Y(B, e4);
      }, e3.offResponse = function(e4) {
        Q(B, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        Y(W, e4);
      }, e3.offNeedLogin = function(e4) {
        Q(W, e4);
      }, Is && (R("_globalUniCloudStatus").needLoginInit || (R("_globalUniCloudStatus").needLoginInit = true, te().then(() => {
        Rs.call(e3);
      }), ks && Us.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        Y(H, e4);
      }, e3.offRefreshToken = function(e4) {
        Q(H, e4);
      };
    }(e2);
  }
  let Ds;
  const Ms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", qs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Ks() {
    const e2 = oe().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ds(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Ds = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !qs.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = Ms.indexOf(e2.charAt(i2++)) << 18 | Ms.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ms.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ms.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Fs = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), js = t$3(Fs);
  const $s = "manual";
  function Bs(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === $s)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function Ws(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await K(F(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await K(F(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await K(F(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await K(F(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...h2) {
          let l2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            l2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, l2 = { result: new se(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ae(y2), X(H, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error(`Invalid errorOptions.type: ${i2.type}`);
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...h2);
                }
              }
            const n3 = new se({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
            throw n3.detail = l2.result, X(B, { type: V, content: n3 }), n3;
          }
          return X(B, { type: V, content: l2.result }), l2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Hs(e2) {
    return R("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Js({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Hs(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${A}\``);
  }
  async function zs(e2) {
    const t2 = Hs(this);
    return t2.initPromise || (t2.initPromise = Js.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function Vs(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return zs.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Gs(e2) {
    !function(e3) {
      de = e3;
    }(e2);
  }
  function Ys(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class Qs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ys("getSystemInfo")(), Ys("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Xs(e2) {
    {
      const { osName: e3, osVersion: t3 } = he();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await Et(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === A.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function Zs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const er = { tcb: xt, tencent: xt, aliyun: me, private: Ut, dcloud: Ut, alipay: Wt };
  let tr = new class {
    init(e2) {
      let t2 = {};
      const n2 = er[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === A;
        const n3 = P;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Xs(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), Zs(t2), Xn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = us(hs, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = us(hs, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Ks, e3.chooseAndUploadFile = js.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Bs(e3);
        } }), e3.SSEChannel = Qs, e3.initSecureNetworkByWeixin = Vs(e3), e3.setCustomClientInfo = Gs, e3.importObject = Ws(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ne(n4), h2 = i2.then(() => s2 ? Promise.resolve() : K(F(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : K(F(t3, "success"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (r2 && X(B, { type: z, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : K(F(t3, "fail"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (X(B, { type: z, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return h2;
            h2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = C;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], tr = tr.init(t2), tr._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        tr[e3] = function() {
          return console.error(n2), Promise.reject(new se({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    if (Object.assign(tr, { get mixinDatacom() {
      return Bs(tr);
    } }), Ns(tr), tr.addInterceptor = M, tr.removeInterceptor = q, tr.interceptObject = j, uni.__uniCloud = tr, "app" === A) {
      const e3 = U();
      e3.uniCloud = tr, e3.UniCloudError = se;
    }
  })();
  var nr = tr;
  const config = {
    // 调试模式
    debug: false,
    /*
    	登录类型 未列举到的或运行环境不支持的，将被自动隐藏。
    	如果需要在不同平台有不同的配置，直接用条件编译即可
    */
    isAdmin: false,
    // 区分管理端与用户端
    loginTypes: [
      // "qq",
      // "xiaomi",
      // "sinaweibo",
      // "taobao",
      // "facebook",
      // "google",
      // "alipay",
      // "douyin",
      "univerify",
      "weixin",
      "username",
      "apple",
      "smsCode"
    ],
    // 政策协议
    agreements: {
      serviceUrl: "https://xxx",
      // 用户服务协议链接
      privacyUrl: "https://xxx",
      // 隐私政策条款链接
      // 哪些场景下显示，1.注册（包括登录并注册，如：微信登录、苹果登录、短信验证码登录）、2.登录（如：用户名密码登录）
      scope: [
        "register",
        "login",
        "realNameVerify"
      ]
    },
    // 提供各类服务接入（如微信登录服务）的应用id
    appid: {
      weixin: {
        // 微信公众号的appid，来源:登录微信公众号（https://mp.weixin.qq.com）-> 设置与开发 -> 基本配置 -> 公众号开发信息 -> AppID
        h5: "wx2489521bfcd40296",
        // 微信开放平台的appid，来源:登录微信开放平台（https://open.weixin.qq.com） -> 管理中心 -> 网站应用 -> 选择对应的应用名称，点击查看 -> AppID
        web: "wx2489521bfcd40296"
      }
    },
    /**
    * 密码强度
    * super（超强：密码必须包含大小写字母、数字和特殊符号，长度范围：8-16位之间）
    * strong（强: 密密码必须包含字母、数字和特殊符号，长度范围：8-16位之间）
    * medium (中：密码必须为字母、数字和特殊符号任意两种的组合，长度范围：8-16位之间)
    * weak（弱：密码必须包含字母和数字，长度范围：6-16位之间）
    * 为空或false则不验证密码强度
    */
    passwordStrength: "weak",
    /**
    * 登录后允许用户设置密码（只针对未设置密码得用户）
    * 开启此功能将 setPasswordAfterLogin 设置为 true 即可
    * "setPasswordAfterLogin": false
    *
    * 如果允许用户跳过设置密码 将 allowSkip 设置为 true
    * "setPasswordAfterLogin": {
    *   "allowSkip": true
    * }
    * */
    setPasswordAfterLogin: false
  };
  const uniIdCo$b = nr.importObject("uni-id-co");
  const db$3 = nr.database();
  const usersTable = db$3.collection("uni-id-users");
  let hostUserInfo = uni.getStorageSync("uni-id-pages-userInfo") || {};
  const data = {
    userInfo: hostUserInfo,
    hasLogin: Object.keys(hostUserInfo).length != 0
  };
  const mutations = {
    // data不为空，表示传递要更新的值(注意不是覆盖是合并),什么也不传时，直接查库获取更新
    async updateUserInfo(data2 = false) {
      if (data2) {
        usersTable.where("_id==$env.uid").update(data2).then((e) => {
          if (e.result.updated) {
            uni.showToast({
              title: "更新成功",
              icon: "none",
              duration: 3e3
            });
            this.setUserInfo(data2);
          } else {
            uni.showToast({
              title: "没有改变",
              icon: "none",
              duration: 3e3
            });
          }
        });
      } else {
        const _id = nr.getCurrentUserInfo().uid;
        this.setUserInfo({ _id }, { cover: true });
        const uniIdCo2 = nr.importObject("uni-id-co", {
          customUI: true
        });
        try {
          let res = await usersTable.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file,mobile,address").get();
          const realNameRes = await uniIdCo2.getRealNameInfo();
          this.setUserInfo({
            ...res.result.data[0],
            realNameAuth: realNameRes
          });
        } catch (e) {
          this.setUserInfo({}, { cover: true });
          formatAppLog("error", "at uni_modules/uni-id-pages/common/store.js:60", e.message, e.errCode);
        }
      }
    },
    setUserInfo(data2, { cover } = { cover: false }) {
      let userInfo = cover ? data2 : Object.assign(store.userInfo, data2);
      store.userInfo = Object.assign({}, userInfo);
      store.hasLogin = Object.keys(store.userInfo).length != 0;
      uni.setStorageSync("uni-id-pages-userInfo", store.userInfo);
      return data2;
    },
    async logout() {
      if (nr.getCurrentUserInfo().tokenExpired > Date.now()) {
        try {
          await uniIdCo$b.logout();
        } catch (e) {
          formatAppLog("error", "at uni_modules/uni-id-pages/common/store.js:79", e);
        }
      }
      uni.removeStorageSync("uni_id_token");
      uni.setStorageSync("uni_id_token_expired", 0);
      this.setUserInfo({}, { cover: true });
      uni.$emit("uni-id-pages-logout");
      uni.redirectTo({
        url: `/${pagesJson.uniIdRouter && pagesJson.uniIdRouter.loginPage ? pagesJson.uniIdRouter.loginPage : "uni_modules/uni-id-pages/pages/login/login-withoutpwd"}`
      });
    },
    loginBack(e = {}) {
      const { uniIdRedirectUrl = "" } = e;
      let delta = 0;
      let pages2 = getCurrentPages();
      pages2.forEach((page, index) => {
        if (pages2[pages2.length - index - 1].route.split("/")[3] == "login") {
          delta++;
        }
      });
      if (uniIdRedirectUrl) {
        return uni.redirectTo({
          url: uniIdRedirectUrl,
          fail: (err1) => {
            uni.switchTab({
              url: uniIdRedirectUrl,
              fail: (err2) => {
                formatAppLog("log", "at uni_modules/uni-id-pages/common/store.js:108", err1, err2);
              }
            });
          }
        });
      }
      if (delta) {
        const page = pagesJson.pages[0];
        return uni.reLaunch({
          url: `/${page.path}`
        });
      }
      uni.navigateBack({
        delta
      });
    },
    loginSuccess(e = {}) {
      const {
        showToast = true,
        toastText = "登录成功",
        autoBack = true,
        uniIdRedirectUrl = "",
        passwordConfirmed
      } = e;
      if (showToast) {
        uni.showToast({
          title: toastText,
          icon: "none",
          duration: 3e3
        });
      }
      this.updateUserInfo();
      uni.$emit("uni-id-pages-login-success");
      if (config.setPasswordAfterLogin && !passwordConfirmed) {
        return uni.redirectTo({
          url: uniIdRedirectUrl ? `/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?uniIdRedirectUrl=${uniIdRedirectUrl}&loginType=${e.loginType}` : `/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?loginType=${e.loginType}`,
          fail: (err2) => {
            formatAppLog("log", "at uni_modules/uni-id-pages/common/store.js:153", err2);
          }
        });
      }
      if (autoBack) {
        this.loginBack({ uniIdRedirectUrl });
      }
    }
  };
  const store = vue.reactive(data);
  const mixin = {
    data() {
      return {
        config,
        uniIdRedirectUrl: "",
        isMounted: false
      };
    },
    onUnload() {
    },
    mounted() {
      this.isMounted = true;
    },
    onLoad(e) {
      if (e.is_weixin_redirect) {
        if (window.location.href.includes("#")) {
          const paramsArr = window.location.href.split("?")[1].split("&");
          paramsArr.forEach((item) => {
            const arr = item.split("=");
            if (arr[0] == "code") {
              e.code = arr[1];
            }
          });
        }
        this.$nextTick((n2) => {
          this.$refs.uniFabLogin.login({
            code: e.code
          }, "weixin");
        });
      }
      if (e.uniIdRedirectUrl) {
        this.uniIdRedirectUrl = decodeURIComponent(e.uniIdRedirectUrl);
      }
    },
    computed: {
      needAgreements() {
        if (this.isMounted) {
          if (this.$refs.agreements) {
            return this.$refs.agreements.needAgreements;
          } else {
            return false;
          }
        }
      },
      agree: {
        get() {
          if (this.isMounted) {
            if (this.$refs.agreements) {
              return this.$refs.agreements.isAgree;
            } else {
              return true;
            }
          }
        },
        set(agree) {
          if (this.$refs.agreements) {
            this.$refs.agreements.isAgree = agree;
          } else {
            formatAppLog("log", "at uni_modules/uni-id-pages/common/login-page.mixin.js:78", "不存在 隐私政策协议组件");
          }
        }
      }
    },
    methods: {
      loginSuccess(e) {
        mutations.loginSuccess({
          ...e,
          uniIdRedirectUrl: this.uniIdRedirectUrl
        });
      }
    }
  };
  const _imports_0$5 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const uniIdCo$a = nr.importObject("uni-id-co", {
    errorOptions: {
      type: "toast"
    }
  });
  const _sfc_main$11 = {
    mixins: [mixin],
    data() {
      return {
        username: "",
        password: "",
        focusUsername: false,
        focusPassword: false,
        logo: "/static/logo.png",
        config: {
          isAdmin: false
        }
      };
    },
    onLoad() {
      const tempUsername = uni.getStorageSync("temp_username");
      const tempPassword = uni.getStorageSync("temp_password");
      if (tempUsername && tempPassword) {
        this.username = tempUsername;
        this.password = tempPassword;
        uni.removeStorageSync("temp_username");
        uni.removeStorageSync("temp_password");
      }
    },
    onShow() {
      this.checkLoginStatus();
    },
    methods: {
      // 检查登录状态
      // 替换原来的 checkLoginStatus 方法
      async checkLoginStatus() {
        const token = uni.getStorageSync("uni_id_token");
        if (!token)
          return;
        try {
          uni.showToast({
            title: "检查登录状态...",
            icon: "none",
            duration: 1e3
          });
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          uni.showToast({
            title: "已登录",
            icon: "success",
            duration: 2e3
          });
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/index/index"
            });
          }, 2e3);
        } catch (e) {
          formatAppLog("log", "at uni_modules/uni-id-pages/pages/login/login-withpwd.vue:118", "检查登录状态出错:", e);
        }
      },
      toRetrievePwd() {
        uni.showToast({
          icon: "error",
          title: "该功能暂未实现"
        });
      },
      async pwdLogin() {
        if (!this.username.length) {
          this.focusUsername = true;
          return uni.showToast({
            title: "请输入用户名",
            icon: "none"
          });
        }
        if (!this.password.length) {
          this.focusPassword = true;
          return uni.showToast({
            title: "请输入密码",
            icon: "none"
          });
        }
        try {
          uni.showToast({
            title: "登录中...",
            icon: "none",
            duration: 1e3
          });
          const data2 = {
            password: this.password,
            [/^1\d{10}$/.test(this.username) ? "mobile" : /@/.test(this.username) ? "email" : "username"]: this.username
          };
          const e = await uniIdCo$a.login(data2);
          this.loginSuccess(e);
          uni.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500
          });
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/index/index"
            });
          }, 1500);
        } catch (e) {
          this.handleLoginError(e);
        }
      },
      toRegister() {
        uni.navigateTo({
          url: this.config.isAdmin ? "/uni_modules/uni-id-pages/pages/register/register-admin" : "/uni_modules/uni-id-pages/pages/register/register",
          fail(e) {
            formatAppLog("error", "at uni_modules/uni-id-pages/pages/login/login-withpwd.vue:181", e);
          }
        });
      },
      handleLoginError(error) {
        formatAppLog("error", "at uni_modules/uni-id-pages/pages/login/login-withpwd.vue:186", "登录错误:", error);
        let message = "登录失败，请重试";
        if (error.errCode === "uni-id-account-not-exists") {
          message = "账号不存在";
        } else if (error.errCode === "uni-id-password-error") {
          message = "密码错误";
        } else if (error.message) {
          message = error.message;
        }
        uni.showToast({
          title: message,
          icon: "none"
        });
      }
    }
  };
  function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createElementVNode("view", { class: "login-bg" }),
      vue.createElementVNode("view", { class: "login-content" }, [
        vue.createElementVNode("view", { class: "login-logo" }, [
          vue.createElementVNode("image", {
            src: _imports_0$5,
            mode: "widthFix",
            class: "logo-image"
          })
        ]),
        vue.createElementVNode("view", { class: "form-container" }, [
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "input-box username-input",
              placeholder: "请输入用户名",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
              onFocus: _cache[1] || (_cache[1] = ($event) => $data.focusUsername = true),
              onBlur: _cache[2] || (_cache[2] = ($event) => $data.focusUsername = false),
              focus: $data.focusUsername
            }, null, 40, ["focus"]), [
              [vue.vModelText, $data.username]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "input-box password-input",
              type: "password",
              placeholder: "请输入密码",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.password = $event),
              onFocus: _cache[4] || (_cache[4] = ($event) => $data.focusPassword = true),
              onBlur: _cache[5] || (_cache[5] = ($event) => $data.focusPassword = false),
              focus: $data.focusPassword
            }, null, 40, ["focus"]), [
              [vue.vModelText, $data.password]
            ])
          ])
        ]),
        vue.createElementVNode("button", {
          class: "login-button",
          type: "primary",
          onClick: _cache[6] || (_cache[6] = (...args) => $options.pwdLogin && $options.pwdLogin(...args))
        }, "登录"),
        vue.createElementVNode("view", { class: "link-container" }, [
          !$data.config.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("text", {
              class: "link-text retrieve-pwd",
              onClick: _cache[7] || (_cache[7] = (...args) => $options.toRetrievePwd && $options.toRetrievePwd(...args))
            }, "忘记密码")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "text",
            {
              class: "link-text register",
              onClick: _cache[8] || (_cache[8] = (...args) => $options.toRegister && $options.toRegister(...args))
            },
            vue.toDisplayString($data.config.isAdmin ? "注册管理员账号" : "注册账号"),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const UniModulesUniIdPagesPagesLoginLoginWithpwd = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$10], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/login/login-withpwd.vue"]]);
  const _imports_1$5 = "/static/search.png";
  const _imports_2$5 = "/static/camera.png";
  const _imports_2$4 = "/static/refresh-loading.gif";
  const _sfc_main$10 = {
    data() {
      return {
        currentTab: 0,
        searchPlaceholder: "请输入商品信息",
        categories: [],
        allGoods: [],
        currentTabData: [],
        placeholderProducts: [],
        specialItems: [
          {
            image: "/static/clock.png",
            text: "限时秒杀",
            url: "https://www.jd.com/"
          },
          {
            image: "/static/recharge.png",
            text: "话费充值",
            url: "https://pro.jd.com/mall/active/4NgfTXqfdYhvRcmET8SMGCrRztHU/index.html?babelChannel=ttt12&innerAnchor=100119111653"
          },
          {
            image: "/static/turntable.png",
            text: "数码国补",
            url: "https://pro.jd.com/mall/active/h7bbR7sFxP6thFYwDqxNWjAbh8K/index.html?babelChannel=ttt111"
          },
          {
            image: "/static/sale.png",
            text: "秒杀",
            url: "https://pro.jd.com/mall/active/2hZ8idqu6mj9ZGR1LbPsd3MrW2i2/index.html?babelChannel=ttt3&innerAnchor=10136238481040"
          },
          {
            image: "/static/money.png",
            text: "便宜包邮",
            url: "https://pro.jd.com/mall/active/3J13cRc4KPMNqXPVuVFY9aDKsBJy/index.html?babelChannel=ttt1"
          }
        ],
        sections: [
          {
            title: "百亿补贴",
            image: "/static/subsidy.png",
            url: "/pages/subsidy/subsidy"
          },
          {
            title: "多多买菜",
            image: "/static/vegetables.png",
            url: "/pages/buy-vegetables/buy-vegetables"
          }
        ],
        pageNumber: 1,
        pageSize: 100,
        scrollHeight: "calc(100vh - 240rpx)",
        isRefreshing: false,
        cacheKey: "homePageData",
        cacheExpiration: 5 * 60 * 1e6,
        // 5分钟
        userInfoChecked: false,
        userInfoComplete: false,
        // 新增：标记用户信息是否完整
        isDataLoaded: false
        // 新增：标记数据是否已加载
      };
    },
    async onLoad() {
      uni.getSystemInfo({
        success: (res) => {
          this.scrollHeight = `calc(100vh - ${res.statusBarHeight}px - 240rpx)`;
        }
      });
      await this.checkUserInfoSync();
      await this.getInitialData();
    },
    onShow() {
      if (this.userInfoChecked && !this.userInfoComplete) {
        this.checkUserInfo(true);
      }
    },
    methods: {
      // 新增：同步检查用户信息的方法
      async checkUserInfoSync() {
        formatAppLog("log", "at pages/index/index.vue:165", "开始同步检查用户信息");
        if (!store.hasLogin) {
          formatAppLog("log", "at pages/index/index.vue:169", "用户未登录，跳过信息检查");
          this.userInfoChecked = true;
          return;
        }
        let attempts = 0;
        const maxAttempts = 20;
        const waitTime = 2e3;
        while (!store.userInfo && attempts < maxAttempts) {
          formatAppLog("log", "at pages/index/index.vue:180", `等待用户信息加载，尝试 ${attempts + 1}/${maxAttempts}`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          attempts++;
        }
        this.userInfoChecked = true;
        if (!store.userInfo) {
          formatAppLog("log", "at pages/index/index.vue:189", "用户信息加载超时或不存在");
          this.userInfoComplete = false;
          return;
        }
        formatAppLog("log", "at pages/index/index.vue:194", "检查用户信息:", store.userInfo);
        const hasMobile = !!store.userInfo.mobile && store.userInfo.mobile.trim() !== "";
        const hasAddress = !!store.userInfo.address && store.userInfo.address.trim() !== "";
        formatAppLog("log", "at pages/index/index.vue:199", "用户信息检查结果:", {
          hasMobile,
          hasAddress
        });
        this.userInfoComplete = hasMobile && hasAddress;
        if (!this.userInfoComplete) {
          formatAppLog("log", "at pages/index/index.vue:207", "用户信息不完整，需要补充");
          uni.showToast({
            title: "请完善手机与收货地址",
            icon: "none",
            duration: 2e3
          });
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/user/set"
            });
          }, 2e3);
        } else {
          formatAppLog("log", "at pages/index/index.vue:221", "用户信息已完整");
        }
      },
      // 保留原有方法，但主要用于onShow时的检查
      checkUserInfo(silent = false) {
        if (!store.hasLogin) {
          formatAppLog("log", "at pages/index/index.vue:229", "用户未登录，跳过信息检查");
          return;
        }
        const userInfo = store.userInfo;
        if (!userInfo) {
          formatAppLog("log", "at pages/index/index.vue:235", "用户信息不存在，跳过信息检查");
          return;
        }
        formatAppLog("log", "at pages/index/index.vue:239", "检查用户信息:", JSON.stringify(userInfo));
        const hasMobile = !!userInfo.mobile && userInfo.mobile.trim() !== "";
        const hasAddress = !!userInfo.address && userInfo.address.trim() !== "";
        formatAppLog("log", "at pages/index/index.vue:244", "用户信息检查结果:", {
          hasMobile,
          hasAddress
        });
        this.userInfoComplete = hasMobile && hasAddress;
        if (this.userInfoComplete) {
          formatAppLog("log", "at pages/index/index.vue:252", "用户信息已完整");
          return true;
        } else {
          formatAppLog("log", "at pages/index/index.vue:255", "用户信息不完整，需要补充");
          if (!silent) {
            uni.showToast({
              title: "请完善手机与收货地址",
              icon: "none",
              duration: 2e3
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/user/set"
              });
            }, 2e3);
          }
          return false;
        }
      },
      async getInitialData() {
        try {
          const cachedData = this.getCachedData();
          if (cachedData) {
            this.setPageData(cachedData);
          } else {
            await this.fetchAndCacheData();
          }
          this.switchTab(0);
          this.isDataLoaded = true;
        } catch (err2) {
          formatAppLog("error", "at pages/index/index.vue:286", "初始化数据失败:", err2);
          this.isDataLoaded = false;
          throw err2;
        }
      },
      getCachedData() {
        const cachedData = uni.getStorageSync(this.cacheKey);
        if (cachedData && Date.now() - cachedData.timestamp < this.cacheExpiration) {
          return cachedData.data;
        }
        return null;
      },
      async fetchAndCacheData() {
        try {
          const {
            result
          } = await nr.callFunction({
            name: "getHomePageData",
            data: {
              pageNumber: this.pageNumber,
              pageSize: this.pageSize
            }
          });
          if (result.success) {
            this.setPageData(result.data);
            this.cacheData(result.data);
          } else {
            throw new Error(result.error);
          }
        } catch (err2) {
          formatAppLog("error", "at pages/index/index.vue:317", "获取数据失败:", err2);
          throw err2;
        }
      },
      setPageData(data2) {
        this.categories = data2.categories || [];
        this.allGoods = data2.goods || [];
        if (this.allGoods.length > 0) {
          this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
        }
      },
      cacheData(data2) {
        uni.setStorageSync(this.cacheKey, {
          timestamp: Date.now(),
          data: data2
        });
      },
      switchTab(index) {
        this.currentTab = index;
        const currentCategory = this.categories[index];
        if (!currentCategory)
          return;
        if (index === 0) {
          const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
          this.currentTabData = shuffledGoods.slice(0, this.pageSize);
          this.placeholderProducts = shuffledGoods.slice(this.pageSize - 80, this.pageSize + 5);
        } else {
          this.currentTabData = this.allGoods.filter((item) => parseInt(item.category_id) === parseInt(
            currentCategory.sort
          ));
        }
      },
      navigateToSearch() {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      },
      navigateToPage(url) {
        try {
          if (false)
            ;
          else {
            uni.navigateTo({
              url: `/pages/webview/webview?url=${encodeURIComponent(url)}`
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/index/index.vue:366", "跳转失败:", error);
        }
      },
      navigateToSection(index) {
        const section = this.sections[index];
        if (section) {
          uni.navigateTo({
            url: section.url
          });
        }
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            formatAppLog("log", "at pages/index/index.vue:384", "商品信息存储成功", item);
          }
        });
        uni.navigateTo({
          url: "../search/mall-details"
        });
      },
      onRefresh() {
        formatAppLog("log", "at pages/index/index.vue:393", "正在刷新...");
        this.isRefreshing = true;
        this.fetchAndCacheData().then(() => {
          this.switchTab(this.currentTab);
          this.isRefreshing = false;
        }).catch((error) => {
          formatAppLog("error", "at pages/index/index.vue:399", "刷新失败:", error);
          this.isRefreshing = false;
        });
      }
    }
  };
  function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" Fixed head section remains unchanged "),
      vue.createElementVNode("view", { class: "fixed-head" }, [
        vue.createElementVNode("view", { class: "search-container" }, [
          vue.createElementVNode("view", {
            class: "search-box",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.navigateToSearch && $options.navigateToSearch(...args))
          }, [
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_1$5,
              mode: "aspectFit"
            }),
            vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              placeholder: $data.searchPlaceholder
            }, null, 8, ["placeholder"]),
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_2$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "tab-container" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.categories, (tab, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: vue.normalizeClass(["tab-item", { active: $data.currentTab === index }]),
                onClick: ($event) => $options.switchTab(index)
              }, vue.toDisplayString(tab.name), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "scroll-container",
        style: vue.normalizeStyle({ height: $data.scrollHeight }),
        onRefresherrefresh: _cache[1] || (_cache[1] = (...args) => $options.onRefresh && $options.onRefresh(...args)),
        "refresher-enabled": "true",
        "refresher-threshold": 100,
        "refresher-default-style": "none",
        "refresher-triggered": $data.isRefreshing,
        "refresher-background": "transparent"
      }, [
        vue.createCommentVNode(" 在这里添加你的刷新动画 "),
        $data.isRefreshing ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "refresh-container"
        }, [
          vue.createElementVNode("image", {
            class: "refresh-icon",
            src: _imports_2$4,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "refresh-text" }, "正在刷新...")
        ])) : vue.createCommentVNode("v-if", true),
        $data.currentTab === 0 ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createElementVNode("view", { class: "section-new" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.specialItems, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: "common-item",
                    onClick: ($event) => $options.navigateToPage(item.url)
                  }, [
                    vue.createElementVNode("image", {
                      class: "section-image",
                      src: item.image,
                      mode: "aspectFit",
                      "lazy-load": true
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "section-text" },
                      vue.toDisplayString(item.text),
                      1
                      /* TEXT */
                    )
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.sections, (sectionData, sectionIndex) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: sectionIndex,
                  class: "section",
                  onClick: ($event) => $options.navigateToSection(sectionIndex)
                }, [
                  vue.createElementVNode("view", { class: "common-item" }, [
                    vue.createElementVNode("image", {
                      class: "section-image",
                      src: sectionData.image,
                      mode: "aspectFit",
                      "lazy-load": true
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "section-text-new" },
                      vue.toDisplayString(sectionData.title),
                      1
                      /* TEXT */
                    )
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.placeholderProducts.slice(sectionIndex * 4, (sectionIndex + 1) * 4), (product, productIndex) => {
                      var _a;
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: productIndex,
                        class: "common-item"
                      }, [
                        vue.createElementVNode("image", {
                          class: "section-image",
                          src: (_a = product.goods_thumb) == null ? void 0 : _a.fileID,
                          mode: "aspectFit",
                          "lazy-load": true
                        }, null, 8, ["src"]),
                        vue.createElementVNode(
                          "text",
                          {
                            class: "price",
                            style: { "color": "red" }
                          },
                          "¥" + vue.toDisplayString(product.price),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "content" }, [
          $data.currentTab !== null ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tab-content"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.currentTabData, (item, index) => {
                var _a;
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "content-item",
                  onClick: ($event) => $options.navigateToProduct(item)
                }, [
                  vue.createElementVNode("view", { class: "product-card" }, [
                    vue.createElementVNode("image", {
                      class: "item-image",
                      src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                      mode: "aspectFit",
                      "lazy-load": true
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "item-title" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "service-tags" }, [
                        vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                        vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                      ]),
                      vue.createElementVNode("view", { class: "price-row" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "price" },
                          "¥" + vue.toDisplayString(item.price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "sales" },
                          "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "loading"
          }, "加载中..."))
        ])
      ], 44, ["refresher-triggered"])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$$], ["__scopeId", "data-v-1cf27b2a"], ["__file", "G:/mobile application development/pdd/pages/index/index.vue"]]);
  const { passwordStrength } = config;
  const passwordRules = {
    // 密码必须为6-14位数字、字母和特殊符号的组合
    medium: /^(?![\u4e00-\u9fa5]+)[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{6,14}$/
  };
  const ERROR = {
    normal: {
      noPwd: "请输入密码",
      noRePwd: "再次输入密码",
      rePwdErr: "两次输入密码不一致"
    },
    passwordStrengthError: {
      medium: "密码必须为6-14位数字、字母和特殊符号的组合，不能包含中文"
    }
  };
  function validPwd(password) {
    if (passwordStrength && passwordRules[passwordStrength]) {
      if (!new RegExp(passwordRules[passwordStrength]).test(password)) {
        return ERROR.passwordStrengthError[passwordStrength];
      }
    }
    return true;
  }
  function getPwdRules(pwdName = "password", rePwdName = "password2") {
    const rules2 = {};
    rules2[pwdName] = {
      rules: [
        {
          required: true,
          errorMessage: ERROR.normal.noPwd
        },
        {
          validateFunction: function(rule, value, data2, callback) {
            const checkRes = validPwd(value);
            if (checkRes !== true) {
              callback(checkRes);
            }
            return true;
          }
        }
      ]
    };
    if (rePwdName) {
      rules2[rePwdName] = {
        rules: [
          {
            required: true,
            errorMessage: ERROR.normal.noRePwd
          },
          {
            validateFunction: function(rule, value, data2, callback) {
              if (value != data2[pwdName]) {
                callback(ERROR.normal.rePwdErr);
              }
              return true;
            }
          }
        ]
      };
    }
    return rules2;
  }
  const passwordMod = {
    ERROR,
    validPwd,
    getPwdRules
  };
  const rules = {
    "username": {
      "rules": [
        {
          required: true,
          errorMessage: "请输入用户名"
        },
        {
          minLength: 2,
          maxLength: 14,
          errorMessage: "用户名长度在 {minLength} 到 {maxLength} 个字符"
        },
        {
          validateFunction: function(rule, value, data2, callback) {
            if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
              callback("用户名不能包含中文");
            }
            return true;
          }
        }
      ],
      "label": "用户名"
    },
    "password": {
      "rules": [
        {
          required: true,
          errorMessage: "请输入密码"
        },
        {
          minLength: 6,
          maxLength: 20,
          errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符"
        },
        {
          validateFunction: function(rule, value, data2, callback) {
            if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
              callback("密码不能包含中文");
            }
            return true;
          }
        }
      ],
      "label": "密码"
    },
    "password2": {
      "rules": [
        {
          required: true,
          errorMessage: "请再次输入密码"
        },
        {
          minLength: 6,
          maxLength: 20,
          errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符"
        },
        {
          validateFunction: function(rule, value, data2, callback) {
            if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)) {
              callback("密码不能包含中文");
            }
            if (value !== data2.password) {
              callback("两次输入的密码不一致");
            }
            return true;
          }
        }
      ],
      "label": "确认密码"
    }
  };
  const uniIdCo$9 = nr.importObject("uni-id-co");
  const _sfc_main$$ = {
    mixins: [mixin],
    data() {
      return {
        formData: {
          username: "",
          password: "",
          password2: ""
        },
        rules,
        focusUsername: false,
        focusPassword: false,
        focusPassword2: false,
        logo: "/static/logo.png"
      };
    },
    onShow() {
    },
    methods: {
      submit() {
        if (!this.formData.username) {
          this.focusUsername = true;
          return uni.showToast({
            title: "请输入用户名",
            icon: "none"
          });
        }
        if (!this.formData.password) {
          this.focusPassword = true;
          return uni.showToast({
            title: "请输入密码",
            icon: "none"
          });
        }
        if (this.formData.password.length < 6) {
          this.focusPassword = true;
          return uni.showToast({
            title: "密码长度不能少于6位",
            icon: "none"
          });
        }
        if (!this.formData.password2) {
          this.focusPassword2 = true;
          return uni.showToast({
            title: "请再次输入密码",
            icon: "none"
          });
        }
        if (this.formData.password !== this.formData.password2) {
          this.focusPassword2 = true;
          return uni.showToast({
            title: "两次输入的密码不一致",
            icon: "none"
          });
        }
        this.submitForm();
      },
      submitForm() {
        uniIdCo$9.registerUser(this.formData).then((e) => {
          this.loginSuccess(e);
          uni.showToast({
            title: "注册成功",
            icon: "success",
            duration: 2e3
          });
          uni.setStorageSync("temp_username", this.formData.username);
          uni.setStorageSync("temp_password", this.formData.password);
          setTimeout(() => {
            uni.redirectTo({
              url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
            });
          }, 2e3);
        }).catch((e) => {
          formatAppLog("error", "at uni_modules/uni-id-pages/pages/register/register.vue:147", "注册失败：", e);
          let errorMessage = "注册失败，请重试";
          if (e.msg) {
            errorMessage = e.msg;
          }
          uni.showToast({
            title: errorMessage,
            icon: "none",
            duration: 3e3
          });
        });
      },
      navigateBack() {
        uni.navigateBack();
      },
      toLogin() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      },
      registerByEmail() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/register/register-by-email"
        });
      }
    }
  };
  function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createElementVNode("view", { class: "login-bg" }),
      vue.createElementVNode("view", { class: "login-content" }, [
        vue.createElementVNode("view", { class: "login-logo" }, [
          vue.createElementVNode("image", {
            src: _imports_0$5,
            mode: "widthFix",
            class: "logo-image"
          })
        ]),
        vue.createElementVNode("view", { class: "form-container" }, [
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "input-box username-input",
              placeholder: "请输入用户名",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.username = $event),
              onFocus: _cache[1] || (_cache[1] = ($event) => $data.focusUsername = true),
              onBlur: _cache[2] || (_cache[2] = ($event) => $data.focusUsername = false),
              focus: $data.focusUsername
            }, null, 40, ["focus"]), [
              [vue.vModelText, $data.formData.username]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "input-box password-input",
              maxlength: "20",
              placeholder: "请输入6-20位密码",
              type: "password",
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.password = $event),
              onFocus: _cache[4] || (_cache[4] = ($event) => $data.focusPassword = true),
              onBlur: _cache[5] || (_cache[5] = ($event) => $data.focusPassword = false),
              focus: $data.focusPassword
            }, null, 40, ["focus"]), [
              [vue.vModelText, $data.formData.password]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "input-box password-input",
              maxlength: "20",
              placeholder: "再次输入密码",
              type: "password",
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.password2 = $event),
              onFocus: _cache[7] || (_cache[7] = ($event) => $data.focusPassword2 = true),
              onBlur: _cache[8] || (_cache[8] = ($event) => $data.focusPassword2 = false),
              focus: $data.focusPassword2
            }, null, 40, ["focus"]), [
              [vue.vModelText, $data.formData.password2]
            ])
          ]),
          vue.createElementVNode("button", {
            class: "login-button",
            type: "primary",
            onClick: _cache[9] || (_cache[9] = (...args) => $options.submit && $options.submit(...args))
          }, "注册"),
          vue.createElementVNode("button", {
            class: "register-back",
            onClick: _cache[10] || (_cache[10] = (...args) => $options.navigateBack && $options.navigateBack(...args))
          }, "返回")
        ])
      ])
    ]);
  }
  const UniModulesUniIdPagesPagesRegisterRegister = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$_], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/register/register.vue"]]);
  const popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages2,
        locale
      ];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en$2 = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans$2 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant$2 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages$2 = {
    en: en$2,
    "zh-Hans": zhHans$2,
    "zh-Hant": zhHant$2
  };
  const {
    t: t$2
  } = initVueI18n(messages$2);
  const _sfc_main$_ = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close", "update:modelValue", "input"],
    props: {
      inputType: {
        type: String,
        default: "text"
      },
      showClose: {
        type: Boolean,
        default: true
      },
      modelValue: {
        type: [Number, String],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      },
      maxlength: {
        type: Number,
        default: -1
      },
      focus: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogType: "error",
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t$2("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t$2("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t$2("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t$2("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        setVal(val);
      },
      modelValue(val) {
        setVal(val);
      },
      val(val) {
        this.$emit("update:modelValue", val);
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
        this.val = this.modelValue;
      } else {
        this.dialogType = this.type;
      }
    },
    methods: {
      /**
       * 给val属性赋值
       */
      setVal(val) {
        if (this.maxlength != -1 && this.mode === "input") {
          this.val = val.slice(0, this.maxlength);
        } else {
          this.val = val;
        }
      },
      /**
       * 点击确认按钮
       */
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      /**
       * 点击取消按钮
       */
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
          },
          vue.toDisplayString($options.titleText),
          3
          /* TEXT, CLASS */
        )
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-content-text" },
            vue.toDisplayString($props.content),
            1
            /* TEXT */
          )
        ], true)
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "uni-dialog-input",
            maxlength: $props.maxlength,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
            type: $props.inputType,
            placeholder: $options.placeholderText,
            focus: $props.focus
          }, null, 8, ["maxlength", "type", "placeholder", "focus"]), [
            [vue.vModelDynamic, $data.val]
          ])
        ], true)
      ])),
      vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
        $props.showClose ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-dialog-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text" },
            vue.toDisplayString($options.closeText),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-dialog-button", $props.showClose ? "uni-border-left" : ""]),
            onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
          },
          [
            vue.createElementVNode(
              "text",
              { class: "uni-dialog-button-text uni-button-color" },
              vue.toDisplayString($options.okText),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )
      ])
    ]);
  }
  const __easycom_3$5 = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$Z], ["__scopeId", "data-v-d78c88b7"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config2 = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config2
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config: config2
        } = obj;
        this._animateRun(styles, config2).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config2 = {}) {
      this.animation.step(config2);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$Z = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config2 = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config2);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run(() => {
              this.transform = "";
              this.opacity = opacity || 1;
            });
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$Y], ["__file", "G:/mobile application development/pdd/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$Y = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:310", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          this.showPoptrans();
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      showPoptrans() {
        this.$nextTick(() => {
          this.showPopup = true;
          this.showTrans = true;
        });
      }
    }
  };
  function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$9);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$X], ["__scopeId", "data-v-4dd3c44b"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  let retryFun = () => formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements.vue:34", "为定义");
  const _sfc_main$X = {
    name: "uni-agreements",
    computed: {
      agreements() {
        if (!config.agreements) {
          return [];
        }
        let { serviceUrl, privacyUrl } = config.agreements;
        return [
          {
            url: serviceUrl,
            title: "用户服务协议"
          },
          {
            url: privacyUrl,
            title: "隐私政策条款"
          }
        ];
      }
    },
    props: {
      scope: {
        type: String,
        default() {
          return "register";
        }
      }
    },
    methods: {
      popupConfirm() {
        this.isAgree = true;
        retryFun();
      },
      popup(Fun) {
        this.needPopupAgreements = true;
        this.$nextTick(() => {
          if (Fun) {
            retryFun = Fun;
          }
          this.$refs.popupAgreement.open();
        });
      },
      navigateTo({
        url,
        title
      }) {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/common/webview/webview?url=" + url + "&title=" + title,
          success: (res) => {
          },
          fail: () => {
          },
          complete: () => {
          }
        });
      },
      hasAnd(agreements, index) {
        return agreements.length - 1 > index;
      },
      setAgree(e) {
        this.isAgree = !this.isAgree;
        this.$emit("setAgree", this.isAgree);
      }
    },
    created() {
      var _a;
      this.needAgreements = (((_a = config == null ? void 0 : config.agreements) == null ? void 0 : _a.scope) || []).includes(this.scope);
    },
    data() {
      return {
        isAgree: false,
        needAgreements: true,
        needPopupAgreements: false
      };
    }
  };
  function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_3$5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$8);
    return $options.agreements.length ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "root"
    }, [
      $data.needAgreements ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createElementVNode(
            "checkbox-group",
            {
              onChange: _cache[0] || (_cache[0] = (...args) => $options.setAgree && $options.setAgree(...args))
            },
            [
              vue.createElementVNode("label", { class: "checkbox-box" }, [
                vue.createElementVNode("checkbox", {
                  checked: $data.isAgree,
                  style: { "transform": "scale(0.5)", "margin-right": "-6px" }
                }, null, 8, ["checked"]),
                vue.createElementVNode("text", { class: "text" }, "同意")
              ])
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createElementVNode("view", { class: "content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($options.agreements, (agreement, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  key: index
                }, [
                  vue.createElementVNode("text", {
                    class: "agreement text",
                    onClick: ($event) => $options.navigateTo(agreement)
                  }, vue.toDisplayString(agreement.title), 9, ["onClick"]),
                  $options.hasAnd($options.agreements, index) ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "text and",
                    space: "nbsp"
                  }, " 和 ")) : vue.createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 弹出式 "),
      $data.needAgreements || $data.needPopupAgreements ? (vue.openBlock(), vue.createBlock(
        _component_uni_popup,
        {
          key: 1,
          ref: "popupAgreement",
          type: "center"
        },
        {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_popup_dialog, {
              confirmText: "同意",
              onConfirm: $options.popupConfirm
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "content" }, [
                  vue.createElementVNode("text", { class: "text" }, "请先阅读并同意"),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($options.agreements, (agreement, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "item",
                        key: index
                      }, [
                        vue.createElementVNode("text", {
                          class: "agreement text",
                          onClick: ($event) => $options.navigateTo(agreement)
                        }, vue.toDisplayString(agreement.title), 9, ["onClick"]),
                        $options.hasAnd($options.agreements, index) ? (vue.openBlock(), vue.createElementBlock("text", {
                          key: 0,
                          class: "text and",
                          space: "nbsp"
                        }, " 和 ")) : vue.createCommentVNode("v-if", true)
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["onConfirm"])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )) : vue.createCommentVNode("v-if", true)
    ])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_5$2 = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$W], ["__scopeId", "data-v-40b82fe9"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/uni-id-pages-agreements/uni-id-pages-agreements.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$W = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$V], ["__scopeId", "data-v-d31e1c47"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$V = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change",
      "keyboardheightchange"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      modelValue(newVal) {
        if (newVal === null) {
          this.val = "";
          return;
        }
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = "";
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$U], ["__scopeId", "data-v-09fd5285"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$U = {
    computed: {
      agreements() {
        if (!config.agreements) {
          return [];
        }
        let {
          serviceUrl,
          privacyUrl
        } = config.agreements;
        return [
          {
            url: serviceUrl,
            title: "用户服务协议"
          },
          {
            url: privacyUrl,
            title: "隐私政策条款"
          }
        ];
      },
      agree: {
        get() {
          return this.getParentComponent().agree;
        },
        set(agree) {
          return this.getParentComponent().agree = agree;
        }
      }
    },
    data() {
      return {
        servicesList: [
          {
            "id": "username",
            "text": "账号登录",
            "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/user.png",
            "path": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
          },
          {
            "id": "smsCode",
            "text": "短信验证码",
            "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/sms.png",
            "path": "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode"
          },
          {
            "id": "weixin",
            "text": "微信登录",
            "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/weixin.png"
          },
          {
            "id": "huawei",
            "text": "华为登录",
            "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/huawei.png",
            "path": "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=huawei"
          },
          {
            "id": "huaweiMobile",
            "text": "华为账号一键登录",
            "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/huawei.png",
            "path": "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=huaweiMobile"
          },
          {
            "id": "apple",
            "text": "苹果登录",
            "logo": "/uni_modules/uni-id-pages/static/uni-fab-login/apple.png"
          },
          {
            "id": "univerify",
            "text": "一键登录",
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/univerify.png"
          },
          {
            "id": "taobao",
            "text": "淘宝登录",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/taobao.png"
          },
          {
            "id": "facebook",
            "text": "脸书登录",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/facebook.png"
          },
          {
            "id": "alipay",
            "text": "支付宝登录",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/alipay.png"
          },
          {
            "id": "qq",
            "text": "QQ登录",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/qq.png"
          },
          {
            "id": "google",
            "text": "谷歌登录",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/google.png"
          },
          {
            "id": "douyin",
            "text": "抖音登录",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/douyin.png"
          },
          {
            "id": "sinaweibo",
            "text": "新浪微博",
            //暂未提供该登录方式的接口示例
            "logo": "/uni_modules/uni-id-pages/static/app/uni-fab-login/sinaweibo.png"
          }
        ],
        univerifyStyle: {
          //一键登录弹出窗的样式配置参数
          "fullScreen": true,
          // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
          "backgroundColor": "#ffffff",
          // 授权页面背景颜色，默认值：#ffffff
          "buttons": {
            // 自定义登录按钮
            "iconWidth": "45px",
            // 图标宽度（高度等比例缩放） 默认值：45px
            "list": []
          },
          "privacyTerms": {
            "defaultCheckBoxState": false,
            // 条款勾选框初始状态 默认值： true
            "textColor": "#BBBBBB",
            // 文字颜色 默认值：#BBBBBB
            "termsColor": "#5496E3",
            //  协议文字颜色 默认值： #5496E3
            "prefix": "我已阅读并同意",
            // 条款前的文案 默认值：“我已阅读并同意”
            "suffix": "并使用本机号码登录",
            // 条款后的文案 默认值：“并使用本机号码登录”
            "privacyItems": []
          }
        }
      };
    },
    watch: {
      agree(agree) {
        this.univerifyStyle.privacyTerms.defaultCheckBoxState = agree;
      }
    },
    async created() {
      let servicesList = this.servicesList;
      let loginTypes = config.loginTypes;
      servicesList = servicesList.filter((item) => {
        if (item.id == "apple" && uni.getSystemInfoSync().osName != "ios") {
          return false;
        }
        return loginTypes.includes(item.id);
      });
      if (loginTypes.includes("univerify")) {
        this.univerifyStyle.privacyTerms.privacyItems = this.agreements;
        servicesList.forEach(({
          id,
          logo,
          path
        }) => {
          if (id != "univerify") {
            this.univerifyStyle.buttons.list.push({
              "iconPath": logo,
              "provider": id,
              path
              //路径用于点击快捷按钮时判断是跳转页面
            });
          }
        });
      }
      this.servicesList = servicesList.filter((item) => {
        let path = item.path ? item.path.split("?")[0] : "";
        return path != this.getRoute(1);
      });
    },
    methods: {
      getParentComponent() {
        return this.$parent;
      },
      setUserInfo(e) {
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:207", "setUserInfo", e);
      },
      getRoute(n2 = 0) {
        let pages2 = getCurrentPages();
        if (n2 > pages2.length) {
          return "";
        }
        return "/" + pages2[pages2.length - n2].route;
      },
      toPage(path, index = 0) {
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:217", "比较", this.getRoute(1), this.getRoute(2), path);
        if (this.getRoute(1) == path.split("?")[0] && this.getRoute(1) == "/uni_modules/uni-id-pages/pages/login/login-withoutpwd") {
          let loginType = path.split("?")[1].split("=")[1];
          uni.$emit("uni-id-pages-setLoginType", loginType);
        } else if (this.getRoute(2) == path) {
          uni.navigateBack();
        } else if (this.getRoute(1) != path) {
          if (index === 0) {
            uni.navigateTo({
              url: path,
              animationType: "slide-in-left",
              complete(e) {
              }
            });
          } else {
            uni.redirectTo({
              url: path,
              animationType: "slide-in-left",
              complete(e) {
              }
            });
          }
        } else {
          formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:244", "出乎意料的情况,path：" + path);
        }
      },
      async login_before(type, navigateBack = true, options = {}) {
        var _a;
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:248", type, options);
        if ([
          "qq",
          "xiaomi",
          "sinaweibo",
          "taobao",
          "facebook",
          "google",
          "alipay",
          "douyin"
        ].includes(type)) {
          return uni.showToast({
            title: "该登录方式暂未实现，欢迎提交pr",
            icon: "none",
            duration: 3e3
          });
        }
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:266", "检查当前环境是否支持这种登录方式");
        let isAppExist = true;
        await new Promise((callback) => {
          formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:271", "uni.getProvider", uni.getProvider);
          uni.getProvider({
            service: "oauth",
            success: (res) => {
              const provider = res.providers.find((item) => item.id === type);
              formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:276", "res", res);
              if (provider) {
                isAppExist = (provider == null ? void 0 : provider.isAppExist) ?? true;
                callback();
              } else {
                return uni.showToast({
                  title: "当前设备不支持此登录，请选择其他登录方式",
                  icon: "none",
                  duration: 3e3
                });
              }
            },
            fail: () => {
              throw new Error("获取服务供应商失败：" + JSON.stringify(err));
            }
          });
        });
        if (!isAppExist) {
          return uni.showToast({
            title: "当前设备不支持此登录，请选择其他登录方式",
            icon: "none",
            duration: 3e3
          });
        }
        let needAgreements = (((_a = config == null ? void 0 : config.agreements) == null ? void 0 : _a.scope) || []).includes("register");
        if (type != "univerify" && needAgreements && !this.agree) {
          let agreementsRef = this.getParentComponent().$refs.agreements;
          return agreementsRef.popup(() => {
            this.login_before(type, navigateBack, options);
          });
        }
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:360", "login ----");
        uni.showLoading({
          mask: true
        });
        if (type == "univerify") {
          let closeUniverify = function() {
            uni.hideLoading();
            univerifyManager.close();
            univerifyManager.offButtonsClick(onButtonsClickFn);
          };
          let univerifyManager = uni.getUniverifyManager();
          let clickAnotherButtons = false;
          let onButtonsClickFn = async (res) => {
            formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:372", "点击了第三方登录，provider：", res, res.provider, this.univerifyStyle.buttons.list);
            clickAnotherButtons = true;
            let checkBoxState = await uni.getCheckBoxState();
            this.agree = checkBoxState.state;
            let {
              path
            } = this.univerifyStyle.buttons.list[res.index];
            if (path) {
              if (this.getRoute(1).includes("login-withoutpwd") && path.includes("login-withoutpwd")) {
                this.getParentComponent().showCurrentWebview();
              }
              this.toPage(path, 1);
              closeUniverify();
            } else {
              if (this.agree) {
                closeUniverify();
                setTimeout(() => {
                  this.login_before(res.provider);
                }, 500);
              } else {
                uni.showToast({
                  title: "你未同意隐私政策协议",
                  icon: "none",
                  duration: 3e3
                });
              }
            }
          };
          univerifyManager.onButtonsClick(onButtonsClickFn);
          return univerifyManager.login({
            "univerifyStyle": this.univerifyStyle,
            success: (res) => {
              this.login(res.authResult, "univerify");
            },
            fail(err2) {
              formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:422", err2);
              if (!clickAnotherButtons) {
                uni.navigateBack();
              }
            },
            complete: async (e) => {
              uni.hideLoading();
              univerifyManager.offButtonsClick(onButtonsClickFn);
            }
          });
        }
        if (type === "weixinMobile" || type === "huaweiMobile") {
          return this.login({
            phoneCode: options.phoneNumberCode
          }, type);
        }
        uni.login({
          "provider": type,
          "onlyAuthorize": true,
          "univerifyStyle": this.univerifyStyle,
          success: async (e) => {
            if (type == "apple") {
              let res = await this.getUserInfo({
                provider: "apple"
              });
              Object.assign(e.authResult, res.userInfo);
              uni.hideLoading();
            }
            this.login(["huawei", "weixin"].includes(type) ? {
              code: e.code
            } : e.authResult, type);
          },
          fail: async (err2) => {
            formatAppLog("error", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:468", JSON.stringify(err2));
            uni.showModal({
              content: `登录失败; code: ${err2.errCode || -1}`,
              confirmText: "知道了",
              showCancel: false
            });
            uni.hideLoading();
          }
        });
      },
      login(params, type) {
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue:480", { params, type });
        let action = "loginBy" + type.trim().replace(type[0], type[0].toUpperCase());
        const uniIdCo2 = nr.importObject("uni-id-co", {
          customUI: true
        });
        uniIdCo2[action](params).then((result) => {
          uni.showToast({
            title: "登录成功",
            icon: "none",
            duration: 2e3
          });
          mutations.loginSuccess(result);
        }).catch((e) => {
          uni.showModal({
            content: e.message,
            confirmText: "知道了",
            showCancel: false
          });
        }).finally((e) => {
          if (type == "univerify") {
            uni.closeAuthView();
          }
          uni.hideLoading();
        });
      },
      async getUserInfo(e) {
        return new Promise((resolve, reject) => {
          uni.getUserInfo({
            ...e,
            success: (res) => {
              resolve(res);
            },
            fail: (err2) => {
              uni.showModal({
                content: JSON.stringify(err2),
                showCancel: false
              });
              reject(err2);
            }
          });
        });
      }
    }
  };
  function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "fab-login-box" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.servicesList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              key: index,
              onClick: ($event) => item.path ? $options.toPage(item.path) : $options.login_before(item.id, false)
            }, [
              vue.createElementVNode("image", {
                class: "logo",
                src: item.logo,
                mode: "scaleToFill"
              }, null, 8, ["src"]),
              vue.createElementVNode(
                "text",
                { class: "login-title" },
                vue.toDisplayString(item.text),
                1
                /* TEXT */
              )
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$T], ["__scopeId", "data-v-c5c7cfa0"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue"]]);
  let currentWebview;
  const _sfc_main$T = {
    mixins: [mixin],
    data() {
      return {
        type: "",
        //快捷登录方式
        phone: "",
        //手机号码
        focusPhone: false,
        logo: ""
      };
    },
    computed: {
      async loginTypes() {
        return config.loginTypes;
      },
      isPhone() {
        return /^1\d{10}$/.test(this.phone);
      },
      imgSrc() {
        const images = {
          weixin: "/uni_modules/uni-id-pages/static/login/weixin.png",
          apple: "/uni_modules/uni-id-pages/static/app/apple.png",
          huawei: "/uni_modules/uni-id-pages/static/login/huawei.png",
          huaweiMobile: "/uni_modules/uni-id-pages/static/login/huawei-mobile.png"
        };
        return images[this.type];
      }
    },
    async onLoad(e) {
      let type = e.type || config.loginTypes[0];
      this.type = type;
      if (type != "univerify") {
        this.focusPhone = true;
      }
      this.$nextTick(() => {
        if (["weixin", "apple", "huawei", "huaweiMobile"].includes(type)) {
          this.$refs.uniFabLogin.servicesList = this.$refs.uniFabLogin.servicesList.filter((item) => item.id != type);
        }
      });
      uni.$on("uni-id-pages-setLoginType", (type2) => {
        this.type = type2;
      });
    },
    onShow() {
    },
    onUnload() {
      uni.$off("uni-id-pages-setLoginType");
    },
    onReady() {
      if (config.loginTypes.includes("univerify") && this.type == "univerify") {
        uni.preLogin({
          provider: "univerify",
          success: () => {
            const pages2 = getCurrentPages();
            currentWebview = pages2[pages2.length - 1].$getAppWebview();
            currentWebview.setStyle({
              "top": "2000px"
              // 隐藏当前页面窗体
            });
            this.$refs.uniFabLogin.login_before("univerify");
          },
          fail: (err2) => {
            formatAppLog("log", "at uni_modules/uni-id-pages/pages/login/login-withoutpwd.vue:123", err2);
            if (config.loginTypes.length > 1) {
              this.$refs.uniFabLogin.login_before(config.loginTypes[1]);
            } else {
              uni.showModal({
                content: err2.message,
                showCancel: false
              });
            }
          }
        });
      }
    },
    methods: {
      showCurrentWebview() {
        currentWebview.setStyle({
          "top": 0
        });
      },
      showAgreementModal() {
        this.$refs.agreements.popup();
      },
      quickLogin(e) {
        var _a, _b;
        let options = {};
        formatAppLog("log", "at uni_modules/uni-id-pages/pages/login/login-withoutpwd.vue:149", e);
        if ((_a = e.detail) == null ? void 0 : _a.code) {
          options.phoneNumberCode = e.detail.code;
        }
        if ((this.type === "weixinMobile" || this.type === "huaweiMobile") && !((_b = e.detail) == null ? void 0 : _b.code))
          return;
        this.$refs.uniFabLogin.login_before(this.type, true, options);
      },
      toSmsPage() {
        if (!this.isPhone) {
          this.focusPhone = true;
          return uni.showToast({
            title: "手机号码格式不正确",
            icon: "none",
            duration: 3e3
          });
        }
        if (this.needAgreements && !this.agree) {
          return this.$refs.agreements.popup(this.toSmsPage);
        }
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=" + this.phone
        });
      },
      //去密码登录页
      toPwdLogin() {
        uni.navigateTo({
          url: "../login/password"
        });
      },
      chooseArea() {
        uni.showToast({
          title: "暂不支持其他国家",
          icon: "none",
          duration: 3e3
        });
      }
    }
  };
  function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_id_pages_agreements = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-agreements"), __easycom_5$2);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_id_pages_fab_login = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-fab-login"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createElementVNode("view", { class: "login-logo" }, [
        vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
      ]),
      vue.createCommentVNode(" 顶部文字 "),
      vue.createElementVNode("text", { class: "title" }, "请选择登录方式"),
      vue.createCommentVNode(" 快捷登录框 当url带参数时有效 "),
      ["apple", "weixin", "weixinMobile", "huawei", "huaweiMobile"].includes($data.type) ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          vue.createElementVNode("text", { class: "tip" }, "将根据第三方账号服务平台的授权范围获取你的信息"),
          vue.createElementVNode("view", { class: "quickLogin" }, [
            $data.type !== "weixinMobile" && $data.type !== "huaweiMobile" ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = (...args) => $options.quickLogin && $options.quickLogin(...args)),
              src: $options.imgSrc,
              mode: "widthFix",
              class: "quickLoginBtn"
            }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              style: { "position": "relative" }
            }, [
              $data.type === "weixinMobile" ? (vue.openBlock(), vue.createElementBlock(
                "button",
                {
                  key: 0,
                  type: "primary",
                  "open-type": "getPhoneNumber",
                  onGetphonenumber: _cache[1] || (_cache[1] = (...args) => $options.quickLogin && $options.quickLogin(...args)),
                  class: "uni-btn"
                },
                "微信授权手机号登录",
                32
                /* NEED_HYDRATION */
              )) : vue.createCommentVNode("v-if", true),
              $data.type === "huaweiMobile" ? (vue.openBlock(), vue.createElementBlock(
                "button",
                {
                  key: 1,
                  "open-type": "getPhoneNumber",
                  onGetphonenumber: _cache[2] || (_cache[2] = (...args) => $options.quickLogin && $options.quickLogin(...args)),
                  class: "quickLoginBtn",
                  style: { "padding": "0", "display": "flex" }
                },
                [
                  vue.createElementVNode("image", {
                    src: $options.imgSrc,
                    mode: "widthFix"
                  }, null, 8, ["src"])
                ],
                32
                /* NEED_HYDRATION */
              )) : vue.createCommentVNode("v-if", true),
              this.needAgreements && !this.agree ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "mobile-login-agreement-layer",
                onClick: _cache[3] || (_cache[3] = (...args) => $options.showAgreementModal && $options.showAgreementModal(...args))
              })) : vue.createCommentVNode("v-if", true)
            ])),
            vue.createVNode(
              _component_uni_id_pages_agreements,
              {
                scope: "register",
                ref: "agreements"
              },
              null,
              512
              /* NEED_PATCH */
            )
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createElementVNode("text", { class: "tip" }, "未注册的账号验证通过后将自动注册"),
          vue.createElementVNode("view", { class: "phone-box" }, [
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = (...args) => $options.chooseArea && $options.chooseArea(...args)),
              class: "area"
            }, "+86"),
            vue.createVNode(_component_uni_easyinput, {
              trim: "both",
              focus: $data.focusPhone,
              onBlur: _cache[5] || (_cache[5] = ($event) => $data.focusPhone = false),
              class: "input-box",
              type: "number",
              inputBorder: false,
              modelValue: $data.phone,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.phone = $event),
              maxlength: "11",
              placeholder: "请输入手机号"
            }, null, 8, ["focus", "modelValue"])
          ]),
          vue.createVNode(
            _component_uni_id_pages_agreements,
            {
              scope: "register",
              ref: "agreements"
            },
            null,
            512
            /* NEED_PATCH */
          ),
          vue.createElementVNode("button", {
            class: "uni-btn",
            type: "primary",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.toSmsPage && $options.toSmsPage(...args))
          }, "获取验证码")
        ],
        64
        /* STABLE_FRAGMENT */
      )),
      vue.createCommentVNode(" 固定定位的快捷登录按钮 "),
      vue.createVNode(
        _component_uni_id_pages_fab_login,
        { ref: "uniFabLogin" },
        null,
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const UniModulesUniIdPagesPagesLoginLoginWithoutpwd = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$S], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/login/login-withoutpwd.vue"]]);
  const _sfc_main$S = {
    props: {
      modelValue: String,
      value: String,
      scene: {
        type: String,
        default() {
          return "";
        }
      },
      focus: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      val: {
        get() {
          return this.value || this.modelValue;
        },
        set(value) {
          this.$emit("update:modelValue", value);
        }
      }
    },
    data() {
      return {
        focusCaptchaInput: false,
        captchaBase64: "",
        loging: false
      };
    },
    watch: {
      scene: {
        handler(scene) {
          if (scene) {
            this.getImageCaptcha(this.focus);
          } else {
            uni.showToast({
              title: "scene不能为空",
              icon: "none"
            });
          }
        },
        immediate: true
      }
    },
    methods: {
      getImageCaptcha(focus = true) {
        this.loging = true;
        if (focus) {
          this.val = "";
          this.focusCaptchaInput = true;
        }
        const uniIdCo2 = nr.importObject("uni-captcha-co", {
          customUI: true
        });
        uniIdCo2.getImageCaptcha({
          scene: this.scene
        }).then((result) => {
          this.captchaBase64 = result.captchaBase64;
        }).catch((e) => {
          uni.showToast({
            title: e.message,
            icon: "none"
          });
        }).finally((e) => {
          this.loging = false;
        });
      }
    }
  };
  function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "captcha-box" }, [
      vue.createElementVNode("view", { class: "captcha-img-box" }, [
        $data.loging ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
          key: 0,
          class: "loding",
          size: "20px",
          color: "#BBB",
          type: "spinner-cycle"
        })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("image", {
          class: vue.normalizeClass(["captcha-img", { opacity: $data.loging }]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.getImageCaptcha && $options.getImageCaptcha(...args)),
          src: $data.captchaBase64,
          mode: "widthFix"
        }, null, 10, ["src"])
      ]),
      vue.withDirectives(vue.createElementVNode("input", {
        onBlur: _cache[1] || (_cache[1] = ($event) => $data.focusCaptchaInput = false),
        focus: $data.focusCaptchaInput,
        type: "text",
        class: "captcha",
        inputBorder: false,
        maxlength: "4",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.val = $event),
        placeholder: "请输入验证码"
      }, null, 40, ["focus"]), [
        [vue.vModelText, $options.val]
      ])
    ]);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$R], ["__scopeId", "data-v-a00179ae"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-captcha/components/uni-captcha/uni-captcha.vue"]]);
  function debounce$1(func, wait) {
    let timer;
    wait = wait || 500;
    return function() {
      let context = this;
      let args = arguments;
      if (timer)
        clearTimeout(timer);
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow)
        func.apply(context, args);
    };
  }
  const _sfc_main$R = {
    name: "uni-sms-form",
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    props: {
      event: ["update:modelValue"],
      /**
       * 倒计时时长 s
       */
      count: {
        type: [String, Number],
        default: 60
      },
      /**
       * 手机号码
       */
      phone: {
        type: [String, Number],
        default: ""
      },
      /*
      	验证码类型，用于防止不同功能的验证码混用，目前支持的类型login登录、register注册、bind绑定手机、unbind解绑手机
      */
      type: {
        type: String,
        default() {
          return "login";
        }
      },
      /*
      	验证码输入框是否默认获取焦点
      */
      focusCaptchaInput: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        captcha: "",
        reverseNumber: 0,
        reverseTimer: null,
        modelValue: "",
        focusSmsCodeInput: false
      };
    },
    watch: {
      captcha(value, oldValue) {
        if (value.length == 4 && oldValue.length != 4) {
          this.start();
        }
      },
      modelValue(value) {
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      }
    },
    computed: {
      innerText() {
        if (this.reverseNumber == 0)
          return "获取短信验证码";
        return "重新发送(" + this.reverseNumber + "s)";
      }
    },
    created() {
      this.initClick();
    },
    methods: {
      getImageCaptcha(focus) {
        this.$refs.captcha.getImageCaptcha(focus);
      },
      initClick() {
        this.start = debounce$1(() => {
          if (this.reverseNumber != 0)
            return;
          this.sendMsg();
        });
      },
      sendMsg() {
        if (this.captcha.length != 4) {
          this.$refs.captcha.focusCaptchaInput = true;
          return uni.showToast({
            title: "请先输入图形验证码",
            icon: "none",
            duration: 3e3
          });
        }
        let reg_phone = /^1\d{10}$/;
        if (!reg_phone.test(this.phone))
          return uni.showToast({
            title: "手机号格式错误",
            icon: "none",
            duration: 3e3
          });
        const uniIdCo2 = nr.importObject("uni-id-co", {
          customUI: true
        });
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-sms-form/uni-id-pages-sms-form.vue:139", "sendSmsCode", {
          "mobile": this.phone,
          "scene": this.type,
          "captcha": this.captcha
        });
        uniIdCo2.sendSmsCode({
          "mobile": this.phone,
          "scene": this.type,
          "captcha": this.captcha
        }).then((result) => {
          uni.showToast({
            title: "短信验证码发送成功",
            icon: "none",
            duration: 3e3
          });
          this.reverseNumber = Number(this.count);
          this.getCode();
        }).catch((e) => {
          if (e.code == "uni-id-invalid-sms-template-id") {
            this.modelValue = "123456";
            uni.showToast({
              title: "已启动测试模式,详情【控制台信息】",
              icon: "none",
              duration: 3e3
            });
            formatAppLog("warn", "at uni_modules/uni-id-pages/components/uni-id-pages-sms-form/uni-id-pages-sms-form.vue:164", e.message);
          } else {
            this.getImageCaptcha();
            this.captcha = "";
            uni.showToast({
              title: e.message,
              icon: "none",
              duration: 3e3
            });
          }
        });
      },
      getCode() {
        if (this.reverseNumber == 0) {
          clearTimeout(this.reverseTimer);
          this.reverseTimer = null;
          return;
        }
        this.reverseNumber--;
        this.reverseTimer = setTimeout(() => {
          this.getCode();
        }, 1e3);
      }
    }
  };
  function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-captcha"), __easycom_0$5);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_uni_captcha, {
        focus: $props.focusCaptchaInput,
        ref: "captcha",
        scene: "send-sms-code",
        modelValue: $data.captcha,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.captcha = $event)
      }, null, 8, ["focus", "modelValue"]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createVNode(_component_uni_easyinput, {
          focus: $data.focusSmsCodeInput,
          onBlur: _cache[1] || (_cache[1] = ($event) => $data.focusSmsCodeInput = false),
          type: "number",
          class: "input-box",
          inputBorder: false,
          modelValue: $data.modelValue,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.modelValue = $event),
          maxlength: "6",
          clearable: false,
          trim: "both",
          placeholder: "请输入短信验证码"
        }, null, 8, ["focus", "modelValue"]),
        vue.createElementVNode("view", {
          class: "short-code-btn",
          "hover-class": "hover",
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.start && _ctx.start(...args))
        }, [
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["inner-text", $data.reverseNumber == 0 ? "inner-text-active" : ""])
            },
            vue.toDisplayString($options.innerText),
            3
            /* TEXT, CLASS */
          )
        ])
      ])
    ]);
  }
  const __easycom_3$4 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$Q], ["__scopeId", "data-v-4b649130"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/uni-id-pages-sms-form/uni-id-pages-sms-form.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data2, allData) {
      var result = null;
      let rules2 = fieldValue.rules;
      let hasRequired = rules2.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules2 === void 0) {
        return message["default"];
      }
      for (var i2 = 0; i2 < rules2.length; i2++) {
        let rule = rules2[i2];
        let vt2 = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt2]) {
          result = RuleValidatorHelper[vt2](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data2, allData, vt2);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data2, allData, vt2) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data2, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt2);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt2);
      }
      return result;
    }
    _getMessage(rule, message, vt2) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt2] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i2 = 0; i2 < range.length; i2++) {
        const item = range[i2];
        if (types.object(item) && item.value !== void 0) {
          list[i2] = item.value;
        } else {
          list[i2] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i2 = 0; i2 < value.length; i2++) {
        const element = value[i2];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data2, allData) {
      let result = this._checkFieldInSchema(data2);
      if (!result) {
        result = await this.invokeValidate(data2, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data2, allData) {
      let result = this._checkFieldInSchema(data2);
      if (!result) {
        result = await this.invokeValidate(data2, true, allData);
      }
      return result;
    }
    async validateUpdate(data2, allData) {
      let result = this._checkFieldInSchema(data2);
      if (!result) {
        result = await this.invokeValidateUpdate(data2, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data2, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data2[key], data2, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data2, all, allData) {
      let result = [];
      for (let key in data2) {
        let errorMessage = await this.validateRule(key, this._schema[key], data2[key], data2, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data2) {
      var keys = Object.keys(data2);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules2) => {
    const isRuleNumType = rules2.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules2.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data2) => {
    return objGet(data2, field);
  };
  const realName = (name, data2 = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a2, b2) => a2 += `#${b2}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i2 in newData) {
      let path = name2arr(i2);
      objSet(formData, path, newData[i2]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v2) => isNumber(v2) ? Number(v2) : v2);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o2, k, i2, _2) => {
      if (i2 === _2.length - 1) {
        o2[k] = value;
        return null;
      } else if (k in o2) {
        return o2[k];
      } else {
        o2[k] = /^[0-9]{1,}$/.test(_2[i2 + 1]) ? [] : {};
        return o2[k];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o2, k) => {
      return (o2 || {})[k];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules2) => {
    let isNoField = false;
    for (let i2 = 0; i2 < rules2.length; i2++) {
      const ruleData = rules2[i2];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a2, b2) => {
    if (a2 === b2) {
      return a2 !== 0 || 1 / a2 === 1 / b2;
    }
    if (a2 == null || b2 == null) {
      return a2 === b2;
    }
    var classNameA = toString.call(a2), classNameB = toString.call(b2);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a2 === "" + b2;
      case "[object Number]":
        if (+a2 !== +a2) {
          return +b2 !== +b2;
        }
        return +a2 === 0 ? 1 / +a2 === 1 / b2 : +a2 === +b2;
      case "[object Date]":
      case "[object Boolean]":
        return +a2 === +b2;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a2), propsB = Object.getOwnPropertyNames(b2);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i2 = 0; i2 < propsA.length; i2++) {
        var propName = propsA[i2];
        if (a2[propName] !== b2[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a2.toString() == b2.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$Q = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i2 in this.$refs) {
              const vm = this.$refs[i2];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:187", "当前 uni-froms 组件缺少 ref 属性");
            if (formVm.model)
              formVm.model[name] = value;
            if (formVm.modelValue)
              formVm.modelValue[name] = value;
            if (formVm.value)
              formVm.value[name] = value;
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules2) {
        this.formRules = Object.assign({}, this.formRules, rules2);
        this.validator = new SchemaValidator(rules2);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type) {
        for (let i2 in this.dataValue) {
          const itemData = this.childrens.find((v2) => v2.name === i2);
          if (itemData) {
            if (this.formData[i2] === void 0) {
              this.formData[i2] = this._getValue(i2, this.dataValue[i2]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:296", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i2 in invalidFields) {
          const item = this.childrens.find((v2) => realName(v2.name) === i2);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i2 in childrens) {
          const child = childrens[i2];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v2) => {
            let vName = realName(v2);
            let value = getDataValue(v2, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_3$3 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$P], ["__scopeId", "data-v-9a1e3c32"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  const _sfc_main$P = {
    data() {
      return {
        focus: false
      };
    },
    props: {
      modelValue: String,
      value: String,
      scene: {
        type: String,
        default() {
          return "";
        }
      },
      title: {
        type: String,
        default() {
          return "";
        }
      }
    },
    computed: {
      val: {
        get() {
          return this.value || this.modelValue;
        },
        set(value) {
          this.$emit("update:modelValue", value);
        }
      }
    },
    methods: {
      open() {
        this.focus = true;
        this.val = "";
        this.$refs.popup.open();
      },
      close() {
        this.focus = false;
        this.$refs.popup.close();
      },
      confirm() {
        if (!this.val) {
          return uni.showToast({
            title: "请填写验证码",
            icon: "none"
          });
        }
        this.close();
        this.$emit("confirm");
      }
    }
  };
  function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-captcha"), __easycom_0$5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$8);
    return vue.openBlock(), vue.createBlock(
      _component_uni_popup,
      {
        ref: "popup",
        type: "center"
      },
      {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "popup-captcha" }, [
            vue.createElementVNode("view", { class: "content" }, [
              vue.createElementVNode(
                "text",
                { class: "title" },
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uni_captcha, {
                focus: $data.focus,
                scene: $props.scene,
                modelValue: $options.val,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.val = $event)
              }, null, 8, ["focus", "scene", "modelValue"])
            ]),
            vue.createElementVNode("view", { class: "button-box" }, [
              vue.createElementVNode("view", {
                onClick: _cache[1] || (_cache[1] = (...args) => $options.close && $options.close(...args)),
                class: "btn"
              }, "取消"),
              vue.createElementVNode("view", {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.confirm && $options.confirm(...args)),
                class: "btn confirm"
              }, "确认")
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const __easycom_5$1 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$O], ["__scopeId", "data-v-d021b99b"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-captcha/components/uni-popup-captcha/uni-popup-captcha.vue"]]);
  const _sfc_main$O = {
    mixins: [mixin],
    data() {
      return {
        "code": "",
        "phone": "",
        "captcha": "",
        "logo": "/static/logo.png"
      };
    },
    computed: {
      tipText() {
        return "验证码已通过短信发送至" + this.phone;
      }
    },
    onLoad({
      phoneNumber
    }) {
      this.phone = phoneNumber;
    },
    onShow() {
    },
    methods: {
      submit() {
        const uniIdCo2 = nr.importObject("uni-id-co", {
          errorOptions: {
            type: "toast"
          }
        });
        if (this.code.length != 6) {
          this.$refs.smsCode.focusSmsCodeInput = true;
          return uni.showToast({
            title: "验证码不能为空",
            icon: "none",
            duration: 3e3
          });
        }
        uniIdCo2.loginBySms({
          "mobile": this.phone,
          "code": this.code,
          "captcha": this.captcha
        }).then((e) => {
          this.loginSuccess(e);
        }).catch((e) => {
          if (e.errCode == "uni-id-captcha-required") {
            this.$refs.popup.open();
          } else {
            formatAppLog("log", "at uni_modules/uni-id-pages/pages/login/login-smscode.vue:75", e.errMsg);
          }
        }).finally((e) => {
          this.captcha = "";
        });
      }
    }
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_id_pages_sms_form = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-sms-form"), __easycom_3$4);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    const _component_uni_popup_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-popup-captcha"), __easycom_5$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createElementVNode("view", { class: "login-logo" }, [
        vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
      ]),
      vue.createCommentVNode(" 顶部文字 "),
      vue.createElementVNode("text", { class: "title" }, "请输入验证码"),
      vue.createElementVNode("text", { class: "tip" }, "先输入图形验证码，再获取短信验证码"),
      vue.createVNode(_component_uni_forms, null, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_id_pages_sms_form, {
            focusCaptchaInput: "",
            modelValue: $data.code,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.code = $event),
            type: "login-by-sms",
            ref: "smsCode",
            phone: $data.phone
          }, null, 8, ["modelValue", "phone"]),
          vue.createElementVNode("button", {
            class: "uni-btn send-btn",
            type: "primary",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.submit && $options.submit(...args))
          }, "登录")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_popup_captcha, {
        onConfirm: $options.submit,
        modelValue: $data.captcha,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.captcha = $event),
        scene: "login-by-sms",
        ref: "popup"
      }, null, 8, ["onConfirm", "modelValue"])
    ]);
  }
  const UniModulesUniIdPagesPagesLoginLoginSmscode = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$N], ["__scopeId", "data-v-661d78f6"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/login/login-smscode.vue"]]);
  const _sfc_main$N = {
    name: "cloud-image",
    emits: ["click"],
    props: {
      mode: {
        type: String,
        default() {
          return "widthFix";
        }
      },
      src: {
        // type:String,
        default() {
          return "";
        }
      },
      width: {
        type: String,
        default() {
          return "100rpx";
        }
      },
      height: {
        type: String,
        default() {
          return "100rpx";
        }
      }
    },
    watch: {
      src: {
        handler(src) {
          if (src && src.substring(0, 8) == "cloud://") {
            nr.getTempFileURL({
              fileList: [src]
            }).then((res) => {
              this.cSrc = res.fileList[0].tempFileURL;
            });
          } else {
            this.cSrc = src;
          }
        },
        immediate: true
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    },
    data() {
      return {
        cSrc: false
      };
    }
  };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args)),
        style: vue.normalizeStyle([{ width: $props.width, height: $props.height }, { "justify-content": "center" }])
      },
      [
        $data.cSrc ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          style: vue.normalizeStyle({ width: $props.width, height: $props.height }),
          src: $data.cSrc,
          mode: $props.mode
        }, null, 12, ["src", "mode"])) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$M], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/cloud-image/cloud-image.vue"]]);
  const _sfc_main$M = {
    data() {
      return {
        isPC: false
      };
    },
    props: {
      //头像图片宽
      width: {
        type: String,
        default() {
          return "50px";
        }
      },
      //头像图片高
      height: {
        type: String,
        default() {
          return "50px";
        }
      },
      border: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    async mounted() {
    },
    computed: {
      hasLogin() {
        return store.hasLogin;
      },
      userInfo() {
        return store.userInfo;
      },
      avatar_file() {
        return store.userInfo.avatar_file;
      }
    },
    methods: {
      setAvatarFile(avatar_file) {
        mutations.updateUserInfo({ avatar_file });
      },
      async bindchooseavatar(res) {
        let avatarUrl = res.detail.avatarUrl;
        let avatar_file = {
          extname: avatarUrl.split(".")[avatarUrl.split(".").length - 1],
          name: "",
          url: ""
        };
        let cloudPath = this.userInfo._id + "" + Date.now();
        avatar_file.name = cloudPath;
        try {
          uni.showLoading({
            title: "更新中",
            mask: true
          });
          let {
            fileID
          } = await nr.uploadFile({
            filePath: avatarUrl,
            cloudPath,
            fileType: "image"
          });
          avatar_file.url = fileID;
          uni.hideLoading();
        } catch (e) {
          formatAppLog("error", "at uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue:94", e);
        }
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue:96", "avatar_file", avatar_file);
        this.setAvatarFile(avatar_file);
      },
      uploadAvatarImg(res) {
        if (!this.hasLogin) {
          return uni.navigateTo({
            url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
          });
        }
        const crop = {
          quality: 100,
          width: 600,
          height: 600,
          resize: true
        };
        uni.chooseImage({
          count: 1,
          crop,
          success: async (res2) => {
            let tempFile = res2.tempFiles[0], avatar_file = {
              extname: tempFile.path.split(".")[tempFile.path.split(".").length - 1]
            }, filePath = res2.tempFilePaths[0];
            let cloudPath = this.userInfo._id + "" + Date.now();
            avatar_file.name = cloudPath;
            uni.showLoading({
              title: "更新中",
              mask: true
            });
            let {
              fileID
            } = await nr.uploadFile({
              filePath,
              cloudPath,
              fileType: "image"
            });
            avatar_file.url = fileID;
            uni.hideLoading();
            this.setAvatarFile(avatar_file);
          }
        });
      }
    }
  };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_cloud_image = resolveEasycom(vue.resolveDynamicComponent("cloud-image"), __easycom_0$4);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "button",
      {
        "open-type": "chooseAvatar",
        onChooseavatar: _cache[0] || (_cache[0] = (...args) => $options.bindchooseavatar && $options.bindchooseavatar(...args)),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.uploadAvatarImg && $options.uploadAvatarImg(...args)),
        class: vue.normalizeClass(["box", { "showBorder": $props.border }]),
        style: vue.normalizeStyle({ width: $props.width, height: $props.height, lineHeight: $props.height })
      },
      [
        $options.avatar_file ? (vue.openBlock(), vue.createBlock(_component_cloud_image, {
          key: 0,
          src: $options.avatar_file.url,
          width: $props.width,
          height: $props.height
        }, null, 8, ["src", "width", "height"])) : (vue.openBlock(), vue.createBlock(_component_uni_icons, {
          key: 1,
          style: vue.normalizeStyle({ width: $props.width, height: $props.height, lineHeight: $props.height }),
          class: "chooseAvatar",
          type: "plusempty",
          size: "30",
          color: "#dddddd"
        }, null, 8, ["style"]))
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$L], ["__scopeId", "data-v-a428f129"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue"]]);
  const _sfc_main$L = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w2 = this.width / 2, h2 = 10;
        if (this.isDot) {
          w2 = 5;
          h2 = 5;
        }
        const x = `${-w2 + this.offset[0]}px`;
        const y2 = `${-h2 + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y2
          },
          rightBottom: {
            right: x,
            bottom: y2
          },
          leftBottom: {
            left: x,
            bottom: y2
          },
          leftTop: {
            left: x,
            top: y2
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$K], ["__scopeId", "data-v-c97cb896"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$K = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (typeof padding == "number") {
            padding += "";
          }
          let paddingArr = padding.split(" ");
          if (paddingArr.length === 1) {
            const allPadding = paddingArr[0];
            this.padding = {
              "top": allPadding,
              "right": allPadding,
              "bottom": allPadding,
              "left": allPadding
            };
          } else if (paddingArr.length === 2) {
            const [verticalPadding, horizontalPadding] = paddingArr;
            this.padding = {
              "top": verticalPadding,
              "right": horizontalPadding,
              "bottom": verticalPadding,
              "left": horizontalPadding
            };
          } else if (paddingArr.length === 4) {
            const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
            this.padding = {
              "top": topPadding,
              "right": rightPadding,
              "bottom": bottomPadding,
              "left": leftPadding
            };
          }
        },
        immediate: true
      }
    },
    // inject: ['list'],
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        }
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e) {
        this.$emit("switchChange", e.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err2) => {
            this.$emit("click", {
              data: err2
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: vue.normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
          style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
        },
        [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("view", { class: "uni-list-item__header" }, [
              $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-list-item__icon"
              }, [
                vue.createElementVNode("image", {
                  src: $props.thumb,
                  class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
                }, null, 10, ["src"])
              ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-list-item__icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  customPrefix: $props.extraIcon.customPrefix,
                  color: $props.extraIcon.color,
                  size: $props.extraIcon.size,
                  type: $props.extraIcon.type
                }, null, 8, ["customPrefix", "color", "size", "type"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], true),
          vue.renderSlot(_ctx.$slots, "body", {}, () => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
              },
              [
                $props.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
                  },
                  vue.toDisplayString($props.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true),
                $props.note ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "uni-list-item__content-note"
                  },
                  vue.toDisplayString($props.note),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], true),
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
              },
              [
                $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-list-item__extra-text"
                  },
                  vue.toDisplayString($props.rightText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
                  key: 1,
                  type: $props.badgeType,
                  text: $props.badgeText,
                  "custom-style": $props.badgeStyle
                }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
                $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 2,
                  disabled: $props.disabled,
                  checked: $props.switchChecked,
                  onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
                }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["__scopeId", "data-v-c7524739"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$J = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      stackFromEnd: {
        type: Boolean,
        default: false
      },
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      renderReverse: {
        type: Boolean,
        default: false
      }
    },
    // provide() {
    // 	return {
    // 		list: this
    // 	};
    // },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e) {
        this.$emit("scrolltolower");
      },
      scroll(e) {
        this.$emit("scroll", e);
      }
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["__scopeId", "data-v-c2f1266a"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  const db$2 = nr.database();
  db$2.collection("uni-id-users");
  const uniIdCo$8 = nr.importObject("uni-id-co");
  const _sfc_main$I = {
    emits: ["success"],
    computed: {},
    data() {
      return {};
    },
    methods: {
      async beforeGetphonenumber() {
        return await new Promise((resolve, reject) => {
          uni.showLoading({ mask: true });
          wx.checkSession({
            success() {
              resolve();
              uni.hideLoading();
            },
            fail() {
              wx.login({
                success({
                  code
                }) {
                  nr.importObject("uni-id-co", {
                    customUI: true
                  }).loginByWeixin({ code }).then((e) => {
                    resolve();
                  }).catch((e) => {
                    formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue:46", e);
                    reject();
                  }).finally((e) => {
                    uni.hideLoading();
                  });
                },
                fail: (err2) => {
                  formatAppLog("error", "at uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue:53", err2);
                  reject();
                }
              });
            }
          });
        });
      },
      async bindMobileByMpWeixin(e) {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          await this.beforeGetphonenumber();
          uniIdCo$8.bindMobileByMpWeixin(e.detail).then((e2) => {
            this.$emit("success");
          }).finally((e2) => {
            this.closeMe();
          });
        } else {
          this.closeMe();
        }
      },
      async open() {
        this.$refs.popup.open();
      },
      closeMe(e) {
        this.$refs.popup.close();
      }
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$8);
    return vue.openBlock(), vue.createBlock(
      _component_uni_popup,
      {
        ref: "popup",
        type: "bottom"
      },
      {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "box" }, [
            vue.createElementVNode("text", { class: "headBox" }, "绑定资料"),
            vue.createElementVNode("text", { class: "tip" }, "将一键获取你的手机号码绑定你的个人资料"),
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.createElementVNode("text", {
                onClick: _cache[0] || (_cache[0] = (...args) => $options.closeMe && $options.closeMe(...args)),
                class: "close"
              }, "关闭"),
              vue.createElementVNode(
                "button",
                {
                  class: "agree uni-btn",
                  type: "primary",
                  "open-type": "getPhoneNumber",
                  onGetphonenumber: _cache[1] || (_cache[1] = (...args) => $options.bindMobileByMpWeixin && $options.bindMobileByMpWeixin(...args))
                },
                "获取",
                32
                /* NEED_HYDRATION */
              )
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      },
      512
      /* NEED_PATCH */
    );
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["__scopeId", "data-v-e0127e04"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/uni-id-pages-bind-mobile/uni-id-pages-bind-mobile.vue"]]);
  const uniIdCo$7 = nr.importObject("uni-id-co");
  const _sfc_main$H = {
    computed: {
      userInfo() {
        return store.userInfo;
      },
      realNameStatus() {
        if (!this.userInfo.realNameAuth) {
          return 0;
        }
        return this.userInfo.realNameAuth.authStatus;
      }
    },
    data() {
      return {
        univerifyStyle: {
          authButton: {
            "title": "本机号码一键绑定"
            // 授权按钮文案
          },
          otherLoginButton: {
            "title": "其他号码绑定"
          }
        },
        // userInfo: {
        // 	mobile:'',
        // 	nickname:''
        // },
        hasPwd: false,
        showLoginManage: false,
        //通过页面传参隐藏登录&退出登录按钮
        setNicknameIng: false
      };
    },
    async onShow() {
      this.univerifyStyle.authButton.title = "本机号码一键绑定";
      this.univerifyStyle.otherLoginButton.title = "其他号码绑定";
    },
    async onLoad(e) {
      if (e.showLoginManage) {
        this.showLoginManage = true;
      }
      let res = await uniIdCo$7.getAccountInfo();
      this.hasPwd = res.isPasswordSet;
    },
    methods: {
      login() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd",
          complete: (e) => {
          }
        });
      },
      logout() {
        mutations.logout();
      },
      bindMobileSuccess() {
        mutations.updateUserInfo();
      },
      changePassword() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",
          complete: (e) => {
          }
        });
      },
      bindMobile() {
        uni.preLogin({
          provider: "univerify",
          success: this.univerify(),
          //预登录成功
          fail: (res) => {
            formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/userinfo.vue:119", res);
            this.bindMobileBySmsCode();
          }
        });
      },
      univerify() {
        uni.login({
          "provider": "univerify",
          "univerifyStyle": this.univerifyStyle,
          success: async (e) => {
            uniIdCo$7.bindMobileByUniverify(e.authResult).then((res) => {
              mutations.updateUserInfo();
            }).catch((e2) => {
              formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/userinfo.vue:142", e2);
            }).finally((e2) => {
              uni.closeAuthView();
            });
          },
          fail: (err2) => {
            formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/userinfo.vue:149", err2);
            if (err2.code == "30002" || err2.code == "30001") {
              this.bindMobileBySmsCode();
            }
          }
        });
      },
      bindMobileBySmsCode() {
        uni.navigateTo({
          url: "./bind-mobile/bind-mobile"
        });
      },
      setNickname(nickname) {
        if (nickname) {
          mutations.updateUserInfo({
            nickname
          });
          this.setNicknameIng = false;
          this.$refs.dialog.close();
        } else {
          this.$refs.dialog.open();
        }
      },
      deactivate() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
        });
      },
      async bindThirdAccount(provider) {
        const uniIdCo2 = nr.importObject("uni-id-co");
        const bindField = {
          weixin: "wx_openid",
          alipay: "ali_openid",
          apple: "apple_openid",
          qq: "qq_openid"
        }[provider.toLowerCase()];
        if (this.userInfo[bindField]) {
          await uniIdCo2["unbind" + provider]();
          await mutations.updateUserInfo();
        } else {
          uni.login({
            provider: provider.toLowerCase(),
            onlyAuthorize: true,
            success: async (e) => {
              const res = await uniIdCo2["bind" + provider]({
                code: e.code
              });
              if (res.errCode) {
                uni.showToast({
                  title: res.errMsg || "绑定失败",
                  duration: 3e3
                });
              }
              await mutations.updateUserInfo();
            },
            fail: async (err2) => {
              formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/userinfo.vue:206", err2);
              uni.hideLoading();
            }
          });
        }
      },
      realNameVerify() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"
        });
      }
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_id_pages_avatar = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-avatar"), __easycom_0$3);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$2);
    const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_3$5);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$8);
    const _component_uni_id_pages_bind_mobile = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-bind-mobile"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createElementVNode("view", { class: "avatar" }, [
        vue.createVNode(_component_uni_id_pages_avatar, {
          width: "260rpx",
          height: "260rpx"
        })
      ]),
      vue.createVNode(_component_uni_list, null, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_list_item, {
            class: "item",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.setNickname("")),
            title: "昵称",
            rightText: $options.userInfo.nickname || "未设置",
            link: ""
          }, null, 8, ["rightText"]),
          vue.createVNode(_component_uni_list_item, {
            class: "item",
            onClick: $options.bindMobile,
            title: "手机号",
            rightText: $options.userInfo.mobile || "未绑定",
            link: ""
          }, null, 8, ["onClick", "rightText"]),
          $options.userInfo.email ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, {
            key: 0,
            class: "item",
            title: "电子邮箱",
            rightText: $options.userInfo.email
          }, null, 8, ["rightText"])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 如未开通实人认证服务，可以将实名认证入口注释 "),
          vue.createVNode(_component_uni_list_item, {
            class: "item",
            onClick: $options.realNameVerify,
            title: "实名认证",
            rightText: $options.realNameStatus !== 2 ? "未认证" : "已认证",
            link: ""
          }, null, 8, ["onClick", "rightText"]),
          $data.hasPwd ? (vue.openBlock(), vue.createBlock(_component_uni_list_item, {
            key: 1,
            class: "item",
            onClick: $options.changePassword,
            title: "修改密码",
            link: ""
          }, null, 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_list, { class: "mt10" }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_list_item, {
            onClick: $options.deactivate,
            title: "注销账号",
            link: "navigateTo"
          }, null, 8, ["onClick"])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "dialog",
          type: "dialog"
        },
        {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_popup_dialog, {
              mode: "input",
              value: $options.userInfo.nickname,
              onConfirm: $options.setNickname,
              inputType: $data.setNicknameIng ? "nickname" : "text",
              title: "设置昵称",
              placeholder: "请输入要设置的昵称"
            }, null, 8, ["value", "onConfirm", "inputType"])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createVNode(_component_uni_id_pages_bind_mobile, {
        ref: "bind-mobile-by-sms",
        onSuccess: $options.bindMobileSuccess
      }, null, 8, ["onSuccess"]),
      $data.showLoginManage ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 0 },
        [
          $options.userInfo._id ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            onClick: _cache[1] || (_cache[1] = (...args) => $options.logout && $options.logout(...args))
          }, "退出登录")) : (vue.openBlock(), vue.createElementBlock("button", {
            key: 1,
            onClick: _cache[2] || (_cache[2] = (...args) => $options.login && $options.login(...args))
          }, "去登录"))
        ],
        64
        /* STABLE_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoUserinfo = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["__scopeId", "data-v-0be2f605"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/userinfo.vue"]]);
  let mediaQueryObserver;
  const _sfc_main$G = {
    name: "UniMatchMedia",
    props: {
      width: {
        type: [Number, String],
        default: ""
      },
      minWidth: {
        type: [Number, String],
        default: ""
      },
      maxWidth: {
        type: [Number, String],
        default: ""
      },
      height: {
        type: [Number, String],
        default: ""
      },
      minHeight: {
        type: [Number, String],
        default: ""
      },
      maxHeight: {
        type: [Number, String],
        default: ""
      },
      orientation: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        matches: true
      };
    },
    mounted() {
      let parent = this.$parent;
      while (parent.$parent) {
        parent = parent.$parent;
      }
      mediaQueryObserver = uni.createMediaQueryObserver(parent);
      mediaQueryObserver.observe({
        width: this.width,
        maxWidth: this.maxWidth,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        orientation: this.orientation
      }, (matches) => {
        this.matches = matches;
      });
    },
    destroyed() {
      mediaQueryObserver.disconnect();
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock(
      "view",
      null,
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      512
      /* NEED_PATCH */
    )), [
      [vue.vShow, $data.matches]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["__scopeId", "data-v-ba84726b"], ["__file", "D:/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/uni-match-media/uni-match-media.vue"]]);
  const _sfc_main$F = {
    data() {
      return {
        formData: {
          mobile: "",
          code: "",
          captcha: ""
        },
        focusMobile: true,
        logo: "/static/logo.png"
      };
    },
    computed: {
      tipText() {
        return `验证码已通过短信发送至 ${this.formData.mobile}。密码为6 - 20位`;
      }
    },
    onLoad(event) {
    },
    onReady() {
    },
    methods: {
      /**
       * 完成并提交
       */
      submit() {
        if (!/^1\d{10}$/.test(this.formData.mobile)) {
          this.focusMobile = true;
          return uni.showToast({
            title: "手机号码格式不正确",
            icon: "none",
            duration: 3e3
          });
        }
        if (!/^\d{6}$/.test(this.formData.code)) {
          this.$refs.smsForm.focusSmsCodeInput = true;
          return uni.showToast({
            title: "验证码格式不正确",
            icon: "none",
            duration: 3e3
          });
        }
        const uniIdCo2 = nr.importObject("uni-id-co");
        uniIdCo2.bindMobileBySms(this.formData).then((e) => {
          uni.showToast({
            title: e.errMsg,
            icon: "none",
            duration: 3e3
          });
          this.getOpenerEventChannel();
          mutations.setUserInfo(this.formData);
          uni.navigateBack();
        }).catch((e) => {
          formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.vue:84", e);
          if (e.errCode == "uni-id-captcha-required") {
            this.$refs.popup.open();
          }
        }).finally((e) => {
          this.formData.captcha = "";
        });
      }
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_id_pages_sms_form = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-sms-form"), __easycom_3$4);
    const _component_uni_popup_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-popup-captcha"), __easycom_5$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "绑定手机号")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createCommentVNode(" 登录框 (选择手机号所属国家和地区需要另行实现) "),
      vue.createVNode(_component_uni_easyinput, {
        clearable: "",
        focus: $data.focusMobile,
        onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusMobile = false),
        type: "number",
        class: "input-box",
        inputBorder: false,
        modelValue: $data.formData.mobile,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.mobile = $event),
        maxlength: "11",
        placeholder: "请输入手机号"
      }, null, 8, ["focus", "modelValue"]),
      vue.createVNode(_component_uni_id_pages_sms_form, {
        ref: "smsForm",
        type: "bind-mobile-by-sms",
        modelValue: $data.formData.code,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.code = $event),
        phone: $data.formData.mobile
      }, null, 8, ["modelValue", "phone"]),
      vue.createElementVNode("button", {
        class: "uni-btn send-btn-box",
        type: "primary",
        onClick: _cache[3] || (_cache[3] = (...args) => $options.submit && $options.submit(...args))
      }, "提交"),
      vue.createVNode(_component_uni_popup_captcha, {
        onConfirm: $options.submit,
        modelValue: $data.formData.captcha,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.captcha = $event),
        scene: "bind-mobile-by-sms",
        ref: "popup"
      }, null, 8, ["onConfirm", "modelValue"])
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoBindMobileBindMobile = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.vue"]]);
  function determineDirection(clipX, clipY, clipWidth, clipHeight, currentX, currentY) {
    let corner;
    const mainPoint = [clipX + clipWidth / 2, clipY + clipHeight / 2];
    const currentPoint = [currentX, currentY];
    if (currentPoint[0] <= mainPoint[0] && currentPoint[1] <= mainPoint[1]) {
      corner = 3;
    } else if (currentPoint[0] >= mainPoint[0] && currentPoint[1] <= mainPoint[1]) {
      corner = 2;
    } else if (currentPoint[0] <= mainPoint[0] && currentPoint[1] >= mainPoint[1]) {
      corner = 4;
    } else if (currentPoint[0] >= mainPoint[0] && currentPoint[1] >= mainPoint[1]) {
      corner = 1;
    }
    return corner;
  }
  function calcImageOffset(data2, scale) {
    let left = data2.imageLeft;
    let top = data2.imageTop;
    scale = scale || data2.scale;
    let imageWidth = data2.imageWidth;
    let imageHeight = data2.imageHeight;
    if (data2.angle / 90 % 2) {
      imageWidth = data2.imageHeight;
      imageHeight = data2.imageWidth;
    }
    const {
      clipX,
      clipWidth,
      clipY,
      clipHeight
    } = data2;
    const currentImageSize = (size) => size * scale / 2;
    const currentImageWidth = currentImageSize(imageWidth);
    const currentImageHeight = currentImageSize(imageHeight);
    left = clipX + currentImageWidth >= left ? left : clipX + currentImageWidth;
    left = clipX + clipWidth - currentImageWidth <= left ? left : clipX + clipWidth - currentImageWidth;
    top = clipY + currentImageHeight >= top ? top : clipY + currentImageHeight;
    top = clipY + clipHeight - currentImageHeight <= top ? top : clipY + clipHeight - currentImageHeight;
    return {
      left,
      top,
      scale
    };
  }
  function calcImageScale(data2, scale) {
    scale = scale || data2.scale;
    let {
      imageWidth,
      imageHeight,
      clipWidth,
      clipHeight,
      angle
    } = data2;
    if (angle / 90 % 2) {
      imageWidth = imageHeight;
      imageHeight = imageWidth;
    }
    if (imageWidth * scale < clipWidth) {
      scale = clipWidth / imageWidth;
    }
    if (imageHeight * scale < clipHeight) {
      scale = Math.max(scale, clipHeight / imageHeight);
    }
    return scale;
  }
  function calcImageSize(width, height, data2) {
    let imageWidth = width, imageHeight = height;
    let {
      clipWidth,
      clipHeight,
      sysinfo,
      width: originWidth,
      height: originHeight
    } = data2;
    if (imageWidth && imageHeight) {
      if (imageWidth / imageHeight > (clipWidth || originWidth) / (clipWidth || originHeight)) {
        imageHeight = clipHeight || originHeight;
        imageWidth = width / height * imageHeight;
      } else {
        imageWidth = clipWidth || originWidth;
        imageHeight = height / width * imageWidth;
      }
    } else {
      let sys = sysinfo || uni.getSystemInfoSync();
      imageWidth = sys.windowWidth;
      imageHeight = 0;
    }
    return {
      imageWidth,
      imageHeight
    };
  }
  function calcPythagoreanTheorem(width, height) {
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  }
  function clipTouchMoveOfCalculate(data2, event) {
    const clientX = event.touches[0].clientX;
    const clientY = event.touches[0].clientY;
    let {
      clipWidth,
      clipHeight,
      clipY: oldClipY,
      clipX: oldClipX,
      clipStart,
      isLockRatio,
      maxWidth,
      minWidth,
      maxHeight,
      minHeight
    } = data2;
    maxWidth = maxWidth / 2;
    minWidth = minWidth / 2;
    minHeight = minHeight / 2;
    maxHeight = maxHeight / 2;
    let width = clipWidth, height = clipHeight, clipY = oldClipY, clipX = oldClipX, sizecorrect = () => {
      width = width <= maxWidth ? width >= minWidth ? width : minWidth : maxWidth;
      height = height <= maxHeight ? height >= minHeight ? height : minHeight : maxHeight;
    }, sizeinspect = () => {
      sizecorrect();
      if ((width > maxWidth || width < minWidth || height > maxHeight || height < minHeight) && isLockRatio) {
        return false;
      } else {
        return true;
      }
    };
    height = clipStart.height + (clipStart.corner > 1 && clipStart.corner < 4 ? 1 : -1) * (clipStart.y - clientY);
    switch (clipStart.corner) {
      case 1:
        width = clipStart.width - clipStart.x + clientX;
        if (isLockRatio) {
          height = width / (clipWidth / clipHeight);
        }
        if (!sizeinspect())
          return;
        break;
      case 2:
        width = clipStart.width - clipStart.x + clientX;
        if (isLockRatio) {
          height = width / (clipWidth / clipHeight);
        }
        if (!sizeinspect()) {
          return;
        } else {
          clipY = clipStart.clipY - (height - clipStart.height);
        }
        break;
      case 3:
        width = clipStart.width + clipStart.x - clientX;
        if (isLockRatio) {
          height = width / (clipWidth / clipHeight);
        }
        if (!sizeinspect()) {
          return;
        } else {
          clipY = clipStart.clipY - (height - clipStart.height);
          clipX = clipStart.clipX - (width - clipStart.width);
        }
        break;
      case 4:
        width = clipStart.width + clipStart.x - clientX;
        if (isLockRatio) {
          height = width / (clipWidth / clipHeight);
        }
        if (!sizeinspect()) {
          return;
        } else {
          clipX = clipStart.clipX - (width - clipStart.width);
        }
        break;
    }
    return {
      width,
      height,
      clipX,
      clipY
    };
  }
  function imageTouchMoveOfCalcOffset(data2, clientXForLeft, clientYForLeft) {
    let left = clientXForLeft - data2.touchRelative[0].x, top = clientYForLeft - data2.touchRelative[0].y;
    return {
      left,
      top
    };
  }
  const _imports_0$4 = "/assets/photo.6f69f4e3.svg";
  const _imports_1$4 = "/assets/rotate.9f2e0410.svg";
  const cache = {};
  const _sfc_main$E = {
    // version: '0.6.3',
    name: "l-clipper",
    props: {
      value: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: String
      },
      canvasId: {
        type: String,
        default: "l-clipper"
      },
      zIndex: {
        type: Number,
        default: 99
      },
      imageUrl: {
        type: String
      },
      fileType: {
        type: String,
        default: "png"
      },
      quality: {
        type: Number,
        default: 1
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      minWidth: {
        type: Number,
        default: 200
      },
      maxWidth: {
        type: Number,
        default: 600
      },
      minHeight: {
        type: Number,
        default: 200
      },
      maxHeight: {
        type: Number,
        default: 600
      },
      isLockWidth: {
        type: Boolean,
        default: false
      },
      isLockHeight: {
        type: Boolean,
        default: false
      },
      isLockRatio: {
        type: Boolean,
        default: true
      },
      scaleRatio: {
        type: Number,
        default: 1
      },
      minRatio: {
        type: Number,
        default: 0.5
      },
      maxRatio: {
        type: Number,
        default: 2
      },
      isDisableScale: {
        type: Boolean,
        default: false
      },
      isDisableRotate: {
        type: Boolean,
        default: false
      },
      isLimitMove: {
        type: Boolean,
        default: false
      },
      isShowPhotoBtn: {
        type: Boolean,
        default: true
      },
      isShowRotateBtn: {
        type: Boolean,
        default: true
      },
      isShowConfirmBtn: {
        type: Boolean,
        default: true
      },
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      rotateAngle: {
        type: Number,
        default: 90
      },
      source: {
        type: Object,
        default: () => ({
          album: "从相册中选择",
          camera: "拍照"
        })
      }
    },
    data() {
      return {
        canvasWidth: 0,
        canvasHeight: 0,
        clipX: 0,
        clipY: 0,
        clipWidth: 0,
        clipHeight: 0,
        animation: false,
        imageWidth: 0,
        imageHeight: 0,
        imageTop: 0,
        imageLeft: 0,
        scale: 1,
        angle: 0,
        image: this.imageUrl,
        sysinfo: {},
        throttleTimer: null,
        throttleFlag: true,
        timeClipCenter: null,
        flagClipTouch: false,
        flagEndTouch: false,
        clipStart: {},
        animationTimer: null,
        touchRelative: [{ x: 0, y: 0 }],
        hypotenuseLength: 0,
        ctx: null
      };
    },
    computed: {
      clipStyle() {
        const { clipWidth, clipHeight, clipY, clipX, animation } = this;
        return `
			width: ${clipWidth}px;
			height:${clipHeight}px;
			transition-property: ${animation ? "" : "background"};
			left: ${clipX}px;
			top: ${clipY}px
			`;
      },
      imageStyle() {
        const { imageWidth, imageHeight, imageLeft, imageTop, animation, scale, angle } = this;
        return `
				width: ${imageWidth ? imageWidth + "px" : "auto"};
				height: ${imageHeight ? imageHeight + "px" : "auto"};
				transform: translate3d(${imageLeft - imageWidth / 2}px, ${imageTop - imageHeight / 2}px, 0) scale(${scale}) rotate(${angle}deg);
				transition-duration: ${animation ? 0.35 : 0}s
			`;
      },
      clipSize() {
        const { clipWidth, clipHeight } = this;
        return { clipWidth, clipHeight };
      },
      clipPoint() {
        const { clipY, clipX } = this;
        return { clipY, clipX };
      }
    },
    watch: {
      value(val) {
        if (!val) {
          this.animation = 0;
          this.angle = 0;
        } else {
          if (this.imageUrl) {
            const { imageWidth, imageHeight, imageLeft, imageTop, scale, clipX, clipY, clipWidth, clipHeight, path } = (cache == null ? void 0 : cache[this.imageUrl]) || {};
            if (path != this.image) {
              this.image = this.imageUrl;
            } else {
              this.setDiffData({ imageWidth, imageHeight, imageLeft, imageTop, scale, clipX, clipY, clipWidth, clipHeight });
            }
          }
        }
      },
      imageUrl(url) {
        this.image = url;
      },
      image: {
        handler: async function(url) {
          this.getImageInfo(url);
        }
        // immediate: true,
      },
      clipSize({ widthVal, heightVal }) {
        let { minWidth, minHeight } = this;
        minWidth = minWidth / 2;
        minHeight = minHeight / 2;
        if (widthVal < minWidth) {
          this.setDiffData({ clipWidth: minWidth });
        }
        if (heightVal < minHeight) {
          this.setDiffData({ clipHeight: minHeight });
        }
        this.calcClipSize();
      },
      angle(val) {
        this.animation = true;
        this.moveStop();
        const { isLimitMove } = this;
        if (isLimitMove && val % 90) {
          this.setDiffData({
            angle: Math.round(val / 90) * 90
          });
        }
        this.imgMarginDetectionScale();
      },
      animation(val) {
        clearTimeout(this.animationTimer);
        if (val) {
          let animationTimer = setTimeout(() => {
            this.setDiffData({
              animation: false
            });
          }, 260);
          this.setDiffData({ animationTimer });
          this.animationTimer = animationTimer;
        }
      },
      isLimitMove(val) {
        if (val) {
          if (this.angle % 90) {
            this.setDiffData({
              angle: Math.round(this.angle / 90) * 90
            });
          }
          this.imgMarginDetectionScale();
        }
      },
      clipPoint() {
        this.cutDetectionPosition();
      },
      width(width, oWidth) {
        if (width !== oWidth) {
          this.setDiffData({
            clipWidth: width / 2
          });
        }
      },
      height(height, oHeight) {
        if (height !== oHeight) {
          this.setDiffData({
            clipHeight: height / 2
          });
        }
      }
    },
    mounted() {
      const sysinfo = uni.getSystemInfoSync();
      this.sysinfo = sysinfo;
      this.setClipInfo();
      if (this.image) {
        this.getImageInfo(this.image);
      }
      this.setClipCenter();
      this.calcClipSize();
      this.cutDetectionPosition();
    },
    methods: {
      setDiffData(data2) {
        Object.keys(data2).forEach((key) => {
          if (this[key] !== data2[key]) {
            this[key] = data2[key];
          }
        });
      },
      getImageInfo(url) {
        if (!url)
          return;
        if (this.value) {
          uni.showLoading({
            title: "请稍候...",
            mask: true
          });
        }
        uni.getImageInfo({
          src: url,
          success: (res) => {
            this.imgComputeSize(res.width, res.height);
            this.image = res.path;
            if (this.isLimitMove) {
              this.imgMarginDetectionScale();
              this.$emit("ready", res);
            }
            const { imageWidth, imageHeight, imageLeft, imageTop, scale, clipX, clipY, clipWidth, clipHeight } = this;
            cache[url] = Object.assign(res, { imageWidth, imageHeight, imageLeft, imageTop, scale, clipX, clipY, clipWidth, clipHeight });
          },
          fail: (err2) => {
            this.imgComputeSize();
            if (this.isLimitMove) {
              this.imgMarginDetectionScale();
            }
          }
        });
      },
      setClipInfo() {
        const { width, height, sysinfo, canvasId } = this;
        const clipWidth = width / 2;
        const clipHeight = height / 2;
        const clipY = (sysinfo.windowHeight - clipHeight) / 2;
        const clipX = (sysinfo.windowWidth - clipWidth) / 2;
        const imageLeft = sysinfo.windowWidth / 2;
        const imageTop = sysinfo.windowHeight / 2;
        this.ctx = uni.createCanvasContext(canvasId, this);
        this.clipWidth = clipWidth;
        this.clipHeight = clipHeight;
        this.clipX = clipX;
        this.clipY = clipY;
        this.canvasHeight = clipHeight;
        this.canvasWidth = clipWidth;
        this.imageLeft = imageLeft;
        this.imageTop = imageTop;
      },
      setClipCenter() {
        const { sysInfo, clipHeight, clipWidth, imageTop, imageLeft } = this;
        let sys = sysInfo || uni.getSystemInfoSync();
        let clipY = (sys.windowHeight - clipHeight) * 0.5;
        let clipX = (sys.windowWidth - clipWidth) * 0.5;
        this.imageTop = imageTop - this.clipY + clipY;
        this.imageLeft = imageLeft - this.clipX + clipX;
        this.clipY = clipY;
        this.clipX = clipX;
      },
      calcClipSize() {
        const { clipHeight, clipWidth, sysinfo, clipX, clipY } = this;
        if (clipWidth > sysinfo.windowWidth) {
          this.setDiffData({
            clipWidth: sysinfo.windowWidth
          });
        } else if (clipWidth + clipX > sysinfo.windowWidth) {
          this.setDiffData({
            clipX: sysinfo.windowWidth - clipX
          });
        }
        if (clipHeight > sysinfo.windowHeight) {
          this.setDiffData({
            clipHeight: sysinfo.windowHeight
          });
        } else if (clipHeight + clipY > sysinfo.windowHeight) {
          this.clipY = sysinfo.windowHeight - clipY;
          this.setDiffData({
            clipY: sysinfo.windowHeight - clipY
          });
        }
      },
      cutDetectionPosition() {
        const { clipX, clipY, sysinfo, clipHeight, clipWidth } = this;
        let cutDetectionPositionTop = () => {
          if (clipY < 0) {
            this.setDiffData({ clipY: 0 });
          }
          if (clipY > sysinfo.windowHeight - clipHeight) {
            this.setDiffData({ clipY: sysinfo.windowHeight - clipHeight });
          }
        }, cutDetectionPositionLeft = () => {
          if (clipX < 0) {
            this.setDiffData({ clipX: 0 });
          }
          if (clipX > sysinfo.windowWidth - clipWidth) {
            this.setDiffData({ clipX: sysinfo.windowWidth - clipWidth });
          }
        };
        if (clipY === null && clipX === null) {
          let newClipY = (sysinfo.windowHeight - clipHeight) * 0.5;
          let newClipX = (sysinfo.windowWidth - clipWidth) * 0.5;
          this.setDiffData({
            clipX: newClipX,
            clipY: newClipY
          });
        } else if (clipY !== null && clipX !== null) {
          cutDetectionPositionTop();
          cutDetectionPositionLeft();
        } else if (clipY !== null && clipX === null) {
          cutDetectionPositionTop();
          this.setDiffData({
            clipX: (sysinfo.windowWidth - clipWidth) / 2
          });
        } else if (clipY === null && clipX !== null) {
          cutDetectionPositionLeft();
          this.setDiffData({
            clipY: (sysinfo.windowHeight - clipHeight) / 2
          });
        }
      },
      imgComputeSize(width, height) {
        const { imageWidth, imageHeight } = calcImageSize(width, height, this);
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
      },
      imgMarginDetectionScale(scale) {
        if (!this.isLimitMove)
          return;
        const currentScale = calcImageScale(this, scale);
        this.imgMarginDetectionPosition(currentScale);
      },
      imgMarginDetectionPosition(scale) {
        if (!this.isLimitMove)
          return;
        const { scale: currentScale, left, top } = calcImageOffset(this, scale);
        this.setDiffData({
          imageLeft: left,
          imageTop: top,
          scale: currentScale
        });
      },
      throttle() {
        this.setDiffData({
          throttleFlag: true
        });
      },
      moveDuring() {
        clearTimeout(this.timeClipCenter);
      },
      moveStop() {
        clearTimeout(this.timeClipCenter);
        const timeClipCenter = setTimeout(() => {
          if (!this.animation) {
            this.setDiffData({ animation: true });
          }
          this.setClipCenter();
        }, 800);
        this.setDiffData({ timeClipCenter });
      },
      clipTouchStart(event) {
        if (!this.image) {
          uni.showToast({
            title: "请选择图片",
            icon: "none",
            duration: 3e3
          });
          return;
        }
        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const { clipX, clipY, clipWidth, clipHeight } = this;
        const corner = determineDirection(clipX, clipY, clipWidth, clipHeight, currentX, currentY);
        this.moveDuring();
        if (!corner) {
          return;
        }
        this.clipStart = {
          width: clipWidth,
          height: clipHeight,
          x: currentX,
          y: currentY,
          clipY,
          clipX,
          corner
        };
        this.flagClipTouch = true;
        this.flagEndTouch = true;
      },
      clipTouchMove(event) {
        if (!this.image) {
          uni.showToast({
            title: "请选择图片",
            icon: "none",
            duration: 3e3
          });
          return;
        }
        if (event.touches.length !== 1) {
          return;
        }
        const { flagClipTouch, throttleFlag } = this;
        if (flagClipTouch && throttleFlag) {
          const { isLockRatio, isLockHeight, isLockWidth } = this;
          if (isLockRatio && (isLockWidth || isLockHeight))
            return;
          this.setDiffData({
            throttleFlag: false
          });
          this.throttle();
          const clipData = clipTouchMoveOfCalculate(this, event);
          if (clipData) {
            const { width, height, clipX, clipY } = clipData;
            if (!isLockWidth && !isLockHeight) {
              this.setDiffData({
                clipWidth: width,
                clipHeight: height,
                clipX,
                clipY
              });
            } else if (!isLockWidth) {
              this.setDiffData({
                clipWidth: width,
                clipX
              });
            } else if (!isLockHeight) {
              this.setDiffData({
                clipHeight: height,
                clipY
              });
            }
            this.imgMarginDetectionScale();
          }
        }
      },
      clipTouchEnd() {
        this.moveStop();
        this.flagClipTouch = false;
      },
      imageTouchStart(e) {
        this.flagEndTouch = false;
        const { imageLeft, imageTop } = this;
        const clientXForLeft = e.touches[0].clientX;
        const clientYForLeft = e.touches[0].clientY;
        let touchRelative = [];
        if (e.touches.length === 1) {
          touchRelative[0] = {
            x: clientXForLeft - imageLeft,
            y: clientYForLeft - imageTop
          };
          this.touchRelative = touchRelative;
        } else {
          const clientXForRight = e.touches[1].clientX;
          const clientYForRight = e.touches[1].clientY;
          let width = Math.abs(clientXForLeft - clientXForRight);
          let height = Math.abs(clientYForLeft - clientYForRight);
          const hypotenuseLength = calcPythagoreanTheorem(width, height);
          touchRelative = [
            {
              x: clientXForLeft - imageLeft,
              y: clientYForLeft - imageTop
            },
            {
              x: clientXForRight - imageLeft,
              y: clientYForRight - imageTop
            }
          ];
          this.touchRelative = touchRelative;
          this.hypotenuseLength = hypotenuseLength;
        }
      },
      imageTouchMove(e) {
        const { flagEndTouch, throttleFlag } = this;
        if (flagEndTouch || !throttleFlag)
          return;
        const clientXForLeft = e.touches[0].clientX;
        const clientYForLeft = e.touches[0].clientY;
        this.setDiffData({ throttleFlag: false });
        this.throttle();
        this.moveDuring();
        if (e.touches.length === 1) {
          const { left: imageLeft, top: imageTop } = imageTouchMoveOfCalcOffset(this, clientXForLeft, clientYForLeft);
          this.setDiffData({
            imageLeft,
            imageTop
          });
          this.imgMarginDetectionPosition();
        } else {
          const clientXForRight = e.touches[1].clientX;
          const clientYForRight = e.touches[1].clientY;
          let width = Math.abs(clientXForLeft - clientXForRight), height = Math.abs(clientYForLeft - clientYForRight), hypotenuse = calcPythagoreanTheorem(width, height), scale = this.scale * (hypotenuse / this.hypotenuseLength);
          if (this.isDisableScale) {
            scale = 1;
          } else {
            scale = scale <= this.minRatio ? this.minRatio : scale;
            scale = scale >= this.maxRatio ? this.maxRatio : scale;
            this.$emit("change", {
              width: this.imageWidth * scale,
              height: this.imageHeight * scale
            });
          }
          this.imgMarginDetectionScale(scale);
          this.hypotenuseLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
          this.scale = scale;
        }
      },
      imageTouchEnd() {
        this.setDiffData({
          flagEndTouch: true
        });
        this.moveStop();
      },
      uploadImage() {
        const itemList = Object.entries(this.source);
        const sizeType = ["original", "compressed"];
        const success = ({ tempFilePaths: a2, tempFiles: b2 }) => {
          this.image = a2 ? a2[0] : b2[0].path;
        };
        const _uploadImage = (type) => {
          if (type !== "message") {
            uni.chooseImage({
              count: 1,
              sizeType,
              sourceType: [type],
              success
            });
          }
        };
        if (itemList.length > 1) {
          uni.showActionSheet({
            itemList: itemList.map((v2) => v2[1]),
            success: ({ tapIndex: i2 }) => {
              _uploadImage(itemList[i2][0]);
            }
          });
        } else {
          _uploadImage(itemList[0][0]);
        }
      },
      imageReset() {
        const sys = this.sysinfo || uni.getSystemInfoSync();
        this.scale = 1;
        this.angle = 0;
        this.imageTop = sys.windowHeight / 2;
        this.imageLeft = sys.windowWidth / 2;
      },
      imageLoad(e) {
        this.imageReset();
        uni.hideLoading();
        this.$emit("ready", e.detail);
      },
      rotate(event) {
        if (this.isDisableRotate)
          return;
        if (!this.image) {
          uni.showToast({
            title: "请选择图片",
            icon: "none",
            duration: 3e3
          });
          return;
        }
        const { rotateAngle } = this;
        const originAngle = this.angle;
        const type = event.currentTarget.dataset.type;
        if (type === "along") {
          this.angle = originAngle + rotateAngle;
        } else {
          this.angle = originAngle - rotateAngle;
        }
        this.$emit("rotate", this.angle);
      },
      confirm() {
        if (!this.image) {
          uni.showToast({
            title: "请选择图片",
            icon: "none",
            duration: 3e3
          });
          return;
        }
        uni.showLoading({
          title: "加载中"
        });
        const { canvasHeight, canvasWidth, clipHeight, clipWidth, ctx, scale, imageLeft, imageTop, clipX, clipY, angle, scaleRatio: dpr, image, quality, fileType, type: imageType, canvasId } = this;
        const draw = () => {
          const imageWidth = this.imageWidth * scale * dpr;
          const imageHeight = this.imageHeight * scale * dpr;
          const xpos = imageLeft - clipX;
          const ypos = imageTop - clipY;
          ctx.translate(xpos * dpr, ypos * dpr);
          ctx.rotate(angle * Math.PI / 180);
          ctx.drawImage(image, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
          ctx.draw(false, () => {
            const width = clipWidth * dpr;
            const height = clipHeight * dpr;
            let params = {
              x: 0,
              y: 0,
              width,
              height,
              destWidth: width,
              destHeight: height,
              canvasId,
              fileType,
              quality,
              success: (res) => {
                data2.url = res.tempFilePath;
                uni.hideLoading();
                this.$emit("success", data2);
                this.$emit("input", false);
              },
              fail: (error) => {
                formatAppLog("error", "at uni_modules/uni-id-pages/pages/userinfo/cropImage/limeClipper/limeClipper.vue:782", "error", error);
                this.$emit("fail", error);
                this.$emit("input", false);
              }
            };
            let data2 = {
              url: "",
              width,
              height
            };
            uni.canvasToTempFilePath(params, this);
          });
        };
        if (canvasWidth !== clipWidth || canvasHeight !== clipHeight) {
          this.canvasWidth = clipWidth;
          this.canvasHeight = clipHeight;
          ctx.draw();
          this.$nextTick(() => {
            setTimeout(() => {
              draw();
            }, 100);
          });
        } else {
          draw();
        }
      },
      cancel() {
        this.$emit("cancel", false);
        this.$emit("input", false);
      }
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["l-clipper", { open: $props.value }]),
        "disable-scroll": "",
        style: vue.normalizeStyle("z-index: " + $props.zIndex + ";" + $props.customStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "l-clipper-mask",
            onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.clipTouchStart && $options.clipTouchStart(...args), ["stop", "prevent"])),
            onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.clipTouchMove && $options.clipTouchMove(...args), ["stop", "prevent"])),
            onTouchend: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.clipTouchEnd && $options.clipTouchEnd(...args), ["stop", "prevent"]))
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: "l-clipper__content",
                style: vue.normalizeStyle($options.clipStyle)
              },
              [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList([0, 0, 0, 0], (item, index) => {
                    return vue.createElementVNode("view", {
                      class: "l-clipper__edge",
                      key: index
                    });
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ],
              4
              /* STYLE */
            )
          ],
          32
          /* NEED_HYDRATION */
        ),
        $data.image ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "l-clipper-image",
          onError: _cache[3] || (_cache[3] = (...args) => $options.imageLoad && $options.imageLoad(...args)),
          onLoad: _cache[4] || (_cache[4] = (...args) => $options.imageLoad && $options.imageLoad(...args)),
          onTouchstart: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.imageTouchStart && $options.imageTouchStart(...args), ["stop", "prevent"])),
          onTouchmove: _cache[6] || (_cache[6] = vue.withModifiers((...args) => $options.imageTouchMove && $options.imageTouchMove(...args), ["stop", "prevent"])),
          onTouchend: _cache[7] || (_cache[7] = vue.withModifiers((...args) => $options.imageTouchEnd && $options.imageTouchEnd(...args), ["stop", "prevent"])),
          src: $data.image,
          mode: $data.imageWidth == "auto" ? "widthFix" : "",
          style: vue.normalizeStyle($options.imageStyle)
        }, null, 44, ["src", "mode"])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("canvas", {
          "canvas-id": $props.canvasId,
          id: "l-clipper",
          "disable-scroll": "",
          style: vue.normalizeStyle("width: " + $data.canvasWidth * $props.scaleRatio + "px; height:" + $data.canvasHeight * $props.scaleRatio + "px;"),
          class: "l-clipper-canvas"
        }, null, 12, ["canvas-id"]),
        vue.createElementVNode("view", { class: "l-clipper-tools" }, [
          vue.createElementVNode("view", { class: "l-clipper-tools__btns" }, [
            $props.isShowCancelBtn ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              onClick: _cache[8] || (_cache[8] = (...args) => $options.cancel && $options.cancel(...args))
            }, [
              _ctx.$slots.cancel ? vue.renderSlot(_ctx.$slots, "cancel", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "cancel"
              }, "取消"))
            ])) : vue.createCommentVNode("v-if", true),
            $props.isShowPhotoBtn ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              onClick: _cache[9] || (_cache[9] = (...args) => $options.uploadImage && $options.uploadImage(...args))
            }, [
              _ctx.$slots.photo ? vue.renderSlot(_ctx.$slots, "photo", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                src: _imports_0$4
              }))
            ])) : vue.createCommentVNode("v-if", true),
            $props.isShowRotateBtn ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              onClick: _cache[10] || (_cache[10] = (...args) => $options.rotate && $options.rotate(...args))
            }, [
              _ctx.$slots.rotate ? vue.renderSlot(_ctx.$slots, "rotate", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                src: _imports_1$4,
                "data-type": "inverse"
              }))
            ])) : vue.createCommentVNode("v-if", true),
            $props.isShowConfirmBtn ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 3,
              onClick: _cache[11] || (_cache[11] = (...args) => $options.confirm && $options.confirm(...args))
            }, [
              _ctx.$slots.confirm ? vue.renderSlot(_ctx.$slots, "confirm", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "confirm"
              }, "确定"))
            ])) : vue.createCommentVNode("v-if", true)
          ]),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const limeClipper = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__scopeId", "data-v-5dd2a2ff"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/cropImage/limeClipper/limeClipper.vue"]]);
  const _sfc_main$D = {
    components: { limeClipper },
    data() {
      return { path: "", options: { "width": 600, "height": 600 } };
    },
    onLoad({ path, options }) {
      this.path = path;
      if (options) {
        this.options = JSON.parse(options);
      }
    },
    methods: {
      successFn(e) {
        this.getOpenerEventChannel().emit("success", e.url);
        uni.navigateBack();
      },
      cancel() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_limeClipper = vue.resolveComponent("limeClipper");
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_limeClipper, {
        width: $data.options.width,
        "scale-ratio": 2,
        "is-lock-width": false,
        "is-lock-height": false,
        height: $data.options.height,
        "image-url": $data.path,
        onSuccess: $options.successFn,
        onCancel: $options.cancel
      }, null, 8, ["width", "height", "image-url", "onSuccess", "onCancel"])
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoCropImageCropImage = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage.vue"]]);
  const _sfc_main$C = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "70px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules2 = null) {
        this.userRules = rules2;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type = false) {
        const {
          validator: validator2,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type && childrens.push(this);
        if (!validator2 || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator2.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator2;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules2 = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules2);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 70 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["__scopeId", "data-v-462874dd"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  function debounce(func, wait) {
    let timer;
    wait = wait || 500;
    return function() {
      let context = this;
      let args = arguments;
      if (timer)
        clearTimeout(timer);
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow)
        func.apply(context, args);
    };
  }
  const _sfc_main$B = {
    name: "uni-email-code-form",
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    props: {
      event: ["update:modelValue"],
      /**
       * 倒计时时长 s
       */
      count: {
        type: [String, Number],
        default: 60
      },
      /**
       * 邮箱
       */
      email: {
        type: [String],
        default: ""
      },
      /*
      	验证码类型，用于防止不同功能的验证码混用，目前支持的类型login登录、register注册、bind绑定邮箱、unbind解绑邮箱
      */
      type: {
        type: String,
        default() {
          return "register";
        }
      },
      /*
      	验证码输入框是否默认获取焦点
      */
      focusCaptchaInput: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        captcha: "",
        reverseNumber: 0,
        reverseTimer: null,
        modelValue: "",
        focusEmailCodeInput: false
      };
    },
    watch: {
      captcha(value, oldValue) {
        if (value.length == 4 && oldValue.length != 4) {
          this.start();
        }
      },
      modelValue(value) {
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      }
    },
    computed: {
      innerText() {
        if (this.reverseNumber == 0)
          return "获取邮箱验证码";
        return "重新发送(" + this.reverseNumber + "s)";
      }
    },
    created() {
      this.initClick();
    },
    methods: {
      getImageCaptcha(focus) {
        this.$refs.captcha.getImageCaptcha(focus);
      },
      initClick() {
        this.start = debounce(() => {
          if (this.reverseNumber != 0)
            return;
          this.sendMsg();
        });
      },
      sendMsg() {
        if (this.captcha.length != 4) {
          this.$refs.captcha.focusCaptchaInput = true;
          return uni.showToast({
            title: "请先输入图形验证码",
            icon: "none",
            duration: 3e3
          });
        }
        if (!this.email)
          return uni.showToast({
            title: "请输入邮箱",
            icon: "none",
            duration: 3e3
          });
        let reg_email = /@/;
        if (!reg_email.test(this.email))
          return uni.showToast({
            title: "邮箱格式错误",
            icon: "none",
            duration: 3e3
          });
        const uniIdCo2 = nr.importObject("uni-id-co", {
          customUI: true
        });
        formatAppLog("log", "at uni_modules/uni-id-pages/components/uni-id-pages-email-form/uni-id-pages-email-form.vue:144", "sendEmailCode", {
          "email": this.email,
          "scene": this.type,
          "captcha": this.captcha
        });
        uniIdCo2.sendEmailCode({
          "email": this.email,
          "scene": this.type,
          "captcha": this.captcha
        }).then((result) => {
          uni.showToast({
            title: "邮箱验证码发送成功",
            icon: "none",
            duration: 3e3
          });
          this.reverseNumber = Number(this.count);
          this.getCode();
        }).catch((e) => {
          if (e.code == "uni-id-invalid-mail-template") {
            this.modelValue = "123456";
            uni.showToast({
              title: "已启动测试模式,详情【控制台信息】",
              icon: "none",
              duration: 3e3
            });
            formatAppLog("warn", "at uni_modules/uni-id-pages/components/uni-id-pages-email-form/uni-id-pages-email-form.vue:169", e.message);
          } else {
            this.getImageCaptcha();
            this.captcha = "";
            uni.showToast({
              title: e.message,
              icon: "none",
              duration: 3e3
            });
          }
        });
      },
      getCode() {
        if (this.reverseNumber == 0) {
          clearTimeout(this.reverseTimer);
          this.reverseTimer = null;
          return;
        }
        this.reverseNumber--;
        this.reverseTimer = setTimeout(() => {
          this.getCode();
        }, 1e3);
      }
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-captcha"), __easycom_0$5);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_uni_captcha, {
        focus: $props.focusCaptchaInput,
        ref: "captcha",
        scene: "send-email-code",
        modelValue: $data.captcha,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.captcha = $event)
      }, null, 8, ["focus", "modelValue"]),
      vue.createElementVNode("view", { class: "box" }, [
        vue.createVNode(_component_uni_easyinput, {
          focus: $data.focusEmailCodeInput,
          onBlur: _cache[1] || (_cache[1] = ($event) => $data.focusEmailCodeInput = false),
          type: "number",
          class: "input-box",
          inputBorder: false,
          modelValue: $data.modelValue,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.modelValue = $event),
          maxlength: "6",
          placeholder: "请输入邮箱验证码"
        }, null, 8, ["focus", "modelValue"]),
        vue.createElementVNode("view", {
          class: "short-code-btn",
          "hover-class": "hover",
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.start && _ctx.start(...args))
        }, [
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["inner-text", $data.reverseNumber == 0 ? "inner-text-active" : ""])
            },
            vue.toDisplayString($options.innerText),
            3
            /* TEXT, CLASS */
          )
        ])
      ])
    ]);
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["__scopeId", "data-v-bcd6b47b"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/components/uni-id-pages-email-form/uni-id-pages-email-form.vue"]]);
  const uniIdCo$6 = nr.importObject("uni-id-co");
  const _sfc_main$A = {
    mixins: [mixin],
    data() {
      return {
        formData: {
          email: "",
          nickname: "",
          password: "",
          password2: "",
          code: ""
        },
        rules: {
          email: {
            rules: [
              {
                required: true,
                errorMessage: "请输入邮箱"
              },
              {
                format: "email",
                errorMessage: "邮箱格式不正确"
              }
            ]
          },
          nickname: {
            rules: [
              {
                minLength: 3,
                maxLength: 32,
                errorMessage: "昵称长度在 {minLength} 到 {maxLength} 个字符"
              },
              {
                validateFunction: function(rule, value, data2, callback) {
                  if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                    callback("昵称不能是：手机号或邮箱");
                  }
                  if (/^\d+$/.test(value)) {
                    callback("昵称不能为纯数字");
                  }
                  if (/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)) {
                    callback("昵称不能包含中文");
                  }
                  return true;
                }
              }
            ],
            label: "昵称"
          },
          ...passwordMod.getPwdRules(),
          code: {
            rules: [
              {
                required: true,
                errorMessage: "请输入邮箱验证码"
              },
              {
                pattern: /^.{6}$/,
                errorMessage: "邮箱验证码不正确"
              }
            ]
          }
        },
        focusEmail: false,
        focusNickname: false,
        focusPassword: false,
        focusPassword2: false,
        logo: "/static/logo.png"
      };
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    onShow() {
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        this.$refs.form.validate().then((res) => {
          if (this.needAgreements && !this.agree) {
            return this.$refs.agreements.popup(() => {
              this.submitForm(res);
            });
          }
          this.submitForm(res);
        }).catch((errors) => {
          let key = errors[0].key;
          key = key.replace(key[0], key[0].toUpperCase());
          this["focus" + key] = true;
        });
      },
      submitForm(params) {
        uniIdCo$6.registerUserByEmail(this.formData).then((e) => {
          uni.navigateTo({
            url: "/uni_modules/uni-id-pages/pages/login/login-withpwd",
            complete: (e2) => {
            }
          });
        }).catch((e) => {
          formatAppLog("log", "at uni_modules/uni-id-pages/pages/register/register-by-email.vue:163", e.message);
        });
      },
      navigateBack() {
        uni.navigateBack();
      },
      toLogin() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      },
      registerByUserName() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/register/register"
        });
      }
    }
  };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_id_pages_email_form = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-email-form"), __easycom_3$2);
    const _component_uni_id_pages_agreements = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-agreements"), __easycom_5$2);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "邮箱验证码注册")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        value: $data.formData,
        rules: $data.rules,
        "validate-trigger": "submit",
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            name: "email",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusEmail,
                onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusEmail = false),
                class: "input-box",
                placeholder: "请输入邮箱",
                modelValue: $data.formData.email,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.email = $event),
                trim: "both"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "nickname" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusNickname,
                onBlur: _cache[2] || (_cache[2] = ($event) => $data.focusNickname = false),
                class: "input-box",
                placeholder: "请输入用户昵称",
                modelValue: $data.formData.nickname,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.nickname = $event),
                trim: "both"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "password",
            modelValue: $data.formData.password,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.password = $event),
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusPassword,
                onBlur: _cache[4] || (_cache[4] = ($event) => $data.focusPassword = false),
                class: "input-box",
                maxlength: "20",
                placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
                type: "password",
                modelValue: $data.formData.password,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.password = $event),
                trim: "both"
              }, null, 8, ["focus", "placeholder", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"]),
          vue.createVNode(_component_uni_forms_item, {
            name: "password2",
            modelValue: $data.formData.password2,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.formData.password2 = $event),
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusPassword2,
                onBlur: _cache[7] || (_cache[7] = ($event) => $data.focusPassword2 = false),
                class: "input-box",
                placeholder: "再次输入密码",
                maxlength: "20",
                type: "password",
                modelValue: $data.formData.password2,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.formData.password2 = $event),
                trim: "both"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"]),
          vue.createVNode(_component_uni_forms_item, { name: "code" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_id_pages_email_form, {
                ref: "shortCode",
                email: $data.formData.email,
                type: "register",
                modelValue: $data.formData.code,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.formData.code = $event)
              }, null, 8, ["email", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(
            _component_uni_id_pages_agreements,
            {
              scope: "register",
              ref: "agreements"
            },
            null,
            512
            /* NEED_PATCH */
          ),
          vue.createElementVNode("button", {
            class: "uni-btn",
            type: "primary",
            onClick: _cache[11] || (_cache[11] = (...args) => $options.submit && $options.submit(...args))
          }, "注册"),
          vue.createElementVNode("button", {
            onClick: _cache[12] || (_cache[12] = (...args) => $options.navigateBack && $options.navigateBack(...args)),
            class: "register-back"
          }, "返回"),
          vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "link-box" }, [
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[13] || (_cache[13] = (...args) => $options.registerByUserName && $options.registerByUserName(...args))
                }, "用户名密码注册"),
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[14] || (_cache[14] = (...args) => $options.toLogin && $options.toLogin(...args))
                }, "已有账号？点此登录")
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value", "rules"])
    ]);
  }
  const UniModulesUniIdPagesPagesRegisterRegisterByEmail = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/register/register-by-email.vue"]]);
  const uniIdCo$5 = nr.importObject("uni-id-co", {
    errorOptions: {
      type: "toast"
    }
  });
  const _sfc_main$z = {
    mixins: [mixin],
    data() {
      return {
        lock: false,
        focusPhone: true,
        focusPassword: false,
        focusPassword2: false,
        formData: {
          "phone": "",
          "code": "",
          "password": "",
          "password2": "",
          "captcha": ""
        },
        rules: {
          phone: {
            rules: [
              {
                required: true,
                errorMessage: "请输入手机号"
              },
              {
                pattern: /^1\d{10}$/,
                errorMessage: "手机号码格式不正确"
              }
            ]
          },
          code: {
            rules: [
              {
                required: true,
                errorMessage: "请输入短信验证码"
              },
              {
                pattern: /^.{6}$/,
                errorMessage: "请输入6位验证码"
              }
            ]
          },
          password: {
            rules: [
              {
                required: true,
                errorMessage: "请输入新密码"
              },
              {
                pattern: /^.{6,20}$/,
                errorMessage: "密码为6 - 20位"
              }
            ]
          },
          password2: {
            rules: [
              {
                required: true,
                errorMessage: "请确认密码"
              },
              {
                pattern: /^.{6,20}$/,
                errorMessage: "密码为6 - 20位"
              },
              {
                validateFunction: function(rule, value, data2, callback) {
                  if (value != data2.password) {
                    callback("两次输入密码不一致");
                  }
                  return true;
                }
              }
            ]
          }
        },
        logo: "/static/logo.png"
      };
    },
    computed: {
      isPhone() {
        let reg_phone = /^1\d{10}$/;
        let isPhone = reg_phone.test(this.formData.phone);
        return isPhone;
      },
      isPwd() {
        let reg_pwd = /^.{6,20}$/;
        let isPwd = reg_pwd.test(this.formData.password);
        return isPwd;
      },
      isCode() {
        let reg_code = /^\d{6}$/;
        let isCode = reg_code.test(this.formData.code);
        return isCode;
      }
    },
    onLoad(event) {
      if (event && event.phoneNumber) {
        this.formData.phone = event.phoneNumber;
        if (event.lock) {
          this.lock = event.lock;
          this.focusPhone = true;
        }
      }
    },
    onReady() {
      if (this.formData.phone) {
        this.$refs.shortCode.start();
      }
      this.$refs.form.setRules(this.rules);
    },
    onShow() {
    },
    methods: {
      /**
       * 完成并提交
       */
      submit() {
        this.$refs.form.validate().then((res) => {
          let {
            "phone": mobile,
            "password": password,
            captcha,
            code
          } = this.formData;
          uniIdCo$5.resetPwdBySms({
            mobile,
            code,
            password,
            captcha
          }).then((e) => {
            uni.navigateBack();
          }).catch((e) => {
            if (e.errCode == "uni-id-captcha-required") {
              this.$refs.popup.open();
            }
          }).finally((e) => {
            this.formData.captcha = "";
          });
        }).catch((errors) => {
          let key = errors[0].key;
          if (key == "code") {
            return this.$refs.shortCode.focusSmsCodeInput = true;
          }
          key = key.replace(key[0], key[0].toUpperCase());
          this["focus" + key] = true;
        });
      },
      retrieveByEmail() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email"
        });
      },
      backLogin() {
        uni.redirectTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      }
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_id_pages_sms_form = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-sms-form"), __easycom_3$4);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    const _component_uni_popup_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-popup-captcha"), __easycom_5$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "通过手机验证码找回密码")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        value: $data.formData,
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, { name: "phone" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusPhone,
                onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusPhone = false),
                class: "input-box",
                disabled: $data.lock,
                type: "number",
                inputBorder: false,
                trim: "both",
                modelValue: $data.formData.phone,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.phone = $event),
                maxlength: "11",
                placeholder: "请输入手机号"
              }, null, 8, ["focus", "disabled", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "code" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_id_pages_sms_form, {
                ref: "shortCode",
                phone: $data.formData.phone,
                type: "reset-pwd-by-sms",
                modelValue: $data.formData.code,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.code = $event)
              }, null, 8, ["phone", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "password" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusPassword,
                onBlur: _cache[3] || (_cache[3] = ($event) => $data.focusPassword = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.password,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.password = $event),
                trim: "both",
                placeholder: "请输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "password2" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusPassword2,
                onBlur: _cache[5] || (_cache[5] = ($event) => $data.focusPassword2 = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.password2,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.password2 = $event),
                trim: "both",
                placeholder: "请再次输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("button", {
            class: "uni-btn send-btn-box",
            type: "primary",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.submit && $options.submit(...args))
          }, "提交"),
          vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "link-box" }, [
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.retrieveByEmail && $options.retrieveByEmail(...args))
                }, "通过邮箱验证码找回密码"),
                vue.createElementVNode("view"),
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[9] || (_cache[9] = (...args) => $options.backLogin && $options.backLogin(...args))
                }, "返回登录")
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value"]),
      vue.createVNode(_component_uni_popup_captcha, {
        onConfirm: $options.submit,
        modelValue: $data.formData.captcha,
        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.formData.captcha = $event),
        scene: "reset-pwd-by-sms",
        ref: "popup"
      }, null, 8, ["onConfirm", "modelValue"])
    ]);
  }
  const UniModulesUniIdPagesPagesRetrieveRetrieve = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/retrieve/retrieve.vue"]]);
  const uniIdCo$4 = nr.importObject("uni-id-co", {
    errorOptions: {
      type: "toast"
    }
  });
  const _sfc_main$y = {
    mixins: [mixin],
    data() {
      return {
        lock: false,
        focusEmail: true,
        focusPassword: false,
        focusPassword2: false,
        formData: {
          "email": "",
          "code": "",
          "password": "",
          "password2": "",
          "captcha": ""
        },
        rules: {
          email: {
            rules: [
              {
                required: true,
                errorMessage: "请输入邮箱"
              },
              {
                format: "email",
                errorMessage: "邮箱格式不正确"
              }
            ]
          },
          code: {
            rules: [
              {
                required: true,
                errorMessage: "请输入邮箱验证码"
              },
              {
                pattern: /^.{6}$/,
                errorMessage: "请输入6位验证码"
              }
            ]
          },
          ...passwordMod.getPwdRules()
        },
        logo: "/static/logo.png"
      };
    },
    computed: {
      isEmail() {
        let reg_email = /@/;
        let isEmail = reg_email.test(this.formData.email);
        return isEmail;
      },
      isPwd() {
        let reg_pwd = /^.{6,20}$/;
        let isPwd = reg_pwd.test(this.formData.password);
        return isPwd;
      },
      isCode() {
        let reg_code = /^\d{6}$/;
        let isCode = reg_code.test(this.formData.code);
        return isCode;
      }
    },
    onLoad(event) {
      if (event && event.emailNumber) {
        this.formData.email = event.emailNumber;
        if (event.lock) {
          this.lock = event.lock;
          this.focusEmail = true;
        }
      }
    },
    onReady() {
      if (this.formData.email) {
        this.$refs.shortCode.start();
      }
      this.$refs.form.setRules(this.rules);
    },
    onShow() {
    },
    methods: {
      /**
       * 完成并提交
       */
      submit() {
        this.$refs.form.validate().then((res) => {
          let {
            email,
            password,
            captcha,
            code
          } = this.formData;
          uniIdCo$4.resetPwdByEmail({
            email,
            code,
            password,
            captcha
          }).then((e) => {
            uni.navigateTo({
              url: "/uni_modules/uni-id-pages/pages/login/login-withpwd",
              complete: (e2) => {
              }
            });
          }).catch((e) => {
            if (e.errCode == "uni-id-captcha-required") {
              this.$refs.popup.open();
            }
          }).finally((e) => {
            this.formData.captcha = "";
          });
        }).catch((errors) => {
          let key = errors[0].key;
          if (key == "code") {
            return this.$refs.shortCode.focusSmsCodeInput = true;
          }
          key = key.replace(key[0], key[0].toUpperCase());
          this["focus" + key] = true;
        });
      },
      retrieveByPhone() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/retrieve/retrieve"
        });
      },
      backLogin() {
        uni.redirectTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_id_pages_email_form = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-email-form"), __easycom_3$2);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    const _component_uni_popup_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-popup-captcha"), __easycom_5$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "通过邮箱验证码找回密码")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        value: $data.formData,
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, { name: "email" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusEmail,
                onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusEmail = false),
                class: "input-box",
                disabled: $data.lock,
                inputBorder: false,
                trim: "both",
                modelValue: $data.formData.email,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.email = $event),
                placeholder: "请输入邮箱"
              }, null, 8, ["focus", "disabled", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "code" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_id_pages_email_form, {
                ref: "shortCode",
                email: $data.formData.email,
                type: "reset-pwd-by-email",
                modelValue: $data.formData.code,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.code = $event)
              }, null, 8, ["email", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "password" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusPassword,
                onBlur: _cache[3] || (_cache[3] = ($event) => $data.focusPassword = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.password,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.password = $event),
                trim: "both",
                placeholder: "请输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "password2" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusPassword2,
                onBlur: _cache[5] || (_cache[5] = ($event) => $data.focusPassword2 = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.password2,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.password2 = $event),
                trim: "both",
                placeholder: "请再次输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("button", {
            class: "uni-btn send-btn-box",
            type: "primary",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.submit && $options.submit(...args))
          }, "提交"),
          vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "link-box" }, [
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.retrieveByPhone && $options.retrieveByPhone(...args))
                }, "通过手机验证码找回密码"),
                vue.createElementVNode("view"),
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[9] || (_cache[9] = (...args) => $options.backLogin && $options.backLogin(...args))
                }, "返回登录")
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value"]),
      vue.createVNode(_component_uni_popup_captcha, {
        onConfirm: $options.submit,
        modelValue: $data.formData.captcha,
        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.formData.captcha = $event),
        scene: "reset-pwd-by-sms",
        ref: "popup"
      }, null, 8, ["onConfirm", "modelValue"])
    ]);
  }
  const UniModulesUniIdPagesPagesRetrieveRetrieveByEmail = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email.vue"]]);
  const _sfc_main$x = {
    onLoad({ url, title }) {
      if (url.substring(0, 4) != "http") {
        uni.showModal({
          title: "错误",
          content: '不是一个有效的网站链接,"' + url + '"',
          showCancel: false,
          confirmText: "知道了",
          complete: () => {
            uni.navigateBack();
          }
        });
        title = "页面路径错误";
      } else {
        this.url = url;
      }
      if (title) {
        uni.setNavigationBarTitle({ title });
      }
    },
    data() {
      return {
        url: null
      };
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $data.url ? (vue.openBlock(), vue.createElementBlock("web-view", {
        key: 0,
        src: $data.url
      }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const UniModulesUniIdPagesPagesCommonWebviewWebview = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/common/webview/webview.vue"]]);
  const uniIdCo$3 = nr.importObject("uni-id-co", {
    customUI: true
  });
  const _sfc_main$w = {
    mixins: [mixin],
    data() {
      return {
        focusOldPassword: false,
        focusNewPassword: false,
        focusNewPassword2: false,
        formData: {
          "oldPassword": "",
          "newPassword": "",
          "newPassword2": ""
        },
        rules: {
          oldPassword: {
            rules: [
              {
                required: true,
                errorMessage: "请输入新密码"
              },
              {
                pattern: /^.{6,20}$/,
                errorMessage: "密码为6 - 20位"
              }
            ]
          },
          ...passwordMod.getPwdRules("newPassword", "newPassword2")
        },
        logo: "/static/logo.png"
      };
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    onShow() {
    },
    methods: {
      /**
       * 完成并提交
       */
      submit() {
        this.$refs.form.validate().then((res) => {
          let {
            oldPassword,
            newPassword
          } = this.formData;
          uniIdCo$3.updatePwd({
            oldPassword,
            newPassword
          }).then((e) => {
            uni.removeStorageSync("uni_id_token");
            uni.setStorageSync("uni_id_token_expired", 0);
            uni.redirectTo({
              url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
            });
          }).catch((e) => {
            uni.showModal({
              content: e.message,
              showCancel: false
            });
          });
        }).catch((errors) => {
          let key = errors[0].key;
          key = key.replace(key[0], key[0].toUpperCase());
          this["focus" + key] = true;
        });
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "修改密码")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        value: $data.formData,
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, { name: "oldPassword" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusOldPassword,
                onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusOldPassword = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.oldPassword,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.oldPassword = $event),
                placeholder: "请输入旧密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "newPassword" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusNewPassword,
                onBlur: _cache[2] || (_cache[2] = ($event) => $data.focusNewPassword = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.newPassword,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.newPassword = $event),
                placeholder: "请输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "newPassword2" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusNewPassword2,
                onBlur: _cache[4] || (_cache[4] = ($event) => $data.focusNewPassword2 = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.newPassword2,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.newPassword2 = $event),
                placeholder: "请再次输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("button", {
            class: "uni-btn send-btn-box",
            type: "primary",
            onClick: _cache[6] || (_cache[6] = (...args) => $options.submit && $options.submit(...args))
          }, "提交")
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value"])
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoChangePwdChangePwd = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.vue"]]);
  const uniIdCo$2 = nr.importObject("uni-id-co", { customUI: true });
  const _sfc_main$v = {
    mixins: [mixin],
    data() {
      return {
        formData: {
          username: "",
          nickname: "",
          password: "",
          password2: "",
          captcha: ""
        },
        rules,
        focusUsername: false,
        focusNickname: false,
        focusPassword: false,
        focusPassword2: false,
        logo: "/static/logo.png"
      };
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    onShow() {
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        this.$refs.form.validate().then((res) => {
          if (this.needAgreements && !this.agree) {
            return this.$refs.agreements.popup(() => {
              this.submitForm(res);
            });
          }
          this.submitForm(res);
        }).catch((errors) => {
          let key = errors[0].key;
          key = key.replace(key[0], key[0].toUpperCase());
          this["focus" + key] = true;
        });
      },
      submitForm(params) {
        uniIdCo$2.registerAdmin(this.formData).then((e) => {
          uni.navigateBack();
        }).catch((e) => {
          this.$refs.captcha.getImageCaptcha();
          uni.showModal({
            title: "提示",
            content: e.errMsg || `创建失败: ${e.errCode}`,
            showCancel: false
          });
        });
      },
      navigateBack() {
        uni.navigateBack();
      },
      toLogin() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        });
      },
      registerByEmail() {
        uni.navigateTo({
          url: "/uni_modules/uni-id-pages/pages/register/register-by-email"
        });
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_id_pages_agreements = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-agreements"), __easycom_5$2);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "创建超级管理员")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        value: $data.formData,
        rules: $data.rules,
        "validate-trigger": "submit",
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            name: "username",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusUsername,
                onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusUsername = false),
                class: "input-box",
                placeholder: "请输入用户名",
                modelValue: $data.formData.username,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.username = $event),
                trim: "both"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { name: "nickname" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusNickname,
                onBlur: _cache[2] || (_cache[2] = ($event) => $data.focusNickname = false),
                class: "input-box",
                placeholder: "请输入用户昵称",
                modelValue: $data.formData.nickname,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.nickname = $event),
                trim: "both"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "password",
            modelValue: $data.formData.password,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.password = $event),
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusPassword,
                onBlur: _cache[4] || (_cache[4] = ($event) => $data.focusPassword = false),
                class: "input-box",
                maxlength: "20",
                placeholder: "请输入" + (_ctx.config.passwordStrength == "weak" ? "6" : "8") + "-16位密码",
                type: "password",
                modelValue: $data.formData.password,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.password = $event),
                trim: "both"
              }, null, 8, ["focus", "placeholder", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"]),
          vue.createVNode(_component_uni_forms_item, {
            name: "password2",
            modelValue: $data.formData.password2,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.formData.password2 = $event),
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                inputBorder: false,
                focus: $data.focusPassword2,
                onBlur: _cache[7] || (_cache[7] = ($event) => $data.focusPassword2 = false),
                class: "input-box",
                placeholder: "再次输入密码",
                maxlength: "20",
                type: "password",
                modelValue: $data.formData.password2,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.formData.password2 = $event),
                trim: "both"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"]),
          vue.createCommentVNode("			<uni-forms-item>"),
          vue.createCommentVNode('				<uni-captcha ref="captcha" scene="register" v-model="formData.captcha" />'),
          vue.createCommentVNode("			</uni-forms-item>"),
          vue.createVNode(
            _component_uni_id_pages_agreements,
            {
              scope: "register",
              ref: "agreements"
            },
            null,
            512
            /* NEED_PATCH */
          ),
          vue.createElementVNode("button", {
            class: "uni-btn",
            type: "primary",
            onClick: _cache[10] || (_cache[10] = (...args) => $options.submit && $options.submit(...args))
          }, "注册"),
          vue.createElementVNode("button", {
            onClick: _cache[11] || (_cache[11] = (...args) => $options.navigateBack && $options.navigateBack(...args)),
            class: "register-back"
          }, "返回"),
          vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "link-box" }, [
                vue.createElementVNode("text", {
                  class: "link",
                  onClick: _cache[12] || (_cache[12] = (...args) => $options.toLogin && $options.toLogin(...args))
                }, "已有账号？点此登录")
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value", "rules"])
    ]);
  }
  const UniModulesUniIdPagesPagesRegisterRegisterAdmin = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/register/register-admin.vue"]]);
  const uniIdCo$1 = nr.importObject("uni-id-co", {
    customUI: true
  });
  const _sfc_main$u = {
    name: "set-pwd.vue",
    data() {
      return {
        uniIdRedirectUrl: "",
        loginType: "",
        logo: "/static/logo.png",
        focusNewPassword: false,
        focusNewPassword2: false,
        allowSkip: false,
        formData: {
          code: "",
          captcha: "",
          newPassword: "",
          newPassword2: ""
        },
        rules: passwordMod.getPwdRules("newPassword", "newPassword2")
      };
    },
    computed: {
      userInfo() {
        return store.userInfo;
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    onLoad(e) {
      var _a;
      this.uniIdRedirectUrl = e.uniIdRedirectUrl;
      this.loginType = e.loginType;
      if (config.setPasswordAfterLogin && ((_a = config.setPasswordAfterLogin) == null ? void 0 : _a.allowSkip)) {
        this.allowSkip = true;
      }
    },
    methods: {
      submit() {
        if (!/^\d{6}$/.test(this.formData.code)) {
          this.$refs.smsCode.focusSmsCodeInput = true;
          return uni.showToast({
            title: "验证码格式不正确",
            icon: "none"
          });
        }
        this.$refs.form.validate().then((res) => {
          uniIdCo$1.setPwd({
            password: this.formData.newPassword,
            code: this.formData.code,
            captcha: this.formData.captcha
          }).then((e) => {
            uni.showModal({
              content: "密码设置成功",
              showCancel: false,
              success: () => {
                mutations.loginBack({
                  uniIdRedirectUrl: this.uniIdRedirectUrl,
                  loginType: this.loginType
                });
              }
            });
          }).catch((e) => {
            uni.showModal({
              content: e.message,
              showCancel: false
            });
          });
        }).catch((e) => {
          if (e.errCode == "uni-id-captcha-required") {
            this.$refs.popup.open();
          } else {
            formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.vue:117", e.errMsg);
          }
        }).finally((e) => {
          this.formData.captcha = "";
        });
      },
      skip() {
        mutations.loginBack({
          uniIdRedirectUrl: this.uniIdRedirectUrl
        });
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_match_media = resolveEasycom(vue.resolveDynamicComponent("uni-match-media"), __easycom_0$1);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_id_pages_sms_form = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-sms-form"), __easycom_3$4);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    const _component_uni_popup_captcha = resolveEasycom(vue.resolveDynamicComponent("uni-popup-captcha"), __easycom_5$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createVNode(_component_uni_match_media, { "min-width": 690 }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "login-logo" }, [
            vue.createElementVNode("image", { src: $data.logo }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 顶部文字 "),
          vue.createElementVNode("text", { class: "title title-box" }, "设置密码")
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_forms, {
        class: "set-password-form",
        ref: "form",
        value: $data.formData,
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("text", { class: "tip" }, "输入密码"),
          vue.createVNode(_component_uni_forms_item, { name: "newPassword" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusNewPassword,
                onBlur: _cache[0] || (_cache[0] = ($event) => $data.focusNewPassword = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.newPassword,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.newPassword = $event),
                placeholder: "请输入密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("text", { class: "tip" }, "再次输入密码"),
          vue.createVNode(_component_uni_forms_item, { name: "newPassword2" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                focus: $data.focusNewPassword2,
                onBlur: _cache[2] || (_cache[2] = ($event) => $data.focusNewPassword2 = false),
                class: "input-box",
                type: "password",
                inputBorder: false,
                modelValue: $data.formData.newPassword2,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.newPassword2 = $event),
                placeholder: "请再次输入新密码"
              }, null, 8, ["focus", "modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_id_pages_sms_form, {
            modelValue: $data.formData.code,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.code = $event),
            type: "set-pwd-by-sms",
            ref: "smsCode",
            phone: $options.userInfo.mobile
          }, null, 8, ["modelValue", "phone"]),
          vue.createElementVNode("view", { class: "link-box" }, [
            vue.createElementVNode("button", {
              class: "uni-btn send-btn",
              type: "primary",
              onClick: _cache[5] || (_cache[5] = (...args) => $options.submit && $options.submit(...args))
            }, "确认"),
            $data.allowSkip ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              class: "uni-btn send-btn",
              type: "default",
              onClick: _cache[6] || (_cache[6] = (...args) => $options.skip && $options.skip(...args))
            }, "跳过")) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value"]),
      vue.createVNode(_component_uni_popup_captcha, {
        onConfirm: $options.submit,
        modelValue: $data.formData.captcha,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.formData.captcha = $event),
        scene: "set-pwd-by-sms",
        ref: "popup"
      }, null, 8, ["onConfirm", "modelValue"])
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoSetPwdSetPwd = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["__scopeId", "data-v-e5e1f63f"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.vue"]]);
  const _sfc_main$t = {
    data() {
      return {};
    },
    onLoad() {
    },
    methods: {
      cancel() {
        uni.navigateBack();
      },
      nextStep() {
        uni.showModal({
          content: "已经仔细阅读注销提示，知晓可能带来的后果，并确认要注销",
          complete: (e) => {
            if (e.confirm) {
              const uniIdco = nr.importObject("uni-id-co");
              uniIdco.closeAccount().then((e2) => {
                uni.showToast({
                  title: "注销成功",
                  duration: 3e3
                });
                uni.removeStorageSync("uni_id_token");
                uni.setStorageSync("uni_id_token_expired", 0);
                uni.navigateTo({
                  url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
                });
              });
            } else {
              uni.navigateBack();
            }
          }
        });
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-content" }, [
      vue.createElementVNode("text", {
        class: "words",
        space: "emsp"
      }, " 一、注销是不可逆操作，注销后:\\n 1.帐号将无法登录、无法找回。\\n 2.帐号所有信息都会清除(个人身份信息、粉丝数等;发布的作品、评论、点赞等;交易信息等)，你 的朋友将无法通过本应用帐号联系你，请自行备份相关 信息和数据。\\n 二、重要提示\\n 1.封禁帐号(永久封禁、社交封禁、直播权限封禁)不能申请注销。\\n 2.注销后，你的身份证、三方帐号(微信、QQ、微博、支付宝)、手机号等绑定关系将解除，解除后可以绑定到其他帐号。\\n 3.注销后，手机号可以注册新的帐号，新帐号不会存在之前帐号的任何信息(作品、粉丝、评论、个人信息等)。\\n 4.注销本应用帐号前，需尽快处理帐号下的资金问题。\\n 5.视具体帐号情况而定，注销最多需要7天。\\n "),
      vue.createElementVNode("view", { class: "button-group" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.nextStep && $options.nextStep(...args)),
          class: "next",
          type: "default"
        }, "下一步"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.cancel && $options.cancel(...args)),
          type: "warn"
        }, "取消")
      ])
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoDeactivateDeactivate = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.vue"]]);
  function checkIdCard(idCardNumber) {
    if (!idCardNumber || typeof idCardNumber !== "string" || idCardNumber.length !== 18)
      return false;
    const coefficient = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCode = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2];
    const code = idCardNumber.substring(17);
    let sum = 0;
    for (let i2 = 0; i2 < 17; i2++) {
      sum += Number(idCardNumber.charAt(i2)) * coefficient[i2];
    }
    return checkCode[sum % 11].toString() === code.toLowerCase();
  }
  const _imports_0$3 = "/assets/face-verify-icon.da277dd7.svg";
  const uniIdCo = nr.importObject("uni-id-co");
  const tempFrvInfoKey = "uni-id-pages-temp-frv";
  const _sfc_main$s = {
    mixins: [mixin],
    data() {
      return {
        realName: "",
        idCard: "",
        certifyId: "",
        verifyFail: false,
        verifyFailCode: 0,
        verifyFailTitle: "",
        verifyFailContent: ""
      };
    },
    computed: {
      userInfo() {
        return store.userInfo;
      },
      certifyIdNext() {
        return Boolean(this.realName) && Boolean(this.idCard) && (this.needAgreements && this.agree);
      },
      isCertify() {
        return this.userInfo.realNameAuth && this.userInfo.realNameAuth.authStatus === 2;
      },
      isDev() {
        return true;
      }
    },
    onLoad() {
      const tempFrvInfo = uni.getStorageSync(tempFrvInfoKey);
      if (tempFrvInfo) {
        this.realName = tempFrvInfo.realName;
        this.idCard = tempFrvInfo.idCard;
      }
    },
    methods: {
      async getCertifyId() {
        if (!this.certifyIdNext)
          return;
        if (!checkIdCard(this.idCard)) {
          uni.showToast({
            title: "身份证不合法",
            icon: "none"
          });
          return;
        }
        if (typeof this.realName !== "string" || this.realName.length < 2 || !/^[\u4e00-\u9fa5]{1,10}(·?[\u4e00-\u9fa5]{1,10}){0,5}$/.test(this.realName)) {
          uni.showToast({
            title: "姓名只能是汉字",
            icon: "none"
          });
          return;
        }
        uni.setStorage({
          key: tempFrvInfoKey,
          data: {
            realName: this.realName,
            idCard: this.idCard
          }
        });
        const metaInfo = uni.getFacialRecognitionMetaInfo();
        const res = await uniIdCo.getFrvCertifyId({
          realName: this.realName,
          idCard: this.idCard,
          metaInfo
        });
        this.certifyId = res.certifyId;
        this.startFacialRecognitionVerify();
      },
      startFacialRecognitionVerify() {
        uni.startFacialRecognitionVerify({
          certifyId: this.certifyId,
          progressBarColor: "#2979ff",
          success: () => {
            this.verifyFail = false;
            this.getFrvAuthResult();
          },
          fail: (e) => {
            let title = "验证失败";
            let content;
            formatAppLog(
              "log",
              "at uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue:152",
              `[frv-debug] certifyId auth error: certifyId -> ${this.certifyId}, error -> ${JSON.stringify(e, null, 4)}`
            );
            switch (e.errCode) {
              case 10001:
                content = "认证ID为空";
                break;
              case 10010:
                title = "刷脸异常";
                content = e.cause.message || "错误代码: 10010";
                break;
              case 10011:
                title = "验证中断";
                content = e.cause.message || "错误代码: 10011";
                break;
              case 10012:
                content = "网络异常";
                break;
              case 10013:
                this.verifyFailCode = e.errCode;
                this.verifyFailContent = e.cause.message || "错误代码: 10013";
                this.getFrvAuthResult();
                formatAppLog(
                  "log",
                  "at uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue:176",
                  `[frv-debug] 刷脸失败, certifyId -> ${this.certifyId}, 如在开发环境请检查用户的姓名、身份证号与刷脸用户是否为同一用户。如遇到认证ID已使用请检查opendb-frv-logs表中certifyId状态`
                );
                return;
              case 10020:
                content = "设备设置时间异常";
                break;
              default:
                title = "";
                content = `验证未知错误 (${e.errCode})`;
                break;
            }
            this.verifyFail = true;
            this.verifyFailCode = e.errCode;
            this.verifyFailTitle = title;
            this.verifyFailContent = content;
          }
        });
      },
      async getFrvAuthResult() {
        const uniIdCo2 = nr.importObject("uni-id-co", {
          customUI: true
        });
        try {
          uni.showLoading({
            title: "验证中...",
            mask: false
          });
          const res = await uniIdCo2.getFrvAuthResult({
            certifyId: this.certifyId
          });
          const {
            errCode,
            ...rest
          } = res;
          if (this.verifyFailContent) {
            formatAppLog("log", "at uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue:216", `[frv-debug] 客户端刷脸失败，由实人认证服务查询具体原因，原因：${this.verifyFailContent}`);
          }
          uni.showModal({
            content: "实名认证成功",
            showCancel: false,
            success: () => {
              mutations.setUserInfo({
                realNameAuth: rest
              });
              this.verifyFail = false;
            }
          });
          uni.removeStorage({
            key: tempFrvInfoKey
          });
        } catch (e) {
          this.verifyFail = true;
          this.verifyFailTitle = e.errMsg;
          formatAppLog("error", "at uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue:236", JSON.stringify(e));
        } finally {
          uni.hideLoading();
        }
      },
      retry() {
        if (this.verifyFailCode !== 10013) {
          this.getCertifyId();
        } else {
          this.verifyFail = false;
        }
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$2);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    const _component_uni_id_pages_agreements = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-agreements"), __easycom_5$2);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $options.isCertify ? (vue.openBlock(), vue.createBlock(_component_uni_list, { key: 0 }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_list_item, {
            class: "item",
            title: "姓名",
            rightText: $options.userInfo.realNameAuth.realName
          }, null, 8, ["rightText"]),
          vue.createVNode(_component_uni_list_item, {
            class: "item",
            title: "身份证号码",
            rightText: $options.userInfo.realNameAuth.identity
          }, null, 8, ["rightText"])
        ]),
        _: 1
        /* STABLE */
      })) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-content"
      }, [
        $data.verifyFail ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 0 },
          [
            vue.createElementVNode("view", { class: "face-icon" }, [
              vue.createElementVNode("image", {
                src: _imports_0$3,
                class: "face-icon-image"
              })
            ]),
            vue.createElementVNode(
              "view",
              { class: "error-title" },
              vue.toDisplayString($data.verifyFailTitle),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "error-description" },
              vue.toDisplayString($data.verifyFailContent),
              1
              /* TEXT */
            ),
            $data.verifyFailCode !== 10013 ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              type: "primary",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.retry && $options.retry(...args))
            }, "重新开始验证")) : (vue.openBlock(), vue.createElementBlock("button", {
              key: 1,
              type: "primary",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.retry && $options.retry(...args))
            }, "返回")),
            $options.isDev ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "dev-tip"
            }, "请在控制台查看详细错误（此提示仅在开发环境展示）")) : vue.createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        )) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            vue.createElementVNode("text", { class: "title" }, "实名认证"),
            vue.createVNode(_component_uni_forms, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms_item, { name: "realName" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      placeholder: "姓名",
                      class: "input-box",
                      modelValue: $data.realName,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.realName = $event),
                      clearable: false
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_forms_item, { name: "idCard" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      placeholder: "身份证号码",
                      class: "input-box",
                      modelValue: $data.idCard,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.idCard = $event),
                      clearable: false
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(
              _component_uni_id_pages_agreements,
              {
                scope: "realNameVerify",
                ref: "agreements",
                style: { "margin-bottom": "20px" }
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createElementVNode("button", {
              type: "primary",
              disabled: !$options.certifyIdNext,
              onClick: _cache[4] || (_cache[4] = (...args) => $options.getCertifyId && $options.getCertifyId(...args))
            }, "确定", 8, ["disabled"])
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ]))
    ]);
  }
  const UniModulesUniIdPagesPagesUserinfoRealnameVerifyRealnameVerify = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__file", "G:/mobile application development/pdd/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.vue"]]);
  const _imports_0$2 = "/static/more.png";
  const _imports_1$3 = "/static/launch.png";
  const _imports_2$3 = "/static/kimi.jpg";
  const _imports_3$2 = "/static/copy.png";
  const _imports_4$1 = "/static/refresh.png";
  const _sfc_main$r = {
    data() {
      return {
        userInput: "",
        messages: [],
        scrollTop: 0,
        apiKey: "sk-22CtNLy8oqB9Kg0scqkWmpSCfd3LnT2NsxxocO2rQC5s8Qc6",
        // 替换为你的Kimi API Key
        apiUrl: "https://api.moonshot.cn/v1/chat/completions",
        showHistory: false,
        userInfo: {},
        lastQuestion: "",
        chatHistory: [
          {
            title: "今天",
            items: []
          },
          {
            title: "昨天",
            items: []
          },
          {
            title: "7天内",
            items: []
          },
          {
            title: "30天内",
            items: []
          }
        ],
        headerTitle: "新对话",
        likedMessages: {},
        dislikedMessages: {},
        feedbackMessage: "",
        showFeedback: false,
        isVoiceEnabled: true,
        // 是否开启语音播放
        voiceUrl: "",
        // 语音播放路径
        isMaleVoice: true,
        // 默认为男声
        voiceRoleId: 1,
        // 默认为男声ID
        isSpeaking: false,
        // 是否正在播放语音
        currentSpeakingIndex: -1,
        // 当前正在播放的消息索引
        audioContext: null,
        // 音频上下文
        pausedMessages: {},
        // 记录哪些消息处于暂停状态
        audioCache: {}
        // 缓存已合成的语音，避免重复请求
      };
    },
    computed: {
      currentVoiceRole() {
        return this.isMaleVoice ? "/static/role-boy.png" : "/static/role-girl.png";
      }
    },
    mounted() {
      this.getUserInfo();
      this.loadChatHistoryFromStorage();
    },
    methods: {
      getUserInfo() {
        if (store.hasLogin) {
          this.userInfo = store.userInfo;
          formatAppLog("log", "at pages/chat/chat.vue:149", this.userInfo);
        }
      },
      toggleHistory() {
        this.showHistory = !this.showHistory;
      },
      copyMessage(content) {
        uni.setClipboardData({
          data: content,
          success: () => {
            uni.showToast({
              title: "复制成功",
              icon: "success"
            });
          }
        });
      },
      loadChatHistoryFromStorage() {
        const history = uni.getStorageSync("chatHistory");
        if (history) {
          this.chatHistory = JSON.parse(history);
        }
      },
      saveChatHistoryToStorage() {
        uni.setStorageSync("chatHistory", JSON.stringify(this.chatHistory));
      },
      addToHistory(question, answer) {
        const today = /* @__PURE__ */ new Date();
        const item = {
          question,
          answer,
          timestamp: today.getTime(),
          messages: [...this.messages]
        };
        this.chatHistory[0].items.unshift(item);
        this.saveChatHistoryToStorage();
      },
      loadChatHistory(item) {
        this.messages = [...item.messages];
        this.showHistory = false;
        this.scrollToBottom();
      },
      async sendMessage() {
        if (!this.userInput.trim())
          return;
        this.lastQuestion = this.userInput;
        this.headerTitle = this.userInput;
        const userMessage = {
          role: "user",
          content: this.userInput
        };
        this.messages.push(userMessage);
        formatAppLog("log", "at pages/chat/chat.vue:204", "Messages after adding user message:", this.messages);
        const userQuestion = this.userInput;
        this.userInput = "";
        const aiMessage = {
          role: "assistant",
          content: "思考中..."
        };
        this.messages.push(aiMessage);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        try {
          const response = await uni.request({
            url: this.apiUrl,
            method: "POST",
            header: {
              Authorization: this.apiKey,
              "Content-Type": "application/json"
            },
            data: {
              model: "moonshot-v1-8k",
              messages: [
                { role: "user", content: userQuestion }
              ]
            }
          });
          if (response.statusCode === 200) {
            const answer = response.data.choices[0].message.content;
            formatAppLog("log", "at pages/chat/chat.vue:237", "回答的内容:", response.data);
            this.messages[this.messages.length - 1].content = answer;
            this.addToHistory(userQuestion, answer);
            if (this.isVoiceEnabled) {
              this.playVoice(answer);
            }
          } else {
            this.messages[this.messages.length - 1].content = `请求失败，状态码: ${response.statusCode}`;
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:249", "请求失败:", error);
          this.messages[this.messages.length - 1].content = "请求失败，请稍后重试";
        }
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      scrollToBottom() {
        const query = uni.createSelectorQuery().in(this);
        query.select(".chat-content").boundingClientRect((data2) => {
          if (data2) {
            this.scrollTop = data2.height * 1e6;
          }
        }).exec();
      },
      startNewChat() {
        this.messages = [];
        this.lastQuestion = "";
        this.scrollTop = 0;
        this.headerTitle = "新对话";
      },
      retryLastQuestion() {
        if (this.lastQuestion.trim()) {
          this.userInput = this.lastQuestion;
          this.sendMessage();
        } else {
          formatAppLog("warn", "at pages/chat/chat.vue:277", "没有可重试的问题");
        }
      },
      formatMarkdown(content) {
        const md = new MarkdownIt();
        return md.render(content);
      },
      likeMessage(index) {
        if (this.likedMessages[index]) {
          this.$set(this.likedMessages, index, false);
          return;
        }
        if (this.dislikedMessages[index]) {
          this.$set(this.dislikedMessages, index, false);
        }
        this.$set(this.likedMessages, index, true);
        this.feedbackMessage = "感谢您的反馈，我会努力做得更好！";
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 3e3);
      },
      dislikeMessage(index) {
        if (this.dislikedMessages[index]) {
          this.$set(this.dislikedMessages, index, false);
          return;
        }
        if (this.likedMessages[index]) {
          this.$set(this.likedMessages, index, false);
        }
        this.$set(this.dislikedMessages, index, true);
        this.feedbackMessage = "感谢您的反馈，我会努力改正！";
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 3e3);
      },
      toggleVoice() {
        this.isVoiceEnabled = !this.isVoiceEnabled;
      },
      toggleVoiceRole() {
        this.isMaleVoice = !this.isMaleVoice;
        this.voiceRoleId = this.isMaleVoice ? 1 : 3;
        this.feedbackMessage = this.isMaleVoice ? "已切换为男声" : "已切换为女声";
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 1500);
      },
      // 暂停当前正在播放的音频
      pauseCurrentAudio() {
        if (this.isSpeaking && this.audioContext && this.currentSpeakingIndex !== -1) {
          const previousIndex = this.currentSpeakingIndex;
          this.audioContext.pause();
          this.$set(this.pausedMessages, previousIndex, true);
          this.feedbackMessage = "已暂停之前的音频";
          this.showFeedback = true;
          setTimeout(() => {
            this.showFeedback = false;
          }, 1500);
          return true;
        }
        return false;
      },
      async playVoice(answer) {
        this.pauseCurrentAudio();
        const voiceApiUrl = `https://xiaoapi.cn/API/zs_tts.php?type=baidu&msg=${encodeURIComponent(answer)}&id=${this.voiceRoleId}`;
        formatAppLog("log", "at pages/chat/chat.vue:373", "语音合成接口URL:", voiceApiUrl);
        try {
          const response = await uni.request({
            url: voiceApiUrl,
            method: "GET"
          });
          formatAppLog("log", "at pages/chat/chat.vue:379", response.data);
          if (response.statusCode === 200 && response.data.code === 200) {
            this.voiceUrl = response.data.tts;
            const messageIndex = this.messages.length - 1;
            this.audioCache[messageIndex] = this.voiceUrl;
            if (this.audioContext) {
              this.audioContext.destroy();
            }
            this.audioContext = uni.createInnerAudioContext();
            this.audioContext.src = this.voiceUrl;
            this.audioContext.play();
            this.currentSpeakingIndex = messageIndex;
            this.isSpeaking = true;
            this.$set(this.pausedMessages, messageIndex, false);
            this.audioContext.onEnded(() => {
              this.isSpeaking = false;
              this.$set(this.pausedMessages, this.currentSpeakingIndex, true);
              this.currentSpeakingIndex = -1;
            });
          } else {
            formatAppLog("error", "at pages/chat/chat.vue:410", "语音合成失败:", response);
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:413", "语音合成请求失败:", error);
        }
      },
      // 修改：控制语音播放/暂停的方法
      toggleSpeech(content, index) {
        if (!this.isSpeaking || this.currentSpeakingIndex !== index) {
          this.pauseCurrentAudio();
          this.synthesizeAndPlaySpeech(content, index);
        } else {
          if (this.audioContext) {
            if (!this.pausedMessages[index]) {
              this.audioContext.pause();
              this.$set(this.pausedMessages, index, true);
              this.feedbackMessage = "已暂停播放";
            } else {
              this.audioContext.play();
              this.$set(this.pausedMessages, index, false);
              this.feedbackMessage = "继续播放";
            }
            this.showFeedback = true;
            setTimeout(() => {
              this.showFeedback = false;
            }, 1500);
          }
        }
      },
      // 修改：合成并播放语音
      async synthesizeAndPlaySpeech(content, index) {
        if (this.audioCache[index]) {
          this.playFromCache(index);
          return;
        }
        const voiceApiUrl = `https://xiaoapi.cn/API/zs_tts.php?type=baidu&msg=${encodeURIComponent(content)}&id=${this.voiceRoleId}`;
        try {
          const response = await uni.request({
            url: voiceApiUrl,
            method: "GET"
          });
          if (response.statusCode === 200 && response.data.code === 200) {
            this.voiceUrl = response.data.tts;
            this.audioCache[index] = this.voiceUrl;
            if (this.audioContext) {
              this.audioContext.destroy();
            }
            this.audioContext = uni.createInnerAudioContext();
            this.audioContext.src = this.voiceUrl;
            this.audioContext.play();
            this.isSpeaking = true;
            this.currentSpeakingIndex = index;
            this.$set(this.pausedMessages, index, false);
            this.audioContext.onEnded(() => {
              this.isSpeaking = false;
              this.$set(this.pausedMessages, index, true);
              this.currentSpeakingIndex = -1;
              this.feedbackMessage = "播放完成";
              this.showFeedback = true;
              setTimeout(() => {
                this.showFeedback = false;
              }, 1500);
            });
            this.feedbackMessage = "正在播放语音";
            this.showFeedback = true;
            setTimeout(() => {
              this.showFeedback = false;
            }, 1500);
          } else {
            formatAppLog("error", "at pages/chat/chat.vue:506", "语音合成失败:", response);
            this.feedbackMessage = "语音合成失败";
            this.showFeedback = true;
            setTimeout(() => {
              this.showFeedback = false;
            }, 1500);
          }
        } catch (error) {
          formatAppLog("error", "at pages/chat/chat.vue:514", "语音合成请求失败:", error);
          this.feedbackMessage = "语音合成请求失败";
          this.showFeedback = true;
          setTimeout(() => {
            this.showFeedback = false;
          }, 1500);
        }
      },
      // 新增：从缓存播放语音
      playFromCache(index) {
        if (this.audioContext) {
          this.audioContext.destroy();
        }
        this.audioContext = uni.createInnerAudioContext();
        this.audioContext.src = this.audioCache[index];
        this.audioContext.play();
        this.isSpeaking = true;
        this.currentSpeakingIndex = index;
        this.$set(this.pausedMessages, index, false);
        this.audioContext.onEnded(() => {
          this.isSpeaking = false;
          this.$set(this.pausedMessages, index, true);
          this.currentSpeakingIndex = -1;
          this.feedbackMessage = "播放完成";
          this.showFeedback = true;
          setTimeout(() => {
            this.showFeedback = false;
          }, 1500);
        });
        this.feedbackMessage = "正在播放语音";
        this.showFeedback = true;
        setTimeout(() => {
          this.showFeedback = false;
        }, 1500);
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 历史记录侧边栏 "),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["history-sidebar", { "show-sidebar": $data.showHistory }])
        },
        [
          vue.createElementVNode("view", { class: "history-content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.chatHistory, (section, sectionIndex) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "history-section",
                  key: sectionIndex
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "history-date" },
                    vue.toDisplayString(section.title),
                    1
                    /* TEXT */
                  ),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(section.items, (item, itemIndex) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "history-item",
                        key: itemIndex,
                        onClick: ($event) => $options.loadChatHistory(item)
                      }, vue.toDisplayString(item.question), 9, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "user-info" }, [
            vue.createElementVNode("image", {
              class: "user-avatar",
              src: $data.userInfo.avatar_file && $data.userInfo.avatar_file.url ? $data.userInfo.avatar_file.url : "/static/default-avatar.png",
              mode: "aspectFill"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "text",
              { class: "user-phone" },
              vue.toDisplayString($data.userInfo.mobile || "173****7441"),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      ),
      vue.createCommentVNode(" 主内容区域 "),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["main-content", { "shift-content": $data.showHistory }])
        },
        [
          vue.createCommentVNode(" 顶部栏 "),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("image", {
              src: _imports_0$2,
              mode: "aspectFit",
              class: "menu-button",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleHistory && $options.toggleHistory(...args))
            }),
            vue.createElementVNode("image", {
              src: _imports_1$3,
              mode: "aspectFit",
              class: "new-chat-button",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.startNewChat && $options.startNewChat(...args))
            }),
            vue.createElementVNode(
              "text",
              { class: "header-title" },
              vue.toDisplayString($data.headerTitle),
              1
              /* TEXT */
            ),
            vue.createElementVNode("image", {
              src: $options.currentVoiceRole,
              mode: "aspectFit",
              class: "voice-role-button",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleVoiceRole && $options.toggleVoiceRole(...args))
            }, null, 8, ["src"]),
            vue.createElementVNode("image", {
              src: $data.isVoiceEnabled ? "/static/voice.png" : "/static/voice-ed.png",
              mode: "aspectFit",
              class: "voice-button",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleVoice && $options.toggleVoice(...args))
            }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 聊天内容区域 "),
          vue.createElementVNode("scroll-view", {
            class: "chat-content",
            "scroll-y": "true",
            "scroll-top": $data.scrollTop,
            "scroll-with-animation": true
          }, [
            $data.messages.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "welcome-screen"
            }, [
              vue.createElementVNode("image", {
                class: "welcome-logo",
                src: _imports_2$3,
                mode: "aspectFit"
              }),
              vue.createElementVNode("view", { class: "welcome-title" }, "嗨！我是 Kimi"),
              vue.createElementVNode("view", { class: "welcome-subtitle" }, " 我可以帮你搜索、答疑、写作，请把你的任务交给我吧~ ")
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "messages-container"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.messages, (message, index) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: index,
                      class: vue.normalizeClass(["message-wrapper", message.role === "user" ? "user-message" : "ai-message"])
                    },
                    [
                      vue.createElementVNode("image", {
                        class: "avatar",
                        src: message.role === "user" ? $data.userInfo.avatar_file && $data.userInfo.avatar_file.url ? $data.userInfo.avatar_file.url : "/static/default-avatar.png" : "/static/kimi.jpg",
                        mode: "aspectFill"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "message-content" }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(message.content),
                          1
                          /* TEXT */
                        ),
                        message.role === "assistant" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "message-actions"
                        }, [
                          vue.createElementVNode("image", {
                            src: _imports_3$2,
                            mode: "aspectFit",
                            class: "action-button",
                            onClick: ($event) => $options.copyMessage(message.content)
                          }, null, 8, ["onClick"]),
                          vue.createElementVNode("image", {
                            src: _imports_4$1,
                            mode: "aspectFit",
                            onClick: _cache[4] || (_cache[4] = (...args) => $options.retryLastQuestion && $options.retryLastQuestion(...args)),
                            class: "action-button"
                          }),
                          vue.createElementVNode("image", {
                            src: $data.likedMessages[index] ? "/static/thumbs-up-ed.png" : "/static/thumbs-up.png",
                            mode: "aspectFit",
                            class: "action-button",
                            onClick: ($event) => $options.likeMessage(index)
                          }, null, 8, ["src", "onClick"]),
                          vue.createElementVNode("image", {
                            src: $data.dislikedMessages[index] ? "/static/thumbs-down-ed.png" : "/static/thumbs-down.png",
                            mode: "aspectFit",
                            class: "action-button",
                            onClick: ($event) => $options.dislikeMessage(index)
                          }, null, 8, ["src", "onClick"]),
                          vue.createCommentVNode(" 修改：语音播放控制按钮 "),
                          vue.createElementVNode("image", {
                            src: $data.pausedMessages[index] ? "/static/time-out.png" : "/static/play.png",
                            mode: "aspectFit",
                            class: "action-button",
                            onClick: ($event) => $options.toggleSpeech(message.content, index)
                          }, null, 8, ["src", "onClick"])
                        ])) : vue.createCommentVNode("v-if", true)
                      ])
                    ],
                    2
                    /* CLASS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])),
            $data.showFeedback ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 2,
                class: "feedback-toast"
              },
              vue.toDisplayString($data.feedbackMessage),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ], 8, ["scroll-top"]),
          vue.createCommentVNode(" 底部输入区域 "),
          vue.createElementVNode("view", { class: "input-section" }, [
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.userInput = $event),
                  placeholder: "给 Kimi 发送消息",
                  "confirm-type": "send",
                  class: "input-field",
                  onConfirm: _cache[6] || (_cache[6] = (...args) => $options.sendMessage && $options.sendMessage(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.userInput]
              ]),
              vue.createElementVNode(
                "button",
                {
                  class: vue.normalizeClass(["send-button", { "send-button-active": $data.userInput.trim() }]),
                  onClick: _cache[7] || (_cache[7] = (...args) => $options.sendMessage && $options.sendMessage(...args))
                },
                " 发送 ",
                2
                /* CLASS */
              )
            ])
          ])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const PagesChatChat = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["__scopeId", "data-v-0a633310"], ["__file", "G:/mobile application development/pdd/pages/chat/chat.vue"]]);
  const _imports_0$1 = "/static/user-icon.png";
  const _imports_2$2 = "/static/address.png";
  const _imports_2$1 = "/static/coupon.png";
  const _imports_3$1 = "/static/set.png";
  const _imports_4 = "/static/wallet.png";
  const _imports_5 = "/static/share.png";
  const _imports_6 = "/static/shipping.png";
  const _imports_7 = "/static/delivery.png";
  const _imports_8 = "/static/star.png";
  const _imports_9 = "/static/heart.png";
  const _imports_3 = "/static/wallet-red.png";
  const _imports_11 = "/static/history.png";
  const _imports_12 = "/static/refund.png";
  const _sfc_main$q = {
    computed: {
      userInfo() {
        return store.userInfo;
      }
    },
    data() {
      return {
        allGoods: [],
        randomGoods: [],
        orderCounts: {
          1: 0,
          // 待付款
          2: 0,
          // 待分享
          3: 0,
          // 待发货
          4: 0,
          // 待收货
          5: 0
          // 评价
        }
      };
    },
    onLoad() {
      this.getGoods();
    },
    onShow() {
      this.fetchOrderCounts();
    },
    methods: {
      async getGoods() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("mall-goods").get();
          this.allGoods = data2 || [];
          this.randomGoods = this.getRandomGoods(16);
        } catch (err2) {
          formatAppLog("error", "at pages/user/user.vue:180", "获取商品数据失败:", err2);
        }
      },
      getRandomGoods(count) {
        const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
        return shuffledGoods.slice(0, count);
      },
      async fetchOrderCounts() {
        if (!store.userInfo || !store.userInfo._id)
          return;
        try {
          const db2 = nr.database();
          const [
            pendingPaymentResult,
            pendingShareResult,
            pendingShippingResult,
            pendingReceivingResult,
            pendingReviewResult
          ] = await Promise.all([
            db2.collection("order").where({ userId: store.userInfo._id, paymentStatus: 0 }).count(),
            db2.collection("order").where({ userId: store.userInfo._id, paymentStatus: 1, shareStatus: 0 }).count(),
            db2.collection("order").where({ userId: store.userInfo._id, paymentStatus: 1, shippingStatus: 0 }).count(),
            db2.collection("order").where({ userId: store.userInfo._id, shippingStatus: 1, deliveryStatus: 0 }).count(),
            db2.collection("order").where({
              userId: store.userInfo._id,
              deliveryStatus: 1,
              review: db2.command.exists(false)
            }).count()
          ]);
          this.orderCounts = {
            1: pendingPaymentResult.result.total,
            2: pendingShareResult.result.total,
            3: pendingShippingResult.result.total,
            4: pendingReceivingResult.result.total,
            5: pendingReviewResult.result.total
          };
        } catch (error) {
          formatAppLog("error", "at pages/user/user.vue:222", "获取订单数量失败:", error);
        }
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            formatAppLog("log", "at pages/user/user.vue:231", "商品信息存储成功", item);
          }
        });
        uni.navigateTo({
          url: "../search/mall-details"
        });
      },
      navigateToAddress() {
        uni.navigateTo({
          url: "/pages/address/address"
        });
      },
      viewAllOrders() {
        uni.navigateTo({
          url: "/pages/user/order"
        });
      },
      navigateToOrder(type) {
        uni.navigateTo({
          url: `/pages/user/order?type=${type}`
        });
      },
      goSet() {
        uni.navigateTo({
          url: "/pages/user/set"
        });
      },
      navigateToFeature(feature) {
        const routes = {
          favor: "/pages/malls-manage/favor",
          wallet: "/pages/wallet/wallet",
          coupon: "/pages/coupon/coupon-list",
          history: "/pages/malls-manage/history",
          refund: "/pages/orders/refund-list"
        };
        uni.navigateTo({
          url: routes[feature]
        });
      },
      goSet() {
        uni.navigateTo({
          url: "/pages/user/set"
        });
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_id_pages_avatar = resolveEasycom(vue.resolveDynamicComponent("uni-id-pages-avatar"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 状态栏占位 "),
      vue.createElementVNode("view", { class: "status-bar" }),
      vue.createCommentVNode(" 用户信息头部 "),
      vue.createElementVNode("view", { class: "user-header" }, [
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode("view", { class: "avatar-wrapper" }, [
            vue.createVNode(_component_uni_id_pages_avatar, {
              width: "100rpx",
              height: "100rpx"
            })
          ]),
          vue.createElementVNode("view", { class: "user-meta" }, [
            vue.createElementVNode("view", { class: "nickname-row" }, [
              vue.createElementVNode("image", {
                src: _imports_0$1,
                mode: "aspectFit",
                class: "wechat-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "nickname" },
                vue.toDisplayString($options.userInfo.username || "您的昵称"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "address",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.goSet && $options.goSet(...args))
            }, [
              vue.createElementVNode("image", {
                src: _imports_2$2,
                mode: "aspectFit",
                class: "wechat-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "address-text" },
                vue.toDisplayString($options.userInfo.address && $options.userInfo.address.length > 6 ? $options.userInfo.address.substr(0, 6) + "..." : $options.userInfo.address || "收货地址"),
                1
                /* TEXT */
              )
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "header-buttons" }, [
          vue.createElementVNode("view", { class: "pindan-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_2$1,
              mode: "aspectFit",
              class: "settings-icon"
            }),
            vue.createElementVNode("text", null, "拼单返券")
          ]),
          vue.createElementVNode("view", { class: "pindan-btn" }, [
            vue.createElementVNode("image", {
              src: _imports_3$1,
              mode: "aspectFit",
              class: "settings-icon",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.goSet && $options.goSet(...args))
            }),
            vue.createElementVNode("text", null, "设置")
          ])
        ])
      ]),
      vue.createCommentVNode(" 月卡提示 "),
      vue.createElementVNode("view", { class: "monthly-card" }, [
        vue.createElementVNode("text", { class: "card-title" }, "省钱月卡"),
        vue.createElementVNode("text", { class: "card-desc" }, "到账提醒: 124元补贴待领 >")
      ]),
      vue.createCommentVNode(" 订单区域 "),
      vue.createElementVNode("view", { class: "orders-section" }, [
        vue.createElementVNode("view", { class: "orders-header" }, [
          vue.createElementVNode("text", { class: "title" }, "我的订单"),
          vue.createElementVNode("view", {
            class: "view-all",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.viewAllOrders && $options.viewAllOrders(...args))
          }, [
            vue.createElementVNode("text", null, "查看全部"),
            vue.createElementVNode("text", { class: "arrow" }, ">")
          ])
        ]),
        vue.createElementVNode("view", { class: "order-status" }, [
          vue.createElementVNode("view", {
            class: "status-item",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.navigateToOrder("pending"))
          }, [
            vue.createElementVNode("view", { class: "icon-wrapper" }, [
              vue.createElementVNode("image", {
                src: _imports_4,
                mode: "aspectFit",
                class: "status-icon"
              }),
              $data.orderCounts[1] > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "badge"
                },
                vue.toDisplayString($data.orderCounts[1]),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("text", null, "待付款")
          ]),
          vue.createElementVNode("view", {
            class: "status-item",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.navigateToOrder("share"))
          }, [
            vue.createElementVNode("view", { class: "icon-wrapper" }, [
              vue.createElementVNode("image", {
                src: _imports_5,
                mode: "aspectFit",
                class: "status-icon"
              }),
              $data.orderCounts[2] > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "badge"
                },
                vue.toDisplayString($data.orderCounts[2]),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("text", null, "待分享")
          ]),
          vue.createElementVNode("view", {
            class: "status-item",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.navigateToOrder("shipping"))
          }, [
            vue.createElementVNode("view", { class: "icon-wrapper" }, [
              vue.createElementVNode("image", {
                src: _imports_6,
                mode: "aspectFit",
                class: "status-icon"
              }),
              $data.orderCounts[3] > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "badge"
                },
                vue.toDisplayString($data.orderCounts[3]),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("text", null, "待发货")
          ]),
          vue.createElementVNode("view", {
            class: "status-item",
            onClick: _cache[6] || (_cache[6] = ($event) => $options.navigateToOrder("receiving"))
          }, [
            vue.createElementVNode("view", { class: "icon-wrapper" }, [
              vue.createElementVNode("image", {
                src: _imports_7,
                mode: "aspectFit",
                class: "status-icon"
              }),
              $data.orderCounts[4] > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "badge"
                },
                vue.toDisplayString($data.orderCounts[4]),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("text", null, "待收货")
          ]),
          vue.createElementVNode("view", {
            class: "status-item",
            onClick: _cache[7] || (_cache[7] = ($event) => $options.navigateToOrder("review"))
          }, [
            vue.createElementVNode("view", { class: "icon-wrapper" }, [
              vue.createElementVNode("image", {
                src: _imports_8,
                mode: "aspectFit",
                class: "status-icon"
              }),
              $data.orderCounts[5] > 0 ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: "badge"
                },
                vue.toDisplayString($data.orderCounts[5]),
                1
                /* TEXT */
              )) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("text", null, "评价")
          ])
        ])
      ]),
      vue.createCommentVNode(" 功能按钮区 "),
      vue.createElementVNode("view", { class: "features-section" }, [
        vue.createElementVNode("view", {
          class: "feature-item",
          onClick: _cache[8] || (_cache[8] = ($event) => $options.navigateToFeature("favor"))
        }, [
          vue.createElementVNode("image", {
            src: _imports_9,
            mode: "aspectFit",
            class: "feature-icon"
          }),
          vue.createElementVNode("text", null, "商品收藏")
        ]),
        vue.createElementVNode("view", {
          class: "feature-item",
          onClick: _cache[9] || (_cache[9] = ($event) => $options.navigateToFeature("wallet"))
        }, [
          vue.createElementVNode("image", {
            src: _imports_3,
            mode: "aspectFit",
            class: "feature-icon"
          }),
          vue.createElementVNode("text", null, "多多钱包")
        ]),
        vue.createElementVNode("view", {
          class: "feature-item",
          onClick: _cache[10] || (_cache[10] = ($event) => $options.navigateToFeature("coupon"))
        }, [
          vue.createElementVNode("image", {
            src: _imports_2$1,
            mode: "aspectFit",
            class: "feature-icon"
          }),
          vue.createElementVNode("text", null, "优惠券")
        ]),
        vue.createElementVNode("view", {
          class: "feature-item",
          onClick: _cache[11] || (_cache[11] = ($event) => $options.navigateToFeature("history"))
        }, [
          vue.createElementVNode("image", {
            src: _imports_11,
            mode: "aspectFit",
            class: "feature-icon"
          }),
          vue.createElementVNode("text", null, "历史浏览")
        ]),
        vue.createElementVNode("view", {
          class: "feature-item",
          onClick: _cache[12] || (_cache[12] = ($event) => $options.navigateToFeature("refund"))
        }, [
          vue.createElementVNode("image", {
            src: _imports_12,
            mode: "aspectFit",
            class: "feature-icon"
          }),
          vue.createElementVNode("text", null, "退款售后")
        ])
      ]),
      vue.createCommentVNode(" 修改后的商品列表，与第一个页面完全一致 "),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "tab-content" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.randomGoods, (item, index) => {
              var _a;
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "content-item",
                onClick: ($event) => $options.navigateToProduct(item)
              }, [
                vue.createElementVNode("view", { class: "product-card" }, [
                  vue.createElementVNode("image", {
                    class: "item-image",
                    src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                    mode: "aspectFit",
                    "lazy-load": true
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "product-info" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "item-title" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "service-tags" }, [
                      vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                      vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                    ]),
                    vue.createElementVNode("view", { class: "price-row" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "price" },
                        "¥" + vue.toDisplayString(item.price),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "sales" },
                        "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["__scopeId", "data-v-0f7520f0"], ["__file", "G:/mobile application development/pdd/pages/user/user.vue"]]);
  const _imports_0 = "/static/left.png";
  const _sfc_main$p = {
    data() {
      return {
        searchPlaceholder: "请输入商品信息",
        allGoods: [],
        randomGoods: [],
        searchKeyword: "",
        // 用于绑定搜索框输入内容
        recentSearches: [],
        // 最近搜索记录
        searchSuggestions: []
        // 搜索发现的关键词
      };
    },
    onLoad() {
      this.getGoods();
      this.loadRecentSearches();
    },
    methods: {
      async getGoods() {
        try {
          const { result: { data: data2 } } = await nr.database().collection("mall-goods").get();
          this.allGoods = data2 || [];
          this.randomGoods = this.getRandomGoods(16);
          if (this.allGoods.length > 0) {
            this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
          }
          this.generateSearchSuggestions();
        } catch (err2) {
          formatAppLog("error", "at pages/search/search.vue:107", "获取商品数据失败:", err2);
        }
      },
      getRandomGoods(count) {
        const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
        return shuffledGoods.slice(0, count);
      },
      generateSearchSuggestions() {
        const allKeywords = this.allGoods.flatMap((item) => item.keywords.split(","));
        const uniqueKeywords = [...new Set(allKeywords)];
        this.searchSuggestions = uniqueKeywords.slice(0, 16);
      },
      navBack() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      },
      focusSearch() {
        this.searchKeyword = "";
      },
      handleSearch() {
        const keyword = this.searchKeyword.trim();
        if (!keyword) {
          uni.showToast({
            title: "请输入搜索关键词",
            icon: "none"
          });
          return;
        }
        this.addRecentSearch(keyword);
        this.navigateToSearch(keyword);
      },
      navigateToSearchWithTag(keyword) {
        this.addRecentSearch(keyword);
        this.navigateToSearch(keyword);
      },
      addRecentSearch(keyword) {
        if (!this.recentSearches.includes(keyword)) {
          this.recentSearches.unshift(keyword);
          if (this.recentSearches.length > 10) {
            this.recentSearches.pop();
          }
          uni.setStorageSync("recentSearches", this.recentSearches);
        }
      },
      navigateToSearch(keyword) {
        uni.navigateTo({
          url: `/pages/search/mall-list?keyword=${encodeURIComponent(keyword)}`
        });
      },
      loadRecentSearches() {
        const savedSearches = uni.getStorageSync("recentSearches") || [];
        this.recentSearches = [...savedSearches];
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            formatAppLog("log", "at pages/search/search.vue:169", "商品信息存储成功", item);
          }
        });
        uni.navigateTo({
          url: "../search/mall-details"
        });
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 固定头部搜索框 "),
      vue.createElementVNode("view", { class: "fixed-head" }, [
        vue.createElementVNode("view", { class: "search-container" }, [
          vue.createElementVNode("image", {
            class: "search-icon",
            src: _imports_0,
            mode: "aspectFit",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
          }),
          vue.createElementVNode("view", {
            class: "search-box",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.focusSearch && $options.focusSearch(...args))
          }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              placeholder: $data.searchPlaceholder,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.searchKeyword = $event),
              onKeyup: _cache[2] || (_cache[2] = vue.withKeys((...args) => $options.handleSearch && $options.handleSearch(...args), ["enter"]))
            }, null, 40, ["placeholder"]), [
              [vue.vModelText, $data.searchKeyword]
            ]),
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_2$5,
              mode: "aspectFit"
            })
          ]),
          vue.createElementVNode("image", {
            class: "search-icon",
            src: _imports_1$5,
            mode: "aspectFit",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.handleSearch && $options.handleSearch(...args))
          })
        ])
      ]),
      vue.createCommentVNode(" 滚动内容区域 "),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "scroll-container"
      }, [
        vue.createCommentVNode(" 最近搜索区域 "),
        $data.recentSearches.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "recent-search"
        }, [
          vue.createElementVNode("text", { class: "section-title" }, "最近搜索"),
          vue.createElementVNode("view", { class: "tag-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.recentSearches, (tag, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "tag-item",
                  key: index,
                  onClick: ($event) => $options.navigateToSearchWithTag(tag)
                }, vue.toDisplayString(tag), 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" 搜索发现区域 "),
        vue.createElementVNode("view", { class: "search-discovery" }, [
          vue.createElementVNode("text", { class: "section-title" }, "搜索发现"),
          vue.createElementVNode("view", { class: "tag-container" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.searchSuggestions, (tag, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "tag-item",
                  key: index,
                  onClick: ($event) => $options.navigateToSearchWithTag(tag)
                }, vue.toDisplayString(tag), 9, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createCommentVNode(" 内容区域 "),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createElementVNode("view", { class: "tab-content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.randomGoods, (item, index) => {
                var _a;
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "content-item"
                }, [
                  vue.createElementVNode("view", {
                    class: "product-card",
                    onClick: ($event) => $options.navigateToProduct(item)
                  }, [
                    vue.createElementVNode("image", {
                      class: "item-image",
                      src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                      mode: "aspectFit"
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "item-title" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "service-tags" }, [
                        vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                        vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                      ]),
                      vue.createElementVNode("view", { class: "price-row" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "price" },
                          "¥" + vue.toDisplayString(item.price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "sales" },
                          "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ], 8, ["onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          $data.randomGoods.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "loading"
          }, "加载中...")) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-c10c040c"], ["__file", "G:/mobile application development/pdd/pages/search/search.vue"]]);
  const _sfc_main$o = {
    data() {
      return {
        refreshing: false,
        searchPlaceholder: "请输入商品信息",
        searchKeyword: "",
        allGoods: [],
        matchedGoods: [],
        randomGoods: []
      };
    },
    onLoad(options) {
      if (options.keyword) {
        this.searchKeyword = decodeURIComponent(options.keyword);
        this.searchGoods();
      } else {
        this.getRandomGoods();
      }
    },
    methods: {
      async onPullDownRefresh() {
        this.refreshing = true;
        await this.searchGoods();
        this.refreshing = false;
      },
      async getGoods() {
        try {
          const { result: { data: data2 } } = await nr.database().collection("mall-goods").get();
          this.allGoods = data2 || [];
          if (this.allGoods.length > 0) {
            this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
          }
        } catch (err2) {
          formatAppLog("error", "at pages/search/mall-list.vue:109", "获取商品数据失败:", err2);
        }
      },
      async searchGoods() {
        await this.getGoods();
        this.matchedGoods = this.allGoods.filter(
          (item) => item.keywords && item.keywords.split("").some((char) => this.searchKeyword.includes(char))
        );
        if (this.matchedGoods.length === 0) {
          this.getRandomGoods(10);
        }
      },
      getRandomGoods(count = 10) {
        const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
        this.randomGoods = shuffledGoods.slice(0, count);
      },
      navBack() {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      },
      navigateToSearch() {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            formatAppLog("log", "at pages/search/mall-list.vue:142", "商品信息存储成功", item);
          }
        });
        uni.navigateTo({
          url: "../search/mall-details"
        });
      }
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 固定头部搜索框 "),
      vue.createElementVNode("view", { class: "fixed-head" }, [
        vue.createElementVNode("view", { class: "search-container" }, [
          vue.createElementVNode("image", {
            class: "search-icon",
            src: _imports_0,
            mode: "aspectFit",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
          }),
          vue.createElementVNode("view", {
            class: "search-box",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.navigateToSearch && $options.navigateToSearch(...args))
          }, [
            vue.withDirectives(vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.searchKeyword = $event),
              placeholder: $data.searchPlaceholder
            }, null, 8, ["placeholder"]), [
              [vue.vModelText, $data.searchKeyword]
            ]),
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_2$5,
              mode: "aspectFit"
            })
          ]),
          vue.createElementVNode("image", {
            class: "search-icon",
            src: _imports_1$5,
            mode: "aspectFit",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.searchGoods && $options.searchGoods(...args))
          })
        ])
      ]),
      vue.createCommentVNode(" 内容区域 "),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        "refresher-enabled": "",
        "refresher-triggered": $data.refreshing,
        onRefresherrefresh: _cache[4] || (_cache[4] = (...args) => $options.onPullDownRefresh && $options.onPullDownRefresh(...args)),
        class: "scroll-container"
      }, [
        vue.createElementVNode("view", { class: "content" }, [
          $data.matchedGoods.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tab-content"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.matchedGoods, (item, index) => {
                var _a;
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "content-item"
                }, [
                  vue.createElementVNode("view", {
                    class: "product-card",
                    onClick: ($event) => $options.navigateToProduct(item)
                  }, [
                    vue.createElementVNode("image", {
                      class: "item-image",
                      src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                      mode: "aspectFit"
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "item-title" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "service-tags" }, [
                        vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                        vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                      ]),
                      vue.createElementVNode("view", { class: "price-row" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "price" },
                          "¥" + vue.toDisplayString(item.price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "sales" },
                          "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ], 8, ["onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "no-results"
          }, [
            vue.createElementVNode("text", { class: "no-results-text" }, "暂时没有相关商品，请尝试搜索其他关键字或联系管理员更新，管理员：杨迪qq：3349476867"),
            vue.createElementVNode("text", { class: "other-recommendations" }, "其他优质商品推荐:"),
            vue.createElementVNode("view", { class: "tab-content" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.randomGoods, (item, index) => {
                  var _a;
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: "content-item"
                  }, [
                    vue.createElementVNode("view", {
                      class: "product-card",
                      onClick: ($event) => $options.navigateToProduct(item)
                    }, [
                      vue.createElementVNode("image", {
                        class: "item-image",
                        src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                        mode: "aspectFit"
                      }, null, 8, ["src"]),
                      vue.createElementVNode("view", { class: "product-info" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "item-title" },
                          vue.toDisplayString(item.name),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "service-tags" }, [
                          vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                          vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                        ]),
                        vue.createElementVNode("view", { class: "price-row" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(item.price),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "sales" },
                            "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ], 8, ["onClick"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]))
        ])
      ], 40, ["refresher-triggered"])
    ]);
  }
  const PagesSearchMallList = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-5301cf09"], ["__file", "G:/mobile application development/pdd/pages/search/mall-list.vue"]]);
  const _imports_1$2 = "/static/user-icon.png";
  const _sfc_main$n = {
    data() {
      return {
        currentSwiperIndex: 0,
        goodsInfo: {
          reviews: []
          // 初始化为空数组，避免未定义
        },
        countdownTime: "00:00:00",
        countdownSeconds: 0,
        countdownInterval: null,
        countdownEndTime: 0,
        isLoading: true,
        showBuyPopup: false,
        quantity: 1,
        isFavorite: false,
        successMessage: "",
        errorMessage: "",
        mapUrl: "",
        locationInfo: null,
        isLoadingMap: false,
        key: "21bbea8854ce73ebd9163d7cf6cc9c76"
        // 高德地图API key
      };
    },
    async onLoad(options) {
      this.isLoading = true;
      this.initCountdown();
      await this.loadGoodsInfo(options);
      await this.checkFavoriteStatus();
      formatAppLog("log", "at pages/search/mall-details.vue:241", "Initial userInfo:", store.userInfo);
      await this.addToHistory();
    },
    onShow() {
      const paymentSuccess = uni.getStorageSync("paymentSuccess");
      if (paymentSuccess) {
        uni.removeStorageSync("paymentSuccess");
        uni.showToast({
          title: "支付成功",
          icon: "success"
        });
        this.hidePopup();
      }
    },
    computed: {
      userInfo() {
        return store.userInfo;
      }
    },
    methods: {
      async loadGoodsInfo(options) {
        this.isLoading = true;
        try {
          let productId = options == null ? void 0 : options.id;
          if (!productId) {
            const cachedProduct = uni.getStorageSync("currentProduct");
            if (cachedProduct && cachedProduct._id) {
              productId = cachedProduct._id;
            }
          }
          if (productId) {
            const db2 = nr.database();
            const result = await db2.collection("mall-goods").doc(productId).get();
            if (result) {
              this.goodsInfo = Array.isArray(result.result.data) ? result.result.data[0] : result.result.data;
              formatAppLog("log", "at pages/search/mall-details.vue:285", "商品数据", this.goodsInfo);
              if (!this.goodsInfo.reviews) {
                this.goodsInfo.reviews = [];
              }
              uni.setStorageSync("currentProduct", this.goodsInfo);
            }
          } else {
            formatAppLog("error", "at pages/search/mall-details.vue:297", "无法获取商品ID");
          }
        } catch (e) {
          formatAppLog("error", "at pages/search/mall-details.vue:300", "获取商品信息失败:", e);
        } finally {
          this.isLoading = false;
        }
      },
      onSwiperChange(e) {
        this.currentSwiperIndex = e.detail.current;
      },
      // 初始化倒计时
      initCountdown() {
        const savedEndTime = uni.getStorageSync("countdownEndTime");
        const now = Math.floor(Date.now() / 1e3);
        if (savedEndTime && savedEndTime > now) {
          this.countdownEndTime = savedEndTime;
          this.startCountdown();
        } else {
          this.createNewCountdown();
        }
      },
      // 创建新的倒计时
      createNewCountdown() {
        const minutes = [5, 10, 15][Math.floor(Math.random() * 3)];
        this.countdownSeconds = minutes * 60;
        this.countdownEndTime = Math.floor(Date.now() / 1e3) + this.countdownSeconds;
        uni.setStorageSync("countdownEndTime", this.countdownEndTime);
        this.startCountdown();
      },
      // 开始倒计时
      startCountdown() {
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
        }
        this.updateCountdownDisplay();
        this.countdownInterval = setInterval(() => {
          this.updateCountdownDisplay();
        }, 1e3);
      },
      // 更新倒计时显示
      updateCountdownDisplay() {
        const now = Math.floor(Date.now() / 1e3);
        const remainingTime = this.countdownEndTime - now;
        if (remainingTime <= 0) {
          this.countdownTime = "00:00:00";
          clearInterval(this.countdownInterval);
          this.countdownInterval = null;
        } else {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor(remainingTime % 3600 / 60);
          const seconds = remainingTime % 60;
          this.countdownTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }
      },
      goAllReviews() {
        if (this.goodsInfo.reviews.length > 0) {
          uni.setStorageSync("currentProductReviews", this.goodsInfo.reviews);
          uni.navigateTo({
            url: `/pages/search/AllReviews?id=${this.goodsInfo._id}`
          });
        } else {
          uni.showToast({
            title: "本商品暂无评价",
            icon: "none"
          });
        }
      },
      async checkFavoriteStatus() {
        if (!store.userInfo || !this.goodsInfo)
          return;
        const db2 = nr.database();
        const favorCollection = db2.collection("favor");
        const result = await favorCollection.where({
          userId: store.userInfo._id,
          productId: this.goodsInfo._id
        }).get();
        this.isFavorite = result.result.data.length > 0;
      },
      async addToHistory() {
        if (!this.goodsInfo || !store.userInfo) {
          formatAppLog("warn", "at pages/search/mall-details.vue:388", "商品信息或用户信息为空，无法记录到历史浏览");
          return;
        }
        const db2 = nr.database();
        const historyCollection = db2.collection("history");
        try {
          const queryResult = await historyCollection.where({
            userId: store.userInfo._id,
            productId: this.goodsInfo._id
          }).get();
          if (queryResult.result.data.length === 0) {
            await historyCollection.add({
              userId: store.userInfo._id,
              productId: this.goodsInfo._id
            });
            formatAppLog("log", "at pages/search/mall-details.vue:407", "商品已记录到历史浏览");
          } else {
            formatAppLog("log", "at pages/search/mall-details.vue:409", "商品已存在于历史浏览中");
          }
        } catch (error) {
          formatAppLog("error", "at pages/search/mall-details.vue:412", "记录商品到历史浏览失败", error);
        }
      },
      async toggleFavorite() {
        if (!store.userInfo || !this.goodsInfo) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        if (this.isFavorite) {
          await this.removeFromFavorites();
        } else {
          await this.addToFavorites();
        }
        this.isFavorite = !this.isFavorite;
      },
      async addToFavorites() {
        const db2 = nr.database();
        const favorTable = db2.collection("favor");
        try {
          await favorTable.add({
            userId: store.userInfo._id,
            productId: this.goodsInfo._id
          });
          this.successMessage = "收藏成功";
          this.errorMessage = "";
          uni.showToast({
            title: this.successMessage,
            icon: "success"
          });
        } catch (error) {
          this.errorMessage = error.message || "收藏失败，请检查网络";
          this.successMessage = "";
          uni.showToast({
            title: this.errorMessage,
            icon: "none"
          });
        }
      },
      async removeFromFavorites() {
        const db2 = nr.database();
        const favorTable = db2.collection("favor");
        try {
          await favorTable.where({
            userId: store.userInfo._id,
            productId: this.goodsInfo._id
          }).remove();
          this.successMessage = "取消收藏成功";
          this.errorMessage = "";
          uni.showToast({
            title: this.successMessage,
            icon: "success"
          });
        } catch (error) {
          this.errorMessage = error.message || "取消收藏失败，请检查网络";
          this.successMessage = "";
          uni.showToast({
            title: this.errorMessage,
            icon: "none"
          });
        }
      },
      maskPhone(phone) {
        if (!phone)
          return "";
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      },
      showPopup() {
        this.showBuyPopup = true;
        this.getLocationByIP();
      },
      hidePopup() {
        this.showBuyPopup = false;
      },
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      async handlePayment() {
        if (!this.userInfo) {
          uni.showToast({
            title: "请先登录",
            icon: "none"
          });
          return;
        }
        const paymentData = {
          amount: (this.goodsInfo.group_price || this.goodsInfo.price) * this.quantity,
          username: this.userInfo.username,
          mobile: this.userInfo.mobile,
          avatar: this.userInfo.avatar_file.url || "/static/avatar-default.png",
          productId: this.goodsInfo._id,
          productName: this.goodsInfo.name,
          productImage: this.goodsInfo.goods_thumb.fileID,
          quantity: this.quantity,
          userId: this.userInfo._id
        };
        formatAppLog("log", "at pages/search/mall-details.vue:522", "支付数据", paymentData);
        uni.setStorageSync("paymentData", paymentData);
        const db2 = nr.database();
        const orderCollection = db2.collection("order");
        try {
          const orderResult = await orderCollection.add({
            userId: this.userInfo._id,
            productId: [this.goodsInfo._id],
            productName: this.goodsInfo.name,
            productImage: this.goodsInfo.goods_thumb.fileID,
            quantity: this.quantity,
            amount: paymentData.amount,
            paymentStatus: 0,
            shareStatus: 0,
            shippingStatus: 0,
            deliveryStatus: 0,
            reviewStatus: 0
          });
          if (orderResult && orderResult.result && orderResult.result.id) {
            uni.setStorageSync("currentOrderIds", [orderResult.result.id]);
            uni.navigateTo({
              url: "/pages/wallet/pay"
            });
          } else {
            formatAppLog("error", "at pages/search/mall-details.vue:550", "订单创建成功，但未返回有效的 orderResult");
            uni.showToast({
              title: "创建订单失败，请重试",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/search/mall-details.vue:557", "创建订单失败:", error);
          uni.showToast({
            title: "创建订单失败，请重试",
            icon: "none"
          });
        }
      },
      convertToBannerArray(bannerImg) {
        if (typeof bannerImg === "object" && bannerImg !== null && !Array.isArray(bannerImg)) {
          return [bannerImg];
        } else {
          return bannerImg || [];
        }
      },
      navBack() {
        uni.navigateBack();
      },
      goSet() {
        uni.navigateTo({
          url: "/pages/user/set"
        });
      },
      async getLocationByIP() {
        this.isLoadingMap = true;
        try {
          const ipRes = await this.getIPLocation();
          formatAppLog("log", "at pages/search/mall-details.vue:583", "定位信息:", ipRes);
          this.locationInfo = ipRes.data;
          let originalLng = 0, originalLat = 0;
          if (ipRes.data.rectangle) {
            const rectangles = ipRes.data.rectangle.split(";");
            if (rectangles.length > 0) {
              const center = rectangles[0].split(",");
              originalLng = parseFloat(center[0]).toFixed(5);
              originalLat = parseFloat(center[1]).toFixed(5);
              let correctedLng = parseFloat(originalLng) + 0.43914;
              let correctedLat = parseFloat(originalLat) + 0.15293;
              this.mapUrl = `https://restapi.amap.com/v3/staticmap?location=${correctedLng},${correctedLat}&zoom=14&size=600*300&markers=mid,,A:${correctedLng},${correctedLat}&key=${this.key}`;
            }
          }
        } catch (error) {
          formatAppLog("error", "at pages/search/mall-details.vue:600", "定位失败:", error);
        } finally {
          this.isLoadingMap = false;
        }
      },
      getIPLocation() {
        return new Promise((resolve, reject) => {
          uni.request({
            url: `https://restapi.amap.com/v3/ip?key=${this.key}`,
            success: (res) => {
              if (res.data.status === "1") {
                resolve(res);
              } else {
                reject(new Error(res.data.info || "定位失败"));
              }
            },
            fail: (err2) => {
              reject(err2);
            }
          });
        });
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" Loading State "),
      $data.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "loading"
      }, [
        vue.createElementVNode("text", null, "商品信息加载中...")
      ])) : $data.goodsInfo ? (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createCommentVNode(" 商品详情内容 "),
          vue.createElementVNode("view", null, [
            vue.createCommentVNode(" 返回图标 "),
            vue.createElementVNode("view", { class: "back-icon-container" }, [
              vue.createElementVNode("image", {
                class: "back-icon",
                src: _imports_0,
                onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
              })
            ]),
            vue.createCommentVNode(" 修改后的轮播图部分 "),
            vue.createElementVNode("view", { class: "banner-container" }, [
              vue.createElementVNode(
                "swiper",
                {
                  class: "banner",
                  circular: "",
                  "indicator-dots": false,
                  autoplay: true,
                  interval: "3000",
                  duration: "1000",
                  onChange: _cache[1] || (_cache[1] = (...args) => $options.onSwiperChange && $options.onSwiperChange(...args))
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($options.convertToBannerArray($data.goodsInfo.goods_banner_imgs), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                        vue.createElementVNode("image", {
                          src: item.url,
                          mode: "aspectFill",
                          class: "banner-image"
                        }, null, 8, ["src"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                32
                /* NEED_HYDRATION */
              ),
              vue.createCommentVNode(" 将指示器移到swiper外部 "),
              vue.createElementVNode(
                "view",
                { class: "custom-indicator" },
                vue.toDisplayString($data.currentSwiperIndex + 1) + "/" + vue.toDisplayString($options.convertToBannerArray($data.goodsInfo.goods_banner_imgs).length),
                1
                /* TEXT */
              )
            ]),
            vue.createCommentVNode(" 价格营销信息 "),
            vue.createElementVNode("view", { class: "price-marketing" }, [
              vue.createElementVNode("view", { class: "price-section-container" }, [
                vue.createElementVNode("view", { class: "price-section" }, [
                  vue.createElementVNode("text", { class: "currency" }, "¥"),
                  vue.createElementVNode(
                    "text",
                    { class: "price" },
                    vue.toDisplayString($data.goodsInfo.price),
                    1
                    /* TEXT */
                  ),
                  $data.goodsInfo.is_on_sale ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: "original-price"
                    },
                    "¥" + vue.toDisplayString(($data.goodsInfo.price * 1.2).toFixed(2)),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("view", { class: "promotion-tags" }, [
                  vue.createElementVNode("text", { class: "promotion-tag" }, "30天低价"),
                  vue.createElementVNode("text", { class: "promotion-text" }, "全网低价"),
                  vue.createElementVNode("text", { class: "promotion-text" }, "全网疯抢30万件")
                ])
              ]),
              vue.createCommentVNode(" 新增倒计时区域 "),
              vue.createElementVNode("view", { class: "countdown-section" }, [
                vue.createElementVNode("text", { class: "countdown-title" }, "百亿补贴"),
                vue.createElementVNode(
                  "text",
                  { class: "countdown-time" },
                  vue.toDisplayString($data.countdownTime),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "countdown-title" }, "即将恢复原价")
              ])
            ]),
            vue.createCommentVNode(" 商品信息部分 "),
            vue.createElementVNode("view", { class: "goods-info" }, [
              vue.createElementVNode("view", { class: "title-section" }, [
                vue.createElementVNode("text", { class: "brand-tag" }, "品牌"),
                vue.createElementVNode(
                  "text",
                  { class: "title" },
                  vue.toDisplayString($data.goodsInfo.name),
                  1
                  /* TEXT */
                ),
                $data.goodsInfo.is_hot || $data.goodsInfo.is_new || $data.goodsInfo.is_best ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "tags"
                }, [
                  $data.goodsInfo.is_hot ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "tag"
                  }, "热销")) : vue.createCommentVNode("v-if", true),
                  $data.goodsInfo.is_new ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 1,
                    class: "tag"
                  }, "新品")) : vue.createCommentVNode("v-if", true),
                  $data.goodsInfo.is_best ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 2,
                    class: "tag"
                  }, "精品")) : vue.createCommentVNode("v-if", true)
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "sales-stats" }, [
                vue.createElementVNode(
                  "text",
                  { class: "stat-item" },
                  vue.toDisplayString($data.goodsInfo.total_sell_count || "2068") + "人好评",
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "stat-item" }, "24小时内200+人拼单"),
                vue.createElementVNode("text", { class: "stat-item" }, "3466人收藏")
              ]),
              vue.createCommentVNode(" 商品评价 "),
              vue.createElementVNode("view", { class: "reviews-section" }, [
                vue.createElementVNode("view", { class: "reviews-header" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "reviews-title" },
                    "商品评价（" + vue.toDisplayString($data.goodsInfo && $data.goodsInfo.reviews ? $data.goodsInfo.reviews.length : 0) + "）",
                    1
                    /* TEXT */
                  ),
                  $data.goodsInfo && $data.goodsInfo.reviews && $data.goodsInfo.reviews.length > 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "reviews-view-all",
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.goAllReviews && $options.goAllReviews(...args))
                  }, "查看全部>")) : (vue.openBlock(), vue.createElementBlock("text", {
                    key: 1,
                    class: "reviews-view-all",
                    style: { "color": "#999" }
                  }, "本商品为新品，期待您的购买评价"))
                ]),
                $data.goodsInfo && $data.goodsInfo.reviews && $data.goodsInfo.reviews.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "reviews-list"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.goodsInfo.reviews.slice(0, 2), (review, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "review-item",
                        key: index
                      }, [
                        vue.createElementVNode("view", { class: "review-avatar" }, [
                          vue.createElementVNode("image", {
                            src: _imports_1$2,
                            class: "avatar-image"
                          })
                        ]),
                        vue.createElementVNode("view", { class: "review-content" }, [
                          vue.createElementVNode("view", { class: "review-user" }, "匿名用户"),
                          vue.createElementVNode(
                            "view",
                            { class: "review-text" },
                            vue.toDisplayString(review),
                            1
                            /* TEXT */
                          )
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createCommentVNode(" 新增图片显示区域 "),
              vue.createElementVNode("view", { class: "image-gallery" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.convertToBannerArray($data.goodsInfo.goods_banner_imgs), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "image-item",
                      key: index
                    }, [
                      vue.createElementVNode("image", {
                        src: item.url,
                        mode: "aspectFill",
                        class: "gallery-image"
                      }, null, 8, ["src"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createCommentVNode(" 底部操作栏 "),
            vue.createElementVNode("view", { class: "bottom-bar" }, [
              vue.createElementVNode("view", { class: "action-buttons" }, [
                vue.createElementVNode("view", { class: "action-item" }, [
                  vue.createElementVNode("text", { class: "action-icon" }, "🏪"),
                  vue.createElementVNode("text", { class: "action-text" }, "店铺")
                ]),
                vue.createElementVNode("view", {
                  class: "action-item",
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleFavorite && $options.toggleFavorite(...args))
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "action-icon" },
                    vue.toDisplayString($data.isFavorite ? "❤️" : "🤍"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "action-text" }, "收藏")
                ]),
                vue.createElementVNode("view", { class: "action-item" }, [
                  vue.createElementVNode("text", { class: "action-icon" }, "☎️"),
                  vue.createElementVNode("text", { class: "action-text" }, "客服")
                ])
              ]),
              vue.createElementVNode("view", { class: "buy-button" }, [
                vue.createElementVNode("button", {
                  class: "group-buy",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.showPopup && $options.showPopup(...args))
                }, "发起拼单")
              ])
            ]),
            vue.createCommentVNode(" 底部弹出层 "),
            $data.showBuyPopup ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "popup-mask",
              onClick: _cache[5] || (_cache[5] = (...args) => $options.hidePopup && $options.hidePopup(...args))
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["popup-content", { "popup-show": $data.showBuyPopup }])
              },
              [
                vue.createCommentVNode(" 关闭按钮 "),
                vue.createElementVNode("view", {
                  class: "close-btn",
                  onClick: _cache[6] || (_cache[6] = (...args) => $options.hidePopup && $options.hidePopup(...args))
                }, "×"),
                vue.createCommentVNode(" 配送信息 "),
                vue.createElementVNode("view", { class: "delivery-info" }, [
                  vue.createElementVNode("view", { class: "shipping-policy" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "checkbox-filled",
                      color: "#67c23a",
                      size: "16"
                    }),
                    vue.createElementVNode("text", { class: "policy-text" }, "全场包邮 · 七天退换 · 48小时发货")
                  ]),
                  $options.userInfo ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "address-info",
                    onClick: _cache[7] || (_cache[7] = (...args) => $options.goSet && $options.goSet(...args))
                  }, [
                    vue.createElementVNode("view", { class: "address-detail" }, [
                      vue.createElementVNode("image", {
                        src: _imports_2$2,
                        class: "address-icon"
                      }),
                      vue.createElementVNode(
                        "text",
                        { class: "user-name" },
                        vue.toDisplayString($options.userInfo.username) + ", ",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "user-phone" },
                        vue.toDisplayString($options.maskPhone($options.userInfo.mobile)) + ", ",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "user-address" },
                        vue.toDisplayString($options.userInfo.address),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createVNode(_component_uni_icons, {
                      type: "right",
                      size: "30",
                      color: "#999"
                    })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 添加地图显示区域 "),
                  $data.mapUrl ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "map-card"
                  }, [
                    vue.createElementVNode("image", {
                      src: $data.mapUrl,
                      mode: "widthFix",
                      class: "map-image"
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "location-info" }, [
                      vue.createElementVNode("text", { class: "location-header" }, [
                        vue.createElementVNode("text", { class: "location-title" }, "当前位置:")
                      ]),
                      $data.locationInfo ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "location-detail"
                      }, [
                        vue.createElementVNode(
                          "text",
                          { class: "location-text" },
                          vue.toDisplayString($data.locationInfo.province || "未知") + " " + vue.toDisplayString($data.locationInfo.city || "未知"),
                          1
                          /* TEXT */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ])
                  ])) : $data.isLoadingMap ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "map-placeholder"
                  }, [
                    vue.createElementVNode("text", { class: "placeholder-text" }, "地图加载中...")
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createCommentVNode(" 商品信息 "),
                vue.createElementVNode("view", { class: "product-info" }, [
                  vue.createElementVNode("image", {
                    src: $data.goodsInfo.goods_thumb.fileID,
                    class: "product-image"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "product-details" }, [
                    vue.createElementVNode("view", { class: "group-price" }, [
                      vue.createElementVNode("text", { class: "price-label" }, "多人团价"),
                      vue.createElementVNode("text", { class: "price-symbol" }, "¥"),
                      vue.createElementVNode(
                        "text",
                        { class: "price-value" },
                        vue.toDisplayString($data.goodsInfo.group_price || $data.goodsInfo.price),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "selected-info" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        "已选：" + vue.toDisplayString($data.goodsInfo.name),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                vue.createCommentVNode(" 数量选择 "),
                vue.createElementVNode("view", { class: "quantity-selector" }, [
                  vue.createElementVNode("text", null, "数量"),
                  vue.createElementVNode("view", { class: "quantity-controls" }, [
                    vue.createElementVNode("button", {
                      class: "qty-btn",
                      onClick: _cache[8] || (_cache[8] = (...args) => $options.decreaseQuantity && $options.decreaseQuantity(...args))
                    }, "-"),
                    vue.createElementVNode(
                      "text",
                      { class: "qty-value" },
                      vue.toDisplayString($data.quantity),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("button", {
                      class: "qty-btn",
                      onClick: _cache[9] || (_cache[9] = (...args) => $options.increaseQuantity && $options.increaseQuantity(...args))
                    }, "+")
                  ])
                ]),
                vue.createElementVNode("view", { class: "payment-method-section" }, [
                  vue.createElementVNode("text", null, "使用"),
                  vue.createElementVNode("image", {
                    src: _imports_3,
                    class: "wallet-icon"
                  }),
                  vue.createElementVNode("text", null, "多多钱包支付")
                ]),
                vue.createCommentVNode(" 支付按钮 "),
                vue.createElementVNode("view", { class: "payment-section" }, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: "payment-btn",
                      onClick: _cache[10] || (_cache[10] = (...args) => $options.handlePayment && $options.handlePayment(...args))
                    },
                    " 立即支付 ¥" + vue.toDisplayString(($data.goodsInfo.group_price || $data.goodsInfo.price) * $data.quantity),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            )
          ])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 2 },
        [
          vue.createCommentVNode(" Error State "),
          vue.createElementVNode("view", { class: "error" }, [
            vue.createElementVNode("text", null, "加载商品信息失败，请重试")
          ])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
    ]);
  }
  const PagesSearchMallDetails = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__scopeId", "data-v-9b3eedc9"], ["__file", "G:/mobile application development/pdd/pages/search/mall-details.vue"]]);
  const _sfc_main$m = {
    data() {
      return {
        walletInfo: {
          _id: "",
          balance: 0,
          user_id: ""
        },
        transactions: [],
        rechargeAmount: "",
        quickAmounts: [50, 100, 200, 500, 1e3, 2e3]
      };
    },
    computed: {
      userInfo() {
        return store.userInfo;
      }
    },
    onLoad() {
      this.loadWalletInfo();
    },
    // 添加页面显示时的钩子，确保每次显示页面都刷新钱包信息
    onShow() {
      this.loadWalletInfo();
    },
    methods: {
      // 根据交易类型和是否有productImage决定显示哪个图片
      getTransactionImage(transaction) {
        formatAppLog("log", "at pages/wallet/wallet.vue:125", "交易记录", transaction);
        if (transaction.type === "credit") {
          return "/static/recharge.png";
        } else if (transaction.type === "debit") {
          return transaction.productImage || "/static/wallet/payment.png";
        }
        return "/static/wallet/payment.png";
      },
      async loadWalletInfo() {
        try {
          formatAppLog("log", "at pages/wallet/wallet.vue:138", "加载钱包信息", store.userInfo);
          if (!this.userInfo || !this.userInfo._id) {
            formatAppLog("error", "at pages/wallet/wallet.vue:140", "User info not available");
            uni.showToast({
              title: "用户信息不可用，请先登录",
              icon: "none"
            });
            return;
          }
          const db2 = nr.database();
          const result = await db2.collection("wallet").where({
            user_id: this.userInfo._id
          }).get();
          formatAppLog("log", "at pages/wallet/wallet.vue:157", "钱包查询结果", result);
          if (result && result.result && result.result.data && result.result.data.length > 0) {
            this.walletInfo = result.result.data[0];
            formatAppLog("log", "at pages/wallet/wallet.vue:162", "获取到钱包信息", this.walletInfo);
          } else {
            formatAppLog("log", "at pages/wallet/wallet.vue:164", "未找到钱包，创建新钱包");
            await this.createWallet();
          }
          await this.loadTransactions();
        } catch (error) {
          formatAppLog("error", "at pages/wallet/wallet.vue:172", "加载钱包信息失败:", error);
          uni.showToast({
            title: "加载钱包信息失败",
            icon: "none"
          });
        }
      },
      async createWallet() {
        try {
          const db2 = nr.database();
          const checkResult = await db2.collection("wallet").where({
            user_id: this.userInfo._id
          }).get();
          if (checkResult && checkResult.result && checkResult.result.data && checkResult.result.data.length > 0) {
            this.walletInfo = checkResult.result.data[0];
            formatAppLog("log", "at pages/wallet/wallet.vue:190", "找到已存在的钱包", this.walletInfo);
            return;
          }
          const result = await db2.collection("wallet").add({
            user_id: this.userInfo._id,
            balance: 0
            // 确保余额初始化为0
          });
          if (result && result.result && result.result.id) {
            this.walletInfo = {
              _id: result.result.id,
              user_id: this.userInfo._id,
              balance: 0
              // 确保余额初始化为0
            };
            formatAppLog("log", "at pages/wallet/wallet.vue:205", "新钱包信息", this.walletInfo);
            await this.loadWalletInfo();
          } else {
            throw new Error("创建钱包失败，未返回有效ID");
          }
        } catch (error) {
          formatAppLog("error", "at pages/wallet/wallet.vue:212", "创建钱包失败:", error);
          uni.showToast({
            title: "创建钱包失败",
            icon: "none"
          });
        }
      },
      async loadTransactions() {
        try {
          const db2 = nr.database();
          const result = await db2.collection("wallet_transactions").where({
            user_id: this.userInfo._id
          }).orderBy("created_at", "desc").limit(10).get();
          if (result && result.result && result.result.data) {
            this.transactions = result.result.data;
            formatAppLog("log", "at pages/wallet/wallet.vue:233", "交易记录加载成功:", this.transactions);
          } else {
            formatAppLog("log", "at pages/wallet/wallet.vue:235", "没有交易记录或结构不正确", result);
            this.transactions = [];
          }
        } catch (error) {
          formatAppLog("error", "at pages/wallet/wallet.vue:239", "加载交易记录失败:", error);
          uni.showToast({
            title: "加载交易记录失败",
            icon: "none"
          });
        }
      },
      async handleRecharge() {
        try {
          if (!this.walletInfo._id) {
            formatAppLog("log", "at pages/wallet/wallet.vue:249", "钱包信息不完整，重新加载");
            await this.loadWalletInfo();
            if (!this.walletInfo._id) {
              uni.showToast({
                title: "钱包信息加载失败，请重试",
                icon: "none"
              });
              return;
            }
          }
          const amount = parseFloat(this.rechargeAmount);
          if (isNaN(amount) || amount <= 0) {
            uni.showToast({
              title: "请输入有效金额",
              icon: "none"
            });
            return;
          }
          const currentBalance = typeof this.walletInfo.balance === "number" ? this.walletInfo.balance : 0;
          const newBalance = currentBalance + amount;
          const db2 = nr.database();
          const updateResult = await db2.collection("wallet").doc(this.walletInfo._id).update({
            balance: newBalance,
            updated_at: Date.now()
          });
          if (!updateResult || !updateResult.result || !updateResult.result.updated) {
            formatAppLog("error", "at pages/wallet/wallet.vue:281", "更新钱包余额失败", updateResult);
            uni.showToast({
              title: "充值失败，请重试",
              icon: "none"
            });
            return;
          }
          const transactionResult = await db2.collection("wallet_transactions").add({
            user_id: this.userInfo._id,
            amount,
            type: "credit",
            balance: newBalance
          });
          formatAppLog("log", "at pages/wallet/wallet.vue:296", "交易记录创建结果", transactionResult);
          this.walletInfo.balance = newBalance;
          await this.loadTransactions();
          uni.showToast({
            title: "充值成功",
            icon: "success"
          });
          this.hideRechargePopup();
        } catch (error) {
          formatAppLog("error", "at pages/wallet/wallet.vue:311", "充值失败:", error);
          uni.showToast({
            title: "充值失败，请重试",
            icon: "none"
          });
        }
      },
      formatBalance(balance) {
        const numBalance = typeof balance === "number" ? balance : 0;
        return numBalance.toFixed(2);
      },
      formatDate(timestamp) {
        if (!timestamp)
          return "";
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
      },
      handleWithdraw() {
        uni.showToast({
          title: "提现功能正在开发",
          icon: "none"
        });
      },
      showRechargePopup() {
        this.$refs.rechargePopup.open();
      },
      hideRechargePopup() {
        this.$refs.rechargePopup.close();
        this.rechargeAmount = "";
      },
      selectQuickAmount(amount) {
        this.rechargeAmount = amount.toString();
      },
      viewAllTransactions() {
        uni.showToast({
          title: "正在开发中",
          icon: "none"
        });
      },
      navBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", { class: "wallet-container" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "nav-bar" }, [
        vue.createElementVNode("view", {
          class: "nav-left",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "",
            class: "nav-icon"
          }),
          vue.createElementVNode("text", { class: "nav-title" }, "余额")
        ])
      ]),
      vue.createCommentVNode(" 余额卡片 "),
      vue.createElementVNode("view", { class: "balance-card" }, [
        vue.createElementVNode("view", { class: "security-tip" }, [
          vue.createElementVNode("text", { class: "security-icon" }, "🛡️"),
          vue.createElementVNode("text", { class: "security-text" }, "资金安全有保障"),
          vue.createElementVNode("text", { class: "security-arrow" }, ">")
        ]),
        vue.createElementVNode("view", { class: "balance-section" }, [
          vue.createElementVNode("text", null, "可用余额(元)"),
          vue.createElementVNode(
            "text",
            { class: "balance-amount" },
            vue.toDisplayString($options.formatBalance($data.walletInfo.balance)),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "action-buttons" }, [
          vue.createElementVNode("button", {
            class: "action-btn withdraw",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.handleWithdraw && $options.handleWithdraw(...args))
          }, "提现"),
          vue.createElementVNode("button", {
            class: "action-btn recharge",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.showRechargePopup && $options.showRechargePopup(...args))
          }, "充值")
        ]),
        vue.createElementVNode("view", { class: "promo-banner" }, [
          vue.createElementVNode("view", { class: "promo-icon" }, "🔊"),
          vue.createElementVNode(
            "text",
            { class: "promo-text" },
            "余额" + vue.toDisplayString($options.formatBalance($data.walletInfo.balance)) + "元，每天支付享立减",
            1
            /* TEXT */
          ),
          vue.createElementVNode("text", { class: "promo-link" }, "去看看")
        ])
      ]),
      vue.createCommentVNode(" 交易记录 "),
      vue.createElementVNode("view", { class: "transactions" }, [
        vue.createElementVNode("view", { class: "transactions-header" }, [
          vue.createElementVNode("text", { class: "header-title" }, "余额变动明细"),
          vue.createElementVNode("text", {
            class: "header-link",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.viewAllTransactions && $options.viewAllTransactions(...args))
          }, "全部 >")
        ]),
        vue.createElementVNode("view", { class: "transaction-list" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.transactions, (transaction, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "transaction-item",
                key: index
              }, [
                vue.createElementVNode("view", { class: "transaction-icon" }, [
                  vue.createCommentVNode(" 修改这里：根据交易类型和是否有productImage决定显示哪个图片 "),
                  vue.createElementVNode("image", {
                    src: $options.getTransactionImage(transaction),
                    class: "trans-icon"
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode("view", { class: "transaction-info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "transaction-title" },
                    vue.toDisplayString(transaction.type === "debit" ? "拼多多订单支付" : "多多钱包余额充值"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode(
                      "text",
                      { class: "transaction-time" },
                      vue.toDisplayString($options.formatDate(transaction.created_at)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "transaction-amount" }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["amount", transaction.type === "debit" ? "debit" : "credit"])
                    },
                    vue.toDisplayString(transaction.type === "debit" ? "-" : "+") + vue.toDisplayString(transaction.amount.toFixed(2)),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "balance" },
                    "余额" + vue.toDisplayString(transaction.balance.toFixed(2)) + "元",
                    1
                    /* TEXT */
                  )
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" 充值弹窗 "),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "rechargePopup",
          type: "bottom"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "recharge-popup" }, [
              vue.createElementVNode("view", { class: "popup-header" }, [
                vue.createElementVNode("text", { class: "popup-title" }, "充值金额"),
                vue.createElementVNode("text", {
                  class: "popup-close",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.hideRechargePopup && $options.hideRechargePopup(...args))
                }, "×")
              ]),
              vue.createElementVNode("view", { class: "amount-input" }, [
                vue.createElementVNode("text", { class: "currency-symbol" }, "¥"),
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "digit",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.rechargeAmount = $event),
                    class: "amount-field",
                    placeholder: "请输入充值金额"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.rechargeAmount]
                ])
              ]),
              vue.createElementVNode("view", { class: "quick-amounts" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.quickAmounts, (amount) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["amount-option", { "selected": $data.rechargeAmount === amount.toString() }]),
                      key: amount,
                      onClick: ($event) => $options.selectQuickAmount(amount)
                    }, " ¥" + vue.toDisplayString(amount), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("button", {
                class: "confirm-recharge",
                onClick: _cache[6] || (_cache[6] = (...args) => $options.handleRecharge && $options.handleRecharge(...args)),
                disabled: !$data.rechargeAmount || parseFloat($data.rechargeAmount) <= 0
              }, " 确认充值 ", 8, ["disabled"])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesWalletWallet = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-4c380209"], ["__file", "G:/mobile application development/pdd/pages/wallet/wallet.vue"]]);
  const _sfc_main$l = {
    data() {
      return {
        paymentData: {
          amount: 0,
          username: "",
          avatar: "",
          productId: "",
          productName: "",
          productImage: "",
          quantity: 1
        },
        selectedMethod: 0,
        paymentMethods: [
          {
            name: "农业银行储蓄卡(0270)",
            icon: "/static/bank-icons/abc.png"
          },
          {
            name: "四川农信储蓄卡(2128)",
            icon: "/static/bank-icons/sc.png"
          },
          {
            name: "农业银行储蓄卡(0073)",
            icon: "/static/bank-icons/abc.png"
          }
        ]
      };
    },
    onLoad() {
      formatAppLog("log", "at pages/wallet/pay.vue:78", "用户信息:", store.userInfo);
      const paymentData = uni.getStorageSync("paymentData");
      if (paymentData) {
        this.paymentData = paymentData;
        formatAppLog("log", "at pages/wallet/pay.vue:82", "支付数据", this.paymentData);
      }
      const avatar = store.userInfo.avatar_file.url;
      this.paymentData.avatar = avatar;
    },
    methods: {
      maskPhone(phone) {
        if (!phone)
          return "";
        if (phone.length === 11) {
          return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        }
        return phone;
      },
      selectPaymentMethod(index) {
        this.selectedMethod = index;
      },
      async handleConfirmPayment() {
        const db2 = nr.database();
        const orderIds = uni.getStorageSync("currentOrderIds") || [];
        formatAppLog("log", "at pages/wallet/pay.vue:101", "订单ids", orderIds);
        try {
          const walletResult = await db2.collection("wallet").where({
            user_id: this.paymentData.userId
          }).get();
          if (walletResult.result.data.length === 0) {
            throw new Error("钱包不存在");
          }
          const wallet = walletResult.result.data[0];
          formatAppLog("log", "at pages/wallet/pay.vue:116", "余额", wallet.balance);
          formatAppLog("log", "at pages/wallet/pay.vue:117", "本次支付的总金额", this.paymentData.amount);
          const newBalance = wallet.balance - this.paymentData.amount;
          formatAppLog("log", "at pages/wallet/pay.vue:119", "支付后的余额", newBalance);
          if (newBalance < 0) {
            uni.showToast({
              title: "余额不足",
              icon: "none"
            });
            setTimeout(function() {
              uni.navigateTo({
                url: "/pages/wallet/wallet"
              });
            }, 1500);
            return;
          }
          await db2.collection("wallet").doc(wallet._id).update({
            balance: newBalance,
            updated_at: Date.now()
          });
          for (const orderId of orderIds) {
            await db2.collection("order").doc(orderId).update({
              paymentStatus: 1,
              // 已支付
              shareStatus: 0
              // 待分享
            });
          }
          if (Array.isArray(this.paymentData.productId) && this.paymentData.productId.length > 1) {
            const orderResults = await Promise.all(orderIds.map(
              (id) => db2.collection("order").doc(id).get()
            ));
            formatAppLog("log", "at pages/wallet/pay.vue:154", "最后", orderResults);
            for (const orderResult of orderResults) {
              if (orderResult.result && orderResult.result.data) {
                const order = orderResult.result.data;
                formatAppLog("log", "at pages/wallet/pay.vue:160", "单个商品的价格信息", order[0].amount);
                await db2.collection("wallet_transactions").add({
                  user_id: this.paymentData.userId,
                  amount: order[0].amount,
                  type: "debit",
                  balance: newBalance,
                  productImage: order[0].productImage
                  // 使用订单中的商品图片
                });
              }
            }
          } else {
            await db2.collection("wallet_transactions").add({
              user_id: this.paymentData.userId,
              amount: this.paymentData.amount,
              type: "debit",
              balance: newBalance,
              productImage: this.paymentData.productImage
              // 使用paymentData中的商品图片
            });
          }
          uni.setStorageSync("paymentSuccess", true);
          uni.showToast({
            title: "支付成功",
            icon: "success"
          });
          uni.removeStorageSync("paymentData");
          uni.removeStorageSync("currentOrderIds");
          setTimeout(function() {
            uni.navigateTo({
              url: "/pages/user/order"
            });
          }, 1500);
        } catch (error) {
          formatAppLog("error", "at pages/wallet/pay.vue:200", "支付失败:", error);
          uni.showToast({
            title: error.message || "支付失败，请重试",
            icon: "none"
          });
          setTimeout(function() {
            uni.navigateTo({
              url: "/pages/wallet/wallet"
            });
          }, 1500);
        }
      },
      async handleCancel() {
        const db2 = nr.database();
        const orderIds = uni.getStorageSync("currentOrderIds") || [];
        try {
          for (const orderId of orderIds) {
            await db2.collection("order").doc(orderId).update({
              paymentStatus: 0
              // 保持待支付状态
            });
          }
          uni.removeStorageSync("paymentData");
          uni.removeStorageSync("currentOrderIds");
          uni.showToast({
            title: "取消支付",
            icon: "error"
          });
          uni.navigateBack();
        } catch (error) {
          formatAppLog("error", "at pages/wallet/pay.vue:236", "取消支付失败:", error);
          uni.showToast({
            title: "操作失败，请重试",
            icon: "none"
          });
        }
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "pay-container" }, [
      vue.createCommentVNode(" 支付弹出层 "),
      vue.createElementVNode("view", { class: "pay-popup" }, [
        vue.createCommentVNode(" 关闭按钮 "),
        vue.createElementVNode("view", {
          class: "close-btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleCancel && $options.handleCancel(...args))
        }, [
          vue.createElementVNode("text", { class: "close-icon" }, "×")
        ]),
        vue.createCommentVNode(" 用户信息 "),
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode("image", {
            src: $data.paymentData.avatar,
            class: "user-avatar"
          }, null, 8, ["src"]),
          vue.createElementVNode(
            "text",
            { class: "user-phone" },
            vue.toDisplayString($options.maskPhone($data.paymentData.mobile)),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 商户信息 "),
        vue.createElementVNode("view", { class: "merchant-info" }, [
          vue.createElementVNode("text", { class: "merchant-name" }, "拼多多平台商户"),
          vue.createElementVNode(
            "text",
            { class: "payment-amount" },
            "¥" + vue.toDisplayString($data.paymentData.amount.toFixed(2)),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 支付方式选择 "),
        vue.createElementVNode("view", { class: "payment-methods" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.paymentMethods, (method, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["method-item", { "selected": $data.selectedMethod === index }]),
                key: index,
                onClick: ($event) => $options.selectPaymentMethod(index)
              }, [
                vue.createElementVNode("image", {
                  src: method.icon,
                  class: "method-icon"
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "text",
                  { class: "method-name" },
                  vue.toDisplayString(method.name),
                  1
                  /* TEXT */
                ),
                $data.selectedMethod === index ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "method-check"
                }, "✓")) : vue.createCommentVNode("v-if", true)
              ], 10, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" 确认支付按钮 "),
        vue.createElementVNode("button", {
          class: "confirm-btn",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.handleConfirmPayment && $options.handleConfirmPayment(...args))
        }, "确认付款"),
        vue.createCommentVNode(" 服务提供商信息 "),
        vue.createElementVNode("view", { class: "service-provider" }, [
          vue.createElementVNode("text", { class: "provider-text" }, "本服务由支付宝(杭州)信息技术有限公司提供")
        ])
      ])
    ]);
  }
  const PagesWalletPay = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-6e3ba243"], ["__file", "G:/mobile application development/pdd/pages/wallet/pay.vue"]]);
  const en$1 = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  const zhHans$1 = {
    "uni-load-more.contentdown": "上拉显示更多",
    "uni-load-more.contentrefresh": "正在加载...",
    "uni-load-more.contentnomore": "没有更多数据了"
  };
  const zhHant$1 = {
    "uni-load-more.contentdown": "上拉顯示更多",
    "uni-load-more.contentrefresh": "正在加載...",
    "uni-load-more.contentnomore": "沒有更多數據了"
  };
  const messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  let platform$1;
  setTimeout(() => {
    platform$1 = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t: t$1
  } = initVueI18n(messages$1);
  const _sfc_main$k = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        // 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform: platform$1,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t$1("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t$1("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t$1("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page = pages2[pages2.length - 1];
      var currentWebview2 = page.$getAppWebview();
      currentWebview2.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview2.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--android-MP"
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--ios-H5"
        },
        [
          vue.createElementVNode("image", {
            src: $data.imgBase64,
            mode: "widthFix"
          }, null, 8, ["src"])
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 2,
          class: "uni-load-more__text",
          style: vue.normalizeStyle({ color: $props.color })
        },
        vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-9245e42c"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _imports_1$1 = "/static/empty-box.png";
  const _sfc_main$j = {
    data() {
      return {
        favorItems: [],
        selectedItems: [],
        isAllSelected: false,
        isLoading: false,
        page: 1,
        pageSize: 10
      };
    },
    computed: {
      totalPrice() {
        return this.favorItems.filter((item) => this.selectedItems.includes(item._id)).reduce((total, item) => total + item.price, 0).toFixed(2);
      },
      userInfo() {
        return store.userInfo;
      }
    },
    onLoad() {
      this.loadFavorItems();
    },
    methods: {
      async loadFavorItems() {
        try {
          if (!this.userInfo || !this.userInfo._id) {
            uni.showToast({
              title: "请先登录",
              icon: "none"
            });
            return;
          }
          this.isLoading = true;
          const db2 = nr.database();
          const favorResult = await db2.collection("favor").where({
            userId: this.userInfo._id
          }).skip((this.page - 1) * this.pageSize).limit(this.pageSize).get();
          if (favorResult.result.data.length === 0) {
            this.isLoading = false;
            if (this.page === 1) {
              this.favorItems = [];
            }
            return;
          }
          const productIds = favorResult.result.data.map((favor) => favor.productId);
          const productsResult = await db2.collection("mall-goods").where({
            _id: db2.command.in(productIds)
          }).get();
          const newItems = productsResult.result.data;
          this.favorItems = this.page === 1 ? newItems : [...this.favorItems, ...newItems];
          this.page++;
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/favor.vue:146", "加载收藏商品失败:", error);
          uni.showToast({
            title: "加载收藏商品失败",
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      loadMoreItems() {
        if (!this.isLoading) {
          this.loadFavorItems();
        }
      },
      toggleSelect(item) {
        const index = this.selectedItems.indexOf(item._id);
        if (index === -1) {
          this.selectedItems.push(item._id);
        } else {
          this.selectedItems.splice(index, 1);
        }
        this.isAllSelected = this.selectedItems.length === this.favorItems.length;
      },
      toggleSelectAll() {
        if (this.isAllSelected) {
          this.selectedItems = [];
        } else {
          this.selectedItems = this.favorItems.map((item) => item._id);
        }
        this.isAllSelected = !this.isAllSelected;
      },
      async removeSelectedItems() {
        if (this.selectedItems.length === 0) {
          uni.showToast({
            title: "请选择要移除的商品",
            icon: "none"
          });
          return;
        }
        try {
          const db2 = nr.database();
          await db2.collection("favor").where({
            userId: this.userInfo._id,
            productId: nr.database().command.in(this.selectedItems)
          }).remove();
          this.favorItems = this.favorItems.filter((item) => !this.selectedItems.includes(item._id));
          this.selectedItems = [];
          this.isAllSelected = false;
          uni.showToast({
            title: "已移除选中收藏",
            icon: "success"
          });
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/favor.vue:206", "移除收藏失败:", error);
          uni.showToast({
            title: "移除收藏失败，请重试",
            icon: "none"
          });
        }
      },
      async handleCheckout() {
        var _a;
        if (this.selectedItems.length === 0) {
          uni.showToast({
            title: "请选择商品",
            icon: "none"
          });
          return;
        }
        const selectedProducts = this.favorItems.filter((item) => this.selectedItems.includes(item._id));
        const totalAmount = parseFloat(this.totalPrice);
        formatAppLog("log", "at pages/malls-manage/favor.vue:224", "商品总价", totalAmount);
        const paymentData = {
          amount: totalAmount,
          username: this.userInfo.username,
          mobile: this.userInfo.mobile,
          avatar: ((_a = this.userInfo.avatar_file) == null ? void 0 : _a.path) || "/static/avatar-default.png",
          userId: this.userInfo._id,
          productId: this.selectedItems,
          productName: selectedProducts.map((p2) => p2.name).join(", "),
          productImage: selectedProducts[0].goods_thumb.fileID,
          quantity: this.selectedItems.length
        };
        uni.setStorageSync("paymentData", paymentData);
        try {
          const db2 = nr.database();
          const orderIds = [];
          for (const itemId of this.selectedItems) {
            const product = this.favorItems.find((item) => item._id === itemId);
            if (product) {
              const orderResult = await db2.collection("order").add({
                userId: this.userInfo._id,
                productId: [itemId],
                // 单个商品ID
                productName: product.name,
                productImage: product.goods_thumb.fileID,
                amount: product.price,
                quantity: 1,
                // 每个订单只包含一个商品
                paymentStatus: 0,
                shareStatus: 0,
                shippingStatus: 0,
                deliveryStatus: 0,
                reviewStatus: 0
              });
              orderIds.push(orderResult.result.id);
            }
          }
          paymentData.orderIds = orderIds;
          uni.setStorageSync("paymentData", paymentData);
          uni.setStorageSync("currentOrderIds", orderIds);
          uni.navigateTo({
            url: "/pages/wallet/pay"
          });
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/favor.vue:274", "创建订单失败:", error);
          uni.showToast({
            title: "创建订单失败，请重试",
            icon: "none"
          });
        }
      },
      navBack() {
        uni.switchTab({
          url: "/pages/user/user"
        });
      },
      goToProductDetail(productId) {
        uni.navigateTo({
          url: `/pages/search/mall-details?id=${productId}`
        });
      },
      async removeFavorItem(itemId) {
        try {
          const db2 = nr.database();
          await db2.collection("favor").where({
            userId: this.userInfo._id,
            productId: itemId
          }).remove();
          this.favorItems = this.favorItems.filter((item) => item._id !== itemId);
          this.selectedItems = this.selectedItems.filter((id) => id !== itemId);
          uni.showToast({
            title: "已移除收藏",
            icon: "success"
          });
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/favor.vue:307", "移除收藏失败:", error);
          uni.showToast({
            title: "移除收藏失败，请重试",
            icon: "none"
          });
        }
      },
      goShopping() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "status-bar" }),
      vue.createElementVNode("view", { class: "nav-bar" }, [
        vue.createElementVNode("view", {
          class: "nav-left",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            class: "back-icon"
          })
        ]),
        vue.createElementVNode("view", { class: "nav-title" }, [
          vue.createElementVNode("text", null, "我的收藏")
        ]),
        vue.createElementVNode("view", {
          class: "nav-right",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args))
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.isAllSelected ? "取消全选" : "全选"),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 收藏商品列表 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "true",
          class: "favor-list",
          onScrolltolower: _cache[3] || (_cache[3] = (...args) => $options.loadMoreItems && $options.loadMoreItems(...args))
        },
        [
          $data.favorItems.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty-state"
          }, [
            vue.createElementVNode("image", {
              src: _imports_1$1,
              class: "empty-icon"
            }),
            vue.createElementVNode("text", null, "暂无收藏商品"),
            vue.createElementVNode("button", {
              class: "go-shopping-btn",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.goShopping && $options.goShopping(...args))
            }, "去逛逛")
          ])) : (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            vue.renderList($data.favorItems, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "favor-item",
                key: item._id
              }, [
                vue.createElementVNode("view", {
                  class: "checkbox",
                  onClick: ($event) => $options.toggleSelect(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["checkbox-inner", { "selected": $data.selectedItems.includes(item._id) }])
                    },
                    [
                      $data.selectedItems.includes(item._id) ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "checkbox-icon"
                      }, "✓")) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )
                ], 8, ["onClick"]),
                vue.createElementVNode("image", {
                  src: item.goods_thumb.fileID,
                  class: "product-image",
                  mode: "aspectFill",
                  onClick: ($event) => $options.goToProductDetail(item._id)
                }, null, 8, ["src", "onClick"]),
                vue.createElementVNode("view", {
                  class: "product-info",
                  onClick: ($event) => $options.goToProductDetail(item._id)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "product-name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "product-price" }, [
                    vue.createElementVNode("text", { class: "price-symbol" }, "¥"),
                    vue.createElementVNode(
                      "text",
                      { class: "price-value" },
                      vue.toDisplayString(item.price.toFixed(2)),
                      1
                      /* TEXT */
                    ),
                    item.original_price ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "original-price"
                      },
                      "¥" + vue.toDisplayString(item.original_price.toFixed(2)),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "product-tags" }, [
                    item.is_hot ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "tag"
                    }, "热销")) : vue.createCommentVNode("v-if", true),
                    item.is_new ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "tag"
                    }, "新品")) : vue.createCommentVNode("v-if", true),
                    item.is_best ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 2,
                      class: "tag"
                    }, "精品")) : vue.createCommentVNode("v-if", true)
                  ])
                ], 8, ["onClick"]),
                vue.createElementVNode("view", {
                  class: "remove-btn",
                  onClick: ($event) => $options.removeFavorItem(item._id)
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "trash",
                    size: "30",
                    color: "#999"
                  })
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $data.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "loading"
          }, [
            vue.createVNode(_component_uni_load_more, { status: "loading" })
          ])) : vue.createCommentVNode("v-if", true)
        ],
        32
        /* NEED_HYDRATION */
      ),
      vue.createCommentVNode(" 修改底部结算栏部分 "),
      $data.favorItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "bottom-bar"
      }, [
        vue.createElementVNode("view", { class: "total-section" }, [
          vue.createElementVNode("text", { class: "total-label" }, "合计："),
          vue.createElementVNode("text", { class: "total-price" }, [
            vue.createElementVNode("text", { class: "price-symbol" }, "¥"),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($options.totalPrice),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createCommentVNode(" 新增的移除按钮 "),
        vue.createElementVNode("button", {
          class: "remove-all-btn",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.removeSelectedItems && $options.removeSelectedItems(...args)),
          disabled: $data.selectedItems.length === 0
        }, " 移除收藏 ", 8, ["disabled"]),
        vue.createElementVNode("button", {
          class: "checkout-btn",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.handleCheckout && $options.handleCheckout(...args)),
          disabled: $data.selectedItems.length === 0
        }, " 去结算 (" + vue.toDisplayString($data.selectedItems.length) + ") ", 9, ["disabled"])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMallsManageFavor = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-37407246"], ["__file", "G:/mobile application development/pdd/pages/malls-manage/favor.vue"]]);
  const _sfc_main$i = {
    data() {
      return {
        historyItems: [],
        selectedItems: [],
        isAllSelected: false,
        isLoading: false,
        page: 1,
        pageSize: 10
      };
    },
    computed: {
      totalPrice() {
        return this.historyItems.filter((item) => this.selectedItems.includes(item._id)).reduce((total, item) => total + item.price, 0).toFixed(2);
      },
      userInfo() {
        return store.userInfo;
      }
    },
    onLoad() {
      this.loadhistoryItems();
    },
    methods: {
      async loadhistoryItems() {
        try {
          if (!this.userInfo || !this.userInfo._id) {
            uni.showToast({
              title: "请先登录",
              icon: "none"
            });
            return;
          }
          this.isLoading = true;
          const db2 = nr.database();
          const historyResult = await db2.collection("history").where({
            userId: this.userInfo._id
          }).skip((this.page - 1) * this.pageSize).limit(this.pageSize).get();
          if (historyResult.result.data.length === 0) {
            this.isLoading = false;
            if (this.page === 1) {
              this.historyItems = [];
            }
            return;
          }
          const productIds = historyResult.result.data.map((history) => history.productId);
          const productsResult = await db2.collection("mall-goods").where({
            _id: db2.command.in(productIds)
          }).get();
          const newItems = productsResult.result.data;
          this.historyItems = this.page === 1 ? newItems : [...this.historyItems, ...newItems];
          this.page++;
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/history.vue:146", "加载历史商品失败:", error);
          uni.showToast({
            title: "加载历史商品失败",
            icon: "none"
          });
        } finally {
          this.isLoading = false;
        }
      },
      loadMoreItems() {
        if (!this.isLoading) {
          this.loadhistoryItems();
        }
      },
      toggleSelect(item) {
        const index = this.selectedItems.indexOf(item._id);
        if (index === -1) {
          this.selectedItems.push(item._id);
        } else {
          this.selectedItems.splice(index, 1);
        }
        this.isAllSelected = this.selectedItems.length === this.historyItems.length;
      },
      toggleSelectAll() {
        if (this.isAllSelected) {
          this.selectedItems = [];
        } else {
          this.selectedItems = this.historyItems.map((item) => item._id);
        }
        this.isAllSelected = !this.isAllSelected;
      },
      async removeSelectedItems() {
        if (this.selectedItems.length === 0) {
          uni.showToast({
            title: "请选择要移除的历史记录",
            icon: "none"
          });
          return;
        }
        try {
          const db2 = nr.database();
          await db2.collection("history").where({
            userId: this.userInfo._id,
            productId: nr.database().command.in(this.selectedItems)
          }).remove();
          this.historyItems = this.historyItems.filter((item) => !this.selectedItems.includes(item._id));
          this.selectedItems = [];
          this.isAllSelected = false;
          uni.showToast({
            title: "已移除选中历史记录",
            icon: "success"
          });
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/history.vue:206", "移除历史记录失败:", error);
          uni.showToast({
            title: "移除历史记录失败，请重试",
            icon: "none"
          });
        }
      },
      async handleCheckout() {
        var _a;
        if (this.selectedItems.length === 0) {
          uni.showToast({
            title: "请选择商品",
            icon: "none"
          });
          return;
        }
        const selectedProducts = this.historyItems.filter((item) => this.selectedItems.includes(item._id));
        const totalAmount = parseFloat(this.totalPrice);
        formatAppLog("log", "at pages/malls-manage/history.vue:224", "商品总价", totalAmount);
        const paymentData = {
          amount: totalAmount,
          username: this.userInfo.username,
          mobile: this.userInfo.mobile,
          avatar: ((_a = this.userInfo.avatar_file) == null ? void 0 : _a.path) || "/static/avatar-default.png",
          userId: this.userInfo._id,
          productId: this.selectedItems,
          productName: selectedProducts.map((p2) => p2.name).join(", "),
          productImage: selectedProducts[0].goods_thumb.fileID,
          quantity: this.selectedItems.length
        };
        uni.setStorageSync("paymentData", paymentData);
        try {
          const db2 = nr.database();
          const orderIds = [];
          for (const itemId of this.selectedItems) {
            const product = this.historyItems.find((item) => item._id === itemId);
            if (product) {
              const orderResult = await db2.collection("order").add({
                userId: this.userInfo._id,
                productId: [itemId],
                // 单个商品ID
                productName: product.name,
                productImage: product.goods_thumb.fileID,
                amount: product.price,
                quantity: 1,
                // 每个订单只包含一个商品
                paymentStatus: 0,
                shareStatus: 0,
                shippingStatus: 0,
                deliveryStatus: 0,
                reviewStatus: 0
              });
              orderIds.push(orderResult.result.id);
            }
          }
          paymentData.orderIds = orderIds;
          uni.setStorageSync("paymentData", paymentData);
          uni.setStorageSync("currentOrderIds", orderIds);
          uni.navigateTo({
            url: "/pages/wallet/pay"
          });
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/history.vue:274", "创建订单失败:", error);
          uni.showToast({
            title: "创建订单失败，请重试",
            icon: "none"
          });
        }
      },
      navBack() {
        uni.switchTab({
          url: "/pages/user/user"
        });
      },
      goToProductDetail(productId) {
        uni.navigateTo({
          url: `/pages/search/mall-details?id=${productId}`
        });
      },
      async removehistoryItem(itemId) {
        try {
          const db2 = nr.database();
          await db2.collection("history").where({
            userId: this.userInfo._id,
            productId: itemId
          }).remove();
          this.historyItems = this.historyItems.filter((item) => item._id !== itemId);
          this.selectedItems = this.selectedItems.filter((id) => id !== itemId);
          uni.showToast({
            title: "已移除历史",
            icon: "success"
          });
        } catch (error) {
          formatAppLog("error", "at pages/malls-manage/history.vue:307", "移除历史失败:", error);
          uni.showToast({
            title: "移除历史失败，请重试",
            icon: "none"
          });
        }
      },
      goShopping() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "status-bar" }),
      vue.createElementVNode("view", { class: "nav-bar" }, [
        vue.createElementVNode("view", {
          class: "nav-left",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            class: "back-icon"
          })
        ]),
        vue.createElementVNode("view", { class: "nav-title" }, [
          vue.createElementVNode("text", null, "我的历史")
        ]),
        vue.createElementVNode("view", {
          class: "nav-right",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args))
        }, [
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($data.isAllSelected ? "取消全选" : "全选"),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 历史商品列表 "),
      vue.createElementVNode(
        "scroll-view",
        {
          "scroll-y": "true",
          class: "history-list",
          onScrolltolower: _cache[3] || (_cache[3] = (...args) => $options.loadMoreItems && $options.loadMoreItems(...args))
        },
        [
          $data.historyItems.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "empty-state"
          }, [
            vue.createElementVNode("image", {
              src: _imports_1$1,
              class: "empty-icon"
            }),
            vue.createElementVNode("text", null, "暂无历史商品"),
            vue.createElementVNode("button", {
              class: "go-shopping-btn",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.goShopping && $options.goShopping(...args))
            }, "去逛逛")
          ])) : (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            vue.renderList($data.historyItems, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "history-item",
                key: item._id
              }, [
                vue.createElementVNode("view", {
                  class: "checkbox",
                  onClick: ($event) => $options.toggleSelect(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["checkbox-inner", { "selected": $data.selectedItems.includes(item._id) }])
                    },
                    [
                      $data.selectedItems.includes(item._id) ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "checkbox-icon"
                      }, "✓")) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )
                ], 8, ["onClick"]),
                vue.createElementVNode("image", {
                  src: item.goods_thumb.fileID,
                  class: "product-image",
                  mode: "aspectFill",
                  onClick: ($event) => $options.goToProductDetail(item._id)
                }, null, 8, ["src", "onClick"]),
                vue.createElementVNode("view", {
                  class: "product-info",
                  onClick: ($event) => $options.goToProductDetail(item._id)
                }, [
                  vue.createElementVNode(
                    "view",
                    { class: "product-name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "product-price" }, [
                    vue.createElementVNode("text", { class: "price-symbol" }, "¥"),
                    vue.createElementVNode(
                      "text",
                      { class: "price-value" },
                      vue.toDisplayString(item.price.toFixed(2)),
                      1
                      /* TEXT */
                    ),
                    item.original_price ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 0,
                        class: "original-price"
                      },
                      "¥" + vue.toDisplayString(item.original_price.toFixed(2)),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ]),
                  vue.createElementVNode("view", { class: "product-tags" }, [
                    item.is_hot ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "tag"
                    }, "热销")) : vue.createCommentVNode("v-if", true),
                    item.is_new ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "tag"
                    }, "新品")) : vue.createCommentVNode("v-if", true),
                    item.is_best ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 2,
                      class: "tag"
                    }, "精品")) : vue.createCommentVNode("v-if", true)
                  ])
                ], 8, ["onClick"]),
                vue.createElementVNode("view", {
                  class: "remove-btn",
                  onClick: ($event) => $options.removehistoryItem(item._id)
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "trash",
                    size: "30",
                    color: "#999"
                  })
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          $data.isLoading ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "loading"
          }, [
            vue.createVNode(_component_uni_load_more, { status: "loading" })
          ])) : vue.createCommentVNode("v-if", true)
        ],
        32
        /* NEED_HYDRATION */
      ),
      vue.createCommentVNode(" 修改底部结算栏部分 "),
      $data.historyItems.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "bottom-bar"
      }, [
        vue.createElementVNode("view", { class: "total-section" }, [
          vue.createElementVNode("text", { class: "total-label" }, "合计："),
          vue.createElementVNode("text", { class: "total-price" }, [
            vue.createElementVNode("text", { class: "price-symbol" }, "¥"),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($options.totalPrice),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createCommentVNode(" 新增的移除按钮 "),
        vue.createElementVNode("button", {
          class: "remove-all-btn",
          onClick: _cache[4] || (_cache[4] = (...args) => $options.removeSelectedItems && $options.removeSelectedItems(...args)),
          disabled: $data.selectedItems.length === 0
        }, " 移除历史 ", 8, ["disabled"]),
        vue.createElementVNode("button", {
          class: "checkout-btn",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.handleCheckout && $options.handleCheckout(...args)),
          disabled: $data.selectedItems.length === 0
        }, " 去结算 (" + vue.toDisplayString($data.selectedItems.length) + ") ", 9, ["disabled"])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMallsManageHistory = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__scopeId", "data-v-b1bb082e"], ["__file", "G:/mobile application development/pdd/pages/malls-manage/history.vue"]]);
  const _imports_1 = "/static/avatar-default.png";
  const _imports_2 = "/static/empty-order.png";
  const _sfc_main$h = {
    computed: {
      userInfo() {
        return store.userInfo;
      }
    },
    data() {
      return {
        tabs: ["全部", "待付款", "待分享", "待发货", "待收货", "已评价", "未评价"],
        currentTab: 0,
        orderList: {
          0: [],
          // 全部
          1: [],
          // 待付款
          2: [],
          // 待分享
          3: [],
          // 待发货
          4: [],
          // 待收货
          5: [],
          // 已评价
          6: []
          // 新增：未评价
        },
        orderCounts: {
          1: 0,
          // 待付款
          2: 0,
          // 待分享
          3: 0,
          // 待发货
          4: 0,
          // 待收货
          5: 0,
          // 已评价
          6: 0
          // 新增：未评价
        },
        randomGoods: [],
        // 推荐商品列表
        reviewContent: "",
        // 评价内容
        currentOrderForReview: null,
        // 当前要评价的订单
        shareCountdown: 5,
        // 分享倒计时
        shareTimer: null
        // 分享倒计时定时器
      };
    },
    onLoad(options) {
      if (options.type) {
        const typeMap = {
          "pending": 1,
          "share": 2,
          "shipping": 3,
          "receiving": 4,
          "review": 5
        };
        this.currentTab = typeMap[options.type] || 0;
      }
      this.loadOrderData();
      this.getRandomGoods();
    },
    onShow() {
      this.loadOrderData();
    },
    onUnload() {
      if (this.shareTimer) {
        clearInterval(this.shareTimer);
      }
    },
    methods: {
      async loadOrderData() {
        try {
          if (!this.userInfo || !this.userInfo._id) {
            uni.showToast({
              title: "请先登录",
              icon: "none"
            });
            return;
          }
          const db2 = nr.database();
          for (let i2 = 1; i2 <= 5; i2++) {
            this.orderCounts[i2] = 0;
          }
          let query = {
            userId: this.userInfo._id
          };
          switch (this.currentTab) {
            case 1:
              query.paymentStatus = 0;
              break;
            case 2:
              query.paymentStatus = 1;
              query.shareStatus = 0;
              break;
            case 3:
              query.paymentStatus = 1;
              query.shippingStatus = 0;
              break;
            case 4:
              query.shippingStatus = 1;
              query.deliveryStatus = 0;
              break;
            case 5:
              query.deliveryStatus = 1;
              query.reviewStatus = 1;
              break;
            case 6:
              query.deliveryStatus = 1;
              query.reviewStatus = 0;
              break;
          }
          const result = await db2.collection("order").where(query).orderBy("createdAt", "desc").get();
          if (result.result.data) {
            this.orderList[this.currentTab] = result.result.data;
            if (this.currentTab === 3 && this.orderList[this.currentTab].length > 0) {
              this.orderList[this.currentTab].forEach((order) => {
                if (order.shippingStatus === 0) {
                  this.startAutoShipping(order);
                }
              });
            }
          } else {
            this.orderList[this.currentTab] = [];
          }
          if (this.currentTab === 0) {
            const allResult = await db2.collection("order").where({
              userId: this.userInfo._id
            }).orderBy("createdAt", "desc").get();
            if (allResult.result.data) {
              this.orderList[0] = allResult.result.data;
            } else {
              this.orderList[0] = [];
            }
          }
          await this.getOrderCounts();
          uni.setStorageSync("orderCounts", this.orderCounts);
        } catch (error) {
          formatAppLog("error", "at pages/user/order.vue:524", "加载订单数据失败:", error);
          uni.showToast({
            title: "加载订单数据失败",
            icon: "none"
          });
        }
      },
      async getOrderCounts() {
        try {
          const db2 = nr.database();
          const queries = [
            // 待付款
            db2.collection("order").where({
              userId: this.userInfo._id,
              paymentStatus: 0
            }).count(),
            // 待分享
            db2.collection("order").where({
              userId: this.userInfo._id,
              paymentStatus: 1,
              shareStatus: 0
            }).count(),
            // 待发货
            db2.collection("order").where({
              userId: this.userInfo._id,
              paymentStatus: 1,
              shippingStatus: 0
            }).count(),
            // 待收货
            db2.collection("order").where({
              userId: this.userInfo._id,
              shippingStatus: 1,
              deliveryStatus: 0
            }).count(),
            // 已评价
            db2.collection("order").where({
              userId: this.userInfo._id,
              deliveryStatus: 1,
              reviewStatus: 1
            }).count(),
            // 新增：未评价
            db2.collection("order").where({
              userId: this.userInfo._id,
              deliveryStatus: 1,
              reviewStatus: 0
            }).count()
          ];
          const results = await Promise.all(queries);
          for (let i2 = 0; i2 < results.length; i2++) {
            this.orderCounts[i2 + 1] = results[i2].result.total;
          }
        } catch (error) {
          formatAppLog("error", "at pages/user/order.vue:585", "获取订单数量失败:", error);
        }
      },
      async getRandomGoods() {
        try {
          const {
            result
          } = await nr.database().collection("mall-goods").limit(8).get();
          this.randomGoods = this.shuffleArray(result.data || []);
        } catch (err2) {
          formatAppLog("error", "at pages/user/order.vue:595", "获取商品数据失败:", err2);
        }
      },
      shuffleArray(array) {
        if (!Array.isArray(array)) {
          return [];
        }
        const newArray = [...array];
        for (let i2 = newArray.length - 1; i2 > 0; i2--) {
          const j2 = Math.floor(Math.random() * (i2 + 1));
          [newArray[i2], newArray[j2]] = [newArray[j2], newArray[i2]];
        }
        return newArray;
      },
      getOrderStatus(order) {
        if (order.paymentStatus === 0)
          return "待付款";
        if (order.paymentStatus === 1 && order.shareStatus === 0)
          return "待分享";
        if (order.paymentStatus === 1 && order.shippingStatus === 0)
          return "待发货";
        if (order.shippingStatus === 1 && order.deliveryStatus === 0)
          return "待收货";
        if (order.deliveryStatus === 1 && order.reviewStatus === 0)
          return "未评价";
        return "已完成";
      },
      switchTab(index) {
        this.currentTab = index;
        this.loadOrderData();
        formatAppLog("log", "at pages/user/order.vue:620", `切换到选项卡 ${index}，数据:`, this.orderList[index]);
      },
      handleSwiperChange(e) {
        this.currentTab = e.detail.current;
        this.loadOrderData();
        formatAppLog("log", "at pages/user/order.vue:625", `切换到选项卡 ${this.currentTab}，数据:`, this.orderList[this.currentTab]);
      },
      async goToPay(order) {
        var _a;
        const paymentData = {
          amount: order.amount,
          userId: this.userInfo._id,
          username: this.userInfo.username,
          mobile: this.userInfo.mobile,
          avatar: ((_a = this.userInfo.avatar_file) == null ? void 0 : _a.path) || "/static/avatar-default.png",
          productId: order.productId,
          productName: order.productName,
          productImage: order.productImage,
          quantity: order.quantity
        };
        uni.setStorageSync("paymentData", paymentData);
        uni.setStorageSync("currentOrderIds", [order._id]);
        uni.navigateTo({
          url: "/pages/wallet/pay"
        });
      },
      async cancelOrder(order) {
        try {
          const db2 = nr.database();
          await db2.collection("order").doc(order._id).update({
            paymentStatus: 2
            // 取消状态
          });
          uni.showToast({
            title: "订单已取消",
            icon: "success"
          });
          this.loadOrderData();
        } catch (error) {
          formatAppLog("error", "at pages/user/order.vue:657", "取消订单失败:", error);
          uni.showToast({
            title: "取消订单失败",
            icon: "none"
          });
        }
      },
      shareOrderWithDelay(order) {
        this.shareCountdown = 3;
        this.$refs.sharePopup.open();
        this.shareTimer = setInterval(() => {
          this.shareCountdown--;
          if (this.shareCountdown <= 0) {
            clearInterval(this.shareTimer);
            this.$refs.sharePopup.close();
            this.shareOrder(order);
          }
        }, 1e3);
      },
      async shareOrder(order) {
        try {
          const db2 = nr.database();
          await db2.collection("order").doc(order._id).update({
            shareStatus: 1
            // 已分享状态
          });
          uni.showToast({
            title: "分享成功",
            icon: "success"
          });
          this.loadOrderData();
          setTimeout(async () => {
            try {
              await db2.collection("order").doc(order._id).update({
                shippingStatus: 1
                // 已发货状态
              });
              formatAppLog("log", "at pages/user/order.vue:697", "订单自动发货成功:", order._id);
              this.loadOrderData();
            } catch (error) {
              formatAppLog("error", "at pages/user/order.vue:700", "自动发货失败:", error);
            }
          }, 3e3);
        } catch (error) {
          formatAppLog("error", "at pages/user/order.vue:704", "分享订单失败:", error);
          uni.showToast({
            title: "分享失败",
            icon: "none"
          });
        }
      },
      async confirmReceipt(order) {
        try {
          const db2 = nr.database();
          await db2.collection("order").doc(order._id).update({
            deliveryStatus: 1,
            // 已收货状态
            reviewStatus: 0
            // 设置为未评价状态
          });
          this.showReviewPopup(order);
          this.loadOrderData();
        } catch (error) {
          formatAppLog("error", "at pages/user/order.vue:724", "确认收货失败:", error);
          uni.showToast({
            title: "确认收货失败",
            icon: "none"
          });
        }
      },
      showReviewPopup(order) {
        this.currentOrderForReview = order;
        this.reviewContent = "";
        if (this.$refs.reviewPopup) {
          this.$refs.reviewPopup.open();
        } else {
          formatAppLog("error", "at pages/user/order.vue:738", "评价弹窗组件不存在");
          uni.showToast({
            title: "评价功能暂时不可用",
            icon: "none"
          });
        }
      },
      hideReviewPopup() {
        if (this.$refs.reviewPopup) {
          this.$refs.reviewPopup.close();
        }
        this.currentOrderForReview = null;
        this.reviewContent = "";
      },
      async submitReview() {
        if (!this.reviewContent.trim()) {
          uni.showToast({
            title: "请输入评价内容",
            icon: "none"
          });
          return;
        }
        try {
          const db2 = nr.database();
          const timestamp = (/* @__PURE__ */ new Date()).getTime();
          await db2.collection("order").doc(this.currentOrderForReview._id).update({
            review: this.reviewContent,
            reviewStatus: 1,
            // 设置为已评价
            updatedAt: timestamp
          });
          let productId = this.currentOrderForReview.productId;
          formatAppLog("log", "at pages/user/order.vue:775", "商品id", productId);
          if (Array.isArray(productId)) {
            productId = productId[0];
          }
          const goodsRes = await db2.collection("mall-goods").doc(productId).get();
          formatAppLog("log", "at pages/user/order.vue:783", "已经存在的商品数据", goodsRes);
          if (!goodsRes.result.data) {
            throw new Error("商品不存在");
          }
          let currentReviews = goodsRes.result.data[0].reviews || [];
          formatAppLog("log", "at pages/user/order.vue:790", "已经存在的商品的评论数据", currentReviews);
          currentReviews = [...currentReviews, this.reviewContent];
          formatAppLog("log", "at pages/user/order.vue:795", "更新后的的商品的评论数据", currentReviews);
          await db2.collection("mall-goods").doc(productId).update({
            reviews: currentReviews
          });
          const endgoodsRes = await db2.collection("mall-goods").doc(productId).get();
          formatAppLog("log", "at pages/user/order.vue:804", "更新后的商品数据:", endgoodsRes);
          uni.showToast({
            title: "评价成功",
            icon: "success"
          });
          this.hideReviewPopup();
          this.loadOrderData();
        } catch (error) {
          formatAppLog("error", "at pages/user/order.vue:813", "提交评价失败:", error);
          uni.showToast({
            title: "提交评价失败: " + (error.message || "请重试"),
            icon: "none"
          });
        }
      },
      // 计算平均评分的方法
      calculateAverageRating(reviews) {
        if (!reviews || reviews.length === 0)
          return 5;
        const sum = reviews.reduce((total, review) => total + (review.rating || 5), 0);
        return Math.round(sum / reviews.length * 10) / 10;
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            uni.navigateTo({
              url: "../search/mall-details"
            });
          }
        });
      },
      navigateBack() {
        uni.switchTab({
          url: "/pages/user/user"
        });
      },
      handleScroll() {
      },
      startAutoShipping(order) {
        setTimeout(async () => {
          try {
            const db2 = nr.database();
            await db2.collection("order").doc(order._id).update({
              shippingStatus: 1
              // 已发货状态
            });
            formatAppLog("log", "at pages/user/order.vue:854", "订单自动发货成功:", order._id);
            this.loadOrderData();
          } catch (error) {
            formatAppLog("error", "at pages/user/order.vue:857", "自动发货失败:", error);
          }
        }, 5e3);
      },
      navigateToProductDetails(productId) {
        if (!productId) {
          uni.showToast({
            title: "商品信息不完整",
            icon: "none"
          });
          return;
        }
        formatAppLog("log", "at pages/user/order.vue:871", "跳转商品详情页的商品id", productId);
        let idString = productId;
        if (typeof productId === "object" && productId[0]) {
          idString = productId[0];
        }
        const db2 = nr.database();
        db2.collection("mall-goods").doc(idString).get().then((res) => {
          if (res.result.data) {
            formatAppLog("log", "at pages/user/order.vue:882", "跳转商品详情页的商品数据", res.result.data);
            const goodsData = Array.isArray(res.result.data) ? res.result.data[0] : res.result.data;
            uni.setStorage({
              key: "currentProduct",
              data: goodsData,
              success: () => {
                uni.navigateTo({
                  url: "../search/mall-details"
                });
              }
            });
          } else {
            uni.showToast({
              title: "商品不存在或已下架",
              icon: "none"
            });
          }
        }).catch((err2) => {
          formatAppLog("error", "at pages/user/order.vue:901", "获取商品详情失败:", err2);
          uni.showToast({
            title: "获取商品详情失败",
            icon: "none"
          });
        });
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 固定头部区域 "),
      vue.createElementVNode("view", { class: "fixed-header" }, [
        vue.createCommentVNode(" 状态栏占位 "),
        vue.createElementVNode("view", { class: "status-bar" }),
        vue.createCommentVNode(" 顶部导航栏 "),
        vue.createElementVNode("view", { class: "nav-header" }, [
          vue.createElementVNode("view", {
            class: "back-icon",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.navigateBack && $options.navigateBack(...args))
          }, [
            vue.createElementVNode("image", {
              src: _imports_0,
              class: "icon-back"
            })
          ]),
          vue.createElementVNode("text", { class: "page-title" }, "我的订单")
        ]),
        vue.createCommentVNode(" 选项卡导航 "),
        vue.createElementVNode("scroll-view", {
          "scroll-x": "true",
          class: "tab-scroll",
          "scroll-into-view": "tab" + $data.currentTab,
          "scroll-with-animation": true,
          onScroll: _cache[1] || (_cache[1] = (...args) => $options.handleScroll && $options.handleScroll(...args))
        }, [
          vue.createElementVNode("view", { class: "tabs" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.tabs, (tab, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  id: "tab" + index,
                  class: vue.normalizeClass(["tab-item", { active: $data.currentTab === index }]),
                  onClick: ($event) => $options.switchTab(index)
                }, [
                  vue.createTextVNode(
                    vue.toDisplayString(tab) + " ",
                    1
                    /* TEXT */
                  ),
                  $data.currentTab === index ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "tab-line"
                  })) : vue.createCommentVNode("v-if", true)
                ], 10, ["id", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ], 40, ["scroll-into-view"])
      ]),
      vue.createCommentVNode(" 内容区域 "),
      vue.createElementVNode("swiper", {
        class: "swiper-content",
        current: $data.currentTab,
        onChange: _cache[2] || (_cache[2] = (...args) => $options.handleSwiperChange && $options.handleSwiperChange(...args))
      }, [
        vue.createCommentVNode(" 全部 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[0] && $data.orderList[0].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[0], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode(
                        "text",
                        { class: "order-status" },
                        vue.toDisplayString($options.getOrderStatus(order)),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          onClick: ($event) => $options.navigateToProductDetails(order.productId),
                          mode: "aspectFill",
                          class: "product-image"
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "product-desc" },
                          vue.toDisplayString(order.description),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "order-actions" }, [
                          vue.createCommentVNode(" 待付款状态 "),
                          order.paymentStatus === 0 ? (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 0 },
                            [
                              vue.createElementVNode("button", {
                                class: "action-btn cancel",
                                onClick: ($event) => $options.cancelOrder(order)
                              }, "取消订单", 8, ["onClick"]),
                              vue.createElementVNode("button", {
                                class: "action-btn primary",
                                onClick: ($event) => $options.goToPay(order)
                              }, "去支付", 8, ["onClick"])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : order.paymentStatus === 1 && order.shareStatus === 0 ? (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 1 },
                            [
                              vue.createCommentVNode(" 待分享状态 "),
                              vue.createElementVNode("button", {
                                class: "action-btn cancel",
                                onClick: ($event) => $options.cancelOrder(order)
                              }, "取消订单", 8, ["onClick"]),
                              vue.createElementVNode("button", {
                                class: "action-btn primary",
                                onClick: ($event) => $options.shareOrderWithDelay(order)
                              }, "去分享", 8, ["onClick"])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : order.shippingStatus === 1 && order.deliveryStatus === 0 ? (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 2 },
                            [
                              vue.createCommentVNode(" 待收货状态 "),
                              vue.createElementVNode("button", {
                                class: "action-btn primary",
                                onClick: ($event) => $options.confirmReceipt(order)
                              }, "确认收货", 8, ["onClick"])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : order.deliveryStatus === 1 && order.reviewStatus === 0 ? (vue.openBlock(), vue.createElementBlock(
                            vue.Fragment,
                            { key: 3 },
                            [
                              vue.createCommentVNode(" 未评价状态 "),
                              vue.createElementVNode("button", {
                                class: "action-btn primary",
                                onClick: ($event) => $options.showReviewPopup(order)
                              }, "去评价", 8, ["onClick"])
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : vue.createCommentVNode("v-if", true)
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您还没有相关的订单")
              ]))
            ])
          ])
        ]),
        vue.createCommentVNode(" 待付款 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[1] && $data.orderList[1].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[1], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createCommentVNode(" 待付款订单内容 "),
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode("text", { class: "order-status" }, "待付款")
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          onClick: ($event) => $options.navigateToProductDetails(order.productId),
                          mode: "aspectFill",
                          class: "product-image"
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "product-desc" },
                          vue.toDisplayString(order.description),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "order-actions" }, [
                          vue.createElementVNode("button", {
                            class: "action-btn cancel",
                            onClick: ($event) => $options.cancelOrder(order)
                          }, "取消订单", 8, ["onClick"]),
                          vue.createElementVNode("button", {
                            class: "action-btn primary",
                            onClick: ($event) => $options.goToPay(order)
                          }, "去支付", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您还没有待付款的订单")
              ]))
            ])
          ])
        ]),
        vue.createCommentVNode(" 待分享 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[2] && $data.orderList[2].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[2], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createCommentVNode(" 待分享订单内容 "),
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode("text", { class: "order-status" }, "待分享")
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          onClick: ($event) => $options.navigateToProductDetails(order.productId),
                          mode: "aspectFill",
                          class: "product-image"
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "product-desc" },
                          vue.toDisplayString(order.description),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "order-actions" }, [
                          vue.createElementVNode("button", {
                            class: "action-btn cancel",
                            onClick: ($event) => $options.cancelOrder(order)
                          }, "取消订单", 8, ["onClick"]),
                          vue.createElementVNode("button", {
                            class: "action-btn primary",
                            onClick: ($event) => $options.shareOrderWithDelay(order)
                          }, "去分享", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您还没有待分享的订单")
              ]))
            ])
          ])
        ]),
        vue.createCommentVNode(" 待发货 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[3] && $data.orderList[3].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[3], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createCommentVNode(" 待发货订单内容 "),
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode("text", { class: "order-status" }, "待发货")
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          onClick: ($event) => $options.navigateToProductDetails(order.productId),
                          mode: "aspectFill",
                          class: "product-image"
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "product-desc" },
                          vue.toDisplayString(order.description),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您还没有待发货的订单")
              ]))
            ])
          ])
        ]),
        vue.createCommentVNode(" 待收货 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[4] && $data.orderList[4].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[4], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createCommentVNode(" 待收货订单内容 "),
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode("text", { class: "order-status" }, "待收货")
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          mode: "aspectFill",
                          class: "product-image",
                          onClick: ($event) => $options.navigateToProductDetails(order.productId)
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "product-desc" },
                          vue.toDisplayString(order.description),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "order-actions" }, [
                          vue.createElementVNode("button", {
                            class: "action-btn primary",
                            onClick: ($event) => $options.confirmReceipt(order)
                          }, "确认收货", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您还没有待收货的订单")
              ]))
            ])
          ])
        ]),
        vue.createCommentVNode(" 已评价 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[5] && $data.orderList[5].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[5], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createCommentVNode(" 已评价订单内容 "),
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode("text", { class: "order-status" }, "已评价")
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          onClick: ($event) => $options.navigateToProductDetails(order.productId),
                          mode: "aspectFill",
                          class: "product-image"
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "review-content" }, [
                          vue.createElementVNode("text", { class: "review-label" }, "我的评价："),
                          vue.createElementVNode(
                            "text",
                            { class: "review-text" },
                            vue.toDisplayString(order.review),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您还没有已评价的订单")
              ]))
            ])
          ])
        ]),
        vue.createCommentVNode(" 未评价 "),
        vue.createElementVNode("swiper-item", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-y": "true",
            class: "order-list"
          }, [
            vue.createElementVNode("view", { class: "orders-section" }, [
              $data.orderList[6] && $data.orderList[6].length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                vue.renderList($data.orderList[6], (order, orderIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: orderIndex,
                    class: "order-item"
                  }, [
                    vue.createCommentVNode(" 未评价订单内容 "),
                    vue.createElementVNode("view", { class: "store-info" }, [
                      vue.createElementVNode("image", {
                        class: "store-icon",
                        src: _imports_1,
                        mode: "aspectFit"
                      }),
                      vue.createElementVNode("text", { class: "store-name" }, "拼多多官方旗舰店"),
                      vue.createElementVNode("text", { class: "order-status" }, "未评价")
                    ]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode("view", { class: "product-details" }, [
                        vue.createElementVNode("image", {
                          src: order.productImage,
                          onClick: ($event) => $options.navigateToProductDetails(order.productId),
                          mode: "aspectFill",
                          class: "product-image"
                        }, null, 8, ["src", "onClick"]),
                        vue.createElementVNode(
                          "text",
                          { class: "product-name" },
                          vue.toDisplayString(order.productName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "product-desc" },
                          vue.toDisplayString(order.description),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "price-info" }, [
                          vue.createElementVNode(
                            "text",
                            { class: "quantity" },
                            "x" + vue.toDisplayString(order.quantity),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "price" },
                            "¥" + vue.toDisplayString(order.amount),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode("view", { class: "order-actions" }, [
                          vue.createElementVNode("button", {
                            class: "action-btn primary",
                            onClick: ($event) => $options.showReviewPopup(order)
                          }, "去评价", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "empty-state"
              }, [
                vue.createElementVNode("image", {
                  src: _imports_2,
                  mode: "aspectFit",
                  class: "empty-icon"
                }),
                vue.createElementVNode("text", null, "您没有未评价的订单")
              ]))
            ])
          ])
        ])
      ], 40, ["current"]),
      vue.createCommentVNode(" 评价弹窗 "),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "reviewPopup",
          type: "bottom"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "review-popup" }, [
              vue.createElementVNode("view", { class: "popup-header" }, [
                vue.createElementVNode("image", {
                  src: _imports_0,
                  class: "icon-back-popup",
                  onClick: _cache[3] || (_cache[3] = (...args) => $options.hideReviewPopup && $options.hideReviewPopup(...args))
                }),
                vue.createElementVNode("text", { class: "popup-title" }, "商品评价")
              ]),
              vue.createElementVNode("view", { class: "review-content-popup" }, [
                vue.withDirectives(vue.createElementVNode(
                  "textarea",
                  {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.reviewContent = $event),
                    placeholder: "请输入您的评价内容",
                    class: "review-textarea"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $data.reviewContent]
                ]),
                vue.createElementVNode("button", {
                  class: "submit-review",
                  onClick: _cache[5] || (_cache[5] = (...args) => $options.submitReview && $options.submitReview(...args))
                }, "提交评价")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      ),
      vue.createCommentVNode(" 分享提示弹窗 "),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "sharePopup",
          type: "center"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "share-popup" }, [
              vue.createElementVNode("view", { class: "share-popup-content" }, [
                vue.createElementVNode("text", { class: "share-popup-title" }, "分享成功"),
                vue.createElementVNode("text", { class: "share-popup-text" }, "3秒后将自动为您发货"),
                vue.createElementVNode(
                  "text",
                  { class: "share-popup-countdown" },
                  vue.toDisplayString($data.shareCountdown) + "s",
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesUserOrder = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-506ae539"], ["__file", "G:/mobile application development/pdd/pages/user/order.vue"]]);
  const _sfc_main$g = {
    data() {
      return {
        avatar_file: "",
        username: "",
        mobile: "",
        address: "",
        locationInfo: null,
        mapUrl: "",
        key: "21bbea8854ce73ebd9163d7cf6cc9c76"
        // 高德地图API key
      };
    },
    onLoad() {
      this.loadUserInfo();
      this.getLocationByIP();
    },
    methods: {
      async loadUserInfo() {
        try {
          const res = await nr.callFunction({
            name: "uni-id-cf",
            data: {
              action: "getCurrentUserInfo",
              params: {
                uid: store.userInfo._id,
                field: ["username", "mobile", "address", "avatar_file"]
                // 只获取需要的字段
              }
            }
          });
          if (res.result.code === 0) {
            const userInfo = res.result.userInfo;
            formatAppLog("log", "at pages/user/set.vue:124", "用户信息", userInfo);
            this.username = userInfo.username || "";
            this.mobile = userInfo.mobile || "";
            this.address = userInfo.address || "";
            this.avatar_file = userInfo.avatar_file || "";
            store.userInfo = {
              ...store.userInfo,
              ...userInfo
            };
          } else {
            throw new Error(res.result.message || "获取用户信息失败");
          }
        } catch (e) {
          formatAppLog("error", "at pages/user/set.vue:139", "获取用户信息失败:", e);
          const localInfo = store.userInfo || {};
          this.username = localInfo.username || "";
          this.mobile = localInfo.mobile || "";
          this.address = localInfo.address || "";
          this.avatar_file = localInfo.avatar_file || "";
          uni.showToast({
            title: "获取信息失败，使用缓存数据",
            icon: "none"
          });
        }
      },
      async saveUserInfo() {
        if (!this.username || !this.mobile || !this.address) {
          uni.showToast({
            title: "请填写完整信息",
            icon: "none"
          });
          return;
        }
        try {
          const db2 = nr.database();
          await db2.collection("uni-id-users").doc(store.userInfo._id).update({
            username: this.username,
            mobile: this.mobile,
            address: this.address
          });
          store.userInfo = {
            ...store.userInfo,
            username: this.username,
            mobile: this.mobile,
            address: this.address,
            avatar_file: this.avatar_file
          };
          formatAppLog("log", "at pages/user/set.vue:177", "之后用户信息", store.userInfo);
          uni.showToast({
            title: "保存成功",
            icon: "success"
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } catch (error) {
          formatAppLog("error", "at pages/user/set.vue:187", "保存用户信息失败:", error);
          uni.showToast({
            title: "保存失败，请重试",
            icon: "none"
          });
        }
      },
      handleBack() {
        uni.navigateBack();
      },
      handleLogout() {
        uni.showModal({
          title: "提示",
          content: "确定要退出登录吗？",
          success: async (res) => {
            if (res.confirm) {
              try {
                uni.removeStorageSync("uni_id_token");
                uni.removeStorageSync("uni_id_userinfo");
                store.userInfo = {};
                uni.redirectTo({
                  url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
                });
              } catch (error) {
                formatAppLog("error", "at pages/user/set.vue:216", "退出登录失败:", error);
                uni.showToast({
                  title: "退出登录失败，请重试",
                  icon: "none"
                });
              }
            }
          }
        });
      },
      // 地图相关方法
      async getLocationByIP() {
        uni.showLoading({
          title: "定位中..."
        });
        try {
          const ipRes = await this.getIPLocation();
          formatAppLog("log", "at pages/user/set.vue:233", "定位信息:", ipRes);
          this.locationInfo = ipRes.data;
          let originalLng = 0, originalLat = 0;
          if (ipRes.data.rectangle) {
            const rectangles = ipRes.data.rectangle.split(";");
            if (rectangles.length > 0) {
              const center = rectangles[0].split(",");
              originalLng = parseFloat(center[0]).toFixed(5);
              originalLat = parseFloat(center[1]).toFixed(5);
              let correctedLng = parseFloat(originalLng) + 0.43914;
              let correctedLat = parseFloat(originalLat) + 0.15293;
              this.mapUrl = `https://restapi.amap.com/v3/staticmap?location=${correctedLng},${correctedLat}&zoom=14&size=600*300&markers=mid,,A:${correctedLng},${correctedLat}&key=${this.key}`;
            }
          }
        } catch (error) {
          formatAppLog("error", "at pages/user/set.vue:250", "定位失败:", error);
          this.locationInfo = null;
          uni.showToast({
            title: "定位失败",
            icon: "none"
          });
        } finally {
          uni.hideLoading();
        }
      },
      getIPLocation() {
        return new Promise((resolve, reject) => {
          uni.request({
            url: `https://restapi.amap.com/v3/ip?key=${this.key}`,
            success: (res) => {
              if (res.data.status === "1") {
                resolve(res);
              } else {
                reject(new Error(res.data.info || "定位失败"));
              }
            },
            fail: (err2) => {
              reject(err2);
            }
          });
        });
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 顶部导航栏 "),
      vue.createElementVNode("view", { class: "nav-bar" }, [
        vue.createElementVNode("view", {
          class: "nav-back",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleBack && $options.handleBack(...args))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "",
            class: "back-icon"
          })
        ]),
        vue.createElementVNode("text", { class: "page-title" }, "个人信息")
      ]),
      vue.createElementVNode(
        "form",
        {
          onSubmit: _cache[5] || (_cache[5] = (...args) => $options.saveUserInfo && $options.saveUserInfo(...args))
        },
        [
          vue.createElementVNode("view", { class: "form-card" }, [
            vue.createElementVNode("view", { class: "form-item avatar_file-item" }, [
              vue.createElementVNode("text", { class: "label" }, "头像"),
              vue.createElementVNode("view", { class: "avatar_file-wrapper" }, [
                vue.createElementVNode("img", {
                  src: $data.avatar_file.url,
                  alt: ""
                }, null, 8, ["src"])
              ])
            ]),
            vue.createElementVNode("view", { class: "divider" }),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", { class: "label" }, "用户名"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "text",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.username = $event),
                  placeholder: "请输入用户名"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.username]
              ])
            ]),
            vue.createElementVNode("view", { class: "divider" }),
            vue.createElementVNode("view", { class: "form-item" }, [
              vue.createElementVNode("text", { class: "label" }, "手机号码"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "input",
                  type: "number",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.mobile = $event),
                  placeholder: "请输入手机号码"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.mobile]
              ])
            ]),
            vue.createElementVNode("view", { class: "divider" }),
            vue.createElementVNode("view", { class: "form-item address-item" }, [
              vue.createElementVNode("text", { class: "label" }, "收货地址"),
              vue.withDirectives(vue.createElementVNode(
                "textarea",
                {
                  class: "textarea",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.address = $event),
                  placeholder: "请输入详细收货地址"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.address]
              ])
            ])
          ]),
          vue.createCommentVNode(" 地图显示区域 "),
          $data.locationInfo ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "section-title"
          }, [
            vue.createElementVNode("view", { class: "title-line" }),
            vue.createElementVNode("text", null, "位置信息"),
            vue.createElementVNode("view", { class: "title-line" })
          ])) : vue.createCommentVNode("v-if", true),
          $data.locationInfo ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "map-card"
          }, [
            $data.mapUrl ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: $data.mapUrl,
              mode: "widthFix",
              class: "map-image"
            }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "map-placeholder"
            }, [
              vue.createElementVNode("text", { class: "placeholder-text" }, "地图加载中...")
            ]))
          ])) : vue.createCommentVNode("v-if", true),
          $data.locationInfo ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "location-info-card"
          }, [
            vue.createElementVNode("view", { class: "location-header" }, [
              vue.createElementVNode("text", { class: "location-title" }, "您的大概位置")
            ]),
            vue.createElementVNode("view", { class: "location-detail" }, [
              vue.createElementVNode("view", { class: "location-item" }, [
                vue.createElementVNode("text", { class: "location-label" }, "省份:"),
                vue.createElementVNode(
                  "text",
                  { class: "location-value" },
                  vue.toDisplayString($data.locationInfo.province || "未知"),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "location-item" }, [
                vue.createElementVNode("text", { class: "location-label" }, "城市:"),
                vue.createElementVNode(
                  "text",
                  { class: "location-value" },
                  vue.toDisplayString($data.locationInfo.city || "未知"),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 定位失败提示 "),
          !$data.locationInfo ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "location-fail"
          }, [
            vue.createElementVNode("text", null, "检测到当前连接的网络为IPv6，因定位技术限制请连接IPv4的网络（公网IP地址）来显示当前所处位置的地图（不影响修改和保存您的用户信息）")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 按钮区域 "),
          vue.createElementVNode("button", {
            "form-type": "submit",
            class: "save-btn"
          }, [
            vue.createElementVNode("text", { class: "btn-text" }, "保存修改")
          ]),
          vue.createElementVNode("view", {
            class: "logout-btn",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.handleLogout && $options.handleLogout(...args))
          }, [
            vue.createElementVNode("text", null, "退出登录")
          ])
        ],
        32
        /* NEED_HYDRATION */
      )
    ]);
  }
  const PagesUserSet = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__scopeId", "data-v-2193d213"], ["__file", "G:/mobile application development/pdd/pages/user/set.vue"]]);
  const _sfc_main$f = {
    data() {
      return {
        currentTab: 0,
        searchPlaceholder: "请输入商品信息",
        categories: [],
        currentTabData: [],
        allGoods: [],
        banners: [],
        currentSwiperIndex: 0
        // 新增当前轮播图索引
      };
    },
    onLoad() {
      this.getInitialData();
    },
    methods: {
      async getInitialData() {
        try {
          await Promise.all([this.getCategories(), this.getGoods(), this.getBanners()]);
          this.switchTab(0);
          if (this.allGoods.length > 0) {
            this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
          }
        } catch (err2) {
          formatAppLog("error", "at pages/subsidy/subsidy.vue:91", "获取数据失败:", err2);
        }
      },
      onSwiperChange(e) {
        this.currentSwiperIndex = e.detail.current;
      },
      async getCategories() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("mall-categories").get();
          this.categories = data2 || [];
        } catch (err2) {
          formatAppLog("error", "at pages/subsidy/subsidy.vue:106", "获取分类数据失败:", err2);
        }
      },
      async getGoods() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("mall-goods").get();
          this.allGoods = data2 || [];
        } catch (err2) {
          formatAppLog("error", "at pages/subsidy/subsidy.vue:118", "获取商品数据失败:", err2);
        }
      },
      async getBanners() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("banner").get();
          const bannerData = data2[0] || {};
          this.banners = bannerData.banner_imgs.slice(0, 6).map((item) => item.fileID || item.url);
        } catch (err2) {
          formatAppLog("error", "at pages/subsidy/subsidy.vue:131", "获取轮播图数据失败:", err2);
        }
      },
      switchTab(index) {
        this.currentTab = index;
        const currentCategory = this.categories[index];
        if (!currentCategory)
          return;
        if (index === 0) {
          const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
          this.currentTabData = shuffledGoods.slice(0, 30);
        } else {
          this.currentTabData = this.allGoods.filter((item) => parseInt(item.category_id) === parseInt(
            currentCategory.sort
          ));
        }
      },
      navigateToSearch() {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      },
      navBack() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            formatAppLog("log", "at pages/subsidy/subsidy.vue:164", "商品信息存储成功", item);
          }
        });
        uni.navigateTo({
          url: "../search/mall-details"
        });
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" Fixed header "),
      vue.createElementVNode("view", { class: "fixed-head" }, [
        vue.createElementVNode("view", { class: "search-container" }, [
          vue.createElementVNode("image", {
            class: "back-icon",
            src: _imports_0,
            mode: "aspectFit",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
          }),
          vue.createElementVNode("view", {
            class: "search-box",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.navigateToSearch && $options.navigateToSearch(...args))
          }, [
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_1$5,
              mode: "aspectFit"
            }),
            vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              placeholder: $data.searchPlaceholder
            }, null, 8, ["placeholder"]),
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_2$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "tab-container" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.categories, (tab, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: vue.normalizeClass(["tab-item", { active: $data.currentTab === index }]),
                onClick: ($event) => $options.switchTab(index)
              }, vue.toDisplayString(tab.name), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" Scrollable content "),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "scroll-container"
      }, [
        vue.createCommentVNode(" 修改后的轮播图部分 "),
        vue.createElementVNode("view", { class: "banner-container" }, [
          vue.createElementVNode(
            "swiper",
            {
              class: "banner-swiper",
              "indicator-dots": false,
              autoplay: "true",
              interval: "5000",
              circular: "true",
              onChange: _cache[2] || (_cache[2] = (...args) => $options.onSwiperChange && $options.onSwiperChange(...args))
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.banners, (banner, index) => {
                  return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                    vue.createElementVNode("image", {
                      class: "banner-image",
                      src: banner,
                      mode: "aspectFill"
                    }, null, 8, ["src"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createCommentVNode(" 添加自定义指示器 "),
          vue.createElementVNode(
            "view",
            { class: "custom-indicator" },
            vue.toDisplayString($data.currentSwiperIndex + 1) + "/" + vue.toDisplayString($data.banners.length),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 修改后的content区域，与第一个页面完全一致 "),
        vue.createElementVNode("view", { class: "content" }, [
          $data.currentTab !== null ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tab-content"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.currentTabData, (item, index) => {
                var _a;
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "content-item",
                  onClick: ($event) => $options.navigateToProduct(item)
                }, [
                  vue.createElementVNode("view", { class: "product-card" }, [
                    vue.createElementVNode("image", {
                      class: "item-image",
                      src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                      mode: "aspectFit",
                      "lazy-load": true
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "item-title" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "service-tags" }, [
                        vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                        vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                      ]),
                      vue.createElementVNode("view", { class: "price-row" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "price" },
                          "¥" + vue.toDisplayString(item.price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "sales" },
                          "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "loading"
          }, "加载中..."))
        ])
      ])
    ]);
  }
  const PagesSubsidySubsidy = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-ae46ba77"], ["__file", "G:/mobile application development/pdd/pages/subsidy/subsidy.vue"]]);
  const _sfc_main$e = {
    data() {
      return {
        currentTab: 0,
        searchPlaceholder: "请输入商品信息",
        categories: [],
        currentTabData: [],
        allGoods: [],
        banners: [],
        currentSwiperIndex: 0
        // 新增当前轮播图索引
      };
    },
    onLoad() {
      this.getInitialData();
    },
    methods: {
      async getInitialData() {
        try {
          await Promise.all([this.getCategories(), this.getGoods(), this.getBanners()]);
          this.switchTab(0);
          if (this.allGoods.length > 0) {
            this.searchPlaceholder = this.allGoods[Math.floor(Math.random() * this.allGoods.length)].keywords || "请输入商品信息";
          }
        } catch (err2) {
          formatAppLog("error", "at pages/buy-vegetables/buy-vegetables.vue:91", "获取数据失败:", err2);
        }
      },
      onSwiperChange(e) {
        this.currentSwiperIndex = e.detail.current;
      },
      async getCategories() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("mall-categories").get();
          this.categories = data2 || [];
        } catch (err2) {
          formatAppLog("error", "at pages/buy-vegetables/buy-vegetables.vue:106", "获取分类数据失败:", err2);
        }
      },
      async getGoods() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("mall-goods").get();
          this.allGoods = data2 || [];
        } catch (err2) {
          formatAppLog("error", "at pages/buy-vegetables/buy-vegetables.vue:118", "获取商品数据失败:", err2);
        }
      },
      async getBanners() {
        try {
          const {
            result: {
              data: data2
            }
          } = await nr.database().collection("banner").get();
          const bannerData = data2[0] || {};
          this.banners = bannerData.banner_imgs.slice(0, 6).map((item) => item.fileID || item.url);
        } catch (err2) {
          formatAppLog("error", "at pages/buy-vegetables/buy-vegetables.vue:131", "获取轮播图数据失败:", err2);
        }
      },
      switchTab(index) {
        this.currentTab = index;
        const currentCategory = this.categories[index];
        if (!currentCategory)
          return;
        if (index === 0) {
          const shuffledGoods = [...this.allGoods].sort(() => Math.random() - 0.5);
          this.currentTabData = shuffledGoods.slice(0, 30);
        } else {
          this.currentTabData = this.allGoods.filter((item) => parseInt(item.category_id) === parseInt(
            currentCategory.sort
          ));
        }
      },
      navigateToSearch() {
        uni.navigateTo({
          url: "/pages/search/search"
        });
      },
      navBack() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      },
      navigateToProduct(item) {
        if (!item)
          return;
        uni.setStorage({
          key: "currentProduct",
          data: item,
          success: () => {
            formatAppLog("log", "at pages/buy-vegetables/buy-vegetables.vue:164", "商品信息存储成功", item);
          }
        });
        uni.navigateTo({
          url: "../search/mall-details"
        });
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" Fixed header "),
      vue.createElementVNode("view", { class: "fixed-head" }, [
        vue.createElementVNode("view", { class: "search-container" }, [
          vue.createElementVNode("image", {
            class: "back-icon",
            src: _imports_0,
            mode: "aspectFit",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
          }),
          vue.createElementVNode("view", {
            class: "search-box",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.navigateToSearch && $options.navigateToSearch(...args))
          }, [
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_1$5,
              mode: "aspectFit"
            }),
            vue.createElementVNode("input", {
              class: "search-input",
              type: "text",
              placeholder: $data.searchPlaceholder
            }, null, 8, ["placeholder"]),
            vue.createElementVNode("image", {
              class: "search-icon",
              src: _imports_2$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "tab-container" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.categories, (tab, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: vue.normalizeClass(["tab-item", { active: $data.currentTab === index }]),
                onClick: ($event) => $options.switchTab(index)
              }, vue.toDisplayString(tab.name), 11, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createCommentVNode(" Scrollable content "),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "scroll-container"
      }, [
        vue.createCommentVNode(" 修改后的轮播图部分 "),
        vue.createElementVNode("view", { class: "banner-container" }, [
          vue.createElementVNode(
            "swiper",
            {
              class: "banner-swiper",
              "indicator-dots": false,
              autoplay: "true",
              interval: "5000",
              circular: "true",
              onChange: _cache[2] || (_cache[2] = (...args) => $options.onSwiperChange && $options.onSwiperChange(...args))
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.banners, (banner, index) => {
                  return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                    vue.createElementVNode("image", {
                      class: "banner-image",
                      src: banner,
                      mode: "aspectFill"
                    }, null, 8, ["src"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            32
            /* NEED_HYDRATION */
          ),
          vue.createCommentVNode(" 添加自定义指示器 "),
          vue.createElementVNode(
            "view",
            { class: "custom-indicator" },
            vue.toDisplayString($data.currentSwiperIndex + 1) + "/" + vue.toDisplayString($data.banners.length),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 修改后的content区域，与第一个页面完全一致 "),
        vue.createElementVNode("view", { class: "content" }, [
          $data.currentTab !== null ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "tab-content"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.currentTabData, (item, index) => {
                var _a;
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "content-item",
                  onClick: ($event) => $options.navigateToProduct(item)
                }, [
                  vue.createElementVNode("view", { class: "product-card" }, [
                    vue.createElementVNode("image", {
                      class: "item-image",
                      src: (_a = item.goods_thumb) == null ? void 0 : _a.fileID,
                      mode: "aspectFit",
                      "lazy-load": true
                    }, null, 8, ["src"]),
                    vue.createElementVNode("view", { class: "product-info" }, [
                      vue.createElementVNode(
                        "text",
                        { class: "item-title" },
                        vue.toDisplayString(item.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "service-tags" }, [
                        vue.createElementVNode("text", { class: "tag pay-later" }, "先用后付"),
                        vue.createElementVNode("text", { class: "tag quick-refund" }, "极速退款")
                      ]),
                      vue.createElementVNode("view", { class: "price-row" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "price" },
                          "¥" + vue.toDisplayString(item.price),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "sales" },
                          "全店已拼" + vue.toDisplayString(item.total_sell_count) + "+件",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "loading"
          }, "加载中..."))
        ])
      ])
    ]);
  }
  const PagesBuyVegetablesBuyVegetables = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__scopeId", "data-v-5ba0e379"], ["__file", "G:/mobile application development/pdd/pages/buy-vegetables/buy-vegetables.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        url: ""
      };
    },
    onLoad(options) {
      if (options.url) {
        this.url = decodeURIComponent(options.url);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "webview-container" }, [
      vue.createElementVNode("web-view", { src: $data.url }, null, 8, ["src"])
    ]);
  }
  const PagesWebviewWebview = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-deb32cb9"], ["__file", "G:/mobile application development/pdd/pages/webview/webview.vue"]]);
  const ERR_MSG_OK = "chooseAndUploadFile:ok";
  const ERR_MSG_FAIL = "chooseAndUploadFile:fail";
  function chooseImage(opts) {
    const {
      count,
      sizeType = ["original", "compressed"],
      sourceType,
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      uni.chooseImage({
        count,
        sizeType,
        sourceType,
        extension,
        success(res) {
          resolve(normalizeChooseAndUploadFileRes(res, "image"));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseImage:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function chooseVideo(opts) {
    const {
      count,
      camera,
      compressed,
      maxDuration,
      sourceType,
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      uni.chooseVideo({
        camera,
        compressed,
        maxDuration,
        sourceType,
        extension,
        success(res) {
          const {
            tempFilePath,
            duration,
            size,
            height,
            width
          } = res;
          resolve(normalizeChooseAndUploadFileRes({
            errMsg: "chooseVideo:ok",
            tempFilePaths: [tempFilePath],
            tempFiles: [{
              name: res.tempFile && res.tempFile.name || "",
              path: tempFilePath,
              size,
              type: res.tempFile && res.tempFile.type || "",
              width,
              height,
              duration,
              fileType: "video",
              cloudPath: ""
            }]
          }, "video"));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseVideo:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function chooseAll(opts) {
    const {
      count,
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      let chooseFile = uni.chooseFile;
      if (typeof wx !== "undefined" && typeof wx.chooseMessageFile === "function") {
        chooseFile = wx.chooseMessageFile;
      }
      if (typeof chooseFile !== "function") {
        return reject({
          errMsg: ERR_MSG_FAIL + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
        });
      }
      chooseFile({
        type: "all",
        count,
        extension,
        success(res) {
          resolve(normalizeChooseAndUploadFileRes(res));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseFile:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function normalizeChooseAndUploadFileRes(res, fileType) {
    res.tempFiles.forEach((item, index) => {
      if (!item.name) {
        item.name = item.path.substring(item.path.lastIndexOf("/") + 1);
      }
      if (fileType) {
        item.fileType = fileType;
      }
      item.cloudPath = Date.now() + "_" + index + item.name.substring(item.name.lastIndexOf("."));
    });
    if (!res.tempFilePaths) {
      res.tempFilePaths = res.tempFiles.map((file) => file.path);
    }
    return res;
  }
  function uploadCloudFiles(files, max = 5, onUploadProgress) {
    files = JSON.parse(JSON.stringify(files));
    const len = files.length;
    let count = 0;
    let self2 = this;
    return new Promise((resolve) => {
      while (count < max) {
        next();
      }
      function next() {
        let cur = count++;
        if (cur >= len) {
          !files.find((item) => !item.url && !item.errMsg) && resolve(files);
          return;
        }
        const fileItem = files[cur];
        const index = self2.files.findIndex((v2) => v2.uuid === fileItem.uuid);
        fileItem.url = "";
        delete fileItem.errMsg;
        nr.uploadFile({
          filePath: fileItem.path,
          cloudPath: fileItem.cloudPath,
          fileType: fileItem.fileType,
          onUploadProgress: (res) => {
            res.index = index;
            onUploadProgress && onUploadProgress(res);
          }
        }).then((res) => {
          fileItem.url = res.fileID;
          fileItem.index = index;
          if (cur < len) {
            next();
          }
        }).catch((res) => {
          fileItem.errMsg = res.errMsg || res.message;
          fileItem.index = index;
          if (cur < len) {
            next();
          }
        });
      }
    });
  }
  function uploadFiles(choosePromise, {
    onChooseFile,
    onUploadProgress
  }) {
    return choosePromise.then((res) => {
      if (onChooseFile) {
        const customChooseRes = onChooseFile(res);
        if (typeof customChooseRes !== "undefined") {
          return Promise.resolve(customChooseRes).then((chooseRes) => typeof chooseRes === "undefined" ? res : chooseRes);
        }
      }
      return res;
    }).then((res) => {
      if (res === false) {
        return {
          errMsg: ERR_MSG_OK,
          tempFilePaths: [],
          tempFiles: []
        };
      }
      return res;
    });
  }
  function chooseAndUploadFile(opts = {
    type: "all"
  }) {
    if (opts.type === "image") {
      return uploadFiles(chooseImage(opts), opts);
    } else if (opts.type === "video") {
      return uploadFiles(chooseVideo(opts), opts);
    }
    return uploadFiles(chooseAll(opts), opts);
  }
  const get_file_ext = (name) => {
    const last_len = name.lastIndexOf(".");
    const len = name.length;
    return {
      name: name.substring(0, last_len),
      ext: name.substring(last_len + 1, len)
    };
  };
  const get_extname = (fileExtname) => {
    if (!Array.isArray(fileExtname)) {
      let extname = fileExtname.replace(/(\[|\])/g, "");
      return extname.split(",");
    } else {
      return fileExtname;
    }
  };
  const get_files_and_is_max = (res, _extname) => {
    let filePaths = [];
    let files = [];
    if (!_extname || _extname.length === 0) {
      return {
        filePaths,
        files
      };
    }
    res.tempFiles.forEach((v2) => {
      let fileFullName = get_file_ext(v2.name);
      const extname = fileFullName.ext.toLowerCase();
      if (_extname.indexOf(extname) !== -1) {
        files.push(v2);
        filePaths.push(v2.path);
      }
    });
    if (files.length !== res.tempFiles.length) {
      uni.showToast({
        title: `当前选择了${res.tempFiles.length}个文件 ，${res.tempFiles.length - files.length} 个文件格式不正确`,
        icon: "none",
        duration: 5e3
      });
    }
    return {
      filePaths,
      files
    };
  };
  const get_file_info = (filepath) => {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: filepath,
        success(res) {
          resolve(res);
        },
        fail(err2) {
          reject(err2);
        }
      });
    });
  };
  const get_file_data = async (files, type = "image") => {
    let fileFullName = get_file_ext(files.name);
    const extname = fileFullName.ext.toLowerCase();
    let filedata = {
      name: files.name,
      uuid: files.uuid,
      extname: extname || "",
      cloudPath: files.cloudPath,
      fileType: files.fileType,
      thumbTempFilePath: files.thumbTempFilePath,
      url: files.path || files.path,
      size: files.size,
      //单位是字节
      image: {},
      path: files.path,
      video: {}
    };
    if (type === "image") {
      const imageinfo = await get_file_info(files.path);
      delete filedata.video;
      filedata.image.width = imageinfo.width;
      filedata.image.height = imageinfo.height;
      filedata.image.location = imageinfo.path;
    } else {
      delete filedata.image;
    }
    return filedata;
  };
  const _sfc_main$c = {
    name: "uploadImage",
    emits: ["uploadFiles", "choose", "delFile"],
    props: {
      filesList: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      limit: {
        type: [Number, String],
        default: 9
      },
      imageStyles: {
        type: Object,
        default() {
          return {
            width: "auto",
            height: "auto",
            border: {}
          };
        }
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      styles() {
        let styles = {
          width: "auto",
          height: "auto",
          border: {}
        };
        return Object.assign(styles, this.imageStyles);
      },
      boxStyle() {
        const {
          width = "auto",
          height = "auto"
        } = this.styles;
        let obj = {};
        if (height === "auto") {
          if (width !== "auto") {
            obj.height = this.value2px(width);
            obj["padding-top"] = 0;
          } else {
            obj.height = 0;
          }
        } else {
          obj.height = this.value2px(height);
          obj["padding-top"] = 0;
        }
        if (width === "auto") {
          if (height !== "auto") {
            obj.width = this.value2px(height);
          } else {
            obj.width = "33.3%";
          }
        } else {
          obj.width = this.value2px(width);
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      },
      borderStyle() {
        let {
          border
        } = this.styles;
        let obj = {};
        const widthDefaultValue = 1;
        const radiusDefaultValue = 3;
        if (typeof border === "boolean") {
          obj.border = border ? "1px #eee solid" : "none";
        } else {
          let width = border && border.width || widthDefaultValue;
          width = this.value2px(width);
          let radius = border && border.radius || radiusDefaultValue;
          radius = this.value2px(radius);
          obj = {
            "border-width": width,
            "border-style": border && border.style || "solid",
            "border-color": border && border.color || "#eee",
            "border-radius": radius
          };
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      }
    },
    methods: {
      uploadFiles(item, index) {
        this.$emit("uploadFiles", item);
      },
      choose() {
        this.$emit("choose");
      },
      delFile(index) {
        this.$emit("delFile", index);
      },
      prviewImage(img, index) {
        let urls = [];
        if (Number(this.limit) === 1 && this.disablePreview && !this.disabled) {
          this.$emit("choose");
        }
        if (this.disablePreview)
          return;
        this.filesList.forEach((i2) => {
          urls.push(i2.url);
        });
        uni.previewImage({
          urls,
          current: index
        });
      },
      value2px(value) {
        if (typeof value === "number") {
          value += "px";
        } else {
          if (value.indexOf("%") === -1) {
            value = value.indexOf("px") !== -1 ? value : value + "px";
          }
        }
        return value;
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker__container" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.filesList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              class: "file-picker__box",
              key: index,
              style: vue.normalizeStyle($options.boxStyle)
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "file-picker__box-content",
                  style: vue.normalizeStyle($options.borderStyle)
                },
                [
                  vue.createElementVNode("image", {
                    class: "file-image",
                    src: item.url,
                    mode: "aspectFill",
                    onClick: vue.withModifiers(($event) => $options.prviewImage(item, index), ["stop"])
                  }, null, 8, ["src", "onClick"]),
                  $props.delIcon && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "icon-del-box",
                    onClick: vue.withModifiers(($event) => $options.delFile(index), ["stop"])
                  }, [
                    vue.createElementVNode("view", { class: "icon-del" }),
                    vue.createElementVNode("view", { class: "icon-del rotate" })
                  ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                  item.progress && item.progress !== 100 || item.progress === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "file-picker__progress"
                  }, [
                    vue.createElementVNode("progress", {
                      class: "file-picker__progress-item",
                      percent: item.progress === -1 ? 0 : item.progress,
                      "stroke-width": "4",
                      backgroundColor: item.errMsg ? "#ff5a5f" : "#EBEBEB"
                    }, null, 8, ["percent", "backgroundColor"])
                  ])) : vue.createCommentVNode("v-if", true),
                  item.errMsg ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "file-picker__mask",
                    onClick: vue.withModifiers(($event) => $options.uploadFiles(item, index), ["stop"])
                  }, " 点击重试 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              )
            ],
            4
            /* STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      $props.filesList.length < $props.limit && !$props.readonly ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "file-picker__box",
          style: vue.normalizeStyle($options.boxStyle)
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "file-picker__box-content is-add",
              style: vue.normalizeStyle($options.borderStyle),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ],
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const uploadImage = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-bdfc07e0"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-file-picker/components/uni-file-picker/upload-image.vue"]]);
  const _sfc_main$b = {
    name: "uploadFile",
    emits: ["uploadFiles", "choose", "delFile"],
    props: {
      filesList: {
        type: Array,
        default() {
          return [];
        }
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      limit: {
        type: [Number, String],
        default: 9
      },
      showType: {
        type: String,
        default: ""
      },
      listStyles: {
        type: Object,
        default() {
          return {
            // 是否显示边框
            border: true,
            // 是否显示分隔线
            dividline: true,
            // 线条样式
            borderStyle: {}
          };
        }
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      list() {
        let files = [];
        this.filesList.forEach((v2) => {
          files.push(v2);
        });
        return files;
      },
      styles() {
        let styles = {
          border: true,
          dividline: true,
          "border-style": {}
        };
        return Object.assign(styles, this.listStyles);
      },
      borderStyle() {
        let {
          borderStyle,
          border
        } = this.styles;
        let obj = {};
        if (!border) {
          obj.border = "none";
        } else {
          let width = borderStyle && borderStyle.width || 1;
          width = this.value2px(width);
          let radius = borderStyle && borderStyle.radius || 5;
          radius = this.value2px(radius);
          obj = {
            "border-width": width,
            "border-style": borderStyle && borderStyle.style || "solid",
            "border-color": borderStyle && borderStyle.color || "#eee",
            "border-radius": radius
          };
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      },
      borderLineStyle() {
        let obj = {};
        let {
          borderStyle
        } = this.styles;
        if (borderStyle && borderStyle.color) {
          obj["border-color"] = borderStyle.color;
        }
        if (borderStyle && borderStyle.width) {
          let width = borderStyle && borderStyle.width || 1;
          let style = borderStyle && borderStyle.style || 0;
          if (typeof width === "number") {
            width += "px";
          } else {
            width = width.indexOf("px") ? width : width + "px";
          }
          obj["border-width"] = width;
          if (typeof style === "number") {
            style += "px";
          } else {
            style = style.indexOf("px") ? style : style + "px";
          }
          obj["border-top-style"] = style;
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      }
    },
    methods: {
      uploadFiles(item, index) {
        this.$emit("uploadFiles", {
          item,
          index
        });
      },
      choose() {
        this.$emit("choose");
      },
      delFile(index) {
        this.$emit("delFile", index);
      },
      value2px(value) {
        if (typeof value === "number") {
          value += "px";
        } else {
          value = value.indexOf("px") !== -1 ? value : value + "px";
        }
        return value;
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker__files" }, [
      !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "files-button",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(` :class="{'is-text-box':showType === 'list'}" `),
      $options.list.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: "uni-file-picker__lists is-text-box",
          style: vue.normalizeStyle($options.borderStyle)
        },
        [
          vue.createCommentVNode(" ,'is-list-card':showType === 'list-card' "),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["uni-file-picker__lists-box", {
                    "files-border": index !== 0 && $options.styles.dividline
                  }]),
                  key: index,
                  style: vue.normalizeStyle(index !== 0 && $options.styles.dividline && $options.borderLineStyle)
                },
                [
                  vue.createElementVNode("view", { class: "uni-file-picker__item" }, [
                    vue.createCommentVNode(` :class="{'is-text-image':showType === 'list'}" `),
                    vue.createCommentVNode(' 	<view class="files__image is-text-image">\r\n						<image class="header-image" :src="item.logo" mode="aspectFit"></image>\r\n					</view> '),
                    vue.createElementVNode(
                      "view",
                      { class: "files__name" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    $props.delIcon && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "icon-del-box icon-files",
                      onClick: ($event) => $options.delFile(index)
                    }, [
                      vue.createElementVNode("view", { class: "icon-del icon-files" }),
                      vue.createElementVNode("view", { class: "icon-del rotate" })
                    ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  item.progress && item.progress !== 100 || item.progress === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "file-picker__progress"
                  }, [
                    vue.createElementVNode("progress", {
                      class: "file-picker__progress-item",
                      percent: item.progress === -1 ? 0 : item.progress,
                      "stroke-width": "4",
                      backgroundColor: item.errMsg ? "#ff5a5f" : "#EBEBEB"
                    }, null, 8, ["percent", "backgroundColor"])
                  ])) : vue.createCommentVNode("v-if", true),
                  item.status === "error" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "file-picker__mask",
                    onClick: vue.withModifiers(($event) => $options.uploadFiles(item, index), ["stop"])
                  }, " 点击重试 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const uploadFile = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-a54939c6"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-file-picker/components/uni-file-picker/upload-file.vue"]]);
  const _sfc_main$a = {
    name: "uniFilePicker",
    components: {
      uploadImage,
      uploadFile
    },
    options: {
      virtualHost: true
    },
    emits: ["select", "success", "fail", "progress", "delete", "update:modelValue", "input"],
    props: {
      modelValue: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      value: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      // 自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 最大选择个数 ，h5只能限制单选或是多选
      limit: {
        type: [Number, String],
        default: 9
      },
      // 列表样式 grid | list | list-card
      mode: {
        type: String,
        default: "grid"
      },
      // 选择文件类型  image/video/all
      fileMediatype: {
        type: String,
        default: "image"
      },
      // 文件类型筛选
      fileExtname: {
        type: [Array, String],
        default() {
          return [];
        }
      },
      title: {
        type: String,
        default: ""
      },
      listStyles: {
        type: Object,
        default() {
          return {
            // 是否显示边框
            border: true,
            // 是否显示分隔线
            dividline: true,
            // 线条样式
            borderStyle: {}
          };
        }
      },
      imageStyles: {
        type: Object,
        default() {
          return {
            width: "auto",
            height: "auto"
          };
        }
      },
      readonly: {
        type: Boolean,
        default: false
      },
      returnType: {
        type: String,
        default: "array"
      },
      sizeType: {
        type: Array,
        default() {
          return ["original", "compressed"];
        }
      },
      sourceType: {
        type: Array,
        default() {
          return ["album", "camera"];
        }
      },
      provider: {
        type: String,
        default: ""
        // 默认上传到 unicloud 内置存储 extStorage 扩展存储
      }
    },
    data() {
      return {
        files: [],
        localValue: []
      };
    },
    watch: {
      value: {
        handler(newVal, oldVal) {
          this.setValue(newVal, oldVal);
        },
        immediate: true
      },
      modelValue: {
        handler(newVal, oldVal) {
          this.setValue(newVal, oldVal);
        },
        immediate: true
      }
    },
    computed: {
      filesList() {
        let files = [];
        this.files.forEach((v2) => {
          files.push(v2);
        });
        return files;
      },
      showType() {
        if (this.fileMediatype === "image") {
          return this.mode;
        }
        return "list";
      },
      limitLength() {
        if (this.returnType === "object") {
          return 1;
        }
        if (!this.limit) {
          return 1;
        }
        if (this.limit >= 9) {
          return 9;
        }
        return this.limit;
      }
    },
    created() {
      if (!(nr.config && nr.config.provider)) {
        this.noSpace = true;
        nr.chooseAndUploadFile = chooseAndUploadFile;
      }
      this.form = this.getForm("uniForms");
      this.formItem = this.getForm("uniFormsItem");
      if (this.form && this.formItem) {
        if (this.formItem.name) {
          this.rename = this.formItem.name;
          this.form.inputChildrens.push(this);
        }
      }
    },
    methods: {
      /**
       * 公开用户使用，清空文件
       * @param {Object} index
       */
      clearFiles(index) {
        if (index !== 0 && !index) {
          this.files = [];
          this.$nextTick(() => {
            this.setEmit();
          });
        } else {
          this.files.splice(index, 1);
        }
        this.$nextTick(() => {
          this.setEmit();
        });
      },
      /**
       * 公开用户使用，继续上传
       */
      upload() {
        let files = [];
        this.files.forEach((v2, index) => {
          if (v2.status === "ready" || v2.status === "error") {
            files.push(Object.assign({}, v2));
          }
        });
        return this.uploadFiles(files);
      },
      async setValue(newVal, oldVal) {
        const newData = async (v2) => {
          const reg = /cloud:\/\/([\w.]+\/?)\S*/;
          let url = "";
          if (v2.fileID) {
            url = v2.fileID;
          } else {
            url = v2.url;
          }
          if (reg.test(url)) {
            v2.fileID = url;
            v2.url = await this.getTempFileURL(url);
          }
          if (v2.url)
            v2.path = v2.url;
          return v2;
        };
        if (this.returnType === "object") {
          if (newVal) {
            await newData(newVal);
          } else {
            newVal = {};
          }
        } else {
          if (!newVal)
            newVal = [];
          for (let i2 = 0; i2 < newVal.length; i2++) {
            let v2 = newVal[i2];
            await newData(v2);
          }
        }
        this.localValue = newVal;
        if (this.form && this.formItem && !this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(this.localValue);
        }
        let filesData = Object.keys(newVal).length > 0 ? newVal : [];
        this.files = [].concat(filesData);
      },
      /**
       * 选择文件
       */
      choose() {
        if (this.disabled)
          return;
        if (this.files.length >= Number(this.limitLength) && this.showType !== "grid" && this.returnType === "array") {
          uni.showToast({
            title: `您最多选择 ${this.limitLength} 个文件`,
            icon: "none"
          });
          return;
        }
        this.chooseFiles();
      },
      /**
       * 选择文件并上传
       */
      chooseFiles() {
        const _extname = get_extname(this.fileExtname);
        nr.chooseAndUploadFile({
          type: this.fileMediatype,
          compressed: false,
          sizeType: this.sizeType,
          sourceType: this.sourceType,
          // TODO 如果为空，video 有问题
          extension: _extname.length > 0 ? _extname : void 0,
          count: this.limitLength - this.files.length,
          //默认9
          onChooseFile: this.chooseFileCallback,
          onUploadProgress: (progressEvent) => {
            this.setProgress(progressEvent, progressEvent.index);
          }
        }).then((result) => {
          this.setSuccessAndError(result.tempFiles);
        }).catch((err2) => {
          formatAppLog("log", "at uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue:362", "选择失败", err2);
        });
      },
      /**
       * 选择文件回调
       * @param {Object} res
       */
      async chooseFileCallback(res) {
        const _extname = get_extname(this.fileExtname);
        const is_one = Number(this.limitLength) === 1 && this.disablePreview && !this.disabled || this.returnType === "object";
        if (is_one) {
          this.files = [];
        }
        let {
          filePaths,
          files
        } = get_files_and_is_max(res, _extname);
        if (!(_extname && _extname.length > 0)) {
          filePaths = res.tempFilePaths;
          files = res.tempFiles;
        }
        let currentData = [];
        for (let i2 = 0; i2 < files.length; i2++) {
          if (this.limitLength - this.files.length <= 0)
            break;
          files[i2].uuid = Date.now();
          let filedata = await get_file_data(files[i2], this.fileMediatype);
          filedata.progress = 0;
          filedata.status = "ready";
          this.files.push(filedata);
          currentData.push({
            ...filedata,
            file: files[i2]
          });
        }
        this.$emit("select", {
          tempFiles: currentData,
          tempFilePaths: filePaths
        });
        res.tempFiles = files;
        if (!this.autoUpload || this.noSpace) {
          res.tempFiles = [];
        }
        res.tempFiles.forEach((fileItem, index) => {
          this.provider && (fileItem.provider = this.provider);
          const fileNameSplit = fileItem.name.split(".");
          const ext = fileNameSplit.pop();
          const fileName = fileNameSplit.join(".").replace(/[\s\/\?<>\\:\*\|":]/g, "_");
          fileItem.cloudPath = fileName + "_" + Date.now() + "_" + index + "." + ext;
        });
      },
      /**
       * 批传
       * @param {Object} e
       */
      uploadFiles(files) {
        files = [].concat(files);
        return uploadCloudFiles.call(this, files, 5, (res) => {
          this.setProgress(res, res.index, true);
        }).then((result) => {
          this.setSuccessAndError(result);
          return result;
        }).catch((err2) => {
          formatAppLog("log", "at uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue:435", err2);
        });
      },
      /**
       * 成功或失败
       */
      async setSuccessAndError(res, fn) {
        let successData = [];
        let errorData = [];
        let tempFilePath = [];
        let errorTempFilePath = [];
        for (let i2 = 0; i2 < res.length; i2++) {
          const item = res[i2];
          const index = item.uuid ? this.files.findIndex((p2) => p2.uuid === item.uuid) : item.index;
          if (index === -1 || !this.files)
            break;
          if (item.errMsg === "request:fail") {
            this.files[index].url = item.path;
            this.files[index].status = "error";
            this.files[index].errMsg = item.errMsg;
            errorData.push(this.files[index]);
            errorTempFilePath.push(this.files[index].url);
          } else {
            this.files[index].errMsg = "";
            this.files[index].fileID = item.url;
            const reg = /cloud:\/\/([\w.]+\/?)\S*/;
            if (reg.test(item.url)) {
              this.files[index].url = await this.getTempFileURL(item.url);
            } else {
              this.files[index].url = item.url;
            }
            this.files[index].status = "success";
            this.files[index].progress += 1;
            successData.push(this.files[index]);
            tempFilePath.push(this.files[index].fileID);
          }
        }
        if (successData.length > 0) {
          this.setEmit();
          this.$emit("success", {
            tempFiles: this.backObject(successData),
            tempFilePaths: tempFilePath
          });
        }
        if (errorData.length > 0) {
          this.$emit("fail", {
            tempFiles: this.backObject(errorData),
            tempFilePaths: errorTempFilePath
          });
        }
      },
      /**
       * 获取进度
       * @param {Object} progressEvent
       * @param {Object} index
       * @param {Object} type
       */
      setProgress(progressEvent, index, type) {
        this.files.length;
        const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        let idx = index;
        if (!type) {
          idx = this.files.findIndex((p2) => p2.uuid === progressEvent.tempFile.uuid);
        }
        if (idx === -1 || !this.files[idx])
          return;
        this.files[idx].progress = percentCompleted - 1;
        this.$emit("progress", {
          index: idx,
          progress: parseInt(percentCompleted),
          tempFile: this.files[idx]
        });
      },
      /**
       * 删除文件
       * @param {Object} index
       */
      delFile(index) {
        this.$emit("delete", {
          index,
          tempFile: this.files[index],
          tempFilePath: this.files[index].url
        });
        this.files.splice(index, 1);
        this.$nextTick(() => {
          this.setEmit();
        });
      },
      /**
       * 获取文件名和后缀
       * @param {Object} name
       */
      getFileExt(name) {
        const last_len = name.lastIndexOf(".");
        const len = name.length;
        return {
          name: name.substring(0, last_len),
          ext: name.substring(last_len + 1, len)
        };
      },
      /**
       * 处理返回事件
       */
      setEmit() {
        let data2 = [];
        if (this.returnType === "object") {
          data2 = this.backObject(this.files)[0];
          this.localValue = data2 ? data2 : null;
        } else {
          data2 = this.backObject(this.files);
          if (!this.localValue) {
            this.localValue = [];
          }
          this.localValue = [...data2];
        }
        this.$emit("update:modelValue", this.localValue);
      },
      /**
       * 处理返回参数
       * @param {Object} files
       */
      backObject(files) {
        let newFilesData = [];
        files.forEach((v2) => {
          newFilesData.push({
            extname: v2.extname,
            fileType: v2.fileType,
            image: v2.image,
            name: v2.name,
            path: v2.path,
            size: v2.size,
            fileID: v2.fileID,
            url: v2.url,
            // 修改删除一个文件后不能再上传的bug, #694
            uuid: v2.uuid,
            status: v2.status,
            cloudPath: v2.cloudPath
          });
        });
        return newFilesData;
      },
      async getTempFileURL(fileList) {
        fileList = {
          fileList: [].concat(fileList)
        };
        const urls = await nr.getTempFileURL(fileList);
        return urls.fileList[0].tempFileURL || "";
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_upload_image = vue.resolveComponent("upload-image");
    const _component_upload_file = vue.resolveComponent("upload-file");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-file-picker__header"
      }, [
        vue.createElementVNode(
          "text",
          { class: "file-title" },
          vue.toDisplayString($props.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "file-count" },
          vue.toDisplayString($options.filesList.length) + "/" + vue.toDisplayString($options.limitLength),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true),
      $props.fileMediatype === "image" && $options.showType === "grid" ? (vue.openBlock(), vue.createBlock(_component_upload_image, {
        key: 1,
        readonly: $props.readonly,
        "image-styles": $props.imageStyles,
        "files-list": $options.filesList,
        limit: $options.limitLength,
        disablePreview: $props.disablePreview,
        delIcon: $props.delIcon,
        onUploadFiles: $options.uploadFiles,
        onChoose: $options.choose,
        onDelFile: $options.delFile
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode("view", { class: "icon-add" }),
            vue.createElementVNode("view", { class: "icon-add rotate" })
          ], true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["readonly", "image-styles", "files-list", "limit", "disablePreview", "delIcon", "onUploadFiles", "onChoose", "onDelFile"])) : vue.createCommentVNode("v-if", true),
      $props.fileMediatype !== "image" || $options.showType !== "grid" ? (vue.openBlock(), vue.createBlock(_component_upload_file, {
        key: 2,
        readonly: $props.readonly,
        "list-styles": $props.listStyles,
        "files-list": $options.filesList,
        showType: $options.showType,
        delIcon: $props.delIcon,
        onUploadFiles: $options.uploadFiles,
        onChoose: $options.choose,
        onDelFile: $options.delFile
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode("button", {
              type: "primary",
              size: "mini"
            }, "选择文件")
          ], true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["readonly", "list-styles", "files-list", "showType", "delIcon", "onUploadFiles", "onChoose", "onDelFile"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-6223573f"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue"]]);
  const _sfc_main$9 = {
    name: "uniDataChecklist",
    mixins: [nr.mixinDatacom || {}],
    emits: ["input", "update:modelValue", "change"],
    props: {
      mode: {
        type: String,
        default: "default"
      },
      multiple: {
        type: Boolean,
        default: false
      },
      value: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      // TODO vue3
      modelValue: {
        type: [Array, String, Number],
        default() {
          return "";
        }
      },
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      min: {
        type: [Number, String],
        default: ""
      },
      max: {
        type: [Number, String],
        default: ""
      },
      wrap: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: "left"
      },
      selectedColor: {
        type: String,
        default: ""
      },
      selectedTextColor: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "暂无数据"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      map: {
        type: Object,
        default() {
          return {
            text: "text",
            value: "value"
          };
        }
      }
    },
    watch: {
      localdata: {
        handler(newVal) {
          this.range = newVal;
          this.dataList = this.getDataList(this.getSelectedValue(newVal));
        },
        deep: true
      },
      mixinDatacomResData(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      value(newVal) {
        this.dataList = this.getDataList(newVal);
      },
      modelValue(newVal) {
        this.dataList = this.getDataList(newVal);
      }
    },
    data() {
      return {
        dataList: [],
        range: [],
        contentText: {
          contentdown: "查看更多",
          contentrefresh: "加载中",
          contentnomore: "没有更多"
        },
        isLocal: true,
        styles: {
          selectedColor: "#2979ff",
          selectedTextColor: "#666"
        },
        isTop: 0
      };
    },
    computed: {
      dataValue() {
        if (this.value === "")
          return this.modelValue;
        if (this.modelValue === "")
          return this.value;
        return this.value;
      }
    },
    created() {
      if (this.localdata && this.localdata.length !== 0) {
        this.isLocal = true;
        this.range = this.localdata;
        this.dataList = this.getDataList(this.getSelectedValue(this.range));
      } else {
        if (this.collection) {
          this.isLocal = false;
          this.loadData();
        }
      }
    },
    methods: {
      loadData() {
        this.mixinDatacomGet().then((res) => {
          this.mixinDatacomResData = res.result.data;
          if (this.mixinDatacomResData.length === 0) {
            this.isLocal = false;
            this.mixinDatacomErrorMessage = this.emptyText;
          } else {
            this.isLocal = true;
          }
        }).catch((err2) => {
          this.mixinDatacomErrorMessage = err2.message;
        });
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      change(e) {
        const values = e.detail.value;
        let detail = {
          value: [],
          data: []
        };
        if (this.multiple) {
          this.range.forEach((item) => {
            if (values.includes(item[this.map.value] + "")) {
              detail.value.push(item[this.map.value]);
              detail.data.push(item);
            }
          });
        } else {
          const range = this.range.find((item) => item[this.map.value] + "" === values);
          if (range) {
            detail = {
              value: range[this.map.value],
              data: range
            };
          }
        }
        this.$emit("input", detail.value);
        this.$emit("update:modelValue", detail.value);
        this.$emit("change", {
          detail
        });
        if (this.multiple) {
          this.dataList = this.getDataList(detail.value, true);
        } else {
          this.dataList = this.getDataList(detail.value);
        }
      },
      /**
       * 获取渲染的新数组
       * @param {Object} value 选中内容
       */
      getDataList(value) {
        let dataList = JSON.parse(JSON.stringify(this.range));
        let list = [];
        if (this.multiple) {
          if (!Array.isArray(value)) {
            value = [];
          }
        } else {
          if (Array.isArray(value) && value.length) {
            value = value[0];
          }
        }
        dataList.forEach((item, index) => {
          item.disabled = item.disable || item.disabled || false;
          if (this.multiple) {
            if (value.length > 0) {
              let have = value.find((val) => val === item[this.map.value]);
              item.selected = have !== void 0;
            } else {
              item.selected = false;
            }
          } else {
            item.selected = value === item[this.map.value];
          }
          list.push(item);
        });
        return this.setRange(list);
      },
      /**
       * 处理最大最小值
       * @param {Object} list
       */
      setRange(list) {
        let selectList = list.filter((item) => item.selected);
        let min = Number(this.min) || 0;
        let max = Number(this.max) || "";
        list.forEach((item, index) => {
          if (this.multiple) {
            if (selectList.length <= min) {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have !== void 0) {
                item.disabled = true;
              }
            }
            if (selectList.length >= max && max !== "") {
              let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
              if (have === void 0) {
                item.disabled = true;
              }
            }
          }
          this.setStyles(item, index);
          list[index] = item;
        });
        return list;
      },
      /**
       * 设置 class
       * @param {Object} item
       * @param {Object} index
       */
      setStyles(item, index) {
        item.styleBackgroud = this.setStyleBackgroud(item);
        item.styleIcon = this.setStyleIcon(item);
        item.styleIconText = this.setStyleIconText(item);
        item.styleRightIcon = this.setStyleRightIcon(item);
      },
      /**
       * 获取选中值
       * @param {Object} range
       */
      getSelectedValue(range) {
        if (!this.multiple)
          return this.dataValue;
        let selectedArr = [];
        range.forEach((item) => {
          if (item.selected) {
            selectedArr.push(item[this.map.value]);
          }
        });
        return this.dataValue.length > 0 ? this.dataValue : selectedArr;
      },
      /**
       * 设置背景样式
       */
      setStyleBackgroud(item) {
        let styles = {};
        let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
        if (this.selectedColor) {
          if (this.mode !== "list") {
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
          if (this.mode === "tag") {
            styles["background-color"] = item.selected ? selectedColor : "#f5f5f5";
          }
        }
        let classles = "";
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIcon(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          styles["background-color"] = item.selected ? selectedColor : "#fff";
          styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          if (!item.selected && item.disabled) {
            styles["background-color"] = "#F2F6FC";
            styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleIconText(item) {
        let styles = {};
        let classles = "";
        if (this.selectedColor) {
          let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
          if (this.mode === "tag") {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666";
          } else {
            styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : "#666";
          }
          if (!item.selected && item.disabled) {
            styles.color = "#999";
          }
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      },
      setStyleRightIcon(item) {
        let styles = {};
        let classles = "";
        if (this.mode === "list") {
          styles["border-color"] = item.selected ? this.styles.selectedColor : "#DCDFE6";
        }
        for (let i2 in styles) {
          classles += `${i2}:${styles[i2]};`;
        }
        return classles;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-data-checklist",
        style: vue.normalizeStyle({ "margin-top": $data.isTop + "px" })
      },
      [
        !$data.isLocal ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-data-loading"
        }, [
          !_ctx.mixinDatacomErrorMessage ? (vue.openBlock(), vue.createBlock(_component_uni_load_more, {
            key: 0,
            status: "loading",
            iconType: "snow",
            iconSize: 18,
            "content-text": $data.contentText
          }, null, 8, ["content-text"])) : (vue.openBlock(), vue.createElementBlock(
            "text",
            { key: 1 },
            vue.toDisplayString(_ctx.mixinDatacomErrorMessage),
            1
            /* TEXT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 1 },
          [
            $props.multiple ? (vue.openBlock(), vue.createElementBlock(
              "checkbox-group",
              {
                key: 0,
                class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list" || $props.wrap }]),
                onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dataList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "label",
                      {
                        class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
                        style: vue.normalizeStyle(item.styleBackgroud),
                        key: index
                      },
                      [
                        vue.createElementVNode("checkbox", {
                          class: "hidden",
                          hidden: "",
                          disabled: $props.disabled || !!item.disabled,
                          value: item[$props.map.value] + "",
                          checked: item.selected
                        }, null, 8, ["disabled", "value", "checked"]),
                        $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "checkbox__inner",
                            style: vue.normalizeStyle(item.styleIcon)
                          },
                          [
                            vue.createElementVNode("view", { class: "checkbox__inner-icon" })
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "checklist-text",
                                style: vue.normalizeStyle(item.styleIconText)
                              },
                              vue.toDisplayString(item[$props.map.text]),
                              5
                              /* TEXT, STYLE */
                            ),
                            $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 0,
                                class: "checkobx__list",
                                style: vue.normalizeStyle(item.styleBackgroud)
                              },
                              null,
                              4
                              /* STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              34
              /* CLASS, NEED_HYDRATION */
            )) : (vue.openBlock(), vue.createElementBlock(
              "radio-group",
              {
                key: 1,
                class: vue.normalizeClass(["checklist-group", { "is-list": $props.mode === "list", "is-wrap": $props.wrap }]),
                onChange: _cache[1] || (_cache[1] = (...args) => $options.change && $options.change(...args))
              },
              [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.dataList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "label",
                      {
                        class: vue.normalizeClass(["checklist-box", ["is--" + $props.mode, item.selected ? "is-checked" : "", $props.disabled || !!item.disabled ? "is-disable" : "", index !== 0 && $props.mode === "list" ? "is-list-border" : ""]]),
                        style: vue.normalizeStyle(item.styleBackgroud),
                        key: index
                      },
                      [
                        vue.createElementVNode("radio", {
                          class: "hidden",
                          hidden: "",
                          disabled: $props.disabled || item.disabled,
                          value: item[$props.map.value] + "",
                          checked: item.selected
                        }, null, 8, ["disabled", "value", "checked"]),
                        $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: "radio__inner",
                            style: vue.normalizeStyle(item.styleBackgroud)
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              {
                                class: "radio__inner-icon",
                                style: vue.normalizeStyle(item.styleIcon)
                              },
                              null,
                              4
                              /* STYLE */
                            )
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode(
                          "view",
                          {
                            class: vue.normalizeClass(["checklist-content", { "list-content": $props.mode === "list" && $props.icon === "left" }])
                          },
                          [
                            vue.createElementVNode(
                              "text",
                              {
                                class: "checklist-text",
                                style: vue.normalizeStyle(item.styleIconText)
                              },
                              vue.toDisplayString(item[$props.map.text]),
                              5
                              /* TEXT, STYLE */
                            ),
                            $props.mode === "list" && $props.icon === "right" ? (vue.openBlock(), vue.createElementBlock(
                              "view",
                              {
                                key: 0,
                                style: vue.normalizeStyle(item.styleRightIcon),
                                class: "checkobx__list"
                              },
                              null,
                              4
                              /* STYLE */
                            )) : vue.createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              34
              /* CLASS, NEED_HYDRATION */
            ))
          ],
          64
          /* STABLE_FRAGMENT */
        ))
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-2f788efd"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue"]]);
  const validator = {
    "category_id": {
      "rules": [
        {
          "required": true
        },
        {
          "format": "string"
        }
      ],
      "title": "商品类别 ID",
      "label": "商品类别 ID"
    },
    "goods_sn": {
      "rules": [
        {
          "required": true
        },
        {
          "format": "string"
        }
      ],
      "title": "货号",
      "label": "货号"
    },
    "name": {
      "rules": [
        {
          "required": true
        },
        {
          "format": "string"
        }
      ],
      "title": "商品名称",
      "label": "商品名称"
    },
    "price": {
      "rules": [
        {
          "required": true
        },
        {
          "format": "double"
        }
      ],
      "title": "商品价格",
      "label": "商品价格"
    },
    "keywords": {
      "rules": [
        {
          "format": "string"
        }
      ],
      "title": "关键字",
      "label": "关键字"
    },
    "goods_desc": {
      "rules": [
        {
          "format": "string"
        }
      ],
      "title": "详细描述",
      "label": "详细描述"
    },
    "goods_thumb": {
      "rules": [
        {
          "format": "file"
        }
      ],
      "title": "缩略图",
      "label": "缩略图"
    },
    "goods_banner_imgs": {
      "rules": [
        {
          "format": "array"
        }
      ],
      "title": "Banner 图",
      "label": "Banner 图"
    },
    "reviews": {
      "rules": [
        {
          "format": "array"
        }
      ],
      "title": "商品评价",
      "label": "商品评价"
    },
    "remain_count": {
      "rules": [
        {
          "format": "int"
        }
      ],
      "title": "库存数量",
      "label": "库存数量"
    },
    "month_sell_count": {
      "rules": [
        {
          "format": "int"
        }
      ],
      "title": "月销量",
      "label": "月销量"
    },
    "total_sell_count": {
      "rules": [
        {
          "format": "int"
        }
      ],
      "title": "总销量",
      "label": "总销量"
    },
    "is_real": {
      "rules": [
        {
          "format": "bool"
        }
      ],
      "title": "是否为实物",
      "label": "是否为实物"
    },
    "is_on_sale": {
      "rules": [
        {
          "format": "bool"
        }
      ],
      "title": "是否上架",
      "label": "是否上架"
    },
    "is_best": {
      "rules": [
        {
          "format": "bool"
        }
      ],
      "title": "是否精品",
      "label": "是否精品"
    },
    "is_new": {
      "rules": [
        {
          "format": "bool"
        }
      ],
      "title": "是否新品",
      "label": "是否新品"
    },
    "is_hot": {
      "rules": [
        {
          "format": "bool"
        }
      ],
      "title": "是否热销",
      "label": "是否热销"
    },
    "seller_note": {
      "rules": [
        {
          "format": "string"
        }
      ],
      "title": "商家备注",
      "label": "商家备注"
    }
  };
  const enumConverter = {};
  const db$1 = nr.database();
  const dbCollectionName$1 = "mall-goods";
  function getValidator$1(fields) {
    let result = {};
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key];
      }
    }
    return result;
  }
  const _sfc_main$8 = {
    data() {
      let formData = {
        "category_id": "",
        "goods_sn": "",
        "name": "",
        "price": null,
        "keywords": "",
        "goods_desc": "",
        "goods_thumb": null,
        "goods_banner_imgs": [],
        "reviews": [],
        "remain_count": null,
        "month_sell_count": null,
        "total_sell_count": null,
        "is_real": null,
        "is_on_sale": null,
        "is_best": null,
        "is_new": null,
        "is_hot": null,
        "seller_note": ""
      };
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator$1(Object.keys(formData))
        }
      };
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    methods: {
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        });
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res);
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading();
        });
      },
      /**
       * 提交表单
       */
      submitForm(value) {
        return db$1.collection(dbCollectionName$1).add(value).then((res) => {
          uni.showToast({
            icon: "none",
            title: "新增成功"
          });
          this.getOpenerEventChannel().emit("refreshData");
          setTimeout(() => uni.navigateBack(), 500);
        }).catch((err2) => {
          uni.showModal({
            content: err2.message || "请求服务失败",
            showCancel: false
          });
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_1);
    const _component_uni_data_checkbox = resolveEasycom(vue.resolveDynamicComponent("uni-data-checkbox"), __easycom_3$1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-container" }, [
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        model: $data.formData,
        "validate-trigger": "submit",
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            name: "category_id",
            label: "商品类别 ID",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品所属的分类 ID，参考 `opendb-mall-categories` 表。",
                modelValue: $data.formData.category_id,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.category_id = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_sn",
            label: "货号",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的唯一货号，用于区分不同商品。",
                modelValue: $data.formData.goods_sn,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.goods_sn = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "name",
            label: "商品名称",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的名称，用于展示和搜索。",
                modelValue: $data.formData.name,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.name = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "price",
            label: "商品价格",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的售价，单位为元。",
                type: "number",
                modelValue: $data.formData.price,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.price = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "keywords",
            label: "关键字"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的关键字，用于搜索引擎收录。",
                modelValue: $data.formData.keywords,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.keywords = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_desc",
            label: "详细描述"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的详细描述，支持多行文本。",
                modelValue: $data.formData.goods_desc,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.goods_desc = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_thumb",
            label: "缩略图"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_file_picker, {
                "return-type": "object",
                modelValue: $data.formData.goods_thumb,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.goods_thumb = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_banner_imgs",
            label: "Banner 图"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_data_checkbox, {
                multiple: true,
                modelValue: $data.formData.goods_banner_imgs,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.formData.goods_banner_imgs = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "reviews",
            label: "商品评价"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_data_checkbox, {
                multiple: true,
                modelValue: $data.formData.reviews,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.formData.reviews = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "remain_count",
            label: "库存数量"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的剩余库存数量。",
                type: "number",
                modelValue: $data.formData.remain_count,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.formData.remain_count = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "month_sell_count",
            label: "月销量"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品在本月的销售数量。",
                type: "number",
                modelValue: $data.formData.month_sell_count,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.formData.month_sell_count = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "total_sell_count",
            label: "总销量"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的累计销售数量。",
                type: "number",
                modelValue: $data.formData.total_sell_count,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.formData.total_sell_count = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_real",
            label: "是否为实物"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[12] || (_cache[12] = ($event) => _ctx.binddata("is_real", $event.detail.value)),
                checked: $data.formData.is_real
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_on_sale",
            label: "是否上架"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[13] || (_cache[13] = ($event) => _ctx.binddata("is_on_sale", $event.detail.value)),
                checked: $data.formData.is_on_sale
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_best",
            label: "是否精品"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[14] || (_cache[14] = ($event) => _ctx.binddata("is_best", $event.detail.value)),
                checked: $data.formData.is_best
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_new",
            label: "是否新品"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[15] || (_cache[15] = ($event) => _ctx.binddata("is_new", $event.detail.value)),
                checked: $data.formData.is_new
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_hot",
            label: "是否热销"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[16] || (_cache[16] = ($event) => _ctx.binddata("is_hot", $event.detail.value)),
                checked: $data.formData.is_hot
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "seller_note",
            label: "商家备注"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商家对商品的备注信息，仅商家可见。",
                modelValue: $data.formData.seller_note,
                "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $data.formData.seller_note = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "uni-button-group" }, [
            vue.createElementVNode("button", {
              type: "primary",
              class: "uni-button",
              onClick: _cache[18] || (_cache[18] = (...args) => $options.submit && $options.submit(...args))
            }, "提交")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model"])
    ]);
  }
  const PagesMallGoodsAdd = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "G:/mobile application development/pdd/pages/mall-goods/add.vue"]]);
  const db = nr.database();
  const dbCollectionName = "mall-goods";
  function getValidator(fields) {
    let result = {};
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key];
      }
    }
    return result;
  }
  const _sfc_main$7 = {
    data() {
      let formData = {
        "category_id": "",
        "goods_sn": "",
        "name": "",
        "price": null,
        "keywords": "",
        "goods_desc": "",
        "goods_thumb": null,
        "goods_banner_imgs": [],
        "reviews": [""],
        "remain_count": null,
        "month_sell_count": null,
        "total_sell_count": null,
        "is_real": null,
        "is_on_sale": null,
        "is_best": null,
        "is_new": null,
        "is_hot": null,
        "seller_note": ""
      };
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      };
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id;
        this.formDataId = id;
        this.getDetail(id);
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules);
    },
    methods: {
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        });
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res);
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading();
        });
      },
      /**
       * 提交表单
       */
      submitForm(value) {
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: "none",
            title: "修改成功"
          });
          this.getOpenerEventChannel().emit("refreshData");
          setTimeout(() => uni.navigateBack(), 500);
        }).catch((err2) => {
          uni.showModal({
            content: err2.message || "请求服务失败",
            showCancel: false
          });
        });
      },
      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        });
        db.collection(dbCollectionName).doc(id).field(
          "category_id,goods_sn,name,price,keywords,goods_desc,goods_thumb,goods_banner_imgs,reviews,remain_count,month_sell_count,total_sell_count,is_real,is_on_sale,is_best,is_new,is_hot,seller_note"
        ).get().then((res) => {
          const data2 = res.result.data[0];
          if (data2) {
            this.formData = data2;
          }
        }).catch((err2) => {
          uni.showModal({
            content: err2.message || "请求服务失败",
            showCancel: false
          });
        }).finally(() => {
          uni.hideLoading();
        });
      },
      addReview() {
        this.formData.reviews.push("");
      },
      // 删除评价输入框
      removeReview(index) {
        this.formData.reviews.splice(index, 1);
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
    const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_3$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-container" }, [
      vue.createVNode(_component_uni_forms, {
        ref: "form",
        model: $data.formData,
        "validate-trigger": "submit",
        "err-show-type": "toast"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            name: "category_id",
            label: "商品类别 ID",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品所属的分类 ID，参考 `opendb-mall-categories` 表。",
                modelValue: $data.formData.category_id,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.category_id = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_sn",
            label: "货号",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的唯一货号，用于区分不同商品。",
                modelValue: $data.formData.goods_sn,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.goods_sn = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "name",
            label: "商品名称",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的名称，用于展示和搜索。",
                modelValue: $data.formData.name,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.name = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "price",
            label: "商品价格",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的售价，单位为元。",
                type: "number",
                modelValue: $data.formData.price,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.price = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "keywords",
            label: "关键字"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的关键字，用于搜索引擎收录。",
                modelValue: $data.formData.keywords,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.keywords = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_desc",
            label: "详细描述"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的详细描述，支持多行文本。",
                modelValue: $data.formData.goods_desc,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.goods_desc = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_thumb",
            label: "缩略图"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_file_picker, {
                "return-type": "object",
                modelValue: $data.formData.goods_thumb,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.formData.goods_thumb = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createTextVNode(" <"),
          vue.createVNode(_component_uni_forms_item, {
            name: "goods_banner_imgs",
            label: "Banner 图"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_file_picker, {
                "return-type": "object",
                multiple: true,
                modelValue: $data.formData.goods_banner_imgs,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.formData.goods_banner_imgs = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "reviews",
            label: "商品评价"
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.formData.reviews, (review, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: "review-item"
                  }, [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "textarea",
                      placeholder: "请输入商品评价",
                      modelValue: $data.formData.reviews[index],
                      "onUpdate:modelValue": ($event) => $data.formData.reviews[index] = $event,
                      trim: "both"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    $data.formData.reviews.length > 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      class: "remove-review-btn",
                      type: "warn",
                      size: "mini",
                      onClick: ($event) => $options.removeReview(index)
                    }, "删除", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createElementVNode("button", {
                class: "add-review-btn",
                type: "default",
                size: "mini",
                onClick: _cache[8] || (_cache[8] = (...args) => $options.addReview && $options.addReview(...args))
              }, "添加评价")
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "remain_count",
            label: "库存数量"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的剩余库存数量。",
                type: "number",
                modelValue: $data.formData.remain_count,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.formData.remain_count = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "month_sell_count",
            label: "月销量"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品在本月的销售数量。",
                type: "number",
                modelValue: $data.formData.month_sell_count,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.formData.month_sell_count = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "total_sell_count",
            label: "总销量"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商品的累计销售数量。",
                type: "number",
                modelValue: $data.formData.total_sell_count,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.formData.total_sell_count = $event)
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_real",
            label: "是否为实物"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[12] || (_cache[12] = ($event) => _ctx.binddata("is_real", $event.detail.value)),
                checked: $data.formData.is_real
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_on_sale",
            label: "是否上架"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[13] || (_cache[13] = ($event) => _ctx.binddata("is_on_sale", $event.detail.value)),
                checked: $data.formData.is_on_sale
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_best",
            label: "是否精品"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[14] || (_cache[14] = ($event) => _ctx.binddata("is_best", $event.detail.value)),
                checked: $data.formData.is_best
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_new",
            label: "是否新品"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[15] || (_cache[15] = ($event) => _ctx.binddata("is_new", $event.detail.value)),
                checked: $data.formData.is_new
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "is_hot",
            label: "是否热销"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("switch", {
                onChange: _cache[16] || (_cache[16] = ($event) => _ctx.binddata("is_hot", $event.detail.value)),
                checked: $data.formData.is_hot
              }, null, 40, ["checked"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            name: "seller_note",
            label: "商家备注"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                placeholder: "商家对商品的备注信息，仅商家可见。",
                modelValue: $data.formData.seller_note,
                "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $data.formData.seller_note = $event),
                trim: "both"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "uni-button-group" }, [
            vue.createElementVNode("button", {
              type: "primary",
              class: "uni-button",
              onClick: _cache[18] || (_cache[18] = (...args) => $options.submit && $options.submit(...args))
            }, "提交")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model"])
    ]);
  }
  const PagesMallGoodsEdit = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "G:/mobile application development/pdd/pages/mall-goods/edit.vue"]]);
  const en = {
    "uniCloud.component.add.success": "Success",
    "uniCloud.component.update.success": "Success",
    "uniCloud.component.remove.showModal.title": "Tips",
    "uniCloud.component.remove.showModal.content": "是否删除该数据"
  };
  const es = {
    "uniCloud.component.add.success": "新增成功",
    "uniCloud.component.update.success": "修改成功",
    "uniCloud.component.remove.showModal.title": "提示",
    "uniCloud.component.remove.showModal.content": "是否删除该数据"
  };
  const fr = {
    "uniCloud.component.add.success": "新增成功",
    "uniCloud.component.update.success": "修改成功",
    "uniCloud.component.remove.showModal.title": "提示",
    "uniCloud.component.remove.showModal.content": "是否删除该数据"
  };
  const zhHans = {
    "uniCloud.component.add.success": "新增成功",
    "uniCloud.component.update.success": "修改成功",
    "uniCloud.component.remove.showModal.title": "提示",
    "uniCloud.component.remove.showModal.content": "是否删除该数据"
  };
  const zhHant = {
    "uniCloud.component.add.success": "新增成功",
    "uniCloud.component.update.success": "修改成功",
    "uniCloud.component.remove.showModal.title": "提示",
    "uniCloud.component.remove.showModal.content": "是否刪除數據"
  };
  const messages = {
    en,
    es,
    fr,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const isArray = Array.isArray;
  const { t } = initVueI18n(messages);
  const events = {
    load: "load",
    error: "error"
  };
  const pageMode = {
    add: "add",
    replace: "replace"
  };
  const loadMode = {
    auto: "auto",
    onready: "onready",
    manual: "manual"
  };
  const attrs = [
    "pageCurrent",
    "pageSize",
    "collection",
    "action",
    "field",
    "getcount",
    "orderby",
    "where",
    "groupby",
    "groupField",
    "distinct"
  ];
  const _sfc_main$6 = {
    name: "UniClouddb",
    setup(props) {
      const dataListRef = props.ssrKey ? props.getone ? shallowSsrRef(void 0, props.ssrKey) : ssrRef([], props.ssrKey) : props.getone ? shallowSsrRef(void 0, "qvE0Mt1SCORjRRSQuHjIYQ==") : ssrRef([], "U4JfaCFoioOVb5qF0p+8fw==");
      const instance = vue.getCurrentInstance();
      vue.onMounted(() => {
        if ((!dataListRef.value || dataListRef.value.length === 0) && !props.manual && props.loadtime === loadMode.auto) {
          instance.proxy.loadData();
        }
      });
      return { dataList: dataListRef };
    },
    // 服务端serverPrefetch生命周期，用于服务端加载数据，等将来全端支持Suspense时，可以采用 Suspense + async setup 来实现一版
    async serverPrefetch() {
      if (!this.manual && this.loadtime === loadMode.auto) {
        return this.loadData();
      }
    },
    props: {
      options: {
        type: [Object, Array],
        default() {
          return {};
        }
      },
      spaceInfo: {
        type: Object,
        default() {
          return {};
        }
      },
      collection: {
        type: [String, Array],
        default: ""
      },
      action: {
        type: String,
        default: ""
      },
      field: {
        type: String,
        default: ""
      },
      orderby: {
        type: String,
        default: ""
      },
      where: {
        type: [String, Object],
        default: ""
      },
      pageData: {
        type: String,
        default: "add"
      },
      pageCurrent: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      getcount: {
        type: [Boolean, String],
        default: false
      },
      getone: {
        type: [Boolean, String],
        default: false
      },
      gettree: {
        type: [Boolean, String, Object],
        default: false
      },
      gettreepath: {
        type: [Boolean, String],
        default: false
      },
      startwith: {
        type: String,
        default: ""
      },
      limitlevel: {
        type: Number,
        default: 10
      },
      groupby: {
        type: String,
        default: ""
      },
      groupField: {
        type: String,
        default: ""
      },
      distinct: {
        type: [Boolean, String],
        default: false
      },
      pageIndistinct: {
        type: [Boolean, String],
        default: false
      },
      foreignKey: {
        type: String,
        default: ""
      },
      loadtime: {
        type: String,
        default: "auto"
      },
      manual: {
        type: Boolean,
        default: false
      },
      ssrKey: {
        type: [String, Number],
        default: ""
      }
    },
    data() {
      return {
        loading: false,
        hasMore: false,
        paginationInternal: {},
        errorMessage: ""
      };
    },
    computed: {
      collectionArgs() {
        return isArray(this.collection) ? this.collection : [this.collection];
      },
      isLookup() {
        return isArray(this.collection) && this.collection.length > 1 || typeof this.collection === "string" && this.collection.indexOf(",") > -1;
      },
      mainCollection() {
        if (typeof this.collection === "string") {
          return this.collection.split(",")[0];
        }
        const mainQuery = JSON.parse(JSON.stringify(this.collection[0]));
        return mainQuery.$db[0].$param[0];
      }
    },
    created() {
      this._isEnded = false;
      this.paginationInternal = {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0
      };
      this.$watch(() => {
        var al = [];
        attrs.forEach((key) => {
          al.push(this[key]);
        });
        return al;
      }, (newValue, oldValue) => {
        this.paginationInternal.size = this.pageSize;
        if (newValue[0] !== oldValue[0]) {
          this.paginationInternal.current = this.pageCurrent;
        }
        if (this.loadtime === loadMode.manual) {
          return;
        }
        let needReset = false;
        for (let i2 = 2; i2 < newValue.length; i2++) {
          if (newValue[i2] !== oldValue[i2]) {
            needReset = true;
            break;
          }
        }
        if (needReset) {
          this.clear();
          this.reset();
        }
        this._execLoadData();
      });
    },
    methods: {
      loadData(args1, args2) {
        let callback = null;
        let clear = false;
        if (typeof args1 === "object") {
          if (args1.clear) {
            if (this.pageData === pageMode.replace) {
              this.clear();
            } else {
              clear = args1.clear;
            }
            this.reset();
          }
          if (args1.current !== void 0) {
            this.paginationInternal.current = args1.current;
          }
          if (typeof args2 === "function") {
            callback = args2;
          }
        } else if (typeof args1 === "function") {
          callback = args1;
        }
        return this._execLoadData(callback, clear);
      },
      loadMore() {
        if (this._isEnded || this.loading) {
          return;
        }
        if (this.pageData === pageMode.add) {
          this.paginationInternal.current++;
        }
        this._execLoadData();
      },
      refresh() {
        this.clear();
        this._execLoadData();
      },
      clear() {
        this._isEnded = false;
        this.dataList = [];
      },
      reset() {
        this.paginationInternal.current = 1;
      },
      add(value, {
        action,
        showToast = true,
        toastTitle,
        success,
        fail,
        complete,
        needConfirm = true,
        needLoading = true,
        loadingTitle = ""
      } = {}) {
        if (needLoading) {
          uni.showLoading({
            title: loadingTitle
          });
        }
        let db2 = nr.database(this.spaceInfo);
        if (action) {
          db2 = db2.action(action);
        }
        db2.collection(this.mainCollection).add(value).then((res) => {
          success && success(res);
          if (showToast) {
            uni.showToast({
              title: toastTitle || t("uniCloud.component.add.success")
            });
          }
        }).catch((err2) => {
          fail && fail(err2);
          if (needConfirm) {
            uni.showModal({
              content: err2.message,
              showCancel: false
            });
          }
        }).finally(() => {
          if (needLoading) {
            uni.hideLoading();
          }
          complete && complete();
        });
      },
      remove(id, {
        action,
        success,
        fail,
        complete,
        confirmTitle,
        confirmContent,
        needConfirm = true,
        needLoading = true,
        loadingTitle = ""
      } = {}) {
        if (!id || !id.length) {
          return;
        }
        if (!needConfirm) {
          this._execRemove(id, action, success, fail, complete, needConfirm, needLoading, loadingTitle);
          return;
        }
        uni.showModal({
          title: confirmTitle || t("uniCloud.component.remove.showModal.title"),
          content: confirmContent || t("uniCloud.component.remove.showModal.content"),
          showCancel: true,
          success: (res) => {
            if (!res.confirm) {
              return;
            }
            this._execRemove(id, action, success, fail, complete, needConfirm, needLoading, loadingTitle);
          }
        });
      },
      update(id, value, {
        action,
        showToast = true,
        toastTitle,
        success,
        fail,
        complete,
        needConfirm = true,
        needLoading = true,
        loadingTitle = ""
      } = {}) {
        if (needLoading) {
          uni.showLoading({
            title: loadingTitle
          });
        }
        let db2 = nr.database(this.spaceInfo);
        if (action) {
          db2 = db2.action(action);
        }
        return db2.collection(this.mainCollection).doc(id).update(value).then((res) => {
          success && success(res);
          if (showToast) {
            uni.showToast({
              title: toastTitle || t("uniCloud.component.update.success")
            });
          }
        }).catch((err2) => {
          fail && fail(err2);
          if (needConfirm) {
            uni.showModal({
              content: err2.message,
              showCancel: false
            });
          }
        }).finally(() => {
          if (needLoading) {
            uni.hideLoading();
          }
          complete && complete();
        });
      },
      getTemp(isTemp = true) {
        let db2 = nr.database(this.spaceInfo);
        if (this.action) {
          db2 = db2.action(this.action);
        }
        db2 = db2.collection(...this.collectionArgs);
        if (this.foreignKey) {
          db2 = db2.foreignKey(this.foreignKey);
        }
        if (!(!this.where || !Object.keys(this.where).length)) {
          db2 = db2.where(this.where);
        }
        if (this.field) {
          db2 = db2.field(this.field);
        }
        if (this.groupby) {
          db2 = db2.groupBy(this.groupby);
        }
        if (this.groupField) {
          db2 = db2.groupField(this.groupField);
        }
        if (this.distinct === true) {
          db2 = db2.distinct();
        }
        if (this.orderby) {
          db2 = db2.orderBy(this.orderby);
        }
        const {
          current,
          size
        } = this.paginationInternal;
        const getOptions = {};
        if (this.getcount) {
          getOptions.getCount = this.getcount;
        }
        const treeOptions = {
          limitLevel: this.limitlevel,
          startWith: this.startwith
        };
        if (this.gettree) {
          getOptions.getTree = treeOptions;
        }
        if (this.gettreepath) {
          getOptions.getTreePath = treeOptions;
        }
        db2 = db2.skip(size * (current - 1)).limit(size);
        if (isTemp) {
          db2 = db2.getTemp(getOptions);
          db2.udb = this;
        } else {
          db2 = db2.get(getOptions);
        }
        return db2;
      },
      setResult(result) {
        if (result.code === 0) {
          this._execLoadDataSuccess(result);
        } else {
          this._execLoadDataFail(new Error(result.message));
        }
      },
      _execLoadData(callback, clear) {
        if (this.loading) {
          return;
        }
        this.loading = true;
        this.errorMessage = "";
        return this._getExec().then((res) => {
          this.loading = false;
          this._execLoadDataSuccess(res.result, callback, clear);
        }).catch((err2) => {
          this.loading = false;
          this._execLoadDataFail(err2, callback);
        });
      },
      _execLoadDataSuccess(result, callback, clear) {
        const {
          data: data2,
          count
        } = result;
        this._isEnded = count !== void 0 ? this.paginationInternal.current * this.paginationInternal.size >= count : data2.length < this.pageSize;
        this.hasMore = !this._isEnded;
        const data22 = this.getone ? data2.length ? data2[0] : void 0 : data2;
        if (this.getcount) {
          this.paginationInternal.count = count;
        }
        callback && callback(data22, this._isEnded, this.paginationInternal);
        this._dispatchEvent(events.load, data22);
        if (this.getone || this.pageData === pageMode.replace) {
          this.dataList = data22;
        } else {
          if (clear) {
            this.dataList = data22;
          } else {
            this.dataList.push(...data22);
          }
        }
      },
      _execLoadDataFail(err2, callback) {
        this.errorMessage = err2;
        callback && callback();
        this.$emit(events.error, err2);
        {
          console.error(err2);
        }
      },
      _getExec() {
        return this.getTemp(false);
      },
      _execRemove(id, action, success, fail, complete, needConfirm, needLoading, loadingTitle) {
        if (!this.collection || !id) {
          return;
        }
        const ids = isArray(id) ? id : [id];
        if (!ids.length) {
          return;
        }
        if (needLoading) {
          uni.showLoading({
            mask: true,
            title: loadingTitle
          });
        }
        const db2 = nr.database(this.spaceInfo);
        const dbCmd = db2.command;
        let exec = db2;
        if (action) {
          exec = exec.action(action);
        }
        exec.collection(this.mainCollection).where({
          _id: dbCmd.in(ids)
        }).remove().then((res) => {
          success && success(res.result);
          if (this.pageData === pageMode.replace) {
            this.refresh();
          } else {
            this.removeData(ids);
          }
        }).catch((err2) => {
          fail && fail(err2);
          if (needConfirm) {
            uni.showModal({
              content: err2.message,
              showCancel: false
            });
          }
        }).finally(() => {
          if (needLoading) {
            uni.hideLoading();
          }
          complete && complete();
        });
      },
      removeData(ids) {
        const il = ids.slice(0);
        const dl = this.dataList;
        for (let i2 = dl.length - 1; i2 >= 0; i2--) {
          const index = il.indexOf(dl[i2]._id);
          if (index >= 0) {
            dl.splice(i2, 1);
            il.splice(index, 1);
          }
        }
      },
      _dispatchEvent(type, data2) {
        if (this._changeDataFunction) {
          this._changeDataFunction(data2, this._isEnded, this.paginationInternal);
        } else {
          this.$emit(type, data2, this._isEnded, this.paginationInternal);
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.renderSlot(_ctx.$slots, "default", {
        options: $props.options,
        data: $setup.dataList,
        pagination: $data.paginationInternal,
        loading: $data.loading,
        hasMore: $data.hasMore,
        error: $data.errorMessage
      })
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.vue"]]);
  let platform = "other";
  const _sfc_main$5 = {
    name: "UniFab",
    emits: ["fabClick", "trigger"],
    props: {
      pattern: {
        type: Object,
        default() {
          return {};
        }
      },
      horizontal: {
        type: String,
        default: "left"
      },
      vertical: {
        type: String,
        default: "bottom"
      },
      direction: {
        type: String,
        default: "horizontal"
      },
      content: {
        type: Array,
        default() {
          return [];
        }
      },
      show: {
        type: Boolean,
        default: false
      },
      popMenu: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        fabShow: false,
        isShow: false,
        isAndroidNvue: platform === "android",
        styles: {
          color: "#3c3e49",
          selectedColor: "#007AFF",
          backgroundColor: "#fff",
          buttonColor: "#007AFF",
          iconColor: "#fff",
          icon: "plusempty"
        }
      };
    },
    computed: {
      contentWidth(e) {
        return (this.content.length + 1) * 55 + 15 + "px";
      },
      contentWidthMin() {
        return "55px";
      },
      // 动态计算宽度
      boxWidth() {
        return this.getPosition(3, "horizontal");
      },
      // 动态计算高度
      boxHeight() {
        return this.getPosition(3, "vertical");
      },
      // 计算左下位置
      leftBottom() {
        return this.getPosition(0, "left", "bottom");
      },
      // 计算右下位置
      rightBottom() {
        return this.getPosition(0, "right", "bottom");
      },
      // 计算左上位置
      leftTop() {
        return this.getPosition(0, "left", "top");
      },
      rightTop() {
        return this.getPosition(0, "right", "top");
      },
      flexDirectionStart() {
        return this.getPosition(1, "vertical", "top");
      },
      flexDirectionEnd() {
        return this.getPosition(1, "vertical", "bottom");
      },
      horizontalLeft() {
        return this.getPosition(2, "horizontal", "left");
      },
      horizontalRight() {
        return this.getPosition(2, "horizontal", "right");
      },
      // 计算 nvue bottom
      nvueBottom() {
        return 30;
      }
    },
    watch: {
      pattern: {
        handler(val, oldVal) {
          this.styles = Object.assign({}, this.styles, val);
        },
        deep: true
      }
    },
    created() {
      this.isShow = this.show;
      if (this.top === 0) {
        this.fabShow = true;
      }
      this.styles = Object.assign({}, this.styles, this.pattern);
    },
    methods: {
      _onClick() {
        this.$emit("fabClick");
        if (!this.popMenu) {
          return;
        }
        this.isShow = !this.isShow;
      },
      open() {
        this.isShow = true;
      },
      close() {
        this.isShow = false;
      },
      /**
       * 按钮点击事件
       */
      _onItemClick(index, item) {
        if (!this.isShow) {
          return;
        }
        this.$emit("trigger", {
          index,
          item
        });
      },
      /**
       * 获取 位置信息
       */
      getPosition(types2, paramA, paramB) {
        if (types2 === 0) {
          return this.horizontal === paramA && this.vertical === paramB;
        } else if (types2 === 1) {
          return this.direction === paramA && this.vertical === paramB;
        } else if (types2 === 2) {
          return this.direction === paramA && this.horizontal === paramB;
        } else {
          return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
        }
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-cursor-point" }, [
      $props.popMenu && ($options.leftBottom || $options.rightBottom || $options.leftTop || $options.rightTop) && $props.content.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass([{
            "uni-fab--leftBottom": $options.leftBottom,
            "uni-fab--rightBottom": $options.rightBottom,
            "uni-fab--leftTop": $options.leftTop,
            "uni-fab--rightTop": $options.rightTop
          }, "uni-fab"]),
          style: vue.normalizeStyle($options.nvueBottom)
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass([{
                "uni-fab__content--left": $props.horizontal === "left",
                "uni-fab__content--right": $props.horizontal === "right",
                "uni-fab__content--flexDirection": $props.direction === "vertical",
                "uni-fab__content--flexDirectionStart": $options.flexDirectionStart,
                "uni-fab__content--flexDirectionEnd": $options.flexDirectionEnd,
                "uni-fab__content--other-platform": !$data.isAndroidNvue
              }, "uni-fab__content"]),
              style: vue.normalizeStyle({ width: $options.boxWidth, height: $options.boxHeight, backgroundColor: $data.styles.backgroundColor }),
              elevation: "5"
            },
            [
              $options.flexDirectionStart || $options.horizontalLeft ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-fab__item uni-fab__item--first"
              })) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($props.content, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: index,
                    class: vue.normalizeClass([{ "uni-fab__item--active": $data.isShow }, "uni-fab__item"]),
                    onClick: ($event) => $options._onItemClick(index, item)
                  }, [
                    vue.createElementVNode("image", {
                      src: item.active ? item.selectedIconPath : item.iconPath,
                      class: "uni-fab__item-image",
                      mode: "aspectFit"
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      {
                        class: "uni-fab__item-text",
                        style: vue.normalizeStyle({ color: item.active ? $data.styles.selectedColor : $data.styles.color })
                      },
                      vue.toDisplayString(item.text),
                      5
                      /* TEXT, STYLE */
                    )
                  ], 10, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              $options.flexDirectionEnd || $options.horizontalRight ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-fab__item uni-fab__item--first"
              })) : vue.createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass([{
            "uni-fab__circle--leftBottom": $options.leftBottom,
            "uni-fab__circle--rightBottom": $options.rightBottom,
            "uni-fab__circle--leftTop": $options.leftTop,
            "uni-fab__circle--rightTop": $options.rightTop,
            "uni-fab__content--other-platform": !$data.isAndroidNvue
          }, "uni-fab__circle uni-fab__plus"]),
          style: vue.normalizeStyle({ "background-color": $data.styles.buttonColor, "bottom": $options.nvueBottom }),
          onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
        },
        [
          vue.createVNode(_component_uni_icons, {
            class: vue.normalizeClass(["fab-circle-icon", { "uni-fab__plus--active": $data.isShow && $props.content.length > 0 }]),
            type: $data.styles.icon,
            color: $data.styles.iconColor,
            size: "32"
          }, null, 8, ["type", "color", "class"]),
          vue.createCommentVNode(` <view class="fab-circle-v"  :class="{'uni-fab__plus--active': isShow && content.length > 0}"></view>\r
			<view class="fab-circle-h" :class="{'uni-fab__plus--active': isShow  && content.length > 0}"></view> `)
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-85f34dfc"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-fab/components/uni-fab/uni-fab.vue"]]);
  nr.database();
  const _sfc_main$4 = {
    data() {
      return {
        collectionList: "mall-goods",
        loadMore: {
          contentdown: "",
          contentrefresh: "",
          contentnomore: ""
        }
      };
    },
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh();
      });
    },
    onReachBottom() {
      this.$refs.udb.loadMore();
    },
    methods: {
      handleItemClick(id) {
        uni.navigateTo({
          url: "./detail?id=" + id
        });
      },
      fabClick() {
        uni.navigateTo({
          url: "./add",
          events: {
            // 监听新增数据成功后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0$2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$2);
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0);
    const _component_unicloud_db = resolveEasycom(vue.resolveDynamicComponent("unicloud-db"), __easycom_3);
    const _component_uni_fab = resolveEasycom(vue.resolveDynamicComponent("uni-fab"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_unicloud_db, {
        ref: "udb",
        collection: $data.collectionList,
        field: "category_id,goods_sn,name,price,keywords,goods_desc,goods_thumb,goods_banner_imgs,reviews,remain_count,month_sell_count,total_sell_count,is_real,is_on_sale,is_best,is_new,is_hot,seller_note"
      }, {
        default: vue.withCtx(({ data: data2, pagination, loading, hasMore, error }) => [
          error ? (vue.openBlock(), vue.createElementBlock(
            "view",
            { key: 0 },
            vue.toDisplayString(error.message),
            1
            /* TEXT */
          )) : data2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
            vue.createVNode(
              _component_uni_list,
              null,
              {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(data2, (item, index) => {
                      return vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                        key: index,
                        showArrow: "",
                        clickable: true,
                        onClick: ($event) => $options.handleItemClick(item._id)
                      }, {
                        body: vue.withCtx(() => [
                          vue.createElementVNode("text", null, [
                            vue.createCommentVNode(" 此处默认显示为_id，请根据需要自行修改为其他字段 "),
                            vue.createCommentVNode(" 如果使用了联表查询，请参考生成的 admin 项目中 list.vue 页面 "),
                            vue.createTextVNode(
                              " " + vue.toDisplayString(item._id),
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(_component_uni_load_more, {
            status: loading ? "loading" : hasMore ? "more" : "noMore"
          }, null, 8, ["status"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["collection"]),
      vue.createVNode(_component_uni_fab, {
        ref: "fab",
        horizontal: "right",
        vertical: "bottom",
        "pop-menu": false,
        onFabClick: $options.fabClick
      }, null, 8, ["onFabClick"])
    ]);
  }
  const PagesMallGoodsList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "G:/mobile application development/pdd/pages/mall-goods/list.vue"]]);
  const _sfc_main$3 = {
    name: "uniLink",
    props: {
      href: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        default: ""
      },
      download: {
        type: String,
        default: ""
      },
      showUnderLine: {
        type: [Boolean, String],
        default: true
      },
      copyTips: {
        type: String,
        default: "已自动复制网址，请在手机浏览器里粘贴该网址"
      },
      color: {
        type: String,
        default: "#999999"
      },
      fontSize: {
        type: [Number, String],
        default: 14
      }
    },
    computed: {
      isShowA() {
        if ((this.isMail() || this.isTel()) && this._isH5 === true) {
          return true;
        }
        return false;
      }
    },
    created() {
      this._isH5 = null;
    },
    methods: {
      isMail() {
        return this.href.startsWith("mailto:");
      },
      isTel() {
        return this.href.startsWith("tel:");
      },
      openURL() {
        if (this.isTel()) {
          this.makePhoneCall(this.href.replace("tel:", ""));
        } else {
          plus.runtime.openURL(this.href);
        }
      },
      makePhoneCall(phoneNumber) {
        uni.makePhoneCall({
          phoneNumber
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.isShowA ? (vue.openBlock(), vue.createElementBlock("a", {
      key: 0,
      class: vue.normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
      href: $props.href,
      style: vue.normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
      download: $props.download
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(
          vue.toDisplayString($props.text),
          1
          /* TEXT */
        )
      ], true)
    ], 14, ["href", "download"])) : (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 1,
        class: vue.normalizeClass(["uni-link", { "uni-link--withline": $props.showUnderLine === true || $props.showUnderLine === "true" }]),
        style: vue.normalizeStyle({ color: $props.color, fontSize: $props.fontSize + "px" }),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.openURL && $options.openURL(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createTextVNode(
            vue.toDisplayString($props.text),
            1
            /* TEXT */
          )
        ], true)
      ],
      6
      /* CLASS, STYLE */
    ));
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-5db80ddb"], ["__file", "G:/mobile application development/pdd/uni_modules/uni-link/components/uni-link/uni-link.vue"]]);
  nr.database();
  const _sfc_main$2 = {
    data() {
      return {
        queryWhere: "",
        collectionList: "mall-goods",
        loadMore: {
          contentdown: "",
          contentrefresh: "",
          contentnomore: ""
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      };
    },
    onLoad(e) {
      this._id = e.id;
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"';
      }
    },
    methods: {
      handleUpdate() {
        uni.navigateTo({
          url: "./edit?id=" + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              });
            }
          }
        });
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            uni.navigateTo({
              url: "./list"
            });
          }
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0);
    const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_1);
    const _component_uni_link = resolveEasycom(vue.resolveDynamicComponent("uni-link"), __easycom_2);
    const _component_unicloud_db = resolveEasycom(vue.resolveDynamicComponent("unicloud-db"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_unicloud_db, {
        ref: "udb",
        options: $data.options,
        collection: $data.collectionList,
        field: "category_id,goods_sn,name,price,keywords,goods_desc,goods_thumb,goods_banner_imgs,reviews,remain_count,month_sell_count,total_sell_count,is_real,is_on_sale,is_best,is_new,is_hot,seller_note",
        where: $data.queryWhere,
        getone: true,
        manual: true
      }, {
        default: vue.withCtx(({ data: data2, loading, error, options }) => [
          error ? (vue.openBlock(), vue.createElementBlock(
            "view",
            { key: 0 },
            vue.toDisplayString(error.message),
            1
            /* TEXT */
          )) : loading ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
            vue.createVNode(_component_uni_load_more, {
              contentText: $data.loadMore,
              status: "loading"
            }, null, 8, ["contentText"])
          ])) : data2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "商品类别 ID"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.category_id),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "货号"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.goods_sn),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "商品名称"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.name),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "商品价格"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.price),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "关键字"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.keywords),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "详细描述"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.goods_desc),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "缩略图"),
              data2.goods_thumb && data2.goods_thumb.fileType == "image" ? (vue.openBlock(), vue.createBlock(_component_uni_file_picker, {
                key: 0,
                value: data2.goods_thumb,
                "file-mediatype": data2.goods_thumb && data2.goods_thumb.fileType,
                "return-type": "object",
                readonly: ""
              }, null, 8, ["value", "file-mediatype"])) : data2.goods_thumb ? (vue.openBlock(), vue.createBlock(_component_uni_link, {
                key: 1,
                href: data2.goods_thumb.url,
                text: data2.goods_thumb.url
              }, null, 8, ["href", "text"])) : (vue.openBlock(), vue.createElementBlock("text", { key: 2 }))
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "Banner 图"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.goods_banner_imgs),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "商品评价"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.reviews),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "库存数量"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.remain_count),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "月销量"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.month_sell_count),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "总销量"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.total_sell_count),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "是否为实物"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.is_real == true ? "✅" : "❌"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "是否上架"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.is_on_sale == true ? "✅" : "❌"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "是否精品"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.is_best == true ? "✅" : "❌"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "是否新品"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.is_new == true ? "✅" : "❌"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "是否热销"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.is_hot == true ? "✅" : "❌"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "商家备注"),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(data2.seller_note),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["options", "collection", "where"]),
      vue.createElementVNode("view", { class: "btns" }, [
        vue.createElementVNode("button", {
          type: "primary",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleUpdate && $options.handleUpdate(...args))
        }, "修改"),
        vue.createElementVNode("button", {
          type: "warn",
          class: "btn-delete",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.handleDelete && $options.handleDelete(...args))
        }, "删除")
      ])
    ]);
  }
  const PagesMallGoodsDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "G:/mobile application development/pdd/pages/mall-goods/detail.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        reviews: []
      };
    },
    onLoad(options) {
      this.reviews = uni.getStorageSync("currentProductReviews") || [];
    },
    methods: {
      navBack() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "nav-bar" }, [
        vue.createElementVNode("view", {
          class: "nav-left",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.navBack && $options.navBack(...args))
        }, [
          vue.createElementVNode("image", {
            src: _imports_0,
            mode: "",
            class: "nav-icon"
          }),
          vue.createElementVNode("text", { class: "nav-title" }, "全部评价")
        ])
      ]),
      $data.reviews.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "reviews-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.reviews, (review, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "review-item",
              key: index
            }, [
              vue.createElementVNode("view", { class: "review-avatar" }, [
                vue.createElementVNode("image", {
                  src: _imports_1$2,
                  class: "avatar-image"
                })
              ]),
              vue.createElementVNode("view", { class: "review-content" }, [
                vue.createElementVNode("view", { class: "review-user" }, "匿名用户"),
                vue.createElementVNode(
                  "view",
                  { class: "review-text" },
                  vue.toDisplayString(review),
                  1
                  /* TEXT */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "no-reviews"
      }, [
        vue.createElementVNode("text", null, "暂无评价")
      ]))
    ]);
  }
  const PagesSearchAllReviews = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-e2a772c1"], ["__file", "G:/mobile application development/pdd/pages/search/AllReviews.vue"]]);
  __definePage("uni_modules/uni-id-pages/pages/login/login-withpwd", UniModulesUniIdPagesPagesLoginLoginWithpwd);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("uni_modules/uni-id-pages/pages/register/register", UniModulesUniIdPagesPagesRegisterRegister);
  __definePage("uni_modules/uni-id-pages/pages/login/login-withoutpwd", UniModulesUniIdPagesPagesLoginLoginWithoutpwd);
  __definePage("uni_modules/uni-id-pages/pages/login/login-smscode", UniModulesUniIdPagesPagesLoginLoginSmscode);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/userinfo", UniModulesUniIdPagesPagesUserinfoUserinfo);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile", UniModulesUniIdPagesPagesUserinfoBindMobileBindMobile);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage", UniModulesUniIdPagesPagesUserinfoCropImageCropImage);
  __definePage("uni_modules/uni-id-pages/pages/register/register-by-email", UniModulesUniIdPagesPagesRegisterRegisterByEmail);
  __definePage("uni_modules/uni-id-pages/pages/retrieve/retrieve", UniModulesUniIdPagesPagesRetrieveRetrieve);
  __definePage("uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email", UniModulesUniIdPagesPagesRetrieveRetrieveByEmail);
  __definePage("uni_modules/uni-id-pages/pages/common/webview/webview", UniModulesUniIdPagesPagesCommonWebviewWebview);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd", UniModulesUniIdPagesPagesUserinfoChangePwdChangePwd);
  __definePage("uni_modules/uni-id-pages/pages/register/register-admin", UniModulesUniIdPagesPagesRegisterRegisterAdmin);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd", UniModulesUniIdPagesPagesUserinfoSetPwdSetPwd);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate", UniModulesUniIdPagesPagesUserinfoDeactivateDeactivate);
  __definePage("uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify", UniModulesUniIdPagesPagesUserinfoRealnameVerifyRealnameVerify);
  __definePage("pages/chat/chat", PagesChatChat);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/search/mall-list", PagesSearchMallList);
  __definePage("pages/search/mall-details", PagesSearchMallDetails);
  __definePage("pages/wallet/wallet", PagesWalletWallet);
  __definePage("pages/wallet/pay", PagesWalletPay);
  __definePage("pages/malls-manage/favor", PagesMallsManageFavor);
  __definePage("pages/malls-manage/history", PagesMallsManageHistory);
  __definePage("pages/user/order", PagesUserOrder);
  __definePage("pages/user/set", PagesUserSet);
  __definePage("pages/subsidy/subsidy", PagesSubsidySubsidy);
  __definePage("pages/buy-vegetables/buy-vegetables", PagesBuyVegetablesBuyVegetables);
  __definePage("pages/webview/webview", PagesWebviewWebview);
  __definePage("pages/mall-goods/add", PagesMallGoodsAdd);
  __definePage("pages/mall-goods/edit", PagesMallGoodsEdit);
  __definePage("pages/mall-goods/list", PagesMallGoodsList);
  __definePage("pages/mall-goods/detail", PagesMallGoodsDetail);
  __definePage("pages/search/AllReviews", PagesSearchAllReviews);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "pdd应用启动"), this.checkLogin();
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "pdd应用进入首页");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "pdd应用进入后台");
    },
    methods: {
      async checkLogin() {
        try {
          const token = uni.getStorageSync("uni_id_token");
          if (!token) {
            throw new Error("无token");
          }
          uni.switchTab({
            url: "/pages/index/index"
          });
        } catch (e) {
          formatAppLog("log", "at App.vue:27", "未登录或登录已过期:", e);
          uni.reLaunch({
            url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
          });
        }
      }
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "G:/mobile application development/pdd/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
