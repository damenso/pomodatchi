import {StartupService} from "../service/StartupService";
import Buddy from "./Buddy";

export default class Startup{

    constructor(){
        this.submitButton = document.querySelector('#submit-button');
        this.sessionForm = document.querySelector('#pomodatchi-session-form');
        this.buddyNameInput = document.querySelector('buddy-name');
        this.focusTimeInput = document.querySelector('#focus-time');
        this.breakTimeInput = document.querySelector('#break-time');
        this.loopAmountInput = document.querySelector('#loop-amount');
        this.todoList = document.querySelector('#task-list');

        this.buddy = new Buddy();
        this.buddy.selectedBuddy(event)


        this.submitButton?.addEventListener("click", (event) => this)
    }

    saveSessionData(event){

    }
}

new Startup();
