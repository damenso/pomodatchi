import {TimerService} from "./service/TimerService";

export default class Timer {
    constructor() {
        const timerService = new TimerService();
        const focusTime = document.querySelector('#focus-time');
        const breakTime = document.querySelector('#break-time');
        const loopAmount = document.querySelector('#loop-amount');
    }


}