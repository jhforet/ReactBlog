import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { bool } from 'prop-types';
import Pagination from './Pagination';

const BlogList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const limit = 5;

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    // 뒤로가기를 하면 이전에 본 페이지가 나오도록 하는 함수 추가
    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        getPosts(page)
    }

    // 데이터 가져오기
    const getPosts = useCallback((page = 1) => {
        setCurrentPage(page);
        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
        }

        // Admin이 아닐경우 publish true만 보여주기
        if (!isAdmin) {
            params = { ...params, publish: true };
        }

        axios.get('http://localhost:3001/posts', {
            params
        }).then((res) => {
            setNumberOfPosts(res.headers['x-total-count']);
            setPosts(res.data);
            setLoading(false);
        });
    }, [isAdmin]);

    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1);
    }, [pageParam, getPosts]);

    const deleteBlog = (e, id) => {
        // 클릭하면 삭제되지 않고 상세페이지로 이동하는 이벤트 버블링이 발생한다. 
        // stopPropagation을 이용해서 이벤트 버블링이 일어나는 걸 수정한다.
        e.stopPropagation();

        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        })
    }

    if (loading) {
        return (
            <LoadingSpinner />
        );
    };
    // 게시글이 0개 일때 안내 텍스트 노출
    if (posts.length === 0) {
        return (<div>No blog posts found</div>)
    }

    const renderBlogList = () => {
        return posts.map(post => {
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

    return (
        <div>
            {renderBlogList()}
            {numberOfPages > 1 && <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                onClick={onClickPageButton}
            />}
        </div>
    )
};

BlogList.propTypes = {
    isAdmin: bool,
}

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;