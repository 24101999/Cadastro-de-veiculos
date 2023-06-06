import { useState } from "react";
import styles from "./Modal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
    md?: string;
    cl?: () => void;
    del?: () => void;
};

const Modal = ({ md, cl, del }: Props) => {
    return (
        <div className={md}>
            <h1 style={{ color: "#fff" }}>TEM CERTEZA?</h1>
            <button onClick={cl} className={styles.closed}>
                <AiOutlineCloseCircle />
            </button>
            <div style={{ display: "flex", gap: "1rem" }}>
                <button
                    className={styles.button}
                    style={{ backgroundColor: "green" }}
                    onClick={del}
                >
                    <strong>SIM</strong>
                </button>
                <button
                    className={styles.button}
                    style={{ backgroundColor: "red" }}
                    onClick={cl}
                >
                    <strong>NÃO</strong>
                </button>
            </div>
        </div>
    );
};

export default Modal;
