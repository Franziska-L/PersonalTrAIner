import React, { useEffect } from 'react'
import poseEstimation from '../util/poseestimation';
import '../style/ExerciseScreen.scss';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";

//videos
import bicepCurlVideo from '../videos/BicepCurl.mp4';
import shoulderPressVideo from '../videos/shoulderPress.mp4';
import butterflyVideo from '../videos/butterfly2.mp4';
import deadLiftVideo from '../videos/standingDeadLift.mp4';
import legLiftVideo from '../videos/legLift.mp4';
import sideLungeVideo from '../videos/sideLunges.mp4'

// images
import bicepcurl from '../images/new/bicep-curl.jpg';
import shoulderpress from '../images/new/shoulder-press-hd.jpeg';
import butterflyImg from '../images/new/Butterfly.jpg';
import sideLunge from '../images/new/side-lunge.jpg';
import deadLift from '../images/new/leg-deadlift.jpg';
import legLift from '../images/standingLegLift.jpg';

// progressBar
import progressBar from '../images/progressBar.gif';

// image JSX
const bicepcurlJsx = {
  name: "Bicep Curl",
  description: (<h6 id="guidance" className="guidance">
      1. Stand up straight to the camera. <br/>
      2. Stand straight, feet shoulder-width apart, hands by your side <br/>
      3. Lift dumbbells. Keep elbows close to your body. Only forearms should move. <br/>
      4. Once dumbbells are at shoulder level, slowly lower arms to starting position. <br/>
      5. Repeat.</h6>),
  jsx: (<img className="exerciseImg" src={bicepcurl} alt="Bicep Curl" height="250px"/>),
  vid: (<video id="staticVideo" className="video" src={bicepCurlVideo} muted/>)
}
const butterflyJsx = {
  name: "Butterfly",
  description: (<h6 id="guidance" className="guidance">
      1. Sit on pec deck machine with back flat against back rest. <br/>
      2. Grip handles, make sure your arms are parallel to floor. <br/>
      3. Slowly push handles together. Hold for a count one. <br/>
      4. Returning to starting position in a controlled movement. <br/>
      5. Repeat.</h6>),
  jsx: (<img className="exerciseImg" src={butterflyImg} alt="butterflyImg" height="250px"/>),
  vid: (<video id="staticVideo" className="video" src={butterflyVideo} muted/>)
}
const shoulderpressJsx = {
  name: "Shoulder Press",
  description: (<h6 id="guidance" className="guidance">
      1. Stand up straight to the camera. <br/>
      2. Stand straight, feet shoulder-width apart, hold dumbbell in each hand. <br/>
      3. Elbows under your wrist, position dumbbells at your shoulder. <br/>
      4. Push dumbbell up, fully extend your arms. <br/>
      5. Lower dumbbells back down to shoulders. <br/>
      6. Repeat.</h6>),
  jsx: (<img className="exerciseImg" src={shoulderpress} alt="Shoulder Press" height="250px"/>),
  vid: (<video id="staticVideo" className="video" src={shoulderPressVideo} muted/>)
}
const deadliftJsx = {
  name: "Standing Leg Deadlift",
  description: (<h6 id="guidance" className="guidance">
        1. Stand up straight to the camera. <br/>
        2. Stand on one leg, knees slightly bent, dumbbell in each hand. <br/>
        3. Start bending at hip and extend your free leg behind you. <br/>
        4. Lower your torso until you're parallel to floor. <br/>
        5. Return to starting position. <br/>
        6. Repeat.</h6>),
  jsx: (<img className="exerciseImg" src={deadLift} alt="deadlift" height="250px"/>),
  vid: (<video id="staticVideo" className="video" src={deadLiftVideo} muted/>)
}
const legLiftJsx = {
  name: "Standing Leg Lift",
  description: (<h6 id="guidance" className="guidance">
        1. Stand up straight to the camera. <br/>
        2. Stand straight, legs are opened hip width.<br/>
        3. Lift one leg to side as much as possible, keep upper body stable. <br/>
        4. Guide leg back in a controlled movement. <br/>
        5. Repeat and then switch sides.</h6>),
  jsx: (<img className="exerciseImg" src={legLift} alt="Leg Lift" height="250px"/>),
  vid: (<video id="staticVideo" className="video" src={legLiftVideo} muted/>)
}
const lungeJsx = {
  name: "Side Lunge",
  description: (<h6 id="guidance" className="guidance">
        1. Stand up straight to the camera. <br/>
        2. Stand straight with feet slightly wider than hip-width apart.  <br/>
        3. Step out to the side, transfer weight to that leg. <br/>
        4. Use lead foot to push back to starting position. <br/>
        5. Repeat and then switch sides.</h6>),
  jsx: (<img className="exerciseImg" src={sideLunge} alt="Side Lunge" height="250px"/>),
  vid: (<video id="staticVideo" className="video" src={sideLungeVideo} muted/>)
}


const exerciseJsx = [bicepcurlJsx, shoulderpressJsx, butterflyJsx,  lungeJsx, deadliftJsx,  legLiftJsx]

const getImage = (exerciseName) => {
  for(let element of exerciseJsx){
    if(element.name === exerciseName){
      return element.jsx
    }
  }
}
const getVideoObj = (exerciseName) => {
  for(let element of exerciseJsx){
    if(element.name === exerciseName){
      return element.vid
    }
  }
}
const getDescriptionText = (exerciseName) => {
    for(let element of exerciseJsx){
        if(element.name === exerciseName){
            return element.description
        }
    }
}



export default function ExerciseScreen(props) {

    useEffect(() => {
        if(currentExercise !== ""){
            poseEstimation.bindPage(currentExercise);
            setCurrentExercise(currentExercise);
            setCurrentImg(getImage(currentExercise));
            setCurrentVideo(getVideoObj(currentExercise));
            setDescriptionText(getDescriptionText(currentExercise));
            setHasNext(props.hasNextExercise(currentExercise));
        }
    }, []);

  const [hasNext, setHasNext] = React.useState(false)
  const [currentImg, setCurrentImg] = React.useState('no Image')
  const [currentVideo, setCurrentVideo] = React.useState('no video')
  const [name] = React.useState(localStorage.getItem('name') || 'Mr. X');
  const [currentExercise, setCurrentExercise] = React.useState(
      localStorage.getItem('currentExercise') || 'no exercise selected yet'
  );
  const [descriptionText, setDescriptionText] = React.useState('no description')


    return (
        <div>
            <div id="timerModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="header-text">Rest</h1>
                    </div>
                    <div className="modal-body">
                        <h2 id="timer"><span id="time">60</span> seconds</h2>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
            <div>
                <div id="doneModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="header-text">Well done!</h1>
                        </div>
                        <div className="modal-body">
                            {hasNext
                                ? <a href="#" className="pageButton" onClick={() => props.exerciseCompleted(currentExercise)}>Go to next exercise &rarr;</a>
                                : <Link className="pageButton" to="/finish"> Finish! </Link>
                            }
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            <Container className="content">
                <div className="titleBox">
                    <h3 id="exerciseTitle" className="nameTitle">Current exercise {currentExercise}: </h3><h3 className="nameTitle">Let's move, {name}!</h3>
                </div>
              <Row>
                <Col className="descriptionContainer" md={5} lg={5}>
                  <div className="representation">
                      <div className="feedbackBox">
                          <h4 id="feedback" className="feedback">Feedback</h4>
                      </div>
                      {currentImg}
                      {props.img}
                      <div>
                          <h4 className="guidanceTitle">Instructions:</h4>
                          {descriptionText}
                      </div>
                  </div>
                </Col>
                <Col md={7} lg={7}>
                  <Container>
                    <canvas id="output"></canvas>
                    <div>
                      <img id="progressBar" src={progressBar} width="150px" height="150px" alt="loading..."></img>
                      {/*{currentVideo}*/}
                      <video id="video" className="video"></video>
                    </div>
                  </Container>
                </Col>
              </Row>
            </Container>
        </div>
    )
}
