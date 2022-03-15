music1="";
music2="";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreLeftWrist=0;
scoreRightWrist=0;
status1="";
status2="";

function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    status1=music1.isPlaying();
    fill("orange");
    stroke("orange");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        music2.stop();
        if(status1=false){
            music1.play();
            document.getElementById("song").innerHTML="Song: Peter Pan Theme Song";
        }
    }
    status2=music2.isPlaying();
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        music1.stop();
        if(status2=false){
            music2.play();
            document.getElementById("song").innerHTML="Song: Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log('poseNet is initialized');
}

function gotPoses(results){
    if(results>0){
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
    }
}
