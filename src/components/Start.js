export default function start(props){
    return(
        <div className="starting">
            <h1>CineQuiz</h1>
            <span>Lights, Camera, Quizz! Explore the World of Cinema with Us</span>
            <button onClick={props.onClick}><b>Begin Quizz</b></button>
        </div>
    )
}