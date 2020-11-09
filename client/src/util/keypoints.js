const util = require('./util')

let leftShoulder = null;
let leftElbow = null;
let leftWrist = null;
let leftHip = null;
let leftKnee = null;
let leftAnkle = null;

let rightShoulder = null;
let rightElbow = null;
let rightWrist = null;
let rightHip = null;
let rightKnee = null;
let rightAnkle = null;

let leftArmAngle = null
let leftTorsoAngle = null

let rightArmAngle = null
let rightTorsoAngle = null

let rightArmTooFarFromTorso = null
let leftArmTooFarFromTorso = null

let rightLegTooFarFromHip = null
let leftLegTooFarFromHip = null


let rightKneeTooFarFromCenter = null
let leftKneeTooFarFromCenter = null

let rightArmTooFarFromWrist = null
let leftArmTooFarFromWrist = null

let leftArmTooCloseToCenter = null
let rightArmTooCloseToCenter = null

let rightKneeAngle = null
let leftKneeAngle = null

let rightHipAngle = null
let leftHipAngle = null

let distanceAnkles = null

//Getting keypoints from posenet
function setKeypoints(keypoints) {
    leftShoulder = keypoints[5];
    leftElbow = keypoints[7];
    leftWrist = keypoints[9];
    leftHip = keypoints[11];
    leftKnee = keypoints[13];
    leftAnkle = keypoints[15];

    rightShoulder = keypoints[6];
    rightElbow = keypoints[8];
    rightWrist = keypoints[10];
    rightHip = keypoints[12];
    rightKnee = keypoints[14];
    rightAnkle = keypoints[16];

    distanceAnkles = getDistance(leftAnkle, rightAnkle);
    setAngles()
}

//Add all angles needed for later use
function setAngles() {
    leftArmAngle = getAngle(leftShoulder.position, leftElbow.position, leftWrist.position);
    leftTorsoAngle = getAngle(leftHip.position, leftShoulder.position, leftElbow.position);

    rightArmAngle = getAngle(rightShoulder.position, rightElbow.position, rightWrist.position);
    rightTorsoAngle = getAngle(rightHip.position, rightShoulder.position, rightElbow.position);

    rightKneeAngle = getAngle(rightHip.position, rightKnee.position, rightAnkle.position);
    leftKneeAngle = getAngle(leftHip.position, leftKnee.position, leftAnkle.position);

    leftHipAngle = getAngle(leftShoulder.position, leftHip.position, leftKnee.position);
    rightHipAngle = getAngle(rightShoulder.position, rightHip.position, rightKnee.position);

    rightArmTooFarFromTorso = rightTorsoAngle > 36.0 ? true : false;
    leftArmTooFarFromTorso = leftTorsoAngle > 36.0 ? true : false;

    rightArmTooCloseToCenter = rightTorsoAngle < 36.0 ? true : false;
    leftArmTooCloseToCenter = leftTorsoAngle < 36.0 ? true : false;

    rightArmTooFarFromWrist = rightArmAngle > 36.0 ? true : false;
    leftArmTooFarFromWrist= leftArmAngle > 36.0 ? true : false;

    rightLegTooFarFromHip = rightHipAngle < 16.0 ? true : false;
    leftLegTooFarFromHip = leftHipAngle < 16.0 ? true : false;

    rightKneeTooFarFromCenter = rightKneeAngle < 16.0 ? true : false;
    leftKneeTooFarFromCenter = leftKneeAngle < 16.0 ? true : false;
}


// get distance of two keypoints
function getDistance(posA, posB){
    const a = util.toTuple(posA);
    const b = util.toTuple(posB);
    const xdist = (a[0] - b[0]) * (a[0] - b[0])
    const ydist = (a[1] - b[1]) * (a[1] - b[1])
    return(Math.sqrt(xdist + ydist))
}

// get angle from three given keypoints
// posB needs to be the middle keaypoint (e.g. elbow when determining the angle between upper and lower arm)
function getAngle(posA, posB, posC){
    const distAToB = getDistance(posB, posA);
    const distBToC = getDistance(posB, posC);
    const distAToC = getDistance(posA, posC);

    const cosalpha = ((distAToB * distAToB) + (distBToC * distBToC) - (distAToC * distAToC)) / (2 * distAToB * distBToC);
    const angle = Math.acos(cosalpha);

    return angle * (180 / Math.PI);
}

export {
    leftShoulder,
    leftElbow,
    leftWrist,
    leftHip,
    leftKnee,
    leftAnkle,
    rightShoulder,
    rightElbow,
    rightWrist,
    rightHip,
    rightKnee,
    rightAnkle,
    leftArmAngle,
    leftTorsoAngle,
    rightArmAngle,
    rightTorsoAngle,
    rightArmTooFarFromTorso,
    leftArmTooFarFromTorso,
    leftArmTooCloseToCenter,
    rightArmTooCloseToCenter,
    rightArmTooFarFromWrist,
    leftArmTooFarFromWrist,
    rightLegTooFarFromHip,
    leftLegTooFarFromHip,
    rightKneeTooFarFromCenter,
    leftKneeTooFarFromCenter,
    rightKneeAngle,
    leftKneeAngle,
    distanceAnkles,
    rightHipAngle,
    leftHipAngle,
    setKeypoints
};