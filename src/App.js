import Question from './components/Question';
import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Loading from './components/Loading'
import { nanoid } from 'nanoid';
import Start from './components/Start';

function App() {
  console.log("rendered")
  const[questions,setQuestions]=useState([])
  const[error,setError]=useState()
  const [score,setScore]=useState(0)
  const[submit,setSubmit]=useState(0);
  const[loading,setLoading]=useState(false)
  const[start,setStart]=useState(false)
  const fetchData=async()=>{
    setLoading(true)
    try{
      const response = await fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple");
      console.log(response)
      if(!response.ok){
        console.log("yes")
        throw new  Error("Try Again") 
      }
      else if(response.response_code===5){
          console.log("empty")
          throw new  Error("Try Again") 
      }
      else{
        const data=await response.json();
        console.log(data.results)
        const q=data.results.map(question => ({ ...question, id: nanoid(), pos: generateRandom(3) }))
        const finalq=q.map(question=>{
          let res=question.question.replace(/&quot;/g, '').replace(/&#039;/g);
          const inc=question.incorrect_answers.map(item=>{return item.replace(/&quot;/g, '').replace(/&#039;/g);})
          const correct=question.correct_answer.replace(/&quot;/g, '').replace(/&#039;/g);
          return {...question,correct_answer:correct,question:res,incorrect_answers:inc}
        })
        setQuestions(finalq);
      }
    }
    catch(e){
      setError(e)
    }
    finally{
      console.log("done")
      setLoading(false)
    }
  }
  if(!start){
    return(<Start onClick={()=>{ fetchData();setStart(true)}}/>)
  }
  
  function handleSubmit(){
    if(submit==0){
      let c=0;
      for(let i=0;i<5;i++){
        if(questions[i].selectedoption==questions[i].correct_answer){
          c++;
        }
      }
      setScore(c)
      setSubmit(1)
    }
    else if(submit==1){
      fetchData()
      setSubmit(0)
    }
    else{
      setSubmit(0)
    }
  }
  function generateRandom(x){
    return Math.floor(Math.random()*Math.floor(x));
  }
  function selected(option,quest){
    const updatedQuestions = questions.map(q => {
        if (q.question === quest) {
          return { ...q, selectedoption: option }; // Update selectedOption, not selectedoption
        }
        return q;
    });
    setQuestions(updatedQuestions);
  }
  // console.log(questions)
  if(loading){
    console.log("loading")
    return <Loading/>
  }
  if(error){
    console.log("error",error);
    return(<h1 className='error'>Something went wrong please refresh ...</h1>)
  }
  return (
    <div className="App">
      <h2 className='title'>CineQuiz</h2>
      <div className='questions'>
        {questions.map(question=><Question selected={(option,quest)=>{selected(option,quest)}} key={question.id} current={question} ianswers={[...question.incorrect_answers]} submit={submit}/>)}
      </div>
      <div>
        {submit==1? <span>Your Score is {score}/5</span>:""}
        <button className='submit' onClick={handleSubmit}>{submit==1?" New Game":"Check Answers"}</button>
      </div>
    </div>
  );
}

export default App;
