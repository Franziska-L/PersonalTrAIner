import {
    leftHip,
    leftKnee,
    leftAnkle,
    rightHip,
    rightKnee,
    rightAnkle,
    rightKneeAngle,
    leftKneeAngle,
    setKeypoints
} from "../util/keypoints";
const settings = require('../settings');
const util = require('../util/util');

let startedSquat = false
let repeats = 0
let sets = 1


function start(keypoints, ctx) {

    setKeypoints(keypoints)
    util.setFeedback(ctx, repeats, sets);

    const summedScore = leftHip.score + leftKnee.score + leftAnkle.score
        + rightHip.score + rightKnee.score + rightAnkle.score
    
    //let feedback = document.getElementById('feedback');
    let feedbackMessage = document.getElementById('feedback');
    
    if (rightArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your right arm closer to your upper body<p>")
    }
    if(leftArmTooFarFromTorso){
        feedbackMessage = ("<p>Hold your left arm closer to your upper body<p>")
    }
        

    if(summedScore > 3.5 &&
        rightKneeAngle < 90 && leftKneeAngle < 90){
        console.log("Great job!")
        if (startedSquat) {
            repeats++;
            startedSquat = false;
            if (repeats === settings.maxNumOfRep) {
                setTimeout(() => {
                    document.getElementById("timerModal").style.display = "block"
                    let time = settings.restTime;
                    const display = document.querySelector('#time');
                    util.startTimer(time, display,  sets, repeats);
                }, 1500);
            }
        }
    } else if( summedScore > 3.5 && rightKneeAngle > 160 && leftKneeAngle > 160){
        startedSquat = true;
    }

}

export {
    start
}