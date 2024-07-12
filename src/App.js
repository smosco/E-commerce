import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { onSnapshot } from 'firebase/firestore';

import useUserStore from './zustand/userStore';

import AdminToolbar from './components/adminToolbar';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
import Search from './pages/search';

import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/WithAdminAuth';

import './default.scss';

function App() {
  const { currentUser, setCurrentUser } = useUserStore();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    // 컴포넌트 언마운트 시 authListener 해제
    return () => {
      authListener();
    };
  }, [setCurrentUser]);

  return (
    <div className='App'>
      <Router>
        <AdminToolbar />
        <Routes>
          <Route
            path='/'
            element={
              <HomeLayout>
                <Home />
              </HomeLayout>
            }
          />
          <Route
            path='/registration'
            element={
              currentUser ? (
                <Navigate to='/' replace />
              ) : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path='/login'
            element={
              currentUser ? (
                <Navigate to='/' replace />
              ) : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path='/recovery'
            element={
              <MainLayout>
                <Recovery />
              </MainLayout>
            }
          />
          <Route
            path='/dashboard'
            element={
              <WithAuth>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </WithAuth>
            }
          />
          <Route
            path='/admin'
            element={
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            }
          />
          <Route
            path='/search'
            element={
              <MainLayout>
                <Search />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
