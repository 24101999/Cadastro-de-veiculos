import React, { useEffect, useState } from "react";
import styles from "./Veiculo.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { d } from "../../interfaces";
type Props = {};

const Veiculo = (props: Props) => {
    const [dado, setDado] = useState<d>();

    const param = useParams();

    const id = param.id;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/${id}`).then((r) => {
            setDado(r.data);
        });
    }, []);

    return (
        <div
            className={styles.veiculo}
            style={{ backgroundImage: `url(${dado ? dado.path : ""})` }}
        >
            <div className={styles.all}>
                <img src={dado ? dado.path : ""} height={300} alt="" />
                <div className={styles.infos}>
                    <div className="">
                        <h2>Nome</h2>
                        <p>{dado ? dado.nome : ""}</p>
                    </div>
                    <div className="">
                        <h2>Marca</h2>
                        <p>{dado ? dado.marca : ""}</p>
                    </div>
                    <div className="">
                        <h2>Ano</h2>
                        <p>{dado ? dado.ano : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Veiculo;
