import React, { ChangeEvent, useState } from "react";
import styles from "./Edit.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { d } from "../../interfaces";
type Props = {};

const Edit = (props: Props) => {
    const [nome, setNome] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [img, setImg] = useState<File | undefined>();
    const [dados, setDados] = useState<d>();
    const [msg, setMsg] = useState<string>("");
    const nav = useNavigate();
    const param = useParams();
    const id = param.id;
    const sub = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nome || !marca || !ano) {
            setMsg("Campo vazio");
            return;
        }
        axios
            .post(
                `http://127.0.0.1:8000/edit/${id}`,
                { nome, marca, ano, img },
                {
                    headers: {
                        // Authorization: "",
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((res) => {
                nav("/");
            })
            .catch(() => {
                alert("Não podee usar caracter especial:!@#$%¨&*");
                return;
            });
    };

    return (
        <div className={styles.edit}>
            <form onSubmit={sub}>
                <label>
                    <span>Img</span>
                    <input
                        type="file"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (!e.target.files) return;
                            setImg(e.target.files[0]);
                        }}
                    />
                </label>
                <label>
                    <span>Nome</span>
                    <input
                        placeholder={msg}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNome(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>Marca</span>
                    <input
                        placeholder={msg}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setMarca(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>Ano</span>
                    <input
                        placeholder={msg}
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAno(e.target.value)
                        }
                    />
                </label>
                <button type="submit">editar</button>
            </form>
        </div>
    );
};

export default Edit;
