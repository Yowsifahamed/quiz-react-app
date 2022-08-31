import React from "react";
import './footer.scss';

const footerNavigation: Array<any> = [
    { "nav": "Home", "routing": "" },
    { "nav": "All Quizzes", "routing": "" },
    { "nav": "About Us", "routing": "" },
    { "nav": "Contact Us", "routing": "" }
];

const dynamicFooter = footerNavigation.map((item,i) => {
    return  <li className="cust-nav-item"> { item.nav } </li>
});

export class Footer extends React.Component {
    render() {
        return <footer>
            <ul className="footer-list">
                <li> {dynamicFooter} </li>
            </ul>
        </footer>
    }
}
