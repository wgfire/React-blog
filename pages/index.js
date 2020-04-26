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
import servicePath from "../config/apiUrl";
const Home = list => {
  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    let articList = JSON.stringify(list.data.slice(0,10));
    sessionStorage.getItem("articList")
      ? ""
      : sessionStorage.setItem("articList", articList);
  }, []);
  return (
    <Fragment>
      <Head>
        <title>首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <a  href={`/detailed?id=${item.id}`}>
                    {item.title}
                  </a>
                </div>
                <Row className="list-icon">
                  <Col>
                    <IconFont type="w-TIME" /> {item.addTime}
                  </Col>
                  <Col>
                    <IconFont type={item.typeIcon} /> {item.typeName}
                  </Col>
                  <Col>
                    <IconFont type="w-zongrenshu" /> {item.view_count + "阅读"}
                  </Col>
                </Row>
                <div className="list-context">{item.introduce}</div>
                <div className="list-go">
                  <IconFont type="w-yueduquanwen" />
                  <a  href={`/detailed?id=${item.id}`}>
                    查看全文
                  </a>
                </div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} xxl={4}>
          <Author></Author>
          <Hottopic articList={mylist.slice(0,10)}></Hottopic>
        </Col>
      </Row>
      <Footer></Footer>
    </Fragment>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    ajax.get(servicePath.getArticleList).then(res => {
      //console.log('远程获取数据结果:',res.data.data)

      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;
