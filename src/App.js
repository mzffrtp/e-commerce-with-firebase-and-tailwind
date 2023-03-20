import React from "react";

/* routing */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* components and pages */
import Products from "./Components/Products/Products";
import SignUp from "./Components/Navbar/Components/SignUp";
import Login from "./Components/Navbar/Components/Login";
import HomePage from "./Pages/mainPage/HomePage";
import NotFound from "./Components/NotFound"



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path={"/products"}>
        <Route index element={<Products />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path= "/login" element={<Login />} />
      
      <Route element={<NotFound />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
