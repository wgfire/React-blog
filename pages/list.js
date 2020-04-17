import Head from "next/head";
import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, List } from "antd";
import Link from "next/link";
import Header from "../components/header";
import IconFont from "../components/icon";
import ajax from "../ajax";
import servicePath from "../config/apiUrl";
const wList = () => {
  const [mylist, setMylist] = useState([]);
  useEffect(() => {
    let url = new URLSearchParams(window.location.search)
    const fetchData = async () => {
      const result = await ajax(servicePath.getArticBylistId + url.get('id')).then(res => {
        return res.data.data;
      });

      setMylist(result);
      console.log("setMylist", result);
    };
    fetchData();
  });
  return (
    <Fragment>
      <Head>
        <title>列表</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>分类详情</div>}
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
          右侧
        </Col>
      </Row>
    </Fragment>
  );
};

// wList.getInitialProps = async context => {
//   let id = context.query.id
//   const promise = new Promise(resolve => {
//     ajax(servicePath.getArticBylistId+ id).then(res => {
//       resolve(res.data);
//     });
//   });
//   return await promise
// };

export default wList;
