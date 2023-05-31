import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type Props = {};

interface dados {
    id?: number;
    nome?: string;
    marca?: string;
    ano?: number;
}
const Home = (props: Props) => {
    const [nome, setNome] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [veiculo, setVeiculo] = useState<Array<dados>>();
    const nav = useNavigate();

    const get = () => {
        axios.get("http://127.0.0.1:8000/veiculos").then((res) => {
            setVeiculo(res.data);
        });
    };

    const destroy = (e: number | undefined) => {
        axios.delete(`http://localhost:8000/delete/${e}`);
        setTimeout(() => {
            get();
        }, 500);
    };

    useEffect(() => {
        get();
    }, []);

    const sub = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/", { nome, marca, ano });
        setTimeout(() => {
            get();
        }, 1000);
    };
    return (
        <div className={styles.home}>
            <form onSubmit={sub}>
                <label>
                    <span>Nome</span>
                    <input
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNome(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>Marca</span>
                    <input
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setMarca(e.target.value)
                        }
                    />
                </label>
                <label>
                    <span>Ano</span>
                    <input
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAno(e.target.value)
                        }
                    />
                </label>
                <button type="submit">send</button>
            </form>
            <div className="">
                <h2>Veiculo</h2>
                {veiculo
                    ? veiculo.map((v) => {
                          return (
                              <div key={v.id} className={styles.veiculo}>
                                  <p>{v.nome}</p>
                                  <p>{v.marca}</p>
                                  <p>{v.ano}</p>
                                  <button
                                      onClick={() => {
                                          nav(`veiculo/${v.id}`);
                                      }}
                                  >
                                      Ver mais
                                  </button>
                                  <button onClick={() => destroy(v.id)}>
                                      deletar
                                  </button>
                              </div>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};

export default Home;
