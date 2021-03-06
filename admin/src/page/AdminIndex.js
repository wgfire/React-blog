import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "../static/style/AdminIndex.css";
import ArticleList from "./ArticleList";
import AddArticle from "./AddArticle";
import Typelist from './Typelist'
import {
  AppstoreOutlined,
  PlusCircleFilled,
  DiffFilled,
  GitlabFilled
} from "@ant-design/icons";
import { Route, Switch } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [urlst,setUrl] = useState({
    addArticle:'/index/add',
    articleList:"/index/list",
    typelist:'/index/Type'       
  })

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  const handleClickArticle = e => {
    console.log(e.item.props, e);
    
      props.history.push(urlst[e.key]);
    
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <img src="/logo.png"></img>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <AppstoreOutlined />
            <span>工作台</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <DiffFilled />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="typelist">分类管理</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>

          <Menu.Item key="9">
            <GitlabFilled />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
         
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div>
              <Switch>
                <Route path="/index/" exact component={AddArticle} />
                <Route path="/index/add/" exact component={AddArticle} />
                <Route path="/index/add/:id" exact component={AddArticle} />
                <Route path="/index/list/"  exact  component={ArticleList} />
                <Route path="/index/Type/"  exact  component={Typelist} />
              </Switch>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>阿港后台管理系统</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
