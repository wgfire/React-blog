"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql = ` SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`;

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      //登录成功,进行session缓存
      let openId = new Date().getTime();
      this.ctx.session.openId = openId;
      this.ctx.body = { data: "登录成功", openId: openId, status: 200 };
    } else {
      this.ctx.body = { data: "登录失败", status: "error" };
    }
  }
  //后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType };
  }
  async getNavList() {
    // 获取导航信息
    let sql = `SELECT * FROM nav_type`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  async getListTypeById (){
    let id = this.ctx.params.id;
    let sql =`select * from type where nav_id = ${id}`
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  //添加文章
  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert("article", tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    };
  }
  async updateArticle() {
    let tmpArticle = this.ctx.request.body;
    let id = tmpArticle.ID;
    delete tmpArticle.ID;
    console.log("tag", tmpArticle);
    const result = await this.app.mysql.update("article", tmpArticle, {
      where: {
        ID: id
      }
    });
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess
    };
  }
  //获得文章列表
  async getArticleList() {
    let sql =
      "SELECT article.ID as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.addTime as addTime," +
      "article.view_count as view_count,"+
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.ID " +
      "ORDER BY article.id DESC ";

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }
  async delArticle() { // 删除文章
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: res };
  }

  //根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    let id = this.ctx.params.id;

    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "article.addTime as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
