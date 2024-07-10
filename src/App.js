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

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
