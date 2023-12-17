import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ArticlesList from "./components/ArticlesList";
import Navbar from "./components/Navbar";
import Article from "./components/Article";

const App: React.FC = () => {
  const isTokenAvailable = !!localStorage.getItem('token');
  return (
    <BrowserRouter>
      {isTokenAvailable ? <Navbar /> : null}
      <Routes>
        <Route
          path="/login"
          element={
            isTokenAvailable ? <Navigate to="/articles" /> : <LoginForm />
          }
        />
        <Route
          path="/register"
          element={
            isTokenAvailable ? <Navigate to="/articles" /> : <RegisterForm />
          }
        />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route
          path="/"
          element={
            isTokenAvailable ? (
              <Navigate to="/articles" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
