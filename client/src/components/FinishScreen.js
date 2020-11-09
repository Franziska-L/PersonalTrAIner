import React from 'react';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../style/FinishScreen.scss'
import background from '../images/finish.jpg'


export default function FinishScreen() {

    const [name] = React.useState(
        localStorage.getItem('name') || 'Mr. X'
    );


    return (
        <Container className="finishContainer" fluid style={{backgroundImage: `url(${background})`, backgroundSize: 'cover',
            overflow: 'hidden'}}>

            <h1 className="finishTitle">You are done! - <br></br> Congratulations {name}</h1>
            <Link className="pageButton" to="/"> Go back to menu </Link>

        </Container>
    )
}
