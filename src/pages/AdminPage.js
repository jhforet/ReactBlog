import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";

const AdminPage = () => {
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h1>Admin</h1>
                <div>
                    {/* 생성 버튼 추가 */}
                    <Link to="/blogs/create" className="btn btn-dark">
                        Create New
                    </Link>
                </div>
            </div>
            <BlogList isAdmin={true} />
        </div >
    )
};

export default AdminPage;