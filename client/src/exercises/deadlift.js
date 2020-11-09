import {rightHipAngle, leftHipAngle, setKeypoints, rightKneeTooFarFromCenter, leftKneeTooFarFromCenter} from "../util/keypoints";

const util = require('../util/util');
const settings = require('../settings');

let started = false
let repeats = 0
let sets = 1


// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx) {

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let feedbackMessage = "<p>Do another Dead Lift!<p>";
    if (rightKneeTooFarFromCenter){
        feedbackMessage = ("<p>Hold your right knee straight<p>")
    }
    if(leftKneeTooFarFromCenter){
        feedbackMessage = ("<p>Hold your left knee straight<p>")    
    }

    if(leftHipAngle < 100 || rightHipAngle < 100){

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
    else if((leftHipAngle > 170 || rightHipAngle > 170) && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Dead Lift!<p>";
        started = true;
    }

    let feedback = document.getElementById('feedback');
    if(feedback != null)
        feedback.innerHTML = feedbackMessage
}


export {
    start,
}