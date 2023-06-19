import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const getPosts = (id) => {
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data);
            setLoading(false);
        })
    };

    useEffect(() => {
        getPosts(id)
    }, [id]);

    // 작성 일자를 우리가 보는 방식으로 바꿔주는 함수 추가
    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="container title_cover mt-3">
            <div className="row grid">
                <figure className="figure col col-2">
                    <img
                        src="/iu4.jpg"
                        className="figure-img img-fluid rounded"
                        alt="iu"
                    />
                    <figcaption className="figure-caption">
                        아이유의 소소한 이야기
                    </figcaption>
                </figure>
                <div className="col col-1"></div>

                <div className="col col-9">
                    <div className="d-flex">
                        <h1 className="flex-grow-1">{post.title}</h1>
                        {isLoggedIn && <div>
                            <Link
                                className="btn btn-dark"
                                to={`/blogs/${id}/edit`}
                            >
                                Edit
                            </Link>
                        </div>}
                    </div>
                    {/* 작성 일자 추가 */}
                    <small className="text-muted">
                        작성일: {printDate(post.createdAt)}
                    </small>
                    <hr />
                    <pre>{post.body}</pre>
                </div>
            </div>
        </div>
    )
}

export default ShowPage;