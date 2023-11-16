import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

// PAGES
const ChatRooms = lazy(() => import('containers/pages/chatRooms'));
const Users = lazy(() => import('containers/pages/users'));
const HumanAgent = lazy(() => import('containers/pages/humanAgent'));
const TicketAndSupport = lazy(() => import('containers/pages/ticket&Support'));
const LoginPage = lazy(() => import('containers/pages/login'));
const UserProfile = lazy(() => import('containers/pages/userProfile'));
const TicketDetails = lazy(() => import('containers/pages/ticket&Support/components/TicketDetails'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/">
            <Route path="auth" element={<PublicRoutes />}>
              <Route path="login" element={<LoginPage />} />
            </Route>

            <Route path="/" element={<PrivateRoutes />}>
              <Route index element={<ChatRooms />} />
              <Route path="/users" element={<Users />} />
              <Route path="/human-agent" element={<HumanAgent />} />
              <Route path="/ticket-and-support" element={<Outlet />}>
                <Route index element={<TicketAndSupport />} />
                <Route path=":id" element={<TicketDetails />} />
              </Route>
              <Route path="/profile/:id" element={<UserProfile />} />
              <Route path="/user/add" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
