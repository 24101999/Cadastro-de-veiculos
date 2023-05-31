import React, { ChangeEvent, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Veiculo from "./pages/veiculo/Veiculo";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/veiculo/:id" element={<Veiculo />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
