"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async checkLogin() {
    let userName = this.ctx.params.userName;
    let password = this.ctx.params.password;
    const sql =` SELECT userName FROM admin_user WHERE userName = ${userName} AND password = ${password}`

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      //登录成功,进行session缓存
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId: openId };
      this.ctx.body = { data: "登录成功", openId: openId, status: 200 };
    } else {
      this.ctx.body = { data: "登录失败", status: "error" };
    }
  }
}

module.exports = MainController;
