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
'https://isure.stream.qqmusic.qq.com/C400003NgZSi1pufEH.m4a?guid=8575110020&vkey=41A2D3351D847EF0C2DD1A5FF1E3E129F3946D319B39394A4FBB89A2600E1619FB6E2007B856DA526BA8282EABBD7960157458F88A8BE845&uin=4954&fromtag=66',
'https://isure.stream.qqmusic.qq.com/C400001yr3mW3hZKrV.m4a?guid=8575110020&vkey=EE83CB3BF065964F68F121D9CA864EEB52318693A4BDE3363A985DB1C3707A3671D15ED52532E9DCC594542C2BC45D164EBA5EDBED9285DF&uin=4954&fromtag=66',
'https://isure.stream.qqmusic.qq.com/C400002YBrzz0TsL0M.m4a?guid=8575110020&vkey=6C9F1441B03096C5800077BAE75CE8814FEC3F71D877AF60B836B47D3B24A220DC37B464386E45EEAE241089A14DC03646146EFC3F80611D&uin=4954&fromtag=66',
'https://isure.stream.qqmusic.qq.com/C400001Ld6UI1JV7cj.m4a?guid=8575110020&vkey=A3BD88A93E38F35BF9229B7ADD6B402FB0E5B54E83A694833A9ABD30DD2F0BA4D617C179E1C113738778E3B0C844B5973B66615DD5EF48BE&uin=4954&fromtag=66',
'https://isure.stream.qqmusic.qq.com/C4000000hpNF1diABd.m4a?guid=8575110020&vkey=8DB500CDA7CDF3EE469884CD6FA712F0581EBA285C88DD1A7B55CA5B26147284730C5096D888B3B230713C30605EF25A13549C595CF5B9B2&uin=4954&fromtag=66',
'https://isure.stream.qqmusic.qq.com/C400003UAhhG2Bm3Nq.m4a?guid=8575110020&vkey=79DFAA1A9AEDADC093373B1C236B168BF04E12E8E3E2B7571E2797F5439DB7FABA444AF5AF06B1A5E34EE32CF00F7B50815C281625D3A4E1&uin=4954&fromtag=66'
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

      await ajax(servicePath.getMusicList).then(res => {
        console.log("ms", res.data.data);
        let result = res.data.data;

        setSource(result);
        console.log("更新后", source);
      });
    };
    
    fetchData();
    videoInit();
  }, []);
  function videoInit(params) {
    let index = 0
    console.log("ms", source,this);
    var video = document.getElementById("video");
    video.addEventListener("ended", function(e) {
      console.log("视频播放完了");
      console.log(e);
      if(index>source.length){
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
      console.log(e);
    
    });
    video.addEventListener("play", function(e) {
      console.log("提示该视频正在播放中");
      console.log(e);
    });
    video.addEventListener("canplay", function(e) {
      console.log("提示该视频已准备好开始播放");
      video.play();
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
      <Row justify="center">
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          xl={10}
          style={{ position: "relative" }}
        >
          {leftContent.map((item, index) => {
            return (
              <span className={item.className} key={index}>
                {item.content}
              </span>
            );
          })}
          <div className="music">
            {/* <iframe
              border="0"
              width="330"
              height="76"
              src="//music.163.com/outchain/player?type=2&id=474547446&auto=1&height=66"
            /> */}
            <video controls autoPlay={true} name="media" id="video">
              <source src={source[index]} type="audio/mp4"></source>
            </video>
          </div>
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
