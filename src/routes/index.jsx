import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../views/components/MainLayout";
import AuthPage from "../views/pages/Auth";
import Users from "../views/pages/Users";
import ContentPage from "../views/pages/Content";

const AppRouter = () => {
  return (
    <>
      <MainLayout />
      <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" exact element={<AuthPage />} />
      <Route path="/users" element={ <RequireAuth> <Users /> </RequireAuth> } />
      <Route path="/content" element={ <RequireAuth>  <ContentPage /> </RequireAuth>} />
      </Routes>
  
    </>
  );
};

function RequireAuth({ children }) {

  if (!localStorage.getItem('token')) {
    return <Navigate to="/auth"  />;
  }

  return children;
}

export default AppRouter;
