import React, { useState } from "react";
import styles from "./Cadastro.module.css";
import axios from "axios";
type Props = {};

const Cadastro = (props: Props) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const sub = async () => {
        await axios.post("", { email, password, name });
    };

    return (
        <div className={styles.cadastro}>
            <form onSubmit={sub}>
                <h1 style={{ color: "#fff", textAlign: "center" }}>Cadastro</h1>
                <label>
                    <span>Nome</span>
                    <input type="text" />
                </label>
                <label>
                    <span>E-mail</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Senha</span>
                    <input type="text" />
                </label>
                <button type="submit">CADASTRAR</button>
            </form>
        </div>
    );
};

export default Cadastro;
