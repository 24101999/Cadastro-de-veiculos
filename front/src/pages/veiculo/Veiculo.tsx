import React, { useEffect, useState } from "react";
import styles from "./Veiculo.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
type Props = {};

interface d {
    nome?: string;
    marca?: string;
    ano?: number;
}

const Veiculo = (props: Props) => {
    const [dado, setDado] = useState<d>();

    const param = useParams();

    const id = param.id;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/veiculos/${id}`).then((r) => {
            setDado(r.data);
        });
    }, []);

    return (
        <div className={styles.veiculo}>
            <h2>nome</h2>
            <p>{dado ? dado.nome : ""}</p>
            <h2>marca</h2>
            <p>{dado ? dado.marca : ""}</p>
            <h2>ano</h2>
            <p>{dado ? dado.ano : ""}</p>
        </div>
    );
};

export default Veiculo;
