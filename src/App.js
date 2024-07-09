import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { auth } from './firebase/utils';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/home';
import Registration from './pages/registration';
import Login from './pages/login';

import './default.scss';

const initialState = {
  currentUser: null,
};

function App() {
  const [state, setState] = useState({
    ...initialState,
  });

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        setState({
          ...initialState,
        });
      }

      setState((prevState) => ({
        ...prevState,
        currentUser: userAuth,
      }));
    });
    // 컴포넌트 언마운트 시 authListener 해제
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <HomeLayout currentUser={state.currentUser}>
                <Home />
              </HomeLayout>
            }
          />
          <Route
            path='/registration'
            element={
              <MainLayout currentUser={state.currentUser}>
                <Registration />
              </MainLayout>
            }
          />
          <Route
            path='/login'
            element={
              state.currentUser ? (
                <Navigate to='/' replace />
              ) : (
                <MainLayout currentUser={state.currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
