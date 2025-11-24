import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import ChartsPage from "./pages/Charts";
import SolutionsPage from "./pages/Solutions";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src="/logo.png" alt="로고" className="w-10 h-10" />
              <span className="ml-2 text-xl font-bold text-blue-600">TAD</span>
              <span className="hidden ml-2 text-lg font-semibold text-gray-900 sm:block">
                Transport Accessibility
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <NavLink to="/">홈</NavLink>
            <NavLink to="/map">지도</NavLink>
            <NavLink to="/charts">통계</NavLink>
            <NavLink to="/solutions">정책 제안</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Helmet>
        <title>TAD</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
