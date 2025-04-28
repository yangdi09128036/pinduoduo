"use strict";
const e = require("../../../../common/vendor.js"),
	t = require("../../common/store.js"),
	a = {
		data: () => ({
			isPC: !1
		}),
		props: {
			width: {
				type: String,
				default: () => "50px"
			},
			height: {
				type: String,
				default: () => "50px"
			},
			border: {
				type: Boolean,
				default: () => !1
			}
		},
		async mounted() {},
		computed: {
			hasLogin: () => t.store.hasLogin,
			userInfo: () => t.store.userInfo,
			avatar_file: () => t.store.userInfo.avatar_file
		},
		methods: {
			setAvatarFile(e) {
				t.mutations.updateUserInfo({
					avatar_file: e
				})
			},
			async bindchooseavatar(t) {
				let a = t.detail.avatarUrl,
					o = {
						extname: a.split(".")[a.split(".").length - 1],
						name: "",
						url: ""
					},
					i = this.userInfo._id + "" + Date.now();
				o.name = i;
				try {
					e.index.showLoading({
						title: "更新中",
						mask: !0
					});
					let {
						fileID: t
					} = await e.er.uploadFile({
						filePath: a,
						cloudPath: i,
						fileType: "image"
					});
					o.url = t, e.index.hideLoading()
				} catch (r) {
					console.error(r)
				}
				console.log("avatar_file", o), this.setAvatarFile(o)
			},
			uploadAvatarImg: e => !1
		}
	};
if (!Array) {
	(e.resolveComponent("cloud-image") + e.resolveComponent("uni-icons"))()
}
Math || ((() => "../cloud-image/cloud-image.js") + (() => "../../../uni-icons/components/uni-icons/uni-icons.js"))();
const o = e._export_sfc(a, [
	["render", function(t, a, o, i, r, n) {
		return e.e({
			a: n.avatar_file
		}, n.avatar_file ? {
			b: e.p({
				src: n.avatar_file.url,
				width: o.width,
				height: o.height
			})
		} : {
			c: o.width,
			d: o.height,
			e: o.height,
			f: e.p({
				type: "plusempty",
				size: "30",
				color: "#dddddd"
			})
		}, {
			g: e.o(((...e) => n.bindchooseavatar && n.bindchooseavatar(...e))),
			h: e.o(((...e) => n.uploadAvatarImg && n.uploadAvatarImg(...e))),
			i: o.border ? 1 : "",
			j: o.width,
			k: o.height,
			l: o.height
		})
	}]
]);
wx.createComponent(o);