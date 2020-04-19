import React, { useState, useEffect } from "react";
import { Card, Input, Button, Spin ,message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../static/style/login.css";
import "../ajax";
import ajax from "../ajax";
const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const doit = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;
      let ra = Math.random() * Math.PI * 2;
      let ga = ra + 0.4;
      let ba = ra + 0.8;
      const cs = 0.01 + Math.random() * 0.05;
      const numPoints = Math.round(10 + Math.random() * 50);
      const dist = (2 * Math.PI) / (numPoints - 1);
      const noise = Math.random() * 100 + 70;
      const noise2 = Math.random() * 4 + 2;
      const points = [];
      for (let i = 0; i < numPoints; ++i) {
        points[i] = {
          x: Math.cos(i * dist) * 10,
          y: Math.sin(i * dist) * 10
        };
      }
      const mx = i => cx + (points[i].x + points[i + 1].x) / 2;
      const my = i => cy + (points[i].y + points[i + 1].y) / 2;
      const px = i => cx + points[i].x;
      const py = i => cy + points[i].y;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cx * 2, cy * 2);
      for (let x = 0; x < Math.sqrt(Math.min(cx, cy)) * 12; x++) {
        for (let i = 0; i < numPoints; ++i) {
          const p = points[i];
          p.x *= 1.017;
          p.y *= 1.017;
          p.x += Math.random() * noise2 - noise2 / 2;
          p.y += Math.random() * noise2 - noise2 / 2;
        }
        ctx.beginPath();
        ctx.strokeStyle = `rgb(
                ${Math.round(128 + Math.cos((ra += cs)) * 127)},
                ${Math.round(128 + Math.cos((ga += cs)) * 127)},
                ${Math.round(128 + Math.cos((ba += cs)) * 127)}
            )`;
        ctx.moveTo(mx(0), my(0));
        for (let i = 1; i < numPoints - 1; ++i) {
          ctx.quadraticCurveTo(px(i), py(i), mx(i), my(i));
        }
        ctx.quadraticCurveTo(
          px(numPoints - 1),
          py(numPoints - 1),
          mx(0),
          my(0)
        );
        ctx.stroke();
      }
    };
    doit();
    ["click", "touchdown"].forEach(event => {
      document.addEventListener(event, e => doit(), false);
    });
  }, []);
  const checkLogin = ()=>{
    setIsLoading(true)

    if(!userName){
        message.error('用户名不能为空')
        setIsLoading(false)
        return false
    }else if(!password){
        message.error('密码不能为空')
        setIsLoading(false)
        return false
    }
    let dataProps = {
        'userName':userName,
        'password':password
    }
    ajax.get('/checkLogin',{
      params: dataProps
    }).then(
       res=>{
            setIsLoading(false)
            if(res.data.data=='登录成功'){
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
            }else{
                message.error('用户名或者密码错误！')
            }
       }
    )

    setTimeout(()=>{
        setIsLoading(false)
    },1000)
}
  return (
    <div className="main">
      <canvas className="canvas"></canvas>
      <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading}>
          <Card
            title="啊港博客后台瞎吉儿管理系统"
            bordered={true}
            style={{ width: 400 }}
          >
            <Input
              id="userName"
              size="large"
              placeholder="Enter your userName"
              prefix={<UserOutlined />}
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <br />
            <Input.Password
              id="password"
              size="large"
              placeholder="Enter your password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <Button type="primary" size="large" block onClick={checkLogin}>
              {/* <Link to={"/index"}>Login</Link> */}
              Login in
            </Button>
          </Card>
        </Spin>
      </div>
    </div>
  );
};
export default Login;
