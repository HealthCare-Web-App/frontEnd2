import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState({
    loginId: "",
    pw: "",
    nickname: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setContents({ ...contents, [name]: value });
  };

  const goSignUp = () => {
    axios
      .post(`/users`, {
        loginId: contents.loginId,
        pw: contents.pw,
        nickname: contents.nickname,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        alert(e.response.data);
        return;
      });
  };

  return (
    <>
      <Sign>
        <p>Join Us</p>
        <input
          placeholder="닉네임을 입력해주세요."
          className="main"
          onChange={onChange}
          name="nickname"
        />
        <input
          placeholder="아이디를 입력해주세요."
          className="main"
          onChange={onChange}
          name="loginId"
        />
        <input
          placeholder="비밀번호를 입력해주세요."
          className="main"
          onChange={onChange}
          name="pw"
        />

        <button onClick={goSignUp} className="signUp">
          회원가입
        </button>
      </Sign>
    </>
  );
};

const Sign = styled.div`
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

  .btn-area {
    display: flex;
    justify-content: center;
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

export default SignUp;
