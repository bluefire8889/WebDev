/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2019 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */

(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd)
    define("pdfjs-dist/build/pdf", [], factory);
  else if (typeof exports === "object")
    exports["pdfjs-dist/build/pdf"] = factory();
  else root["pdfjs-dist/build/pdf"] = root.pdfjsLib = factory();
})(this, function() {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __w_pdfjs_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {}
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __w_pdfjs_require__
      ); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __w_pdfjs_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __w_pdfjs_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __w_pdfjs_require__.d = function(exports, name, getter) {
      /******/ if (!__w_pdfjs_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __w_pdfjs_require__.r = function(exports) {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module"
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __w_pdfjs_require__.t = function(
      value,
      mode
    ) {
      /******/ if (mode & 1) value = __w_pdfjs_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (
        mode & 4 &&
        typeof value === "object" &&
        value &&
        value.__esModule
      )
        return value;
      /******/ var ns = Object.create(null);
      /******/ __w_pdfjs_require__.r(ns);
      /******/ Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value
      });
      /******/ if (mode & 2 && typeof value != "string")
        for (var key in value)
          __w_pdfjs_require__.d(
            ns,
            key,
            function(key) {
              return value[key];
            }.bind(null, key)
          );
      /******/ return ns;
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __w_pdfjs_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module["default"];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __w_pdfjs_require__.d(getter, "a", getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __w_pdfjs_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __w_pdfjs_require__.p = ""; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __w_pdfjs_require__((__w_pdfjs_require__.s = 0));
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var pdfjsVersion = "2.2.93";
        var pdfjsBuild = "9b5a937f";

        var pdfjsSharedUtil = __w_pdfjs_require__(1);

        var pdfjsDisplayAPI = __w_pdfjs_require__(147);

        var pdfjsDisplayTextLayer = __w_pdfjs_require__(163);

        var pdfjsDisplayAnnotationLayer = __w_pdfjs_require__(164);

        var pdfjsDisplayDisplayUtils = __w_pdfjs_require__(152);

        var pdfjsDisplaySVG = __w_pdfjs_require__(165);

        var pdfjsDisplayWorkerOptions = __w_pdfjs_require__(157);

        var pdfjsDisplayAPICompatibility = __w_pdfjs_require__(154);

        {
          var isNodeJS = __w_pdfjs_require__(4);

          if (isNodeJS()) {
            var PDFNodeStream = __w_pdfjs_require__(166).PDFNodeStream;

            pdfjsDisplayAPI.setPDFNetworkStreamFactory(function(params) {
              return new PDFNodeStream(params);
            });
          } else {
            var PDFNetworkStream = __w_pdfjs_require__(169).PDFNetworkStream;

            var PDFFetchStream;

            if (pdfjsDisplayDisplayUtils.isFetchSupported()) {
              PDFFetchStream = __w_pdfjs_require__(170).PDFFetchStream;
            }

            pdfjsDisplayAPI.setPDFNetworkStreamFactory(function(params) {
              if (
                PDFFetchStream &&
                pdfjsDisplayDisplayUtils.isValidFetchUrl(params.url)
              ) {
                return new PDFFetchStream(params);
              }

              return new PDFNetworkStream(params);
            });
          }
        }
        exports.build = pdfjsDisplayAPI.build;
        exports.version = pdfjsDisplayAPI.version;
        exports.getDocument = pdfjsDisplayAPI.getDocument;
        exports.LoopbackPort = pdfjsDisplayAPI.LoopbackPort;
        exports.PDFDataRangeTransport = pdfjsDisplayAPI.PDFDataRangeTransport;
        exports.PDFWorker = pdfjsDisplayAPI.PDFWorker;
        exports.renderTextLayer = pdfjsDisplayTextLayer.renderTextLayer;
        exports.AnnotationLayer = pdfjsDisplayAnnotationLayer.AnnotationLayer;
        exports.createPromiseCapability =
          pdfjsSharedUtil.createPromiseCapability;
        exports.PasswordResponses = pdfjsSharedUtil.PasswordResponses;
        exports.InvalidPDFException = pdfjsSharedUtil.InvalidPDFException;
        exports.MissingPDFException = pdfjsSharedUtil.MissingPDFException;
        exports.SVGGraphics = pdfjsDisplaySVG.SVGGraphics;
        exports.NativeImageDecoding = pdfjsSharedUtil.NativeImageDecoding;
        exports.CMapCompressionType = pdfjsSharedUtil.CMapCompressionType;
        exports.PermissionFlag = pdfjsSharedUtil.PermissionFlag;
        exports.UnexpectedResponseException =
          pdfjsSharedUtil.UnexpectedResponseException;
        exports.OPS = pdfjsSharedUtil.OPS;
        exports.VerbosityLevel = pdfjsSharedUtil.VerbosityLevel;
        exports.UNSUPPORTED_FEATURES = pdfjsSharedUtil.UNSUPPORTED_FEATURES;
        exports.createValidAbsoluteUrl = pdfjsSharedUtil.createValidAbsoluteUrl;
        exports.createObjectURL = pdfjsSharedUtil.createObjectURL;
        exports.removeNullCharacters = pdfjsSharedUtil.removeNullCharacters;
        exports.shadow = pdfjsSharedUtil.shadow;
        exports.Util = pdfjsSharedUtil.Util;
        exports.ReadableStream = pdfjsSharedUtil.ReadableStream;
        exports.URL = pdfjsSharedUtil.URL;
        exports.RenderingCancelledException =
          pdfjsDisplayDisplayUtils.RenderingCancelledException;
        exports.getFilenameFromUrl =
          pdfjsDisplayDisplayUtils.getFilenameFromUrl;
        exports.LinkTarget = pdfjsDisplayDisplayUtils.LinkTarget;
        exports.addLinkAttributes = pdfjsDisplayDisplayUtils.addLinkAttributes;
        exports.loadScript = pdfjsDisplayDisplayUtils.loadScript;
        exports.GlobalWorkerOptions =
          pdfjsDisplayWorkerOptions.GlobalWorkerOptions;
        exports.apiCompatibilityParams =
          pdfjsDisplayAPICompatibility.apiCompatibilityParams;

        /***/
      },
      /* 1 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.arrayByteLength = arrayByteLength;
        exports.arraysToBytes = arraysToBytes;
        exports.assert = assert;
        exports.bytesToString = bytesToString;
        exports.createPromiseCapability = createPromiseCapability;
        exports.getVerbosityLevel = getVerbosityLevel;
        exports.info = info;
        exports.isArrayBuffer = isArrayBuffer;
        exports.isArrayEqual = isArrayEqual;
        exports.isBool = isBool;
        exports.isEmptyObj = isEmptyObj;
        exports.isNum = isNum;
        exports.isString = isString;
        exports.isSpace = isSpace;
        exports.isSameOrigin = isSameOrigin;
        exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
        exports.isLittleEndian = isLittleEndian;
        exports.isEvalSupported = isEvalSupported;
        exports.log2 = log2;
        exports.readInt8 = readInt8;
        exports.readUint16 = readUint16;
        exports.readUint32 = readUint32;
        exports.removeNullCharacters = removeNullCharacters;
        exports.setVerbosityLevel = setVerbosityLevel;
        exports.shadow = shadow;
        exports.string32 = string32;
        exports.stringToBytes = stringToBytes;
        exports.stringToPDFString = stringToPDFString;
        exports.stringToUTF8String = stringToUTF8String;
        exports.utf8StringToString = utf8StringToString;
        exports.warn = warn;
        exports.unreachable = unreachable;
        Object.defineProperty(exports, "ReadableStream", {
          enumerable: true,
          get: function get() {
            return _streams_polyfill.ReadableStream;
          }
        });
        Object.defineProperty(exports, "URL", {
          enumerable: true,
          get: function get() {
            return _url_polyfill.URL;
          }
        });
        exports.createObjectURL = exports.FormatError = exports.Util = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.NativeImageDecoding = exports.MissingPDFException = exports.InvalidPDFException = exports.AbortException = exports.CMapCompressionType = exports.ImageKind = exports.FontType = exports.AnnotationType = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.UNSUPPORTED_FEATURES = exports.VerbosityLevel = exports.OPS = exports.IDENTITY_MATRIX = exports.FONT_IDENTITY_MATRIX = void 0;

        __w_pdfjs_require__(2);

        var _streams_polyfill = __w_pdfjs_require__(143);

        var _url_polyfill = __w_pdfjs_require__(145);

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        var IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
        exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
        var FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
        exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
        var NativeImageDecoding = {
          NONE: "none",
          DECODE: "decode",
          DISPLAY: "display"
        };
        exports.NativeImageDecoding = NativeImageDecoding;
        var PermissionFlag = {
          PRINT: 0x04,
          MODIFY_CONTENTS: 0x08,
          COPY: 0x10,
          MODIFY_ANNOTATIONS: 0x20,
          FILL_INTERACTIVE_FORMS: 0x100,
          COPY_FOR_ACCESSIBILITY: 0x200,
          ASSEMBLE: 0x400,
          PRINT_HIGH_QUALITY: 0x800
        };
        exports.PermissionFlag = PermissionFlag;
        var TextRenderingMode = {
          FILL: 0,
          STROKE: 1,
          FILL_STROKE: 2,
          INVISIBLE: 3,
          FILL_ADD_TO_PATH: 4,
          STROKE_ADD_TO_PATH: 5,
          FILL_STROKE_ADD_TO_PATH: 6,
          ADD_TO_PATH: 7,
          FILL_STROKE_MASK: 3,
          ADD_TO_PATH_FLAG: 4
        };
        exports.TextRenderingMode = TextRenderingMode;
        var ImageKind = {
          GRAYSCALE_1BPP: 1,
          RGB_24BPP: 2,
          RGBA_32BPP: 3
        };
        exports.ImageKind = ImageKind;
        var AnnotationType = {
          TEXT: 1,
          LINK: 2,
          FREETEXT: 3,
          LINE: 4,
          SQUARE: 5,
          CIRCLE: 6,
          POLYGON: 7,
          POLYLINE: 8,
          HIGHLIGHT: 9,
          UNDERLINE: 10,
          SQUIGGLY: 11,
          STRIKEOUT: 12,
          STAMP: 13,
          CARET: 14,
          INK: 15,
          POPUP: 16,
          FILEATTACHMENT: 17,
          SOUND: 18,
          MOVIE: 19,
          WIDGET: 20,
          SCREEN: 21,
          PRINTERMARK: 22,
          TRAPNET: 23,
          WATERMARK: 24,
          THREED: 25,
          REDACT: 26
        };
        exports.AnnotationType = AnnotationType;
        var AnnotationFlag = {
          INVISIBLE: 0x01,
          HIDDEN: 0x02,
          PRINT: 0x04,
          NOZOOM: 0x08,
          NOROTATE: 0x10,
          NOVIEW: 0x20,
          READONLY: 0x40,
          LOCKED: 0x80,
          TOGGLENOVIEW: 0x100,
          LOCKEDCONTENTS: 0x200
        };
        exports.AnnotationFlag = AnnotationFlag;
        var AnnotationFieldFlag = {
          READONLY: 0x0000001,
          REQUIRED: 0x0000002,
          NOEXPORT: 0x0000004,
          MULTILINE: 0x0001000,
          PASSWORD: 0x0002000,
          NOTOGGLETOOFF: 0x0004000,
          RADIO: 0x0008000,
          PUSHBUTTON: 0x0010000,
          COMBO: 0x0020000,
          EDIT: 0x0040000,
          SORT: 0x0080000,
          FILESELECT: 0x0100000,
          MULTISELECT: 0x0200000,
          DONOTSPELLCHECK: 0x0400000,
          DONOTSCROLL: 0x0800000,
          COMB: 0x1000000,
          RICHTEXT: 0x2000000,
          RADIOSINUNISON: 0x2000000,
          COMMITONSELCHANGE: 0x4000000
        };
        exports.AnnotationFieldFlag = AnnotationFieldFlag;
        var AnnotationBorderStyleType = {
          SOLID: 1,
          DASHED: 2,
          BEVELED: 3,
          INSET: 4,
          UNDERLINE: 5
        };
        exports.AnnotationBorderStyleType = AnnotationBorderStyleType;
        var StreamType = {
          UNKNOWN: 0,
          FLATE: 1,
          LZW: 2,
          DCT: 3,
          JPX: 4,
          JBIG: 5,
          A85: 6,
          AHX: 7,
          CCF: 8,
          RL: 9
        };
        exports.StreamType = StreamType;
        var FontType = {
          UNKNOWN: 0,
          TYPE1: 1,
          TYPE1C: 2,
          CIDFONTTYPE0: 3,
          CIDFONTTYPE0C: 4,
          TRUETYPE: 5,
          CIDFONTTYPE2: 6,
          TYPE3: 7,
          OPENTYPE: 8,
          TYPE0: 9,
          MMTYPE1: 10
        };
        exports.FontType = FontType;
        var VerbosityLevel = {
          ERRORS: 0,
          WARNINGS: 1,
          INFOS: 5
        };
        exports.VerbosityLevel = VerbosityLevel;
        var CMapCompressionType = {
          NONE: 0,
          BINARY: 1,
          STREAM: 2
        };
        exports.CMapCompressionType = CMapCompressionType;
        var OPS = {
          dependency: 1,
          setLineWidth: 2,
          setLineCap: 3,
          setLineJoin: 4,
          setMiterLimit: 5,
          setDash: 6,
          setRenderingIntent: 7,
          setFlatness: 8,
          setGState: 9,
          save: 10,
          restore: 11,
          transform: 12,
          moveTo: 13,
          lineTo: 14,
          curveTo: 15,
          curveTo2: 16,
          curveTo3: 17,
          closePath: 18,
          rectangle: 19,
          stroke: 20,
          closeStroke: 21,
          fill: 22,
          eoFill: 23,
          fillStroke: 24,
          eoFillStroke: 25,
          closeFillStroke: 26,
          closeEOFillStroke: 27,
          endPath: 28,
          clip: 29,
          eoClip: 30,
          beginText: 31,
          endText: 32,
          setCharSpacing: 33,
          setWordSpacing: 34,
          setHScale: 35,
          setLeading: 36,
          setFont: 37,
          setTextRenderingMode: 38,
          setTextRise: 39,
          moveText: 40,
          setLeadingMoveText: 41,
          setTextMatrix: 42,
          nextLine: 43,
          showText: 44,
          showSpacedText: 45,
          nextLineShowText: 46,
          nextLineSetSpacingShowText: 47,
          setCharWidth: 48,
          setCharWidthAndBounds: 49,
          setStrokeColorSpace: 50,
          setFillColorSpace: 51,
          setStrokeColor: 52,
          setStrokeColorN: 53,
          setFillColor: 54,
          setFillColorN: 55,
          setStrokeGray: 56,
          setFillGray: 57,
          setStrokeRGBColor: 58,
          setFillRGBColor: 59,
          setStrokeCMYKColor: 60,
          setFillCMYKColor: 61,
          shadingFill: 62,
          beginInlineImage: 63,
          beginImageData: 64,
          endInlineImage: 65,
          paintXObject: 66,
          markPoint: 67,
          markPointProps: 68,
          beginMarkedContent: 69,
          beginMarkedContentProps: 70,
          endMarkedContent: 71,
          beginCompat: 72,
          endCompat: 73,
          paintFormXObjectBegin: 74,
          paintFormXObjectEnd: 75,
          beginGroup: 76,
          endGroup: 77,
          beginAnnotations: 78,
          endAnnotations: 79,
          beginAnnotation: 80,
          endAnnotation: 81,
          paintJpegXObject: 82,
          paintImageMaskXObject: 83,
          paintImageMaskXObjectGroup: 84,
          paintImageXObject: 85,
          paintInlineImageXObject: 86,
          paintInlineImageXObjectGroup: 87,
          paintImageXObjectRepeat: 88,
          paintImageMaskXObjectRepeat: 89,
          paintSolidColorImageMask: 90,
          constructPath: 91
        };
        exports.OPS = OPS;
        var UNSUPPORTED_FEATURES = {
          unknown: "unknown",
          forms: "forms",
          javaScript: "javaScript",
          smask: "smask",
          shadingPattern: "shadingPattern",
          font: "font"
        };
        exports.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
        var PasswordResponses = {
          NEED_PASSWORD: 1,
          INCORRECT_PASSWORD: 2
        };
        exports.PasswordResponses = PasswordResponses;
        var verbosity = VerbosityLevel.WARNINGS;

        function setVerbosityLevel(level) {
          if (Number.isInteger(level)) {
            verbosity = level;
          }
        }

        function getVerbosityLevel() {
          return verbosity;
        }

        function info(msg) {
          if (verbosity >= VerbosityLevel.INFOS) {
            console.log("Info: " + msg);
          }
        }

        function warn(msg) {
          if (verbosity >= VerbosityLevel.WARNINGS) {
            console.log("Warning: " + msg);
          }
        }

        function unreachable(msg) {
          throw new Error(msg);
        }

        function assert(cond, msg) {
          if (!cond) {
            unreachable(msg);
          }
        }

        function isSameOrigin(baseUrl, otherUrl) {
          try {
            var base = new _url_polyfill.URL(baseUrl);

            if (!base.origin || base.origin === "null") {
              return false;
            }
          } catch (e) {
            return false;
          }

          var other = new _url_polyfill.URL(otherUrl, base);
          return base.origin === other.origin;
        }

        function _isValidProtocol(url) {
          if (!url) {
            return false;
          }

          switch (url.protocol) {
            case "http:":
            case "https:":
            case "ftp:":
            case "mailto:":
            case "tel:":
              return true;

            default:
              return false;
          }
        }

        function createValidAbsoluteUrl(url, baseUrl) {
          if (!url) {
            return null;
          }

          try {
            var absoluteUrl = baseUrl
              ? new _url_polyfill.URL(url, baseUrl)
              : new _url_polyfill.URL(url);

            if (_isValidProtocol(absoluteUrl)) {
              return absoluteUrl;
            }
          } catch (ex) {}

          return null;
        }

        function shadow(obj, prop, value) {
          Object.defineProperty(obj, prop, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: false
          });
          return value;
        }

        var PasswordException = (function PasswordExceptionClosure() {
          function PasswordException(msg, code) {
            this.name = "PasswordException";
            this.message = msg;
            this.code = code;
          }

          PasswordException.prototype = new Error();
          PasswordException.constructor = PasswordException;
          return PasswordException;
        })();

        exports.PasswordException = PasswordException;

        var UnknownErrorException = (function UnknownErrorExceptionClosure() {
          function UnknownErrorException(msg, details) {
            this.name = "UnknownErrorException";
            this.message = msg;
            this.details = details;
          }

          UnknownErrorException.prototype = new Error();
          UnknownErrorException.constructor = UnknownErrorException;
          return UnknownErrorException;
        })();

        exports.UnknownErrorException = UnknownErrorException;

        var InvalidPDFException = (function InvalidPDFExceptionClosure() {
          function InvalidPDFException(msg) {
            this.name = "InvalidPDFException";
            this.message = msg;
          }

          InvalidPDFException.prototype = new Error();
          InvalidPDFException.constructor = InvalidPDFException;
          return InvalidPDFException;
        })();

        exports.InvalidPDFException = InvalidPDFException;

        var MissingPDFException = (function MissingPDFExceptionClosure() {
          function MissingPDFException(msg) {
            this.name = "MissingPDFException";
            this.message = msg;
          }

          MissingPDFException.prototype = new Error();
          MissingPDFException.constructor = MissingPDFException;
          return MissingPDFException;
        })();

        exports.MissingPDFException = MissingPDFException;

        var UnexpectedResponseException = (function UnexpectedResponseExceptionClosure() {
          function UnexpectedResponseException(msg, status) {
            this.name = "UnexpectedResponseException";
            this.message = msg;
            this.status = status;
          }

          UnexpectedResponseException.prototype = new Error();
          UnexpectedResponseException.constructor = UnexpectedResponseException;
          return UnexpectedResponseException;
        })();

        exports.UnexpectedResponseException = UnexpectedResponseException;

        var FormatError = (function FormatErrorClosure() {
          function FormatError(msg) {
            this.message = msg;
          }

          FormatError.prototype = new Error();
          FormatError.prototype.name = "FormatError";
          FormatError.constructor = FormatError;
          return FormatError;
        })();

        exports.FormatError = FormatError;

        var AbortException = (function AbortExceptionClosure() {
          function AbortException(msg) {
            this.name = "AbortException";
            this.message = msg;
          }

          AbortException.prototype = new Error();
          AbortException.constructor = AbortException;
          return AbortException;
        })();

        exports.AbortException = AbortException;
        var NullCharactersRegExp = /\x00/g;

        function removeNullCharacters(str) {
          if (typeof str !== "string") {
            warn("The argument for removeNullCharacters must be a string.");
            return str;
          }

          return str.replace(NullCharactersRegExp, "");
        }

        function bytesToString(bytes) {
          assert(
            bytes !== null &&
              _typeof(bytes) === "object" &&
              bytes.length !== undefined,
            "Invalid argument for bytesToString"
          );
          var length = bytes.length;
          var MAX_ARGUMENT_COUNT = 8192;

          if (length < MAX_ARGUMENT_COUNT) {
            return String.fromCharCode.apply(null, bytes);
          }

          var strBuf = [];

          for (var i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
            var chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
            var chunk = bytes.subarray(i, chunkEnd);
            strBuf.push(String.fromCharCode.apply(null, chunk));
          }

          return strBuf.join("");
        }

        function stringToBytes(str) {
          assert(typeof str === "string", "Invalid argument for stringToBytes");
          var length = str.length;
          var bytes = new Uint8Array(length);

          for (var i = 0; i < length; ++i) {
            bytes[i] = str.charCodeAt(i) & 0xff;
          }

          return bytes;
        }

        function arrayByteLength(arr) {
          if (arr.length !== undefined) {
            return arr.length;
          }

          assert(arr.byteLength !== undefined);
          return arr.byteLength;
        }

        function arraysToBytes(arr) {
          if (arr.length === 1 && arr[0] instanceof Uint8Array) {
            return arr[0];
          }

          var resultLength = 0;
          var i,
            ii = arr.length;
          var item, itemLength;

          for (i = 0; i < ii; i++) {
            item = arr[i];
            itemLength = arrayByteLength(item);
            resultLength += itemLength;
          }

          var pos = 0;
          var data = new Uint8Array(resultLength);

          for (i = 0; i < ii; i++) {
            item = arr[i];

            if (!(item instanceof Uint8Array)) {
              if (typeof item === "string") {
                item = stringToBytes(item);
              } else {
                item = new Uint8Array(item);
              }
            }

            itemLength = item.byteLength;
            data.set(item, pos);
            pos += itemLength;
          }

          return data;
        }

        function string32(value) {
          return String.fromCharCode(
            (value >> 24) & 0xff,
            (value >> 16) & 0xff,
            (value >> 8) & 0xff,
            value & 0xff
          );
        }

        function log2(x) {
          if (x <= 0) {
            return 0;
          }

          return Math.ceil(Math.log2(x));
        }

        function readInt8(data, start) {
          return (data[start] << 24) >> 24;
        }

        function readUint16(data, offset) {
          return (data[offset] << 8) | data[offset + 1];
        }

        function readUint32(data, offset) {
          return (
            ((data[offset] << 24) |
              (data[offset + 1] << 16) |
              (data[offset + 2] << 8) |
              data[offset + 3]) >>>
            0
          );
        }

        function isLittleEndian() {
          var buffer8 = new Uint8Array(4);
          buffer8[0] = 1;
          var view32 = new Uint32Array(buffer8.buffer, 0, 1);
          return view32[0] === 1;
        }

        function isEvalSupported() {
          try {
            new Function("");
            return true;
          } catch (e) {
            return false;
          }
        }

        var Util = (function UtilClosure() {
          function Util() {}

          var rgbBuf = ["rgb(", 0, ",", 0, ",", 0, ")"];

          Util.makeCssRgb = function Util_makeCssRgb(r, g, b) {
            rgbBuf[1] = r;
            rgbBuf[3] = g;
            rgbBuf[5] = b;
            return rgbBuf.join("");
          };

          Util.transform = function Util_transform(m1, m2) {
            return [
              m1[0] * m2[0] + m1[2] * m2[1],
              m1[1] * m2[0] + m1[3] * m2[1],
              m1[0] * m2[2] + m1[2] * m2[3],
              m1[1] * m2[2] + m1[3] * m2[3],
              m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
              m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
            ];
          };

          Util.applyTransform = function Util_applyTransform(p, m) {
            var xt = p[0] * m[0] + p[1] * m[2] + m[4];
            var yt = p[0] * m[1] + p[1] * m[3] + m[5];
            return [xt, yt];
          };

          Util.applyInverseTransform = function Util_applyInverseTransform(
            p,
            m
          ) {
            var d = m[0] * m[3] - m[1] * m[2];
            var xt =
              (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
            var yt =
              (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
            return [xt, yt];
          };

          Util.getAxialAlignedBoundingBox = function Util_getAxialAlignedBoundingBox(
            r,
            m
          ) {
            var p1 = Util.applyTransform(r, m);
            var p2 = Util.applyTransform(r.slice(2, 4), m);
            var p3 = Util.applyTransform([r[0], r[3]], m);
            var p4 = Util.applyTransform([r[2], r[1]], m);
            return [
              Math.min(p1[0], p2[0], p3[0], p4[0]),
              Math.min(p1[1], p2[1], p3[1], p4[1]),
              Math.max(p1[0], p2[0], p3[0], p4[0]),
              Math.max(p1[1], p2[1], p3[1], p4[1])
            ];
          };

          Util.inverseTransform = function Util_inverseTransform(m) {
            var d = m[0] * m[3] - m[1] * m[2];
            return [
              m[3] / d,
              -m[1] / d,
              -m[2] / d,
              m[0] / d,
              (m[2] * m[5] - m[4] * m[3]) / d,
              (m[4] * m[1] - m[5] * m[0]) / d
            ];
          };

          Util.apply3dTransform = function Util_apply3dTransform(m, v) {
            return [
              m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
              m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
              m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
            ];
          };

          Util.singularValueDecompose2dScale = function Util_singularValueDecompose2dScale(
            m
          ) {
            var transpose = [m[0], m[2], m[1], m[3]];
            var a = m[0] * transpose[0] + m[1] * transpose[2];
            var b = m[0] * transpose[1] + m[1] * transpose[3];
            var c = m[2] * transpose[0] + m[3] * transpose[2];
            var d = m[2] * transpose[1] + m[3] * transpose[3];
            var first = (a + d) / 2;
            var second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
            var sx = first + second || 1;
            var sy = first - second || 1;
            return [Math.sqrt(sx), Math.sqrt(sy)];
          };

          Util.normalizeRect = function Util_normalizeRect(rect) {
            var r = rect.slice(0);

            if (rect[0] > rect[2]) {
              r[0] = rect[2];
              r[2] = rect[0];
            }

            if (rect[1] > rect[3]) {
              r[1] = rect[3];
              r[3] = rect[1];
            }

            return r;
          };

          Util.intersect = function Util_intersect(rect1, rect2) {
            function compare(a, b) {
              return a - b;
            }

            var orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(
                compare
              ),
              orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare),
              result = [];
            rect1 = Util.normalizeRect(rect1);
            rect2 = Util.normalizeRect(rect2);

            if (
              (orderedX[0] === rect1[0] && orderedX[1] === rect2[0]) ||
              (orderedX[0] === rect2[0] && orderedX[1] === rect1[0])
            ) {
              result[0] = orderedX[1];
              result[2] = orderedX[2];
            } else {
              return false;
            }

            if (
              (orderedY[0] === rect1[1] && orderedY[1] === rect2[1]) ||
              (orderedY[0] === rect2[1] && orderedY[1] === rect1[1])
            ) {
              result[1] = orderedY[1];
              result[3] = orderedY[2];
            } else {
              return false;
            }

            return result;
          };

          return Util;
        })();

        exports.Util = Util;
        var PDFStringTranslateTable = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0x2d8,
          0x2c7,
          0x2c6,
          0x2d9,
          0x2dd,
          0x2db,
          0x2da,
          0x2dc,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0x2022,
          0x2020,
          0x2021,
          0x2026,
          0x2014,
          0x2013,
          0x192,
          0x2044,
          0x2039,
          0x203a,
          0x2212,
          0x2030,
          0x201e,
          0x201c,
          0x201d,
          0x2018,
          0x2019,
          0x201a,
          0x2122,
          0xfb01,
          0xfb02,
          0x141,
          0x152,
          0x160,
          0x178,
          0x17d,
          0x131,
          0x142,
          0x153,
          0x161,
          0x17e,
          0,
          0x20ac
        ];

        function stringToPDFString(str) {
          var i,
            n = str.length,
            strBuf = [];

          if (str[0] === "\xFE" && str[1] === "\xFF") {
            for (i = 2; i < n; i += 2) {
              strBuf.push(
                String.fromCharCode(
                  (str.charCodeAt(i) << 8) | str.charCodeAt(i + 1)
                )
              );
            }
          } else {
            for (i = 0; i < n; ++i) {
              var code = PDFStringTranslateTable[str.charCodeAt(i)];
              strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
            }
          }

          return strBuf.join("");
        }

        function stringToUTF8String(str) {
          return decodeURIComponent(escape(str));
        }

        function utf8StringToString(str) {
          return unescape(encodeURIComponent(str));
        }

        function isEmptyObj(obj) {
          for (var key in obj) {
            return false;
          }

          return true;
        }

        function isBool(v) {
          return typeof v === "boolean";
        }

        function isNum(v) {
          return typeof v === "number";
        }

        function isString(v) {
          return typeof v === "string";
        }

        function isArrayBuffer(v) {
          return (
            _typeof(v) === "object" && v !== null && v.byteLength !== undefined
          );
        }

        function isArrayEqual(arr1, arr2) {
          if (arr1.length !== arr2.length) {
            return false;
          }

          return arr1.every(function(element, index) {
            return element === arr2[index];
          });
        }

        function isSpace(ch) {
          return ch === 0x20 || ch === 0x09 || ch === 0x0d || ch === 0x0a;
        }

        function createPromiseCapability() {
          var capability = Object.create(null);
          var isSettled = false;
          Object.defineProperty(capability, "settled", {
            get: function get() {
              return isSettled;
            }
          });
          capability.promise = new Promise(function(resolve, reject) {
            capability.resolve = function(data) {
              isSettled = true;
              resolve(data);
            };

            capability.reject = function(reason) {
              isSettled = true;
              reject(reason);
            };
          });
          return capability;
        }

        var createObjectURL = (function createObjectURLClosure() {
          var digits =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          return function createObjectURL(data, contentType) {
            var forceDataSchema =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : false;

            if (!forceDataSchema && _url_polyfill.URL.createObjectURL) {
              var blob = new Blob([data], {
                type: contentType
              });
              return _url_polyfill.URL.createObjectURL(blob);
            }

            var buffer = "data:" + contentType + ";base64,";

            for (var i = 0, ii = data.length; i < ii; i += 3) {
              var b1 = data[i] & 0xff;
              var b2 = data[i + 1] & 0xff;
              var b3 = data[i + 2] & 0xff;
              var d1 = b1 >> 2,
                d2 = ((b1 & 3) << 4) | (b2 >> 4);
              var d3 = i + 1 < ii ? ((b2 & 0xf) << 2) | (b3 >> 6) : 64;
              var d4 = i + 2 < ii ? b3 & 0x3f : 64;
              buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
            }

            return buffer;
          };
        })();

        exports.createObjectURL = createObjectURL;

        /***/
      },
      /* 2 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        var globalScope = __w_pdfjs_require__(3);

        if (!globalScope._pdfjsCompatibilityChecked) {
          globalScope._pdfjsCompatibilityChecked = true;

          var isNodeJS = __w_pdfjs_require__(4);

          var hasDOM =
            (typeof window === "undefined" ? "undefined" : _typeof(window)) ===
              "object" &&
            (typeof document === "undefined"
              ? "undefined"
              : _typeof(document)) === "object";

          (function checkNodeBtoa() {
            if (globalScope.btoa || !isNodeJS()) {
              return;
            }

            globalScope.btoa = function(chars) {
              return Buffer.from(chars, "binary").toString("base64");
            };
          })();

          (function checkNodeAtob() {
            if (globalScope.atob || !isNodeJS()) {
              return;
            }

            globalScope.atob = function(input) {
              return Buffer.from(input, "base64").toString("binary");
            };
          })();

          (function checkChildNodeRemove() {
            if (!hasDOM) {
              return;
            }

            if (typeof Element.prototype.remove !== "undefined") {
              return;
            }

            Element.prototype.remove = function() {
              if (this.parentNode) {
                this.parentNode.removeChild(this);
              }
            };
          })();

          (function checkDOMTokenListAddRemove() {
            if (!hasDOM || isNodeJS()) {
              return;
            }

            var div = document.createElement("div");
            div.classList.add("testOne", "testTwo");

            if (
              div.classList.contains("testOne") === true &&
              div.classList.contains("testTwo") === true
            ) {
              return;
            }

            var OriginalDOMTokenListAdd = DOMTokenList.prototype.add;
            var OriginalDOMTokenListRemove = DOMTokenList.prototype.remove;

            DOMTokenList.prototype.add = function() {
              for (
                var _len = arguments.length, tokens = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                tokens[_key] = arguments[_key];
              }

              for (var _i = 0; _i < tokens.length; _i++) {
                var token = tokens[_i];
                OriginalDOMTokenListAdd.call(this, token);
              }
            };

            DOMTokenList.prototype.remove = function() {
              for (
                var _len2 = arguments.length,
                  tokens = new Array(_len2),
                  _key2 = 0;
                _key2 < _len2;
                _key2++
              ) {
                tokens[_key2] = arguments[_key2];
              }

              for (var _i2 = 0; _i2 < tokens.length; _i2++) {
                var token = tokens[_i2];
                OriginalDOMTokenListRemove.call(this, token);
              }
            };
          })();

          (function checkDOMTokenListToggle() {
            if (!hasDOM || isNodeJS()) {
              return;
            }

            var div = document.createElement("div");

            if (div.classList.toggle("test", 0) === false) {
              return;
            }

            DOMTokenList.prototype.toggle = function(token) {
              var force =
                arguments.length > 1 ? !!arguments[1] : !this.contains(token);
              return this[force ? "add" : "remove"](token), force;
            };
          })();

          (function checkStringStartsWith() {
            if (String.prototype.startsWith) {
              return;
            }

            __w_pdfjs_require__(5);
          })();

          (function checkStringEndsWith() {
            if (String.prototype.endsWith) {
              return;
            }

            __w_pdfjs_require__(36);
          })();

          (function checkStringIncludes() {
            if (String.prototype.includes) {
              return;
            }

            __w_pdfjs_require__(38);
          })();

          (function checkArrayIncludes() {
            if (Array.prototype.includes) {
              return;
            }

            __w_pdfjs_require__(40);
          })();

          (function checkArrayFrom() {
            if (Array.from) {
              return;
            }

            __w_pdfjs_require__(47);
          })();

          (function checkObjectAssign() {
            if (Object.assign) {
              return;
            }

            __w_pdfjs_require__(70);
          })();

          (function checkMathLog2() {
            if (Math.log2) {
              return;
            }

            Math.log2 = __w_pdfjs_require__(75);
          })();

          (function checkNumberIsNaN() {
            if (Number.isNaN) {
              return;
            }

            Number.isNaN = __w_pdfjs_require__(77);
          })();

          (function checkNumberIsInteger() {
            if (Number.isInteger) {
              return;
            }

            Number.isInteger = __w_pdfjs_require__(79);
          })();

          (function checkPromise() {
            if (
              globalScope.Promise &&
              globalScope.Promise.prototype &&
              globalScope.Promise.prototype.finally
            ) {
              return;
            }

            globalScope.Promise = __w_pdfjs_require__(82);
          })();

          (function checkWeakMap() {
            if (globalScope.WeakMap) {
              return;
            }

            globalScope.WeakMap = __w_pdfjs_require__(102);
          })();

          (function checkWeakSet() {
            if (globalScope.WeakSet) {
              return;
            }

            globalScope.WeakSet = __w_pdfjs_require__(119);
          })();

          (function checkStringCodePointAt() {
            if (String.codePointAt) {
              return;
            }

            String.codePointAt = __w_pdfjs_require__(123);
          })();

          (function checkStringFromCodePoint() {
            if (String.fromCodePoint) {
              return;
            }

            String.fromCodePoint = __w_pdfjs_require__(125);
          })();

          (function checkSymbol() {
            if (globalScope.Symbol) {
              return;
            }

            __w_pdfjs_require__(127);
          })();

          (function checkStringPadStart() {
            if (String.prototype.padStart) {
              return;
            }

            __w_pdfjs_require__(134);
          })();

          (function checkStringPadEnd() {
            if (String.prototype.padEnd) {
              return;
            }

            __w_pdfjs_require__(138);
          })();

          (function checkObjectValues() {
            if (Object.values) {
              return;
            }

            Object.values = __w_pdfjs_require__(140);
          })();
        }

        /***/
      },
      /* 3 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports =
          typeof window !== "undefined" && window.Math === Math
            ? window
            : typeof global !== "undefined" && global.Math === Math
            ? global
            : typeof self !== "undefined" && self.Math === Math
            ? self
            : {};

        /***/
      },
      /* 4 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        module.exports = function isNodeJS() {
          return (
            (typeof process === "undefined"
              ? "undefined"
              : _typeof(process)) === "object" &&
            process + "" === "[object process]" &&
            !process.versions["nw"]
          );
        };

        /***/
      },
      /* 5 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        __w_pdfjs_require__(6);

        module.exports = __w_pdfjs_require__(9).String.startsWith;

        /***/
      },
      /* 6 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var $export = __w_pdfjs_require__(7);

        var toLength = __w_pdfjs_require__(28);

        var context = __w_pdfjs_require__(30);

        var STARTS_WITH = "startsWith";
        var $startsWith = ""[STARTS_WITH];
        $export(
          $export.P + $export.F * __w_pdfjs_require__(35)(STARTS_WITH),
          "String",
          {
            startsWith: function startsWith(searchString) {
              var that = context(this, searchString, STARTS_WITH);
              var index = toLength(
                Math.min(
                  arguments.length > 1 ? arguments[1] : undefined,
                  that.length
                )
              );
              var search = String(searchString);
              return $startsWith
                ? $startsWith.call(that, search, index)
                : that.slice(index, index + search.length) === search;
            }
          }
        );

        /***/
      },
      /* 7 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var global = __w_pdfjs_require__(8);

        var core = __w_pdfjs_require__(9);

        var hide = __w_pdfjs_require__(10);

        var redefine = __w_pdfjs_require__(20);

        var ctx = __w_pdfjs_require__(26);

        var PROTOTYPE = "prototype";

        var $export = function $export(type, name, source) {
          var IS_FORCED = type & $export.F;
          var IS_GLOBAL = type & $export.G;
          var IS_STATIC = type & $export.S;
          var IS_PROTO = type & $export.P;
          var IS_BIND = type & $export.B;
          var target = IS_GLOBAL
            ? global
            : IS_STATIC
            ? global[name] || (global[name] = {})
            : (global[name] || {})[PROTOTYPE];
          var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
          var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
          var key, own, out, exp;
          if (IS_GLOBAL) source = name;

          for (key in source) {
            own = !IS_FORCED && target && target[key] !== undefined;
            out = (own ? target : source)[key];
            exp =
              IS_BIND && own
                ? ctx(out, global)
                : IS_PROTO && typeof out == "function"
                ? ctx(Function.call, out)
                : out;
            if (target) redefine(target, key, out, type & $export.U);
            if (exports[key] != out) hide(exports, key, exp);
            if (IS_PROTO && expProto[key] != out) expProto[key] = out;
          }
        };

        global.core = core;
        $export.F = 1;
        $export.G = 2;
        $export.S = 4;
        $export.P = 8;
        $export.B = 16;
        $export.W = 32;
        $export.U = 64;
        $export.R = 128;
        module.exports = $export;

        /***/
      },
      /* 8 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var global = (module.exports =
          typeof window != "undefined" && window.Math == Math
            ? window
            : typeof self != "undefined" && self.Math == Math
            ? self
            : Function("return this")());
        if (typeof __g == "number") __g = global;

        /***/
      },
      /* 9 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var core = (module.exports = {
          version: "2.6.5"
        });
        if (typeof __e == "number") __e = core;

        /***/
      },
      /* 10 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var dP = __w_pdfjs_require__(11);

        var createDesc = __w_pdfjs_require__(19);

        module.exports = __w_pdfjs_require__(15)
          ? function(object, key, value) {
              return dP.f(object, key, createDesc(1, value));
            }
          : function(object, key, value) {
              object[key] = value;
              return object;
            };

        /***/
      },
      /* 11 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var anObject = __w_pdfjs_require__(12);

        var IE8_DOM_DEFINE = __w_pdfjs_require__(14);

        var toPrimitive = __w_pdfjs_require__(18);

        var dP = Object.defineProperty;
        exports.f = __w_pdfjs_require__(15)
          ? Object.defineProperty
          : function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPrimitive(P, true);
              anObject(Attributes);
              if (IE8_DOM_DEFINE)
                try {
                  return dP(O, P, Attributes);
                } catch (e) {}
              if ("get" in Attributes || "set" in Attributes)
                throw TypeError("Accessors not supported!");
              if ("value" in Attributes) O[P] = Attributes.value;
              return O;
            };

        /***/
      },
      /* 12 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var isObject = __w_pdfjs_require__(13);

        module.exports = function(it) {
          if (!isObject(it)) throw TypeError(it + " is not an object!");
          return it;
        };

        /***/
      },
      /* 13 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        function _typeof(obj) {
          if (
            typeof Symbol === "function" &&
            typeof Symbol.iterator === "symbol"
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj;
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
            };
          }
          return _typeof(obj);
        }

        module.exports = function(it) {
          return _typeof(it) === "object"
            ? it !== null
            : typeof it === "function";
        };

        /***/
      },
      /* 14 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports =
          !__w_pdfjs_require__(15) &&
          !__w_pdfjs_require__(16)(function() {
            return (
              Object.defineProperty(__w_pdfjs_require__(17)("div"), "a", {
                get: function get() {
                  return 7;
                }
              }).a != 7
            );
          });

        /***/
      },
      /* 15 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = !__w_pdfjs_require__(16)(function() {
          return (
            Object.defineProperty({}, "a", {
              get: function get() {
                return 7;
              }
            }).a != 7
          );
        });

        /***/
      },
      /* 16 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = function(exec) {
          try {
            return !!exec();
          } catch (e) {
            return true;
          }
        };

        /***/
      },
      /* 17 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var isObject = __w_pdfjs_require__(13);

        var document = __w_pdfjs_require__(8).document;

        var is = isObject(document) && isObject(document.createElement);

        module.exports = function(it) {
          return is ? document.createElement(it) : {};
        };

        /***/
      },
      /* 18 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var isObject = __w_pdfjs_require__(13);

        module.exports = function(it, S) {
          if (!isObject(it)) return it;
          var fn, val;
          if (
            S &&
            typeof (fn = it.toString) == "function" &&
            !isObject((val = fn.call(it)))
          )
            return val;
          if (
            typeof (fn = it.valueOf) == "function" &&
            !isObject((val = fn.call(it)))
          )
            return val;
          if (
            !S &&
            typeof (fn = it.toString) == "function" &&
            !isObject((val = fn.call(it)))
          )
            return val;
          throw TypeError("Can't convert object to primitive value");
        };

        /***/
      },
      /* 19 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
          };
        };

        /***/
      },
      /* 20 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var global = __w_pdfjs_require__(8);

        var hide = __w_pdfjs_require__(10);

        var has = __w_pdfjs_require__(21);

        var SRC = __w_pdfjs_require__(22)("src");

        var $toString = __w_pdfjs_require__(23);

        var TO_STRING = "toString";
        var TPL = ("" + $toString).split(TO_STRING);

        __w_pdfjs_require__(9).inspectSource = function(it) {
          return $toString.call(it);
        };

        (module.exports = function(O, key, val, safe) {
          var isFunction = typeof val == "function";
          if (isFunction) has(val, "name") || hide(val, "name", key);
          if (O[key] === val) return;
          if (isFunction)
            has(val, SRC) ||
              hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));

          if (O === global) {
            O[key] = val;
          } else if (!safe) {
            delete O[key];
            hide(O, key, val);
          } else if (O[key]) {
            O[key] = val;
          } else {
            hide(O, key, val);
          }
        })(Function.prototype, TO_STRING, function toString() {
          return (
            (typeof this == "function" && this[SRC]) || $toString.call(this)
          );
        });

        /***/
      },
      /* 21 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var hasOwnProperty = {}.hasOwnProperty;

        module.exports = function(it, key) {
          return hasOwnProperty.call(it, key);
        };

        /***/
      },
      /* 22 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var id = 0;
        var px = Math.random();

        module.exports = function(key) {
          return "Symbol(".concat(
            key === undefined ? "" : key,
            ")_",
            (++id + px).toString(36)
          );
        };

        /***/
      },
      /* 23 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = __w_pdfjs_require__(24)(
          "native-function-to-string",
          Function.toString
        );

        /***/
      },
      /* 24 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var core = __w_pdfjs_require__(9);

        var global = __w_pdfjs_require__(8);

        var SHARED = "__core-js_shared__";
        var store = global[SHARED] || (global[SHARED] = {});
        (module.exports = function(key, value) {
          return store[key] || (store[key] = value !== undefined ? value : {});
        })("versions", []).push({
          version: core.version,
          mode: __w_pdfjs_require__(25) ? "pure" : "global",
          copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
        });

        /***/
      },
      /* 25 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = false;

        /***/
      },
      /* 26 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var aFunction = __w_pdfjs_require__(27);

        module.exports = function(fn, that, length) {
          aFunction(fn);
          if (that === undefined) return fn;

          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a);
              };

            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };

            case 3:
              return function(a, b, c) {
                return fn.call(that, a, b, c);
              };
          }

          return function() {
            return fn.apply(that, arguments);
          };
        };

        /***/
      },
      /* 27 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = function(it) {
          if (typeof it != "function")
            throw TypeError(it + " is not a function!");
          return it;
        };

        /***/
      },
      /* 28 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var toInteger = __w_pdfjs_require__(29);

        var min = Math.min;

        module.exports = function(it) {
          return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
        };

        /***/
      },
      /* 29 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var ceil = Math.ceil;
        var floor = Math.floor;

        module.exports = function(it) {
          return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
        };

        /***/
      },
      /* 30 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var isRegExp = __w_pdfjs_require__(31);

        var defined = __w_pdfjs_require__(34);

        module.exports = function(that, searchString, NAME) {
          if (isRegExp(searchString))
            throw TypeError("String#" + NAME + " doesn't accept regex!");
          return String(defined(that));
        };

        /***/
      },
      /* 31 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var isObject = __w_pdfjs_require__(13);

        var cof = __w_pdfjs_require__(32);

        var MATCH = __w_pdfjs_require__(33)("match");

        module.exports = function(it) {
          var isRegExp;
          return (
            isObject(it) &&
            ((isRegExp = it[MATCH]) !== undefined
              ? !!isRegExp
              : cof(it) == "RegExp")
          );
        };

        /***/
      },
      /* 32 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var toString = {}.toString;

        module.exports = function(it) {
          return toString.call(it).slice(8, -1);
        };

        /***/
      },
      /* 33 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        var store = __w_pdfjs_require__(24)("wks");

        var uid = __w_pdfjs_require__(22);

        var _Symbol = __w_pdfjs_require__(8).Symbol;

        var USE_SYMBOL = typeof _Symbol == "function";

        var $exports = (module.exports = function(name) {
          return (
            store[name] ||
            (store[name] =
              (USE_SYMBOL && _Symbol[name]) ||
              (USE_SYMBOL ? _Symbol : uid)("Symbol." + name))
          );
        });

        $exports.store = store;

        /***/
      },
      /* 34 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "u