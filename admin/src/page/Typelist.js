import React, { useState, useEffect } from "react";
import "../static/style/ArticleList.css";
import { List, Row, Col, Modal, message, Button, Select,Input,Form } from "antd";
import ajax from "../ajax";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;
const {Option} = Select
function TypeList(props) {
  const [list, setList] = useState([]);
  const[listype,setListype]=useState([])
  const[type,setType]=useState(2)
  const [visible,setVisible] = useState(false)
  useEffect( () => {
    async function  fetchData (){
        await getList();
        await getListType()
      }
      fetchData()
  
  }, []);
  //得到导航列表
  const  getList = () => {
    ajax({
      method: "get",
      url: '/getNavList',
      withCredentials: true,
    }).then(res => {
      setList(res.data.data.slice(1));
    });
  };
  const  getListType = (id=2) => {
    ajax({
      method: "get",
      url: '/getListTypeById/'+id,
      withCredentials: true,
    }).then(res => {
        setListype(res.data.data);
    });
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
    setType(value)
    getListType(value)
  }
  function handlebtnChange (value){
    console.log(`selected ${value}`);
    // 打开弹窗
    setVisible(true)
  }
  function handleOk (){
      
  }
  function handCancel (){
      setVisible(false)
  }
  //删除文章的方法
  const delArticle = id => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        ajax(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success("文章删除成功");
            getList();
          }
        );
      },
      onCancel() {
       // message.success("没有任何改变");
      }
    });
  };
  const updateArticle = (id) => {
    props.history.push("/index/add/" + id);
  };
  return (
    <div>
         <Select defaultValue={type} style={{ width: 120 }} onChange={handleChange}>
             {
                 list.map(item=>{
                     return (
<Option  key={item.ID} value={item.ID}>{item.nav_Name}</Option>
                     )
                 })
             }
      
      
    </Select>
    <Select defaultValue="增加" style={{ width: 120 }} onChange={handlebtnChange}>
        <Option key="增加类别">增加类别</Option>
        <Option key="修改">修改类别</Option>
        <Option key="删除">删除类别</Option>
    </Select>
      <List
        header={
          <Row className="list-div">
            <Col span={6}>
              <b>名称</b>
            </Col>
            <Col span={3}>
              <b>icon</b>
            </Col>
            <Col span={3}>
              <b>ID</b>
            </Col>
            <Col span={3}>
              <b>分类ID</b>
            </Col>
            
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={listype}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={6}>{item.typeName}</Col>
              <Col span={3}>{item.typeIcon}</Col>
              <Col span={3}>{item.ID}</Col>
              <Col span={3}>{item.nav_id}</Col>
              <Col span={4}>
                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>
                  修改
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
       <Modal
          title="Title"
          visible={visible}
          keyboard	
          maskClosable
          onCancel={handCancel}
        >
         <Form
    
      name="basic"
      initialValues={{ nav_Icon: 'w-fenlei' }}
      
    >
      <Form.Item
        label="分类名称"
        name="nav_Name"
        rules={[{ required: true, message: 'Please input your nav_Name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="分类Icon"
        name="nav_Icon"
        rules={[{ required: true, message: 'Please input your nav_Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
  

      
    </Form>
        </Modal>
    </div>
  );
}

export default TypeList;
