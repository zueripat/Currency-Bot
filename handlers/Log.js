module.exports = function log(message, type, event) {
  const date = new Date();
  const log = `[${date.toLocaleString()}] [${event}] ${message}`;
  switch (type) {
    case 0:
      console.log(log);
      break;
    case 1:
      console.log('\x1b[33m%s\x1b[0m', log);
      break;
    case 2:
      console.log('\x1b[31m%s\x1b[0m', log);
      break;
    default:
      console.log(log);
      break;
  }
};
