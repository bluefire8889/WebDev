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
    define("pdfjs-dist/build/pdf.worker", [], factory);
  else if (typeof exports === "object")
    exports["pdfjs-dist/build/pdf.worker"] = factory();
  else root["pdfjs-dist/build/pdf.worker"] = root.pdfjsWorker = factory();
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

        var pdfjsCoreWorker = __w_pdfjs_require__(1);

        exports.WorkerMessageHandler = pdfjsCoreWorker.WorkerMessageHandler;

        /***/
      },
      /* 1 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.WorkerMessageHandler = exports.WorkerTask = void 0;

        var _regenerator = _interopRequireDefault(__w_pdfjs_require__(2));

        var _util = __w_pdfjs_require__(6);

        var _pdf_manager = __w_pdfjs_require__(152);

        var _is_node = _interopRequireDefault(__w_pdfjs_require__(9));

        var _message_handler = __w_pdfjs_require__(192);

        var _primitives = __w_pdfjs_require__(157);

        var _core_utils = __w_pdfjs_require__(154);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

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

        var WorkerTask = (function WorkerTaskClosure() {
          function WorkerTask(name) {
            this.name = name;
            this.terminated = false;
            this._capability = (0, _util.createPromiseCapability)();
          }

          WorkerTask.prototype = {
            get finished() {
              return this._capability.promise;
            },

            finish: function finish() {
              this._capability.resolve();
            },
            terminate: function terminate() {
              this.terminated = true;
            },
            ensureNotTerminated: function ensureNotTerminated() {
              if (this.terminated) {
                throw new Error("Worker task was terminated");
              }
            }
          };
          return WorkerTask;
        })();

        exports.WorkerTask = WorkerTask;

        var PDFWorkerStream = (function PDFWorkerStreamClosure() {
          function PDFWorkerStream(msgHandler) {
            this._msgHandler = msgHandler;
            this._contentLength = null;
            this._fullRequestReader = null;
            this._rangeRequestReaders = [];
          }

          PDFWorkerStream.prototype = {
            getFullReader: function getFullReader() {
              (0, _util.assert)(!this._fullRequestReader);
              this._fullRequestReader = new PDFWorkerStreamReader(
                this._msgHandler
              );
              return this._fullRequestReader;
            },
            getRangeReader: function getRangeReader(begin, end) {
              var reader = new PDFWorkerStreamRangeReader(
                begin,
                end,
                this._msgHandler
              );

              this._rangeRequestReaders.push(reader);

              return reader;
            },
            cancelAllRequests: function cancelAllRequests(reason) {
              if (this._fullRequestReader) {
                this._fullRequestReader.cancel(reason);
              }

              var readers = this._rangeRequestReaders.slice(0);

              readers.forEach(function(reader) {
                reader.cancel(reason);
              });
            }
          };

          function PDFWorkerStreamReader(msgHandler) {
            var _this = this;

            this._msgHandler = msgHandler;
            this._contentLength = null;
            this._isRangeSupported = false;
            this._isStreamingSupported = false;

            var readableStream = this._msgHandler.sendWithStream("GetReader");

            this._reader = readableStream.getReader();
            this._headersReady = this._msgHandler
              .sendWithPromise("ReaderHeadersReady")
              .then(function(data) {
                _this._isStreamingSupported = data.isStreamingSupported;
                _this._isRangeSupported = data.isRangeSupported;
                _this._contentLength = data.contentLength;
              });
          }

          PDFWorkerStreamReader.prototype = {
            get headersReady() {
              return this._headersReady;
            },

            get contentLength() {
              return this._contentLength;
            },

            get isStreamingSupported() {
              return this._isStreamingSupported;
            },

            get isRangeSupported() {
              return this._isRangeSupported;
            },

            read: function read() {
              return this._reader.read().then(function(_ref) {
                var value = _ref.value,
                  done = _ref.done;

                if (done) {
                  return {
                    value: undefined,
                    done: true
                  };
                }

                return {
                  value: value.buffer,
                  done: false
                };
              });
            },
            cancel: function cancel(reason) {
              this._reader.cancel(reason);
            }
          };

          function PDFWorkerStreamRangeReader(begin, end, msgHandler) {
            this._msgHandler = msgHandler;
            this.onProgress = null;

            var readableStream = this._msgHandler.sendWithStream(
              "GetRangeReader",
              {
                begin: begin,
                end: end
              }
            );

            this._reader = readableStream.getReader();
          }

          PDFWorkerStreamRangeReader.prototype = {
            get isStreamingSupported() {
              return false;
            },

            read: function read() {
              return this._reader.read().then(function(_ref2) {
                var value = _ref2.value,
                  done = _ref2.done;

                if (done) {
                  return {
                    value: undefined,
                    done: true
                  };
                }

                return {
                  value: value.buffer,
                  done: false
                };
              });
            },
            cancel: function cancel(reason) {
              this._reader.cancel(reason);
            }
          };
          return PDFWorkerStream;
        })();

        var WorkerMessageHandler = {
          setup: function setup(handler, port) {
            var testMessageProcessed = false;
            handler.on("test", function wphSetupTest(data) {
              if (testMessageProcessed) {
                return;
              }

              testMessageProcessed = true;

              if (!(data instanceof Uint8Array)) {
                handler.send("test", false);
                return;
              }

              var supportTransfers = data[0] === 255;
              handler.postMessageTransfers = supportTransfers;
              var xhr = new XMLHttpRequest();
              var responseExists = "response" in xhr;

              try {
                xhr.responseType;
              } catch (e) {
                responseExists = false;
              }

              if (!responseExists) {
                handler.send("test", false);
                return;
              }

              handler.send("test", {
                supportTypedArray: true,
                supportTransfers: supportTransfers
              });
            });
            handler.on("configure", function wphConfigure(data) {
              (0, _util.setVerbosityLevel)(data.verbosity);
            });
            handler.on("GetDocRequest", function wphSetupDoc(data) {
              return WorkerMessageHandler.createDocumentHandler(data, port);
            });
          },
          createDocumentHandler: function createDocumentHandler(
            docParams,
            port
          ) {
            var pdfManager;
            var terminated = false;
            var cancelXHRs = null;
            var WorkerTasks = [];
            var verbosity = (0, _util.getVerbosityLevel)();
            var apiVersion = docParams.apiVersion;
            var workerVersion = "2.2.93";

            if (apiVersion !== workerVersion) {
              throw new Error(
                'The API version "'.concat(apiVersion, '" does not match ') +
                  'the Worker version "'.concat(workerVersion, '".')
              );
            }

            var docId = docParams.docId;
            var docBaseUrl = docParams.docBaseUrl;
            var workerHandlerName = docParams.docId + "_worker";
            var handler = new _message_handler.MessageHandler(
              workerHandlerName,
              docId,
              port
            );
            handler.postMessageTransfers = docParams.postMessageTransfers;

            function ensureNotTerminated() {
              if (terminated) {
                throw new Error("Worker was terminated");
              }
            }

            function startWorkerTask(task) {
              WorkerTasks.push(task);
            }

            function finishWorkerTask(task) {
              task.finish();
              var i = WorkerTasks.indexOf(task);
              WorkerTasks.splice(i, 1);
            }

            function loadDocument(_x) {
              return _loadDocument.apply(this, arguments);
            }

            function _loadDocument() {
              _loadDocument = _asyncToGenerator(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(recoveryMode) {
                  var _ref6, _ref7, numPages, fingerprint;

                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          _context.next = 2;
                          return pdfManager.ensureDoc("checkHeader");

                        case 2:
                          _context.next = 4;
                          return pdfManager.ensureDoc("parseStartXRef");

                        case 4:
                          _context.next = 6;
                          return pdfManager.ensureDoc("parse", [recoveryMode]);

                        case 6:
                          if (recoveryMode) {
                            _context.next = 9;
                            break;
                          }

                          _context.next = 9;
                          return pdfManager.ensureDoc("checkFirstPage");

                        case 9:
                          _context.next = 11;
                          return Promise.all([
                            pdfManager.ensureDoc("numPages"),
                            pdfManager.ensureDoc("fingerprint")
                          ]);

                        case 11:
                          _ref6 = _context.sent;
                          _ref7 = _slicedToArray(_ref6, 2);
                          numPages = _ref7[0];
                          fingerprint = _ref7[1];
                          return _context.abrupt("return", {
                            numPages: numPages,
                            fingerprint: fingerprint
                          });

                        case 16:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })
              );
              return _loadDocument.apply(this, arguments);
            }

            function getPdfManager(data, evaluatorOptions) {
              var pdfManagerCapability = (0, _util.createPromiseCapability)();
              var pdfManager;
              var source = data.source;

              if (source.data) {
                try {
                  pdfManager = new _pdf_manager.LocalPdfManager(
                    docId,
                    source.data,
                    source.password,
                    evaluatorOptions,
                    docBaseUrl
                  );
                  pdfManagerCapability.resolve(pdfManager);
                } catch (ex) {
                  pdfManagerCapability.reject(ex);
                }

                return pdfManagerCapability.promise;
              }

              var pdfStream,
                cachedChunks = [];

              try {
                pdfStream = new PDFWorkerStream(handler);
              } catch (ex) {
                pdfManagerCapability.reject(ex);
                return pdfManagerCapability.promise;
              }

              var fullRequest = pdfStream.getFullReader();
              fullRequest.headersReady
                .then(function() {
                  if (!fullRequest.isRangeSupported) {
                    return;
                  }

                  var disableAutoFetch =
                    source.disableAutoFetch || fullRequest.isStreamingSupported;
                  pdfManager = new _pdf_manager.NetworkPdfManager(
                    docId,
                    pdfStream,
                    {
                      msgHandler: handler,
                      password: source.password,
                      length: fullRequest.contentLength,
                      disableAutoFetch: disableAutoFetch,
                      rangeChunkSize: source.rangeChunkSize
                    },
                    evaluatorOptions,
                    docBaseUrl
                  );

                  for (var i = 0; i < cachedChunks.length; i++) {
                    pdfManager.sendProgressiveData(cachedChunks[i]);
                  }

                  cachedChunks = [];
                  pdfManagerCapability.resolve(pdfManager);
                  cancelXHRs = null;
                })
                .catch(function(reason) {
                  pdfManagerCapability.reject(reason);
                  cancelXHRs = null;
                });
              var loaded = 0;

              var flushChunks = function flushChunks() {
                var pdfFile = (0, _util.arraysToBytes)(cachedChunks);

                if (source.length && pdfFile.length !== source.length) {
                  (0, _util.warn)(
                    "reported HTTP length is different from actual"
                  );
                }

                try {
                  pdfManager = new _pdf_manager.LocalPdfManager(
                    docId,
                    pdfFile,
                    source.password,
                    evaluatorOptions,
                    docBaseUrl
                  );
                  pdfManagerCapability.resolve(pdfManager);
                } catch (ex) {
                  pdfManagerCapability.reject(ex);
                }

                cachedChunks = [];
              };

              var readPromise = new Promise(function(resolve, reject) {
                var readChunk = function readChunk(chunk) {
                  try {
                    ensureNotTerminated();

                    if (chunk.done) {
                      if (!pdfManager) {
                        flushChunks();
                      }

                      cancelXHRs = null;
                      return;
                    }

                    var data = chunk.value;
                    loaded += (0, _util.arrayByteLength)(data);

                    if (!fullRequest.isStreamingSupported) {
                      handler.send("DocProgress", {
                        loaded: loaded,
                        total: Math.max(loaded, fullRequest.contentLength || 0)
                      });
                    }

                    if (pdfManager) {
                      pdfManager.sendProgressiveData(data);
                    } else {
                      cachedChunks.push(data);
                    }

                    fullRequest.read().then(readChunk, reject);
                  } catch (e) {
                    reject(e);
                  }
                };

                fullRequest.read().then(readChunk, reject);
              });
              readPromise.catch(function(e) {
                pdfManagerCapability.reject(e);
                cancelXHRs = null;
              });

              cancelXHRs = function cancelXHRs() {
                pdfStream.cancelAllRequests("abort");
              };

              return pdfManagerCapability.promise;
            }

            function setupDoc(data) {
              function onSuccess(doc) {
                ensureNotTerminated();
                handler.send("GetDoc", {
                  pdfInfo: doc
                });
              }

              function onFailure(e) {
                ensureNotTerminated();

                if (e instanceof _util.PasswordException) {
                  var task = new WorkerTask(
                    "PasswordException: response " + e.code
                  );
                  startWorkerTask(task);
                  handler
                    .sendWithPromise("PasswordRequest", e)
                    .then(function(data) {
                      finishWorkerTask(task);
                      pdfManager.updatePassword(data.password);
                      pdfManagerReady();
                    })
                    .catch(
                      function(boundException) {
                        finishWorkerTask(task);
                        handler.send("PasswordException", boundException);
                      }.bind(null, e)
                    );
                } else if (e instanceof _util.InvalidPDFException) {
                  handler.send("InvalidPDF", e);
                } else if (e instanceof _util.MissingPDFException) {
                  handler.send("MissingPDF", e);
                } else if (e instanceof _util.UnexpectedResponseException) {
                  handler.send("UnexpectedResponse", e);
                } else {
                  handler.send(
                    "UnknownError",
                    new _util.UnknownErrorException(e.message, e.toString())
                  );
                }
              }

              function pdfManagerReady() {
                ensureNotTerminated();
                loadDocument(false).then(
                  onSuccess,
                  function loadFailure(ex) {
                    ensureNotTerminated();

                    if (!(ex instanceof _core_utils.XRefParseException)) {
                      onFailure(ex);
                      return;
                    }

                    pdfManager.requestLoadedStream();
                    pdfManager.onLoadedStream().then(function() {
                      ensureNotTerminated();
                      loadDocument(true).then(onSuccess, onFailure);
                    });
                  },
                  onFailure
                );
              }

              ensureNotTerminated();
              var evaluatorOptions = {
                forceDataSchema: data.disableCreateObjectURL,
                maxImageSize: data.maxImageSize,
                disableFontFace: data.disableFontFace,
                nativeImageDecoderSupport: data.nativeImageDecoderSupport,
                ignoreErrors: data.ignoreErrors,
                isEvalSupported: data.isEvalSupported
              };
              getPdfManager(data, evaluatorOptions)
                .then(function(newPdfManager) {
                  if (terminated) {
                    newPdfManager.terminate();
                    throw new Error("Worker was terminated");
                  }

                  pdfManager = newPdfManager;
                  pdfManager.onLoadedStream().then(function(stream) {
                    handler.send("DataLoaded", {
                      length: stream.bytes.byteLength
                    });
                  });
                })
                .then(pdfManagerReady, onFailure);
            }

            handler.on("GetPage", function wphSetupGetPage(data) {
              return pdfManager.getPage(data.pageIndex).then(function(page) {
                return Promise.all([
                  pdfManager.ensure(page, "rotate"),
                  pdfManager.ensure(page, "ref"),
                  pdfManager.ensure(page, "userUnit"),
                  pdfManager.ensure(page, "view")
                ]).then(function(_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 4),
                    rotate = _ref4[0],
                    ref = _ref4[1],
                    userUnit = _ref4[2],
                    view = _ref4[3];

                  return {
                    rotate: rotate,
                    ref: ref,
                    userUnit: userUnit,
                    view: view
                  };
                });
              });
            });
            handler.on("GetPageIndex", function wphSetupGetPageIndex(data) {
              var ref = new _primitives.Ref(data.ref.num, data.ref.gen);
              var catalog = pdfManager.pdfDocument.catalog;
              return catalog.getPageIndex(ref);
            });
            handler.on("GetDestinations", function wphSetupGetDestinations(
              data
            ) {
              return pdfManager.ensureCatalog("destinations");
            });
            handler.on("GetDestination", function wphSetupGetDestination(data) {
              return pdfManager.ensureCatalog("getDestination", [data.id]);
            });
            handler.on("GetPageLabels", function wphSetupGetPageLabels(data) {
              return pdfManager.ensureCatalog("pageLabels");
            });
            handler.on("GetPageMode", function wphSetupGetPageMode(data) {
              return pdfManager.ensureCatalog("pageMode");
            });
            handler.on("getOpenActionDestination", function(data) {
              return pdfManager.ensureCatalog("openActionDestination");
            });
            handler.on("GetAttachments", function wphSetupGetAttachments(data) {
              return pdfManager.ensureCatalog("attachments");
            });
            handler.on("GetJavaScript", function wphSetupGetJavaScript(data) {
              return pdfManager.ensureCatalog("javaScript");
            });
            handler.on("GetOutline", function wphSetupGetOutline(data) {
              return pdfManager.ensureCatalog("documentOutline");
            });
            handler.on("GetPermissions", function(data) {
              return pdfManager.ensureCatalog("permissions");
            });
            handler.on("GetMetadata", function wphSetupGetMetadata(data) {
              return Promise.all([
                pdfManager.ensureDoc("documentInfo"),
                pdfManager.ensureCatalog("metadata")
              ]);
            });
            handler.on("GetData", function wphSetupGetData(data) {
              pdfManager.requestLoadedStream();
              return pdfManager.onLoadedStream().then(function(stream) {
                return stream.bytes;
              });
            });
            handler.on("GetStats", function wphSetupGetStats(data) {
              return pdfManager.pdfDocument.xref.stats;
            });
            handler.on("GetAnnotations", function(_ref5) {
              var pageIndex = _ref5.pageIndex,
                intent = _ref5.intent;
              return pdfManager.getPage(pageIndex).then(function(page) {
                return page.getAnnotationsData(intent);
              });
            });
            handler.on(
              "RenderPageRequest",
              function wphSetupRenderPage(data) {
                var pageIndex = data.pageIndex;
                pdfManager.getPage(pageIndex).then(function(page) {
                  var task = new WorkerTask(
                    "RenderPageRequest: page " + pageIndex
                  );
                  startWorkerTask(task);
                  var start =
                    verbosity >= _util.VerbosityLevel.INFOS ? Date.now() : 0;
                  page
                    .getOperatorList({
                      handler: handler,
                      task: task,
                      intent: data.intent,
                      renderInteractiveForms: data.renderInteractiveForms
                    })
                    .then(
                      function(operatorList) {
                        finishWorkerTask(task);

                        if (start) {
                          (0, _util.info)(
                            "page=".concat(
                              pageIndex + 1,
                              " - getOperatorList: time="
                            ) +
                              ""
                                .concat(Date.now() - start, "ms, len=")
                                .concat(operatorList.totalLength)
                          );
                        }
                      },
                      function(e) {
                        finishWorkerTask(task);

                        if (task.terminated) {
                          return;
                        }

                        handler.send("UnsupportedFeature", {
                          featureId: _util.UNSUPPORTED_FEATURES.unknown
                        });
                        var minimumStackMessage =
                          "worker.js: while trying to getPage() and getOperatorList()";
                        var wrappedException;

                        if (typeof e === "string") {
                          wrappedException = {
                            message: e,
                            stack: minimumStackMessage
                          };
                        } else if (_typeof(e) === "object") {
                          wrappedException = {
                            message: e.message || e.toString(),
                            stack: e.stack || minimumStackMessage
                          };
                        } else {
                          wrappedException = {
                            message: "Unknown exception type: " + _typeof(e),
                            stack: minimumStackMessage
                          };
                        }

                        handler.send("PageError", {
                          pageIndex: pageIndex,
                          error: wrappedException,
                          intent: data.intent
                        });
                      }
                    );
                });
              },
              this
            );
            handler.on("GetTextContent", function wphExtractText(data, sink) {
              var pageIndex = data.pageIndex;

              sink.onPull = function(desiredSize) {};

              sink.onCancel = function(reason) {};

              pdfManager.getPage(pageIndex).then(function(page) {
                var task = new WorkerTask("GetTextContent: page " + pageIndex);
                startWorkerTask(task);
                var start =
                  verbosity >= _util.VerbosityLevel.INFOS ? Date.now() : 0;
                page
                  .extractTextContent({
                    handler: handler,
                    task: task,
                    sink: sink,
                    normalizeWhitespace: data.normalizeWhitespace,
                    combineTextItems: data.combineTextItems
                  })
                  .then(
                    function() {
                      finishWorkerTask(task);

                      if (start) {
                        (0, _util.info)(
                          "page=".concat(
                            pageIndex + 1,
                            " - getTextContent: time="
                          ) + "".concat(Date.now() - start, "ms")
                        );
                      }

                      sink.close();
                    },
                    function(reason) {
                      finishWorkerTask(task);

                      if (task.terminated) {
                        return;
                      }

                      sink.error(reason);
                      throw reason;
                    }
                  );
              });
            });
            handler.on("FontFallback", function(data) {
              return pdfManager.fontFallback(data.id, handler);
            });
            handler.on("Cleanup", function wphCleanup(data) {
              return pdfManager.cleanup();
            });
            handler.on("Terminate", function wphTerminate(data) {
              terminated = true;

              if (pdfManager) {
                pdfManager.terminate();
                pdfManager = null;
              }

              if (cancelXHRs) {
                cancelXHRs();
              }

              var waitOn = [];
              WorkerTasks.forEach(function(task) {
                waitOn.push(task.finished);
                task.terminate();
              });
              return Promise.all(waitOn).then(function() {
                handler.destroy();
                handler = null;
              });
            });
            handler.on("Ready", function wphReady(data) {
              setupDoc(docParams);
              docParams = null;
            });
            return workerHandlerName;
          },
          initializeFromPort: function initializeFromPort(port) {
            var handler = new _message_handler.MessageHandler(
              "worker",
              "main",
              port
            );
            WorkerMessageHandler.setup(handler, port);
            handler.send("ready", null);
          }
        };
        exports.WorkerMessageHandler = WorkerMessageHandler;

        function isMessagePort(maybePort) {
          return (
            typeof maybePort.postMessage === "function" &&
            "onmessage" in maybePort
          );
        }

        if (
          typeof window === "undefined" &&
          !(0, _is_node.default)() &&
          typeof self !== "undefined" &&
          isMessagePort(self)
        ) {
          WorkerMessageHandler.initializeFromPort(self);
        }

        /***/
      },
      /* 2 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = __w_pdfjs_require__(3);

        /***/
      },
      /* 3 */
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

        var g =
          (function() {
            return (
              this ||
              ((typeof self === "undefined" ? "undefined" : _typeof(self)) ===
                "object" &&
                self)
            );
          })() || Function("return this")();

        var hadRuntime =
          g.regeneratorRuntime &&
          Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
        var oldRuntime = hadRuntime && g.regeneratorRuntime;
        g.regeneratorRuntime = undefined;
        module.exports = __w_pdfjs_require__(4);

        if (hadRuntime) {
          g.regeneratorRuntime = oldRuntime;
        } else {
          try {
            delete g.regeneratorRuntime;
          } catch (e) {
            g.regeneratorRuntime = undefined;
          }
        }

        /***/
      },
      /* 4 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */ (function(module) {
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

          !(function(global) {
            "use strict";

            var Op = Object.prototype;
            var hasOwn = Op.hasOwnProperty;
            var undefined;
            var $Symbol = typeof Symbol === "function" ? Symbol : {};
            var iteratorSymbol = $Symbol.iterator || "@@iterator";
            var asyncIteratorSymbol =
              $Symbol.asyncIterator || "@@asyncIterator";
            var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
            var inModule = (false ? undefined : _typeof(module)) === "object";
            var runtime = global.regeneratorRuntime;

            if (runtime) {
              if (inModule) {
                module.exports = runtime;
              }

              return;
            }

            runtime = global.regeneratorRuntime = inModule
              ? module.exports
              : {};

            function wrap(innerFn, outerFn, self, tryLocsList) {
              var protoGenerator =
                outerFn && outerFn.prototype instanceof Generator
                  ? outerFn
                  : Generator;
              var generator = Object.create(protoGenerator.prototype);
              var context = new Context(tryLocsList || []);
              generator._invoke = makeInvokeMethod(innerFn, self, context);
              return generator;
            }

            runtime.wrap = wrap;

            function tryCatch(fn, obj, arg) {
              try {
                return {
                  type: "normal",
                  arg: fn.call(obj, arg)
                };
              } catch (err) {
                return {
                  type: "throw",
                  arg: err
                };
              }
            }

            var GenStateSuspendedStart = "suspendedStart";
            var GenStateSuspendedYield = "suspendedYield";
            var GenStateExecuting = "executing";
            var GenStateCompleted = "completed";
            var ContinueSentinel = {};

            function Generator() {}

            function GeneratorFunction() {}

            function GeneratorFunctionPrototype() {}

            var IteratorPrototype = {};

            IteratorPrototype[iteratorSymbol] = function() {
              return this;
            };

            var getProto = Object.getPrototypeOf;
            var NativeIteratorPrototype =
              getProto && getProto(getProto(values([])));

            if (
              NativeIteratorPrototype &&
              NativeIteratorPrototype !== Op &&
              hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
            ) {
              IteratorPrototype = NativeIteratorPrototype;
            }

            var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
              IteratorPrototype
            ));
            GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
            GeneratorFunctionPrototype.constructor = GeneratorFunction;
            GeneratorFunctionPrototype[
              toStringTagSymbol
            ] = GeneratorFunction.displayName = "GeneratorFunction";

            function defineIteratorMethods(prototype) {
              ["next", "throw", "return"].forEach(function(method) {
                prototype[method] = function(arg) {
                  return this._invoke(method, arg);
                };
              });
            }

            runtime.isGeneratorFunction = function(genFun) {
              var ctor = typeof genFun === "function" && genFun.constructor;
              return ctor
                ? ctor === GeneratorFunction ||
                    (ctor.displayName || ctor.name) === "GeneratorFunction"
                : false;
            };

            runtime.mark = function(genFun) {
              if (Object.setPrototypeOf) {
                Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
              } else {
                genFun.__proto__ = GeneratorFunctionPrototype;

                if (!(toStringTagSymbol in genFun)) {
                  genFun[toStringTagSymbol] = "GeneratorFunction";
                }
              }

              genFun.prototype = Object.create(Gp);
              return genFun;
            };

            runtime.awrap = function(arg) {
              return {
                __await: arg
              };
            };

            function AsyncIterator(generator) {
              function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);

                if (record.type === "throw") {
                  reject(record.arg);
                } else {
                  var result = record.arg;
                  var value = result.value;

                  if (
                    value &&
                    _typeof(value) === "object" &&
                    hasOwn.call(value, "__await")
                  ) {
                    return Promise.resolve(value.__await).then(
                      function(value) {
                        invoke("next", value, resolve, reject);
                      },
                      function(err) {
                        invoke("throw", err, resolve, reject);
                      }
                    );
                  }

                  return Promise.resolve(value).then(
                    function(unwrapped) {
                      result.value = unwrapped;
                      resolve(result);
                    },
                    function(error) {
                      return invoke("throw", error, resolve, reject);
                    }
                  );
                }
              }

              var previousPromise;

              function enqueue(method, arg) {
                function callInvokeWithMethodAndArg() {
                  return new Promise(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                  });
                }

                return (previousPromise = previousPromise
                  ? previousPromise.then(
                      callInvokeWithMethodAndArg,
                      callInvokeWithMethodAndArg
                    )
                  : callInvokeWithMethodAndArg());
              }

              this._invoke = enqueue;
            }

            defineIteratorMethods(AsyncIterator.prototype);

            AsyncIterator.prototype[asyncIteratorSymbol] = function() {
              return this;
            };

            runtime.AsyncIterator = AsyncIterator;

            runtime.async = function(innerFn, outerFn, self, tryLocsList) {
              var iter = new AsyncIterator(
                wrap(innerFn, outerFn, self, tryLocsList)
              );
              return runtime.isGeneratorFunction(outerFn)
                ? iter
                : iter.next().then(function(result) {
                    return result.done ? result.value : iter.next();
                  });
            };

            function makeInvokeMethod(innerFn, self, context) {
              var state = GenStateSuspendedStart;
              return function invoke(method, arg) {
                if (state === GenStateExecuting) {
                  throw new Error("Generator is already running");
                }

                if (state === GenStateCompleted) {
                  if (method === "throw") {
                    throw arg;
                  }

                  return doneResult();
                }

                context.method = method;
                context.arg = arg;

                while (true) {
                  var delegate = context.delegate;

                  if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);

                    if (delegateResult) {
                      if (delegateResult === ContinueSentinel) continue;
                      return delegateResult;
                    }
                  }

                  if (context.method === "next") {
                    context.sent = context._sent = context.arg;
                  } else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                      state = GenStateCompleted;
                      throw context.arg;
                    }

                    context.dispatchException(context.arg);
                  } else if (context.method === "return") {
                    context.abrupt("return", context.arg);
                  }

                  state = GenStateExecuting;
                  var record = tryCatch(innerFn, self, context);

                  if (record.type === "normal") {
                    state = context.done
                      ? GenStateCompleted
                      : GenStateSuspendedYield;

                    if (record.arg === ContinueSentinel) {
                      continue;
                    }

                    return {
                      value: record.arg,
                      done: context.done
                    };
                  } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    context.method = "throw";
                    context.arg = record.arg;
                  }
                }
              };
            }

            function maybeInvokeDelegate(delegate, context) {
              var method = delegate.iterator[context.method];

              if (method === undefined) {
                context.delegate = null;

                if (context.method === "throw") {
                  if (delegate.iterator.return) {
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);

                    if (context.method === "throw") {
                      return ContinueSentinel;
                    }
                  }

                  context.method = "throw";
                  context.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  );
                }

                return ContinueSentinel;
              }

              var record = tryCatch(method, delegate.iterator, context.arg);

              if (record.type === "throw") {
                context.method = "throw";
                context.arg = record.arg;
                context.delegate = null;
                return ContinueSentinel;
              }

              var info = record.arg;

              if (!info) {
                context.method = "throw";
                context.arg = new TypeError("iterator result is not an object");
                context.delegate = null;
                return ContinueSentinel;
              }

              if (info.done) {
                context[delegate.resultName] = info.value;
                context.next = delegate.nextLoc;

                if (context.method !== "return") {
                  context.method = "next";
                  context.arg = undefined;
                }
              } else {
                return info;
              }

              context.delegate = null;
              return ContinueSentinel;
            }

            defineIteratorMethods(Gp);
            Gp[toStringTagSymbol] = "Generator";

            Gp[iteratorSymbol] = function() {
              return this;
            };

            Gp.toString = function() {
              return "[object Generator]";
            };

            function pushTryEntry(locs) {
              var entry = {
                tryLoc: locs[0]
              };

              if (1 in locs) {
                entry.catchLoc = locs[1];
              }

              if (2 in locs) {
                entry.finallyLoc = locs[2];
                entry.afterLoc = locs[3];
              }

              this.tryEntries.push(entry);
            }

            function resetTryEntry(entry) {
              var record = entry.completion || {};
              record.type = "normal";
              delete record.arg;
              entry.completion = record;
            }

            function Context(tryLocsList) {
              this.tryEntries = [
                {
                  tryLoc: "root"
                }
              ];
              tryLocsList.forEach(pushTryEntry, this);
              this.reset(true);
            }

            runtime.keys = function(object) {
              var keys = [];

              for (var key in object) {
                keys.push(key);
              }

              keys.reverse();
              return function next() {
                while (keys.length) {
                  var key = keys.pop();

                  if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                  }
                }

                next.done = true;
                return next;
              };
            };

            function values(iterable) {
              if (iterable) {
                var iteratorMethod = iterable[iteratorSymbol];

                if (iteratorMethod) {
                  return iteratorMethod.call(iterable);
                }

                if (typeof iterable.next === "function") {
                  return iterable;
                }

                if (!isNaN(iterable.length)) {
                  var i = -1,
                    next = function next() {
                      while (++i < iterable.length) {
                        if (hasOwn.call(iterable, i)) {
                          next.value = iterable[i];
                          next.done = false;
                          return next;
                        }
                      }

                      next.value = undefined;
                      next.done = true;
                      return next;
                    };

                  return (next.next = next);
                }
              }

              return {
                next: doneResult
              };
            }

            runtime.values = values;

            function doneResult() {
              return {
                value: undefined,
                done: true
              };
            }

            Context.prototype = {
              constructor: Context,
              reset: function reset(skipTempReset) {
                this.prev = 0;
                this.next = 0;
                this.sent = this._sent = undefined;
                this.done = false;
                this.delegate = null;
                this.method = "next";
                this.arg = undefined;
                this.tryEntries.forEach(resetTryEntry);

                if (!skipTempReset) {
                  for (var name in this) {
                    if (
                      name.charAt(0) === "t" &&
                      hasOwn.call(this, name) &&
                      !isNaN(+name.slice(1))
                    ) {
                      this[name] = undefined;
                    }
                  }
                }
              },
              stop: function stop() {
                this.done = true;
                var rootEntry = this.tryEntries[0];
                var rootRecord = rootEntry.completion;

                if (rootRecord.type === "throw") {
                  throw rootRecord.arg;
                }

                return this.rval;
              },
              dispatchException: function dispatchException(exception) {
                if (this.done) {
                  throw exception;
                }

                var context = this;

                function handle(loc, caught) {
                  record.type = "throw";
                  record.arg = exception;
                  context.next = loc;

                  if (caught) {
                    context.method = "next";
                    context.arg = undefined;
                  }

                  return !!caught;
                }

                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  var record = entry.completion;

                  if (entry.tryLoc === "root") {
                    return handle("end");
                  }

                  if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");

                    if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      } else if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      }
                    } else if (hasFinally) {
                      if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else {
                      throw new Error("try statement without catch or finally");
                    }
                  }
                }
              },
              abrupt: function abrupt(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];

                  if (
                    entry.tryLoc <= this.prev &&
                    hasOwn.call(entry, "finallyLoc") &&
                    this.prev < entry.finallyLoc
                  ) {
                    var finallyEntry = entry;
                    break;
                  }
                }

                if (
                  finallyEntry &&
                  (type === "break" || type === "continue") &&
                  finallyEntry.tryLoc <= arg &&
                  arg <= finallyEntry.finallyLoc
                ) {
                  finallyEntry = null;
                }

                var record = finallyEntry ? finallyEntry.completion : {};
                record.type = type;
                record.arg = arg;

                if (finallyEntry) {
                  this.method = "next";
                  this.next = finallyEntry.finallyLoc;
                  return ContinueSentinel;
                }

                return this.complete(record);
              },
              complete: function complete(record, afterLoc) {
                if (record.type === "throw") {
                  throw record.arg;
                }

                if (record.type === "break" || record.type === "continue") {
                  this.next = record.arg;
                } else if (record.type === "return") {
                  this.rval = this.arg = record.arg;
                  this.method = "return";
                  this.next = "end";
                } else if (record.type === "normal" && afterLoc) {
                  this.next = afterLoc;
                }

                return ContinueSentinel;
              },
              finish: function finish(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];

                  if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                  }
                }
              },
              catch: function _catch(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];

                  if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;

                    if (record.type === "throw") {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                    }

                    return thrown;
                  }
                }

                throw new Error("illegal catch attempt");
              },
              delegateYield: function delegateYield(
                iterable,
                resultName,
                nextLoc
              ) {
                this.delegate = {
                  iterator: values(iterable),
                  resultName: resultName,
                  nextLoc: nextLoc
                };

                if (this.method === "next") {
                  this.arg = undefined;
                }

                return ContinueSentinel;
              }
            };
          })(
            (function() {
              return (
                this ||
                ((typeof self === "undefined" ? "undefined" : _typeof(self)) ===
                  "object" &&
                  self)
              );
            })() || Function("return this")()
          );
          /* WEBPACK VAR INJECTION */
        }.call(this, __w_pdfjs_require__(5)(module)));

        /***/
      },
      /* 5 */
      /***/ function(module, exports, __w_pdfjs_require__) {
        "use strict";

        module.exports = function(module) {
          if (!module.webpackPolyfill) {
            module.deprecate = function() {};

            module.paths = [];
            if (!module.children) module.children = [];
            Object.defineProperty(module, "loaded", {
              enumerable: true,
              get: function get() {
                return module.l;
              }
            });
            Object.defineProperty(module, "id", {
              enumerable: true,
              get: function get() {
                return module.i;
              }
            });
            module.webpackPolyfill = 1;
          }

          return module;
        };

        /***/
      },
      /* 6 */
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
        exports.createObjectURL = exports.FormatError = exports.Util = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.NativeImageDecoding = exports.MissingPDFExce