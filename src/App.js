import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/Navbar';
import routes from './routes';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => { // map 메서드를 사용해서 routes 컴포넌트의 배열에서 메뉴 정보를 불러옴
            return <Route
              key={route.path}
              path={route.path}
              // React Router v6 부터는 exact속성대신 element 속성을 사용해서 경로가 정확하게 일치 할 때만 해당 요소 렌더링
              element={<route.component />}
            />;
          })}
        </Routes>
      </div>
    </Router >
  );
}

export default App;
