import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Editor from "../function/Editor";

const Write = () => {
  let navigate = useNavigate();
  const [cookies] = useCookies(["nickname"]);
  const [contents, setContent] = useState({
    title: "",
    body: "",
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    setContent({
      ...contents,
      [name]: value,
    });
  };

  const uploadPost = async () => {
    try {
      await axios.post("/board", {
        userId: cookies.id,
        content: contents.body.replace(/(<([^>]+)>)/gi, ""),
        title: contents.title,
      });
    } catch {
      alert("로그인을해주세요");
    }
    navigate("/board");
  };

  return (
    <>
      <FormWrapper>
        <Editor
          getValue={getValue}
          contents={contents}
          setContent={setContent}
        />
        <button className="submit-button save-btn" onClick={uploadPost}>
          글쓰기
        </button>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.div`
  width: 100%;

  .submit-button {
    margin: 10px auto 0;
  }

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 300px;
  }
`;

export default Write;
