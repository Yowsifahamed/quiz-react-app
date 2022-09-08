import React from "react";
import withRouter from "./withRouter";
import JSONQUIZ from '../assets/db/quizCollection.json';
import './column.scss';
class Column extends React.Component {
  private params: any;
  public scorePageEnabled: boolean = false;
  public JSONData = JSONQUIZ.quizCol;
  public celebrarityData: any = [];
  public quizEnabled: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      paramId: null
    };
    this.getCurrentCelebrityData();
  }

  componentDidUpdate = () => {
    
  };

  getCurrentCelebrityData() {
    this.params = this.props;
    console.log("params",this.params)
    this.JSONData.forEach(element => {
      if (element.quiz_role == this.params.params.name) {
        this.celebrarityData = element;
        console.log("element", element)
      }
    });
  }

  render() {
      let quizStartContent;
      if (this.quizEnabled) {
        quizStartContent = 
          <div className="quiz-collection">
            <h2 className="questionText">
              {/* {{ getroleDetails.quiz_collection[quizIndex].questionMd }} */}
            </h2>
            <div className="questionScore">

              <span className="time low" id="time">⏰ Sec</span>

              <span className="time-out" id="time">⏰ Time out</span>
              <span className="points">🏆 </span>
            </div>
            <ul className="questionOptions" >
              {/* <li className="questionOption"> {{ answersCol }} </li> */}
            </ul>
            <button className="nextBtn questionOption moveUp-enter-done" >
              <div>Next</div>
            </button>
          </div>
      }

    if (this.scorePageEnabled) {
      return <>
        <div className="score-content">
          {/* <img  alt="test"> */}
          <div className="quiz-complete">
            <div className="quiz-score">
              <div className="score-text">
                <h3>🏆 Your score</h3>
              </div>
              <div className="score-points">
                {/* <h3 class="numberscore"> {{ totalScore }}</h3> */}
              </div>
            </div>
            <div className="quiz-reasult">
              <div className="reasult">
                <h3>You got 5 OUT OF  20 RIGHT! </h3>
              </div>
              <div className="challage-reasult">
                🎯 Challenge: Can you get 8/20 right?
              </div>
            </div>
            <div className="more-quiz">
              <p> Share your result: </p>
              <button className="retake-quiz-btn" id="retakeQuiz" title="⟲ Retake Quiz"> ⟲ Retake Quiz
              </button>
              <button className="more-quiz-btn" id="moreQuiz" title="More Quizzes >"> More Quizzes </button>
            </div>
          </div>
        </div>
      </>
    } else {
      return <>
        <div className="quiz-content">
          <img src={this.celebrarityData?.quiz_start_image} alt="alternative" />
       {/* <img [src]="getroleDetails.quiz_collection[quizIndex].image"> */}
          <div className="content">
            <div className="screen-content">
              <div className="quiz-start-section">
                <h1 className="quizTitle">The Toughest <span className="ronaldo">Cristiano Ronaldo</span> Quiz!</h1>
                <h2 className="quizTagline">Everyone loves Ronaldo! But can you outscore #CR7 fans in this quiz?</h2>
                <button className="startBtn">Start the Quiz</button>
              </div>

              { quizStartContent }
            </div>
          </div>
        </div>
      </>
    }
  }
}

export default withRouter(Column);
