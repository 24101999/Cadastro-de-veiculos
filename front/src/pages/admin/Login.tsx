import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
type Props = {};

const Login = (props: Props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [ms, setMs] = useState<string>("");
    const nav = useNavigate();
    const sub = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setMs("Campo vazio");
            return;
        }
        await axios
            .post("http://localhost:8000/login", {
                email,
                password,
            })
            .then((e) => {
                sessionStorage.setItem("key", e.data.access_token);
                localStorage.setItem("key", e.data.access_token);
                nav("/");
            })
            .catch((e) => {
                setMsg("E-mail ou senha esta incorreto");
                nav("/login");
            });
    };

    return (
        <div className={styles.login}>
            <h2 style={{ color: "white", textAlign: "center" }}>{msg}</h2>
            <form onSubmit={sub}>
                <h1 style={{ color: "#fff", textAlign: "center" }}>Login</h1>
                <label>
                    <span>E-mail</span>
                    <input
                        placeholder={ms}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>Senha</span>
                    <input
                        placeholder={ms}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <Link to={"/cadastro"}>Cadastre-se</Link>
        </div>
    );
};

export default Login;
