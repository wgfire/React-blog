import React, { useState, useEffect } from "react";
import "../public/style/components/header.css";
import { Row, Menu, Col } from "antd";
import IconFont from "./icon";

const Header = () => {
  const [leftContent] = useState([
    { content: "阿港", className: "header-logo" },
    { content: "学不动了啊！😴", className: "header-txt" }
  ]);
  const [rightContent] = useState([
    { content: "首页", type: "w-shouye" },
    { content: "分类", type: "w-fenlei" },
    { content: "笔记", type: "w-icon-test" }
  ]);
  return (
    <div className="header">
      <Row  justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          {leftContent.map((item, index) => {
            return (
              <span className={item.className} key={index}>
                {item.content}
              </span>
            );
          })}
        </Col>
        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            {rightContent.map((item, index) => {
              return (
                <Menu.Item key={item.type}>
                  <IconFont type={item.type} />
                  {item.content}{" "}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
