import React, {useEffect, useState} from 'react';
import '../style/WelcomeScreen.scss';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import background from '../images/welcomeimage.jpg'


export default function WelcomeScreen(props) {

    const[userName, setUserName] = useState('')

    function handleChange(e){
        setUserName(e.target.value);
    }

    useEffect( () => {
        localStorage.setItem('name', userName);
    })

    return (
        <Container className="welcomeContainer" fluid style={{backgroundImage: `url(${background})`, backgroundSize: 'cover',
            overflow: 'hidden'}}>
            
                <h1 className="title">Train with your personal coach - <br></br> whenever you want and wherever you are </h1>
                <h2 className="title">Start exercising now</h2>
                <h4 className="sectionHeadline">Enter your name:</h4>
                <div>
                    <input 
                        className="nameInput"
                        type="text"
                        placeholder="Enter your name..."
                        value={userName}
                        onChange = {handleChange}></input>
                </div>
                <Link className="pageButton" to="/setup"> Get started! </Link>
            
        </Container>
    )
}
