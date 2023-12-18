import React from "react";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "./utils/network";
// import Search from "./pages/Searchpage/Search";
import Profile from "./pages/Profile";
import Donasi from "./pages/Donasi/Donasi";
import Article from "./pages/Article/Article";
import ArticleTerkait from "./pages/Article/ArticleTerkait";
import DetailArticle from "./pages/Article/DetailArticle";
import Home from "./pages/HomeNoLogin/Home";
import Forum from "./pages/Forum/Forum";
import Petisi from "./pages/Petisi/Petisi";
import HomepageAdmin from "./pages/Admin/HomepageAdmin/HomepageAdmin";

function NeedLogin() {
  let auth = getAccessToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<NeedLogin />}> */}
        <Route path="/HomePage" element={<HomePage />} />
        {/* <Route path="/Search" element={<Search />} /> */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Donasi" element={<Donasi />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article/terkait/:tag" element={<ArticleTerkait />} />
        <Route path="/article/:key" element={<DetailArticle />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Petisi" element={<Petisi />} />

        <Route path="/admin" element={<HomepageAdmin />} />

        {/* <Route path="/:username/profile" element={<Profile />} /> */}
        {/* </Route> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
