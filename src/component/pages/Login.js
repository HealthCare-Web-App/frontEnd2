import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState({
    userId: "",
    userPassword: "",
  });

  const [cookies, setCookie] = useCookies(["id", "nickname"]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setContents({ ...contents, [name]: value });
  };

  const goLogin = () => {
    if (contents.userId === "" || contents.userPassword === "") {
      window.alert("아이디와 비밀번호를 입력해주세요");
    }
    axios
      .post("/login", {
        loginId: contents.userId,
        pw: contents.userPassword,
      })
      .then((res) => {
        console.log(res.data);
        setCookie("id", res.data.userId);
        setCookie("nickname", res.data.nickname);
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        alert("아이디와 비밀번호가일치하지않습니다.");
      });
  };

  return (
    <>
      {cookies.id === undefined ? (
        <Log>
          <p>LogIn</p>
          <input
            placeholder="아이디를 입력해주세요."
            onChange={onChange}
            name="userId"
            className="main"
          />
          <input
            placeholder="비밀번호를 입력해주세요."
            onChange={onChange}
            name="userPassword"
            className="main"
          />
          <Link to="/SignUp">회원가입</Link>
          <button onClick={goLogin}>로그인</button>
        </Log>
      ) : cookies.id === "undefined" ? (
        <>
          <Log>
            <p>LogIn</p>
            <input
              placeholder="아이디를 입력해주세요."
              onChange={onChange}
              name="userId"
              className="main"
            />
            <input
              placeholder="비밀번호를 입력해주세요."
              onChange={onChange}
              name="userPassword"
              className="main"
            />
            <Link to="/SignUp">회원가입</Link>
            <button onClick={goLogin}>로그인</button>
          </Log>
        </>
      ) : (
        <>{cookies.nickname}</>
      )}
    </>
  );
};

const Log = styled.div`
  position: absolute;
  top: calc(50% - 70px);
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  p {
    font-family: "Poppins", sans-serif;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0;
    width: 100%;
  }

  input.main {
    margin-bottom: 20px;
  }

  a {
    display: block;
    float: right;
    text-decoration: none;
    text-align: right;
    padding: 0 20px 0 0;
    width: 100%;
    font-weight: 600;
    font-family: "Noto Sans KR", sans-serif;
    color: #333;
  }

  a:hover {
    color: #fe6229;
  }

  button {
    background-color: #fe6229;
    color: #fff;
    border: none;
    display: block;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0 0 0 1.5px #dee4f1, 0px 5px 13px 0px #dee4f1;
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    width: 115px;
    margin: 30px auto 0;
  }
`;

export default Login;
