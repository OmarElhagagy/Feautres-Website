import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Updates from './pages/Updates';
import UpdateDetail from './pages/UpdateDetail';
import NewUpdate from './pages/NewUpdate';
import NewUpdatePoint from './pages/NewUpdatePoint';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, username: payload.username });
      } catch (error) {
        console.error('Invalid token', error);
        logout();
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
              <Route path="/products/:id" element={user ? <ProductDetail /> : <Navigate to="/login" />} />
              <Route path="/updates" element={user ? <Updates /> : <Navigate to="/login" />} />
              <Route path="/updates/:id" element={user ? <UpdateDetail /> : <Navigate to="/login" />} />
              <Route path="/updates/new" element={user ? <NewUpdate /> : <Navigate to="/login" />} />
              <Route path="/updates/:updateId/points/new" element={user ? <NewUpdatePoint /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
