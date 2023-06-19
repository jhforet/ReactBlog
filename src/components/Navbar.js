import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";

const NavBar = () => {
    let location = useLocation();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    return (
        // 부트스트랩을 이용해서 Nav바 css 설정
        <nav className='navbar navbar-dark bg-dark' >
            <div className='container'>
                <Link className="navbar-brand" to="/">Home</Link>
                {location.pathname != '/' && <ul
                    style={{ flexDirection: 'row' }}
                    className='navbar-nav'>
                    <li className="nav-item me-2">
                        <button
                            className="text-white btn btn-link text-decoration-none"
                            onClick={() => {
                                if (isLoggedIn) {
                                    dispatch(logout());
                                } else {
                                    dispatch(login());
                                }
                            }}
                        >
                            {isLoggedIn ? 'Logout' : 'login'}
                        </button>
                    </li>
                    <li className="nav-item me-2">
                        {isLoggedIn ? <NavLink
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            aria-current="page"
                            to="/admin"
                        >
                            Admin
                        </NavLink> : null}
                    </li>
                    <li className='nav-items'>
                        {/* NavLink 기능은 리엑트 라우터 페이지 참고 */}
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            aria-current="page"
                            to="/blogs"
                        >
                            Blogs
                        </NavLink>
                    </li>
                </ul>}
            </div>
        </nav >
    )
};

export default NavBar;