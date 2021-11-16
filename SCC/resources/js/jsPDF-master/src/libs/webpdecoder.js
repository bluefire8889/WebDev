function WebPDecoder(imageData) {
  /** @license
   * Copyright 2011 Google Inc.
   *
   * This code is licensed under the same terms as WebM:
   *  Software License Agreement:  http://www.webmproject.org/license/software/
   *  Additional IP Rights Grant:  http://www.webmproject.org/license/additional/
   * -----------------------------------------------------------------------------
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
   * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
   * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
   * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * -----------------------------------------------------------------------------
   *
   * Copyright 2011-2017 Dominik Homberger
   * Libwebp Javascript / libwebpjs - the libwebp implementation in javascript (v0.6.0)
   *
   * Author: Dominik Homberger (dominik.homberger@gmail.com)
   */

  var self = this;
  var UpsampleRgbLinePair,
    UpsampleBgrLinePair,
    UpsampleRgbaLinePair,
    UpsampleBgraLinePair,
    UpsampleArgbLinePair,
    UpsampleArgbLinePair,
    UpsampleRgba4444LinePair,
    UpsampleRgb565LinePair;

  function x(F) {
    if (!F) throw Error("assert :P");
  }
  function fa(F, L, J) {
    for (var H = 0; 4 > H; H++) if (F[L + H] != J.charCodeAt(H)) return !0;
    return !1;
  }
  function I(F, L, J, H, Z) {
    for (var O = 0; O < Z; O++) F[L + O] = J[H + O];
  }
  function M(F, L, J, H) {
    for (var Z = 0; Z < H; Z++) F[L + Z] = J;
  }
  function V(F) {
    return new Int32Array(F);
  }
  function wa(F, L) {
    for (var J = [], H = 0; H < F; H++) J.push(new L());
    return J;
  }
  function wb() {
    function F(J, H, Z) {
      for (var O = Z[H], L = 0; L < O; L++) {
        J.push(Z.length > H + 1 ? [] : 0);
        if (Z.length < H + 1) break;
        F(J[L], H + 1, Z);
      }
    }
    var L = [];
    F(L, 0, [3, 11]);
    return L;
  }
  function Ed(F, L) {
    function J(H, O, F) {
      for (var Z = F[O], ma = 0; ma < Z; ma++) {
        H.push(F.length > O + 1 ? [] : new L());
        if (F.length < O + 1) break;
        J(H[ma], O + 1, F);
      }
    }
    var H = [];
    J(H, 0, F);
    return H;
  }
  WebPDecoder = function() {
    var self = this;
    function F() {
      V(55);
    }
    function L(a, b) {
      for (var c = (1 << (b - 1)) >>> 0; a & c; ) c >>>= 1;
      return c ? (a & (c - 1)) + c : a;
    }
    function J(a, b, c, d, e) {
      x(!(d % c));
      do (d -= c), (a[b + d] = e);
      while (0 < d);
    }
    function H(a, b, c, d, e, f) {
      var g = b,
        h = 1 << c,
        k,
        l,
        m = V(16),
        n = V(16);
      x(0 != e);
      x(null != d);
      x(null != a);
      x(0 < c);
      for (l = 0; l < e; ++l) {
        if (15 < d[l]) return 0;
        ++m[d[l]];
      }
      if (m[0] == e) return 0;
      n[1] = 0;
      for (k = 1; 15 > k; ++k) {
        if (m[k] > 1 << k) return 0;
        n[k + 1] = n[k] + m[k];
      }
      for (l = 0; l < e; ++l) (k = d[l]), 0 < d[l] && (f[n[k]++] = l);
      if (1 == n[15])
        return (d = new O()), (d.g = 0), (d.value = f[0]), J(a, g, 1, h, d), h;
      var r = -1,
        q = h - 1,
        t = 0,
        v = 1,
        p = 1,
        u,
        w = 1 << c;
      l = 0;
      k = 1;
      for (e = 2; k <= c; ++k, e <<= 1) {
        p <<= 1;
        v += p;
        p -= m[k];
        if (0 > p) return 0;
        for (; 0 < m[k]; --m[k])
          (d = new O()),
            (d.g = k),
            (d.value = f[l++]),
            J(a, g + t, e, w, d),
            (t = L(t, k));
      }
      k = c + 1;
      for (e = 2; 15 >= k; ++k, e <<= 1) {
        p <<= 1;
        v += p;
        p -= m[k];
        if (0 > p) return 0;
        for (; 0 < m[k]; --m[k]) {
          d = new O();
          if ((t & q) != r) {
            g += w;
            r = k;
            for (u = 1 << (r - c); 15 > r; ) {
              u -= m[r];
              if (0 >= u) break;
              ++r;
              u <<= 1;
            }
            u = r - c;
            w = 1 << u;
            h += w;
            r = t & q;
            a[b + r].g = u + c;
            a[b + r].value = g - b - r;
          }
          d.g = k - c;
          d.value = f[l++];
          J(a, g + (t >> c), e, w, d);
          t = L(t, k);
        }
      }
      return v != 2 * n[15] - 1 ? 0 : h;
    }
    function Z(a, b, c, d, e) {
      x(2328 >= e);
      if (512 >= e) var f = V(512);
      else if (((f = V(e)), null == f)) return 0;
      return H(a, b, c, d, e, f);
    }
    function O() {
      this.value = this.g = 0;
    }
    function Fd() {
      this.value = this.g = 0;
    }
    function Ub() {
      this.G = wa(5, O);
      this.H = V(5);
      this.jc = this.Qb = this.qb = this.nd = 0;
      this.pd = wa(xb, Fd);
    }
    function ma(a, b, c, d) {
      x(null != a);
      x(null != b);
      x(2147483648 > d);
      a.Ca = 254;
      a.I = 0;
      a.b = -8;
      a.Ka = 0;
      a.oa = b;
      a.pa = c;
      a.Jd = b;
      a.Yc = c + d;
      a.Zc = 4 <= d ? c + d - 4 + 1 : c;
      Qa(a);
    }
    function na(a, b) {
      for (var c = 0; 0 < b--; ) c |= K(a, 128) << b;
      return c;
    }
    function ca(a, b) {
      var c = na(a, b);
      return G(a) ? -c : c;
    }
    function cb(a, b, c, d) {
      var e,
        f = 0;
      x(null != a);
      x(null != b);
      x(4294967288 > d);
      a.Sb = d;
      a.Ra = 0;
      a.u = 0;
      a.h = 0;
      4 < d && (d = 4);
      for (e = 0; e < d; ++e) f += b[c + e] << (8 * e);
      a.Ra = f;
      a.bb = d;
      a.oa = b;
      a.pa = c;
    }
    function Vb(a) {
      for (; 8 <= a.u && a.bb < a.Sb; )
        (a.Ra >>>= 8),
          (a.Ra += (a.oa[a.pa + a.bb] << (ob - 8)) >>> 0),
          ++a.bb,
          (a.u -= 8);
      db(a) && ((a.h = 1), (a.u = 0));
    }
    function D(a, b) {
      x(0 <= b);
      if (!a.h && b <= Gd) {
        var c = pb(a) & Hd[b];
        a.u += b;
        Vb(a);
        return c;
      }
      a.h = 1;
      return (a.u = 0);
    }
    function Wb() {
      this.b = this.Ca = this.I = 0;
      this.oa = [];
      this.pa = 0;
      this.Jd = [];
      this.Yc = 0;
      this.Zc = [];
      this.Ka = 0;
    }
    function Ra() {
      this.Ra = 0;
      this.oa = [];
      this.h = this.u = this.bb = this.Sb = this.pa = 0;
    }
    function pb(a) {
      return (a.Ra >>> (a.u & (ob - 1))) >>> 0;
    }
    function db(a) {
      x(a.bb <= a.Sb);
      return a.h || (a.bb == a.Sb && a.u > ob);
    }
    function qb(a, b) {
      a.u = b;
      a.h = db(a);
    }
    function Sa(a) {
      a.u >= Xb && (x(a.u >= Xb), Vb(a));
    }
    function Qa(a) {
      x(null != a && null != a.oa);
      a.pa < a.Zc
        ? ((a.I = (a.oa[a.pa++] | (a.I << 8)) >>> 0), (a.b += 8))
        : (x(null != a && null != a.oa),
          a.pa < a.Yc
            ? ((a.b += 8), (a.I = a.oa[a.pa++] | (a.I << 8)))
            : a.Ka
            ? (a.b = 0)
            : ((a.I <<= 8), (a.b += 8), (a.Ka = 1)));
    }
    function G(a) {
      return na(a, 1);
    }
    function K(a, b) {
      var c = a.Ca;
      0 > a.b && Qa(a);
      var d = a.b,
        e = (c * b) >>> 8,
        f = (a.I >>> d > e) + 0;
      f ? ((c -= e), (a.I -= ((e + 1) << d) >>> 0)) : (c = e + 1);
      d = c;
      for (e = 0; 256 <= d; ) (e += 8), (d >>= 8);
      d = 7 ^ (e + Id[d]);
      a.b -= d;
      a.Ca = (c << d) - 1;
      return f;
    }
    function ra(a, b, c) {
      a[b + 0] = (c >> 24) & 255;
      a[b + 1] = (c >> 16) & 255;
      a[b + 2] = (c >> 8) & 255;
      a[b + 3] = (c >> 0) & 255;
    }
    function Ta(a, b) {
      return (a[b + 0] << 0) | (a[b + 1] << 8);
    }
    function Yb(a, b) {
      return Ta(a, b) | (a[b + 2] << 16);
    }
    function Ha(a, b) {
      return Ta(a, b) | (Ta(a, b + 2) << 16);
    }
    function Zb(a, b) {
      var c = 1 << b;
      x(null != a);
      x(0 < b);
      a.X = V(c);
      if (null == a.X) return 0;
      a.Mb = 32 - b;
      a.Xa = b;
      return 1;
    }
    function $b(a, b) {
      x(null != a);
      x(null != b);
      x(a.Xa == b.Xa);
      I(b.X, 0, a.X, 0, 1 << b.Xa);
    }
    function ac() {
      this.X = [];
      this.Xa = this.Mb = 0;
    }
    function bc(a, b, c, d) {
      x(null != c);
      x(null != d);
      var e = c[0],
        f = d[0];
      0 == e && (e = (a * f + b / 2) / b);
      0 == f && (f = (b * e + a / 2) / a);
      if (0 >= e || 0 >= f) return 0;
      c[0] = e;
      d[0] = f;
      return 1;
    }
    function xa(a, b) {
      return (a + (1 << b) - 1) >>> b;
    }
    function yb(a, b) {
      return (
        (((((a & 4278255360) + (b & 4278255360)) >>> 0) & 4278255360) +
          ((((a & 16711935) + (b & 16711935)) >>> 0) & 16711935)) >>>
        0
      );
    }
    function X(a, b) {
      self[b] = function(b, d, e, f, g, h, k) {
        var c;
        for (c = 0; c < g; ++c) {
          var m = self[a](h[k + c - 1], e, f + c);
          h[k + c] = yb(b[d + c], m);
        }
      };
    }
    function Jd() {
      this.ud = this.hd = this.jd = 0;
    }
    function aa(a, b) {
      return ((((a ^ b) & 4278124286) >>> 1) + (a & b)) >>> 0;
    }
    function sa(a) {
      if (0 <= a && 256 > a) return a;
      if (0 > a) return 0;
      if (255 < a) return 255;
    }
    function eb(a, b) {
      return sa(a + ((a - b + 0.5) >> 1));
    }
    function Ia(a, b, c) {
      return Math.abs(b - c) - Math.abs(a - c);
    }
    function cc(a, b, c, d, e, f, g) {
      d = f[g - 1];
      for (c = 0; c < e; ++c) f[g + c] = d = yb(a[b + c], d);
    }
    function Kd(a, b, c, d, e) {
      var f;
      for (f = 0; f < c; ++f) {
        var g = a[b + f],
          h = (g >> 8) & 255,
          k = g & 16711935,
          k = k + ((h << 16) + h),
          k = k & 16711935;
        d[e + f] = ((g & 4278255360) + k) >>> 0;
      }
    }
    function dc(a, b) {
      b.jd = (a >> 0) & 255;
      b.hd = (a >> 8) & 255;
      b.ud = (a >> 16) & 255;
    }
    function Ld(a, b, c, d, e, f) {
      var g;
      for (g = 0; g < d; ++g) {
        var h = b[c + g],
          k = h >>> 8,
          l = h >>> 16,
          m = h,
          l = l + ((((a.jd << 24) >> 24) * ((k << 24) >> 24)) >>> 5),
          l = l & 255,
          m = m + ((((a.hd << 24) >> 24) * ((k << 24) >> 24)) >>> 5),
          m = m + ((((a.ud << 24) >> 24) * ((l << 24) >> 24)) >>> 5),
          m = m & 255;
        e[f + g] = (h & 4278255360) + (l << 16) + m;
      }
    }
    function ec(a, b, c, d, e) {
      self[b] = function(a, b, c, k, l, m, n, r, q) {
        for (k = n; k < r; ++k)
          for (n = 0; n < q; ++n) l[m++] = e(c[d(a[b++])]);
      };
      self[a] = function(a, b, h, k, l, m, n) {
        var f = 8 >> a.b,
          g = a.Ea,
          t = a.K[0],
          v = a.w;
        if (8 > f)
          for (a = (1 << a.b) - 1, v = (1 << f) - 1; b < h; ++b) {
            var p = 0,
              u;
            for (u = 0; u < g; ++u)
              u & a || (p = d(k[l++])), (m[n++] = e(t[p & v])), (p >>= f);
          }
        else self["VP8LMapColor" + c](k, l, t, v, m, n, b, h, g);
      };
    }
    function Md(a, b, c, d, e) {
      for (c = b + c; b < c; ) {
        var f = a[b++];
        d[e++] = (f >> 16) & 255;
        d[e++] = (f >> 8) & 255;
        d[e++] = (f >> 0) & 255;
      }
    }
    function Nd(a, b, c, d, e) {
      for (c = b + c; b < c; ) {
        var f = a[b++];
        d[e++] = (f >> 16) & 255;
        d[e++] = (f >> 8) & 255;
        d[e++] = (f >> 0) & 255;
        d[e++] = (f >> 24) & 255;
      }
    }
    function Od(a, b, c, d, e) {
      for (c = b + c; b < c; ) {
        var f = a[b++],
          g = ((f >> 16) & 240) | ((f >> 12) & 15),
          f = ((f >> 0) & 240) | ((f >> 28) & 15);
        d[e++] = g;
        d[e++] = f;
      }
    }
    function Pd(a, b, c, d, e) {
      for (c = b + c; b < c; ) {
        var f = a[b++],
          g = ((f >> 16) & 248) | ((f >> 13) & 7),
          f = ((f >> 5) & 224) | ((f >> 3) & 31);
        d[e++] = g;
        d[e++] = f;
      }
    }
    function Qd(a, b, c, d, e) {
      for (c = b + c; b < c; ) {
        var f = a[b++];
        d[e++] = (f >> 0) & 255;
        d[e++] = (f >> 8) & 255;
        d[e++] = (f >> 16) & 255;
      }
    }
    function fb(a, b, c, d, e, f) {
      if (0 == f)
        for (c = b + c; b < c; )
          (f = a[b++]),
            ra(
              d,
              ((f[0] >> 24) |
                ((f[1] >> 8) & 65280) |
                ((f[2] << 8) & 16711680) |
                (f[3] << 24)) >>>
                0
            ),
            (e += 32);
      else I(d, e, a, b, c);
    }
    function gb(a, b) {
      self[b][0] = self[a + "0"];
      self[b][1] = self[a + "1"];
      self[b][2] = self[a + "2"];
      self[b][3] = self[a + "3"];
      self[b][4] = self[a + "4"];
      self[b][5] = self[a + "5"];
      self[b][6] = self[a + "6"];
      self[b][7] = self[a + "7"];
      self[b][8] = self[a + "8"];
      self[b][9] = self[a + "9"];
      self[b][10] = self[a + "10"];
      self[b][11] = self[a + "11"];
      self[b][12] = self[a + "12"];
      self[b][13] = self[a + "13"];
      self[b][14] = self[a + "0"];
      self[b][15] = self[a + "0"];
    }
    function hb(a) {
      return a == zb || a == Ab || a == Ja || a == Bb;
    }
    function Rd() {
      this.eb = [];
      this.size = this.A = this.fb = 0;
    }
    function Sd() {
      this.y = [];
      this.f = [];
      this.ea = [];
      this.F = [];
      this.Tc = this.Ed = this.Cd = this.Fd = this.lb = this.Db = this.Ab = this.fa = this.J = this.W = this.N = this.O = 0;
    }
    function Cb() {
      this.Rd = this.height = this.width = this.S = 0;
      this.f = {};
      this.f.RGBA = new Rd();
      this.f.kb = new Sd();
      this.sd = null;
    }
    function Td() {
      this.width = [0];
      this.height = [0];
      this.Pd = [0];
      this.Qd = [0];
      this.format = [0];
    }
    function Ud() {
      this.Id = this.fd = this.Md = this.hb = this.ib = this.da = this.bd = this.cd = this.j = this.v = this.Da = this.Sd = this.ob = 0;
    }
    function Vd(a) {
      alert("todo:WebPSamplerProcessPlane");
      return a.T;
    }
    function Wd(a, b) {
      var c = a.T,
        d = b.ba.f.RGBA,
        e = d.eb,
        f = d.fb + a.ka * d.A,
        g = P[b.ba.S],
        h = a.y,
        k = a.O,
        l = a.f,
        m = a.N,
        n = a.ea,
        r = a.W,
        q = b.cc,
        t = b.dc,
        v = b.Mc,
        p = b.Nc,
        u = a.ka,
        w = a.ka + a.T,
        y = a.U,
        A = (y + 1) >> 1;
      0 == u
        ? g(h, k, null, null, l, m, n, r, l, m, n, r, e, f, null, null, y)
        : (g(b.ec, b.fc, h, k, q, t, v, p, l, m, n, r, e, f - d.A, e, f, y),
          ++c);
      for (; u + 2 < w; u += 2)
        (q = l),
          (t = m),
          (v = n),
          (p = r),
          (m += a.Rc),
          (r += a.Rc),
          (f += 2 * d.A),
          (k += 2 * a.fa),
          g(h, k - a.fa, h, k, q, t, v, p, l, m, n, r, e, f - d.A, e, f, y);
      k += a.fa;
      a.j + w < a.o
        ? (I(b.ec, b.fc, h, k, y),
          I(b.cc, b.dc, l, m, A),
          I(b.Mc, b.Nc, n, r, A),
          c--)
        : w & 1 ||
          g(
            h,
            k,
            null,
            null,
            l,
            m,
            n,
            r,
            l,
            m,
            n,
            r,
            e,
            f + d.A,
            null,
            null,
            y
          );
      return c;
    }
    function Xd(a, b, c) {
      var d = a.F,
        e = [a.J];
      if (null != d) {
        var f = a.U,
          g = b.ba.S,
          h = g == ya || g == Ja;
        b = b.ba.f.RGBA;
        var k = [0],
          l = a.ka;
        k[0] = a.T;
        a.Kb &&
          (0 == l ? --k[0] : (--l, (e[0] -= a.width)),
          a.j + a.ka + a.T == a.o && (k[0] = a.o - a.j - l));
        var m = b.eb,
          l = b.fb + l * b.A;
        a = fc(d, e[0], a.width, f, k, m, l + (h ? 0 : 3), b.A);
        x(c == k);
        a && hb(g) && za(m, l, h, f, k, b.A);
      }
      return 0;
    }
    function gc(a) {
      var b = a.ma,
        c = b.ba.S,
        d = 11 > c,
        e = c == Ua || c == Va || c == ya || c == Db || 12 == c || hb(c);
      b.memory = null;
      b.Ib = null;
      b.Jb = null;
      b.Nd = null;
      if (!hc(b.Oa, a, e ? 11 : 12)) return 0;
      e && hb(c) && ic();
      if (a.da) alert("todo:use_scaling");
      else {
        if (d) {
          if (((b.Ib = Vd), a.Kb)) {
            c = (a.U + 1) >> 1;
            b.memory = V(a.U + 2 * c);
            if (null == b.memory) return 0;
            b.ec = b.memory;
            b.fc = 0;
            b.cc = b.ec;
            b.dc = b.fc + a.U;
            b.Mc = b.cc;
            b.Nc = b.dc + c;
            b.Ib = Wd;
            ic();
          }
        } else alert("todo:EmitYUV");
        e && ((b.Jb = Xd), d && Aa());
      }
      if (d && !jc) {
        for (a = 0; 256 > a; ++a)
          (Yd[a] = (89858 * (a - 128) + Ba) >> Wa),
            (Zd[a] = -22014 * (a - 128) + Ba),
            ($d[a] = -45773 * (a - 128)),
            (ae[a] = (113618 * (a - 128) + Ba) >> Wa);
        for (a = ta; a < Eb; ++a)
          (b = (76283 * (a - 16) + Ba) >> Wa),
            (be[a - ta] = ga(b, 255)),
            (ce[a - ta] = ga((b + 8) >> 4, 15));
        jc = 1;
      }
      return 1;
    }
    function kc(a) {
      var b = a.ma,
        c = a.U,
        d = a.T;
      x(!(a.ka & 1));
      if (0 >= c || 0 >= d) return 0;
      c = b.Ib(a, b);
      null != b.Jb && b.Jb(a, b, c);
      b.Dc += c;
      return 1;
    }
    function lc(a) {
      a.ma.memory = null;
    }
    function mc(a, b, c, d) {
      if (47 != D(a, 8)) return 0;
      b[0] = D(a, 14) + 1;
      c[0] = D(a, 14) + 1;
      d[0] = D(a, 1);
      return 0 != D(a, 3) ? 0 : !a.h;
    }
    function ib(a, b) {
      if (4 > a) return a + 1;
      var c = (a - 2) >> 1;
      return ((2 + (a & 1)) << c) + D(b, c) + 1;
    }
    function nc(a, b) {
      if (120 < b) return b - 120;
      var c = de[b - 1],
        c = (c >> 4) * a + (8 - (c & 15));
      return 1 <= c ? c : 1;
    }
    function ua(a, b, c) {
      var d = pb(c);
      b += d & 255;
      var e = a[b].g - 8;
      0 < e &&
        (qb(c, c.u + 8),
        (d = pb(c)),
        (b += a[b].value),
        (b += d & ((1 << e) - 1)));
      qb(c, c.u + a[b].g);
      return a[b].value;
    }
    function ub(a, b, c) {
      c.g += a.g;
      c.value += (a.value << b) >>> 0;
      x(8 >= c.g);
      return a.g;
    }
    function ha(a, b, c) {
      var d = a.xc;
      b = 0 == d ? 0 : a.vc[a.md * (c >> d) + (b >> d)];
      x(b < a.Wb);
      return a.Ya[b];
    }
    function oc(a, b, c, d) {
      var e = a.ab,
        f = a.c * b,
        g = a.C;
      b = g + b;
      var h = c,
        k = d;
      d = a.Ta;
      for (c = a.Ua; 0 < e--; ) {
        var l = a.gc[e],
          m = g,
          n = b,
          r = h,
          q = k,
          k = d,
          h = c,
          t = l.Ea;
        x(m < n);
        x(n <= l.nc);
        switch (l.hc) {
          case 2:
            pc(r, q, (n - m) * t, k, h);
            break;
          case 0:
            var v = l,
              p = m,
              u = n,
              w = k,
              y = h,
              A = v.Ea;
            0 == p &&
              (ee(r, q, null, null, 1, w, y),
              cc(r, q + 1, 0, 0, A - 1, w, y + 1),
              (q += A),
              (y += A),
              ++p);
            for (
              var E = 1 << v.b,
                B = E - 1,
                C = xa(A, v.b),
                N = v.K,
                v = v.w + (p >> v.b) * C;
              p < u;

            ) {
              var z = N,
                Q = v,
                S = 1;
              for (fe(r, q, w, y - A, 1, w, y); S < A; ) {
                var K = qc[(z[Q++] >> 8) & 15],
                  D = (S & ~B) + E;
                D > A && (D = A);
                K(r, q + +S, w, y + S - A, D - S, w, y + S);
                S = D;
              }
              q += A;
              y += A;
              ++p;
              p & B || (v += C);
            }
            n != l.nc && I(k, h - t, k, h + (n - m - 1) * t, t);
            break;
          case 1:
            t = r;
            u = q;
            r = l.Ea;
            q = 1 << l.b;
            w = q - 1;
            y = r & ~w;
            A = r - y;
            p = xa(r, l.b);
            E = l.K;
            for (l = l.w + (m >> l.b) * p; m < n; ) {
              B = E;
              C = l;
              N = new Jd();
              v = u + y;
              for (z = u + r; u < v; )
                dc(B[C++], N), Fb(N, t, u, q, k, h), (u += q), (h += q);
              u < z &&
                (dc(B[C++], N), Fb(N, t, u, A, k, h), (u += A), (h += A));
              ++m;
              m & w || (l += p);
            }
            break;
          case 3:
            if (r == k && q == h && 0 < l.b) {
              y = (n - m) * xa(l.Ea, l.b);
              t = h + (n - m) * t - y;
              u = k;
              r = t;
              q = k;
              w = h;
              A = y;
              p = [];
              for (y = A - 1; 0 <= y; --y) p[y] = q[w + y];
              for (y = A - 1; 0 <= y; --y) u[r + y] = p[y];
              rc(l, m, n, k, t, k, h);
            } else rc(l, m, n, r, q, k, h);
        }
        h = d;
        k = c;
      }
      k != c && I(d, c, h, k, f);
    }
    function ge(a, b) {
      var c = a.V,
        d = a.Ba + a.c * a.C,
        e = b - a.C;
      x(b <= a.l.o);
      x(16 >= e);
      if (0 < e) {
        var f = a.l,
          g = a.Ta,
          h = a.Ua,
          k = f.width;
        oc(a, e, c, d);
        h = [h];
        c = a.C;
        d = b;
        e = h;
        x(c < d);
        x(f.v < f.va);
        d > f.o && (d = f.o);
        if (c < f.j) {
          var l = f.j - c,
            c = f.j;
          e[0] += l * k;
        }
        c >= d
          ? (c = 0)
          : ((e[0] += 4 * f.v),
            (f.ka = c - f.j),
            (f.U = f.va - f.v),
            (f.T = d - c),
            (c = 1));
        if (c) {
          h = h[0];
          c = a.ca;
          if (11 > c.S) {
            for (
              var m = c.f.RGBA,
                d = c.S,
                e = f.U,
                f = f.T,
                l = m.eb,
                n = m.A,
                r = f,
                m = m.fb + a.Ma * m.A;
              0 < r--;

            ) {
              var q = g,
                t = h,
                v = e,
                p = l,
                u = m;
              switch (d) {
                case Ca:
                  sc(q, t, v, p, u);
                  break;
                case Ua:
                  Gb(q, t, v, p, u);
                  break;
                case zb:
                  Gb(q, t, v, p, u);
                  za(p, u, 0, v, 1, 0);
                  break;
                case tc:
                  uc(q, t, v, p, u);
                  break;
                case Va:
                  fb(q, t, v, p, u, 1);
                  break;
                case Ab:
                  fb(q, t, v, p, u, 1);
                  za(p, u, 0, v, 1, 0);
                  break;
                case ya:
                  fb(q, t, v, p, u, 0);
                  break;
                case Ja:
                  fb(q, t, v, p, u, 0);
                  za(p, u, 1, v, 1, 0);
                  break;
                case Db:
                  Hb(q, t, v, p, u);
                  break;
                case Bb:
                  Hb(q, t, v, p, u);
                  vc(p, u, v, 1, 0);
                  break;
                case wc:
                  xc(q, t, v, p, u);
                  break;
                default:
                  x(0);
              }
              h += k;
              m += n;
            }
            a.Ma += f;
          } else alert("todo:EmitRescaledRowsYUVA");
          x(a.Ma <= c.height);
        }
      }
      a.C = b;
      x(a.C <= a.i);
    }
    function yc(a) {
      var b;
      if (0 < a.ua) return 0;
      for (b = 0; b < a.Wb; ++b) {
        var c = a.Ya[b].G,
          d = a.Ya[b].H;
        if (
          0 < c[1][d[1] + 0].g ||
          0 < c[2][d[2] + 0].g ||
          0 < c[3][d[3] + 0].g
        )
          return 0;
      }
      return 1;
    }
    function zc(a, b, c, d, e, f) {
      if (0 != a.Z) {
        var g = a.qd,
          h = a.rd;
        for (x(null != ia[a.Z]); b < c; ++b)
          ia[a.Z](g, h, d, e, d, e, f), (g = d), (h = e), (e += f);
        a.qd = g;
        a.rd = h;
      }
    }
    function Ib(a, b) {
      var c = a.l.ma,
        d = 0 == c.Z || 1 == c.Z ? a.l.j : a.C,
        d = a.C < d ? d : a.C;
      x(b <= a.l.o);
      if (b > d) {
        var e = a.l.width,
          f = c.ca,
          g = c.tb + e * d,
          h = a.V,
          k = a.Ba + a.c * d,
          l = a.gc;
        x(1 == a.ab);
        x(3 == l[0].hc);
        he(l[0], d, b, h, k, f, g);
        zc(c, d, b, f, g, e);
      }
      a.C = a.Ma = b;
    }
    function Jb(a, b, c, d, e, f, g) {
      var h = a.$ / d,
        k = a.$ % d,
        l = a.m,
        m = a.s,
        n = c + a.$,
        r = n;
      e = c + d * e;
      var q = c + d * f,
        t = 280 + m.ua,
        v = a.Pb ? h : 16777216,
        p = 0 < m.ua ? m.Wa : null,
        u = m.wc,
        w = n < q ? ha(m, k, h) : null;
      x(a.C < f);
      x(q <= e);
      var y = !1;
      a: for (;;) {
        for (; y || n < q; ) {
          var A = 0;
          if (h >= v) {
            var v = a,
              E = n - c;
            x(v.Pb);
            v.wd = v.m;
            v.xd = E;
            0 < v.s.ua && $b(v.s.Wa, v.s.vb);
            v = h + ie;
          }
          k & u || (w = ha(m, k, h));
          x(null != w);
          w.Qb && ((b[n] = w.qb), (y = !0));
          if (!y)
            if ((Sa(l), w.jc)) {
              var A = l,
                E = b,
                B = n,
                C = w.pd[pb(A) & (xb - 1)];
              x(w.jc);
              256 > C.g
                ? (qb(A, A.u + C.g), (E[B] = C.value), (A = 0))
                : (qb(A, A.u + C.g - 256), x(256 <= C.value), (A = C.value));
              0 == A && (y = !0);
            } else A = ua(w.G[0], w.H[0], l);
          if (l.h) break;
          if (y || 256 > A) {
            if (!y)
              if (w.nd) b[n] = (w.qb | (A << 8)) >>> 0;
              else {
                Sa(l);
                y = ua(w.G[1], w.H[1], l);
                Sa(l);
                E = ua(w.G[2], w.H[2], l);
                B = ua(w.G[3], w.H[3], l);
                if (l.h) break;
                b[n] = ((B << 24) | (y << 16) | (A << 8) | E) >>> 0;
              }
            y = !1;
            ++n;
            ++k;
            if (
              k >= d &&
              ((k = 0),
              ++h,
              null != g && h <= f && !(h % 16) && g(a, h),
              null != p)
            )
              for (; r < n; )
                (A = b[r++]),
                  (p.X[((506832829 * A) & 4294967295) >>> p.Mb] = A);
          } else if (280 > A) {
            A = ib(A - 256, l);
            E = ua(w.G[4], w.H[4], l);
            Sa(l);
            E = ib(E, l);
            E = nc(d, E);
            if (l.h) break;
            if (n - c < E || e - n < A) break a;
            else for (B = 0; B < A; ++B) b[n + B] = b[n + B - E];
            n += A;
            for (k += A; k >= d; )
              (k -= d), ++h, null != g && h <= f && !(h % 16) && g(a, h);
            x(n <= e);
            k & u && (w = ha(m, k, h));
            if (null != p)
              for (; r < n; )
                (A = b[r++]),
                  (p.X[((506832829 * A) & 4294967295) >>> p.Mb] = A);
          } else if (A < t) {
            y = A - 280;
            for (x(null != p); r < n; )
              (A = b[r++]), (p.X[((506832829 * A) & 4294967295) >>> p.Mb] = A);
            A = n;
            E = p;
            x(!(y >>> E.Xa));
            b[A] = E.X[y];
            y = !0;
          } else break a;
          y || x(l.h == db(l));
        }
        if (a.Pb && l.h && n < e)
          x(a.m.h),
            (a.a = 5),
            (a.m = a.wd),
            (a.$ = a.xd),
            0 < a.s.ua && $b(a.s.vb, a.s.Wa);
        else if (l.h) break a;
        else null != g && g(a, h > f ? f : h), (a.a = 0), (a.$ = n - c);
        return 1;
      }
      a.a = 3;
      return 0;
    }
    function Ac(a) {
      x(null != a);
      a.vc = null;
      a.yc = null;
      a.Ya = null;
      var b = a.Wa;
      null != b && (b.X = null);
      a.vb = null;
      x(null != a);
    }
    function Bc() {
      var a = new je();
      if (null == a) return null;
      a.a = 0;
      a.xb = Cc;
      gb("Predictor", "VP8LPredictors");
      gb("Predictor", "VP8LPredictors_C");
      gb("PredictorAdd", "VP8LPredictorsAdd");
      gb("PredictorAdd", "VP8LPredictorsAdd_C");
      pc = Kd;
      Fb = Ld;
      sc = Md;
      Gb = Nd;
      Hb = Od;
      xc = Pd;
      uc = Qd;
      self.VP8LMapColor32b = ke;
      self.VP8LMapColor8b = le;
      return a;
    }
    function rb(a, b, c, d, e) {
      var f = 1,
        g = [a],
        h = [b],
        k = d.m,
        l = d.s,
        m = null,
        n = 0;
      a: for (;;) {
        if (c)
          for (; f && D(k, 1); ) {
            var r = g,
              q = h,
              t = d,
              v = 1,
              p = t.m,
              u = t.gc[t.ab],
              w = D(p, 2);
            if (t.Oc & (1 << w)) f = 0;
            else {
              t.Oc |= 1 << w;
              u.hc = w;
              u.Ea = r[0];
              u.nc = q[0];
              u.K = [null];
              ++t.ab;
              x(4 >= t.ab);
              switch (w) {
                case 0:
                case 1:
                  u.b = D(p, 3) + 2;
                  v = rb(xa(u.Ea, u.b), xa(u.nc, u.b), 0, t, u.K);
                  u.K = u.K[0];
                  break;
                case 3:
                  var y = D(p, 8) + 1,
                    A = 16 < y ? 0 : 4 < y ? 1 : 2 < y ? 2 : 3;
                  r[0] = xa(u.Ea, A);
                  u.b = A;
                  var v = rb(y, 1, 0, t, u.K),
                    E;
                  if ((E = v)) {
                    var B,
                      C = y,
                      N = u,
                      z = 1 << (8 >> N.b),
                      Q = V(z);
                    if (null == Q) E = 0;
                    else {
                      var S = N.K[0],
                        K = N.w;
                      Q[0] = N.K[0][0];
                      for (B = 1; B < 1 * C; ++B) Q[B] = yb(S[K + B], Q[B - 1]);
                      for (; B < 4 * z; ++B) Q[B] = 0;
                      N.K[0] = null;
                      N.K[0] = Q;
                      E = 1;
                    }
                  }
                  v = E;
                  break;
                case 2:
                  break;
                default:
                  x(0);
              }
              f = v;
            }
          }
        g = g[0];
        h = h[0];
        if (f && D(k, 1) && ((n = D(k, 4)), (f = 1 <= n && 11 >= n), !f)) {
          d.a = 3;
          break a;
        }
        var H;
        if ((H = f))
          b: {
            var F = d,
              G = g,
              L = h,
              J = n,
              T = c,
              Da,
              ba,
              X = F.m,
              R = F.s,
              P = [null],
              U,
              W = 1,
              aa = 0,
              na = me[J];
            c: for (;;) {
              if (T && D(X, 1)) {
                var ca = D(X, 3) + 2,
                  ga = xa(G, ca),
                  ka = xa(L, ca),
                  qa = ga * ka;
                if (!rb(ga, ka, 0, F, P)) break c;
                P = P[0];
                R.xc = ca;
                for (Da = 0; Da < qa; ++Da) {
                  var ia = (P[Da] >> 8) & 65535;
                  P[Da] = ia;
                  ia >= W && (W = ia + 1);
                }
              }
              if (X.h) break c;
              for (ba = 0; 5 > ba; ++ba) {
                var Y = Dc[ba];
                !ba && 0 < J && (Y += 1 << J);
                aa < Y && (aa = Y);
              }
              var ma = wa(W * na, O);
              var ua = W,
                va = wa(ua, Ub);
              if (null == va) var la = null;
              else x(65536 >= ua), (la = va);
              var ha = V(aa);
              if (null == la || null == ha || null == ma) {
                F.a = 1;
                break c;
              }
              var pa = ma;
              for (Da = U = 0; Da < W; ++Da) {
                var ja = la[Da],
                  da = ja.G,
                  ea = ja.H,
                  Fa = 0,
                  ra = 1,
                  Ha = 0;
                for (ba = 0; 5 > ba; ++ba) {
                  Y = Dc[ba];
                  da[ba] = pa;
                  ea[ba] = U;
                  !ba && 0 < J && (Y += 1 << J);
                  d: {
                    var sa,
                      za = Y,
                      ta = F,
                      oa = ha,
                      db = pa,
                      eb = U,
                      Ia = 0,
                      Ka = ta.m,
                      fb = D(Ka, 1);
                    M(oa, 0, 0, za);
                    if (fb) {
                      var gb = D(Ka, 1) + 1,
                        hb = D(Ka, 1),
                        Ja = D(Ka, 0 == hb ? 1 : 8);
                      oa[Ja] = 1;
                      2 == gb && ((Ja = D(Ka, 8)), (oa[Ja] = 1));
                      var ya = 1;
                    } else {
                      var Ua = V(19),
                        Va = D(Ka, 4) + 4;
                      if (19 < Va) {
                        ta.a = 3;
                        var Aa = 0;
                        break d;
                      }
                      for (sa = 0; sa < Va; ++sa) Ua[ne[sa]] = D(Ka, 3);
                      var Ba = void 0,
                        sb = void 0,
                        Wa = ta,
                        ib = Ua,
                        Ca = za,
                        Xa = oa,
                        Oa = 0,
                        La = Wa.m,
                        Ya = 8,
                        Za = wa(128, O);
                      e: for (;;) {
                        if (!Z(Za, 0, 7, ib, 19)) break e;
                        if (D(La, 1)) {
                          var kb = 2 + 2 * D(La, 3),
                            Ba = 2 + D(La, kb);
                          if (Ba > Ca) break e;
                        } else Ba = Ca;
                        for (sb = 0; sb < Ca && Ba--; ) {
                          Sa(La);
                          var $a = Za[0 + (pb(La) & 127)];
                          qb(La, La.u + $a.g);
                          var jb = $a.value;
                          if (16 > jb) (Xa[sb++] = jb), 0 != jb && (Ya = jb);
                          else {
                            var lb = 16 == jb,
                              ab = jb - 16,
                              mb = oe[ab],
                              bb = D(La, pe[ab]) + mb;
                            if (sb + bb > Ca) break e;
                            else
                              for (var nb = lb ? Ya : 0; 0 < bb--; )
                                Xa[sb++] = nb;
                          }
                        }
                        Oa = 1;
                        break e;
                      }
                      Oa || (Wa.a = 3);
                      ya = Oa;
                    }
                    (ya = ya && !Ka.h) && (Ia = Z(db, eb, 8, oa, za));
                    ya && 0 != Ia ? (Aa = Ia) : ((ta.a = 3), (Aa = 0));
                  }
                  if (0 == Aa) break c;
                  ra && 1 == qe[ba] && (ra = 0 == pa[U].g);
                  Fa += pa[U].g;
                  U += Aa;
                  if (3 >= ba) {
                    var Pa = ha[0],
                      tb;
                    for (tb = 1; tb < Y; ++tb) ha[tb] > Pa && (Pa = ha[tb]);
                    Ha += Pa;
                  }
                }
                ja.nd = ra;
                ja.Qb = 0;
                ra &&
                  ((ja.qb =
                    ((da[3][ea[3] + 0].value << 24) |
                      (da[1][ea[1] + 0].value << 16) |
                      da[2][ea[2] + 0].value) >>>
                    0),
                  0 == Fa &&
                    256 > da[0][ea[0] + 0].value &&
                    ((ja.Qb = 1), (ja.qb += da[0][ea[0] + 0].value << 8)));
                ja.jc = !ja.Qb && 6 > Ha;
                if (ja.jc) {
                  var Ga,
                    Ea = ja;
                  for (Ga = 0; Ga < xb; ++Ga) {
                    var Ma = Ga,
                      Na = Ea.pd[Ma],
                      vb = Ea.G[0][Ea.H[0] + Ma];
                    256 <= vb.value
                      ? ((Na.g = vb.g + 256), (Na.value = vb.value))
                      : ((Na.g = 0),
                        (Na.value = 0),
                        (Ma >>= ub(vb, 8, Na)),
                        (Ma >>= ub(Ea.G[1][Ea.H[1] + Ma], 16, Na)),
                        (Ma >>= ub(Ea.G[2][Ea.H[2] + Ma], 0, Na)),
                        ub(Ea.G[3][Ea.H[3] + Ma], 24, Na));
                  }
                }
              }
              R.vc = P;
              R.Wb = W;
              R.Ya = la;
              R.yc = ma;
              H = 1;
              break b;
            }
            H = 0;
          }
        f = H;
        if (!f) {
          d.a = 3;
          break a;
        }
        if (0 < n) {
          if (((l.ua = 1 << n), !Zb(l.Wa, n))) {
            d.a = 1;
            f = 0;
            break a;
          }
        } else l.ua = 0;
        var Qa = d,
          cb = g,
          ob = h,
          Ra = Qa.s,
          Ta = Ra.xc;
        Qa.c = cb;
        Qa.i = ob;
        Ra.md = xa(cb, Ta);
        Ra.wc = 0 == Ta ? -1 : (1 << Ta) - 1;
        if (c) {
          d.xb = re;
          break a;
        }
        m = V(g * h);
        if (null == m) {
          d.a = 1;
          f = 0;
          break a;
        }
        f = (f = Jb(d, m, 0, g, h, h, null)) && !k.h;
        break a;
      }
      f
        ? (null != e ? (e[0] = m) : (x(null == m), x(c)), (d.$ = 0), c || Ac(l))
        : Ac(l);
      return f;
    }
    function Ec(a, b) {
      var c = a.c * a.i,
        d = c + b + 16 * b;
      x(a.c <= b);
      a.V = V(d);
      if (null == a.V) return (a.Ta = null), (a.Ua = 0), (a.a = 1), 0;
      a.Ta = a.V;
      a.Ua = a.Ba + c + b;
      return 1;
    }
    function se(a, b) {
      var c = a.C,
        d = b - c,
        e = a.V,
        f = a.Ba + a.c * c;
      for (x(b <= a.l.o); 0 < d; ) {
        var g = 16 < d ? 16 : d,
          h = a.l.ma,
          k = a.l.width,
          l = k * g,
          m = h.ca,
          n = h.tb + k * c,
          r = a.Ta,
          q = a.Ua;
        oc(a, g, e, f);
        Fc(r, q, m, n, l);
        zc(h, c, c + g, m, n, k);
        d -= g;
        e += g * a.c;
        c += g;
      }
      x(c == b);
      a.C = a.Ma = b;
    }
    function te(a, b) {
      var c = [0],
        d = [0],
        e = [0];
      a: for (;;) {
        if (null == a) return 0;
        if (null == b) return (a.a = 2), 0;
        a.l = b;
        a.a = 0;
        cb(a.m, b.data, b.w, b.ha);
        if (!mc(a.m, c, d, e)) {
          a.a = 3;
          break a;
        }
        a.xb = Cc;
        b.width = c[0];
        b.height = d[0];
        if (!rb(c[0], d[0], 1, a, null)) break a;
        return 1;
      }
      x(0 != a.a);
      return 0;
    }
    function ue() {
      this.ub = this.yd = this.td = this.Rb = 0;
    }
    function ve() {
      this.Kd = this.Ld = this.Ud = this.Td = this.i = this.c = 0;
    }
    function we() {
      this.Fb = this.Bb = this.Cb = 0;
      this.Zb = V(4);
      this.Lb = V(4);
    }
    function Gc() {
      this.Yb = wb();
    }
    function xe() {
      this.jb = V(3);
      this.Wc = Ed([4, 8], Gc);
      this.Xc = Ed([4, 17], Gc);
    }
    function ye() {
      this.Pc = this.wb = this.Tb = this.zd = 0;
      this.vd = new V(4);
      this.od = new V(4);
    }
    function Xa() {
      this.ld = this.La = this.dd = this.tc = 0;
    }
    function Hc() {
      this.Na = this.la = 0;
    }
    function ze() {
      this.Sc = [0, 0];
      this.Eb = [0, 0];
      this.Qc = [0, 0];
      this.ia = this.lc = 0;
    }
    function Kb() {
      this.ad = V(384);
      this.Za = 0;
      this.Ob = V(16);
      this.$b = this.Ad = this.ia = this.Gc = this.Hc = this.Dd = 0;
    }
    function Ae() {
      this.uc = this.M = this.Nb = 0;
      this.wa = Array(new Xa());
      this.Y = 0;
      this.ya = Array(new Kb());
      this.aa = 0;
      this.l = new Oa();
    }
    function Ic() {
      this.y = V(16);
      this.f = V(8);
      this.ea = V(8);
    }
    function Be() {
      this.cb = this.a = 0;
      this.sc = "";
      this.m = new Wb();
      this.Od = new ue();
      this.Kc = new ve();
      this.ed = new ye();
      this.Qa = new we();
      this.Ic = this.$c = this.Aa = 0;
      this.D = new Ae();
      this.Xb = this.Va = this.Hb = this.zb = this.yb = this.Ub = this.za = 0;
      this.Jc = wa(8, Wb);
      this.ia = 0;
      new F();
      this.pb = wa(4, ze);
      this.Pa = new xe();
      this.Bd = this.kc = 0;
      this.Ac = [];
      this.Bc = 0;
      this.zc = [0, 0, 0, 0];
      this.Gd = Array(new Ic());
      this.Hd = 0;
      this.rb = Array(new Hc());
      this.sb = 0;
      this.wa = Array(new Xa());
      this.Y = 0;
      this.oc = [];
      this.pc = 0;
      this.sa = [];
      this.ta = 0;
      this.qa = [];
      this.ra = 0;
      this.Ha = [];
      this.B = this.R = this.Ia = 0;
      this.Ec = [];
      this.M = this.ja = this.Vb = this.Fc = 0;
      this.ya = Array(new Kb());
      this.L = this.aa = 0;
      this.gd = Ed([4, 2], Xa);
      this.ga = null;
      this.Fa = [];
      this.Cc = this.qc = this.P = 0;
      this.Gb = [];
      this.Uc = 0;
      this.mb = [];
      this.nb = 0;
      this.rc = [];
      this.Ga = this.Vc = 0;
    }
    function ga(a, b) {
      return 0 > a ? 0 : a > b ? b : a;
    }
    function Oa() {
      this.T = this.U = this.ka = this.height = this.width = 0;
      this.y = [];
      this.f = [];
      this.ea = [];
      this.Rc = this.fa = this.W = this.N = this.O = 0;
      this.ma = "void";
      this.put = "VP8IoPutHook";
      this.ac = "VP8IoSetupHook";
      this.bc = "VP8IoTeardownHook";
      this.ha = this.Kb = 0;
      this.data = [];
      this.hb = this.ib = this.da = this.o = this.j = this.va = this.v = this.Da = this.ob = this.w = 0;
      this.F = [];
      this.J = 0;
    }
    function Ce() {
      var a = new Be();
      null != a &&
        ((a.a = 0), (a.sc = "OK"), (a.cb = 0), (a.Xb = 0), oa || (oa = De));
      return a;
    }
    function T(a, b, c) {
      0 == a.a && ((a.a = b), (a.sc = c), (a.cb = 0));
      return 0;
    }
    function Jc(a, b, c) {
      return 3 <= c && 157 == a[b + 0] && 1 == a[b + 1] && 42 == a[b + 2];
    }
    function Kc(a, b) {
      if (null == a) return 0;
      a.a = 0;
      a.sc = "OK";
      if (null == b) return T(a, 2, "null VP8Io passed to VP8GetHeaders()");
      var c = b.data;
      var d = b.w;
      var e = b.ha;
      if (4 > e) return T(a, 7, "Truncated header.");
      var f = c[d + 0] | (c[d + 1] << 8) | (c[d + 2] << 16);
      var g = a.Od;
      g.Rb = !(f & 1);
      g.td = (f >> 1) & 7;
      g.yd = (f >> 4) & 1;
      g.ub = f >> 5;
      if (3 < g.td) return T(a, 3, "Incorrect keyframe parameters.");
      if (!g.yd) return T(a, 4, "Frame not displayable.");
      d += 3;
      e -= 3;
      var h = a.Kc;
      if (g.Rb) {
        if (7 > e) return T(a, 7, "cannot parse picture header");
        if (!Jc(c, d, e)) return T(a, 3, "Bad code word");
        h.c = ((c[d + 4] << 8) | c[d + 3]) & 16383;
        h.Td = c[d + 4] >> 6;
        h.i = ((c[d + 6] << 8) | c[d + 5]) & 16383;
        h.Ud = c[d + 6] >> 6;
        d += 7;
        e -= 7;
        a.za = (h.c + 15) >> 4;
        a.Ub = (h.i + 15) >> 4;
        b.width = h.c;
        b.height = h.i;
        b.Da = 0;
        b.j = 0;
        b.v = 0;
        b.va = b.width;
        b.o = b.height;
        b.da = 0;
        b.ib = b.width;
        b.hb = b.height;
        b.U = b.width;
        b.T = b.height;
        f = a.Pa;
        M(f.jb, 0, 255, f.jb.length);
        f = a.Qa;
        x(null != f);
        f.Cb = 0;
        f.Bb = 0;
        f.Fb = 1;
        M(f.Zb, 0, 0, f.Zb.length);
        M(f.Lb, 0, 0, f.Lb);
      }
      if (g.ub > e) return T(a, 7, "bad partition length");
      f = a.m;
      ma(f, c, d, g.ub);
      d += g.ub;
      e -= g.ub;
      g.Rb && ((h.Ld = G(f)), (h.Kd = G(f)));
      h = a.Qa;
      var k = a.Pa,
        l;
      x(null != f);
      x(null != h);
      h.Cb = G(f);
      if (h.Cb) {
        h.Bb = G(f);
        if (G(f)) {
          h.Fb = G(f);
          for (l = 0; 4 > l; ++l) h.Zb[l] = G(f) ? ca(f, 7) : 0;
          for (l = 0; 4 > l; ++l) h.Lb[l] = G(f) ? ca(f, 6) : 0;
        }
        if (h.Bb) for (l = 0; 3 > l; ++l) k.jb[l] = G(f) ? na(f, 8) : 255;
      } else h.Bb = 0;
      if (f.Ka) return T(a, 3, "cannot parse segment header");
      h = a.ed;
      h.zd = G(f);
      h.Tb = na(f, 6);
      h.wb = na(f, 3);
      h.Pc = G(f);
      if (h.Pc && G(f)) {
        for (k = 0; 4 > k; ++k) G(f) && (h.vd[k] = ca(f, 6));
        for (k = 0; 4 > k; ++k) G(f) && (h.od[k] = ca(f, 6));
      }
      a.L = 0 == h.Tb ? 0 : h.zd ? 1 : 2;
      if (f.Ka) return T(a, 3, "cannot parse filter header");
      l = d;
      var m = e;
      e = l;
      d = l + m;
      h = m;
      a.Xb = (1 << na(a.m, 2)) - 1;
      k = a.Xb;
      if (m < 3 * k) c = 7;
      else {
        l += 3 * k;
        h -= 3 * k;
        for (m = 0; m < k; ++m) {
          var n = c[e + 0] | (c[e + 1] << 8) | (c[e + 2] << 16);
          n > h && (n = h);
          ma(a.Jc[+m], c, l, n);
          l += n;
          h -= n;
          e += 3;
        }
        ma(a.Jc[+k], c, l, h);
        c = l < d ? 0 : 5;
      }
      if (0 != c) return T(a, c, "cannot parse partitions");
      l = a.m;
      c = na(l, 7);
      e = G(l) ? ca(l, 4) : 0;
      d = G(l) ? ca(l, 4) : 0;
      h = G(l) ? ca(l, 4) : 0;
      k = G(l) ? ca(l, 4) : 0;
      l = G(l) ? ca(l, 4) : 0;
      m = a.Qa;
      for (n = 0; 4 > n; ++n) {
        if (m.Cb) {
          var r = m.Zb[n];
          m.Fb || (r += c);
        } else if (0 < n) {
          a.pb[n] = a.pb[0];
          continue;
        } else r = c;
        var q = a.pb[n];
        q.Sc[0] = Lb[ga(r + e, 127)];
        q.Sc[1] = Mb[ga(r + 0, 127)];
        q.Eb[0] = 2 * Lb[ga(r + d, 127)];
        q.Eb[1] = (101581 * Mb[ga(r + h, 127)]) >> 16;
        8 > q.Eb[1] && (q.Eb[1] = 8);
        q.Qc[0] = Lb[ga(r + k, 117)];
        q.Qc[1] = Mb[ga(r + l, 127)];
        q.lc = r + l;
      }
      if (!g.Rb) return T(a, 4, "Not a key frame.");
      G(f);
      g = a.Pa;
      for (c = 0; 4 > c; ++c) {
        for (e = 0; 8 > e; ++e)
          for (d = 0; 3 > d; ++d)
            for (h = 0; 11 > h; ++h)
              (k = K(f, Ee[c][e][d][h]) ? na(f, 8) : Fe[c][e][d][h]),
                (g.Wc[c][e].Yb[d][h] = k);
        for (e = 0; 17 > e; ++e) g.Xc[c][e] = g.Wc[c][Ge[e]];
      }
      a.kc = G(f);
      a.kc && (a.Bd = na(f, 8));
      return (a.cb = 1);
    }
    function De(a, b, c, d, e, f, g) {
      var h = b[e].Yb[c];
      for (c = 0; 16 > e; ++e) {
        if (!K(a, h[c + 0])) return e;
        for (; !K(a, h[c + 1]); )
          if (((h = b[++e].Yb[0]), (c = 0), 16 == e)) return 16;
        var k = b[e + 1].Yb;
        if (K(a, h[c + 2])) {
          var l = a,
            m = h,
            n = c;
          var r = 0;
          if (K(l, m[n + 3]))
            if (K(l, m[n + 6])) {
              h = 0;
              r = K(l, m[n + 8]);
              m = K(l, m[n + 9 + r]);
              n = 2 * r + m;
              r = 0;
              for (m = He[n]; m[h]; ++h) r += r + K(l, m[h]);
              r += 3 + (8 << n);
            } else
              K(l, m[n + 7])
                ? ((r = 7 + 2 * K(l, 165)), (r += K(l, 145)))
                : (r = 5 + K(l, 159));
          else K(l, m[n + 4]) ? (r = 3 + K(l, m[n + 5])) : (r = 2);
          h = k[2];
        } else (r = 1), (h = k[1]);
        k = g + Ie[e];
        l = a;
        0 > l.b && Qa(l);
        var m = l.b,
          n = l.Ca >> 1,
          q = (n - (l.I >> m)) >> 31;
        --l.b;
        l.Ca += q;
        l.Ca |= 1;
        l.I -= ((n + 1) & q) << m;
        f[k] = ((r ^ q) - q) * d[(0 < e) + 0];
      }
      return 16;
    }
    function Lc(a) {
      var b = a.rb[a.sb - 1];
      b.la = 0;
      b.Na = 0;
      M(a.zc, 0, 0, a.zc.length);
      a.ja = 0;
    }
    function Je(a, b) {
      for (a.M = 0; a.M < a.Va; ++a.M) {
        var c = a.Jc[a.M & a.Xb],
          d = a.m,
          e = a,
          f;
        for (f = 0; f < e.za; ++f) {
          var g = d;
          var h = e;
          var k = h.Ac,
            l = h.Bc + 4 * f,
            m = h.zc,
            n = h.ya[h.aa + f];
          h.Qa.Bb
            ? (n.$b = K(g, h.Pa.jb[0])
                ? 2 + K(g, h.Pa.jb[2])
                : K(g, h.Pa.jb[1]))
            : (n.$b = 0);
          h.kc && (n.Ad = K(g, h.Bd));
          n.Za = !K(g, 145) + 0;
          if (n.Za) {
            var r = n.Ob,
              q = 0;
            for (h = 0; 4 > h; ++h) {
              var t = m[0 + h];
              var v;
              for (v = 0; 4 > v; ++v) {
                t = Ke[k[l + v]][t];
                for (var p = Mc[K(g, t[0])]; 0 < p; )
                  p = Mc[2 * p + K(g, t[p])];
                t = -p;
                k[l + v] = t;
              }
              I(r, q, k, l, 4);
              q += 4;
              m[0 + h] = t;
            }
          } else
            (t = K(g, 156) ? (K(g, 128) ? 1 : 3) : K(g, 163) ? 2 : 0),
              (n.Ob[0] = t),
              M(k, l, t, 4),
              M(m, 0, t, 4);
          n.Dd = K(g, 142) ? (K(g, 114) ? (K(g, 183) ? 1 : 3) : 2) : 0;
        }
        if (e.m.Ka) return T(a, 7, "Premature end-of-partition0 encountered.");
        for (; a.ja < a.za; ++a.ja) {
          d = a;
          e = c;
          g = d.rb[d.sb - 1];
          k = d.rb[d.sb + d.ja];
          f = d.ya[d.aa + d.ja];
          if ((l = d.kc ? f.Ad : 0))
            (g.la = k.la = 0),
              f.Za || (g.Na = k.Na = 0),
              (f.Hc = 0),
              (f.Gc = 0),
              (f.ia = 0);
          else {
            var u,
              w,
              g = k,
              k = e,
              l = d.Pa.Xc,
              m = d.ya[d.aa + d.ja],
              n = d.pb[m.$b];
            h = m.ad;
            r = 0;
            q = d.rb[d.sb - 1];
            t = v = 0;
            M(h, r, 0, 384);
            if (m.Za) {
              var y = 0;
              var A = l[3];
            } else {
              p = V(16);
              var E = g.Na + q.Na;
              E = oa(k, l[1], E, n.Eb, 0, p, 0);
              g.Na = q.Na = (0 < E) + 0;
              if (1 < E) Nc(p, 0, h, r);
              else {
                var B = (p[0] + 3) >> 3;
                for (p = 0; 256 > p; p += 16) h[r + p] = B;
              }
              y = 1;
              A = l[0];
            }
            var C = g.la & 15;
            var N = q.la & 15;
            for (p = 0; 4 > p; ++p) {
              var z = N & 1;
              for (B = w = 0; 4 > B; ++B)
                (E = z + (C & 1)),
                  (E = oa(k, A, E, n.Sc, y, h, r)),
                  (z = E > y),
                  (C = (C >> 1) | (z << 7)),
                  (w = (w << 2) | (3 < E ? 3 : 1 < E ? 2 : 0 != h[r + 0])),
                  (r += 16);
              C >>= 4;
              N = (N >> 1) | (z << 7);
              v = ((v << 8) | w) >>> 0;
            }
            A = C;
            y = N >> 4;
            for (u = 0; 4 > u; u += 2) {
              w = 0;
              C = g.la >> (4 + u);
              N = q.la >> (4 + u);
              for (p = 0; 2 > p; ++p) {
                z = N & 1;
                for (B = 0; 2 > B; ++B)
                  (E = z + (C & 1)),
                    (E = oa(k, l[2], E, n.Qc, 0, h, r)),
                    (z = 0 < E),
                    (C = (C >> 1) | (z << 3)),
                    (w = (w << 2) | (3 < E ? 3 : 1 < E ? 2 : 0 != h[r + 0])),
                    (r += 16);
                C >>= 2;
                N = (N >> 1) | (z << 5);
              }
              t |= w << (4 * u);
              A |= (C << 4) << u;
              y |= (N & 240) << u;
            }
            g.la = A;
            q.la = y;
            m.Hc = v;
            m.Gc = t;
            m.ia = t & 43690 ? 0 : n.ia;
            l = !(v | t);
          }
          0 < d.L &&
            ((d.wa[d.Y + d.ja] = d.gd[f.$b][f.Za]),
            (d.wa[d.Y + d.ja].La |= !l));
          if (e.Ka) return T(a, 7, "Premature end-of-file encountered.");
        }
        Lc(a);
        c = a;
        d = b;
        e = 1;
        f = c.D;
        g = 0 < c.L && c.M >= c.zb && c.M <= c.Va;
        if (0 == c.Aa)
          a: {
            (f.M = c.M), (f.uc = g), Oc(c, f), (e = 1);
            w = c.D;
            f = w.Nb;
            t = Ya[c.L];
            g = t * c.R;
            k = (t / 2) * c.B;
            p = 16 * f * c.R;
            B = 8 * f * c.B;
            l = c.sa;
            m = c.ta - g + p;
            n = c.qa;
            h = c.ra - k + B;
            r = c.Ha;
            q = c.Ia - k + B;
            C = w.M;
            N = 0 == C;
            v = C >= c.Va - 1;
            2 == c.Aa && Oc(c, w);
            if (w.uc)
              for (E = c, z = E.D.M, x(E.D.uc), w = E.yb; w < E.Hb; ++w) {
                var Q = E;
                y = w;
                A = z;
                var S = Q.D,
                  D = S.Nb;
                u = Q.R;
                var S = S.wa[S.Y + y],
                  F = Q.sa,
                  H = Q.ta + 16 * D * u + 16 * y,
                  J = S.dd,
                  G = S.tc;
                if (0 != G)
                  if ((x(3 <= G), 1 == Q.L))
                    0 < y && Pc(F, H, u, G + 4),
                      S.La && Qc(F, H, u, G),
                      0 < A && Rc(F, H, u, G + 4),
                      S.La && Sc(F, H, u, G);
                  else {
                    var L = Q.B,
                      O = Q.qa,
                      P = Q.ra + 8 * D * L + 8 * y,
                      R = Q.Ha,
                      Q = Q.Ia + 8 * D * L + 8 * y,
                      D = S.ld;
                    0 < y &&
                      (Tc(F, H, u, G + 4, J, D),
                      Uc(O, P, R, Q, L, G + 4, J, D));
                    S.La && (Vc(F, H, u, G, J, D), Wc(O, P, R, Q, L, G, J, D));
                    0 < A &&
                      (Xc(F, H, u, G + 4, J, D),
                      Yc(O, P, R, Q, L, G + 4, J, D));
                    S.La && (Zc(F, H, u, G, J, D), $c(O, P, R, Q, L, G, J, D));
                  }
              }
            c.ia && alert("todo:DitherRow");
            if (null != d.put) {
              w = 16 * C;
              C = 16 * (C + 1);
              N
                ? ((d.y = c.sa),
                  (d.O = c.ta + p),
                  (d.f = c.qa),
                  (d.N = c.ra + B),
                  (d.ea = c.Ha),
                  (d.W = c.Ia + B))
                : ((w -= t),
                  (d.y = l),
                  (d.O = m),
                  (d.f = n),
                  (d.N = h),
                  (d.ea = r),
                  (d.W = q));
              v || (C -= t);
              C > d.o && (C = d.o);
              d.F = null;
              d.J = null;
              if (
                null != c.Fa &&
                0 < c.Fa.length &&
                w < C &&
                ((d.J = Le(c, d, w, C - w)),
                (d.F = c.mb),
                null == d.F && 0 == d.F.length)
              ) {
                e = T(c, 3, "Could not decode alpha data.");
                break a;
              }
              w < d.j &&
                ((t = d.j - w),
                (w = d.j),
                x(!(t & 1)),
                (d.O += c.R * t),
                (d.N += c.B * (t >> 1)),
                (d.W += c.B * (t >> 1)),
                null != d.F && (d.J += d.width * t));
              w < C &&
                ((d.O += d.v),
                (d.N += d.v >> 1),
                (d.W += d.v >> 1),
                null != d.F && (d.J += d.v),
                (d.ka = w - d.j),
                (d.U = d.va - d.v),
                (d.T = C - w),
                (e = d.put(d)));
            }
            f + 1 != c.Ic ||
              v ||
              (I(c.sa, c.ta - g, l, m + 16 * c.R, g),
              I(c.qa, c.ra - k, n, h + 8 * c.B, k),
              I(c.Ha, c.Ia - k, r, q + 8 * c.B, k));
          }
        if (!e) return T(a, 6, "Output aborted.");
      }
      return 1;
    }
    function Me(a, b) {
      if (null == a) return 0;
      if (null == b) return T(a, 2, "NULL VP8Io parameter in VP8Decode().");
      if (!a.cb && !Kc(a, b)) return 0;
      x(a.cb);
      if (null == b.ac || b.ac(b)) {
        b.ob && (a.L = 0);
        var c = Ya[a.L];
        2 == a.L
          ? ((a.yb = 0), (a.zb = 0))
          : ((a.yb = (b.v - c) >> 4),
            (a.zb = (b.j - c) >> 4),
            0 > a.yb && (a.yb = 0),
            0 > a.zb && (a.zb = 0));
        a.Va = (b.o + 15 + c) >> 4;
        a.Hb = (b.va + 15 + c) >> 4;
        a.Hb > a.za && (a.Hb = a.za);
        a.Va > a.Ub && (a.Va = a.Ub);
        if (0 < a.L) {
          var d = a.ed;
          for (c = 0; 4 > c; ++c) {
            var e;
            if (a.Qa.Cb) {
              var f = a.Qa.Lb[c];
              a.Qa.Fb || (f += d.Tb);
            } else f = d.Tb;
            for (e = 0; 1 >= e; ++e) {
              var g = a.gd[c][e],
                h = f;
              d.Pc && ((h += d.vd[0]), e && (h += d.od[0]));
              h = 0 > h ? 0 : 63 < h ? 63 : h;
              if (0 < h) {
                var k = h;
                0 < d.wb &&
                  ((k = 4 < d.wb ? k >> 2 : k >> 1),
                  k > 9 - d.wb && (k = 9 - d.wb));
                1 > k && (k = 1);
                g.dd = k;
                g.tc = 2 * h + k;
                g.ld = 40 <= h ? 2 : 15 <= h ? 1 : 0;
              } else g.tc = 0;
              g.La = e;
            }
          }
        }
        c = 0;
      } else T(a, 6, "Frame setup failed"), (c = a.a);
      if ((c = 0 == c)) {
        if (c) {
          a.$c = 0;
          0 < a.Aa || (a.Ic = Ne);
          b: {
            c = a.Ic;
            var k = a.za,
              d = 4 * k,
              l = 32 * k,
              m = k + 1,
              n = 0 < a.L ? k * (0 < a.Aa ? 2 : 1) : 0,
              r = (2 == a.Aa ? 2 : 1) * k;
            e = ((3 * (16 * c + Ya[a.L])) / 2) * l;
            f = null != a.Fa && 0 < a.Fa.length ? a.Kc.c * a.Kc.i : 0;
            g = d + 832 + e + f;
            if (g != g) c = 0;
            else {
              if (g > a.Vb) {
                a.Vb = 0;
                a.Ec = V(g);
                a.Fc = 0;
                if (null == a.Ec) {
                  c = T(a, 1, "no memory during frame initialization.");
                  break b;
                }
                a.Vb = g;
              }
              g = a.Ec;
              h = a.Fc;
              a.Ac = g;
              a.Bc = h;
              h += d;
              a.Gd = wa(l, Ic);
              a.Hd = 0;
              a.rb = wa(m + 1, Hc);
              a.sb = 1;
              a.wa = n ? wa(n, Xa) : null;
              a.Y = 0;
              a.D.Nb = 0;
              a.D.wa = a.wa;
              a.D.Y = a.Y;
              0 < a.Aa && (a.D.Y += k);
              x(!0);
              a.oc = g;
              a.pc = h;
              h += 832;
              a.ya = wa(r, Kb);
              a.aa = 0;
              a.D.ya = a.ya;
              a.D.aa = a.aa;
              2 == a.Aa && (a.D.aa += k);
              a.R = 16 * k;
              a.B = 8 * k;
              l = Ya[a.L];
              k = l * a.R;
              l = (l / 2) * a.B;
              a.sa = g;
              a.ta = h + k;
              a.qa = a.sa;
              a.ra = a.ta + 16 * c * a.R + l;
              a.Ha = a.qa;
              a.Ia = a.ra + 8 * c * a.B + l;
              a.$c = 0;
              h += e;
              a.mb = f ? g : null;
              a.nb = f ? h : null;
              x(h + f <= a.Fc + a.Vb);
              Lc(a);
              M(a.Ac, a.Bc, 0, d);
              c = 1;
            }
          }
          if (c) {
            b.ka = 0;
            b.y = a.sa;
            b.O = a.ta;
            b.f = a.qa;
            b.N = a.ra;
            b.ea = a.Ha;
            b.Vd = a.Ia;
            b.fa = a.R;
            b.Rc = a.B;
            b.F = null;
            b.J = 0;
            if (!ad) {
              for (c = -255; 255 >= c; ++c) bd[255 + c] = 0 > c ? -c : c;
              for (c = -1020; 1020 >= c; ++c)
                cd[1020 + c] = -128 > c ? -128 : 127 < c ? 127 : c;
              for (c = -112; 112 >= c; ++c)
                dd[112 + c] = -16 > c ? -16 : 15 < c ? 15 : c;
              for (c = -255; 510 >= c; ++c)
                ed[255 + c] = 0 > c ? 0 : 255 < c ? 255 : c;
              ad = 1;
            }
            Nc = Oe;
            Za = Pe;
            Nb = Qe;
            pa = Re;
            Ob = Se;
            fd = Te;
            Xc = Ue;
            Tc = Ve;
            Yc = We;
            Uc = Xe;
            Zc = Ye;
            Vc = Ze;
            $c = $e;
            Wc = af;
            Rc = gd;
            Pc = hd;
            Sc = bf;
            Qc = cf;
            W[0] = df;
            W[1] = ef;
            W[2] = ff;
            W[3] = gf;
            W[4] = hf;
            W[5] = jf;
            W[6] = kf;
            W[7] = lf;
            W[8] = mf;
            W[9] = nf;
            Y[0] = of;
            Y[1] = pf;
            Y[2] = qf;
            Y[3] = rf;
            Y[4] = sf;
            Y[5] = tf;
            Y[6] = uf;
            ka[0] = vf;
            ka[1] = wf;
            ka[2] = xf;
            ka[3] = yf;
            ka[4] = zf;
            ka[5] = Af;
            ka[6] = Bf;
            c = 1;
          } else c = 0;
        }
        c && (c = Je(a, b));
        null != b.bc && b.bc(b);
        c &= 1;
      }
      if (!c) return 0;
      a.cb = 0;
      return c;
    }
    function qa(a, b, c, d, e) {
      e = a[b + c + 32 * d] + (e >> 3);
      a[b + c + 32 * d] = e & -256 ? (0 > e ? 0 : 255) : e;
    }
    function kb(a, b, c, d, e, f) {
      qa(a, b, 0, c, d + e);
      qa(a, b, 1, c, d + f);
      qa(a, b, 2, c, d - f);
      qa(a, b, 3, c, d - e);
    }
    function da(a) {
      return ((20091 * a) >> 16) + a;
    }
    function id(a, b, c, d) {
      var e = 0,
        f;
      var g = V(16);
      for (f = 0; 4 > f; ++f) {
        var h = a[b + 0] + a[b + 8];
        var k = a[b + 0] - a[b + 8];
        var l = ((35468 * a[b + 4]) >> 16) - da(a[b + 12]);
        var m = da(a[b + 4]) + ((35468 * a[b + 12]) >> 16);
        g[e + 0] = h + m;
        g[e + 1] = k + l;
        g[e + 2] = k - l;
        g[e + 3] = h - m;
        e += 4;
        b++;
      }
      for (f = e = 0; 4 > f; ++f)
        (a = g[e + 0] + 4),
          (h = a + g[e + 8]),
          (k = a - g[e + 8]),
          (l = ((35468 * g[e + 4]) >> 16) - da(g[e + 12])),
          (m = da(g[e + 4]) + ((35468 * g[e + 12]) >> 16)),
          qa(c, d, 0, 0, h + m),
          qa(c, d, 1, 0, k + l),
          qa(c, d, 2, 0, k - l),
          qa(c, d, 3, 0, h - m),
          e++,
          (d += 32);
    }
    function Te(a, b, c, d) {
      var e = a[b + 0] + 4,
        f = (35468 * a[b + 4]) >> 16,
        g = da(a[b + 4]),
        h = (35468 * a[b + 1]) >> 16;
      a = da(a[b + 1]);
      kb(c, d, 0, e + g, a, h);
      kb(c, d, 1, e + f, a, h);
      kb(c, d, 2, e - f, a, h);
      kb(c, d, 3, e - g, a, h);
    }
    function Pe(a, b, c, d, e) {
      id(a, b, c, d);
      e && id(a, b + 16, c, d + 4);
    }
    function Qe(a, b, c, d) {
      Za(a, b + 0, c, d, 1);
      Za(a, b + 32, c, d + 128, 1);
    }
    function Re(a, b, c, d) {
      a = a[b + 0] + 4;
      var e;
      for (e = 0; 4 > e; ++e) for (b = 0;