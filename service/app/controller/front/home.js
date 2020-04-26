"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async getArticleList() {
    // 查询文章
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.addTime as addTime," +
      "article.view_count as view_count ," +
      "type.typeIcon as typeIcon," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.ID";
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  async getArticleById() {
    //查询文章详情
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "article.addTime as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.typeIcon as typeIcon," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.ID " +
      "WHERE article.ID=" +
      id;
    id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  async getNavList() {
    // 获取导航信息
    let sql = `SELECT * FROM nav_type`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  async getTypeList() {
    // 获取文章分类信息
    // 获取导航信息
    let sql = `SELECT * FROM type`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  async getMusicList() {
    // 获取歌曲列表
    let sql = `SELECT * FROM music`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  async getArticBylistId() {
    //
    let id = this.ctx.params.id;
    let sql = `SELECT * FROM article WHERE article.type_id=${id}`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results
    };
  }
  async addViewcount() {
    let id = this.ctx.params.id;
    let sql = `update article set view_count = view_count+1 WHERE ID=${id}`;
    const results = await this.app.mysql.query(sql);
    console.log("受影响的行", results.affectedRows);
    if (results.affectedRows === 1) {
      this.ctx.body = {
        message: "数量增加成功"
      };
    }
  }
}

module.exports = HomeController;
