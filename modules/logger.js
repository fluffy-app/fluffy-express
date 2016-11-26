var log4js = require('log4js');

log4js.configure('./config/log4js.json');

module.exports = {
  access: log4js.getLogger('access'),
  system: log4js.getLogger('system'),
  app: log4js.getLogger('app'),
  express: log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.INFO})
};
