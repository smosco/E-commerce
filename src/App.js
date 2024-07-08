import Header from './components/header';
import Home from './pages/home';

import './default.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <Home />
      </div>
    </div>
  );
}

export default App;
