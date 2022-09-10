import React from 'react';
import logo from './logo.svg';
/* Pages */
import Main from './pages/Main';
import Search from './pages/Name';
/* Mobile Pages */
import MMain from './mobile-pages/Main';
import MSearch from './mobile-pages/Name';
/* Router */
import {
  Route,
  Routes
} from 'react-router-dom';
/* Mobile detect */
import { BrowserView, MobileView } from 'react-device-detect';

function App() {
  return (
  <>
    <BrowserView>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/name/:name" element={<Search />}/>
      </Routes>
    </BrowserView>
    <MobileView>
      <Routes>
        <Route path="/" element={<MMain />}/>
        <Route path="/name/:name" element={<MSearch />}/>
      </Routes>
    </MobileView>
  </>
  );
}

export default App;
