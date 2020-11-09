const posenet = require('@tensorflow-models/posenet');
const tf = require('@tensorflow/tfjs');
const settings = require('../settings');


const color = '#FFAD40'

const boundingBoxColor = 'red';
const lineWidth = 2;


function isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }
  
function isiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
  
function isMobile() {
    return isAndroid() || isiOS();
}

function toTuple({y, x}){
    return[y, x];
}

function setDatGuiPropertyCss(propertyText, liCssString, spanCssString = '') {
    var spans = document.getElementsByClassName('property-name');
    for (var i = 0; i < spans.length; i++) {
      var text = spans[i].textContent || spans[i].innerText;
      if (text === propertyText) {
        spans[i].parentNode.parentNode.style = liCssString;
        if (spanCssString !== '') {
          spans[i].style = spanCssString;
        }
      }
    }
  }
  
// draw a point
function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    //draw circle
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    //fill circle
    ctx.fillStyle = color;
    ctx.fill();
}

// draw line on canvas
function drawSegment([ay, ax], [by, bx], color, scale, ctx){
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// draw pose skeleton by looking up all neighboring keypoints/joints
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const neighboringKeypoints = 
    posenet.getAdjacentKeyPoints(keypoints, minConfidence);

    neighboringKeypoints.forEach((keypoints) => {
        drawSegment(
            toTuple(keypoints[0].position), toTuple(keypoints[1].position), 
            color, scale, ctx
        );
    });
}

// draw pose keypoints onto canvas
function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];

        if(keypoint.score < minConfidence) {
            continue;
        }

        const {y, x} = keypoint.position;
        drawPoint(ctx, y * scale, x * scale , 3 , color);
        drawPoint(ctx, 0, 0 , 3 , color)
    }
}

// draw bounding box of a pose
function drawBoundingBox(keypoints, ctx) {
    const boundingBox = posenet.getBoundingBox(keypoints);
  
    ctx.rect(
        boundingBox.minX, boundingBox.minY, boundingBox.maxX - boundingBox.minX,
        boundingBox.maxY - boundingBox.minY);
  
    ctx.strokeStyle = boundingBoxColor;
    ctx.stroke();
  }

// convert array of pixel data into ImageData object

async function renderToCanvas(a, ctx) {
    const [height, width] = a.shape;
    const imageData = new ImageData(width, height)

    const data = await a.data();

    for (let i = 0; i < height*width; i++) {
        const j = i * 4;
        const k = i * 3;

        imageData.data[j + 0] = data[k + 0];
        imageData.data[j + 1] = data[k + 1];
        imageData.data[j + 2] = data[k + 2];
        imageData.data[j + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

// draw image on a canvas

function renderImageToCanvas(image, size, canvas) {
    canvas.width = size[0];
    canvas.height = size[1];
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);
}

// draw heatmap values
function drawHeatMapValues(heatMapValues, outputStride, canvas) {
    const ctx = canvas.getContext('2d');
    const radius = 5;
    const scaledValues = heatMapValues.mul(tf.scalar(outputStride, 'int32'));
  
    drawPoints(ctx, scaledValues, radius, color);
}

// used by drawHeatMapValues to draw heatmap points on the canvas
function drawPoints(ctx, points, radius, color) {
    const data = points.buffer().values;

    for (let i = 0; i < data.length; i += 2) {
      const pointY = data[i];
      const pointX = data[i + 1];
  
      if (pointX !== 0 && pointY !== 0) {
        ctx.beginPath();
        ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
}

// draw offset vector values, one of the model outputs, on to the canvas
function drawOffsetVectors(
    heatMapValues, offsets, outputStride, scale = 1, ctx) {
  const offsetPoints =
      posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

  const heatmapData = heatMapValues.buffer().values;
  const offsetPointsData = offsetPoints.buffer().values;

  for (let i = 0; i < heatmapData.length; i += 2) {
    const heatmapY = heatmapData[i] * outputStride;
    const heatmapX = heatmapData[i + 1] * outputStride;
    const offsetPointY = offsetPointsData[i];
    const offsetPointX = offsetPointsData[i + 1];

    drawSegment(
        [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
  }
}


function setFeedback(ctx, repeats, sets) {
    ctx.font = "bold 20px Quicksand";
    let rep = "Reps: "
    let set = "Set: "
    const fontsize = 14;
    const offset = 32
    const cornerRadius = 16

    const textWidthRep = ctx.measureText(rep).width + 14 + offset;
    const textWidthSet = ctx.measureText(set).width + 10 + offset;
    const lineHeight = fontsize * 1.286 + offset;

    const rectXRep = 20
    const rectXSet = settings.videoWidth - textWidthSet - 15
    //Für unten settings.videoHeight - 30
    const rectY = 20

    ctx.fillStyle = color;

    ctx.lineWidth = 6;
    ctx.strokeRect(0, 0, settings.videoWidth, settings.videoHeight);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;

    ctx.fillRect(rectXRep+(cornerRadius/2), rectY+(cornerRadius/2), textWidthRep-cornerRadius, lineHeight-cornerRadius);
    ctx.fillRect(rectXSet+(cornerRadius/2), rectY+(cornerRadius/2), textWidthSet-cornerRadius, lineHeight-cornerRadius);

    ctx.globalAlpha = 1.0;

    ctx.strokeRect(rectXRep+(cornerRadius/2), rectY+(cornerRadius/2), textWidthRep-cornerRadius, lineHeight-cornerRadius);
    ctx.strokeRect(rectXSet+(cornerRadius/2), rectY+(cornerRadius/2), textWidthSet-cornerRadius, lineHeight-cornerRadius);

    rep += repeats
    set += sets
    ctx.fillStyle = 'white';

    ctx.fillText(rep, rectXRep + (offset/2), rectY + (offset/2));
    ctx.fillText(set, rectXSet + (offset/2), rectY + (offset/2));
}

function startTimer(duration, display, sets, repeats) {
    const video = document.getElementById('staticVideo');
    if(video != null)
        video.pause(); 


    let timer = duration;
    let seconds;
    let __timer = setInterval(function () {
        //minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        //minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            clearInterval(__timer);
            timer = settings.restTime;
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


module.exports = {
    toTuple,
    isMobile,
    setDatGuiPropertyCss,
    drawPoint,
    drawSegment,
    drawSkeleton,
    setFeedback,
    drawKeypoints,
    drawBoundingBox,
    renderToCanvas,
    renderImageToCanvas,
    drawHeatMapValues,
    drawOffsetVectors,
    startTimer,
}
