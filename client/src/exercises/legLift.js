import {rightHipAngle, leftHipAngle, setKeypoints, rightLegTooFarFromHip, leftLegTooFarFromHip} from "../util/keypoints";

const util = require('../util/util');
const settings = require('../settings');
const poseestimation = require('../util/poseestimation');

let started = false
let repeats = 0
let sets = 1
let isSecondSide = false

let feedback = document.getElementById('feedback');
let feedbackMessage = "";

// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx) {

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let feedbackMessage = null
    let description = document.getElementById("exerciseTitle");
    if (!isSecondSide) {
        description.textContent = "Current exercise Standing Leglift / left: "
    }

    if(leftHipAngle < 150 && !isSecondSide){
        feedbackMessage = "<p>Great Job!<p>";
        if (started) {
            repeats++;
            started = false;
            if (repeats === settings.maxNumOfRep) {
                setTimeout(() => {
                    repeats = 0;
                    isSecondSide = true
                    //Comment in if video analysis is set
                    //poseestimation.setOrientation(false)
                    started = false;
                    description.textContent = "Current exercise: Standing Leglift / right: "
                }, 2000);
            }
        }
    } else if (rightHipAngle < 150 && isSecondSide) {
        feedbackMessage = "<p>Great Job!<p>";
        if (started) {
            repeats++;
            started = false;
            if (repeats === settings.maxNumOfRep && isSecondSide) {
                setTimeout(() => {
                    document.getElementById("timerModal").style.display = "block"
                    let time = settings.restTime;
                    const display = document.querySelector('#time');
                    util.startTimer(time, display, sets, repeats);
                }, 1500);
            }
        }
    } else if (leftHipAngle > 160 && rightHipAngle > 160 && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Standing Leglift!<p>";
        started = true;
    }
    
    if (rightLegTooFarFromHip){
        feedbackMessage = ("<p>Hold your right leg straight <p>")
    }

    let feedback = document.getElementById('feedback');
    if(feedback != null)
       feedback.innerHTML = feedbackMessage
}


export {
    start,
}