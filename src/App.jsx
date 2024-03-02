import React, { useEffect, useState } from "react";
import { Header, Footer, LoadingComponent } from "./components/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("userData :: getCurrentUser :: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

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
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300 font-rubik">
      <div className="w-full block">
        <Header />
        <main>
          <LoadingComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
