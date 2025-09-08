export class TodolistService {

    addTaskToTodoList(taskMessage){
        const url = `/restservices/study/todolist/add/${taskMessage}`;
        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({taskMessage : taskMessage})
        })
            .then(async response => {
                if (!response.ok){
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to add task to todo-list: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to add task to todo-list: ${text}`);
                        }
                    })
                }
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .then(data => {
                let todolist = JSON.parse(sessionStorage.getItem('tasks') || "[]");
                todolist.push({data});
                sessionStorage.setItem('tasks', JSON.stringify(todolist));
                console.log("Updated toodolist", todolist);
            })
            .catch(error => {
                console.error("Error adding task to todo-list", error);
                return null;
            });
    }

    deleteTaskToTodolist(taskMessage) {
        return fetch(`restservices/study/todoList/delete`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskMessage)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        try {
                            const json = JSON.parse(text);
                            throw new Error(`Failed to delete task from todo-list: ${json.message}`);
                        } catch {
                            throw new Error(`Failed to delete task from todo-list: ${text}`);
                        }
                    });
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error deleting task from todo-list", error);
                return null;
            });
    }

    getTodoList() {
        return fetch(`/restservices/study/todoList/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({todolist: todolist})
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch todo-list");
                }
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .then(data =>{
                sessionStorage.getItem("tasks")
                return data;
            })
            .catch(error => {
                console.error("Error fetching todo-list:", error);
                return null;
            });
    }
}