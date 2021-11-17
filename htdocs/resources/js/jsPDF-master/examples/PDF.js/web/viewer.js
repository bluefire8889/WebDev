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

/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
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
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
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
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
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
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      var pdfjsWebApp, pdfjsWebAppOptions;
      {
        pdfjsWebApp = __webpack_require__(1);
        pdfjsWebAppOptions = __webpack_require__(7);
      }
      {
        __webpack_require__(37);
      }
      {
        __webpack_require__(42);
      }

      function getViewerConfiguration() {
        return {
          appContainer: document.body,
          mainContainer: document.getElementById("viewerContainer"),
          viewerContainer: document.getElementById("viewer"),
          eventBus: null,
          toolbar: {
            container: document.getElementById("toolbarViewer"),
            numPages: document.getElementById("numPages"),
            pageNumber: document.getElementById("pageNumber"),
            scaleSelectContainer: document.getElementById(
              "scaleSelectContainer"
            ),
            scaleSelect: document.getElementById("scaleSelect"),
            customScaleOption: document.getElementById("customScaleOption"),
            previous: document.getElementById("previous"),
            next: document.getElementById("next"),
            zoomIn: document.getElementById("zoomIn"),
            zoomOut: document.getElementById("zoomOut"),
            viewFind: document.getElementById("viewFind"),
            openFile: document.getElementById("openFile"),
            print: document.getElementById("print"),
            presentationModeButton: document.getElementById("presentationMode"),
            download: document.getElementById("download"),
            viewBookmark: document.getElementById("viewBookmark")
          },
          secondaryToolbar: {
            toolbar: document.getElementById("secondaryToolbar"),
            toggleButton: document.getElementById("secondaryToolbarToggle"),
            toolbarButtonContainer: document.getElementById(
              "secondaryToolbarButtonContainer"
            ),
            presentationModeButton: document.getElementById(
              "secondaryPresentationMode"
            ),
            openFileButton: document.getElementById("secondaryOpenFile"),
            printButton: document.getElementById("secondaryPrint"),
            downloadButton: document.getElementById("secondaryDownload"),
            viewBookmarkButton: document.getElementById(
              "secondaryViewBookmark"
            ),
            firstPageButton: document.getElementById("firstPage"),
            lastPageButton: document.getElementById("lastPage"),
            pageRotateCwButton: document.getElementById("pageRotateCw"),
            pageRotateCcwButton: document.getElementById("pageRotateCcw"),
            cursorSelectToolButton: document.getElementById("cursorSelectTool"),
            cursorHandToolButton: document.getElementById("cursorHandTool"),
            scrollVerticalButton: document.getElementById("scrollVertical"),
            scrollHorizontalButton: document.getElementById("scrollHorizontal"),
            scrollWrappedButton: document.getElementById("scrollWrapped"),
            spreadNoneButton: document.getElementById("spreadNone"),
            spreadOddButton: document.getElementById("spreadOdd"),
            spreadEvenButton: document.getElementById("spreadEven"),
            documentPropertiesButton: document.getElementById(
              "documentProperties"
            )
          },
          fullscreen: {
            contextFirstPage: document.getElementById("contextFirstPage"),
            contextLastPage: document.getElementById("contextLastPage"),
            contextPageRotateCw: document.getElementById("contextPageRotateCw"),
            contextPageRotateCcw: document.getElementById(
              "contextPageRotateCcw"
            )
          },
          sidebar: {
            outerContainer: document.getElementById("outerContainer"),
            viewerContainer: document.getElementById("viewerContainer"),
            toggleButton: document.getElementById("sidebarToggle"),
            thumbnailButton: document.getElementById("viewThumbnail"),
            outlineButton: document.getElementById("viewOutline"),
            attachmentsButton: document.getElementById("viewAttachments"),
            thumbnailView: document.getElementById("thumbnailView"),
            outlineView: document.getElementById("outlineView"),
            attachmentsView: document.getElementById("attachmentsView")
          },
          sidebarResizer: {
            outerContainer: document.getElementById("outerContainer"),
            resizer: document.getElementById("sidebarResizer")
          },
          findBar: {
            bar: document.getElementById("findbar"),
            toggleButton: document.getElementById("viewFind"),
            findField: document.getElementById("findInput"),
            highlightAllCheckbox: document.getElementById("findHighlightAll"),
            caseSensitiveCheckbox: document.getElementById("findMatchCase"),
            entireWordCheckbox: document.getElementById("findEntireWord"),
            findMsg: document.getElementById("findMsg"),
            findResultsCount: document.getElementById("findResultsCount"),
            findPreviousButton: document.getElementById("findPrevious"),
            findNextButton: document.getElementById("findNext")
          },
          passwordOverlay: {
            overlayName: "passwordOverlay",
            container: document.getElementById("passwordOverlay"),
            label: document.getElementById("passwordText"),
            input: document.getElementById("password"),
            submitButton: document.getElementById("passwordSubmit"),
            cancelButton: document.getElementById("passwordCancel")
          },
          documentProperties: {
            overlayName: "documentPropertiesOverlay",
            container: document.getElementById("documentPropertiesOverlay"),
            closeButton: document.getElementById("documentPropertiesClose"),
            fields: {
              fileName: document.getElementById("fileNameField"),
              fileSize: document.getElementById("fileSizeField"),
              title: document.getElementById("titleField"),
              author: document.getElementById("authorField"),
              subject: document.getElementById("subjectField"),
              keywords: document.getElementById("keywordsField"),
              creationDate: document.getElementById("creationDateField"),
              modificationDate: document.getElementById(
                "modificationDateField"
              ),
              creator: document.getElementById("creatorField"),
              producer: document.getElementById("producerField"),
              version: document.getElementById("versionField"),
              pageCount: document.getElementById("pageCountField"),
              pageSize: document.getElementById("pageSizeField"),
              linearized: document.getElementById("linearizedField")
            }
          },
          errorWrapper: {
            container: document.getElementById("errorWrapper"),
            errorMessage: document.getElementById("errorMessage"),
            closeButton: document.getElementById("errorClose"),
            errorMoreInfo: document.getElementById("errorMoreInfo"),
            moreInfoButton: document.getElementById("errorShowMore"),
            lessInfoButton: document.getElementById("errorShowLess")
          },
          printContainer: document.getElementById("printContainer"),
          openFileInputName: "fileInput",
          debuggerScriptPath: "./debugger.js"
        };
      }

      function webViewerLoad() {
        var config = getViewerConfiguration();
        window.PDFViewerApplication = pdfjsWebApp.PDFViewerApplication;
        window.PDFViewerApplicationOptions = pdfjsWebAppOptions.AppOptions;
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent("webviewerloaded", true, true, {});
        document.dispatchEvent(event);
        pdfjsWebApp.PDFViewerApplication.run(config);
      }

      if (
        document.readyState === "interactive" ||
        document.readyState === "complete"
      ) {
        webViewerLoad();
      } else {
        document.addEventListener("DOMContentLoaded", webViewerLoad, true);
      }

      /***/
    },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.PDFPrintServiceFactory = exports.DefaultExternalServices = exports.PDFViewerApplication = void 0;

      var _regenerator = _interopRequireDefault(__webpack_require__(2));

      var _ui_utils = __webpack_require__(6);

      var _app_options = __webpack_require__(7);

      var _pdfjsLib = __webpack_require__(8);

      var _pdf_cursor_tools = __webpack_require__(10);

      var _pdf_rendering_queue = __webpack_require__(12);

      var _pdf_sidebar = __webpack_require__(13);

      var _overlay_manager = __webpack_require__(14);

      var _password_prompt = __webpack_require__(15);

      var _pdf_attachment_viewer = __webpack_require__(16);

      var _pdf_document_properties = __webpack_require__(17);

      var _pdf_find_bar = __webpack_require__(18);

      var _pdf_find_controller = __webpack_require__(19);

      var _pdf_history = __webpack_require__(21);

      var _pdf_link_service = __webpack_require__(22);

      var _pdf_outline_viewer = __webpack_require__(23);

      var _pdf_presentation_mode = __webpack_require__(24);

      var _pdf_sidebar_resizer = __webpack_require__(25);

      var _pdf_thumbnail_viewer = __webpack_require__(26);

      var _pdf_viewer = __webpack_require__(28);

      var _secondary_toolbar = __webpack_require__(33);

      var _toolbar = __webpack_require__(35);

      var _view_history = __webpack_require__(36);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _slicedToArray(arr, i) {
        return (
          _arrayWithHoles(arr) ||
          _iterableToArrayLimit(arr, i) ||
          _nonIterableRest()
        );
      }

      function _nonIterableRest() {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      }

      function _iterableToArrayLimit(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
          for (
            var _i = arr[Symbol.iterator](), _s;
            !(_n = (_s = _i.next()).done);
            _n = true
          ) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"] != null) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }

      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }

      function asyncGeneratorStep(
        gen,
        resolve,
        reject,
        _next,
        _throw,
        key,
        arg
      ) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _asyncToGenerator(fn) {
        return function() {
          var self = this,
            args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "next",
                value
              );
            }
            function _throw(err) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "throw",
                err
              );
            }
            _next(undefined);
          });
        };
      }

      var DEFAULT_SCALE_DELTA = 1.1;
      var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
      var FORCE_PAGES_LOADED_TIMEOUT = 10000;
      var WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
      var ViewOnLoad = {
        UNKNOWN: -1,
        PREVIOUS: 0,
        INITIAL: 1
      };
      var DefaultExternalServices = {
        updateFindControlState: function updateFindControlState(data) {},
        updateFindMatchesCount: function updateFindMatchesCount(data) {},
        initPassiveLoading: function initPassiveLoading(callbacks) {},
        fallback: function fallback(data, callback) {},
        reportTelemetry: function reportTelemetry(data) {},
        createDownloadManager: function createDownloadManager(options) {
          throw new Error("Not implemented: createDownloadManager");
        },
        createPreferences: function createPreferences() {
          throw new Error("Not implemented: createPreferences");
        },
        createL10n: function createL10n(options) {
          throw new Error("Not implemented: createL10n");
        },
        supportsIntegratedFind: false,
        supportsDocumentFonts: true,
        supportsDocumentColors: true,
        supportedMouseWheelZoomModifierKeys: {
          ctrlKey: true,
          metaKey: true
        }
      };
      exports.DefaultExternalServices = DefaultExternalServices;
      var PDFViewerApplication = {
        initialBookmark: document.location.hash.substring(1),
        initialized: false,
        fellback: false,
        appConfig: null,
        pdfDocument: null,
        pdfLoadingTask: null,
        printService: null,
        pdfViewer: null,
        pdfThumbnailViewer: null,
        pdfRenderingQueue: null,
        pdfPresentationMode: null,
        pdfDocumentProperties: null,
        pdfLinkService: null,
        pdfHistory: null,
        pdfSidebar: null,
        pdfSidebarResizer: null,
        pdfOutlineViewer: null,
        pdfAttachmentViewer: null,
        pdfCursorTools: null,
        store: null,
        downloadManager: null,
        overlayManager: null,
        preferences: null,
        toolbar: null,
        secondaryToolbar: null,
        eventBus: null,
        l10n: null,
        isInitialViewSet: false,
        downloadComplete: false,
        isViewerEmbedded: window.parent !== window,
        url: "",
        baseUrl: "",
        externalServices: DefaultExternalServices,
        _boundEvents: {},
        contentDispositionFilename: null,
        initialize: (function() {
          var _initialize = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee(appConfig) {
              var _this = this;

              var appContainer;
              return _regenerator.default.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        this.preferences = this.externalServices.createPreferences();
                        this.appConfig = appConfig;
                        _context.next = 4;
                        return this._readPreferences();

                      case 4:
                        _context.next = 6;
                        return this._parseHashParameters();

                      case 6:
                        _context.next = 8;
                        return this._initializeL10n();

                      case 8:
                        if (
                          this.isViewerEmbedded &&
                          _app_options.AppOptions.get("externalLinkTarget") ===
                            _pdfjsLib.LinkTarget.NONE
                        ) {
                          _app_options.AppOptions.set(
                            "externalLinkTarget",
                            _pdfjsLib.LinkTarget.TOP
                          );
                        }

                        _context.next = 11;
                        return this._initializeViewerComponents();

                      case 11:
                        this.bindEvents();
                        this.bindWindowEvents();
                        appContainer =
                          appConfig.appContainer || document.documentElement;
                        this.l10n.translate(appContainer).then(function() {
                          _this.eventBus.dispatch("localized", {
                            source: _this
                          });
                        });
                        this.initialized = true;

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this
              );
            })
          );

          function initialize(_x) {
            return _initialize.apply(this, arguments);
          }

          return initialize;
        })(),
        _readPreferences: (function() {
          var _readPreferences2 = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee2() {
              var prefs, name;
              return _regenerator.default.wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        if (
                          !(
                            _app_options.AppOptions.get(
                              "disablePreferences"
                            ) === true
                          )
                        ) {
                          _context2.next = 2;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 2:
                        _context2.prev = 2;
                        _context2.next = 5;
                        return this.preferences.getAll();

                      case 5:
                        prefs = _context2.sent;

                        for (name in prefs) {
                          _app_options.AppOptions.set(name, prefs[name]);
                        }

                        _context2.next = 12;
                        break;

                      case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](2);
                        console.error(
                          '_readPreferences: "'.concat(
                            _context2.t0.message,
                            '".'
                          )
                        );

                      case 12:
                      case "end":
                        return _context2.stop();
                    }
                  }
                },
                _callee2,
                this,
                [[2, 9]]
              );
            })
          );

          function _readPreferences() {
            return _readPreferences2.apply(this, arguments);
          }

          return _readPreferences;
        })(),
        _parseHashParameters: (function() {
          var _parseHashParameters2 = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee3() {
              var waitOn, hash, hashParams, viewer, enabled;
              return _regenerator.default.wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        if (_app_options.AppOptions.get("pdfBugEnabled")) {
                          _context3.next = 2;
                          break;
                        }

                        return _context3.abrupt("return");

                      case 2:
                        waitOn = [];
                        hash = document.location.hash.substring(1);
                        hashParams = (0, _ui_utils.parseQueryString)(hash);

                        if (
                          "disableworker" in hashParams &&
                          hashParams["disableworker"] === "true"
                        ) {
                          waitOn.push(loadFakeWorker());
                        }

                        if ("disablerange" in hashParams) {
                          _app_options.AppOptions.set(
                            "disableRange",
                            hashParams["disablerange"] === "true"
                          );
                        }

                        if ("disablestream" in hashParams) {
                          _app_options.AppOptions.set(
                            "disableStream",
                            hashParams["disablestream"] === "true"
                          );
                        }

                        if ("disableautofetch" in hashParams) {
                          _app_options.AppOptions.set(
                            "disableAutoFetch",
                            hashParams["disableautofetch"] === "true"
                          );
                        }

                        if ("disablefontface" in hashParams) {
                          _app_options.AppOptions.set(
                            "disableFontFace",
                            hashParams["disablefontface"] === "true"
                          );
                        }

                        if ("disablehistory" in hashParams) {
                          _app_options.AppOptions.set(
                            "disableHistory",
                            hashParams["disablehistory"] === "true"
                          );
                        }

                        if ("webgl" in hashParams) {
                          _app_options.AppOptions.set(
                            "enableWebGL",
                            hashParams["webgl"] === "true"
                          );
                        }

                        if ("useonlycsszoom" in hashParams) {
                          _app_options.AppOptions.set(
                            "useOnlyCssZoom",
                            hashParams["useonlycsszoom"] === "true"
                          );
                        }

                        if ("verbosity" in hashParams) {
                          _app_options.AppOptions.set(
                            "verbosity",
                            hashParams["verbosity"] | 0
                          );
                        }

                        if (!("textlayer" in hashParams)) {
                          _context3.next = 23;
                          break;
                        }

                        _context3.t0 = hashParams["textlayer"];
                        _context3.next =
                          _context3.t0 === "off"
                            ? 18
                            : _context3.t0 === "visible"
                            ? 20
                            : _context3.t0 === "shadow"
                            ? 20
                            : _context3.t0 === "hover"
                            ? 20
                            : 23;
                        break;

                      case 18:
                        _app_options.AppOptions.set(
                          "textLayerMode",
                          _ui_utils.TextLayerMode.DISABLE
                        );

                        return _context3.abrupt("break", 23);

                      case 20:
                        viewer = this.appConfig.viewerContainer;
                        viewer.classList.add(
                          "textLayer-" + hashParams["textlayer"]
                        );
                        return _context3.abrupt("break", 23);

                      case 23:
                        if ("pdfbug" in hashParams) {
                          _app_options.AppOptions.set("pdfBug", true);

                          enabled = hashParams["pdfbug"].split(",");
                          waitOn.push(loadAndEnablePDFBug(enabled));
                        }

                        if ("locale" in hashParams) {
                          _app_options.AppOptions.set(
                            "locale",
                            hashParams["locale"]
                          );
                        }

                        return _context3.abrupt(
                          "return",
                          Promise.all(waitOn).catch(function(reason) {
                            console.error(
                              '_parseHashParameters: "'.concat(
                                reason.message,
                                '".'
                              )
                            );
                          })
                        );

                      case 26:
                      case "end":
                        return _context3.stop();
                    }
                  }
                },
                _callee3,
                this
              );
            })
          );

          function _parseHashParameters() {
            return _parseHashParameters2.apply(this, arguments);
          }

          return _parseHashParameters;
        })(),
        _initializeL10n: (function() {
          var _initializeL10n2 = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee4() {
              var dir;
              return _regenerator.default.wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        this.l10n = this.externalServices.createL10n({
                          locale: _app_options.AppOptions.get("locale")
                        });
                        _context4.next = 3;
                        return this.l10n.getDirection();

                      case 3:
                        dir = _context4.sent;
                        document.getElementsByTagName("html")[0].dir = dir;

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                },
                _callee4,
                this
              );
            })
          );

          function _initializeL10n() {
            return _initializeL10n2.apply(this, arguments);
          }

          return _initializeL10n;
        })(),
        _initializeViewerComponents: (function() {
          var _initializeViewerComponents2 = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee5() {
              var appConfig,
                eventBus,
                pdfRenderingQueue,
                pdfLinkService,
                downloadManager,
                findController,
                container,
                viewer;
              return _regenerator.default.wrap(
                function _callee5$(_context5) {
                  while (1) {
                    switch ((_context5.prev = _context5.next)) {
                      case 0:
                        appConfig = this.appConfig;
                        this.overlayManager = new _overlay_manager.OverlayManager();
                        eventBus =
                          appConfig.eventBus ||
                          (0, _ui_utils.getGlobalEventBus)(
                            _app_options.AppOptions.get("eventBusDispatchToDOM")
                          );
                        this.eventBus = eventBus;
                        pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
                        pdfRenderingQueue.onIdle = this.cleanup.bind(this);
                        this.pdfRenderingQueue = pdfRenderingQueue;
                        pdfLinkService = new _pdf_link_service.PDFLinkService({
                          eventBus: eventBus,
                          externalLinkTarget: _app_options.AppOptions.get(
                            "externalLinkTarget"
                          ),
                          externalLinkRel: _app_options.AppOptions.get(
                            "externalLinkRel"
                          )
                        });
                        this.pdfLinkService = pdfLinkService;
                        downloadManager = this.externalServices.createDownloadManager(
                          {
                            disableCreateObjectURL: _app_options.AppOptions.get(
                              "disableCreateObjectURL"
                            )
                          }
                        );
                        this.downloadManager = downloadManager;
                        findController = new _pdf_find_controller.PDFFindController(
                          {
                            linkService: pdfLinkService,
                            eventBus: eventBus
                          }
                        );
                        this.findController = findController;
                        container = appConfig.mainContainer;
                        viewer = appConfig.viewerContainer;
                        this.pdfViewer = new _pdf_viewer.PDFViewer({
                          container: container,
                          viewer: viewer,
                          eventBus: eventBus,
                          renderingQueue: pdfRenderingQueue,
                          linkService: pdfLinkService,
                          downloadManager: downloadManager,
                          findController: findController,
                          renderer: _app_options.AppOptions.get("renderer"),
                          enableWebGL: _app_options.AppOptions.get(
                            "enableWebGL"
                          ),
                          l10n: this.l10n,
                          textLayerMode: _app_options.AppOptions.get(
                            "textLayerMode"
                          ),
                          imageResourcesPath: _app_options.AppOptions.get(
                            "imageResourcesPath"
                          ),
                          renderInteractiveForms: _app_options.AppOptions.get(
                            "renderInteractiveForms"
                          ),
                          enablePrintAutoRotate: _app_options.AppOptions.get(
                            "enablePrintAutoRotate"
                          ),
                          useOnlyCssZoom: _app_options.AppOptions.get(
                            "useOnlyCssZoom"
                          ),
                          maxCanvasPixels: _app_options.AppOptions.get(
                            "maxCanvasPixels"
                          )
                        });
                        pdfRenderingQueue.setViewer(this.pdfViewer);
                        pdfLinkService.setViewer(this.pdfViewer);
                        this.pdfThumbnailViewer = new _pdf_thumbnail_viewer.PDFThumbnailViewer(
                          {
                            container: appConfig.sidebar.thumbnailView,
                            renderingQueue: pdfRenderingQueue,
                            linkService: pdfLinkService,
                            l10n: this.l10n
                          }
                        );
                        pdfRenderingQueue.setThumbnailViewer(
                          this.pdfThumbnailViewer
                        );
                        this.pdfHistory = new _pdf_history.PDFHistory({
                          linkService: pdfLinkService,
                          eventBus: eventBus
                        });
                        pdfLinkService.setHistory(this.pdfHistory);
                        this.findBar = new _pdf_find_bar.PDFFindBar(
                          appConfig.findBar,
                          eventBus,
                          this.l10n
                        );
                        this.pdfDocumentProperties = new _pdf_document_properties.PDFDocumentProperties(
                          appConfig.documentProperties,
                          this.overlayManager,
                          eventBus,
                          this.l10n
                        );
                        this.pdfCursorTools = new _pdf_cursor_tools.PDFCursorTools(
                          {
                            container: container,
                            eventBus: eventBus,
                            cursorToolOnLoad: _app_options.AppOptions.get(
                              "cursorToolOnLoad"
                            )
                          }
                        );
                        this.toolbar = new _toolbar.Toolbar(
                          appConfig.toolbar,
                          eventBus,
                          this.l10n
                        );
                        this.secondaryToolbar = new _secondary_toolbar.SecondaryToolbar(
                          appConfig.secondaryToolbar,
                          container,
                          eventBus
                        );

                        if (this.supportsFullscreen) {
                          this.pdfPresentationMode = new _pdf_presentation_mode.PDFPresentationMode(
                            {
                              container: container,
                              viewer: viewer,
                              pdfViewer: this.pdfViewer,
                              eventBus: eventBus,
                              contextMenuItems: appConfig.fullscreen
                            }
                          );
                        }

                        this.passwordPrompt = new _password_prompt.PasswordPrompt(
                          appConfig.passwordOverlay,
                          this.overlayManager,
                          this.l10n
                        );
                        this.pdfOutlineViewer = new _pdf_outline_viewer.PDFOutlineViewer(
                          {
                            container: appConfig.sidebar.outlineView,
                            eventBus: eventBus,
                            linkService: pdfLinkService
                          }
                        );
                        this.pdfAttachmentViewer = new _pdf_attachment_viewer.PDFAttachmentViewer(
                          {
                            container: appConfig.sidebar.attachmentsView,
                            eventBus: eventBus,
                            downloadManager: downloadManager
                          }
                        );
                        this.pdfSidebar = new _pdf_sidebar.PDFSidebar({
                          elements: appConfig.sidebar,
                          pdfViewer: this.pdfViewer,
                          pdfThumbnailViewer: this.pdfThumbnailViewer,
                          eventBus: eventBus,
                          l10n: this.l10n
                        });
                        this.pdfSidebar.onToggled = this.forceRendering.bind(
                          this
                        );
                        this.pdfSidebarResizer = new _pdf_sidebar_resizer.PDFSidebarResizer(
                          appConfig.sidebarResizer,
                          eventBus,
                          this.l10n
                        );

                      case 34:
                      case "end":
                        return _context5.stop();
                    }
                  }
                },
                _callee5,
                this
              );
            })
          );

          function _initializeViewerComponents() {
            return _initializeViewerComponents2.apply(this, arguments);
          }

          return _initializeViewerComponents;
        })(),
        run: function run(config) {
          this.initialize(config).then(webViewerInitialized);
        },
        zoomIn: function zoomIn(ticks) {
          var newScale = this.pdfViewer.currentScale;

          do {
            newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
            newScale = Math.ceil(newScale * 10) / 10;
            newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
          } while (--ticks > 0 && newScale < _ui_utils.MAX_SCALE);

          this.pdfViewer.currentScaleValue = newScale;
        },
        zoomOut: function zoomOut(ticks) {
          var newScale = this.pdfViewer.currentScale;

          do {
            newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
            newScale = Math.floor(newScale * 10) / 10;
            newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
          } while (--ticks > 0 && newScale > _ui_utils.MIN_SCALE);

          this.pdfViewer.currentScaleValue = newScale;
        },
        zoomReset: function zoomReset() {
          var ignoreDuplicate =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;

          if (this.pdfViewer.isInPresentationMode) {
            return;
          } else if (
            ignoreDuplicate &&
            this.pdfViewer.currentScaleValue === _ui_utils.DEFAULT_SCALE_VALUE
          ) {
            return;
          }

          this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
        },

        get pagesCount() {
          return this.pdfDocument ? this.pdfDocument.numPages : 0;
        },

        set page(val) {
          this.pdfViewer.currentPageNumber = val;
        },

        get page() {
          return this.pdfViewer.currentPageNumber;
        },

        get printing() {
          return !!this.printService;
        },

        get supportsPrinting() {
          return PDFPrintServiceFactory.instance.supportsPrinting;
        },

        get supportsFullscreen() {
          var support;
          var doc = document.documentElement;
          support = !!(
            doc.requestFullscreen ||
            doc.mozRequestFullScreen ||
            doc.webkitRequestFullScreen ||
            doc.msRequestFullscreen
          );

          if (
            document.fullscreenEnabled === false ||
            document.mozFullScreenEnabled === false ||
            document.webkitFullscreenEnabled === false ||
            document.msFullscreenEnabled === false
          ) {
            support = false;
          }

          return (0, _pdfjsLib.shadow)(this, "supportsFullscreen", support);
        },

        get supportsIntegratedFind() {
          return this.externalServices.supportsIntegratedFind;
        },

        get supportsDocumentFonts() {
          return this.externalServices.supportsDocumentFonts;
        },

        get supportsDocumentColors() {
          return this.externalServices.supportsDocumentColors;
        },

        get loadingBar() {
          var bar = new _ui_utils.ProgressBar("#loadingBar");
          return (0, _pdfjsLib.shadow)(this, "loadingBar", bar);
        },

        get supportedMouseWheelZoomModifierKeys() {
          return this.externalServices.supportedMouseWheelZoomModifierKeys;
        },

        initPassiveLoading: function initPassiveLoading() {
          throw new Error("Not implemented: initPassiveLoading");
        },
        setTitleUsingUrl: function setTitleUsingUrl() {
          var url =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : "";
          this.url = url;
          this.baseUrl = url.split("#")[0];
          var title = (0, _ui_utils.getPDFFileNameFromURL)(url, "");

          if (!title) {
            try {
              title =
                decodeURIComponent((0, _pdfjsLib.getFilenameFromUrl)(url)) ||
                url;
            } catch (ex) {
              title = url;
            }
          }

          this.setTitle(title);
        },
        setTitle: function setTitle(title) {
          if (this.isViewerEmbedded) {
            return;
          }

          document.title = title;
        },
        close: (function() {
          var _close = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee6() {
              var errorWrapper, promise;
              return _regenerator.default.wrap(
                function _callee6$(_context6) {
                  while (1) {
                    switch ((_context6.prev = _context6.next)) {
                      case 0:
                        errorWrapper = this.appConfig.errorWrapper.container;
                        errorWrapper.setAttribute("hidden", "true");

                        if (this.pdfLoadingTask) {
                          _context6.next = 4;
                          break;
                        }

                        return _context6.abrupt("return");

                      case 4:
                        promise = this.pdfLoadingTask.destroy();
                        this.pdfLoadingTask = null;

                        if (this.pdfDocument) {
                          this.pdfDocument = null;
                          this.pdfThumbnailViewer.setDocument(null);
                          this.pdfViewer.setDocument(null);
                          this.pdfLinkService.setDocument(null);
                          this.pdfDocumentProperties.setDocument(null);
                        }

                        this.store = null;
                        this.isInitialViewSet = false;
                        this.downloadComplete = false;
                        this.url = "";
                        this.baseUrl = "";
                        this.contentDispositionFilename = null;
                        this.pdfSidebar.reset();
                        this.pdfOutlineViewer.reset();
                        this.pdfAttachmentViewer.reset();
                        this.findBar.reset();
                        this.toolbar.reset();
                        this.secondaryToolbar.reset();

                        if (typeof PDFBug !== "undefined") {
                          PDFBug.cleanup();
                        }

                        return _context6.abrupt("return", promise);

                      case 21:
                      case "end":
                        return _context6.stop();
                    }
                  }
                },
                _callee6,
                this
              );
            })
          );

          function close() {
            return _close.apply(this, arguments);
          }

          return close;
        })(),
        open: (function() {
          var _open = _asyncToGenerator(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee7(file, args) {
              var _this2 = this;

              var workerParameters,
                key,
                parameters,
                apiParameters,
                _key,
                prop,
                loadingTask;

              return _regenerator.default.wrap(
                function _callee7$(_context7) {
                  while (1) {
                    switch ((_context7.prev = _context7.next)) {
                      case 0:
                        if (!this.pdfLoadingTask) {
                          _context7.next = 3;
                          break;
                        }

                        _context7.next = 3;
                        return this.close();

                      case 3:
                        workerParameters = _app_options.AppOptions.getAll(
                          _app_options.OptionKind.WORKER
                        );

                        for (key in workerParameters) {
                          _pdfjsLib.GlobalWorkerOptions[key] =
                            workerParameters[key];
                        }

                        parameters = Object.create(null);

                        if (typeof file === "string") {
                          this.setTitleUsingUrl(file);
                          parameters.url = file;
                        } else if (file && "byteLength" in file) {
                          parameters.data = file;
                        } else if (file.url && file.originalUrl) {
                          this.setTitleUsingUrl(file.originalUrl);
                          parameters.url = file.url;
                        }

                        apiParameters = _app_options.AppOptions.getAll(
                          _app_options.OptionKind.API
                        );

                        for (_key in apiParameters) {
                          parameters[_key] = apiParameters[_key];
                        }

                        if (args) {
                          for (prop in args) {
                            if (prop === "length") {
                              this.pdfDocumentProperties.setFileSize(
                                args[prop]
                              );
                            }

                            parameters[prop] = args[prop];
                          }
                        }

                        loadingTask = (0, _pdfjsLib.getDocument)(parameters);
                        this.pdfLoadingTask = loadingTask;

                        loadingTask.onPassword = function(
                          updateCallback,
                          reason
                        ) {
                          _this2.passwordPrompt.setUpdateCallback(
                            updateCallback,
                            reason
                          );

                          _this2.passwordPrompt.open();
                        };

                        loadingTask.onProgress = function(_ref) {
                          var loaded = _ref.loaded,
                            total = _ref.total;

                          _this2.progress(loaded / total);
                        };

                        loadingTask.onUnsupportedFeature = this.fallback.bind(
                          this
                        );
                        return _context7.abrupt(
                          "return",
                          loadingTask.promise.then(
                            function(pdfDocument) {
                              _this2.load(pdfDocument);
                            },
                            function(exception) {
                              if (loadingTask !== _this2.pdfLoadingTask) {
                                return;
                              }

                              var message = exception && exception.message;
                              var loadingErrorMessage;

                              if (
                                exception instanceof
                                _pdfjsLib.InvalidPDFException
                              ) {
                                loadingErrorMessage = _this2.l10n.get(
                                  "invalid_file_error",
                                  null,
                                  "Invalid or corrupted PDF file."
                                );
                              } else if (
                                exception instanceof
                                _pdfjsLib.MissingPDFException
                              ) {
                                loadingErrorMessage = _this2.l10n.get(
                                  "missing_file_error",
                                  null,
                                  "Missing PDF file."
                                );
                              } else if (
                                exception instanceof
                                _pdfjsLib.UnexpectedResponseException
                              ) {
                                loadingErrorMessage = _this2.l10n.get(
                                  "unexpected_response_error",
                                  null,
                                  "Unexpected server response."
                                );
                              } else {
                                loadingErrorMessage = _this2.l10n.get(
                                  "loading_error",
                                  null,
                                  "An error occurred while loading the PDF."
                                );
                              }

                              return loadingErrorMessage.then(function(msg) {
                                _this2.error(msg, {
                                  message: message
                                });

                                throw new Error(msg);
                              });
                            }
                          )
                        );

                      case 16:
                      case "end":
                        return _context7.stop();
                    }
                  }
                },
                _callee7,
                this
              );
            })
          );

          function open(_x2, _x3) {
            return _open.apply(this, arguments);
          }

          return open;
        })(),
        download: function download() {
          var _this3 = this;

          function downloadByUrl() {
            downloadManager.downloadUrl(url, filename);
          }

          var url = this.baseUrl;
          var filename =
            this.contentDispositionFilename ||
            (0, _ui_utils.getPDFFileNameFromURL)(this.url);
          var downloadManager = this.downloadManager;

          downloadManager.onerror = function(err) {
            _this3.error("PDF failed to download: ".concat(err));
          };

          if (!this.pdfDocument || !this.downloadComplete) {
            downloadByUrl();
            return;
          }

          this.pdfDocument
            .getData()
            .then(function(data) {
              var blob = new Blob([data], {
                type: "application/pdf"
              });
              downloadManager.download(blob, url, filename);
            })
            .catch(downloadByUrl);
        },
        fallback: function fallback(featureId) {},
        error: function error(message, moreInfo) {
          var moreInfoText = [
            this.l10n.get(
              "error_version_info",
              {
                version: _pdfjsLib.version || "?",
                build: _pdfjsLib.build || "?"
              },
              "PDF.js v{{version}} (build: {{build}})"
            )
          ];

          if (moreInfo) {
            moreInfoText.push(
              this.l10n.get(
                "error_message",
                {
                  message: moreInfo.message
                },
                "Message: {{message}}"
              )
            );

            if (moreInfo.stack) {
              moreInfoText.push(
                this.l10n.get(
                  "error_stack",
                  {
                    stack: moreInfo.stack
                  },
                  "Stack: {{stack}}"
                )
              );
            } else {
              if (moreInfo.filename) {
                moreInfoText.push(
                  this.l10n.get(
                    "error_file",
                    {
                      file: moreInfo.filename
                    },
                    "File: {{file}}"
                  )
                );
              }

              if (moreInfo.lineNumber) {
                moreInfoText.push(
                  this.l10n.get(
                    "error_line",
                    {
                      line: moreInfo.lineNumber
                    },
                    "Line: {{line}}"
                  )
                );
              }
            }
          }

          var errorWrapperConfig = this.appConfig.errorWrapper;
          var errorWrapper = errorWrapperConfig.container;
          errorWrapper.removeAttribute("hidden");
          var errorMessage = errorWrapperConfig.errorMessage;
          errorMessage.textContent = message;
          var closeButton = errorWrapperConfig.closeButton;

          closeButton.onclick = function() {
            errorWrapper.setAttribute("hidden", "true");
          };

          var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
          var moreInfoButton = errorWrapperConfig.moreInfoButton;
          var lessInfoButton = errorWrapperConfig.lessInfoButton;

          moreInfoButton.onclick = function() {
            errorMoreInfo.removeAttribute("hidden");
            moreInfoButton.setAttribute("hidden", "true");
            lessInfoButton.removeAttribute("hidden");
            errorMoreInfo.style.height = errorMoreInfo.scrollHeight + "px";
          };

          lessInfoButton.onclick = function() {
            errorMoreInfo.setAttribute("hidden", "true");
            moreInfoButton.removeAttribute("hidden");
            lessInfoButton.setAttribute("hidden", "true");
          };

          moreInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
          lessInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
          closeButton.oncontextmenu = _ui_utils.noContextMenuHandler;
          moreInfoButton.removeAttribute("hidden");
          lessInfoButton.setAttribute("hidden", "true");
          Promise.all(moreInfoText).then(function(parts) {
            errorMoreInfo.value = parts.join("\n");
          });
        },
        progress: function progress(level) {
          var _this4 = this;

          if (this.downloadComplete) {
            return;
          }

          var percent = Math.round(level * 100);

          if (percent > this.loadingBar.percent || isNaN(percent)) {
            this.loadingBar.percent = percent;
            var disableAutoFetch = this.pdfDocument
              ? this.pdfDocument.loadingParams["disableAutoFetch"]
              : _app_options.AppOptions.get("disableAutoFetch");

            if (disableAutoFetch && percent) {
              if (this.disableAutoFetchLoadingBarTimeout) {
                clearTimeout(this.disableAutoFetchLoadingBarTimeout);
                this.disableAutoFetchLoadingBarTimeout = null;
              }

              this.loadingBar.show();
              this.disableAutoFetchLoadingBarTimeout = setTimeout(function() {
                _this4.loadingBar.hide();

                _this4.disableAutoFetchLoadingBarTimeout = null;
              }, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
            }
          }
        },
        load: function load(pdfDocument) {
          var _this5 = this;

          this.pdfDocument = pdfDocument;
          pdfDocument.getDownloadInfo().then(function() {
            _this5.downloadComplete = true;

            _this5.loadingBar.hide();

            firstPagePromise.then(function() {
              _this5.eventBus.dispatch("documentloaded", {
                source: _this5
              });
            });
          });
          var pageModePromise = pdfDocument.getPageMode().catch(function() {});
          var openActionDestPromise = pdfDocument
            .getOpenActionDestination()
            .catch(function() {});
          this.toolbar.setPagesCount(pdfDocument.numPages, false);
          this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
          var store = (this.store = new _view_history.ViewHistory(
            pdfDocument.fingerprint
          ));
          var baseDocumentUrl;
          baseDocumentUrl = null;
          this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
          this.pdfDocumentProperties.setDocument(pdfDocument, this.url);
          var pdfViewer = this.pdfViewer;
          pdfViewer.setDocument(pdfDocument);
          var firstPagePromise = pdfViewer.firstPagePromise;
          var pagesPromise = pdfViewer.pagesPromise;
          var onePageRendered = pdfViewer.onePageRendered;
          var pdfThumbnailViewer = this.pdfThumbnailViewer;
          pdfThumbnailViewer.setDocument(pdfDocument);
          firstPagePromise.then(function(pdfPage) {
            _this5.loadingBar.setWidth(_this5.appConfig.viewerContainer);

            var storePromise = store
              .getMultiple({
                page: null,
                zoom: _ui_utils.DEFAULT_SCALE_VALUE,
                scrollLeft: "0",
                scrollTop: "0",
                rotation: null,
                sidebarView: _pdf_sidebar.SidebarView.UNKNOWN,
                scrollMode: _ui_utils.ScrollMode.UNKNOWN,
                spreadMode: _ui_utils.SpreadMode.UNKNOWN
              })
              .catch(function() {});
            Promise.all([storePromise, pageModePromise, openActionDestPromise])
              .then(
                /*#__PURE__*/
                (function() {
                  var _ref3 = _asyncToGenerator(
                    /*#__PURE__*/
                    _regenerator.default.mark(function _callee8(_ref2) {
                      var _ref4,
                        _ref4$,
                        values,
                        pageMode,
                        openActionDest,
                        viewOnLoad,
                        initialBookmark,
                        zoom,
                        hash,
                        rotation,
                        sidebarView,
                        scrollMode,
                        spreadMode;

                      return _regenerator.default.wrap(function _callee8$(
                        _context8
                      ) {
                        while (1) {
                          switch ((_context8.prev = _context8.next)) {
                            case 0:
                              (_ref4 = _slicedToArray(_ref2, 3)),
                                (_ref4$ = _ref4[0]),
                                (values = _ref4$ === void 0 ? {} : _ref4$),
                                (pageMode = _ref4[1]),
                                (openActionDest = _ref4[2]);
                              viewOnLoad = _app_options.AppOptions.get(
                                "viewOnLoad"
                              );

                              _this5._initializePdfHistory({
                                fingerprint: pdfDocument.fingerprint,
                                viewOnLoad: viewOnLoad,
                                initialDest: openActionDest
                              });

                              initialBookmark = _this5.initialBookmark;
                              zoom = _app_options.AppOptions.get(
                                "defaultZoomValue"
                              );
                              hash = zoom ? "zoom=".concat(zoom) : null;
                              rotation = null;
                              sidebarView = _app_options.AppOptions.get(
                                "sidebarViewOnLoad"
                              );
                              scrollMode = _app_options.AppOptions.get(
                                "scrollModeOnLoad"
                              );
                              spreadMode = _app_options.AppOptions.get(
                                "spreadModeOnLoad"
                              );

                              if (
                                values.page &&
                                viewOnLoad !== ViewOnLoad.INITIAL
                              ) {
                                hash =
                                  "page="
                                    .concat(values.page, "&zoom=")
                                    .concat(zoom || values.zoom, ",") +
                                  ""
                                    .concat(values.scrollLeft, ",")
                                    .concat(values.scrollTop);
                                rotation = parseInt(values.rotation, 10);

                                if (
                                  sidebarView ===
                                  _pdf_sidebar.SidebarView.UNKNOWN
                                ) {
                                  sidebarView = values.sidebarView | 0;
                                }

                       