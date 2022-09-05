import { useEffect } from "react";
import { useParams } from "react-router-dom";


function quizComponent() {

    useEffect(() => {
        loadUserParam();
    });

    function loadUserParam() {
        const urlParams = useParams();
    }
    
    return (
        <div className="App">

        </div>
    )
} 

export default  quizComponent;