import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Shimmer from '../components/commonUI/Shimmer';
import NotFound from '../components/commonUI/NotFound';

const Devices = lazy(() => import('../pages/Devices'));
const Subscription = lazy(() => import('../pages/Subscription'));



function Routing() {
  return (
    <Suspense fallback={<Shimmer />}>
      <Routes>
        <Route path="/" element={<Navigate to="/subscription" />} />
        <Route path="/device" element={<Devices />} />
        <Route path="/subscription" element={<Subscription />} />

    
        {[
          'location',
          'about',
          'features',
          'rules',
          'pricing',
          'promotion',
          'pictures',
          'insurance',
          'early-access',
        ].map((path) => (
          <Route key={path} path={`/${path}`} element={<NotFound text='503' subtext='Page under maintenance' />} />
        ))}

        <Route path="*" element={<NotFound text='404' subtext='Page not found' />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
