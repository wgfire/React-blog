import { Avatar, Divider,Modal } from "antd";
import "../public/style/components/author.css";
import React, { useState } from "react";
import { GithubOutlined, WechatOutlined, QqOutlined } from "@ant-design/icons";

const Author = () => {
 let [visible,setVisible] = useState(false)
 function handMouseOver(e) {
     setVisible(visible=true)
     
 }
 function handleCancel() {
    setVisible(visible=false)
 }
  return (
    <div className="author-div comm-box">
      <div>
        
        <Avatar size={100} src="/header.jpg" />
      </div>
      <div className="author-introduction">
        从前有一位有着婴儿肥的程序员去入职，直到上班的时候才知道，公司研发部都走光了，他垂头丧气，看着前辈們留下来的祖传代码，散发这令人作呕的清香，他后悔了！他不该选蔡文姬，如果能重来，应该选李白。集合，准备团战！
        <Divider>社交账号</Divider>
        <a href="https://github.com/wgfire">
         
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </a>
        <Avatar size={28} icon={<WechatOutlined />} className="account"  onMouseOver={handMouseOver}/>
        {/* <Avatar size={28} icon={<QqOutlined />} className="account" /> */}
      </div>
      <Modal
          title="有事情啊？扫我就好了"
          visible={visible}
          onCancel={handleCancel}
          onOk={handleCancel}
        >
          <Avatar size={100} src="/header.jpg" />
        </Modal>
    </div>
  );
};

export default Author;
