import React from 'react';
import '../style/Header.scss';
import logo from '../images/testicon2.png'


function Header() {
    return(
        <header className='pageHeader'>
            <div className='row'>
                <img className="logo" src={logo} alt="Logo" />
                <h1>PersonalTr<span className="ai">AI</span>ner</h1>
            </div>
        </header>
    )
}


export default Header;