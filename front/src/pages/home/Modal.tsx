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
            <button onClick={cl} className={styles.closed}>
                <AiOutlineCloseCircle />
            </button>
            <button onClick={del}>sim</button>
            <button onClick={cl}>não</button>
            <h1>modal</h1>
        </div>
    );
};

export default Modal;
