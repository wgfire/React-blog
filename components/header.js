import React, { useState, useEffect } from "react";
import "../public/style/components/header.css";
import { Row, Menu, Col } from "antd";
const { SubMenu } = Menu;
import Link from "next/link";
import IconFont from "./icon";
import ajax from "../ajax";
import servicePath from "../config/apiUrl";
import Router from "next/router";

const Header = result => {
  const [leftContent] = useState([
    { content: "阿港", className: "header-logo" },
    { content: "学不动了啊！😴", className: "header-txt" }
  ]);

  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await ajax(servicePath.getNavList).then(res => {
        return res.data.data;
      });
      await ajax(servicePath.getTypeList).then(res => {
        let result1 = res.data.data;
        // 设置到seeion里去
        sessionStorage.getItem("typeList")
          ? ""
          : sessionStorage.setItem("typeList", JSON.stringify(result1));
        result.forEach(el => {
          el.children = [];
          result1.forEach(els => {
            if (els.nav_id == el.ID) {
              el.children.push(els);
            }
          });
        });

        setNavArray(result);
        console.log("navArray", result);
      });
    };
    fetchData();
  }, []);
  function handItemClick(props, item) {
    // console.log(props, item);
    // if (props.key === "1") {
    //   Router.push("/index");
    // } else {
    //   let key = props.key.split("-");
    //   Router.push("/list?id=" + key[1] + "&typeName=" + item.typeName);
    // }
  }
  return (
    <div className="header">
      <Row justify="center">
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
            {navArray.map((item, index) => {
              if (item.children.length > 0) {
                return (
                  <SubMenu
                    key={item.ID}
                    title={
                      <span>
                        <IconFont type={item.nav_Icon} />
                        {item.nav_Name}
                      </span>
                    }
                  >
                    {item.children.map(items => {
                      return (
                        <Menu.Item
                          key={item.ID + "-" + items.ID}
                          onClick={props => {
                            handItemClick(props, items);
                          }}
                        >
                          <IconFont type={items.typeIcon} />

                          <Link
                            href={{
                              pathname: "/list",
                              query: { id: items.ID, typeName: items.typeName }
                            }}
                          >
                            <a>{items.typeName}</a>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.ID} onClick={handItemClick}>
                    <IconFont type={item.nav_Icon} />
                    <Link href={{ pathname: "/index" }}>
                      <a>{item.nav_Name}</a>
                    </Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
