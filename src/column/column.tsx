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
  quizEvenSelected: boolean,
  totalMicroScore: number,
  loadSeconds: {
    maxSeconds: number,
    countSecondIncreamnet: number,
    secondInterval: any,
    nextButtonEnabled: boolean,
    countingState: boolean
  },
  microSeconds:{
    maxMicroSeconds: number,
    countMicroSecondIncreamnet: number
  }
}
class Column extends React.Component<{}, MainState> {
  private params: any;
  public JSONData = JSONQUIZ.quizCol;
  public celebrarityData: any = [];
  public getLastQuiz: number = 0;

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
      quizEvenSelected: false,
      totalMicroScore: 0,
      loadSeconds: {
        maxSeconds: 14,
        countSecondIncreamnet: 0,
        secondInterval: '',
        nextButtonEnabled: false,
        countingState: false
      },
      microSeconds: {
        maxMicroSeconds : 1000,
        countMicroSecondIncreamnet: 0
      }
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
    this.loadSeconds(true);
    this.loadMicroSeconds(true);
  }

  nextQuiz() {
    let { quizNumber} = this.state;
    quizNumber++;
    this.setState({ quizNumber: quizNumber });
    this.setState({ selectedAnswerIndex: -1 });
    this.setState({ quizEvenSelected: false });
    this.resettingIntervalVarivale();
    this.loadSeconds(true);
    this.loadMicroSeconds(true);
  }

  quizSelected(index:number){
    this.loadSeconds(false);
    this.loadMicroSeconds(false);
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

  resettingIntervalVarivale(){
    this.loadSeconds(false);
    this.loadMicroSeconds(false);
    let loadSeconds  = {...this.state.loadSeconds}
    loadSeconds.maxSeconds = 14;
    loadSeconds.countingState = false;
    loadSeconds.nextButtonEnabled = false;
    this.setState({ loadSeconds });

    let microSeconds  = {...this.state.microSeconds}
    microSeconds.countMicroSecondIncreamnet = 0;
    microSeconds.maxMicroSeconds = 1000;
    this.setState({ microSeconds });
  }

  loadSeconds(value:any){
    let that = this;
    let intervalState = value;
    this.state.loadSeconds.secondInterval = setInterval(function () {
      if (that.state.loadSeconds.maxSeconds < 1) {
        intervalState = false;
        clearInterval(that.state.loadSeconds.secondInterval);
        let loadSeconds  = {...that.state.loadSeconds}
        loadSeconds.nextButtonEnabled = true;
        that.setState({ loadSeconds });
      }  

      if (intervalState) {
        let loadSeconds  = {...that.state.loadSeconds}
        loadSeconds.maxSeconds--;
        that.setState({ loadSeconds });
      }
    }, 1000);

    if (!intervalState) {
      clearInterval(that.state.loadSeconds.secondInterval);
      let loadSeconds  = {...that.state.loadSeconds}
      loadSeconds.secondInterval = 0;
      loadSeconds.countSecondIncreamnet = that.state.loadSeconds.maxSeconds;
      loadSeconds.countingState = true;
      loadSeconds.nextButtonEnabled = true;
      loadSeconds.maxSeconds = 0;
      that.setState({ loadSeconds });
    }
  }

  loadMicroSeconds(value:any) {
    let that = this;
    let intervalState = value;
    var microInterval: any;
     microInterval = setInterval(function () {

      if (that.state.microSeconds.maxMicroSeconds < 1) {
        intervalState = false;
        clearInterval(microInterval);
      }

      if (intervalState) {
        let microSeconds  = {...that.state.microSeconds}
        microSeconds.maxMicroSeconds--;
        that.setState({ microSeconds });
      }
    }, 14);

    if (!intervalState) {
      clearInterval(microInterval);
      let microSeconds  = {...that.state.microSeconds}
      microSeconds.countMicroSecondIncreamnet = microSeconds.maxMicroSeconds;
      microSeconds.maxMicroSeconds = 0;
      that.setState({ microSeconds });
    }
  }

  render() {
    let timeOutAndIn : any;
    let loadSeconds  = {...this.state.loadSeconds}
    if (loadSeconds.maxSeconds !== 0 && loadSeconds.countSecondIncreamnet == 0 || loadSeconds.countSecondIncreamnet > 0) {
      timeOutAndIn = <span className="time-in" id="time">⏰
      { this.state.quizEvenSelected ? loadSeconds.countSecondIncreamnet : loadSeconds.maxSeconds }  Sec
    </span>;
    }

    if (loadSeconds.maxSeconds == 0 && loadSeconds.countSecondIncreamnet == 0) {
      timeOutAndIn =  <span className="time-out" id="time">⏰ Time out</span>;
    }
    return (
      this.state.isToggleStartQuiz ? <>
        <div className="screen-content">
        <img src={this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].image} alt="alternative" />
          <div className="quiz-collection">
            <h2 className="questionText">
              { this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].questionMd }
            </h2>
            <div className="questionScore">
              { timeOutAndIn }
              <span className="points"> 🏆 
                <span> { this.state.quizEvenSelected ? this.state.microSeconds.countMicroSecondIncreamnet : this.state.microSeconds.maxMicroSeconds } </span>
              </span>
            </div>
           
            <ul className="questionOptions" >
              {
                this.state.celebrarityData[0].quiz_collection[this.state.quizNumber].answers.map((answer: any, index: any) => {
                return <li key={index} onClick={() => this.quizSelected(index)} 
                className={`questionOption 
                ${this.state.selectedAnswer && this.state.selectedAnswerIndex == index ? 'rigth-answer' : 
                !this.state.selectedAnswer && this.state.selectedAnswerIndex == index ? 'wrong-answer' : ''}
                ${ this.state.quizEvenSelected ? 'quizDisabled' : '' }`}> {answer} </li>
                })
              }
            </ul>

            {
              loadSeconds.nextButtonEnabled && <button className="nextBtn" onClick={this.nextQuiz}>
                <div>Next</div>
              </button>
            }
    
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
