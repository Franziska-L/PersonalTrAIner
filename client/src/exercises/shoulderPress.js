import {leftShoulder, leftElbow, leftWrist, rightShoulder, rightElbow, rightWrist,
    leftArmTooCloseToCenter, rightArmTooCloseToCenter, leftArmAngle,leftTorsoAngle, rightTorsoAngle, rightArmAngle, setKeypoints} from "../util/keypoints";
const util = require('../util/util');
const settings = require('../settings');

let startedPress = false
let repeats = 0
let sets = 1


// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx){

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let feedbackMessage = "<p>Do another Shoulder Press !<p>";
    const summedScore = leftShoulder.score + leftElbow.score + leftWrist.score
                        + rightShoulder.score + rightElbow.score + rightWrist.score

    if (rightArmTooCloseToCenter){
        feedbackMessage = ("<p>Hold your right arm straight<p>")
    }
    if(leftArmTooCloseToCenter){
        feedbackMessage = ("<p>Hold your left arm straight<p>")
    }
    

    if(leftTorsoAngle < 80 && rightTorsoAngle < 80){

        feedbackMessage = "<p>You are doing well!<p>";
        if (startedPress) {
            repeats++;
            startedPress = false;
            if (repeats === settings.maxNumOfRep) {
                setTimeout(() => {
                    document.getElementById("timerModal").style.display = "block"
                    let time = settings.restTime;
                    const display = document.querySelector('#time');
                    util.startTimer(time, display,  sets, repeats);
                }, 1500);
            }
        }
    }
    else if(
        summedScore > 3.5 && leftTorsoAngle < 120 && rightTorsoAngle < 120 && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Shoulder Press !<p>";
        startedPress = true;
    }

    let feedback = document.getElementById('feedback');
    if(feedback != null)
       feedback.innerHTML = feedbackMessage
}



export {
    start
}