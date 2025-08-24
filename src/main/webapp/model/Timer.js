import {TimerService} from "../service/TimerService.js";

export default class Timer {
    constructor() {
        this.startTimerButton = document.querySelector('#start-timer-button');
        this.pauseTimerButton = document.querySelector('#pause-timer-button');
        this.resetTimerButton = document.querySelector('#reset-timer-button');
        this.resumeTimerButton = document.querySelector('#resume-timer-button');
        this.timerView = document.querySelector('#timer');
        this.timerType = document.querySelector('#timer-type');
        this.loops = document.querySelector('#loops');

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
        this.phase = 'focus';
        this.loopsLeft = Math.max(1, this.loopsTotal);
        this.remaining = this.focusSeconds;
        this.updateTimer();
    }

    updateStatus(){
        if (this.timerType) this.timerType.textContent = (this.phase === 'focus' ? 'Focus' : 'Break');
        if (this.loops) {
            const currentLoop = this.loopsTotal - this.loopsLeft + 1;
            this.loops.textContent = `${currentLoop}/${this.loopsTotal}`;
        }
    }

    updateTimer(){
        const minutes = Math.floor(this.remaining / 60);
        const seconds = this.remaining % 60;
        this.timerView.textContent = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
    }

    runTimer(){
        if (this.remaining > 0){
            this.remaining--;
            this.updateTimer();
            if (this.remaining === 0) this.switchTypeTimer();
        }
    }

    switchTypeTimer(){
        if (this.phase === 'focus'){
            if (this.loopsLeft <= 1) {
                clearInterval(this.interval);
                this.interval = null;
                this.updateStatus();
                alert("All focus rounds have finished. Good job!");
                return;
            }
            alert("Focus time's up, it's breaktime!");
            this.phase = "break";
            this.remaining = this.breakSeconds;
            this.updateTimer();
            this.updateStatus();
        } else {
            this.loopsLeft--;
            this.phase = "focus";
            this.remaining = this.focusSeconds;
            this.updateTimer();
            this.updateStatus();
            alert(`The break is over let's start round ${this.loopsTotal - this.loopsLeft + 1}/${this.loopsTotal}`);
        }
    }

    startTimer(){
        this.timerService.createTimer(this.focusSeconds/60, this.breakSeconds/60, this.loopsTotal).catch(()=>{});
        clearInterval(this.interval);
        this.remaining = this.focusSeconds;
        this.phase = "focus";
        this.loopsLeft = Math.max(1, this.loopsTotal);
        this.remaining = this.focusSeconds;
        this.updateTimer();
        this.updateStatus();
        this.interval = setInterval(() => this.runTimer(), 1000);

    }

    pauseTimer(){
        this.timerService.pauseTimer();
        clearInterval(this.interval);
    }

    stopTimer(){
        clearInterval(this.interval);
        this.interval = null;
        this.renderTimer();
    }

    resumeTimer(){
        this.timerService.resumeTimer().catch(()=>{});
        if (this.interval) return;
        this.interval = setInterval(() => this.runTimer(), 1000);
    }


}

new Timer();