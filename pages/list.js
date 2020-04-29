import Head from "next/head";
import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, List, Tag } from "antd";
import Link from "next/link";
import HotTopic from "../components/hotTopic";
import Footer from "../components/Footer";
import Header from "../components/header";
import IconFont from "../components/icon";
import "../public/style/page/index.css";
import ajax from "../ajax";
import "../public/style/page/list.css";
import servicePath from "../config/apiUrl";
const wList = data => {
  const [mylist, setMylist] = useState(data.data);
  const [typeName, setTypeName] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [artic, setArtic] = useState([]);
  const [color] = useState([
    "red",
    "volcano",
    "cyan",
    "blue",
    "purple",
    "orange",
    "geekblue",
    "magenta"
  ]);

  useEffect(() => {
    
      // You can await here
      let url = new URLSearchParams(window.location.search);
      var typeName = url.get("typeName");
      setTypeName(typeName);
      if (typeList.length == 0) {
        setTypeList(JSON.parse(sessionStorage.getItem("typeList")));
      }
      
      // ...
    setMylist(data.data)
    
  });
  function getColor() {
    let index = Math.floor(Math.random() * color.length);
    return color[index];
  }
  return (
    <Fragment>
      <Head>
        <title>列表</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>{typeName}</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.ID } }}
                  >
                    <a>{item.title}</a>
                  </Link>
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
                  <Link
                    href={{ pathname: "/detailed", query: { id: item.ID } }}
                  >
                    <a>查看全文</a>
                  </Link>
                </div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <div className="tag-btn">
            {typeList.map(item => {
              return (
                <Tag key={item.ID} color={getColor()}>
                  {item.typeName}
                </Tag>
              );
            })}
          </div>
          <HotTopic  />
        </Col>
      </Row>
      <Footer></Footer>
    </Fragment>
  );
};

wList.getInitialProps = async context => {
  let id = context.query.id;
  const promise = new Promise(resolve => {
    ajax(servicePath.getArticBylistId + id).then(res => {
      resolve(res.data);
    });
  });

  return await promise;
};

export default wList;
