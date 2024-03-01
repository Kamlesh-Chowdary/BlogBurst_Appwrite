import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { setPost, setLoading } from "./store/postSlice";
import postService from "./appwrite/post";
const App = () => {
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        postService.getPosts().then((data) => {
          if (data) dispatch(setPost(data.documents));
        });
        dispatch(login({ userData }));
        setLoading(false);
      } else {
        dispatch(logout());
      }
    });
  }, [loading, dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default App;
