import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Devices from '../pages/Devices';
// import App from "../App";

function Routing() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Devices />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
