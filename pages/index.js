import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Row, Col, List } from "antd";
import Header from "../components/header";
import "../public/style/page/index.css";
import IconFont from "../components/icon";
import Author from "../components/Author";
import Hottopic from "../components/hotTopic";
import Footer from "../components/Footer";
import ajax from "../ajax";
const Home = (list) => {
  const [mylist, setMylist] = useState(list.data);
 
  return (
    <Fragment>
      <Head>
        <title>首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col
          className="comm-left"
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
          xxl={16}
        >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">{item.title}</div>
                <Row className="list-icon">
                  <Col>
                    <IconFont type="w-TIME" /> {item.addTime}
                  </Col>
                  <Col>
                    <IconFont type={item.typeIcon} /> {item.typeName}
                  </Col>
                  <Col>
                    <IconFont type="w-zongrenshu" /> {item.view_count + "人"}
                  </Col>
                </Row>
                <div className="list-context">{item.introduce}</div>
                <div className="list-go">
                  <IconFont type="w-yueduquanwen" />
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.id } }}
                  >
                    <a>查看全文</a>
                  </Link>
                </div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} xxl={4}>
          <Author></Author>
          <Hottopic></Hottopic>
        </Col>
      </Row>
      <Footer></Footer>
    </Fragment>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    ajax.get("/front/getArticleList").then(res => {
      //console.log('远程获取数据结果:',res.data.data)
      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;
