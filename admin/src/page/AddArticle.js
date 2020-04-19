import React, { useState } from "react";
import marked from "marked";

import "../static/style/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function AddArticle() {
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
  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={1}>
            <Col span={16}>
              <Input placeholder="博客标题" size="small" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue="Sign Up" size="small">
                <Option value="Sign Up">Vue相关</Option>
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
              <Button size="small">暂存文章</Button>&nbsp;
              <Button type="primary" size="small">
                发布文章
              </Button>
              &nbsp;
              <DatePicker placeholder="发布日期" size="small" />
            </Col>
          </Row>
          <br/>
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
