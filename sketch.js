let video;
let handpose;
let predictions = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    handpose = ml5.handpose(video, modelReady);
    handpose.on('predict', results => predictions = results);
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    image(video, 0, 0, width, height);
    drawKeypoints();
}

function drawKeypoints() {
    for (let i = 0; i < predictions.length; i++) {
        let prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j++) {
            let keypoint = prediction.landmarks[j];
            fill(255, 0, 0);
            noStroke();
            ellipse(keypoint[0], keypoint[1], 10, 10);
            particles.push(new Particle(keypoint[0], keypoint[1]));
        }
    }
    updateParticles();
}

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 255;
        this.color = color(random(255), random(255), random(255));
    }

    move() {
        this.x += random(-2, 2);
        this.y += random(-2, 2);
        this.alpha -= 5;
    }

    show() {
        noStroke();
        fill(this.color, this.alpha);
        ellipse(this.x, this.y, 8);
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].move();
        particles[i].show();
        if (particles[i].alpha < 0) {
            particles.splice(i, 1);
        }
    }
}
