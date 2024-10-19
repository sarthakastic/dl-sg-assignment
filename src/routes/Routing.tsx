import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Devices from '../pages/Devices';
import { Subscription } from '../pages/Subscription';

function Routing() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/subscription" />} />
        <Route path="/device" element={<Devices />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
