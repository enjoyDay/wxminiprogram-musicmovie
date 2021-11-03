function Et(e, t, n) {
  return t ? n ? y(t, e) : m(y(t, e)) : n ? v(e) : m(v(e))
}

function m(e) {
  var t, n, r = "";
  for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n),
    r += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
  return r
}

function v(e) {
  var a = h(e);
  var b = p(e);
  var length = 8 * e.length;
  var c = f(b, length);
  var xx = d(c);
  return xx;
  // return function (e) {
  //     return d(f(p(e), 8 * e.length))
  // }(h(e))
}


function h(e) {
  return e;
  // return unescape(encodeURIComponent(e))
}

function p(e) {
  var t, n = [];
  for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
  var r = 8 * e.length;
  for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
  return n
}

function d(e) {
  var t, n = "";
  var r = 32 * e.length;
  for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
  return n
}

function i(e, t) {
  var n = (65535 & e) + (65535 & t);
  return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}

function l(e, t, n, r, o, l) {
  return i((a = i(i(t, e), i(r, l))) << (u = o) | a >>> 32 - u, n);
  var a, u
}

function a(e, t, n, r, o, i, a) {
  return l(t & n | ~t & r, e, t, o, i, a)
}

function u(e, t, n, r, o, i, a) {
  return l(t & r | n & ~r, e, t, o, i, a)
}

function c(e, t, n, r, o, i, a) {
  return l(t ^ n ^ r, e, t, o, i, a)
}

function s(e, t, n, r, o, i, a) {
  return l(n ^ (t | ~r), e, t, o, i, a)
}

function f(e, t) {
  var n, r, o, l, f;
  e[t >> 5] |= 128 << t % 32;
  e[14 + (t + 64 >>> 9 << 4)] = t;
  var d = 1732584193;
  var p = -271733879;
  var m = -1732584194;
  var h = 271733878;
  for (n = 0; n < e.length; n += 16) {
    r = d;
    o = p;
    l = m;
    f = h;
    d = a(d, p, m, h, e[n], 7, -680876936);
    h = a(h, d, p, m, e[n + 1], 12, -389564586);
    m = a(m, h, d, p, e[n + 2], 17, 606105819);
    p = a(p, m, h, d, e[n + 3], 22, -1044525330);
    d = a(d, p, m, h, e[n + 4], 7, -176418897);
    h = a(h, d, p, m, e[n + 5], 12, 1200080426);
    m = a(m, h, d, p, e[n + 6], 17, -1473231341);
    p = a(p, m, h, d, e[n + 7], 22, -45705983);
    d = a(d, p, m, h, e[n + 8], 7, 1770035416);
    h = a(h, d, p, m, e[n + 9], 12, -1958414417);
    m = a(m, h, d, p, e[n + 10], 17, -42063);
    p = a(p, m, h, d, e[n + 11], 22, -1990404162);
    d = a(d, p, m, h, e[n + 12], 7, 1804603682);
    h = a(h, d, p, m, e[n + 13], 12, -40341101);
    m = a(m, h, d, p, e[n + 14], 17, -1502002290);
    d = u(d, p = a(p, m, h, d, e[n + 15], 22, 1236535329), m, h, e[n + 1], 5, -165796510);
    h = u(h, d, p, m, e[n + 6], 9, -1069501632);
    m = u(m, h, d, p, e[n + 11], 14, 643717713);
    p = u(p, m, h, d, e[n], 20, -373897302);
    d = u(d, p, m, h, e[n + 5], 5, -701558691);
    h = u(h, d, p, m, e[n + 10], 9, 38016083);
    m = u(m, h, d, p, e[n + 15], 14, -660478335);
    p = u(p, m, h, d, e[n + 4], 20, -405537848);
    d = u(d, p, m, h, e[n + 9], 5, 568446438);
    h = u(h, d, p, m, e[n + 14], 9, -1019803690);
    m = u(m, h, d, p, e[n + 3], 14, -187363961);
    p = u(p, m, h, d, e[n + 8], 20, 1163531501);
    d = u(d, p, m, h, e[n + 13], 5, -1444681467);
    h = u(h, d, p, m, e[n + 2], 9, -51403784);
    m = u(m, h, d, p, e[n + 7], 14, 1735328473);
    d = c(d, p = u(p, m, h, d, e[n + 12], 20, -1926607734), m, h, e[n + 5], 4, -378558);
    h = c(h, d, p, m, e[n + 8], 11, -2022574463);
    m = c(m, h, d, p, e[n + 11], 16, 1839030562);
    p = c(p, m, h, d, e[n + 14], 23, -35309556);
    d = c(d, p, m, h, e[n + 1], 4, -1530992060);
    h = c(h, d, p, m, e[n + 4], 11, 1272893353);
    m = c(m, h, d, p, e[n + 7], 16, -155497632);
    p = c(p, m, h, d, e[n + 10], 23, -1094730640);
    d = c(d, p, m, h, e[n + 13], 4, 681279174);
    h = c(h, d, p, m, e[n], 11, -358537222);
    m = c(m, h, d, p, e[n + 3], 16, -722521979);
    p = c(p, m, h, d, e[n + 6], 23, 76029189);
    d = c(d, p, m, h, e[n + 9], 4, -640364487);
    h = c(h, d, p, m, e[n + 12], 11, -421815835);
    m = c(m, h, d, p, e[n + 15], 16, 530742520);
    d = s(d, p = c(p, m, h, d, e[n + 2], 23, -995338651), m, h, e[n], 6, -198630844);
    h = s(h, d, p, m, e[n + 7], 10, 1126891415);
    m = s(m, h, d, p, e[n + 14], 15, -1416354905);
    p = s(p, m, h, d, e[n + 5], 21, -57434055);
    d = s(d, p, m, h, e[n + 12], 6, 1700485571);
    h = s(h, d, p, m, e[n + 3], 10, -1894986606);
    m = s(m, h, d, p, e[n + 10], 15, -1051523);
    p = s(p, m, h, d, e[n + 1], 21, -2054922799);
    d = s(d, p, m, h, e[n + 8], 6, 1873313359);
    h = s(h, d, p, m, e[n + 15], 10, -30611744);
    m = s(m, h, d, p, e[n + 6], 15, -1560198380);
    p = s(p, m, h, d, e[n + 13], 21, 1309151649);
    d = s(d, p, m, h, e[n + 4], 6, -145523070);
    h = s(h, d, p, m, e[n + 11], 10, -1120210379);
    m = s(m, h, d, p, e[n + 2], 15, 718787259);
    p = s(p, m, h, d, e[n + 9], 21, -343485551);
    d = i(d, r);
    p = i(p, o);
    m = i(m, l);
    h = i(h, f);
  }
  return [d, p, m, h]
}

var encodeURIComponent = function (str) {
  var hexDigits = '0123456789ABCDEF';
  var ret = '';
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if ((c >= 48 /*0*/ && c <= 57 /*9*/ ) ||
      (c >= 97 /*a*/ && c <= 122 /*z*/ ) ||
      (c >= 65 /*A*/ && c <= 90 /*Z*/ ) ||
      c == 45 /*-*/ || c == 95 /*_*/ || c == 46 /*.*/ || c == 33 /*!*/ || c == 126 /*~*/ ||
      c == 42 /***/ || c == 92 /*\\*/ || c == 40 /*(*/ || c == 41 /*)*/ ) {
      ret += str[i];
    } else {
      ret += '%';
      ret += hexDigits[(c & 0xF0) >> 4];
      ret += hexDigits[(c & 0x0F)];
    }
  }
  return ret;
};

function he() {
  var e = G.a.getJSON("igh"),
    t = [],
    n = Date.now() / 1e3;
  return e && e.t > n - 1200 && (t = e.h),
    t
}


const getM3u8Url = function (html) {
  console.log("asdasdaasd:"+html)
  var t, i, o, r, s, c, l, u, d, m, p, f, b, v, g, w, y, k, E, x, S, j;
  c = new Date;
  l = c.getTime();
  u = 6e4 * c.getTimezoneOffset();
  d = l + u + 36e5 * 8;
  m = new Date(d);
  p = m.getDate() + 9 + 9 ^ 10;
  p = Et(String(p)).substring(0, 10);
  var a = p;
  var b = Et(a);
  f = m.getDay() + 11397;
  b = "https://z1.m1907.cn/api/v/?z=".concat(b, "&jx=").concat(html);
  b += "&s1ig=".concat(f);
  b += "&g=";
  // (v = 0) && (b += "&g=".concat(v.join(",")));
  // o || (b = "/api/v/");
  console.log(b);
  // (g = document.getElementsByClassName("l")[0]).classList.remove("hide");
  // e.next = 55;
  // fetch(b, {
  //     credentials: "include"
  // });

  wx.showToast({
    title: "加载中...",
    icon: "loading",
    duration: 30000
  });
  return new Promise((resolve, reject) => {
    wx.request({ // 发送请求
      url: b, // 请求的url
      success: (res) => {
        resolve(res.data);
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // 隐藏提示加载信息
        wx.hideToast();
      }
    })
  })
  // return b;
}

module.exports = {
  getM3u8Url
}