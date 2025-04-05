"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
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
          common_vendor.nr.getTempFileURL({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.cSrc
  }, $data.cSrc ? {
    b: $props.width,
    c: $props.height,
    d: $data.cSrc,
    e: $props.mode
  } : {}, {
    f: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    g: $props.width,
    h: $props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/components/cloud-image/cloud-image.js.map
