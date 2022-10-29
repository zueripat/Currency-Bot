module.exports = function log(message, type, event) {
  const date = new Date();
  const log = `[${date.toLocaleString()}] [${event}] ${message}`;
  switch (type) {
    case 0 /* info */:
      console.log(log);
      break;
    case 1 /* warning */:
      console.log('\x1b[33m%s\x1b[0m', log);
      break;
    case 2 /* error */:
      console.log('\x1b[31m%s\x1b[0m', log);
      break;
    case 3 /* start (green) */:
      console.log('\x1b[32m%s\x1b[0m', log);
  }
};
