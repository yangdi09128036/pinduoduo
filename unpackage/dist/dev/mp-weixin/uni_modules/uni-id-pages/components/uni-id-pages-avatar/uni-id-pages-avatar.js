"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../common/store.js");
const _sfc_main = {
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
      return uni_modules_uniIdPages_common_store.store.hasLogin;
    },
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    },
    avatar_file() {
      return uni_modules_uniIdPages_common_store.store.userInfo.avatar_file;
    }
  },
  methods: {
    setAvatarFile(avatar_file) {
      uni_modules_uniIdPages_common_store.mutations.updateUserInfo({ avatar_file });
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
        common_vendor.index.showLoading({
          title: "更新中",
          mask: true
        });
        let {
          fileID
        } = await common_vendor.nr.uploadFile({
          filePath: avatarUrl,
          cloudPath,
          fileType: "image"
        });
        avatar_file.url = fileID;
        common_vendor.index.hideLoading();
      } catch (e) {
        common_vendor.index.__f__("error", "at uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue:94", e);
      }
      common_vendor.index.__f__("log", "at uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.vue:96", "avatar_file", avatar_file);
      this.setAvatarFile(avatar_file);
    },
    uploadAvatarImg(res) {
      return false;
    }
  }
};
if (!Array) {
  const _easycom_cloud_image2 = common_vendor.resolveComponent("cloud-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_cloud_image2 + _easycom_uni_icons2)();
}
const _easycom_cloud_image = () => "../cloud-image/cloud-image.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_cloud_image + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.avatar_file
  }, $options.avatar_file ? {
    b: common_vendor.p({
      src: $options.avatar_file.url,
      width: $props.width,
      height: $props.height
    })
  } : {
    c: $props.width,
    d: $props.height,
    e: $props.height,
    f: common_vendor.p({
      type: "plusempty",
      size: "30",
      color: "#dddddd"
    })
  }, {
    g: common_vendor.o((...args) => $options.bindchooseavatar && $options.bindchooseavatar(...args)),
    h: common_vendor.o((...args) => $options.uploadAvatarImg && $options.uploadAvatarImg(...args)),
    i: $props.border ? 1 : "",
    j: $props.width,
    k: $props.height,
    l: $props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-id-pages/components/uni-id-pages-avatar/uni-id-pages-avatar.js.map
