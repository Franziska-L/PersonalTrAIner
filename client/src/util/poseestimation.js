const posenet = require('@tensorflow-models/posenet');
const util = require('./util');
const settings = require('../settings');

const bicepcurl = require('../exercises/bicepCurl');
const butterfly = require('../exercises/butterfly');
const lunges = require('../exercises/sideLunge')
const shoulderPress = require('../exercises/shoulderPress')
const legLift = require('../exercises/legLift')
const deadLift = require('../exercises/deadlift')

const videoWidth = settings.videoWidth;
const videoHeight = settings.videoHeight;

let flipPoseHorizontal = true;
// load camera
async function setupCamera() {
    
    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;
    
    const stream = await navigator.mediaDevices.getUserMedia({
        'audio' : false,
        'video': {
            facingMode : 'user',
            width: videoWidth,
            height: videoHeight,
        },
    });

    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });

}

async function loadVideo() {
    const video = await setupCamera();
    //Comment in for static video analysis
    //const video = document.getElementById('staticVideo'); //staticVideo

    video.width = videoWidth; //staticVideo
    video.height = videoHeight; //staticVideo

    video.play();

    return video;
}

const defaultQuantBytes = 2;
const defaultResNetMultiplier = 1.0;
const defaultResNetStride = 32;
const defaultResNetInputResolution = 250;

//Define GuiState
const guiState = {
    algorithm: 'single-pose',
    input: {
        //less accurate
        //architectrue: 'MobileNetV1'
        //more accurate
        architecture: 'ResNet50',
        outputStride: defaultResNetStride,
        inputResolution: defaultResNetInputResolution,
        multiplier: defaultResNetMultiplier,
        quantBytes: defaultQuantBytes
    },
    singlePoseDetection: {
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
    },
    output: {
        showVideo: true,
        showSkeleton: true,
        showPoints: true,
        showBoundingBox: false,
    },
    net: null,
};

function setupGui(cameras, net) {
    guiState.net = net;
  
    if (cameras.length > 0) {
      guiState.camera = cameras[0].deviceId;
    }
  
  }  

// feed image to posenet to estimate poses
// this function loops with a requestAnimationFrame method

function detectPoseInRealTime(video, excercise) {
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');
  
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  
    async function poseDetectionFrame() {
  
      let poses = [];
      let minPoseConfidence;
      let minPartConfidence;

      const pose = await guiState.net.estimatePoses(video, {
        flipHorizontal: flipPoseHorizontal,
        decodingMethod: 'single-person'
      });
      
  
      poses = poses.concat(pose);
      minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
      minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;


      ctx.clearRect(0, 0, videoWidth, videoHeight);

      if (guiState.output.showVideo) {
          ctx.save();
          if (flipPoseHorizontal) {
              ctx.scale(-1, 1);
              ctx.translate(-videoWidth, 0);
          } else {
              ctx.scale(1, 1);
              ctx.translate(0, 0);
          }
          ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
          ctx.restore();
      }
  
      // For each pose (i.e. person) detected in an image, loop through the poses
      // and draw the resulting skeleton and keypoints if over certain confidence
      // scores
      poses.forEach(({score, keypoints}) => {
      
        if (score >= minPoseConfidence) {
          if (guiState.output.showPoints) {
            util.drawKeypoints(keypoints, minPartConfidence, ctx);
          }
          if (guiState.output.showSkeleton) {
            util.drawSkeleton(keypoints, minPartConfidence, ctx);
          }
          if (guiState.output.showBoundingBox) {
            util.drawBoundingBox(keypoints, ctx);
          }
        
          //check which excersise is performed and add corresponding correction
          if (excercise === "Bicep Curl"){
              bicepcurl.start(keypoints, ctx);
          } else if (excercise === "Shoulder Press"){
              shoulderPress.start(keypoints, ctx);
          } else if (excercise === "Butterfly") {
              butterfly.start(keypoints, ctx);  
          } else if (excercise === "Side Lunge") {
              lunges.start(keypoints, ctx);
          } else if (excercise === "Standing Leg Lift") {
              legLift.start(keypoints, ctx);
          } else if (excercise === "Standing Leg Deadlift") {
              deadLift.start(keypoints, ctx);
          }
        }
      });
  
     
  
      requestAnimationFrame(poseDetectionFrame);
    }
  
    poseDetectionFrame();
}


function stopVideoProgressBar() {
  var progressBar = document.getElementById('progressBar');
  progressBar.style="display: none;";
  // $("#progressBar").fadeOut(5000);
  // this.refs["progressBar"].fadeOut(5000);
}

// load posenet model, find and load available camera device
// set off detectPoseInRealTime function

async function bindPage(exercise) {
    const net = await posenet.load({
      architecture: guiState.input.architecture,
      outputStride: guiState.input.outputStride,
      inputResolution: guiState.input.inputResolution,
      multiplier: guiState.input.multiplier,
      quantBytes: guiState.input.quantBytes
    });
  
    let video;
  
    try {
      video = await loadVideo();
    } catch (e) {
      /*let info = document.getElementById('info');
      info.textContent = 'this browser does not support video capture,' +
          'or this device does not have a camera';
      info.style.display = 'block';*/
      throw e;
    }
    stopVideoProgressBar();
    setupGui([], net);
    detectPoseInRealTime(video, exercise);
    // ?  stopVideoProgressBar();
}

function setOrientation(orientation) {
    flipPoseHorizontal = orientation
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


export default {
  bindPage,
}

export {
    setOrientation,
}
