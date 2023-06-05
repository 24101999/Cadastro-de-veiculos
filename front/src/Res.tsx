import React, { useEffect, useState } from "react";
import axios from "axios";
type Props = {};

const Res = (props: Props) => {
    const [dados, setDados] = useState<Array<string>>();

    // useEffect(() => {
    //     axios.get("http://127.0.0.1:8000/veiculos").then((r) => {
    //         console.log(r.data);
    //     });
    // }, []);

    return <div>Res</div>;
};

export default Res;
