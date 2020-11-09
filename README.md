# Welcome to PersonalTrAIner

This React-App uses Pose Estimation with the pre-trained model PoseNet to detect whether sport-exercises are executed correctly. In the current version there are two possible modes to run the application in: With a the webcam of the device its running on or with static videos for each exercise. The latter mode was mainly used for testing the application during the development.

### Run the application with a webcam (default)

In src/components/ExerciseScreen.js make sure that l. 200-201 are commented the following way:

```
    {/*{currentVideo}*/}
    <video id="video" className="video"></video>
```

In util/poseestimation.js the webcam needs to be loaded into the page like this (l.42)

```
    async function loadVideo() {
    const video = await setupCamera();
    //Comment in for static video analysis
    //const video = document.getElementById('staticVideo'); //staticVideo
```

### Run the application with static videos

In src/components/ExerciseScreen.js make sure that l. 200-201 are commented the following way:

```
    {currentVideo}
    {/*<video id="video" className="video"></video> */}
```

In util/poseestimation.js the webcam needs to be loaded into the page like this (l.42)

```
    async function loadVideo() {
    //const video = await setupCamera();
    //Comment in for static video analysis
    const video = document.getElementById('staticVideo'); //staticVideo
```

### Start the application in development mode

```
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Developed by:

Franziska Lang
Larissa Mikolaschek
