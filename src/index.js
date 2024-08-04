import { HashRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Article from "./routes/Article/Article";
import AuthProvider from "./context/AuthContext";
import Home from "./routes/Home";
import HomeArticles from "./routes/HomeArticles";
import Login from "./routes/Login";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile/Profile";
import ProfileFavArticles from "./routes/Profile/ProfileFavArticles";
import React from "react";
import ReactDOM from "react-dom/client";
import SignUp from "./routes/SignUp";
import reportWebVitals from "./reportWebVitals";
import Settings from "./routes/Settings";
import CommentsSection from "./routes/Article/CommentsSection";
import ProfileArticles from "./routes/Profile/ProfileArticles";
import ArticleEditor from "./routes/ArticleEditor";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />}>
              <Route index element={<HomeArticles />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="settings" element={<Settings />}/>
            <Route path="editor" element={<ArticleEditor />}>
              <Route path=":slug" element={<ArticleEditor />} />
            </Route>
            <Route path="article/:slug" element={<Article />}>
              <Route index element={<CommentsSection />} />
            </Route>
            <Route path="profile/:username" element={<Profile />}>
              <Route index element={<ProfileArticles />} />
              <Route path="favorites" element={<ProfileFavArticles />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
);

reportWebVitals();

