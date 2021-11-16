import * as streamedian from "streamedian/player.js";
// import WebsocketTransport from 'wsp/transport/websocket';
// import RTSPClient from 'wsp/client/rtsp/client';

let mediaElement = rtsp.attach(document.getElementById("test_video"));
let player = new streamedian.WSPlayer(mediaElement, {
  // url: `${STREAM_URL}`,      // overrides mediaElement's sources
  modules: [
    {
      // client module constructor. Should be subclass or BaseClient. RTSPClient by default
      // client: RTSPClient,
      transport: {
        // client module constructor. Should be subclass or BaseTransport. WebsocketTransport by default
        // constructor: WebsocketTransport,
        options: {
          // address of websocket proxy described below. ws${location.protocol=='https:'?'s':''}://${location.host}/ws/ by default
          socket: "ws://websocket_proxy_address/ws",
          // function called player exceptions
          errorHandler(e) {
            alert(`Failed to start player: ${e.message}`);
          },
          // function to get credentials for protected streams
          queryCredentials() {
            return new Promise((resolve, reject) => {
              let c = prompt("input credentials in format user:password");
              if (c) {
                this.setCredentials.apply(this, c.split(":"));
                resolve();
              } else {
                reject();
              }
            });
          },
        },
      },
    },
  ],
});
import buble from "rollup-plugin-buble";
import alias from "rollup-plugin-alias";

const path = require("path");

export default {
  entry: path.join(__dirname, "example.js"),
  targets: [
    { dest: path.join(__dirname, "example/streamedian.js"), format: "es" },
  ],
  sourceMap: true,
  plugins: [
    // uncomment if you want to transpile into es5
    //buble({
    //exclude: 'node_modules/**'
    //}),
    alias({
      bp_logger: path.join(__dirname, "node_modules/bp_logger/logger"),
      bp_event: path.join(__dirname, "node_modules/bp_event/event"),
      bp_statemachine: path.join(
        __dirname,
        "node_modules/bp_statemachine/statemachine"
      ),
      //jsencrypt: path.join(__dirname,'node_modules/jsencrypt/src/jsencrypt.js'),
      streamedian: path.join(__dirname, "src"),
    }),
  ],
};
