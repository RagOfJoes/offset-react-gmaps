import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Overview from '@/containers/Overview';
import Vineyards from '@/containers/Vineyards';
import '@/stylesheets/index.scss';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/:region" element={<Vineyards />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
