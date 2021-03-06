(function() {
  function o(n) {
    var i = e;
    n && (e[n] || (e[n] = {}), (i = e[n]));
    if (!i.define || !i.define.packaged)
      (t.original = i.define), (i.define = t), (i.define.packaged = !0);
    if (!i.require || !i.require.packaged)
      (r.original = i.require), (i.require = r), (i.require.packaged = !0);
  }
  var ACE_NAMESPACE = "",
    e = (function() {
      return this;
    })();
  !e && typeof window != "undefined" && (e = window);
  if (!ACE_NAMESPACE && typeof requirejs != "undefined") return;
  var t = function(e, n, r) {
    if (typeof e != "string") {
      t.original
        ? t.original.apply(this, arguments)
        : (console.error("dropping module because define wasn't a string."),
          console.trace());
      return;
    }
    arguments.length == 2 && (r = n),
      t.modules[e] || ((t.payloads[e] = r), (t.modules[e] = null));
  };
  (t.modules = {}), (t.payloads = {});
  var n = function(e, t, n) {
      if (typeof t == "string") {
        var i = s(e, t);
        if (i != undefined) return n && n(), i;
      } else if (Object.prototype.toString.call(t) === "[object Array]") {
        var o = [];
        for (var u = 0, a = t.length; u < a; ++u) {
          var f = s(e, t[u]);
          if (f == undefined && r.original) return;
          o.push(f);
        }
        return (n && n.apply(null, o)) || !0;
      }
    },
    r = function(e, t) {
      var i = n("", e, t);
      return i == undefined && r.original
        ? r.original.apply(this, arguments)
        : i;
    },
    i = function(e, t) {
      if (t.indexOf("!") !== -1) {
        var n = t.split("!");
        return i(e, n[0]) + "!" + i(e, n[1]);
      }
      if (t.charAt(0) == ".") {
        var r = e
          .split("/")
          .slice(0, -1)
          .join("/");
        t = r + "/" + t;
        while (t.indexOf(".") !== -1 && s != t) {
          var s = t;
          t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
        }
      }
      return t;
    },
    s = function(e, r) {
      r = i(e, r);
      var s = t.modules[r];
      if (!s) {
        s = t.payloads[r];
        if (typeof s == "function") {
          var o = {},
            u = { id: r, uri: "", exports: o, packaged: !0 },
            a = function(e, t) {
              return n(r, e, t);
            },
            f = s(a, o, u);
          (o = f || u.exports), (t.modules[r] = o), delete t.payloads[r];
        }
        s = t.modules[r] = o || s;
      }
      return s;
    };
  o(ACE_NAMESPACE);
})(),
  define("ace/lib/regexp", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    function o(e) {
      return (
        (e.global ? "g" : "") +
        (e.ignoreCase ? "i" : "") +
        (e.multiline ? "m" : "") +
        (e.extended ? "x" : "") +
        (e.sticky ? "y" : "")
      );
    }
    function u(e, t, n) {
      if (Array.prototype.indexOf) return e.indexOf(t, n);
      for (var r = n || 0; r < e.length; r++) if (e[r] === t) return r;
      return -1;
    }
    var r = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split
      },
      i = r.exec.call(/()??/, "")[1] === undefined,
      s = (function() {
        var e = /^/g;
        return r.test.call(e, ""), !e.lastIndex;
      })();
    if (s && i) return;
    (RegExp.prototype.exec = function(e) {
      var t = r.exec.apply(this, arguments),
        n,
        a;
      if (typeof e == "string" && t) {
        !i &&
          t.length > 1 &&
          u(t, "") > -1 &&
          ((a = RegExp(this.source, r.replace.call(o(this), "g", ""))),
          r.replace.call(e.slice(t.index), a, function() {
            for (var e = 1; e < arguments.length - 2; e++)
              arguments[e] === undefined && (t[e] = undefined);
          }));
        if (this._xregexp && this._xregexp.captureNames)
          for (var f = 1; f < t.length; f++)
            (n = this._xregexp.captureNames[f - 1]), n && (t[n] = t[f]);
        !s &&
          this.global &&
          !t[0].length &&
          this.lastIndex > t.index &&
          this.lastIndex--;
      }
      return t;
    }),
      s ||
        (RegExp.prototype.test = function(e) {
          var t = r.exec.call(this, e);
          return (
            t &&
              this.global &&
              !t[0].length &&
              this.lastIndex > t.index &&
              this.lastIndex--,
            !!t
          );
        });
  }),
  define("ace/lib/es5-shim", ["require", "exports", "module"], function(
    e,
    t,
    n
  ) {
    function r() {}
    function w(e) {
      try {
        return Object.defineProperty(e, "sentinel", {}), "sentinel" in e;
      } catch (t) {}
    }
    function H(e) {
      return (
        (e = +e),
        e !== e
          ? (e = 0)
          : e !== 0 &&
            e !== 1 / 0 &&
            e !== -1 / 0 &&
            (e = (e > 0 || -1) * Math.floor(Math.abs(e))),
        e
      );
    }
    function B(e) {
      var t = typeof e;
      return (
        e === null ||
        t === "undefined" ||
        t === "boolean" ||
        t === "number" ||
        t === "string"
      );
    }
    function j(e) {
      var t, n, r;
      if (B(e)) return e;
      n = e.valueOf;
      if (typeof n == "function") {
        t = n.call(e);
        if (B(t)) return t;
      }
      r = e.toString;
      if (typeof r == "function") {
        t = r.call(e);
        if (B(t)) return t;
      }
      throw new TypeError();
    }
    Function.prototype.bind ||
      (Function.prototype.bind = function(t) {
        var n = this;
        if (typeof n != "function")
          throw new TypeError(
            "Function.prototype.bind called on incompatible " + n
          );
        var i = u.call(arguments, 1),
          s = function() {
            if (this instanceof s) {
              var e = n.apply(this, i.concat(u.call(arguments)));
              return Object(e) === e ? e : this;
            }
            return n.apply(t, i.concat(u.call(arguments)));
          };
        return (
          n.prototype &&
            ((r.prototype = n.prototype),
            (s.prototype = new r()),
            (r.prototype = null)),
          s
        );
      });
    var i = Function.prototype.call,
      s = Array.prototype,
      o = Object.prototype,
      u = s.slice,
      a = i.bind(o.toString),
      f = i.bind(o.hasOwnProperty),
      l,
      c,
      h,
      p,
      d;
    if ((d = f(o, "__defineGetter__")))
      (l = i.bind(o.__defineGetter__)),
        (c = i.bind(o.__defineSetter__)),
        (h = i.bind(o.__lookupGetter__)),
        (p = i.bind(o.__lookupSetter__));
    if ([1, 2].splice(0).length != 2)
      if (
        !(function() {
          function e(e) {
            var t = new Array(e + 2);
            return (t[0] = t[1] = 0), t;
          }
          var t = [],
            n;
          t.splice.apply(t, e(20)),
            t.splice.apply(t, e(26)),
            (n = t.length),
            t.splice(5, 0, "XXX"),
            n + 1 == t.length;
          if (n + 1 == t.length) return !0;
        })()
      )
        Array.prototype.splice = function(e, t) {
          var n = this.length;
          e > 0
            ? e > n && (e = n)
            : e == void 0
            ? (e = 0)
            : e < 0 && (e = Math.max(n + e, 0)),
            e + t < n || (t = n - e);
          var r = this.slice(e, e + t),
            i = u.call(arguments, 2),
            s = i.length;
          if (e === n) s && this.push.apply(this, i);
          else {
            var o = Math.min(t, n - e),
              a = e + o,
              f = a + s - o,
              l = n - a,
              c = n - o;
            if (f < a) for (var h = 0; h < l; ++h) this[f + h] = this[a + h];
            else if (f > a) for (h = l; h--; ) this[f + h] = this[a + h];
            if (s && e === c) (this.length = c), this.push.apply(this, i);
            else {
              this.length = c + s;
              for (h = 0; h < s; ++h) this[e + h] = i[h];
            }
          }
          return r;
        };
      else {
        var v = Array.prototype.splice;
        Array.prototype.splice = function(e, t) {
          return arguments.length
            ? v.apply(
                this,
                [
                  e === void 0 ? 0 : e,
                  t === void 0 ? this.length - e : t
                ].concat(u.call(arguments, 2))
              )
            : [];
        };
      }
    Array.isArray ||
      (Array.isArray = function(t) {
        return a(t) == "[object Array]";
      });
    var m = Object("a"),
      g = m[0] != "a" || !(0 in m);
    Array.prototype.forEach ||
      (Array.prototype.forEach = function(t) {
        var n = F(this),
          r = g && a(this) == "[object String]" ? this.split("") : n,
          i = arguments[1],
          s = -1,
          o = r.length >>> 0;
        if (a(t) != "[object Function]") throw new TypeError();
        while (++s < o) s in r && t.call(i, r[s], s, n);
      }),
      Array.prototype.map ||
        (Array.prototype.map = function(t) {
          var n = F(this),
            r = g && a(this) == "[object String]" ? this.split("") : n,
            i = r.length >>> 0,
            s = Array(i),
            o = arguments[1];
          if (a(t) != "[object Function]")
            throw new TypeError(t + " is not a function");
          for (var u = 0; u < i; u++) u in r && (s[u] = t.call(o, r[u], u, n));
          return s;
        }),
      Array.prototype.filter ||
        (Array.prototype.filter = function(t) {
          var n = F(this),
            r = g && a(this) == "[object String]" ? this.split("") : n,
            i = r.length >>> 0,
            s = [],
            o,
            u = arguments[1];
          if (a(t) != "[object Function]")
            throw new TypeError(t + " is not a function");
          for (var f = 0; f < i; f++)
            f in r && ((o = r[f]), t.call(u, o, f, n) && s.push(o));
          return s;
        }),
      Array.prototype.every ||
        (Array.prototype.every = function(t) {
          var n = F(this),
            r = g && a(this) == "[object String]" ? this.split("") : n,
            i = r.length >>> 0,
            s = arguments[1];
          if (a(t) != "[object Function]")
            throw new TypeError(t + " is not a function");
          for (var o = 0; o < i; o++)
            if (o in r && !t.call(s, r[o], o, n)) return !1;
          return !0;
        }),
      Array.prototype.some ||
        (Array.prototype.some = function(t) {
          var n = F(this),
            r = g && a(this) == "[object String]" ? this.split("") : n,
            i = r.length >>> 0,
            s = arguments[1];
          if (a(t) != "[object Function]")
            throw new TypeError(t + " is not a function");
          for (var o = 0; o < i; o++)
            if (o in r && t.call(s, r[o], o, n)) return !0;
          return !1;
        }),
      Array.prototype.reduce ||
        (Array.prototype.reduce = function(t) {
          var n = F(this),
            r = g && a(this) == "[object String]" ? this.split("") : n,
            i = r.length >>> 0;
          if (a(t) != "[object Function]")
            throw new TypeError(t + " is not a function");
          if (!i && arguments.length == 1)
            throw new TypeError("reduce of empty array with no initial value");
          var s = 0,
            o;
          if (arguments.length >= 2) o = arguments[1];
          else
            do {
              if (s in r) {
                o = r[s++];
                break;
              }
              if (++s >= i)
                throw new TypeError(
                  "reduce of empty array with no initial value"
                );
            } while (!0);
          for (; s < i; s++) s in r && (o = t.call(void 0, o, r[s], s, n));
          return o;
        }),
      Array.prototype.reduceRight ||
        (Array.prototype.reduceRight = function(t) {
          var n = F(this),
            r = g && a(this) == "[object String]" ? this.split("") : n,
            i = r.length >>> 0;
          if (a(t) != "[object Function]")
            throw new TypeError(t + " is not a function");
          if (!i && arguments.length == 1)
            throw new TypeError(
              "reduceRight of empty array with no initial value"
            );
          var s,
            o = i - 1;
          if (arguments.length >= 2) s = arguments[1];
          else
            do {
              if (o in r) {
                s = r[o--];
                break;
              }
              if (--o < 0)
                throw new TypeError(
                  "reduceRight of empty array with no initial value"
                );
            } while (!0);
          do o in this && (s = t.call(void 0, s, r[o], o, n));
          while (o--);
          return s;
        });
    if (!Array.prototype.indexOf || [0, 1].indexOf(1, 2) != -1)
      Array.prototype.indexOf = function(t) {
        var n = g && a(this) == "[object String]" ? this.split("") : F(this),
          r = n.length >>> 0;
        if (!r) return -1;
        var i = 0;
        arguments.length > 1 && (i = H(arguments[1])),
          (i = i >= 0 ? i : Math.max(0, r + i));
        for (; i < r; i++) if (i in n && n[i] === t) return i;
        return -1;
      };
    if (!Array.prototype.lastIndexOf || [0, 1].lastIndexOf(0, -3) != -1)
      Array.prototype.lastIndexOf = function(t) {
        var n = g && a(this) == "[object String]" ? this.split("") : F(this),
          r = n.length >>> 0;
        if (!r) return -1;
        var i = r - 1;
        arguments.length > 1 && (i = Math.min(i, H(arguments[1]))),
          (i = i >= 0 ? i : r - Math.abs(i));
        for (; i >= 0; i--) if (i in n && t === n[i]) return i;
        return -1;
      };
    Object.getPrototypeOf ||
      (Object.getPrototypeOf = function(t) {
        return t.__proto__ || (t.constructor ? t.constructor.prototype : o);
      });
    if (!Object.getOwnPropertyDescriptor) {
      var y = "Object.getOwnPropertyDescriptor called on a non-object: ";
      Object.getOwnPropertyDescriptor = function(t, n) {
        if ((typeof t != "object" && typeof t != "function") || t === null)
          throw new TypeError(y + t);
        if (!f(t, n)) return;
        var r, i, s;
        r = { enumerable: !0, configurable: !0 };
        if (d) {
          var u = t.__proto__;
          t.__proto__ = o;
          var i = h(t, n),
            s = p(t, n);
          t.__proto__ = u;
          if (i || s) return i && (r.get = i), s && (r.set = s), r;
        }
        return (r.value = t[n]), r;
      };
    }
    Object.getOwnPropertyNames ||
      (Object.getOwnPropertyNames = function(t) {
        return Object.keys(t);
      });
    if (!Object.create) {
      var b;
      Object.prototype.__proto__ === null
        ? (b = function() {
            return { __proto__: null };
          })
        : (b = function() {
            var e = {};
            for (var t in e) e[t] = null;
            return (
              (e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null),
              e
            );
          }),
        (Object.create = function(t, n) {
          var r;
          if (t === null) r = b();
          else {
            if (typeof t != "object")
              throw new TypeError(
                "typeof prototype[" + typeof t + "] != 'object'"
              );
            var i = function() {};
            (i.prototype = t), (r = new i()), (r.__proto__ = t);
          }
          return n !== void 0 && Object.defineProperties(r, n), r;
        });
    }
    if (Object.defineProperty) {
      var E = w({}),
        S = typeof document == "undefined" || w(document.createElement("div"));
      if (!E || !S) var x = Object.defineProperty;
    }
    if (!Object.defineProperty || x) {
      var T = "Property description must be an object: ",
        N = "Object.defineProperty called on non-object: ",
        C = "getters & setters can not be defined on this javascript engine";
      Object.defineProperty = function(t, n, r) {
        if ((typeof t != "object" && typeof t != "function") || t === null)
          throw new TypeError(N + t);
        if ((typeof r != "object" && typeof r != "function") || r === null)
          throw new TypeError(T + r);
        if (x)
          try {
            return x.call(Object, t, n, r);
          } catch (i) {}
        if (f(r, "value"))
          if (d && (h(t, n) || p(t, n))) {
            var s = t.__proto__;
            (t.__proto__ = o), delete t[n], (t[n] = r.value), (t.__proto__ = s);
          } else t[n] = r.value;
        else {
          if (!d) throw new TypeError(C);
          f(r, "get") && l(t, n, r.get), f(r, "set") && c(t, n, r.set);
        }
        return t;
      };
    }
    Object.defineProperties ||
      (Object.defineProperties = function(t, n) {
        for (var r in n) f(n, r) && Object.defineProperty(t, r, n[r]);
        return t;
      }),
      Object.seal ||
        (Object.seal = function(t) {
          return t;
        }),
      Object.freeze ||
        (Object.freeze = function(t) {
          return t;
        });
    try {
      Object.freeze(function() {});
    } catch (k) {
      Object.freeze = (function(t) {
        return function(n) {
          return typeof n == "function" ? n : t(n);
        };
      })(Object.freeze);
    }
    Object.preventExtensions ||
      (Object.preventExtensions = function(t) {
        return t;
      }),
      Object.isSealed ||
        (Object.isSealed = function(t) {
          return !1;
        }),
      Object.isFrozen ||
        (Object.isFrozen = function(t) {
          return !1;
        }),
      Object.isExtensible ||
        (Object.isExtensible = function(t) {
          if (Object(t) === t) throw new TypeError();
          var n = "";
          while (f(t, n)) n += "?";
          t[n] = !0;
          var r = f(t, n);
          return delete t[n], r;
        });
    if (!Object.keys) {
      var L = !0,
        A = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ],
        O = A.length;
      for (var M in { toString: null }) L = !1;
      Object.keys = function I(e) {
        if ((typeof e != "object" && typeof e != "function") || e === null)
          throw new TypeError("Object.keys called on a non-object");
        var I = [];
        for (var t in e) f(e, t) && I.push(t);
        if (L)
          for (var n = 0, r = O; n < r; n++) {
            var i = A[n];
            f(e, i) && I.push(i);
          }
        return I;
      };
    }
    Date.now ||
      (Date.now = function() {
        return new Date().getTime();
      });
    var _ =
      "	\n\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";
    if (!String.prototype.trim || _.trim()) {
      _ = "[" + _ + "]";
      var D = new RegExp("^" + _ + _ + "*"),
        P = new RegExp(_ + _ + "*$");
      String.prototype.trim = function() {
        return String(this)
          .replace(D, "")
          .replace(P, "");
      };
    }
    var F = function(e) {
      if (e == null) throw new TypeError("can't convert " + e + " to object");
      return Object(e);
    };
  }),
  define("ace/lib/fixoldbrowsers", [
    "require",
    "exports",
    "module",
    "ace/lib/regexp",
    "ace/lib/es5-shim"
  ], function(e, t, n) {
    "use strict";
    e("./regexp"), e("./es5-shim");
  }),
  define("ace/lib/dom", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    var r = "http://www.w3.org/1999/xhtml";
    (t.getDocumentHead = function(e) {
      return (
        e || (e = document),
        e.head || e.getElementsByTagName("head")[0] || e.documentElement
      );
    }),
      (t.createElement = function(e, t) {
        return document.createElementNS
          ? document.createElementNS(t || r, e)
          : document.createElement(e);
      }),
      (t.hasCssClass = function(e, t) {
        var n = (e.className + "").split(/\s+/g);
        return n.indexOf(t) !== -1;
      }),
      (t.addCssClass = function(e, n) {
        t.hasCssClass(e, n) || (e.className += " " + n);
      }),
      (t.removeCssClass = function(e, t) {
        var n = e.className.split(/\s+/g);
        for (;;) {
          var r = n.indexOf(t);
          if (r == -1) break;
          n.splice(r, 1);
        }
        e.className = n.join(" ");
      }),
      (t.toggleCssClass = function(e, t) {
        var n = e.className.split(/\s+/g),
          r = !0;
        for (;;) {
          var i = n.indexOf(t);
          if (i == -1) break;
          (r = !1), n.splice(i, 1);
        }
        return r && n.push(t), (e.className = n.join(" ")), r;
      }),
      (t.setCssClass = function(e, n, r) {
        r ? t.addCssClass(e, n) : t.removeCssClass(e, n);
      }),
      (t.hasCssString = function(e, t) {
        var n = 0,
          r;
        t = t || document;
        if (t.createStyleSheet && (r = t.styleSheets)) {
          while (n < r.length) if (r[n++].owningElement.id === e) return !0;
        } else if ((r = t.getElementsByTagName("style")))
          while (n < r.length) if (r[n++].id === e) return !0;
        return !1;
      }),
      (t.importCssString = function(n, r, i) {
        i = i || document;
        if (r && t.hasCssString(r, i)) return null;
        var s;
        r && (n += "\n/*# sourceURL=ace/css/" + r + " */"),
          i.createStyleSheet
            ? ((s = i.createStyleSheet()),
              (s.cssText = n),
              r && (s.owningElement.id = r))
            : ((s = t.createElement("style")),
              s.appendChild(i.createTextNode(n)),
              r && (s.id = r),
              t.getDocumentHead(i).appendChild(s));
      }),
      (t.importCssStylsheet = function(e, n) {
        if (n.createStyleSheet) n.createStyleSheet(e);
        else {
          var r = t.createElement("link");
          (r.rel = "stylesheet"),
            (r.href = e),
            t.getDocumentHead(n).appendChild(r);
        }
      }),
      (t.getInnerWidth = function(e) {
        return (
          parseInt(t.computedStyle(e, "paddingLeft"), 10) +
          parseInt(t.computedStyle(e, "paddingRight"), 10) +
          e.clientWidth
        );
      }),
      (t.getInnerHeight = function(e) {
        return (
          parseInt(t.computedStyle(e, "paddingTop"), 10) +
          parseInt(t.computedStyle(e, "paddingBottom"), 10) +
          e.clientHeight
        );
      }),
      (t.scrollbarWidth = function(e) {
        var n = t.createElement("ace_inner");
        (n.style.width = "100%"),
          (n.style.minWidth = "0px"),
          (n.style.height = "200px"),
          (n.style.display = "block");
        var r = t.createElement("ace_outer"),
          i = r.style;
        (i.position = "absolute"),
          (i.left = "-10000px"),
          (i.overflow = "hidden"),
          (i.width = "200px"),
          (i.minWidth = "0px"),
          (i.height = "150px"),
          (i.display = "block"),
          r.appendChild(n);
        var s = e.documentElement;
        s.appendChild(r);
        var o = n.offsetWidth;
        i.overflow = "scroll";
        var u = n.offsetWidth;
        return o == u && (u = r.clientWidth), s.removeChild(r), o - u;
      });
    if (typeof document == "undefined") {
      t.importCssString = function() {};
      return;
    }
    window.pageYOffset !== undefined
      ? ((t.getPageScrollTop = function() {
          return window.pageYOffset;
        }),
        (t.getPageScrollLeft = function() {
          return window.pageXOffset;
        }))
      : ((t.getPageScrollTop = function() {
          return document.body.scrollTop;
        }),
        (t.getPageScrollLeft = function() {
          return document.body.scrollLeft;
        })),
      window.getComputedStyle
        ? (t.computedStyle = function(e, t) {
            return t
              ? (window.getComputedStyle(e, "") || {})[t] || ""
              : window.getComputedStyle(e, "") || {};
          })
        : (t.computedStyle = function(e, t) {
            return t ? e.currentStyle[t] : e.currentStyle;
          }),
      (t.setInnerHtml = function(e, t) {
        var n = e.cloneNode(!1);
        return (n.innerHTML = t), e.parentNode.replaceChild(n, e), n;
      }),
      "textContent" in document.documentElement
        ? ((t.setInnerText = function(e, t) {
            e.textContent = t;
          }),
          (t.getInnerText = function(e) {
            return e.textContent;
          }))
        : ((t.setInnerText = function(e, t) {
            e.innerText = t;
          }),
          (t.getInnerText = function(e) {
            return e.innerText;
          })),
      (t.getParentWindow = function(e) {
        return e.defaultView || e.parentWindow;
      });
  }),
  define("ace/lib/oop", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    (t.inherits = function(e, t) {
      (e.super_ = t),
        (e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }));
    }),
      (t.mixin = function(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
      }),
      (t.implement = function(e, n) {
        t.mixin(e, n);
      });
  }),
  define("ace/lib/keys", [
    "require",
    "exports",
    "module",
    "ace/lib/fixoldbrowsers",
    "ace/lib/oop"
  ], function(e, t, n) {
    "use strict";
    e("./fixoldbrowsers");
    var r = e("./oop"),
      i = (function() {
        var e = {
            MODIFIER_KEYS: { 16: "Shift", 17: "Ctrl", 18: "Alt", 224: "Meta" },
            KEY_MODS: {
              ctrl: 1,
              alt: 2,
              option: 2,
              shift: 4,
              super: 8,
              meta: 8,
              command: 8,
              cmd: 8
            },
            FUNCTION_KEYS: {
              8: "Backspace",
              9: "Tab",
              13: "Return",
              19: "Pause",
              27: "Esc",
              32: "Space",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "Left",
              38: "Up",
              39: "Right",
              40: "Down",
              44: "Print",
              45: "Insert",
              46: "Delete",
              96: "Numpad0",
              97: "Numpad1",
              98: "Numpad2",
              99: "Numpad3",
              100: "Numpad4",
              101: "Numpad5",
              102: "Numpad6",
              103: "Numpad7",
              104: "Numpad8",
              105: "Numpad9",
              "-13": "NumpadEnter",
              112: "F1",
              113: "F2",
              114: "F3",
              115: "F4",
              116: "F5",
              117: "F6",
              118: "F7",
              119: "F8",
              120: "F9",
              121: "F10",
              122: "F11",
              123: "F12",
              144: "Numlock",
              145: "Scrolllock"
            },
            PRINTABLE_KEYS: {
              32: " ",
              48: "0",
              49: "1",
              50: "2",
              51: "3",
              52: "4",
              53: "5",
              54: "6",
              55: "7",
              56: "8",
              57: "9",
              59: ";",
              61: "=",
              65: "a",
              66: "b",
              67: "c",
              68: "d",
              69: "e",
              70: "f",
              71: "g",
              72: "h",
              73: "i",
              74: "j",
              75: "k",
              76: "l",
              77: "m",
              78: "n",
              79: "o",
              80: "p",
              81: "q",
              82: "r",
              83: "s",
              84: "t",
              85: "u",
              86: "v",
              87: "w",
              88: "x",
              89: "y",
              90: "z",
              107: "+",
              109: "-",
              110: ".",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
              111: "/",
              106: "*"
            }
          },
          t,
          n;
        for (n in e.FUNCTION_KEYS)
          (t = e.FUNCTION_KEYS[n].toLowerCase()), (e[t] = parseInt(n, 10));
        for (n in e.PRINTABLE_KEYS)
          (t = e.PRINTABLE_KEYS[n].toLowerCase()), (e[t] = parseInt(n, 10));
        return (
          r.mixin(e, e.MODIFIER_KEYS),
          r.mixin(e, e.PRINTABLE_KEYS),
          r.mixin(e, e.FUNCTION_KEYS),
          (e.enter = e["return"]),
          (e.escape = e.esc),
          (e.del = e["delete"]),
          (e[173] = "-"),
          (function() {
            var t = ["cmd", "ctrl", "alt", "shift"];
            for (var n = Math.pow(2, t.length); n--; )
              e.KEY_MODS[n] =
                t
                  .filter(function(t) {
                    return n & e.KEY_MODS[t];
                  })
                  .join("-") + "-";
          })(),
          (e.KEY_MODS[0] = ""),
          (e.KEY_MODS[-1] = "input-"),
          e
        );
      })();
    r.mixin(t, i),
      (t.keyCodeToString = function(e) {
        var t = i[e];
        return (
          typeof t != "string" && (t = String.fromCharCode(e)), t.toLowerCase()
        );
      });
  }),
  define("ace/lib/useragent", ["require", "exports", "module"], function(
    e,
    t,
    n
  ) {
    "use strict";
    (t.OS = { LINUX: "LINUX", MAC: "MAC", WINDOWS: "WINDOWS" }),
      (t.getOS = function() {
        return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS;
      });
    if (typeof navigator != "object") return;
    var r = (navigator.platform.match(/mac|win|linux/i) || [
        "other"
      ])[0].toLowerCase(),
      i = navigator.userAgent;
    (t.isWin = r == "win"),
      (t.isMac = r == "mac"),
      (t.isLinux = r == "linux"),
      (t.isIE =
        navigator.appName == "Microsoft Internet Explorer" ||
        navigator.appName.indexOf("MSAppHost") >= 0
          ? parseFloat(
              (i.match(
                /(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/
              ) || [])[1]
            )
          : parseFloat(
              (i.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) ||
                [])[1]
            )),
      (t.isOldIE = t.isIE && t.isIE < 9),
      (t.isGecko = t.isMozilla =
        (window.Controllers || window.controllers) &&
        window.navigator.product === "Gecko"),
      (t.isOldGecko =
        t.isGecko && parseInt((i.match(/rv:(\d+)/) || [])[1], 10) < 4),
      (t.isOpera =
        window.opera &&
        Object.prototype.toString.call(window.opera) == "[object Opera]"),
      (t.isWebKit = parseFloat(i.split("WebKit/")[1]) || undefined),
      (t.isChrome = parseFloat(i.split(" Chrome/")[1]) || undefined),
      (t.isAIR = i.indexOf("AdobeAIR") >= 0),
      (t.isIPad = i.indexOf("iPad") >= 0),
      (t.isTouchPad = i.indexOf("TouchPad") >= 0),
      (t.isChromeOS = i.indexOf(" CrOS ") >= 0);
  }),
  define("ace/lib/event", [
    "require",
    "exports",
    "module",
    "ace/lib/keys",
    "ace/lib/useragent"
  ], function(e, t, n) {
    "use strict";
    function a(e, t, n) {
      var a = u(t);
      if (!i.isMac && s) {
        t.getModifierState &&
          (t.getModifierState("OS") || t.getModifierState("Win")) &&
          (a |= 8);
        if (s.altGr) {
          if ((3 & a) == 3) return;
          s.altGr = 0;
        }
        if (n === 18 || n === 17) {
          var f = "location" in t ? t.location : t.keyLocation;
          if (n === 17 && f === 1) s[n] == 1 && (o = t.timeStamp);
          else if (n === 18 && a === 3 && f === 2) {
            var l = t.timeStamp - o;
            l < 50 && (s.altGr = !0);
          }
        }
      }
      n in r.MODIFIER_KEYS && (n = -1), a & 8 && n >= 91 && n <= 93 && (n = -1);
      if (!a && n === 13) {
        var f = "location" in t ? t.location : t.keyLocation;
        if (f === 3) {
          e(t, a, -n);
          if (t.defaultPrevented) return;
        }
      }
      if (i.isChromeOS && a & 8) {
        e(t, a, n);
        if (t.defaultPrevented) return;
        a &= -9;
      }
      return !!a || n in r.FUNCTION_KEYS || n in r.PRINTABLE_KEYS
        ? e(t, a, n)
        : !1;
    }
    function f() {
      s = Object.create(null);
    }
    var r = e("./keys"),
      i = e("./useragent"),
      s = null,
      o = 0;
    (t.addListener = function(e, t, n) {
      if (e.addEventListener) return e.addEventListener(t, n, !1);
      if (e.attachEvent) {
        var r = function() {
          n.call(e, window.event);
        };
        (n._wrapper = r), e.attachEvent("on" + t, r);
      }
    }),
      (t.removeListener = function(e, t, n) {
        if (e.removeEventListener) return e.removeEventListener(t, n, !1);
        e.detachEvent && e.detachEvent("on" + t, n._wrapper || n);
      }),
      (t.stopEvent = function(e) {
        return t.stopPropagation(e), t.preventDefault(e), !1;
      }),
      (t.stopPropagation = function(e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
      }),
      (t.preventDefault = function(e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
      }),
      (t.getButton = function(e) {
        return e.type == "dblclick"
          ? 0
          : e.type == "contextmenu" ||
            (i.isMac && e.ctrlKey && !e.altKey && !e.shiftKey)
          ? 2
          : e.preventDefault
          ? e.button
          : { 1: 0, 2: 2, 4: 1 }[e.button];
      }),
      (t.capture = function(e, n, r) {
        function i(e) {
          n && n(e),
            r && r(e),
            t.removeListener(document, "mousemove", n, !0),
            t.removeListener(document, "mouseup", i, !0),
            t.removeListener(document, "dragstart", i, !0);
        }
        return (
          t.addListener(document, "mousemove", n, !0),
          t.addListener(document, "mouseup", i, !0),
          t.addListener(document, "dragstart", i, !0),
          i
        );
      }),
      (t.addTouchMoveListener = function(e, n) {
        if ("ontouchmove" in e) {
          var r, i;
          t.addListener(e, "touchstart", function(e) {
            var t = e.changedTouches[0];
            (r = t.clientX), (i = t.clientY);
          }),
            t.addListener(e, "touchmove", function(e) {
              var t = 1,
                s = e.changedTouches[0];
              (e.wheelX = -(s.clientX - r) / t),
                (e.wheelY = -(s.clientY - i) / t),
                (r = s.clientX),
                (i = s.clientY),
                n(e);
            });
        }
      }),
      (t.addMouseWheelListener = function(e, n) {
        "onmousewheel" in e
          ? t.addListener(e, "mousewheel", function(e) {
              var t = 8;
              e.wheelDeltaX !== undefined
                ? ((e.wheelX = -e.wheelDeltaX / t),
                  (e.wheelY = -e.wheelDeltaY / t))
                : ((e.wheelX = 0), (e.wheelY = -e.wheelDelta / t)),
                n(e);
            })
          : "onwheel" in e
          ? t.addListener(e, "wheel", function(e) {
              var t = 0.35;
              switch (e.deltaMode) {
                case e.DOM_DELTA_PIXEL:
                  (e.wheelX = e.deltaX * t || 0),
                    (e.wheelY = e.deltaY * t || 0);
                  break;
                case e.DOM_DELTA_LINE:
                case e.DOM_DELTA_PAGE:
                  (e.wheelX = (e.deltaX || 0) * 5),
                    (e.wheelY = (e.deltaY || 0) * 5);
              }
              n(e);
            })
          : t.addListener(e, "DOMMouseScroll", function(e) {
              e.axis && e.axis == e.HORIZONTAL_AXIS
                ? ((e.wheelX = (e.detail || 0) * 5), (e.wheelY = 0))
                : ((e.wheelX = 0), (e.wheelY = (e.detail || 0) * 5)),
                n(e);
            });
      }),
      (t.addMultiMouseDownListener = function(e, n, r, s) {
        function c(e) {
          t.getButton(e) !== 0
            ? (o = 0)
            : e.detail > 1
            ? (o++, o > 4 && (o = 1))
            : (o = 1);
          if (i.isIE) {
            var c = Math.abs(e.clientX - u) > 5 || Math.abs(e.clientY - a) > 5;
            if (!f || c) o = 1;
            f && clearTimeout(f),
              (f = setTimeout(function() {
                f = null;
              }, n[o - 1] || 600)),
              o == 1 && ((u = e.clientX), (a = e.clientY));
          }
          (e._clicks = o), r[s]("mousedown", e);
          if (o > 4) o = 0;
          else if (o > 1) return r[s](l[o], e);
        }
        function h(e) {
          (o = 2),
            f && clearTimeout(f),
            (f = setTimeout(function() {
              f = null;
            }, n[o - 1] || 600)),
            r[s]("mousedown", e),
            r[s](l[o], e);
        }
        var o = 0,
          u,
          a,
          f,
          l = { 2: "dblclick", 3: "tripleclick", 4: "quadclick" };
        Array.isArray(e) || (e = [e]),
          e.forEach(function(e) {
            t.addListener(e, "mousedown", c),
              i.isOldIE && t.addListener(e, "dblclick", h);
          });
      });
    var u =
      !i.isMac || !i.isOpera || "KeyboardEvent" in window
        ? function(e) {
            return (
              0 |
              (e.ctrlKey ? 1 : 0) |
              (e.altKey ? 2 : 0) |
              (e.shiftKey ? 4 : 0) |
              (e.metaKey ? 8 : 0)
            );
          }
        : function(e) {
            return (
              0 |
              (e.metaKey ? 1 : 0) |
              (e.altKey ? 2 : 0) |
              (e.shiftKey ? 4 : 0) |
              (e.ctrlKey ? 8 : 0)
            );
          };
    (t.getModifierString = function(e) {
      return r.KEY_MODS[u(e)];
    }),
      (t.addCommandKeyListener = function(e, n) {
        var r = t.addListener;
        if (i.isOldGecko || (i.isOpera && !("KeyboardEvent" in window))) {
          var o = null;
          r(e, "keydown", function(e) {
            o = e.keyCode;
          }),
            r(e, "keypress", function(e) {
              return a(n, e, o);
            });
        } else {
          var u = null;
          r(e, "keydown", function(e) {
            s[e.keyCode] = (s[e.keyCode] || 0) + 1;
            var t = a(n, e, e.keyCode);
            return (u = e.defaultPrevented), t;
          }),
            r(e, "keypress", function(e) {
              u &&
                (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) &&
                (t.stopEvent(e), (u = null));
            }),
            r(e, "keyup", function(e) {
              s[e.keyCode] = null;
            }),
            s || (f(), r(window, "focus", f));
        }
      });
    if (typeof window == "object" && window.postMessage && !i.isOldIE) {
      var l = 1;
      t.nextTick = function(e, n) {
        n = n || window;
        var r = "zero-timeout-message-" + l;
        t.addListener(n, "message", function i(s) {
          s.data == r &&
            (t.stopPropagation(s), t.removeListener(n, "message", i), e());
        }),
          n.postMessage(r, "*");
      };
    }
    (t.nextFrame =
      typeof window == "object" &&
      (window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame)),
      t.nextFrame
        ? (t.nextFrame = t.nextFrame.bind(window))
        : (t.nextFrame = function(e) {
            setTimeout(e, 17);
          });
  }),
  define("ace/lib/lang", ["require", "exports", "module"], function(e, t, n) {
    "use strict";
    (t.last = function(e) {
      return e[e.length - 1];
    }),
      (t.stringReverse = function(e) {
        return e
          .split("")
          .reverse()
          .join("");
      }),
      (t.stringRepeat = function(e, t) {
        var n = "";
        while (t > 0) {
          t & 1 && (n += e);
          if ((t >>= 1)) e += e;
        }
        return n;
      });
    var r = /^\s\s*/,
      i = /\s\s*$/;
    (t.stringTrimLeft = function(e) {
      return e.replace(r, "");
    }),
      (t.stringTrimRight = function(e) {
        return e.replace(i, "");
      }),
      (t.copyObject = function(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }),
      (t.copyArray = function(e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++)
          e[n] && typeof e[n] == "object"
            ? (t[n] = this.copyObject(e[n]))
            : (t[n] = e[n]);
        return t;
      }),
      (t.deepCopy = function s(e) {
        if (typeof e != "object" || !e) return e;
        var t;
        if (Array.isArray(e)) {
          t = [];
          for (var n = 0; n < e.length; n++) t[n] = s(e[n]);
          return t;
        }
        if (Object.prototype.toString.call(e) !== "[object Object]") return e;
        t = {};
        for (var n in e) t[n] = s(e[n]);
        return t;
      }),
      (t.arrayToMap = function(e) {
        var t = {};
        for (var n = 0; n < e.length; n++) t[e[n]] = 1;
        return t;
      }),
      (t.createMap = function(e) {
        var t = Object.create(null);
        for (var n in e) t[n] = e[n];
        return t;
      }),
      (t.arrayRemove = function(e, t) {
        for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1);
      }),
      (t.escapeRegExp = function(e) {
        return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
      }),
      (t.escapeHTML = function(e) {
        return e
          .replace(/&/g, "&#38;")
          .replace(/"/g, "&#34;")
          .replace(/'/g, "&#39;")
          .replace(/</g, "&#60;");
      }),
      (t.getMatchOffsets = function(e, t) {
        var n = [];
        return (
          e.replace(t, function(e) {
            n.push({
              offset: arguments[arguments.length - 2],
              length: e.length
            });
          }),
          n
        );
      }),
      (t.deferredCall = function(e) {
        var t = null,
          n = function() {
            (t = null), e();
          },
          r = function(e) {
            return r.cancel(), (t = setTimeout(n, e || 0)), r;
          };
        return (
          (r.schedule = r),
          (r.call = function() {
            return this.cancel(), e(), r;
          }),
          (r.cancel = function() {
            return clearTimeout(t), (t = null), r;
          }),
          (r.isPending = function() {
            return t;
          }),
          r
        );
      }),
      (t.delayedCall = function(e, t) {
        var n = null,
          r = function() {
            (n = null), e();
          },
          i = function(e) {
            n == null && (n = setTimeout(r, e || t));
          };
        return (
          (i.delay = function(e) {
            n && clearTimeout(n), (n = setTimeout(r, e || t));
          }),
          (i.schedule = i),
          (i.call = function() {
            this.cancel(), e();
          }),
          (i.cancel = function() {
            n && clearTimeout(n), (n = null);
          }),
          (i.isPending = function() {
            return n;
          }),
          i
        );
      });
  }),
  define("ace/keyboard/textinput", [
    "require",
    "exports",
    "module",
    "ace/lib/event",
    "ace/lib/useragent",
    "ace/lib/dom",
    "ace/lib/lang"
  ], function(e, t, n) {
    "use strict";
    var r = e("../lib/event"),
      i = e("../lib/useragent"),
      s = e("../lib/dom"),
      o = e("../lib/lang"),
      u = i.isChrome < 18,
      a = i.isIE,
      f = function(e, t) {
        function b(e) {
          if (h) return;
          h = !0;
          if (k) (t = 0), (r = e ? 0 : n.value.length - 1);
          else
            var t = e ? 2 : 1,
              r = 2;
          try {
            n.setSelectionRange(t, r);
          } catch (i) {}
          h = !1;
        }
        function w() {
          if (h) return;
          (n.value = f), i.isWebKit && y.schedule();
        }
        function R() {
          clearTimeout(q),
            (q = setTimeout(
              function() {
                p && ((n.style.cssText = p), (p = "")),
                  t.renderer.$keepTextAreaAtCursor == null &&
                    ((t.renderer.$keepTextAreaAtCursor = !0),
                    t.renderer.$moveTextAreaToCursor());
              },
              i.isOldIE ? 200 : 0
            ));
        }
        var n = s.createElement("textarea");
        (n.className = "ace_text-input"),
          i.isTouchPad && n.setAttribute("x-palm-disable-auto-cap", !0),
          n.setAttribute("wrap", "off"),
          n.setAttribute("autocorrect", "off"),
          n.setAttribute("autocapitalize", "off"),
          n.setAttribute("spellcheck", !1),
          (n.style.opacity = "0"),
          i.isOldIE && (n.style.top = "-1000px"),
          e.insertBefore(n, e.firstChild);
        var f = "",
          l = !1,
          c = !1,
          h = !1,
          p = "",
          d = !0;
        try {
          var v = document.activeElement === n;
        } catch (m) {}
        r.addListener(n, "blur", function(e) {
          t.onBlur(e), (v = !1);
        }),
          r.addListener(n, "focus", function(e) {
            (v = !0), t.onFocus(e), b();
          }),
          (this.focus = function() {
            if (p) return n.focus();
            var e = n.style.top;
            (n.style.position = "fixed"),
              (n.style.top = "0px"),
              n.focus(),
              setTimeout(function() {
                (n.style.position = ""),
                  n.style.top == "0px" && (n.style.top = e);
              }, 0);
          }),
          (this.blur = function() {
            n.blur();
          }),
          (this.isFocused = function() {
            return v;
          });
        var g = o.delayedCall(function() {
            v && b(d);
          }),
          y = o.delayedCall(function() {
            h || ((n.value = f), v && b());
          });
        i.isWebKit ||
          t.addEventListener("changeSelection", function() {
            t.selection.isEmpty() != d && ((d = !d), g.schedule());
          }),
          w(),
          v && t.onFocus();
        var E = function(e) {
          return e.selectionStart === 0 && e.selectionEnd === e.value.length;
        };
        !n.setSelectionRange &&
          n.createTextRange &&
          ((n.setSelectionRange = function(e, t) {
            var n = this.createTextRange();
            n.collapse(!0),
              n.moveStart("character", e),
              n.moveEnd("character", t),
              n.select();
          }),
          (E = function(e) {
            try {
              var t = e.ownerDocument.selection.createRange();
            } catch (n) {}
            return !t || t.parentElement() != e ? !1 : t.text == e.value;
          }));
        if (i.isOldIE) {
          var S = !1,
            x = function(e) {
              if (S) return;
              var t = n.value;
              if (h || !t || t == f) return;
              if (e && t == f[0]) return T.schedule();
              A(t), (S = !0), w(), (S = !1);
            },
            T = o.delayedCall(x);
          r.addListener(n, "propertychange", x);
          var N = { 13: 1, 27: 1 };
          r.addListener(n, "keyup", function(e) {
            h && (!n.value || N[e.keyCode]) && setTimeout(F, 0);
            if ((n.value.charCodeAt(0) || 0) < 129) return T.call();
            h ? j() : B();
          }),
            r.addListener(n, "keydown", function(e) {
              T.schedule(50);
            });
        }
        var C = function(e) {
            l
              ? (l = !1)
              : E(n)
              ? (t.selectAll(), b())
              : k && b(t.selection.isEmpty());
          },
          k = null;
        (this.setInputHandler = function(e) {
          k = e;
        }),
          (this.getInputHandler = function() {
            return k;
          });
        var L = !1,
          A = function(e) {
            k && ((e = k(e)), (k = null)),
              c
                ? (b(), e && t.onPaste(e), (c = !1))
                : e == f.charAt(0)
                ? L
                  ? t.execCommand("del", { source: "ace" })
                  : t.execCommand("backspace", { source: "ace" })
                : (e.substring(0, 2) == f
                    ? (e = e.substr(2))
                    : e.charAt(0) == f.charAt(0)
                    ? (e = e.substr(1))
                    : e.charAt(e.length - 1) == f.charAt(0) &&
                      (e = e.slice(0, -1)),
                  e.charAt(e.length - 1) == f.charAt(0) && (e = e.slice(0, -1)),
                  e && t.onTextInput(e)),
              L && (L = !1);
          },
          O = function(e) {
            if (h) return;
            var t = n.value;
            A(t), w();
          },
          M = function(e, t, n) {
            var r = e.clipboardData || window.clipboardData;
            if (!r || u) return;
            var i = a || n ? "Text" : "text/plain";
            try {
              return t ? r.setData(i, t) !== !1 : r.getData(i);
            } catch (e) {
              if (!n) return M(e, t, !0);
            }
          },
          _ = function(e, i) {
            var s = t.getCopyText();
            if (!s) return r.preventDefault(e);
            M(e, s)
              ? (i ? t.onCut() : t.onCopy(), r.preventDefault(e))
              : ((l = !0),
                (n.value = s),
                n.select(),
                setTimeout(function() {
                  (l = !1), w(), b(), i ? t.onCut() : t.onCopy();
                }));
          },
          D = function(e) {
            _(e, !0);
          },
          P = function(e) {
            _(e, !1);
          },
          H = function(e) {
            var s = M(e);
            typeof s == "string"
              ? (s && t.onPaste(s, e),
                i.isIE && setTimeout(b),
                r.preventDefault(e))
              : ((n.value = ""), (c = !0));
          };
        r.addCommandKeyListener(n, t.onCommandKey.bind(t)),
          r.addListener(n, "select", C),
          r.addListener(n, "input", O),
          r.addListener(n, "cut", D),
          r.addListener(n, "copy", P),
          r.addListener(n, "paste", H),
          (!("oncut" in n) || !("oncopy" in n) || !("onpaste" in n)) &&
            r.addListener(e, "keydown", function(e) {
              if ((i.isMac && !e.metaKey) || !e.ctrlKey) return;
              switch (e.keyCode) {
                case 67:
                  P(e);
                  break;
                case 86:
                  H(e);
                  break;
                case 88:
                  D(e);
              }
            });
        var B = function(e) {
            if (h || !t.onCompositionStart || t.$readOnly) return;
            (h = {}),
              (h.canUndo = t.session.$undoManager),
              t.onCompositionStart(),
              setTimeout(j, 0),
              t.on("mousedown", F),
              h.canUndo &&
                !t.selection.isEmpty() &&
                (t.insert(""),
                t.session.markUndoGroup(),
                t.selection.clearSelection()),
              t.session.markUndoGroup();
          },
          j = function() {
            if (!h || !t.onCompositionUpdate || t.$readOnly) return;
            var e = n.value.replace(/\x01/g, "");
            if (h.lastValue === e) return;
            t.onCompositionUpdate(e),
              h.lastValue && t.undo(),
              h.canUndo && (h.lastValue = e);
            if (h.lastValue) {
              var r = t.selection.getRange();
              t.insert(h.lastValue),
                t.session.markUndoGroup(),
                (h.range = t.selection.getRange()),
                t.selection.setRange(r),
                t.selection.clearSelection();
            }
          },
          F = function(e) {
            if (!t.onCompositionEnd || t.$readOnly) return;
            var r = h;
            h = !1;
            var i = setTimeout(function() {
              i = null;
              var e = n.value.replace(/\x01/g, "");
              if (h) return;
              e == r.lastValue ? w() : !r.lastValue && e && (w(), A(e));
            });
            (k = function(n) {
              return (
                i && clearTimeout(i),
                (n = n.replace(/\x01/g, "")),
                n == r.lastValue ? "" : (r.lastValue && i && t.undo(), n)
              );
            }),
              t.onCompositionEnd(),
              t.removeListener("mousedown", F),
              e.type == "compositionend" &&
                r.range &&
                t.selection.setRange(r.range);
          },
          I = o.delayedCall(j, 50);
        r.addListener(n, "compositionstart", B),
          i.isGecko
            ? r.addListener(n, "text", function() {
                I.schedule();
              })
            : (r.addListener(n, "keyup", function() {
                I.schedule();
              }),
              r.addListener(n, "keydown", function() {
                I.schedule();
              })),
          r.addListener(n, "compositionend", F),
          (this.getElement = function() {
            return n;
          }),
          (this.setReadOnly = function(e) {
            n.readOnly = e;
          }),
          (this.onContextMenu = function(e) {
            (L = !0),
              b(t.selection.isEmpty()),
              t._emit("nativecontextmenu", { target: t, domEvent: e }),
              this.moveToMouse(e, !0);
          }),
          (this.moveToMouse = function(e, o) {
            if (!o && i.isOldIE) return;
            p || (p = n.style.cssText),
              (n.style.cssText =
                (o ? "z-index:100000;" : "") +
                "height:" +
                n.style.height +
                ";" +
                (i.isIE ? "opacity:0.1;" : ""));
            var u = t.container.getBoundingClientRect(),
              a = s.computedStyle(t.container),
              f = u.top + (parseInt(a.borderTopWidth) || 0),
              l = u.left + (parseInt(u.borderLeftWidth) || 0),
              c = u.bottom - f - n.clientHeight - 2,
              h = function(e) {
                (n.style.left = e.clientX - l - 2 + "px"),
                  (n.style.top = Math.min(e.clientY - f - 2, c) + "px");
              };
            h(e);
            if (e.type != "mousedown") return;
            t.renderer.$keepTextAreaAtCursor &&
              (t.renderer.$keepTextAreaAtCursor = null),
              clearTimeout(q),
              i.isWin && !i.isOldIE && r.capture(t.container, h, R);
          }),
          (this.onContextMenuClose = R);
        var q,
          U = function(e) {
            t.textInput.onContextMenu(e), R();
          };
        r.addListener(n, "mouseup", U),
          r.addListener(n, "mousedown", function(e) {
            e.preventDefault(), R();
          }),
          r.addListener(t.renderer.scroller, "contextmenu", U),
          r.addListener(n, "contextmenu", U);
      };
    t.TextInput = f;
  }),
  define("ace/mouse/default_handlers", [
    "require",
    "exports",
    "module",
    "ace/lib/dom",
    "ace/lib/event",
    "ace/lib/useragent"
  ], function(e, t, n) {
    "use strict";
    function u(e) {
      e.$clickSelection = null;
      var t = e.editor;
      t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)),
        t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)),
        t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)),
        t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)),
        t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e)),
        t.setDefaultHandler("touchmove", this.onTouchMove.bind(e));
      var n = [
        "select",
        "startSelect",
        "selectEnd",
        "selectAllEnd",
        "selectByWordsEnd",
        "selectByLinesEnd",
        "dragWait",
        "dragWaitEnd",
        "focusWait"
      ];
      n.forEach(function(t) {
        e[t] = this[t];
      }, this),
        (e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange")),
        (e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange"));
    }
    function a(e, t, n, r) {
      return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2));
    }
    function f(e, t) {
      if (e.start.row == e.end.row)
        var n = 2 * t.column - e.start.column - e.end.column;
      else if (e.start.row == e.end.row - 1 && !e.start.column && !e.end.column)
        var n = t.column - 4;
      else var n = 2 * t.row - e.start.row - e.end.row;
      return n < 0
        ? { cursor: e.start, anchor: e.end }
        : { cursor: e.end, anchor: e.start };
    }
    var r = e("../lib/dom"),
      i = e("../lib/event"),
      s = e("../lib/useragent"),
      o = 0;
    (function() {
      (this.onMouseDown = function(e) {
        var t = e.inSelection(),
          n = e.getDocumentPosition();
        this.mousedownEvent = e;
        var r = this.editor,
          i = e.getButton();
        if (i !== 0) {
          var s = r.getSelectionRange(),
            o = s.isEmpty();
          r.$blockScrolling++,
            (o || i == 1) && r.selection.moveToPosition(n),
            r.$blockScrolling--,
            i == 2 && r.textInput.onContextMenu(e.domEvent);
          return;
        }
        this.mousedownEvent.time = Date.now();
        if (t && !r.isFocused()) {
          r.focus();
          if (
            this.$focusTimout &&
            !this.$clickSelection &&
            !r.inMultiSelectMode
          ) {
            this.setState("focusWait"), this.captureMouse(e);
            return;
          }
        }
        return (
          this.captureMouse(e),
          this.startSelect(n, e.domEvent._clicks > 1),
          e.preventDefault()
        );
      }),
        (this.startSelect = function(e, t) {
          e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
          var n = this.editor;
          n.$blockScrolling++,
            this.mousedownEvent.getShiftKey()
              ? n.selection.selectToPosition(e)
              : t || n.selection.moveToPosition(e),
            t || this.select(),
            n.renderer.scroller.setCapture && n.renderer.scroller.setCapture(),
            n.setStyle("ace_selecting"),
            this.setState("select"),
            n.$blockScrolling--;
        }),
        (this.select = function() {
          var e,
            t = this.editor,
            n = t.renderer.screenToTextCoordinates(this.x, this.y);
          t.$blockScrolling++;
          if (this.$clickSelection) {
            var r = this.$clickSelection.comparePoint(n);
            if (r == -1) e = this.$clickSelection.end;
            else if (r == 1) e = this.$clickSelection.start;
            else {
              var i = f(this.$clickSelection, n);
              (n = i.cursor), (e = i.anchor);
            }
            t.selection.setSelectionAnchor(e.row, e.column);
          }
          t.selection.selectToPosition(n),
            t.$blockScrolling--,
            t.renderer.scrollCursorIntoView();
        }),
        (this.extendSelectionBy = function(e) {
          var t,
            n = this.editor,
            r = n.renderer.screenToTextCoordinates(this.x, this.y),
            i = n.selection[e](r.row, r.column);
          n.$blockScrolling++;
          if (this.$clickSelection) {
            var s = this.$clickSelection.comparePoint(i.start),
              o = this.$clickSelection.comparePoint(i.end);
            if (s == -1 && o <= 0) {
              t = this.$clickSelection.end;
              if (i.end.row != r.row || i.end.column != r.column) r = i.start;
            } else if (o == 1 && s >= 0) {
              t = this.$clickSelection.start;
              if (i.start.row != r.row || i.start.column != r.column) r = i.end;
            } else if (s == -1 && o == 1) (r = i.end), (t = i.start);
            else {
              var u = f(this.$clickSelection, r);
              (r = u.cursor), (t = u.anchor);
            }
            n.selection.setSelectionAnchor(t.row, t.column);
          }
          n.selection.selectToPosition(r),
            n.$blockScrolling--,
            n.renderer.scrollCursorIntoView();
        }),
        (this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
          (this.$clickSelection = null),
            this.editor.unsetStyle("ace_selecting"),
            this.editor.renderer.scroller.releaseCapture &&
              this.editor.renderer.scroller.releaseCapture();
        }),
        (this.focusWait = function() {
          var e = a(
              this.mousedownEvent.x,
              this.mousedownEvent.y,
              this.x,
              this.y
            ),
            t = Date.now();
          (e > o || t - this.mousedownEvent.time > this.$focusTimout) &&
            this.startSelect(this.mousedownEvent.getDocumentPosition());
        }),
        (this.onDoubleClick = function(e) {
          var t = e.getDocumentPosition(),
            n = this.editor,
            r = n.session,
            i = r.getBracketRange(t);
          i
            ? (i.isEmpty() && (i.start.column--, i.end.column++),
              this.setState("select"))
            : ((i = n.selection.getWordRange(t.row, t.column)),
              this.setState("selectByWords")),
            (this.$clickSelection = i),
            this.select();
        }),
        (this.onTripleClick = function(e) {
          var t = e.getDocumentPosition(),
            n = this.editor;
          this.setState("selectByLines");
          var r = n.getSelectionRange();
          r.isMultiLine() && r.contains(t.row, t.column)
            ? ((this.$clickSelection = n.selection.getLineRange(r.start.row)),
              (this.$clickSelection.end = n.selection.getLineRange(
                r.end.row
              ).end))
            : (this.$clickSelection = n.selection.getLineRange(t.row)),
            this.select();
        }),
        (this.onQuadClick = function(e) {
          var t = this.editor;
          t.selectAll(),
            (this.$clickSelection = t.getSelectionRange()),
            this.setState("selectAll");
        }),
        (this.onMouseWheel = function(e) {
          if (e.getAccelKey()) return;
          e.getShiftKey() &&
            e.wheelY &&
            !e.wheelX &&
            ((e.wheelX = e.wheelY), (e.wheelY = 0));
          var t = e.domEvent.timeStamp,
            n = t - (this.$lastScrollTime || 0),
            r = this.editor,
            i = r.renderer.isScrollableBy(
              e.wheelX * e.speed,
              e.wheelY * e.speed
            );
          if (i || n < 200)
            return (
              (this.$lastScrollTime = t),
              r.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed),
              e.stop()
            );
        }),
        (this.onTouchMove = function(e) {
          var t = e.domEvent.timeStamp,
            n = t - (this.$lastScrollTime || 0),
            r = this.editor,
            i = r.renderer.isScrollableBy(
              e.wheelX * e.speed,
              e.wheelY * e.speed
            );
          if (i || n < 200)
            return (
              (this.$lastScrollTime = t),
              r.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed),
              e.stop()
            );
        });
    }.call(u.prototype),
      (t.DefaultHandlers = u));
  }),
  define("ace/tooltip", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/lib/dom"
  ], function(e, t, n) {
    "use strict";
    function s(e) {
      (this.isOpen = !1), (this.$element = null), (this.$parentNode = e);
    }
    var r = e("./lib/oop"),
      i = e("./lib/dom");
    (function() {
      (this.$init = function() {
        return (
          (this.$element = i.createElement("div")),
          (this.$element.className = "ace_tooltip"),
          (this.$element.style.display = "none"),
          this.$parentNode.appendChild(this.$element),
          this.$element
        );
      }),
        (this.getElement = function() {
          return this.$element || this.$init();
        }),
        (this.setText = function(e) {
          i.setInnerText(this.getElement(), e);
        }),
        (this.setHtml = function(e) {
          this.getElement().innerHTML = e;
        }),
        (this.setPosition = function(e, t) {
          (this.getElement().style.left = e + "px"),
            (this.getElement().style.top = t + "px");
        }),
        (this.setClassName = function