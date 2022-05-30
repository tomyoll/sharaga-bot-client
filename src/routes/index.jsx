import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../views/components/MainLayout";
import HomePage from "../views/pages/Home";
import AuthPage from "../views/pages/Auth";
import QuestionPage from "../views/components/Question";
import Users from "../views/pages/Users";
import ContentPage from "../views/pages/Content";

const AppRouter = () => {
  return (
    <>
      <MainLayout />
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="question/:qId" element={<QuestionPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
