import {StartupService} from "../service/StartupService.js";
import {LoginService} from "../service/LoginService.js";
import Buddy from "./Buddy.js";

export default class Startup{

    constructor(){
        this.submitButton = document.querySelector('#submit-button');
        this.sessionForm = document.querySelector('#session-form');
        this.buddyNameInput = document.querySelector('#buddy-name');
        this.focusTimeInput = document.querySelector('#focus-time');
        this.breakTimeInput = document.querySelector('#break-time');
        this.loopAmountInput = document.querySelector('#loop-amount');
        this.todoList = document.querySelector('#task-list');
        this.loginService = new LoginService();
        this.logoutButton = document.querySelector('#logout-button');
        this.logoutButton?.addEventListener("click", (event) => this.logoutUser(event));
        this.startupService = new StartupService();
        this.buddy = new Buddy();
        this.submitButton?.addEventListener("click", (event) => this.saveSessionData(event));
    }

    saveSessionData(event){

        event.preventDefault();

        const buddyName = (this.buddyNameInput?.value || "").trim();
        const focusMinutes = Number(this.focusTimeInput?.value || 25);
        const breakMinutes = Number(this.breakTimeInput?.value || 5);
        const loopAmount = Number(this.loopAmountInput?.value || 3);

        const dogButton = document.querySelector('#dog-buddy');
        const catButton = document.querySelector('#cat-buddy');
        const chosenBuddy =
            dogButton?.classList.contains('selected') ? 'Dog' :
            catButton?.classList.contains('selected') ? 'Cat' : null;

        const tasks = [];
        this.todoList?.querySelectorAll('li')?.forEach(li => {
            tasks.push({
                text: (li.childNodes[0]?.nodeValue || "").trim(),
                completed: li.classList.contains('checked')
            });
        });

        try {
            this.startupService.saveSession(buddyName, chosenBuddy, focusMinutes, breakMinutes, loopAmount, tasks);
            window.location.href = "session-dashboard.html";
        } catch (error) {
            console.error('Session saving error', error);
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

new Startup();
