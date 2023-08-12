import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Edit from "./Components/Edit";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
