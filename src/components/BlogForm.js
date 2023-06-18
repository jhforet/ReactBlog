import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import propTypes from "prop-types";

const BlogForm = ({ editing }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // 수정사항을 확인하기 위해서 오리지날 스테이트를 추가
    const [title, setTitle] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [body, setBody] = useState('');
    const [originalBody, setOriginalBody] = useState('');
    // 공개여부 버튼에 사용
    // 기본값을 false로 줘서 체크가 안된 상태로 시작
    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState(false);

    useEffect(() => {
        if (editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then(res => {
                // 수정이 되면 오리지날과 비교하고 수정이 되었는지 확인
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalPublish(res.data.publish);
            });
        };
    }, [id, editing]);

    // 변동 사항 확인 함수
    const isEdited = () => {
        // 불일치 연산자 !== 타이틀과 오리지날 타이틀의 내용이 동일하면 false를 반환하고 다르면 true를 반환한다. 논리 연산자 ||(or)을 사용해서 타이틀이나 바디 둘중 하나만 내용이 변해도 true를 반환한다.
        return title !== originalTitle
            || body !== originalBody
            || publish !== originalPublish;
    }

    // 취소 버튼 함수
    const goBack = () => {
        if (editing) {
            navigate(`/blogs/${id}`);
        } else {
            navigate('/blogs')
        };
    };

    const onSubmit = () => {
        // axios를 이용해서 db.json에 저장 3000번 포트는 사용중이여서 3001번으로 지정
        if (editing) {
            // editing이 true이면 patch로 title, body를 수정 아니면 create 페이지로 연결
            axios.patch(`http://localhost:3001/posts/${id}`, {
                title,
                body,
                publish
            }).then(() => {
                navigate(`/blogs/${id}`);
            })
        } else {
            axios.post('http://localhost:3001/posts', {
                title,
                body,
                createdAt: Date.now(),
                publish
            }).then(() => {
                navigate('/admin');
            })
        };
    };

    const onChangePublish = (e) => {
        console.log(e.target.checked)
        setPublish(e.target.checked)
    };

    return (
        <div>
            <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
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
            <div className="form-check mb-3">
                <input
                    id="publish_cb"
                    className="form-check-input"
                    type="checkbox"
                    checked={publish} // state 기본값 false
                    onChange={onChangePublish}
                />
                <label className="form-check-label" htmlFor="publish_cb">
                    Publish
                </label>
            </div>

            <button
                className='btn btn-primary'
                onClick={onSubmit}
                // 논리 연산자 &&(and)를 사용해서 Edit페이지로 들어와서 editing 이 true이고 !(not)isEdited 또한 true일 경우에 버튼을 비활성화 시킨다.
                // isEdited함수는 내용이 수정된 경우 true를 반환한다.
                // !(not) 연산자가 들어 있으므로 true는 반대가 되서 false가 된다.
                // 내용에 변동사항이 있으면 "true && false = false" false를 반환해서 비활성화 속성이 비활성화 되서 버튼이 활성화 된다!
                disabled={editing && !isEdited()}
            >
                {editing ? 'Edit' : 'Post'}
            </button>
            <button
                className="btn btn-danger ms-2"
                onClick={goBack}
            >
                Cancel
            </button>
        </div>
    )
};

BlogForm.propTypes = {
    editing: propTypes.bool
}

BlogForm.defaultProps = {
    editing: false
}

export default BlogForm;