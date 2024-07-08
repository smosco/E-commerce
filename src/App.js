import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

import Home from './pages/home';
import Registration from './pages/registration';

import './default.scss';

function App() {
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
              <MainLayout>
                <Registration />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
