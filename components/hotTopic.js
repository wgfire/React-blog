//热门文章
import { List, Typography, Divider } from "antd";
import React, { useState, useEffect } from "react";
import "../public/style/components/hottopic.css";
import ajax from '../ajax'
const Hottopic = props => {
  let [topicdata, setTopicdata] = useState(props.data);
  useEffect( () => {
    async function fetchdata (){
      ajax('getHotArticleList').then(res => {
        console.log(res.data,'rem')
        setTopicdata(res.data.list)
      });

    }
   
      fetchdata()
  },[]);
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
            {<span className='hotitle'>{item.title}</span>}
          </List.Item>
        )}
      />
    </div>
  );
};

// Hottopic.getInitialProps = async () => {
//   const promise = new Promise(resolve => {
//     ajax('getHotArticleList').then(res => {
//       resolve(res.data);
//     });
//   });

//   return await promise;
// };
export default Hottopic;
