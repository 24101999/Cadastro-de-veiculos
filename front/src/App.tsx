import React, { ChangeEvent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
    const [name, setname] = useState<string>("");

    const sub = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/", { name });
    };

    return (
        <div className="App">
            <form onSubmit={sub}>
                <input
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setname(e.target.value)
                    }
                />
                <button type="submit">send</button>
            </form>
        </div>
    );
}

export default App;
