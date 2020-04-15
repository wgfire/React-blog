//热门文章
import { List, Typography, Divider } from "antd";
import React, { useState } from "react";
import '../public/style/components/hottopic.css'
const Hottopic = () => {
  let [topicdata,setTopicdata] = useState([
      {
          title:'找到你想要的Vue组件',
          url:"xx"
      }
  ])
  return (
    <div className="hotTopic">
      <Divider>近期热门</Divider>
      <List
      size="small"
      header={<div className="hottext">TOP10</div>}
      dataSource={topicdata}
      renderItem={item => <List.Item 
        className="hotlist"
        actions={[ <a key="list-loadmore-more" href={item.url}>查看</a>]}
      >{item.title}</List.Item>}
    />
    </div>
  );
};
export default Hottopic;
