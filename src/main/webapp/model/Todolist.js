import {TodolistService} from "../service/TodolistService.js";

export default class Todolist {

    constructor(){
        this.addTaskButton = document.querySelector('#add-task-button');
        this.taskList = document.querySelector('#task-list');
        this.taskContent =document.querySelector("#task-content");
        this.addTaskButton?.addEventListener("click",(event) => this.addTask(event));
        this.taskList.addEventListener("click", (event) => this.deleteTask(event));
    }

    addTask(event){
        event.preventDefault();
        console.log("Ik kom bij de methode yay")
        const taskMessage = this.taskContent.value;

        if (!taskMessage){
            alert("Fill required text field");
            return;
        } else {
            const taskItem = document.createElement("li");
            taskItem.textContent = taskMessage;
            this.taskList.appendChild(taskItem);
            this.taskContent.value = "";
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            taskItem.appendChild(span);

        }

    }


    deleteTask(event){
        console.log("delete is got");
        if(event.target.tagName === "LI"){
            event.target.classList.toggle("checked");
        }
        else if(event.target.tagName === "SPAN"){
            event.target.parentElement.remove();
        }
    }

}

new Todolist()