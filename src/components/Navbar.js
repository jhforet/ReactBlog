import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        // 부트스트랩을 이용해서 Nav바 css 설정
        <nav className='navbar navbar-dark bg-dark' >
            <div className='container'>
                <Link className="navbar-brand" to="/">Home</Link>
                <ul
                    style={{ flexDirection: 'row' }}
                    className='navbar-nav'>
                    <li className="nav-item me-2">
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                            aria-current="page"
                            to="/admin"
                        >
                            Admin
                        </NavLink>
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
                </ul>
            </div>
        </nav>
    )
};

export default NavBar;