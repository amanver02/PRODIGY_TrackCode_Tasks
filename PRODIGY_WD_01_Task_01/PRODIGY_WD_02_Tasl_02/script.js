let startTime, updatedTime, difference, tInterval, running = false, laps = [];
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerText = "Pause";
        resetBtn.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerText = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerText = "Start";
    display.innerText = "00:00:00";
    difference = 0;
    laps = [];
    renderLaps();
}

function lap() {
    if (running) {
        laps.push(display.innerText);
        renderLaps();
    }
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapDiv = document.createElement('div');
        lapDiv.innerText = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapDiv);
    });
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerText = hours + ":" + minutes + ":" + seconds;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
