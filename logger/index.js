const fs = require("fs");
const path = require("path");

const pinoms = require("pino-multi-stream");
function prepLogStream(logStreamPath) {
  logStreamPath = logStreamPath.replace(".log", "") + Date.now() + ".log";
  const streamOpts = { flags: "a", encoding: null, mode: 0666 };
  return fs.createWriteStream(logStreamPath, streamOpts);
}

function createLogger(opts) {
  if (!opts) opts = {};
  const {
    logPath = path.join(__dirname, `../logs/info.log`),
    errPath = path.join(__dirname, `../logs/error.log`),
    warnPath = path.join(__dirname, `../logs/warn.log`),
    fatalPath = path.join(__dirname, `../logs/fatal.log`)
  } = opts;
  const streams = [
    { level: "info", stream: prepLogStream(logPath) },
    { level: "warn", stream: prepLogStream(warnPath) },
    { level: "error", stream: prepLogStream(errPath) },
    { level: "fatal", stream: prepLogStream(fatalPath) }
  ];
  return (log = pinoms({
    streams: streams,
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          headers: {
            host: req.headers.host
          },
          hostname: req.hostname,
          remoteAddress: req.ip
        };
      }
    }
  }));
}
module.exports = createLogger;
