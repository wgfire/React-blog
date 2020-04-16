/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  exports.mysql = {
    // database configuration
    client: {
      // host
      host: "127.0.0.1",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "196128",
      // database
      database: "reactBlog"
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ["*"]
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1586927203925_4129";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
