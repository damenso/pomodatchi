import {LoginService} from "../service/LoginService.js";
import {TimerService} from "../service/TimerService.js";


export default class TimerSetup{
    constructor(){
        this.focusTime = document.querySelector('#focus-time');
        this.breakTime = document.querySelector('#break-time');
        this.loopAmount = document.querySelector('#loop-amount');
        this.nextButton = document.querySelector('#next-button');
        this.loginService = new LoginService();
        this.timerService = new TimerService();
        this.logoutButton = document.querySelector('#logout-button');
        this.logoutButton?.addEventListener("click", (event) => this.logoutUser(event));
        this.nextButton?.addEventListener("click", (event) => this.saveTimer(event));
    }

    async saveTimer(event){
        event.preventDefault();
        const focusMinutes = Number(this.focusTime?.value || 25);
        const breakMinutes = Number(this.breakTime?.value || 5);
        const loopAmount = Number(this.loopAmount?.value || 2);

        try{
            const result = await this.timerService.createTimer(focusMinutes, breakMinutes, loopAmount);

            if (result === null){
                alert("Failed to create timer. Please try again");
                return;
            }

            window.location.href = "buddy-setup.html";
        } catch (error){
            console.error('Error saving timer', error);
        }
    }


    logoutUser(event){
        event.preventDefault();
        this.loginService.logout();
        this.logoutButton.style.display = "none";
        window.location.href = "index.html";
        alert("Logged out!");
    }
}

new TimerSetup();