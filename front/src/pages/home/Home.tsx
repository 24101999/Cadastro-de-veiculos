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
    const [msg, setMsg] = useState<string>("");
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

        const key = sessionStorage.getItem("key");
        if (key == localStorage.getItem("key")) {
            nav("/");
        } else {
            nav("/login");
        }
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
        }, 500);
    };

    const sub = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nome || !marca || !ano) {
            setMsg("Campo vazio");
            return;
        }
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
            })
            .catch(() => {
                alert("Não pode usar caracter especial:!@#$%¨&*");
            });
        setAno("");
        setMarca("");
        setNome("");
        setImg(undefined);
        setTimeout(() => {
            get();
        }, 500);
    };
    return (
        <>
            <Modal md={modal} cl={close} del={destroy} />
            <div className={styles.home}>
                <div className={styles.cadastro}>
                    <h1 style={{ textAlign: "center" }}>Cadastro</h1>
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
                                placeholder={msg}
                                value={nome}
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
                                value={marca}
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
                                value={ano}
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
