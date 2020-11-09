import {leftShoulder, leftElbow, leftWrist, rightShoulder, rightElbow, rightWrist,
    rightArmTooFarFromTorso, leftArmTooFarFromTorso, leftArmAngle, rightArmAngle, setKeypoints} from "../util/keypoints";

const util = require('../util/util');
const settings = require('../settings');

let started = false
let repeats = 0
let sets = 1


// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx) {

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let feedbackMessage = "<p>Do another Bicep Curl!<p>";
    
    const summedScore = leftShoulder.score + leftElbow.score + leftWrist.score
                        + rightShoulder.score + rightElbow.score + rightWrist.score
    
    if (rightArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your right arm closer to your upper body<p>")
    }
    if(leftArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your left arm closer to your upper body<p>")
    } if (summedScore < 5) {
        feedbackMessage = ("<p>You are too close to the camera<p>")
    }

    if(!leftArmTooFarFromTorso &&
        !rightArmTooFarFromTorso &&
        summedScore > 3.5 &&
        leftArmAngle < 40 && rightArmAngle < 40){

        feedbackMessage = "<p>Great Job!<p>";
        if (started) {
            started = false;
            repeats++;
            if (repeats === settings.maxNumOfRep) {
                setTimeout(() => {
                    document.getElementById("timerModal").style.display = "block"
                    let time = settings.restTime;
                    const display = document.querySelector('#time');
                    util.startTimer(time, display, sets, repeats);
                }, 1500);
            }
        }
    }
    else if(!leftArmTooFarFromTorso &&
        !rightArmTooFarFromTorso &&
        summedScore > 3.5 && leftArmAngle > 160 && rightArmAngle > 160 && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Bicep Curl!<p>";
        started = true;
    }

    let feedback = document.getElementById('feedback');
    if(feedback != null)
        feedback.innerHTML = feedbackMessage
}


export {
    start,
}