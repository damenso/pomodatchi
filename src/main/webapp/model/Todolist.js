import {TodolistService} from "../service/TodolistService.js";

export default class Todolist {

    constructor(){
        this.addTaskButton = document.querySelector('#add-task-button');
        this.taskList = document.querySelector('#task-list');
        this.taskContent =document.querySelector("#task-content");
        this.addTaskButton?.addEventListener("click",(event) => this.addTask(event));
        this.taskList?.addEventListener("click", (event) => this.deleteTask(event));
        this.todolistService = new TodolistService();

        this.todolistSidebar = document.querySelector('#todolist-sidebar');
        this.todolistSidebar?.addEventListener("click", (event) => this.deleteTask(event));
        this.getTodoList();
    }

    addTask(event){
        event.preventDefault();
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
        this.todolistService.addTaskToTodoList(taskMessage);

    }


    deleteTask(event){
        if(event.target.tagName === "LI"){
            event.target.classList.toggle("checked");
            return;
        }
        if(event.target.tagName === "SPAN"){
            const li = event.target.parentElement;
            const taskMessage = (li.childNodes[0].nodeValue || "").trim();
            this.todolistService.deleteTaskFromTodoList(taskMessage)
                .then(ok => {
                    if (ok !== null && ok !== false) li.remove();
                });
        }

    }

    getTodoList(){
        const tasks = JSON.parse(sessionStorage.getItem('tasks') || "[]");
        this.todolistSidebar.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) li.classList.add('checked');

            const span = document.createElement('span'); // kruisje tonen
            span.innerHTML = '\u00D7';
            li.appendChild(span);

            this.todolistSidebar.appendChild(li);
        });

    }

}

new Todolist();