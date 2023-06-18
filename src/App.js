import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/Navbar';
import routes from './routes';
// 토스트 메시지가 페이지가 이동하면서 사라지는걸 방지하기위해 최상위로 이동
import Toast from './components/Toast';
import useToast from './hooks/toast';

function App() {
  const [toasts, addToast, deleteToast] = useToast();

  return (
    <Router>
      <NavBar />
      <Toast
        toasts={toasts}
        deleteToast={deleteToast}
      />
      <div className="container mt-3">
        <Routes>
          {routes.map((route) => { // map 메서드를 사용해서 routes 컴포넌트의 배열에서 메뉴 정보를 불러옴
            const Component = route.component;

            return <Route
              key={route.path}
              path={route.path}
              // React Router v6 부터는 exact속성대신 element 속성을 사용해서 경로가 정확하게 일치 할 때만 해당 요소 렌더링
              element={<Component addToast={addToast} />}
            />;
          })}
        </Routes>
      </div>
    </Router >
  );
}

export default App;
