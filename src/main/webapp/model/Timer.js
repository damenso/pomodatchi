import {TimerService} from "../service/TimerService.js";

export default class Timer {
    constructor() {
        this.startTimerButton = document.querySelector('#start-timer-button');
        this.pauseTimerButton = document.querySelector('#pause-timer-button');
        this.resetTimerButton = document.querySelector('#reset-timer-button');
        this.resumeTimerButton = document.querySelector('#resume-timer-button');
        this.timerView = document.querySelector('#timer');

        this.timerService = new TimerService();

        this.startTimerButton?.addEventListener("click", (event) => this.startTimer(event));
        this.pauseTimerButton?.addEventListener("click", (event) => this.pauseTimer(event));
        this.resetTimerButton?.addEventListener("click", (event) => this.stopTimer(event));
        this.resumeTimerButton?.addEventListener("click", (event) => this.resumeTimer(event));

        this.renderTimer();


        this.interval = null;

         
    }

    renderTimer(){
        this.focusSeconds = this.timerService.getFocus() * 60;
        this.breakSeconds = this.timerService.getBreak() * 60;
        this.loopsTotal = this.timerService.getLoops();

        this.remaining = this.focusSeconds;

        this.updateTimer();
    }

    updateTimer(){
        const minutes = Math.floor(this.remaining / 60);
        const seconds = this.remaining % 60;
        this.timerView.textContent = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
    }

    startTimer(){
        this.timerService.createTimer(this.focusSeconds/60, this.breakSeconds/60, this.loopsTotal).catch(()=>{});
        clearInterval(this.interval);
        this.remaining = this.focusSeconds;
        this.interval = setInterval(() => {

            if (this.remaining > 0){
                this.remaining--;
                this.updateTimer();
            } else {
                clearInterval(this.interval);
                alert("Focus time's up");
            }
        }, 1000);

    }

    pauseTimer(){
        this.timerService.pauseTimer();
        clearInterval(this.interval);
    }

    stopTimer(){
        clearInterval(this.interval);
        this.renderTimer();
    }

    resumeTimer(){
        this.timerService.resumeTimer().catch(()=>{});
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (this.remaining > 0) {
                this.remaining--;
                this.updateTimer();
            } else {
                clearInterval(this.interval);
                alert("Time's up");
            }
        }, 1000);
    }


}

new Timer();