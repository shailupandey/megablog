import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  /* this(console one) is basic way to access the environment variables created in vite app
   second way used in production grade apps is to create a conf file in which all the env variables are 
   exported the below way is not efficient cause sometimes it can misread string type which causes huge error 
  ---- console.log(import.meta.env.VITE_APPWRITE_URL); */

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="flex flex-wrap content-between min-h-screen bg-gray-400">
      <div className="block w-full">
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
