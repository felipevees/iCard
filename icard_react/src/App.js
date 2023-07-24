import React from "react";
import { ToastContainer } from "react-toastify";
import { Navigation, routes } from "./routes";
import { AuthProvider } from "./context";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  );
}
