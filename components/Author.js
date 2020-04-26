import { Avatar, Divider, Modal, Tag } from "antd";
import "../public/style/components/author.css";
import React, { useState } from "react";
import { GithubOutlined, WechatOutlined } from "@ant-design/icons";

const Author = () => {
  let [visible, setVisible] = useState(false);
  function handClick(e) {
    setVisible((visible = true));
  }
  function handleCancel() {
    setVisible((visible = false));
  }
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="/header.jpg" className="rote" />
      </div>
      <div className="author-introduction">
        本人主玩李白，有什么ID能让对面看见直接投降的那种？
        <Divider>社交账号</Divider>
        <a href="https://github.com/wgfire">
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </a>
        <Avatar
          size={28}
          icon={<WechatOutlined />}
          className="account"
          onClick={handClick}
        />
        {/* <Avatar size={28} icon={<QqOutlined />} className="account" /> */}
      </div>
      <div className="author-btn">
        <Tag color="red">国漫燃</Tag>
        <Tag color="volcano">目标保时捷</Tag>
        <Tag color="orange">小龙虾</Tag>
        <Tag color="gold">以幽默的方式过一生</Tag>
        <Tag color="blue">宅男</Tag>
        <Tag color="purple">职业：打野</Tag>
      </div>
      <Modal
        title="有事情啊？扫我就好了"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <Avatar size={150} src="/qrd.jpg" />
      </Modal>
    </div>
  );
};

export default Author;
