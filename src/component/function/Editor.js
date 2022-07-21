import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

const Editor =({getValue,content,setContent})=>{
    
    return(
        <>
        <InfoWrap>
            <input className = "title-input" type='text' value={content.title} placeholder='제목' onChange={getValue} name='title'/>
            <input className='userId-input' type='text' value={content.userId} placeholder='작성자'onChange={getValue} name='userId'/>
        </InfoWrap>
        <CKEditor 
                editor={ ClassicEditor }
                data='내용을 입력해주세요'
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setContent({
                    ...content,
                    body: data
                    })
                }}
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </>
    )

}


const InfoWrap=styled.div`
  display:flex;
  .title-input {
    width: 70%;
    height: 40px;
    margin: 10px 5px;
  }
  .userId-input{
    width:30%;
    height:40px;
    margin: 10px 5px;
  }
`

export default Editor