import { useState } from "react";
import Option from "./Option"
import { nanoid } from "nanoid";
import React from "react";
import { useEffect } from "react";
export default function Question(props){
    const[question,setQuestion]=useState(props.current)
    useEffect(() => {
        setQuestion(props.current);
    }, [props.current]);
    const op=[...props.ianswers];
    // console.log(op)
    op.splice(question.pos,0,question.correct_answer)
    return(
        <div className="question">
            <h4>{question.question}</h4>
            <div className="options" >
            {op.map((option) => (
                    <div className="option" key={nanoid()}>
                        <p
                            className="optionText"
                            style={{
                                cursor: "pointer",
                                color:"#293264",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                border:
                                    props.submit==1?
                                        option==question.correct_answer?"none":
                                            option==question.selectedoption?"none":
                                                "1px solid #4D5B9E"
                                        :"1px solid #4D5B9E",
                                backgroundColor:
                                    props.submit==1?
                                    option==question.correct_answer?"#94D7A2":
                                    option==question.selectedoption?"#F8BCBC":"#F5F7FB"
                                    :
                                    option==question.selectedoption?"#D6DBF5": "#F5F7FB"
                                
                            }}
                            onClick={()=>props.selected(option,question.question)}
                        >
                            {option}
                        </p>
                    </div>
                ))}

            </div>
            {/* <div className="options">
                {op.map(option=><Option key={nanoid()} selectedOption={question.selectedoption} selected={()=>{props.selected(option,question.question)}} value={option}/>)}
            </div> */}
        </div>
    )
}