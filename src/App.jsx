import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { setPost } from "./store/postSlice";
import postService from "./appwrite/post";
const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          postService.getPosts().then((data) => {
            if (data) dispatch(setPost(data.documents));
          });
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default App;
