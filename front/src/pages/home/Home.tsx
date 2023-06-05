import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { d } from "../../interfaces";
import { BiShow, BiEditAlt } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import Header from "../header/Header";
import Modal from "./Modal";
type Props = {};

const Home = (props: Props) => {
    const [nome, setNome] = useState<string>("");
    const [marca, setMarca] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [img, setImg] = useState<File | undefined>();
    const [veiculo, setVeiculo] = useState<Array<d>>();
    const [modal, setModal] = useState<string>(styles.none);
    const nav = useNavigate();
    const [id, setId] = useState<number>();

    useEffect(() => {
        axios
            .get("http://localhost:8000/")
            .then((res) => {
                setVeiculo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const open = (e: number | undefined) => {
        setId(e);
        setModal(styles.modal);
    };
    const close = () => {
        setModal(styles.none);
    };

    const get = () => {
        axios.get("http://localhost:8000/").then((res) => {
            setVeiculo(res.data);
        });
    };

    const destroy = () => {
        axios.delete(`http://localhost:8000/delete/${id}`);
        close();
        setTimeout(() => {
            get();
        }, 800);
    };

    const sub = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/insert",
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
        <>
            <Modal md={modal} cl={close} del={destroy} />
            <div className={styles.home}>
                <div className={styles.cadastro}>
                    <form onSubmit={sub}>
                        <label>
                            <span>Img</span>
                            <input
                                type="file"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
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
                </div>
                <div className={styles.veiculos}>
                    {veiculo
                        ? veiculo.map((v) => {
                              return (
                                  <div key={v.id} className={styles.veiculo}>
                                      <img src={v.path} alt="" />
                                      <h3>{v.nome}</h3>
                                      <button
                                          onClick={() => {
                                              nav(`veiculo/${v.id}`);
                                          }}
                                      >
                                          <BiShow style={{ color: "blue" }} />
                                      </button>
                                      <button onClick={() => open(v.id)}>
                                          <TiDeleteOutline
                                              style={{ color: "red" }}
                                          />
                                      </button>
                                      <button
                                          onClick={() => nav(`edit/${v.id}`)}
                                      >
                                          <BiEditAlt
                                              style={{ color: "green" }}
                                          />
                                      </button>
                                  </div>
                              );
                          })
                        : ""}
                </div>
            </div>
        </>
    );
};

export default Home;
