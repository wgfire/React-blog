import React, { useState, useEffect } from "react";
import "../public/style/components/header.css";
import { Row, Menu, Col } from "antd";
const { SubMenu } = Menu;
import Link from "next/link";
import IconFont from "./icon";
import ajax from "../ajax";
import servicePath from "../config/apiUrl";
import Router from "next/router";

const Header = () => {
  const [leftContent] = useState([
    { content: "阿港", className: "header-logo" },
    { content: "学不动了啊！😴", className: "header-txt" }
  ]);
  const [index, setIndex] = useState(0);
  let  [source, setSource] = useState([
'/music/一直很安静.m4a',
'/music/童话.m4a',
'/music/onlyOne.m4a',
'/music/wantyou.m4a'

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
        //console.log("navArray", result);
      });

    };
    
    fetchData();
   // videoInit();
  }, []);
  function videoInit(params) {
    let index = 0
    //console.log("ms", source,this);
    var video = document.getElementById("video");
    video.addEventListener("ended", function(e) {
      console.log("视频播放完了");
      if(index>=source.length-1){
         index = 0
      }else {
        index++
        console.log('下一首的索引,'+index);
      }
      
      
      video.src= source[index]
      video.load()
      video.play()
      
    });
    video.addEventListener("pause", function(e) {
      console.log("暂停播放");
      
    
    });
    video.addEventListener("play", function(e) {
      console.log("提示该视频正在播放中");
   
    });
    video.addEventListener("canplay", function(e) {
      console.log("提示该视频已准备好开始播放");
    //  video.play();
    });
  }
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
      <Row justify="space-around" style={{'flex-flow':'row nowrap','line-height': 42}}>
        <Col
          xs={9}
          sm={8}
          md={10}
          lg={10}
          xl={10}
          style={{ position: "relative", 'padding-left': 5,'box-sizing': 'border-box'}}
        >
          {leftContent.map((item, index) => {
            return (
              <span className={item.className} key={index}>
                {item.content}
              </span>
            );
          })}
          {/* <div className="music">
            
            <video controls  name="media" id="video">
              <source src={source[index]} type="audio/mp4"></source>
            </video>
          </div> */}
        </Col>

        <Col className="memu-div" xs={15} sm={16} md={14} lg={8} xl={6}>
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
