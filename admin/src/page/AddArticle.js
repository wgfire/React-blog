import React, { useState, useEffect } from "react";
import marked from "marked";
import ajax from "../ajax";
import servicePath from "../config/apiUrl";
import "../static/style/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  useEffect(() => {
    getTypeInfo();
    //获得文章ID
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别
  const [viewCount, setViewCount] = useState(0);

  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };
  const selectTypeHandler = value => {
    setSelectType(value);
  };
  const getTypeInfo = () => {
    ajax({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true
    }).then(res => {
      if (res.data.data == "没有登录") {
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  const getArticleById = id => {
    ajax(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
      setViewCount(res.data.data[0].view_count);
    });
  };

  //保存文章的方法
  const saveArticle = () => {
    // markedContent()  //先进行转换

    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }

    let dataProps = {}; //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let getHours = new Date().getHours();
    let minute = new Date().getMinutes();
    let sencd = new Date().getSeconds();
    dataProps.addTime = showDate + " " + getHours + ":" + minute + ":" + sencd;

    console.log("发布", dataProps);

    if (articleId == 0) {
      dataProps.view_count = Math.ceil(Math.random() * 10) + 10;
      setViewCount(dataProps.view_count);
      ajax({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(res => {
        setArticleId(res.data.insertId);
        console.log("articleId=:" + articleId);
        if (res.data.isScuccess) {
          message.success("文章保存成功");
        } else {
          message.error("文章保存失败");
        }
      });
    } else {
      dataProps.ID = articleId;
      console.log("修改", dataProps);
      dataProps.view_count = viewCount;
      ajax({
        method: "post",
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then(res => {
        if (res.data.isScuccess) {
          message.success("文章保存成功");
        } else {
          message.error("保存失败");
        }
      });
    }
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={1}>
            <Col span={16}>
              <Input
                placeholder="博客标题"
                size="small"
                onChange={e => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={selectedType}
                size="small"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={item.ID} value={item.ID}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24} offset={5}>
              <Button size="small" onClick={saveArticle}>
                暂存文章
              </Button>
              &nbsp;
              <Button type="primary" size="small" onClick={saveArticle}>
                发布文章
              </Button>
              &nbsp;
              <DatePicker
                onChange={(date, dateString) => setShowDate(dateString)}
                placeholder="发布日期"
                size="small"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <TextArea
                rows={4}
                className="markdown-introduc"
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml
                }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;
