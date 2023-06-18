import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { bool } from 'prop-types';

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 데이터 가져오기
    const getPosts = () => {
        axios.get('http://localhost:3001/posts').then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    };

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

    if (loading) {
        return (
            <LoadingSpinner />
        );
    };
    // 게시글이 0개 일때 안내 텍스트 노출
    if (posts.length === 0) {
        return (<div>No blog posts found</div>)
    }
    return posts.filter(post => {
        return isAdmin || post.publish
    }).map(post => {
        return (
            <Card
                key={post.id}
                title={post.title}
                onClick={() => navigate(`/blogs/${post.id}`)}
            >
                {isAdmin ? (<div>
                    <button
                        className='btn btn-danger btn-sm'
                        onClick={(e) => deleteBlog(e, post.id)}
                    >
                        Delete
                    </button>
                </div>) : null}
            </Card>
        )
    });
};

BlogList.propTypes = {
    isAdmin: bool,
}

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;