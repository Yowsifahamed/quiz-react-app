import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JSONQUIZ from '../assets/db/quizCollection.json';

function QuizComponent() {
    const urlParams = useParams();
    const [count, setCount] = useState(0);

    useEffect(() => {
        JSONQUIZ.quizCol.forEach(res=>{
            console.log("urlParams",urlParams);
        });
    });

    return (
        <div className="App">

        </div>
    )
} 

export default QuizComponent;