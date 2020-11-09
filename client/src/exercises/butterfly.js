import {setKeypoints, leftTorsoAngle,rightTorsoAngle, rightArmTooFarFromTorso, leftArmTooFarFromTorso} from "../util/keypoints";
const util = require('../util/util');
const settings = require('../settings');

let startedCurl = false
let repeats = 0
let sets = 1



// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx){

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let feedbackMessage = "<p>Do another Butterfly!<p>";
    if (rightArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your right arm closer to your upper body<p>")
    }
    if(leftArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your left arm closer to your upper body<p>")
    }

    if(leftTorsoAngle < 70 && rightTorsoAngle < 70){
        feedbackMessage = "<p>Great Job!<p>";
        if (startedCurl) {
            repeats++;
            startedCurl = false;
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
    else if(leftTorsoAngle > 10 && rightTorsoAngle > 10 && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Butterfly!<p>";
        startedCurl = true;
    }
    let feedback = document.getElementById('feedback');
    if(feedback != null)
       feedback.innerHTML = feedbackMessage
}

export {
    start,
}