import {TimerService} from "../service/TimerService.js";

export default class Timer {
    constructor() {
        this.startTimerButton = document.querySelector('#start-timer-button');
        this.pauseTimerButton = document.querySelector('#pause-timer-button');
        this.stopTimerButton = document.querySelector('#stop-timer-button');
        this.resumeTimerButton = document.querySelector('#resume-timer-button');
        this.timerView = document.querySelector('#timer');

        this.timerService = new TimerService();

        this.startTimerButton?.addEventListener("click", (event) => this.startTimer(event));
        this.pauseTimerButton?.addEventListener("click", (event) => this.pauseTimer(event));
        this.stopTimerButton?.addEventListener("click", (event) => this.stopTimer(event));
        this.resumeTimerButton?.addEventListener("click", (event) => this.resumeTimer(event));

        this.focusSeconds = this.timerService.getFocus() * 60;
        this.breakSeconds = this.timerService.getBreak() * 60;
        this.loopsTotal = this.timerService.getLoops();
        this.interval = null;
        this.remaining = this.focusSeconds;
         
    }

    updateTimer(){
        const focusMinutes = Math.floor(focus / 60);
        const focusSeconds = focus % 60;
        this.timerView.innerHTML = `${focusMinutes.toString().padStart(2,"0")}:${focusSeconds.toString().padStart(2,"0")}`

    }

    startTimer(){
        this.timerService.createTimer(focus, this.breakTime, this.loops);
        this.interval = setInterval(() => {
            this.focus--;
            this.updateTimer();

            if (focus === 0){
                clearInterval(interval);
                alert("Time's up");
                focus = this.focus;
                this.updateTimer();
            }
        }, 1000);

    }

    pauseTimer(){
        this.timerService.pauseTimer();
        clearInterval(interval);
    }

    stopTimer(){
        clearInterval(interval);
        focus = this.focus();
        this.updateTimer();
    }

    resumeTimer(){
        this.timerService.resumeTimer();
    }
}

new Timer();