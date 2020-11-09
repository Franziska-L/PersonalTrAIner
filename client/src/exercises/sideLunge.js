import {leftHip, leftKnee, leftAnkle, rightKnee, rightHip, rightAnkle,
    rightKneeAngle, leftKneeAngle, distanceAnkles, setKeypoints, rightLegTooFarFromHip, leftLegTooFarFromHip} from "../util/keypoints";
const util = require('../util/util');
const settings = require('../settings');
const poseestimation = require('../util/poseestimation');

let startedSideLunge = false
let repeats = 0
let sets = 1
let isSecondSide = false

// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx){

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let description = document.getElementById("exerciseTitle");
    if (!isSecondSide) {
        description.textContent = "Current exercise Side Lunge / left: "
    }

    let feedbackMessage = "<p>Do another Side Lunge!<p>";

    const summedScore = leftHip.score + leftKnee.score + leftAnkle.score
        + rightHip.score + rightKnee.score + rightAnkle.score
    
    if (rightLegTooFarFromHip){
        feedbackMessage = ("<p>Hold your right leg straight <p>")
    }
    if (rightLegTooFarFromHip){
        feedbackMessage = ("<p>Hold your right arm closer to your upper body<p>")
    }
    if(leftLegTooFarFromHip){
        feedbackMessage = ("<p>Hold your left arm closer to your upper body<p>")
    } if (summedScore < 3.5) {
        feedbackMessage = ("<p>Please stand in front of the camera<p>")
    }


    if(summedScore > 3.5 &&
        leftKneeAngle < 140 && rightKneeAngle > 160 && !isSecondSide){

        feedbackMessage = "<p>Great Job!<p>";
        if (startedSideLunge) {
            repeats++;
            startedSideLunge = false;
            if (repeats === settings.maxNumOfRep) {
                setTimeout(() => {
                   //Change side
                    repeats = 0;
                    isSecondSide = true
                    //Comment in if video analysis is set
                    //poseestimation.setOrientation(false)
                    description.textContent = "Current exercise Side Lunge / right: ";
                    startedSideLunge = false;
                }, 2000);
            }
        }
    } else if (summedScore > 3.5 &&
        rightKneeAngle < 140 && leftKneeAngle > 160 && isSecondSide) {
        feedbackMessage = "<p>Great Job!<p>";
        if (startedSideLunge) {
            repeats++;
            startedSideLunge = false;
            if (repeats === settings.maxNumOfRep) {
                setTimeout(() => {
                    document.getElementById("timerModal").style.display = "block"
                    let time = settings.restTime;
                    const display = document.querySelector('#time');
                    startTimer(time, display, sets, repeats);
                }, 1500);
            }
        }
    }
    else if(summedScore > 3.5 && rightKneeAngle > 160 && leftKneeAngle > 160 && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Side Lunge!<p>";
        startedSideLunge = true;
    }

    let feedback = document.getElementById('feedback');
    if(feedback != null)
       feedback.innerHTML = feedbackMessage
}


function startTimer(duration, display, sets, repeats) {
    const video = document.getElementById('staticVideo');
    if(video != null)
        video.pause();


    let timer = duration;
    let seconds;
    let __timer = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            clearInterval(__timer);
            timer = duration;
            document.querySelector(".modal").style.display = "none"
            if (sets === settings.maxNumOfSets) {
                //Go to next exercise
                document.getElementById("doneModal").style.display = "block"
            } else {
                sets++;
                repeats = 0;
            }
        }
    }, 1000);
}



export {
    start,
}