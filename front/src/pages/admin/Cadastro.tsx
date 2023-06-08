import React, { ChangeEvent, useState } from "react";
import styles from "./Cadastro.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type Props = {};

const Cadastro = (props: Props) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [msgv, setMsgv] = useState<string>("");
    const nav = useNavigate();
    const sub = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setMsgv("campo vazio");
            return;
        }
        await axios
            .post("http://127.0.0.1:8000/cadastro", { email, password, name })
            .then(() => {
                nav("/login");
            })
            .catch(() => {
                setMsg("E-mail invalido!");
            });
    };

    return (
        <div className={styles.cadastro}>
            <h1 style={{ color: "#fff", textAlign: "center" }}>{msg}</h1>
            <form onSubmit={sub}>
                <h1 style={{ color: "#fff", textAlign: "center" }}>Cadastro</h1>
                <label>
                    <span>Nome</span>
                    <input
                        placeholder={msgv}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>E-mail</span>
                    <input
                        placeholder={msgv}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>Senha</span>
                    <input
                        placeholder={msgv}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </label>
                <button type="submit">CADASTRAR</button>
            </form>
        </div>
    );
};

export default Cadastro;
