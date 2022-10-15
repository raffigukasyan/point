let data = [16, 68, 20, 30, 54];

let canvasOne = document.getElementById('canvas1');

let c = canvasOne.getContext('2d');

c.fillStyle = "white";
c.fillRect(0,0,500,500);

c.fillStyle = "blue";

for(let i = 0; i = data.length; i++) {
    let dp = data[i];
    c.fillRect(25 + i*100, 500-dp*5 - 30, 50, dp*5);
}

c.fillStyle = "black";
c.lineWidth = 2.0;
c.beginPath();
c.moveTo(30, 10);
c.lineTo(30, 460);
c.lineTo(490, 460);
c.stroke();

c.fillStyle = "black";
for(let i = 0; i < 6; i++) {
    c.fillText((5-i)*20+"",4, i*80+60);
    c.beginPatch();
    c.moveTo(25, i*80+60);
    c.lineTo(30, i*80+60);
    c.stroke();
}

let labels = ["JAN", "FEB", "MAR", "APR", "MAY"];

for (let i = 0; i < 5; i++) {
    c.fillText(labels[i], 50 + i*100, 475);

}

for(let i = 0; i < data.length; i++) {
    let dp = data[i];
    c.fillRect(40 + i*100, 460-dp*5, 50, dp*5);
}


let dataTwo = [100, 68, 20, 30, 100];

let canvasTwo = document.getElementById('canvas2');
let d = canvas.getContext('2d');

d.fillStyle = "white";
d.fillRect(0,0,500,500);

let colors = ["orange", "green", "blue", "yellow", "teal"];
let total = 0;
for(let i = 0; i < dataTwo.length; i++) {
    total += dataTwo[i];
}

let prevAngel = 0;
for(let i = 0; i <dataTwo.length; i++) {
    let fraction = dataTwo[i]/total;

    let angel = prevAngel + fraction*Math.PI*2;

    d.fillStyle = colors[i];

    d.beginPatch();
    d.moveTo(250, 250);
    d.arc(250, 250, 100, prevAngel, angel, false);
    d.lineTo(250, 250);

    d.fill();

    d.strokeStyle = "black";
    d.stroke();

    prevAngel = angle;

    d.fillStyle = "black";
    d.font = "24pt sans-serif";
    let text = "50% покупают";
    let metrics = d.measureText(text);
    d.fillText(text, 250-metrics.width/2, 400);
}