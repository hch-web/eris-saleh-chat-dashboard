import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import LayoutWrapper from 'containers/common/layout';

function PrivateRoutes() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { pathname, search } = useLocation();

  return isAuthenticated ? (
    <LayoutWrapper />
  ) : (
    <Navigate to="/auth/login" state={{ from: `${pathname}${search}` }} />
  );
}

export default PrivateRoutes;
