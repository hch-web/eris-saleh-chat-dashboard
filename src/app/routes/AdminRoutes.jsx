import React from 'react';
import useGetUserData from 'customHooks/useGetUserData';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutes() {
  const { isAdmin } = useGetUserData();

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
