import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import propTypes from 'prop-types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from './Pagination';
import useToast from '../hooks/toast';

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
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');

    const { addToast } = useToast();
    const limit = 5;

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]);

    // 뒤로가기를 하면 이전에 본 페이지가 나오도록 하는 함수 추가
    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        setCurrentPage(page);
        getPosts(page)
    }

    // 데이터 가져오기
    const getPosts = useCallback((page = 1) => {
        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
            title_like: searchText
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
        }).catch(e => {
            setLoading(false);
            setError('Something went wrong in database');
            addToast({
                text: 'Something went wrong',
                type: 'danger'
            })
        })
    }, [isAdmin, searchText]);

    // [pageParam, getPosts] 이렇게 되어있으면 getPosts 함수 내용에 따라서 엔터를 누르지 않아도 변화가 있을 때 마다 요청이 되고 있음
    // 엔터를 눌렀을 때 처음 한번한 실행하면 되므로 빈 배열로 수정한다.
    // useEffect가 setCurrentPage, getPosts를 실행해 줬는데 이제는 한번만 실행하므로 클릭하면 실행하도록 추가한다.
    // onClickPageButton, onSearch 함수에 setCurrentPage, getPosts를 추가한다.
    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1);
    }, []);

    const deleteBlog = (e, id) => {
        // 클릭하면 삭제되지 않고 상세페이지로 이동하는 이벤트 버블링이 발생한다. 
        // stopPropagation을 이용해서 이벤트 버블링이 일어나는 걸 수정한다.
        e.stopPropagation();

        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            // setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            getPosts(1);
            addToast({
                text: 'SuccessFully deleted',
                type: 'success'
            });
        }).catch(e => {
            addToast({
                text: 'The blog could not be deleted.',
                type: 'danger'
            })
        });
    };

    if (loading) {
        return (
            <LoadingSpinner />
        );
    };

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

    // 엔터키를 눌렀을 때만 게시글 불러오기 
    const onSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`${location.pathname}?page=1`)
            setCurrentPage(1);
            getPosts(1);
        };
    };

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            {/* 검색창 */}
            <input
                type="text"
                placeholder='Search..'
                className='form-control'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <hr />
            {posts.length === 0
                ? <div>No blog posts found</div>
                : <>
                    {renderBlogList()}
                    {numberOfPages > 1 && <Pagination
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onClick={onClickPageButton}
                    />}
                </>}
        </div>
    )
};

BlogList.propTypes = {
    isAdmin: propTypes.bool,
}

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;