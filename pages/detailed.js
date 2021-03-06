import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Row, Col, Breadcrumb, Affix } from "antd";
import IconFont from "../components/icon";
import ReactMarkdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/Footer";
import MarkNav from "markdown-navbar";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Tocify from "../components/topif.tsx";
import "markdown-navbar/dist/navbar.css";
import "../public/style/page/detailed.css";
import ajax from "../ajax";
import servicePath from "../config/apiUrl";
const Detailed = props => {
  //let markdown = props.article_content;
  const renderer = new marked.Renderer();
  const tocify = new Tocify();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let markdown = marked(props.article_content);

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
                <Breadcrumb.Item>文章详情</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{props.title}</div>

              <div className="dlist-icon center">
                <span>
                  <IconFont type="w-TIME" /> {props.addTime}
                </span>
                <span>
                  <IconFont type={props.typeIcon} /> {props.typeName}
                </span>
                <span>
                  <IconFont type="w-zongrenshu" /> {props.view_count + "阅读"}
                </span>
              </div>

              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: markdown }}
              >
                {/* <ReactMarkdown source={markdown} escapeHtml={false} /> */}
              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
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
  let resutl = await ajax.get(servicePath.addViewcount + id);
  const promise = new Promise(resolve => {
    ajax(servicePath.getArticleById + id).then(res => {
      resolve(res.data.data[0]);
    });
  });

  return await promise;
};
export default Detailed;
