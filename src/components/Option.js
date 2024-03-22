import React, { useState, useEffect } from "react";

export default function Option(props) {
    const [option, setOption] = useState(props.selectedOption);

    useEffect(() => {
        setOption(props.selectedOption);
    }, [props.selectedOption]);

    if (option === props.value) {
        console.log(props.selectedOption);
    }

    const styles = {
        cursor: "pointer",
        color: "rgb(82, 77, 77)",
        borderRadius: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
        paddingBottom: "5px",
        border: "1px solid grey",
        backgroundColor: option === props.value ? "#D6DBF5" : "#F5F7FB"
    };

    return (
        <div className="option">
            <p className="optionText" style={styles} onClick={props.selected}>
                {props.value}
            </p>
        </div>
    );
}
