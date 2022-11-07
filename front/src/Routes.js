import {useLocation, BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './styles/App.css';

import Home from './pages/Home';
import Category from './pages/Category';
import Login from './pages/Login';
import Join from './pages/Join';
import MyPage from './pages/MyPage';
import Detail from './pages/Detail';
import Write from './pages/Write';
import FindPassword from 'pages/FindPassword/index';
import FloatingBtn from './components/FloatingBtn';

import Header from './components/header';
import Footer from './components/footer';

function Switchs() {
    return (
        <Router>
            <div className="xl:-mt-[50px] pb-10" style={{minHeight: 'calc(100vh - 74px)'}}>
                <FloatingBtn />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/find-password" element={<FindPassword />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default Switchs;
