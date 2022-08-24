import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

const Editor = ({ getValue, contents, setContent }) => {
  return (
    <>
      <InfoWrap>
        <input
          className="title-input main"
          type="text"
          value={contents.title}
          placeholder="제목"
          onChange={getValue}
          name="title"
        />
      </InfoWrap>
      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setContent({
            ...contents,
            body: data,
          });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </>
  );
};

const InfoWrap = styled.div`
  display: flex;

  input.title-input {
    margin-bottom: 10px;
  }
  .userId-input {
    width: 30%;
    height: 40px;
    margin: 10px 5px;
  }
`;

export default Editor;
