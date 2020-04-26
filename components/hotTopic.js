//热门文章
import { List, Typography, Divider } from "antd";
import React, { useState, useEffect } from "react";
import "../public/style/components/hottopic.css";
const Hottopic = props => {
  let [topicdata, setTopicdata] = useState(props.articList);
  useEffect(() => {
    let topData = topicdata;
    if(topData.length ==0){
      topData=JSON.parse(sessionStorage.getItem("articList"))
    }
    topData.sort((a, b) => {
      return b.view_count - a.view_count;
    });
    
    console.log('接受到的文章',topicdata);
    

    setTopicdata(topData);
  }, []);
  return (
    <div className="hotTopic">
      <Divider>近期热门</Divider>
      <List
        size="small"
        header={<div className="hottext">TOP10</div>}
        dataSource={topicdata}
        renderItem={item => (
          <List.Item
            className="hotlist"
            actions={[
              <a key="list-loadmore-more" href={`/detailed?id=${item.id}`}>
                查看
              </a>
            ]}
          >
            {item.title}
          </List.Item>
        )}
      />
    </div>
  );
};
export default Hottopic;
