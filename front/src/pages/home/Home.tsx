import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { dados } from "../../interfaces";
import { d } from "../../interfaces";
type Props = {};

// interface dados {
//     id?: number;
//     nome?: string;
//     marca?: string;
//     ano?: number;
// }
const Home = (props: Props) => {
    const [nome, setNome] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [img, setImg] = useState<File | undefined>();
    const [veiculo, setVeiculo] = useState<Array<d>>();
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
        }, 800);
    };

    useEffect(() => {
        get();
    }, []);

    const sub = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post(
                "http://127.0.0.1:8000/",
                { nome, marca, ano, img },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((r) => {
                if (r.data) {
                    console.log("ok");
                } else {
                    console.log("erro");
                }
            });
        setTimeout(() => {
            get();
        }, 1000);
    };
    return (
        <div className={styles.home}>
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
                <h2>Veiculos</h2>
                {veiculo
                    ? veiculo.map((v) => {
                          return (
                              <div key={v.id} className={styles.veiculo}>
                                  <img src={v.path} alt="" height={300} />
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
                                  <button onClick={() => nav(`edit/${v.id}`)}>
                                      edit
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
