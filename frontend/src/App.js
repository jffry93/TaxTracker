import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';

function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/map' element={<Map />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  background-color: var(--off-white);

  .pages {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;
