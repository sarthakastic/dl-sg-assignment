import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';

function Routing() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
