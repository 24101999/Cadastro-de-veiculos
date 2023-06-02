import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Veiculo from "./pages/veiculo/Veiculo";
import Edit from "./pages/edit/Edit";
import Res from "./Res";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/veiculo/:id" element={<Veiculo />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/test" element={<Res />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
