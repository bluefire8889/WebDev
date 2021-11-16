/** @license
 *
 * jsPDF - PDF Document creation from JavaScript
 * Version 2.0.0 Built on 2020-08-11T07:57:54.902Z
 *                      CommitID 00000000
 *
 * Copyright (c) 2010-2020 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
 *               2015-2020 yWorks GmbH, http://www.yworks.com
 *               2015-2020 Lukas Holländer <lukas.hollaender@yworks.com>, https://github.com/HackbrettXXX
 *               2016-2018 Aras Abbasi <aras.abbasi@gmail.com>
 *               2010 Aaron Spike, https://github.com/acspike
 *               2012 Willow Systems Corporation, willow-systems.com
 *               2012 Pablo Hess, https://github.com/pablohess
 *               2012 Florian Jenett, https://github.com/fjenett
 *               2013 Warren Weckesser, https://github.com/warrenweckesser
 *               2013 Youssef Beddad, https://github.com/lifof
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2013 Stefan Slonevskiy, https://github.com/stefslon
 *               2013 Jeremy Morel, https://github.com/jmorel
 *               2013 Christoph Hartmann, https://github.com/chris-rock
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Makes, https://github.com/dollaruw
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Steven Spungin, https://github.com/Flamenco
 *               2014 Kenneth Glassey, https://github.com/Gavvers
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Contributor(s):
 *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
 *    kim3er, mfo, alnorth, Flamenco
 */

var globalObject = (function() {
  return "undefined" !== typeof window
    ? window
    : "undefined" !== typeof global
    ? global
    : "undefined" !== typeof self
    ? self
    : this;
})();

function consoleLog() {
  if (globalObject.console && typeof globalObject.console.log === "function") {
    globalObject.console.log.apply(globalObject.console, arguments);
  }
}

function consoleWarn(str) {
  if (globalObject.console) {
    if (typeof globalObject.console.warn === "function") {
      globalObject.console.warn.apply(globalObject.console, arguments);
    } else {
      consoleLog.call(null, arguments);
    }
  }
}

function consoleError(str) {
  if (globalObject.console) {
    if (typeof globalObject.console.error === "function") {
      globalObject.console.error.apply(globalObject.console, arguments);
    } else {
      consoleLog(str);
    }
  }
}
var console = {
  log: consoleLog,
  warn: consoleWarn,
  error: consoleError
};

/**
 * @license
 * FileSaver.js
 * A saveAs() FileSaver implementation.
 *
 * By Eli Grey, http://eligrey.com
 *
 * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
 * source  : http://purl.eligrey.com/github/FileSaver.js
 */

function bom(blob, opts) {
  if (typeof opts === "undefined") opts = { autoBom: false };
  else if (typeof opts !== "object") {
    console.warn("Deprecated: Expected third argument to be a object");
    opts = { autoBom: !opts };
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (
    opts.autoBom &&
    /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
      blob.type
    )
  ) {
    return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
  }
  return blob;
}

function download(url, name, opts) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = function() {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function() {
    console.error("could not download file");
  };
  xhr.send();
}

function corsEnabled(url) {
  var xhr = new XMLHttpRequest();
  // use sync to avoid popup blocker
  xhr.open("HEAD", url, false);
  try {
    xhr.send();
  } catch (e) {}
  return xhr.status >= 200 && xhr.status <= 299;
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null
    );
    node.dispatchEvent(evt);
  }
}

var saveAs =
  globalObject.saveAs ||
  // probably in some web worker
  (typeof window !== "object" || window !== globalObject
    ? function saveAs() {
        /* noop */
      }
    : // Use download attribute first if possible (#193 Lumia mobile)
    "download" in HTMLAnchorElement.prototype
    ? function saveAs(blob, name, opts) {
        var URL = globalObject.URL || globalObject.webkitURL;
        var a = document.createElement("a");
        name = name || blob.name || "download";

        a.download = name;
        a.rel = "noopener"; // tabnabbing

        // TODO: detect chrome extensions & packaged apps
        // a.target = '_blank'

        if (typeof blob === "string") {
          // Support regular links
          a.href = blob;
          if (a.origin !== location.origin) {
            corsEnabled(a.href)
              ? download(blob, name, opts)
              : click(a, (a.target = "_blank"));
          } else {
            click(a);
          }
        } else {
          // Support blobs
          a.href = URL.createObjectURL(blob);
          setTimeout(function() {
            URL.revokeObjectURL(a.href);
          }, 4e4); // 40s
          setTimeout(function() {
            click(a);
          }, 0);
        }
      }
    : // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in navigator
    ? function saveAs(blob, name, opts) {
        name = name || blob.name || "download";

        if (typeof blob === "string") {
          if (corsEnabled(blob)) {
            download(blob, name, opts);
          } else {
            var a = document.createElement("a");
            a.href = blob;
            a.target = "_blank";
            setTimeout(function() {
              click(a);
            });
          }
        } else {
          navigator.msSaveOrOpenBlob(bom(blob, opts), name);
        }
      }
    : // Fallback to using FileReader and a popup
      function saveAs(blob, name, opts, popup) {
        // Open a popup immediately do go around popup blocker
        // Mostly only available on user interaction and the fileReader is async so...
        popup = popup || open("", "_blank");
        if (popup) {
          popup.document.title = popup.document.body.innerText =
            "downloading...";
        }

        if (typeof blob === "string") return download(blob, name, opts);

        var force = blob.type === "application/octet-stream";
        var isSafari =
          /constructor/i.test(globalObject.HTMLElement) || globalObject.safari;
        var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

        if (
          (isChromeIOS || (force && isSafari)) &&
          typeof FileReader === "object"
        ) {
          // Safari doesn't allow downloading of blob URLs
          var reader = new FileReader();
          reader.onloadend = function() {
            var url = reader.result;
            url = isChromeIOS
              ? url
              : url.replace(/^data:[^;]*;/, "data:attachment/file;");
            if (popup) popup.location.href = url;
            else location = url;
            popup = null; // reverse-tabnabbing #460
          };
          reader.readAsDataURL(blob);
        } else {
          var URL = globalObject.URL || globalObject.webkitURL;
          var url = URL.createObjectURL(blob);
          if (popup) popup.location = url;
          else location.href = url;
          popup = null; // reverse-tabnabbing #460
          setTimeout(function() {
            URL.revokeObjectURL(url);
          }, 4e4); // 40s
        }
      });

/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */

function RGBColor(color_string) {
  color_string = color_string || "";
  this.ok = false;

  // strip any leading #
  if (color_string.charAt(0) == "#") {
    // remove # if any
    color_string = color_string.substr(1, 6);
  }

  color_string = color_string.replace(/ /g, "");
  color_string = color_string.toLowerCase();

  var channels;

  // before getting into regexps, try simple matches
  // and overwrite the input
  var simple_colors = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dodgerblue: "1e90ff",
    feldspar: "d19275",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgrey: "d3d3d3",
    lightgreen: "90ee90",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslateblue: "8470ff",
    lightslategray: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370d8",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "d87093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    violetred: "d02090",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
  };
  color_string = simple_colors[color_string] || color_string;

  // array of color definition objects
  var color_defs = [
    {
      re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
      process: function(bits) {
        return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
      }
    },
    {
      re: /^(\w{2})(\w{2})(\w{2})$/,
      example: ["#00ff00", "336699"],
      process: function(bits) {
        return [
          parseInt(bits[1], 16),
          parseInt(bits[2], 16),
          parseInt(bits[3], 16)
        ];
      }
    },
    {
      re: /^(\w{1})(\w{1})(\w{1})$/,
      example: ["#fb0", "f0f"],
      process: function(bits) {
        return [
          parseInt(bits[1] + bits[1], 16),
          parseInt(bits[2] + bits[2], 16),
          parseInt(bits[3] + bits[3], 16)
        ];
      }
    }
  ];

  // search through the definitions to find a match
  for (var i = 0; i < color_defs.length; i++) {
    var re = color_defs[i].re;
    var processor = color_defs[i].process;
    var bits = re.exec(color_string);
    if (bits) {
      channels = processor(bits);
      this.r = channels[0];
      this.g = channels[1];
      this.b = channels[2];
      this.ok = true;
    }
  }

  // validate/cleanup values
  this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
  this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
  this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;

  // some getters
  this.toRGB = function() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  };
  this.toHex = function() {
    var r = this.r.toString(16);
    var g = this.g.toString(16);
    var b = this.b.toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
  };
}

var atob, btoa;

(function() {
  atob = globalObject.atob;
  btoa = globalObject.btoa;
  return;

})();

/* eslint-disable no-console */

/**
 * jsPDF's Internal PubSub Implementation.
 * Backward compatible rewritten on 2014 by
 * Diego Casorran, https://github.com/diegocr
 *
 * @class
 * @name PubSub
 * @ignore
 */
function PubSub(context) {
  if (typeof context !== "object") {
    throw new Error(
      "Invalid Context passed to initialize PubSub (jsPDF-module)"
    );
  }
  var topics = {};

  this.subscribe = function(topic, callback, once) {
    once = once || false;
    if (
      typeof topic !== "string" ||
      typeof callback !== "function" ||
      typeof once !== "boolean"
    ) {
      throw new Error(
        "Invalid arguments passed to PubSub.subscribe (jsPDF-module)"
      );
    }

    if (!topics.hasOwnProperty(topic)) {
      topics[topic] = {};
    }

    var token = Math.random().toString(35);
    topics[topic][token] = [callback, !!once];

    return token;
  };

  this.unsubscribe = function(token) {
    for (var topic in topics) {
      if (topics[topic][token]) {
        delete topics[topic][token];
        if (Object.keys(topics[topic]).length === 0) {
          delete topics[topic];
        }
        return true;
      }
    }
    return false;
  };

  this.publish = function(topic) {
    if (topics.hasOwnProperty(topic)) {
      var args = Array.prototype.slice.call(arguments, 1),
        tokens = [];

      for (var token in topics[topic]) {
        var sub = topics[topic][token];
        try {
          sub[0].apply(context, args);
        } catch (ex) {
          if (globalObject.console) {
            console.error("jsPDF PubSub Error", ex.message, ex);
          }
        }
        if (sub[1]) tokens.push(token);
      }
      if (tokens.length) tokens.forEach(this.unsubscribe);
    }
  };

  this.getTopics = function() {
    return topics;
  };
}

function GState(parameters) {
  if (!(this instanceof GState)) {
    return new GState(parameters);
  }

  /**
   * @name GState#opacity
   * @type {any}
   */
  /**
   * @name GState#stroke-opacity
   * @type {any}
   */
  var supported = "opacity,stroke-opacity".split(",");
  for (var p in parameters) {
    if (parameters.hasOwnProperty(p) && supported.indexOf(p) >= 0) {
      this[p] = parameters[p];
    }
  }
  /**
   * @name GState#id
   * @type {string}
   */
  this.id = ""; // set by addGState()
  /**
   * @name GState#objectNumber
   * @type {number}
   */
  this.objectNumber = -1; // will be set by putGState()
}

GState.prototype.equals = function equals(other) {
  var ignore = "id,objectNumber,equals";
  var p;
  if (!other || typeof other !== typeof this) return false;
  var count = 0;
  for (p in this) {
    if (ignore.indexOf(p) >= 0) continue;
    if (this.hasOwnProperty(p) && !other.hasOwnProperty(p)) return false;
    if (this[p] !== other[p]) return false;
    count++;
  }
  for (p in other) {
    if (other.hasOwnProperty(p) && ignore.indexOf(p) < 0) count--;
  }
  return count === 0;
};

function Pattern(gState, matrix) {
  this.gState = gState;
  this.matrix = matrix;

  this.id = ""; // set by addPattern()
  this.objectNumber = -1; // will be set by putPattern()
}

function ShadingPattern(type, coords, colors, gState, matrix) {
  if (!(this instanceof ShadingPattern)) {
    return new ShadingPattern(type, coords, colors, gState, matrix);
  }

  // see putPattern() for information how they are realized
  this.type = type === "axial" ? 2 : 3;
  this.coords = coords;
  this.colors = colors;

  Pattern.call(this, gState, matrix);
}

function TilingPattern(boundingBox, xStep, yStep, gState, matrix) {
  if (!(this instanceof TilingPattern)) {
    return new TilingPattern(boundingBox, xStep, yStep, gState, matrix);
  }

  this.boundingBox = boundingBox;
  this.xStep = xStep;
  this.yStep = yStep;

  this.stream = ""; // set by endTilingPattern();

  this.cloneIndex = 0;

  Pattern.call(this, gState, matrix);
}

/**
 * Creates new jsPDF document object instance.
 * @name jsPDF
 * @class
 * @param {Object} [options] - Collection of settings initializing the jsPDF-instance
 * @param {string} [options.orientation=portrait] - Orientation of the first page. Possible values are "portrait" or "landscape" (or shortcuts "p" or "l").<br />
 * @param {string} [options.unit=mm] Measurement unit (base unit) to be used when coordinates are specified.<br />
 * Possible values are "pt" (points), "mm", "cm", "m", "in" or "px".
 * @param {string/Array} [options.format=a4] The format of the first page. Can be:<ul><li>a0 - a10</li><li>b0 - b10</li><li>c0 - c10</li><li>dl</li><li>letter</li><li>government-letter</li><li>legal</li><li>junior-legal</li><li>ledger</li><li>tabloid</li><li>credit-card</li></ul><br />
 * Default is "a4". If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array, e.g. [595.28, 841.89]
 * @param {boolean} [options.putOnlyUsedFonts=false] Only put fonts into the PDF, which were used.
 * @param {boolean} [options.compress=false] Compress the generated PDF.
 * @param {number} [options.precision=16] Precision of the element-positions.
 * @param {number} [options.userUnit=1.0] Not to be confused with the base unit. Please inform yourself before you use it.
 * @param {number|"smart"} [options.floatPrecision=16]
 * @returns {jsPDF} jsPDF-instance
 * @description
 * ```
 * {
 *  orientation: 'p',
 *  unit: 'mm',
 *  format: 'a4',
 *  putOnlyUsedFonts:true,
 *  floatPrecision: 16 // or "smart", default is 16
 * }
 * ```
 *
 * @constructor
 */
function jsPDF(options) {
  var orientation = typeof arguments[0] === "string" ? arguments[0] : "p";
  var unit = arguments[1];
  var format = arguments[2];
  var compressPdf = arguments[3];
  var filters = [];
  var userUnit = 1.0;
  var precision;
  var floatPrecision = 16;
  var defaultPathOperation = "S";

  options = options || {};

  if (typeof options === "object") {
    orientation = options.orientation;
    unit = options.unit || unit;
    format = options.format || format;
    compressPdf = options.compress || options.compressPdf || compressPdf;
    userUnit =
      typeof options.userUnit === "number" ? Math.abs(options.userUnit) : 1.0;
    if (typeof options.precision !== "undefined") {
      precision = options.precision;
    }
    if (typeof options.floatPrecision !== "undefined") {
      floatPrecision = options.floatPrecision;
    }
    defaultPathOperation = options.defaultPathOperation || "S";
  }

  filters =
    options.filters || (compressPdf === true ? ["FlateEncode"] : filters);

  unit = unit || "mm";
  orientation = ("" + (orientation || "P")).toLowerCase();
  var putOnlyUsedFonts = options.putOnlyUsedFonts || false;
  var usedFonts = {};

  var API = {
    internal: {},
    __private__: {}
  };

  API.__private__.PubSub = PubSub;

  var pdfVersion = "1.3";
  var getPdfVersion = (API.__private__.getPdfVersion = function() {
    return pdfVersion;
  });

  API.__private__.setPdfVersion = function(value) {
    pdfVersion = value;
  };

  // Size in pt of various paper formats
  var pageFormats = {
    a0: [2383.94, 3370.39],
    a1: [1683.78, 2383.94],
    a2: [1190.55, 1683.78],
    a3: [841.89, 1190.55],
    a4: [595.28, 841.89],
    a5: [419.53, 595.28],
    a6: [297.64, 419.53],
    a7: [209.76, 297.64],
    a8: [147.4, 209.76],
    a9: [104.88, 147.4],
    a10: [73.7, 104.88],
    b0: [2834.65, 4008.19],
    b1: [2004.09, 2834.65],
    b2: [1417.32, 2004.09],
    b3: [1000.63, 1417.32],
    b4: [708.66, 1000.63],
    b5: [498.9, 708.66],
    b6: [354.33, 498.9],
    b7: [249.45, 354.33],
    b8: [175.75, 249.45],
    b9: [124.72, 175.75],
    b10: [87.87, 124.72],
    c0: [2599.37, 3676.54],
    c1: [1836.85, 2599.37],
    c2: [1298.27, 1836.85],
    c3: [918.43, 1298.27],
    c4: [649.13, 918.43],
    c5: [459.21, 649.13],
    c6: [323.15, 459.21],
    c7: [229.61, 323.15],
    c8: [161.57, 229.61],
    c9: [113.39, 161.57],
    c10: [79.37, 113.39],
    dl: [311.81, 623.62],
    letter: [612, 792],
    "government-letter": [576, 756],
    legal: [612, 1008],
    "junior-legal": [576, 360],
    ledger: [1224, 792],
    tabloid: [792, 1224],
    "credit-card": [153, 243]
  };

  API.__private__.getPageFormats = function() {
    return pageFormats;
  };

  var getPageFormat = (API.__private__.getPageFormat = function(value) {
    return pageFormats[value];
  });

  format = format || "a4";

  var ApiMode = {
    COMPAT: "compat",
    ADVANCED: "advanced"
  };
  var apiMode = ApiMode.COMPAT;

  function advancedAPI() {
    // prepend global change of basis matrix
    // (Now, instead of converting every coordinate to the pdf coordinate system, we apply a matrix
    // that does this job for us (however, texts, images and similar objects must be drawn bottom up))
    this.saveGraphicsState();
    out(
      new Matrix(
        scaleFactor,
        0,
        0,
        -scaleFactor,
        0,
        getPageHeight() * scaleFactor
      ).toString() + " cm"
    );
    this.setFontSize(this.getFontSize() / scaleFactor);

    // The default in MrRio's implementation is "S" (stroke), whereas the default in the yWorks implementation
    // was "n" (none). Although this has nothing to do with transforms, we should use the API switch here.
    defaultPathOperation = "n";

    apiMode = ApiMode.ADVANCED;
  }

  function compatAPI() {
    this.restoreGraphicsState();
    defaultPathOperation = "S";
    apiMode = ApiMode.COMPAT;
  }

  /**
   * @callback ApiSwitchBody
   * @param {jsPDF} pdf
   */

  /**
   * For compatibility reasons jsPDF offers two API modes which differ in the way they convert between the the usual
   * screen coordinates and the PDF coordinate system.
   *   - "compat": Offers full compatibility across all plugins but does not allow arbitrary transforms
   *   - "advanced": Allows arbitrary transforms and more advanced features like pattern fills. Some plugins might
   *     not support this mode, though.
   * Initial mode is "compat".
   *
   * You can either provide a callback to the body argument, which means that jsPDF will automatically switch back to
   * the original API mode afterwards; or you can omit the callback and switch back manually using {@link compatAPI}.
   *
   * Note, that the calls to {@link saveGraphicsState} and {@link restoreGraphicsState} need to be balanced within the
   * callback or between calls of this method and its counterpart {@link compatAPI}. Calls to {@link beginFormObject}
   * or {@link beginTilingPattern} need to be closed by their counterparts before switching back to "compat" API mode.
   *
   * @param {ApiSwitchBody=} body When provided, this callback will be called after the API mode has been switched.
   * The API mode will be switched back automatically afterwards.
   * @returns {jsPDF}
   * @memberof jsPDF#
   * @name advancedAPI
   */
  API.advancedAPI = function(body) {
    var doSwitch = apiMode === ApiMode.COMPAT;

    if (doSwitch) {
      advancedAPI.call(this);
    }

    if (typeof body !== "function") {
      return this;
    }

    body(this);

    if (doSwitch) {
      compatAPI.call(this);
    }

    return this;
  };

  /**
   * Switches to "compat" API mode. See {@link advancedAPI} for more details.
   *
   * @param {ApiSwitchBody=} body When provided, this callback will be called after the API mode has been switched.
   * The API mode will be switched back automatically afterwards.
   * @return {jsPDF}
   * @memberof jsPDF#
   * @name compatApi
   */
  API.compatAPI = function(body) {
    var doSwitch = apiMode === ApiMode.ADVANCED;

    if (doSwitch) {
      compatAPI.call(this);
    }

    if (typeof body !== "function") {
      return this;
    }

    body(this);

    if (doSwitch) {
      advancedAPI.call(this);
    }

    return this;
  };

  /**
   * @return {boolean} True iff the current API mode is "advanced". See {@link advancedAPI}.
   * @memberof jsPDF#
   * @name isAdvancedAPI
   */
  API.isAdvancedAPI = function() {
    return apiMode === ApiMode.ADVANCED;
  };

  var advancedApiModeTrap = function(methodName) {
    if (apiMode !== ApiMode.ADVANCED) {
      throw new Error(
        methodName +
          " is only available in 'advanced' API mode. " +
          "You need to call advancedAPI() first."
      );
    }
  };

  var roundToPrecision = (API.roundToPrecision = API.__private__.roundToPrecision = function(
    number,
    parmPrecision
  ) {
    var tmpPrecision = precision || parmPrecision;
    if (isNaN(number) || isNaN(tmpPrecision)) {
      throw new Error("Invalid argument passed to jsPDF.roundToPrecision");
    }
    return number.toFixed(tmpPrecision).replace(/0+$/, "");
  });

  // high precision float
  var hpf;
  if (typeof floatPrecision === "number") {
    hpf = API.hpf = API.__private__.hpf = function(number) {
      if (isNaN(number)) {
        throw new Error("Invalid argument passed to jsPDF.hpf");
      }
      return roundToPrecision(number, floatPrecision);
    };
  } else if (floatPrecision === "smart") {
    hpf = API.hpf = API.__private__.hpf = function(number) {
      if (isNaN(number)) {
        throw new Error("Invalid argument passed to jsPDF.hpf");
      }
      if (number > -1 && number < 1) {
        return roundToPrecision(number, 16);
      } else {
        return roundToPrecision(number, 5);
      }
    };
  } else {
    hpf = API.hpf = API.__private__.hpf = function(number) {
      if (isNaN(number)) {
        throw new Error("Invalid argument passed to jsPDF.hpf");
      }
      return roundToPrecision(number, 16);
    };
  }
  var f2 = (API.f2 = API.__private__.f2 = function(number) {
    if (isNaN(number)) {
      throw new Error("Invalid argument passed to jsPDF.f2");
    }
    return roundToPrecision(number, 2);
  });

  var f3 = (API.__private__.f3 = function(number) {
    if (isNaN(number)) {
      throw new Error("Invalid argument passed to jsPDF.f3");
    }
    return roundToPrecision(number, 3);
  });

  var scale = (API.scale = API.__private__.scale = function(number) {
    if (isNaN(number)) {
      throw new Error("Invalid argument passed to jsPDF.scale");
    }
    if (apiMode === ApiMode.COMPAT) {
      return number * scaleFactor;
    } else if (apiMode === ApiMode.ADVANCED) {
      return number;
    }
  });

  var transformY = function(y) {
    if (apiMode === ApiMode.COMPAT) {
      return getPageHeight() - y;
    } else if (apiMode === ApiMode.ADVANCED) {
      return y;
    }
  };

  var transformScaleY = function(y) {
    return scale(transformY(y));
  };

  /**
   * @name setPrecision
   * @memberof jsPDF#
   * @function
   * @instance
   * @param {string} precision
   * @returns {jsPDF}
   */
  API.__private__.setPrecision = API.setPrecision = function(value) {
    if (typeof parseInt(value, 10) === "number") {
      precision = parseInt(value, 10);
    }
  };

  var fileId = "00000000000000000000000000000000";

  var getFileId = (API.__private__.getFileId = function() {
    return fileId;
  });

  var setFileId = (API.__private__.setFileId = function(value) {
    if (typeof value !== "undefined" && /^[a-fA-F0-9]{32}$/.test(value)) {
      fileId = value.toUpperCase();
    } else {
      fileId = fileId
        .split("")
        .map(function() {
          return "ABCDEF0123456789".charAt(Math.floor(Math.random() * 16));
        })
        .join("");
    }
    return fileId;
  });

  /**
   * @name setFileId
   * @memberof jsPDF#
   * @function
   * @instance
   * @param {string} value GUID.
   * @returns {jsPDF}
   */
  API.setFileId = function(value) {
    setFileId(value);
    return this;
  };

  /**
   * @name getFileId
   * @memberof jsPDF#
   * @function
   * @instance
   *
   * @returns {string} GUID.
   */
  API.getFileId = function() {
    return getFileId();
  };

  var creationDate;

  var convertDateToPDFDate = (API.__private__.convertDateToPDFDate = function(
    parmDate
  ) {
    var result = "";
    var tzoffset = parmDate.getTimezoneOffset(),
      tzsign = tzoffset < 0 ? "+" : "-",
      tzhour = Math.floor(Math.abs(tzoffset / 60)),
      tzmin = Math.abs(tzoffset % 60),
      timeZoneString = [tzsign, padd2(tzhour), "'", padd2(tzmin), "'"].join("");

    result = [
      "D:",
      parmDate.getFullYear(),
      padd2(parmDate.getMonth() + 1),
      padd2(parmDate.getDate()),
      padd2(parmDate.getHours()),
      padd2(parmDate.getMinutes()),
      padd2(parmDate.getSeconds()),
      timeZoneString
    ].join("");
    return result;
  });

  var convertPDFDateToDate = (API.__private__.convertPDFDateToDate = function(
    parmPDFDate
  ) {
    var year = parseInt(parmPDFDate.substr(2, 4), 10);
    var month = parseInt(parmPDFDate.substr(6, 2), 10) - 1;
    var date = parseInt(parmPDFDate.substr(8, 2), 10);
    var hour = parseInt(parmPDFDate.substr(10, 2), 10);
    var minutes = parseInt(parmPDFDate.substr(12, 2), 10);
    var seconds = parseInt(parmPDFDate.substr(14, 2), 10);
    // var timeZoneHour = parseInt(parmPDFDate.substr(16, 2), 10);
    // var timeZoneMinutes = parseInt(parmPDFDate.substr(20, 2), 10);

    var resultingDate = new Date(year, month, date, hour, minutes, seconds, 0);
    return resultingDate;
  });

  var setCreationDate = (API.__private__.setCreationDate = function(date) {
    var tmpCreationDateString;
    var regexPDFCreationDate = /^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/;
    if (typeof date === "undefined") {
      date = new Date();
    }

    if (date instanceof Date) {
      tmpCreationDateString = convertDateToPDFDate(date);
    } else if (regexPDFCreationDate.test(date)) {
      tmpCreationDateString = date;
    } else {
      throw new Error("Invalid argument passed to jsPDF.setCreationDate");
    }
    creationDate = tmpCreationDateString;
    return creationDate;
  });

  var getCreationDate = (API.__private__.getCreationDate = function(type) {
    var result = creationDate;
    if (type === "jsDate") {
      result = convertPDFDateToDate(creationDate);
    }
    return result;
  });

  /**
   * @name setCreationDate
   * @memberof jsPDF#
   * @function
   * @instance
   * @param {Object} date
   * @returns {jsPDF}
   */
  API.setCreationDate = function(date) {
    setCreationDate(date);
    return this;
  };

  /**
   * @name getCreationDate
   * @memberof jsPDF#
   * @function
   * @instance
   * @param {Object} type
   * @returns {Object}
   */
  API.getCreationDate = function(type) {
    return getCreationDate(type);
  };

  var padd2 = (API.__private__.padd2 = function(number) {
    return ("0" + parseInt(number)).slice(-2);
  });

  var padd2Hex = (API.__private__.padd2Hex = function(hexString) {
    hexString = hexString.toString();
    return ("00" + hexString).substr(hexString.length);
  });

  var objectNumber = 0; // 'n' Current object number
  var offsets = []; // List of offsets. Activated and reset by buildDocument(). Pupulated by various calls buildDocument makes.
  var content = [];
  var contentLength = 0;
  var additionalObjects = [];

  var pages = [];
  var currentPage;
  var hasCustomDestination = false;
  var outputDestination = content;

  var resetDocument = function() {
    //reset fields relevant for objectNumber generation and xref.
    objectNumber = 0;
    contentLength = 0;
    content = [];
    offsets = [];
    additionalObjects = [];

    rootDictionaryObjId = newObjectDeferred();
    resourceDictionaryObjId = newObjectDeferred();
  };

  API.__private__.setCustomOutputDestination = function(destination) {
    hasCustomDestination = true;
    outputDestination = destination;
  };
  var setOutputDestination = function(destination) {
    if (!hasCustomDestination) {
      outputDestination = destination;
    }
  };

  API.__private__.resetCustomOutputDestination = function() {
    hasCustomDestination = false;
    outputDestination = content;
  };

  var out = (API.__private__.out = function(string) {
    string = string.toString();
    contentLength += string.length + 1;
    outputDestination.push(string);

    return outputDestination;
  });

  var write = (API.__private__.write = function(value) {
    return out(
      arguments.length === 1
        ? value.toString()
        : Array.prototype.join.call(arguments, " ")
    );
  });

  var getArrayBuffer = (API.__private__.getArrayBuffer = function(data) {
    var len = data.length,
      ab = new ArrayBuffer(len),
      u8 = new Uint8Array(ab);

    while (len--) u8[len] = data.charCodeAt(len);
    return ab;
  });

  var standardFonts = [
    ["Helvetica", "helvetica", "normal", "WinAnsiEncoding"],
    ["Helvetica-Bold", "helvetica", "bold", "WinAnsiEncoding"],
    ["Helvetica-Oblique", "helvetica", "italic", "WinAnsiEncoding"],
    ["Helvetica-BoldOblique", "helvetica", "bolditalic", "WinAnsiEncoding"],
    ["Courier", "courier", "normal", "WinAnsiEncoding"],
    ["Courier-Bold", "courier", "bold", "WinAnsiEncoding"],
    ["Courier-Oblique", "courier", "italic", "WinAnsiEncoding"],
    ["Courier-BoldOblique", "courier", "bolditalic", "WinAnsiEncoding"],
    ["Times-Roman", "times", "normal", "WinAnsiEncoding"],
    ["Times-Bold", "times", "bold", "WinAnsiEncoding"],
    ["Times-Italic", "times", "italic", "WinAnsiEncoding"],
    ["Times-BoldItalic", "times", "bolditalic", "WinAnsiEncoding"],
    ["ZapfDingbats", "zapfdingbats", "normal", null],
    ["Symbol", "symbol", "normal", null]
  ];

  API.__private__.getStandardFonts = function() {
    return standardFonts;
  };

  var activeFontSize = options.fontSize || 16;

  /**
   * Sets font size for upcoming text elements.
   *
   * @param {number} size Font size in points.
   * @function
   * @instance
   * @returns {jsPDF}
   * @memberof jsPDF#
   * @name setFontSize
   */
  API.__private__.setFontSize = API.setFontSize = function(size) {
    if (apiMode === ApiMode.ADVANCED) {
      activeFontSize = size / scaleFactor;
    } else {
      activeFontSize = size;
    }
    return this;
  };

  /**
   * Gets the fontsize for upcoming text elements.
   *
   * @function
   * @instance
   * @returns {number}
   * @memberof jsPDF#
   * @name getFontSize
   */
  var getFontSize = (API.__private__.getFontSize = API.getFontSize = function() {
    if (apiMode === ApiMode.COMPAT) {
      return activeFontSize;
    } else {
      return activeFontSize * scaleFactor;
    }
  });

  var R2L = options.R2L || false;

  /**
   * Set value of R2L functionality.
   *
   * @param {boolean} value
   * @function
   * @instance
   * @returns {jsPDF} jsPDF-instance
   * @memberof jsPDF#
   * @name setR2L
   */
  API.__private__.setR2L = API.setR2L = function(value) {
    R2L = value;
    return this;
  };

  /**
   * Get value of R2L functionality.
   *
   * @function
   * @instance
   * @returns {boolean} jsPDF-instance
   * @memberof jsPDF#
   * @name getR2L
   */
  API.__private__.getR2L = API.getR2L = function() {
    return R2L;
  };

  var zoomMode; // default: 1;

  var setZoomMode = (API.__private__.setZoomMode = function(zoom) {
    var validZoomModes = [
      undefined,
      null,
      "fullwidth",
      "fullheight",
      "fullpage",
      "original"
    ];

    if (/^\d*\.?\d*%$/.test(zoom)) {
      zoomMode = zoom;
    } else if (!isNaN(zoom)) {
      zoomMode = parseInt(zoom, 10);
    } else if (validZoomModes.indexOf(zoom) !== -1) {
      zoomMode = zoom;
    } else {
      throw new Error(
        'zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "' +
          zoom +
          '" is not recognized.'
      );
    }
  });

  API.__private__.getZoomMode = function() {
    return zoomMode;
  };

  var pageMode; // default: 'UseOutlines';
  var setPageMode = (API.__private__.setPageMode = function(pmode) {
    var validPageModes = [
      undefined,
      null,
      "UseNone",
      "UseOutlines",
      "UseThumbs",
      "FullScreen"
    ];

    if (validPageModes.indexOf(pmode) == -1) {
      throw new Error(
        'Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "' +
          pmode +
          '" is not recognized.'
      );
    }
    pageMode = pmode;
  });

  API.__private__.getPageMode = function() {
    return pageMode;
  };

  var layoutMode; // default: 'continuous';
  var setLayoutMode = (API.__private__.setLayoutMode = function(layout) {
    var validLayoutModes = [
      undefined,
      null,
      "continuous",
      "single",
      "twoleft",
      "tworight",
      "two"
    ];

    if (validLayoutModes.indexOf(layout) == -1) {
      throw new Error(
        'Layout mode must be one of continuous, single, twoleft, tworight. "' +
          layout +
          '" is not recognized.'
      );
    }
    layoutMode = layout;
  });

  API.__private__.getLayoutMode = function() {
    return layoutMode;
  };

  /**
   * Set the display mode options of the page like zoom and layout.
   *
   * @name setDisplayMode
   * @memberof jsPDF#
   * @function
   * @instance
   * @param {integer|String} zoom   You can pass an integer or percentage as
   * a string. 2 will scale the document up 2x, '200%' will scale up by the
   * same amount. You can also set it to 'fullwidth', 'fullheight',
   * 'fullpage', or 'original'.
   *
   * Only certain PDF readers support this, such as Adobe Acrobat.
   *
   * @param {string} layout Layout mode can be: 'continuous' - this is the
   * default continuous scroll. 'single' - the single page mode only shows one
   * page at a time. 'twoleft' - two column left mode, first page starts on
   * the left, and 'tworight' - pages are laid out in two columns, with the
   * first page on the right. This would be used for books.
   * @param {string} pmode 'UseOutlines' - it shows the
   * outline of the document on the left. 'UseThumbs' - shows thumbnails along
   * the left. 'FullScreen' - prompts the user to enter fullscreen mode.
   *
   * @returns {jsPDF}
   */
  API.__private__.setDisplayMode = API.setDisplayMode = function(
    zoom,
    layout,
    pmode
  ) {
    setZoomMode(zoom);
    setLayoutMode(layout);
    setPageMode(pmode);
    return this;
  };

  var documentProperties = {
    title: "",
    subject: "",
    author: "",
    keywords: "",
    creator: ""
  };

  API.__private__.getDocumentProperty = function(key) {
    if (Object.keys(documentProperties).indexOf(key) === -1) {
      throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");
    }
    return documentProperties[key];
  };

  API.__private__.getDocumentProperties = function() {
    return documentProperties;
  };

  /**
   * Adds a properties to the PDF document.
   *
   * @param {Object} A property_name-to-property_value object structure.
   * @function
   * @instance
   * @returns {jsPDF}
   * @memberof jsPDF#
   * @name setDocumentProperties
   */
  API.__private__.setDocumentProperties = API.setProperties = API.setDocumentProperties = function(
    properties
  ) {
    // copying only those properties we can render.
    for (var property in documentProperties) {
      if (documentProperties.hasOwnProperty(property) && properties[property]) {
        documentProperties[property] = properties[property];
      }
    }
    return this;
  };

  API.__private__.setDocumentProperty = function(key, value) {
    if (Object.keys(documentProperties).indexOf(key) === -1) {
      throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");
    }
    return (documentProperties[key] = value);
  };

  var fonts = {}; // collection of font objects, where key is fontKey - a dynamically created label for a given font.
  var fontmap = {}; // mapping structure fontName > fontStyle > font key - performance layer. See addFont()
  var activeFontKey; // will be string representing the KEY of the font as combination of fontName + fontStyle
  var fontStateStack = []; //
  var patterns = {}; // collection of pattern objects
  var patternMap = {}; // see fonts
  var gStates = {}; // collection of graphic state objects
  var gStatesMap = {}; // see fonts
  var activeGState = null;
  var scaleFactor; // Scale factor
  var page = 0;
  var pagesContext = [];
  var events = new PubSub(API);
  var hotfixes = options.hotfixes || [];

  var renderTargets = {};
  var renderTargetMap = {};
  var renderTargetStack = [];
  var pageX;
  var pageY;
  var pageMatrix; // only used for FormObjects

  /**
   * A matrix object for 2D homogenous transformations: <br>
   * | a b 0 | <br>
   * | c d 0 | <br>
   * | e f 1 | <br>
   * pdf multiplies matrices righthand: v' = v x m1 x m2 x ...
   *
   * @class
   * @name Matrix
   * @param {number} sx
   * @param {number} shy
   * @param {number} shx
   * @param {number} sy
   * @param {number} tx
   * @param {number} ty
   * @constructor
   */
  var Matrix = function(sx, shy, shx, sy, tx, ty) {
    if (!(this instanceof Matrix)) {
      return new Matrix(sx, shy, shx, sy, tx, ty);
    }

    if (isNaN(sx)) sx = 1;
    if (isNaN(shy)) shy = 0;
    if (isNaN(shx)) shx = 0;
    if (isNaN(sy)) sy = 1;
    if (isNaN(tx)) tx = 0;
    if (isNaN(ty)) ty = 0;

    this._matrix = [sx, shy, shx, sy, tx, ty];
  };

  /**
   * @name sx
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "sx", {
    get: function() {
      return this._matrix[0];
    },
    set: function(value) {
      this._matrix[0] = value;
    }
  });

  /**
   * @name shy
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "shy", {
    get: function() {
      return this._matrix[1];
    },
    set: function(value) {
      this._matrix[1] = value;
    }
  });

  /**
   * @name shx
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "shx", {
    get: function() {
      return this._matrix[2];
    },
    set: function(value) {
      this._matrix[2] = value;
    }
  });

  /**
   * @name sy
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "sy", {
    get: function() {
      return this._matrix[3];
    },
    set: function(value) {
      this._matrix[3] = value;
    }
  });

  /**
   * @name tx
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "tx", {
    get: function() {
      return this._matrix[4];
    },
    set: function(value) {
      this._matrix[4] = value;
    }
  });

  /**
   * @name ty
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "ty", {
    get: function() {
      return this._matrix[5];
    },
    set: function(value) {
      this._matrix[5] = value;
    }
  });

  Object.defineProperty(Matrix.prototype, "a", {
    get: function() {
      return this._matrix[0];
    },
    set: function(value) {
      this._matrix[0] = value;
    }
  });

  Object.defineProperty(Matrix.prototype, "b", {
    get: function() {
      return this._matrix[1];
    },
    set: function(value) {
      this._matrix[1] = value;
    }
  });

  Object.defineProperty(Matrix.prototype, "c", {
    get: function() {
      return this._matrix[2];
    },
    set: function(value) {
      this._matrix[2] = value;
    }
  });

  Object.defineProperty(Matrix.prototype, "d", {
    get: function() {
      return this._matrix[3];
    },
    set: function(value) {
      this._matrix[3] = value;
    }
  });

  Object.defineProperty(Matrix.prototype, "e", {
    get: function() {
      return this._matrix[4];
    },
    set: function(value) {
      this._matrix[4] = value;
    }
  });

  Object.defineProperty(Matrix.prototype, "f", {
    get: function() {
      return this._matrix[5];
    },
    set: function(value) {
      this._matrix[5] = value;
    }
  });

  /**
   * @name rotation
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "rotation", {
    get: function() {
      return Math.atan2(this.shx, this.sx);
    }
  });

  /**
   * @name scaleX
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "scaleX", {
    get: function() {
      return this.decompose().scale.sx;
    }
  });

  /**
   * @name scaleY
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "scaleY", {
    get: function() {
      return this.decompose().scale.sy;
    }
  });

  /**
   * @name isIdentity
   * @memberof Matrix#
   */
  Object.defineProperty(Matrix.prototype, "isIdentity", {
    get: function() {
      if (this.sx !== 1) {
        return false;
      }
      if (this.shy !== 0) {
        return false;
      }
      if (this.shx !== 0) {
        return false;
      }
      if (this.sy !== 1) {
        return false;
      }
      if (this.tx !== 0) {
        return false;
      }
      if (this.ty !== 0) {
        return false;
      }
      return true;
    }
  });

  /**
   * Join the Matrix Values to a String
   *
   * @function join
   * @param {string} separator Specifies a string to separate each pair of adjacent elements of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma (","). If separator is an empty string, all elements are joined without any characters in between them.
   * @returns {string} A string with all array elements joined.
   * @memberof Matrix#
   */
  Matrix.prototype.join = function(separator) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty]
      .map(hpf)
      .join(separator);
  };

  /**
   * Multiply the matrix with given Matrix
   *
   * @function multiply
   * @param matrix
   * @returns {Matrix}
   * @memberof Matrix#
   */
  Matrix.prototype.multiply = function(matrix) {
    var sx = matrix.sx * this.sx + matrix.shy * this.shx;
    var shy = matrix.sx * this.shy + matrix.shy * this.sy;
    var shx = matrix.shx * this.sx + matrix.sy * this.shx;
    var sy = matrix.shx * this.shy + matrix.sy * this.sy;
    var tx = matrix.tx * this.sx + matrix.ty * this.shx + this.tx;
    var ty = matrix.tx * this.shy + matrix.ty * this.sy + this.ty;

    return new Matrix(sx, shy, shx, sy, tx, ty);
  };

  /**
   * @function decompose
   * @memberof Matrix#
   */
  Matrix.prototype.decompose = function() {
    var a = this.sx;
    var b = this.shy;
    var c = this.shx;
    var d = this.sy;
    var e = this.tx;
    var f = this.ty;

    var scaleX = Math.sqrt(a * a + b * b);
    a /= scaleX;
    b /= scaleX;

    var shear = a * c + b * d;
    c -= a * shear;
    d -= b * shear;

    var scaleY = Math.sqrt(c * c + d * d);
    c /= scaleY;
    d /= scaleY;
    shear /= scaleY;

    if (a * d < b * c) {
      a = -a;
      b = -b;
      shear = -shear;
      scaleX = -scaleX;
    }

    return {
      scale: new Matrix(scaleX, 0, 0, scaleY, 0, 0),
      translate: new Matrix(1, 0, 0, 1, e, f),
      rotate: new Matrix(a, b, -b, a, 0, 0),
      skew: new Matrix(1, 0, shear, 1, 0, 0)
    };
  };

  /**
   * @function toString
   * @memberof Matrix#
   */
  Matrix.prototype.toString = function(parmPrecision) {
    return this.join(" ");
  };

  /**
   * @function inversed
   * @memberof Matrix#
   */
  Matrix.prototype.inversed = function() {
    var a = this.sx,
      b = this.shy,
      c = this.shx,
      d = this.sy,
      e = this.tx,
      f = this.ty;

    var quot = 1 / (a * d - b * c);

    var aInv = d * quot;
    var bInv = -b * quot;
    var cInv = -c * quot;
    var dInv = a * quot;
    var eInv = -aInv * e - cInv * f;
    var fInv = -bInv * e - dInv * f;

    return new Matrix(aInv, bInv, cInv, dInv, eInv, fInv);
  };

  /**
   * @function applyToPoint
   * @memberof Matrix#
   */
  Matrix.prototype.applyToPoint = function(pt) {
    var x = pt.x * this.sx + pt.y * this.shx + this.tx;
    var y = pt.x * this.shy + pt.y * this.sy + this.ty;
    return new Point(x, y);
  };

  /**
   * @function applyToRectangle
   * @memberof Matrix#
   */
  Matrix.prototype.applyToRectangle = function(rect) {
    var pt1 = this.applyToPoint(rect);
    var pt2 = this.applyToPoint(new Point(rect.x + rect.w, rect.y + rect.h));
    return new Rectangle(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
  };

  /**
   * Clone the Matrix
   *
   * @function clone
   * @memberof Matrix#
   * @name clone
   * @instance
   */
  Matrix.prototype.clone = function() {
    var sx = this.sx;
    var shy = this.shy;
    var shx = this.shx;
    var sy = this.sy;
    var tx = this.tx;
    var ty = this.ty;

    return new Matrix(sx, shy, shx, sy, tx, ty);
  };

  API.Matrix = Matrix;

  /**
   * Multiplies two matrices. (see {@link Matrix})
   * @param {Matrix} m1
   * @param {Matrix} m2
   * @memberof jsPDF#
   * @name matrixMult
   */
  var matrixMult = (API.matrixMult = function(m1, m2) {
    return m2.multiply(m1);
  });

  /**
   * The identity matrix (equivalent to new Matrix(1, 0, 0, 1, 0, 0)).
   * @type {Matrix}
   * @memberof! jsPDF#
   * @name identityMatrix
   */
  var identityMatrix = new Matrix(1, 0, 0, 1, 0, 0);
  API.unitMatrix = API.identityMatrix = identityMatrix;

  /**
   * Adds a new pattern for later use.
   * @param {String} key The key by it can be referenced later. The keys must be unique!
   * @param {API.Pattern} pattern The pattern
   */
  var addPattern = function(key, pattern) {
    // only add it if it is not already present (the keys provided by the user must be unique!)
    if (patternMap[key]) return;

    var prefix = pattern instanceof ShadingPattern ? "Sh" : "P";
    var patternKey = prefix + (Object.keys(patterns).length + 1).toString(10);
    pattern.id = patternKey;

    patternMap[key] = patternKey;
    patterns[patternKey] = pattern;

    events.publish("addPattern", pattern);
  };

  /**
   * A pattern describing a shading pattern.
   *
   * Only available in "advanced" API mode.
   *
   * @param {String} type One of "axial" or "radial"
   * @param {Array<Number>} coords Either [x1, y1, x2, y2] for "axial" type describing the two interpolation points
   * or [x1, y1, r, x2, y2, r2] for "radial" describing inner and the outer circle.
   * @param {Array<Object>} colors An array of objects with the fields "offset" and "color". "offset" describes
   * the offset in parameter space [0, 1]. "color" is an array of length 3 describing RGB values in [0, 255].
   * @param {GState=} gState An additional graphics state that gets applied to the pattern (optional).
   * @param {Matrix=} matrix A matrix that describes the transformation between the pattern coordinate system
   * and the use coordinate system (optional).
   * @constructor
   * @extends API.Pattern
   */
  API.ShadingPattern = ShadingPattern;

  /**
   * A PDF Tiling pattern.
   *
   * Only available in "advanced" API mode.
   *
   * @param {Array.<Number>} boundingBox The bounding box at which one pattern cell gets clipped.
   * @param {Number} xStep Horizontal spacing between pattern cells.
   * @param {Number} yStep Vertical spacing between pattern cells.
   * @param {API.GState=} gState An additional graphics state that gets applied to the pattern (optional).
   * @param {Matrix=} matrix A matrix that describes the transformation between the pattern coordinate system
   * and the use coordinate system (optional).
   * @constructor
   * @extends API.Pattern
   */
  API.TilingPattern = TilingPattern;

  /**
   * Adds a new {@link API.ShadingPattern} for later use. Only available in "advanced" API mode.
   * @param {String} key
   * @param {Pattern} pattern
   * @function
   * @returns {jsPDF}
   * @memberof jsPDF#
   * @name addPattern
   */
  API.addShadingPattern = function(key, pattern) {
    advancedApiModeTrap("addShadingPattern()");

    addPattern(key, pattern);
    return this;
  };

  /**
   * Begins a new tiling pattern. All subsequent render calls are drawn to this pattern until {@link API.endTilingPattern}
   * gets called. Only available in "advanced" API mode.
   * @param {API.Pattern} pattern
   * @memberof jsPDF#
   * @name beginTilingPattern
   */
  API.beginTilingPattern = function(pattern) {
    advancedApiModeTrap("beginTilingPattern()");

    beginNewRenderTarget(
      pattern.boundingBox[0],
      pattern.boundingBox[1],
      pattern.boundingBox[2] - pattern.boundingBox[0],
      pattern.boundingBox[3] - pattern.boundingBox[1],
      pattern.matrix
    );
  };

  /**
   * Ends a tiling pattern and sets the render target to the one active before {@link API.beginTilingPattern} has been called.
   *
   * Only available in "advanced" API mode.
   *
   * @param {string} key A unique key that is used to reference this pattern at later use.
   * @param {API.Pattern} pattern The pattern to end.
   * @memberof jsPDF#
   * @name endTilingPattern
   */
  API.endTilingPattern = function(key, pattern) {
    advancedApiModeTrap("endTilingPattern()");

    // retrieve the stream
    pattern.stream = pages[currentPage].join("\n");

    addPattern(key, pattern);

    events.publish("endTilingPattern", pattern);

    // restore state from stack
    renderTargetStack.pop().restore();
  };

  var newObject = (API.__private__.newObject = function() {
    var oid = newObjectDeferred();
    newObjectDeferredBegin(oid, true);
    return oid;
  });

  // Does not output the object.  The caller must call newObjectDeferredBegin(oid) before outputing any data
  var newObjectDeferred = (API.__private__.newObjectDeferred = function() {
    objectNumber++;
    offsets[objectNumber] = function() {
      return contentLength;
    };
    return objectNumber;
  });

  var newObjectDeferredBegin = function(oid, doOutput) {
    doOutput = typeof doOutput === "boolean" ? doOutput : false;
    offsets[oid] = contentLength;
    if (doOutput) {
      out(oid + " 0 obj");
    }
    return oid;
  };
  // Does not output the object until after the pages have been output.
  // Returns an object containing the objectId and content.
  // All pages have been added so the object ID can be estimated to start right after.
  // This does not modify the current objectNumber;  It must be updated after the newObjects are output.
  var newAdditionalObject = (API.__private__.newAdditionalObject = function() {
    var objId = newObjectDeferred();
    var obj = {
      objId: objId,
      content: ""
    };
    additionalObjects.push(obj);
    return obj;
  });

  var rootDictionaryObjId = newObjectDeferred();
  var resourceDictionaryObjId = newObjectDeferred();

  /////////////////////
  // Private functions
  /////////////////////

  var decodeColorString = (API.__private__.decodeColorString = function(color) {
    var colorEncoded = color.split(" ");
    if (
      colorEncoded.length === 2 &&
      (colorEncoded[1] === "g" || colorEncoded[1] === "G")
    ) {
      // convert grayscale value to rgb so that it can be converted to hex for consistency
      var floatVal = parseFloat(colorEncoded[0]);
      colorEncoded = [floatVal, floatVal, floatVal, "r"];
    } else if (
      colorEncoded.length === 5 &&
      (colorEncoded[4] === "k" || colorEncoded[4] === "K")
    ) {
      // convert CMYK values to rbg so that it can be converted to hex for consistency
      var red = (1.0 - colorEncoded[0]) * (1.0 - colorEncoded[3]);
      var green = (1.0 - colorEncoded[1]) * (1.0 - colorEncoded[3]);
      var blue = (1.0 - colorEncoded[2]) * (1.0 - colorEncoded[3]);

      colorEncoded = [red, green, blue, "r"];
    }
    var colorAsRGB = "#";
    for (var i = 0; i < 3; i++) {
      colorAsRGB += (
        "0" + Math.floor(parseFloat(colorEncoded[i]) * 255).toString(16)
      ).slice(-2);
    }
    return colorAsRGB;
  });

  var encodeColorString = (API.__private__.encodeColorString = function(
    options
  ) {
    var color;

    if (typeof options === "string") {
      options = {
        ch1: options
      };
    }
    var ch1 = options.ch1;
    var ch2 = options.ch2;
    var ch3 = options.ch3;
    var ch4 = options.ch4;
    var letterArray =
      options.pdfColorType === "draw" ? ["G", "RG", "K"] : ["g", "rg", "k"];

    if (typeof ch1 === "string" && ch1.charAt(0) !== "#") {
      var rgbColor = new RGBColor(ch1);
      if (rgbColor.ok) {
        ch1 = rgbColor.toHex();
      } else if (!/^\d*\.?\d*$/.test(ch1)) {
        throw new Error(
          'Invalid color "' + ch1 + '" passed to jsPDF.encodeColorString.'
        );
      }
    }
    //convert short rgb to long form
    if (typeof ch1 === "string" && /^#[0-9A-Fa-f]{3}$/.test(ch1)) {
      ch1 = "#" + ch1[1] + ch1[1] + ch1[2] + ch1[2] + ch1[3] + ch1[3];
    }

    if (typeof ch1 === "string" && /^#[0-9A-Fa-f]{6}$/.test(ch1)) {
      var hex = parseInt(ch1.substr(1), 16);
      ch1 = (hex >> 16) & 255;
      ch2 = (hex >> 8) & 255;
      ch3 = hex & 255;
    }

    if (
      typeof ch2 === "undefined" ||
      (typeof ch4 === "undefined" && ch1 === ch2 && ch2 === ch3)
    ) {
      // Gray color space.
      if (typeof ch1 === "string") {
        color = ch1 + " " + letterArray[0];
      } else {
        switch (options.precision) {
          case 2:
            color = f2(ch1 / 255) + " " + letterArray[0];
            break;
          case 3:
          default:
            color = f3(ch1 / 255) + " " + letterArray[0];
        }
      }
    } else if (typeof ch4 === "undefined" || typeof ch4 === "object") {
      // assume RGBA
      if (ch4 && !isNaN(ch4.a)) {
        //TODO Implement transparency.
        //WORKAROUND use white for now, if transparent, otherwise handle as rgb
        if (ch4.a === 0) {
          color = ["1.", "1.", "1.", letterArray[1]].join(" ");
          return color;
        }
      }
      // assume RGB
      if (typeof ch1 === "string") {
        color = [ch1, ch2, ch3, letterArray[1]].join(" ");
      } else {
        switch (options.precision) {
          case 2:
            color = [
              f2(ch1 / 255),
              f2(ch2 / 255),
              f2(ch3 / 255),
              letterArray[1]
            ].join(" ");
            break;
          default:
          case 3:
            color = [
              f3(ch1 / 255),
              f3(ch2 / 255),
              f3(ch3 / 255),
              letterArray[1]
            ].join(" ");
        }
      }
    } else {
      // assume CMYK
      if (typeof ch1 === "string") {
        color = [ch1, ch2, ch3, ch4, letterArray[2]].join(" ");
      } else {
        switch (options.precision) {
          case 2:
            color = [f2(ch1), f2(ch2), f2(ch3), f2(ch4), letterArray[2]].join(
              " "
            );
            break;
          case 3:
          default:
            color = [f3(ch1), f3(ch2), f3(ch3), f3(ch4), letterArray[2]].join(
              " "
            );
        }
      }
    }
    return color;
  });

  var getFilters = (API.__private__.getFilters = function() {
    return filters;
  });

  var putStream = (API.__private__.putStream = function(options) {
    options = options || {};
    var data = options.data || "";
    var filters = options.filters || getFilters();
    var alreadyAppliedFilters = options.alreadyAppliedFilters || [];
    var addLength1 = options.addLength1 || false;
    var valueOfLength1 = data.length;

    var processedData = {};
    if (filters === true) {
      filters = ["FlateEncode"];
    }
    var keyValues = options.additionalKeyValues || [];
    if (typeof jsPDF.API.processDataByFilters !== "undefined") {
      processedData = jsPDF.API.processDataByFilters(data, filters);
    } else {
      processedData = { data: data, reverseChain: [] };
    }
    var filterAsString =
      processedData.reverseChain +
      (Array.isArray(alreadyAppliedFilters)
        ? alreadyAppliedFilters.join(" ")
        : alreadyAppliedFilters.toString());

    if (processedData.data.length !== 0) {
      keyValues.push({
        key: "Length",
        value: processedData.data.length
      });
      if (addLength1 === true) {
        keyValues.push({
          key: "Length1",
          value: valueOfLength1
        });
      }
    }

    if (filterAsString.length != 0) {
      if (filterAsString.split("/").length - 1 === 1) {
        keyValues.push({
          key: "Filter",
          value: filterAsString
        });
      } else {
        keyValues.push({
          key: "Filter",
          value: "[" + filterAsString + "]"
        });

        for (var j = 0; j < keyValues.length; j += 1) {
          if (keyValues[j].key === "DecodeParms") {
            var decodeParmsArray = [];

            for (
              var i = 0;
              i < processedData.reverseChain.split("/").length - 1;
              i += 1
            ) {
              decodeParmsArray.push("null");
            }

            decodeParmsArray.push(keyValues[j].value);
            keyValues[j].value = "[" + decodeParmsArray.join(" ") + "]";
          }
        }
      }
    }

    out("<<");
    for (var k = 0; k < keyValues.length; k++) {
      out("/" + keyValues[k].key + " " + keyValues[k].value);
    }
    out(">>");
    if (processedData.data.length !== 0) {
      out("stream");
      out(processedData.data);
      out("endstream");
    }
  });

  var putPage = (API.__private__.putPage = function(page) {
    var pageNumber = page.number;
    var data = page.data;
    var pageObjectNumber = page.objId;
    var pageContentsObjId = page.contentsObjId;

    newObjectDeferredBegin(pageObjectNumber, true);
    out("<</Type /Page");
    out("/Parent " + page.rootDictionaryObjId + " 0 R");
    out("/Resources " + page.resourceDictionaryObjId + " 0 R");
    out(
      "/MediaBox [" +
        parseFloat(hpf(page.mediaBox.bottomLeftX)) +
        " " +
        parseFloat(hpf(page.mediaBox.bottomLeftY)) +
        " " +
        hpf(page.mediaBox.topRightX) +
        " " +
        hpf(page.mediaBox.topRightY) +
        "]"
    );
    if (page.cropBox !== null) {
      out(
        "/CropBox [" +
          hpf(page.cropBox.bottomLeftX) +
          " " +
          hpf(page.cropBox.bottomLeftY) +
          " " +
          hpf(page.cropBox.topRightX) +
          " " +
          hpf(page.cropBox.topRightY) +
          "]"
      );
    }

    if (page.bleedBox !== null) {
      out(
        "/BleedBox [" +
          hpf(page.bleedBox.bottomLeftX) +
          " " +
          hpf(page.bleedBox.bottomLeftY) +
          " " +
          hpf(page.bleedBox.topRightX) +
          " " +
          hpf(page.bleedBox.topRightY) +
          "]"
      );
    }

    if (page.trimBox !== null) {
      out(
        "/TrimBox [" +
          