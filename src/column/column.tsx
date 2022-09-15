import React from "react";
import withRouter from "./withRouter";
import JSONQUIZ from '../assets/db/quizCollection.json';
import './column.scss';

interface MainState {
  paramId: string,
  isToggleStartQuiz: boolean,
  celebrarityData: Array<any>,
  quizNumber: number,
  selectedAnswer: boolean,
  answerIndex: number,
  selectedAnswerIndex: number,
  quizEvenSelected: boolean
}
class Column extends React.Component<{}, MainState> {
  private params: any;
  public JSONData = JSONQUIZ.quizCol;
  public celebrarityData: any = [];

  constructor(props: any) {
    super(props);
    this.state = {
      paramId: '',
      isToggleStartQuiz: false,
      celebrarityData: [],
      quizNumber: 0,
      selectedAnswer: false,
      answerIndex: -1,
      selectedAnswerIndex: -1,
      quizEvenSelected: false
    };
    this.getCurrentCelebrityData();
    this.startQuiz = this.startQuiz.bind(this);
    this.nextQuiz = this.nextQuiz.bind(this);
  }

  componentDidUpdate = () => {

  };

  getCurrentCelebrityData() {
    this.params = this.props;
    this.JSONData.forEach(element => {
      if (element.quiz_role == this.params.params.name) {
        this.celebrarityData = element;
        let { celebrarityData} = this.state;
        celebrarityData.push(element);
      }
    })
  }

  startQuiz() {
    this.setState({ isToggleStartQuiz: true });
  }

  nextQuiz() {
    let { quizNumber} = this.state;
    quizNumber++;
    this.setState({ quizNumber: quizNumber });
    this.setState({ selectedAnswerIndex: -1 });
    this.setState({ quizEvenSelected: false });
  }

  quizSelected(index:number){
    this.setState({ selectedAnswerIndex: index });
    this.setState({ quizEvenSelected: true });
    this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].answers.forEach((element:any,i:any) => {
      if(index == this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].correctAnswerIdx){
        this.setState({ selectedAnswer: true });
      }else{
        this.setState({ selectedAnswer: false });
      }
    });
  }

  render() {
    return (
      this.state.isToggleStartQuiz ? <>
        <div className="screen-content">
        <img src={this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].image} alt="alternative" />
          <div className="quiz-collection">
            <h2 className="questionText">
              { this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].questionMd }
            </h2>
            <div className="questionScore">
              <span className="time low" id="time">⏰ Sec</span>
              <span className="time-out" id="time">⏰ Time out</span>
              <span className="points">🏆 </span>
            </div>
           
            <ul className="questionOptions" >
              {
                this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].answers.map((answer: any, index: any) => {
                return <li key={index} onClick={() => this.quizSelected(index)} 
                className={`questionOption 
                ${this.state.selectedAnswer && this.state.selectedAnswerIndex == index ? 'rigth-answer' : 
                !this.state.selectedAnswer && this.state.selectedAnswerIndex == index ? 'wrong-answer' : ''}
                ${ this.state.quizEvenSelected ? 'quizDisabled' : '' }`
              }
                > {answer} </li>
                })
              }
            </ul>

            <button className="nextBtn" onClick={this.nextQuiz}>
              <div>Next</div>
            </button>
          </div>
        </div>
      </> :
        <>
          <div className="quiz-content">
            <img src={this.celebrarityData?.quiz_start_image} alt="alternative" />
            <div className="content">
              <div className="screen-content">
                <div className="quiz-start-section">
                  <h1 className="quizTitle">The Toughest <span className="ronaldo">Cristiano Ronaldo</span> Quiz!</h1>
                  <h2 className="quizTagline">Everyone loves Ronaldo! But can you outscore #CR7 fans in this quiz?</h2>
                  <button className="startBtn" onClick={this.startQuiz}>Start the Quiz</button>
                </div>
              </div>
            </div>
          </div>
        </>
    )

    // if (this.quizEnabled) {
    //   console.log("true")
    //   return <>
    //      <div className="quiz-collection">
    //       <h2 className="questionText">
    //         {/* {{ getroleDetails.quiz_collection[quizIndex].questionMd }} */}
    //       </h2>
    //       <div className="questionScore">

    //         <span className="time low" id="time">⏰ Sec</span>

    //         <span className="time-out" id="time">⏰ Time out</span>
    //         <span className="points">🏆 </span>
    //       </div>
    //       <ul className="questionOptions" >
    //         {/* <li className="questionOption"> {{ answersCol }} </li> */}
    //       </ul>
    //       <button className="nextBtn questionOption moveUp-enter-done" >
    //         <div>Next</div>
    //       </button>
    //     </div>
    //   </>
    // } else {
    //   return <>
    //     <div className="quiz-content">
    //       <img src={this.celebrarityData?.quiz_start_image} alt="alternative" />
    //       {/* <img [src]="getroleDetails.quiz_collection[quizIndex].image"> */}
    //       <div className="content">
    //         <div className="screen-content">
    //           <div className="quiz-start-section">
    //             <h1 className="quizTitle">The Toughest <span className="ronaldo">Cristiano Ronaldo</span> Quiz!</h1>
    //             <h2 className="quizTagline">Everyone loves Ronaldo! But can you outscore #CR7 fans in this quiz?</h2>
    //             <button className="startBtn" onClick={this.startQuiz}>Start the Quiz</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // }

    // if (this.scorePageEnabled) {
    //   return <>
    //     <div className="score-content">
    //       {/* <img  alt="test"> */}
    //       <div className="quiz-complete">
    //         <div className="quiz-score">
    //           <div className="score-text">
    //             <h3>🏆 Your score</h3>
    //           </div>
    //           <div className="score-points">
    //             {/* <h3 class="numberscore"> {{ totalScore }}</h3> */}
    //           </div>
    //         </div>
    //         <div className="quiz-reasult">
    //           <div className="reasult">
    //             <h3>You got 5 OUT OF  20 RIGHT! </h3>
    //           </div>
    //           <div className="challage-reasult">
    //             🎯 Challenge: Can you get 8/20 right?
    //           </div>
    //         </div>
    //         <div className="more-quiz">
    //           <p> Share your result: </p>
    //           <button className="retake-quiz-btn" id="retakeQuiz" title="⟲ Retake Quiz"> ⟲ Retake Quiz
    //           </button>
    //           <button className="more-quiz-btn" id="moreQuiz" title="More Quizzes >"> More Quizzes </button>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // }
  }
}

export default withRouter(Column);
