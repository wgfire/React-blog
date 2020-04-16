import React, { useState } from "react";
import Head from "next/head";
import { Row, Col, Breadcrumb, Affix } from "antd";
import IconFont from "../components/icon";
import ReactMarkdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/Footer";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import "../public/style/page/detailed.css";
import ajax from "../ajax";
const Detailed = props => {
  let markdown = props.article_content;

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>分类</Breadcrumb.Item>
                <Breadcrumb.Item>文章详情</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                React实战视频教程-技术胖Blog开发(更新08集)
              </div>

              <div className="list-icon center">
                <span>
                  <IconFont type="w-TIME" /> 2019-06-28
                </span>
                <span>
                  <IconFont type="w-wenzi" /> 文字教程
                </span>
                <span>
                  <IconFont type="w-zongrenshu" /> 5498人
                </span>
              </div>

              <div className="detailed-content">
                <ReactMarkdown source={markdown} escapeHtml={false} />
              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
                headingTopOffset={2}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  );
};
Detailed.getInitialProps = async context => {
  console.log(context.query.id);
  let id = context.query.id;
  const promise = new Promise(resolve => {
    ajax("/front/getArticleById/" + id).then(res => {
      resolve(res.data.data[0]);
    });
  });

  return await promise;
};
export default Detailed;
