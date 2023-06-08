import React from "react";
import load from "../../assets/Rolling-1s-200px (2).svg";
import styles from "./Loading.module.css";
type Props = {};

const Loading = (props: Props) => {
    return (
        <div className={styles.load}>
            <img src={load} alt="" height={100} />;
        </div>
    );
};

export default Loading;
