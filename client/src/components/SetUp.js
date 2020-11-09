import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Popover, OverlayTrigger} from 'react-bootstrap';
import logo from '../images/testicon2.png';
import '../style/SetUp.scss';
import bicepcurl from '../images/new/bicep-curl.jpg';
import butterflyImg from '../images/new/Butterfly.jpg';
import sideLunge from '../images/new/side-lunge.jpg';
import shoulderpress from '../images/new/shoulder-press-hd.jpeg';
import standingLegLift from '../images/standingLegLift.jpg';
import deadLift from '../images/new/leg-deadlift.jpg';


/* ------------- Popovers for info-button -------------- */
  
  const ExercisePopover = (props) => (
    <OverlayTrigger trigger="click" placement="right" overlay={props.overlay}>
      <span className="info-button">i</span>
    </OverlayTrigger>
  );

  const bicepCurlPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Bicep Curl</Popover.Title>
      <Popover.Content>
        It is generally performed for moderate to high reps, such as 8-12 reps or higher, as part of the arm-focused portion of a workout
      </Popover.Content>
    </Popover>
  );

  const pushUpPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Push Up</Popover.Title>
      <Popover.Content>
        It pefoms as effective bodyweight because of the number of muscles that are recruited to perform them.
      </Popover.Content>
    </Popover>
  );

  const shoulderPressPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Shoulder Press</Popover.Title>
      <Popover.Content>
        The dumbbells from a seated position are always on a bench with an upright back for complete support.
      </Popover.Content>
    </Popover>
  );

  const gluteBridgePopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Side Lunge</Popover.Title>
      <Popover.Content>
        It is focusing on the mind-muscle connection and controlled movements.
      </Popover.Content>
    </Popover>
  );

  const lungesPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Lunges</Popover.Title>
      <Popover.Content>
        promoting functional movement, while also increasing strength in your legs and glutes.
      </Popover.Content>
    </Popover>
  );

  const legLift = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Standing Leg Lift</Popover.Title>
      <Popover.Content>
          This classic exercise (standing leg lifts) strengthens your legs and core while improving balance and flexibility.
      </Popover.Content>
    </Popover>
  );
  


export default function SetUp(props) {

    const [name] = React.useState(
        localStorage.getItem('name') || 'Mr. X'
    );

    return (
        <div className="wrapper">
            {/* SideBar */}
            <div id="sidebar">
                <div className="sidebar-content">
                    <img className="mb-3" src={logo} alt="logo"></img> <br></br>
                    <Link className="pageButton" to="/training" onClick={props.findNextExercise(true)}> Start Training! </Link>
                </div>
            </div> 
            {/* Selection-Overview */}
            <div className="selection-overview">
                <h3 className="selection-headline">Hey {name}, let's setup your training schedule for today!</h3>
                <div className="category arms mx-5 py-3">
                    <h4 className="d-inline mr-3">Arm-Exercises (all)</h4>
                    <input className="d-inline" id="arms" type = "checkbox" onChange={(e) => props.selectGroup("arms")}/>
                    <Row className="mx-5 mt-4"> 
                        <Col md={4} sm={12}>
                            <div className="exercise bicep-curl">
                                <p className="d-inline mr-3 ml-4">Bicep-Curl</p>
                                <input id="1" className="d-inline mr-3"  type = "checkbox" defaultChecked={props.exercises[0].selected}  onChange={(e) => props.selectExercise(1)}/>
                                <ExercisePopover overlay= {bicepCurlPopover} className= "d-inline"></ExercisePopover>
                                <img className="exercise-image" src={bicepcurl} alt="bicep-curl-img"></img>
                            </div>
                        </Col>
                        <Col md={4} sm={12}>
                            <div className="exercise shoulder-press">
                                <p className="d-inline mr-3 ml-4">Shoulder-Press</p>
                                <input id="2" className="d-inline mr-3"  type = "checkbox" defaultChecked={props.exercises[1].selected}  onChange={(e) => props.selectExercise(2)} />
                                <ExercisePopover overlay= {shoulderPressPopover} className= "d-inline"></ExercisePopover>
                                <img className="exercise-image" src={shoulderpress} alt="shoulderpress-img"></img>
                            </div>
                        </Col>
                        <Col md={4} sm={12}>
                            <div className="exercise push-up">
                                <p className="d-inline mr-3 ml-4">Butterfly</p>
                                <input id="3" className="d-inline mr-3"  type = "checkbox" defaultChecked={props.exercises[2].selected}  onChange={(e) => props.selectExercise(3)}/>
                                <ExercisePopover overlay= {pushUpPopover} className= "d-inline"></ExercisePopover>
                                <img className="exercise-image" src={butterflyImg} alt="Butterfly-img"></img>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="category legs mt-5 mb-5 mx-5 py-3">
                    <h4 className="d-inline mr-3">Leg-Exercises (all)</h4>
                    <input className="d-inline" id="legs" type = "checkbox"  onChange={(e) => props.selectGroup("legs")}/>
                    <Row className="mx-5 mt-4"> 
                        <Col md={4} sm={12}>
                            <div className="exercise glute-bridge">
                                <p className="d-inline mr-3 ml-4">Side Lunge</p>
                                <input id="4" className="d-inline mr-3"  type = "checkbox" defaultChecked={props.exercises[3].selected}  onChange={(e) => props.selectExercise(4)}/>
                                <ExercisePopover overlay= {gluteBridgePopover} className= "d-inline"></ExercisePopover>
                                <img className="exercise-image" src={sideLunge} alt="glutebridge-img"></img>
                            </div>
                        </Col>
                        <Col md={4} sm={12}>
                            <div className="exercise lunges">
                                <p className="d-inline mr-3 ml-4">Standing Leg Deadlift</p>
                                <input id="5" className="d-inline mr-3"  type = "checkbox" defaultChecked={props.exercises[4].selected}  onChange={(e) => props.selectExercise(5)}/>
                                <ExercisePopover overlay= {lungesPopover} className= "d-inline"></ExercisePopover>
                                <img className="exercise-image" src={deadLift} alt="lunges-img"></img>
                            </div>
                        </Col>
                        <Col md={4} sm={12}>
                            <div className="exercise leg lift">
                                <p className="d-inline mr-3 ml-4">Standing Leg Lift</p>
                                <input id="6" className="d-inline mr-3"  type = "checkbox" defaultChecked={props.exercises[5].selected}  onChange={(e) => props.selectExercise(6)}/>
                                <ExercisePopover overlay= {legLift} className= "d-inline"></ExercisePopover>
                                <img className="exercise-image" src={standingLegLift} alt="leg-lift-img"></img>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
