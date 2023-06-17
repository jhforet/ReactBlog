import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

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
        <div>
            <h1>{post.title}</h1>
            {/* 작성 일자 추가 */}
            <small className="text-muted">
                작성일: {printDate(post.createdAt)}
            </small>
            <hr />
            <p>{post.body}</p>
        </div>
    )
}

export default ShowPage;