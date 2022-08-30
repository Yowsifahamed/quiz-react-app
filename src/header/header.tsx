import React from "react";
import './header.scss'

const headerArray = [
    { nav: "🔥 Trending" },
    { nav: "🌟 Latest" },
    { nav: "🎬 Entertainment" },
    { nav: "⚽ Sports" },
    { nav: "✈️ Travel" },
    { nav: "💡 Misc" }
];

const selectedArrayIndex: number = 0;

const dynamicNav = headerArray.map((item,i) => {
    return  <li className="cust-nav-item"> { item.nav } </li>
});

export class Header extends React.Component {
    render() {
        return <div>
            <nav className="custom-nav-bar">
                <ul className="cust-navbar-nav">
                    { dynamicNav }
                </ul>
            </nav >
        </div >
    }
}