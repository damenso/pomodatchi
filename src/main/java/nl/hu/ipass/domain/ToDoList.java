package nl.hu.ipass.domain;

import java.util.ArrayList;
import java.util.List;

public class ToDoList {
    private long id;
    private List<Task> tasks;

    public ToDoList(){
        this.tasks = new ArrayList<>();
    }

    public void addTask(Task task){
        this.tasks.add(task);
    }

    public Task getTask(String message){
        for(Task task : tasks){
            if(task.getMessage().equals(message)){
                return task;
            }
        }
        return null;
    }

    public void deleteTask(Task task){
        this.tasks.remove(task);
    }

    public List<Task> getTasks(){
        return this.tasks;
    }
}
