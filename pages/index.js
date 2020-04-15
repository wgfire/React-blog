import React, { Fragment,useState } from "react";
import Head from "next/head";
import { Row, Col, List } from "antd";
import Header from "../components/header";
import '../public/style/page/index.css'
import IconFont from "../components/icon";
import Author from "../components/Author";
import Hottopic from "../components/hotTopic";
import Footer from '../components/Footer'
const Home = () => {
  const [mylist, setMylist] = useState([
    {
      title: "50元加入小密圈 胖哥带你学一年",
      context:"50元跟着胖哥学一年，掌握程序人的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，",
      typeicon:"w-wenzi",
      typetxt:"文字教程",
      time:"2020-4-13",
      readCount:2020,
      url:""// 全文链接
    },
  ]);
  return (
    <Fragment>
      <Head>
        <title>首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} xxl={16}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item >
                <div className="list-title">{item.title}</div>
                <Row className="list-icon"   >
                  <Col >
                    <IconFont type="w-TIME" /> {item.time}
                  </Col>
                  <Col>
                    <IconFont type={item.typeicon} /> {item.typetxt}
                  </Col>
                  <Col>
                    <IconFont type="w-zongrenshu" /> {item.readCount+'人'}
                  </Col>
                  
                </Row>
                <div className="list-context">{item.context}</div>
                <div className="list-go">
                <IconFont type="w-yueduquanwen" />
                <a href={item.url}>查看全文</a>
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

export default Home;
