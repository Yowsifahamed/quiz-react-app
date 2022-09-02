import React from "react";
import withRouter from "./withRouter";

class Column extends React.Component {
  private params: any;

  constructor(props:any) {
    super(props);
    this.state = { 
      paramId: ''
    };
  }

  componentDidMount = () => {
    this.getParams();
  };

  getParams = () => {
    this.params = this.props;
    this.setState({
      paramId: this.params.params.name
    });
  };

  render() {
    return <h1 >Hello</h1>;
  }
}

export default withRouter(Column);
