import React, { useState, useEffect } from 'react';
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "./utils/network";
import Profile from "./pages/Profile";
import Donasi from "./pages/Donasi/Donasi";
import Article from "./pages/Article/Article";
import ArticleTerkait from "./pages/Article/ArticleTerkait";
import DetailArticle from "./pages/Article/DetailArticle";
import Home from "./pages/HomeNoLogin/Home";
import Forum from "./pages/Forum/Forum";
import Petisi from "./pages/Petisi/Petisi";
import HomepageAdmin from "./pages/Admin/HomepageAdmin/HomepageAdmin";
import UserList from './pages/Admin/User/UserList';
import UserAdd from './pages/Admin/User/UserAdd';
import InfografisAdmin from './pages/Admin/InfografisAdmin/InfografisAdmin';
import AddInfografisAdmin from './pages/Admin/InfografisAdmin/AddlnfografisAdmin';
import UpdateInfografisAdmin from './pages/Admin/InfografisAdmin/UpdateInfografisAdmin'; 
import ArtikelAdmin from './pages/Admin/ArtikelAdmin/ArtikelAdmin';
import AddArtikelAdmin from './pages/Admin/ArtikelAdmin/AddArtikelAdmin';
import AksiAdmin from './pages/Admin/PetisiAdmin/PetisiAdmin';
import DonasiAdmin from './pages/Admin/DonasiAdmin/DonasiAdmin';
import UserUpdate from './pages/Admin/User/UserUpdate';
import UpdateArtikelAdmin from './pages/Admin/ArtikelAdmin/DetailArtikelAdmin'; 
import AddPetisiAdmin from './pages/Admin/PetisiAdmin/AddPetisiAdmin';
import UpdatePetisiAdmin from './pages/Admin/PetisiAdmin/DetailPetisiAdmin';
import Swal from 'sweetalert2'

function NeedLogin() {
  let auth = getAccessToken();
  let location = useLocation();

  if (!auth) {
    Swal.fire('Anda Harus Login Terlebih Dahulu!')
    return <Navigate to="/" state={{ from: location }} />
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route element={<NeedLogin />}>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/donasi" element={<Donasi />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/terkait/:tag" element={<ArticleTerkait />} />
            <Route path="/article/:key" element={<DetailArticle />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/petisi" element={<Petisi />} />
            {/* Admin */}
            <Route path="/admin" element={<HomepageAdmin />} />
            <Route path='/admin/user' element={<UserList/>}/>
            <Route path='/admin/add' element={<UserAdd/>}/>
            <Route path='/admin/edit/:id' element={<UserUpdate/>}/>
            <Route path='/admin/infografis' element={<InfografisAdmin/>}/>
            <Route path='/admin/infografis/add-infografis' element={<AddInfografisAdmin/>}/>
            <Route path='/admin/infografis/update-infografis/:id' element={<UpdateInfografisAdmin/>}/>
            <Route path='/admin/artikel' element={<ArtikelAdmin/>}/>
            <Route path='/admin/artikel/AddArtikelAdmin' element={<AddArtikelAdmin/>}/>
            <Route path='/admin/artikel/UpdateArtikelAdmin/:id' element={<UpdateArtikelAdmin/>}/>
            <Route path='/admin/petisi' element={<AksiAdmin/>}/>
            <Route path='/admin/petisi/AddPetisiAdmin' element={<AddPetisiAdmin/>}/>
            <Route path='/admin/petisi/UpdatePetisiAdmin/:id' element={<UpdatePetisiAdmin/>}/>
            <Route path='/admin/donasi' element={<DonasiAdmin/>}/>
            {/* <Route path="/:username/profile" element={<Profile />} /> */}
          </Route>
          {/* </Route> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
