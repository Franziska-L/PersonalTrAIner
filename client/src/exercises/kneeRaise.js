import {rightKneeAngle, leftKneeAngle, setKeypoints} from "../util/keypoints";
const util = require('../util/util');
const settings = require('../settings');

let startedCurl = false
let repeats = 0
let sets = 1


// !! y = 0 close to the upper border of the video frame
function start(keypoints, ctx){

    setKeypoints(keypoints);
    util.setFeedback(ctx, repeats, sets);

    let feedback = document.getElementById('feedback');
    
    //const summedScore = leftShoulder.score + leftElbow.score + leftWrist.score + rightShoulder.score + rightElbow.score + rightWrist.score

     
    if (rightArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your right arm closer to your upper body<p>")
    }
    if(leftArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your left arm closer to your upper body<p>")
    }


    let feedbackMessage = null
    
   // if (rightArmTooFarFromTorso){
   //     feedbackMessage = ("<p>Hold your right arm closer to your upper body<p>")
   // }
   // if(leftArmTooFarFromTorso){
   //     feedbackMessage = ("<p>Hold your left arm closer to your upper body<p>") summedScore > 3.5 && summedScore > 3.5 &&
   // }

    // console.log("RightKneeAngle: "+rightKneeAngle+"; LeftKneeAngle: "+leftKneeAngle+"   "+(leftKneeAngle < 175 && rightKneeAngle < 175))

    if(leftKneeAngle < 168 && rightKneeAngle < 168){
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
    else if(leftKneeAngle > 170 && rightKneeAngle > 170 && repeats < settings.maxNumOfRep){
        feedbackMessage = "<p>Do another Knee Raise!<p>";
        startedCurl = true;
    }

    feedback = document.getElementById('feedback');
    if(feedback != null)
       feedback.innerHTML = feedbackMessage
}

export {
    start,
}