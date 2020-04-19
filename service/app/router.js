'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
require('./router/front/home')(app)
require('./router/admin/home')(app) 
};
