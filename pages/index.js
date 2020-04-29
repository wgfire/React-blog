import React, { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Spin } from 'antd';
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
  const[showT,setShowT]=useState(false)
  useEffect(() => {
    
      setMylist(mylist)

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
            header={<div className='hdiv'> <span>日志数量{mylist.length}</span> <span onClick={()=>{setShowT(true)}} ><IconFont type='w-caidan' /></span></div>}
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

        <Col className={["comm-right ",showT?"c-right":''].join(' ')} xs={0} sm={0} md={7} lg={5} xl={4} xxl={4}>
          <IconFont type="w-guanbi"  onClick={()=>{setShowT(false)}} className='guanbi'/>
          <Author></Author>
          <Hottopic />
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
      res.data.data.sort((a,b)=>{
        let time = new Date(a.addTime).getTime()
        let time2 = new Date(b.addTime).getTime()
        return time2-time
      })
      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;
