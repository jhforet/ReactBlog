import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';


const ListPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 데이터 가져오기
    const getPosts = () => {
        axios.get('http://localhost:3001/posts').then((res) => {
            setPosts(res.data);
            setLoading(false);
        })
    }

    const deleteBlog = (e, id) => {
        // 클릭하면 삭제되지 않고 상세페이지로 이동하는 이벤트 버블링이 발생한다. 
        // stopPropagation을 이용해서 이벤트 버블링이 일어나는 걸 수정한다.
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        })
    }

    useEffect(() => {
        getPosts();
    }, []);

    // 로딩 중이면 스피너를 보여주는 함수 추가
    const renderBlogList = () => {
        if (loading) {
            return (
                <LoadingSpinner />
            )
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h1>Blogs</h1>
                <div>
                    {/* 생성 버튼 추가 */}
                    <Link to="/blogs/create" className="btn btn-success">
                        Create New
                    </Link>
                </div>
            </div>
            {renderBlogList()}
            {/* 데이터 화면에 출력하기 */}
            {/* 데이터가 0보다 많으면 데이터를 출력하고 없으면 안내 텍스트 노출 */}
            {posts.length > 0 ? posts.map(post => {
                return (
                    <Card
                        key={post.id}
                        title={post.title}
                        onClick={() => navigate(`/blogs/${post.id}`)}
                    >
                        <div>
                            <button
                                className='btn btn-danger btn-sm'
                                onClick={(e) => deleteBlog(e, post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </Card>
                );
            }) : 'No blog posts found'}
        </div >
    );
};

export default ListPage;