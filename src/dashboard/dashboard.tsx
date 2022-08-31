import React from "react";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export class Dashboard extends React.Component {
    render() {
      return <div>
        <Header></Header>
        <Footer></Footer>
      </div>
    }
}
