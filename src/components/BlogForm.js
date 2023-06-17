import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const onSubmit = () => {
        // title이랑 body가 잘 넘어가는지 콘솔 로그로 테스트
        // console.log(title, body);

        // axios를 이용해서 db.json에 저장 3000번 포트는 사용중이여서 3001번으로 지정
        axios.post('http://localhost:3001/posts', {
            title,
            body,
        }).then(() => {
            navigate('/blogs');
        })
    };

    return (
        <div>
            <h1>Create a blog post</h1>
            {/* title 제목칸 만들기 */}
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input
                    className='form-control'
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
            </div>
            {/* body 내용칸 만들기 */}
            <div className='mb-3'>
                <label className='from-label'>Body</label>
                <textarea
                    className='form-control'
                    value={body}
                    onChange={(event) => {
                        setBody(event.target.value);
                    }}
                    rows="20"
                />
            </div>
            <button
                className='btn btn-primary'
                onClick={onSubmit}
            >
                Post
            </button>
        </div>
    )
};

export default BlogForm;