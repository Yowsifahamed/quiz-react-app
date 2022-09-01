import React from "react";
import JSONQUIZ from '../assets/db/quizCollection.json'
import './dashboard.scss';
export class Dashboard extends React.Component {
  public dashboardData = JSONQUIZ.quizCol

  constructor(props: any) {
    super(props);
    // this.state = {
    //   dashboardValues: JSONQUIZ.quizCol || []
    // };
  }

  componentWillMount(): void {
    // console.log("data",this.state)
  }

  componentDidUpdate() {

  }


  render() {
    return <div className="dashboard">
      <div className="row">
        {this.dashboardData.map((item, i) => (
          <div className="col-sm-12 col-md-4 das-col-sm">
            <div className="img-section">
              <img className="content-img" alt="quiz app" src={`${item.col}`} />
              <div className="image-header">
                <span className="category"> {item.name} </span>
              </div>
              <div className="image-footer">
                <div className="quiz-time">
                  <span className="Home_nowPlaying__2zAVk">👤 8 quizzing now...</span>
                  <div className="Home_quizDuration__3tH8c">🏷️ 20Q / ⏱️ 8min</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  }
}
