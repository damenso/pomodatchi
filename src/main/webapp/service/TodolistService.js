export class TodolistService {

    addTaskToTodoList(taskMessage){
        const url = `/restservices/study/todoList/add/${taskMessage}`;
        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
            .then(list => {
                // REPLACE session list with server's list
                sessionStorage.setItem('tasks', JSON.stringify(list));
                console.log("Synced todolist (after add)", list);
                return list;
            })
            .catch(error => {
                console.error("Error adding task to todo-list", error);
                return null;
            });
    }

    deleteTaskFromTodoList(taskMessage) {
        return fetch(`/restservices/study/todoList/delete/${taskMessage}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then(async response => {
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
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .then(list => {
                // REPLACE session list with server's list (exact same list as backend wrote)
                sessionStorage.setItem('tasks', JSON.stringify(list));
                console.log("Synced todolist (after delete)", list);
                return list;
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